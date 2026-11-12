#!/usr/bin/env node
'use strict';
// Only renders this package's local document sources in an isolated browser.
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const {chromium} = require('playwright');
const sharp = require('sharp');
const root = path.resolve(__dirname, '../..');
const opts = {kit:'all', smoke:false, output:'_REGENERATED_EXPORTS'};
for (let i=2;i<process.argv.length;i++) {
  const a=process.argv[i];
  if (a==='--smoke') opts.smoke=true;
  else if (a==='--kit') opts.kit=process.argv[++i];
  else if (a==='--output') opts.output=process.argv[++i];
  else if (a==='--help') {console.log('node tools/export-local.cjs [--kit all|brand|ui|social] [--smoke] [--output PATH]');process.exit(0);}
  else throw Error('Unknown option: '+a);
}
if (!['all','brand','ui','social'].includes(opts.kit)) throw Error('Unknown kit');
if (!opts.output) throw Error('Output directory is required');
const out=path.resolve(root, opts.output);
if (out===root || ['00_START_HERE','01_SHARED_FOUNDATIONS','02_BRAND_KIT','03_UIUX_KIT','04_SOCIAL_KIT','05_QA','06_ENGINE_HANDOFF'].some(d=>out===path.join(root,d)||out.startsWith(path.join(root,d)+path.sep))) {
  throw Error('Choose a separate output directory. Canonical sources and supplied exports are preserved.');
}
fs.mkdirSync(out,{recursive:true});
const report={version:'1.0.0',status:'RUNNING',scope:'Local artifact rendering only; no accounts, AI inference or publishing',smoke:opts.smoke,kit:opts.kit,started_utc:new Date().toISOString(),files:[],checks:[],errors:[]};
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const dest=p=>{const p2=path.resolve(out,p);if(!p2.startsWith(out+path.sep))throw Error('Invalid relative output');fs.mkdirSync(path.dirname(p2),{recursive:true});return p2;};
const writeReport=()=>fs.writeFileSync(path.join(out,'export-report.json'),JSON.stringify(report,null,2));
const addFile=async(rel,kind,expected)=>{
  const file=path.join(out,rel), record={path:rel,kind,bytes:fs.statSync(file).size};
  if (/\.(png|jpg)$/.test(rel)) {const m=await sharp(file).metadata();record.width=m.width;record.height=m.height;if(expected&&(m.width!==expected[0]||m.height!==expected[1]))throw Error('Dimension mismatch: '+rel);}
  report.files.push(record);writeReport();
};
function all(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?all(path.join(dir,e.name)):[path.join(dir,e.name)]);}
let browser;
(async()=>{
  const launch={headless:true,chromiumSandbox:true,args:['--disable-background-networking']};
  if(process.env.DOLABY_CHROMIUM_PATH) launch.executablePath=process.env.DOLABY_CHROMIUM_PATH;
  browser=await chromium.launch(launch);
  const context=await browser.newContext({viewport:{width:1080,height:1350},deviceScaleFactor:1});
  await context.route(/^https?:\/\//,route=>route.abort());
  const page=await context.newPage();
  const open=async(rel)=>{
    const i=rel.indexOf('?');const file=i===-1?rel:rel.slice(0,i);const query=i===-1?'':rel.slice(i);
    const local=path.resolve(root,file);if(!local.startsWith(root+path.sep))throw Error('Source outside package');
    await page.goto(pathToFileURL(local).href+query,{waitUntil:'load'});
    await page.evaluate(()=>document.fonts.ready);
    const broken=await page.evaluate(()=>[...document.images].filter(i=>!i.complete||i.naturalWidth===0).length);
    if(broken)throw Error('Broken images: '+rel);
  };
  if(opts.kit==='all'||opts.kit==='ui'){
    let jobs=read('03_UIUX_KIT/responsive-screens/compositions.json');
    if(opts.smoke)jobs=jobs.filter(j=>j.id==='S07-ar-390'||j.id==='S07-en-1440');
    for(const j of jobs){
      await page.setViewportSize({width:j.width,height:900});await open(j.url);
      const m=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight}));
      if(m.width!==j.width||m.scrollWidth>j.width)throw Error('Horizontal layout overflow: '+j.id);
      const h=Math.ceil(m.height)+8;await page.setViewportSize({width:j.width,height:h});
      await page.screenshot({path:dest(j.preview),fullPage:false});await addFile(j.preview,'UI PNG',[j.width,h]);
      report.checks.push({id:j.id,css_width:m.width,scroll_width:m.scrollWidth,result:'PASS'});
    }
  }
  if(opts.kit==='all'||opts.kit==='social'){
    let jobs=read('04_SOCIAL_KIT/export-index.json');
    if(opts.smoke)jobs=jobs.filter(j=>j.mode==='filled'&&((j.id==='P02'&&j.lang==='ar')||(j.id==='V04'&&j.lang==='en')));
    for(const j of jobs){
      await page.setViewportSize({width:j.width,height:j.height});await open('04_SOCIAL_KIT/'+j.sourceURL);
      const m=await page.evaluate(()=>({width:innerWidth,height:innerHeight,artboard:document.querySelector('#artboard')?.getBoundingClientRect().width}));
      if(m.width!==j.width||m.height!==j.height||m.artboard!==j.width)throw Error('Incorrect artboard: '+j.id);
      const png='04_SOCIAL_KIT/'+j.png,jpg='04_SOCIAL_KIT/'+j.jpg;
      await page.screenshot({path:dest(png),fullPage:false});await addFile(png,'Social PNG',[j.width,j.height]);
      await sharp(path.join(out,png)).flatten({background:'#FCF8F0'}).jpeg({quality:94,chromaSubsampling:'4:4:4'}).toFile(dest(jpg));
      await addFile(jpg,'Social JPG',[j.width,j.height]);
    }
    if(!opts.smoke){
      const dir=path.join(root,'04_SOCIAL_KIT/illustrations');
      for(const name of ['shirt','trousers','shoes'])for(const width of [128,512]){
        const rel='04_SOCIAL_KIT/illustrations/'+name+'-'+width+'.png';
        await sharp(path.join(dir,name+'.svg')).resize({width}).png().toFile(dest(rel));await addFile(rel,'Standalone illustration PNG');
      }
    }
  }
  if(opts.kit==='all'||opts.kit==='brand'){
    await open('02_BRAND_KIT/booklet/brand-book.html');
    const pdf='02_BRAND_KIT/booklet/brand-book.pdf';
    await page.pdf({path:dest(pdf),printBackground:true,preferCSSPageSize:true});
    await addFile(pdf,'Brand book PDF');
    let jobs=read('02_BRAND_KIT/logo-exports/export-index.json');
    if(opts.smoke)jobs=jobs.filter(j=>j.background==='transparent'&&((j.source.endsWith('/ring-master.svg')&&j.width===24)||(j.source.endsWith('/logo-lockup.svg')&&j.width===512)));
    for(const j of jobs){let p=sharp(path.join(root,j.source)).resize({width:j.width});if(j.background==='ivory')p=p.flatten({background:'#FCF8F0'});await p.png().toFile(dest(j.path));await addFile(j.path,'Logo PNG');}
    if(!opts.smoke){
      for(const width of [180,192,512]){const rel='02_BRAND_KIT/logo-exports/avatar-'+width+'.png';await sharp(path.join(root,'02_BRAND_KIT/logo-exports/avatar.svg')).resize(width).png().toFile(dest(rel));await addFile(rel,'Avatar PNG',[width,width]);}
      const sizes=[16,24,32,48,64,128,256],images=[];
      for(const width of sizes)images.push(await sharp(path.join(root,'01_SHARED_FOUNDATIONS/canonical-logo/ring-master.svg')).resize(width).png().toBuffer());
      const header=Buffer.alloc(6+16*sizes.length);header.writeUInt16LE(1,2);header.writeUInt16LE(sizes.length,4);let offset=header.length;
      for(let i=0;i<sizes.length;i++){const at=6+16*i;header[at]=sizes[i]===256?0:sizes[i];header[at+1]=header[at];header.writeUInt16LE(1,at+4);header.writeUInt16LE(32,at+6);header.writeUInt32LE(images[i].length,at+8);header.writeUInt32LE(offset,at+12);offset+=images[i].length;}
      const rel='02_BRAND_KIT/logo-exports/favicon.ico';fs.writeFileSync(dest(rel),Buffer.concat([header,...images]));await addFile(rel,'Multi-size ICO');
    }
    const labyRoot=path.join(root,'01_SHARED_FOUNDATIONS/canonical-laby');
    let laby=all(labyRoot).filter(p=>p.endsWith('.svg'));
    if(opts.smoke)laby=laby.filter(p=>path.relative(labyRoot,p)==='laby-front.svg');
    for(const p of laby){const name=path.relative(labyRoot,p).replace(/\.svg$/,'').replace(/[\\/]/g,'-');for(const width of opts.smoke?[128]:[128,512]){const rel='02_BRAND_KIT/laby-model-and-states/exports/'+name+'-'+width+'.png';await sharp(p).resize({width}).png().toFile(dest(rel));await addFile(rel,'Laby PNG');}}
  }
  await browser.close();browser=null;report.status='PASS';report.finished_utc=new Date().toISOString();writeReport();console.log(JSON.stringify({status:report.status,files:report.files.length,output:out},null,2));
})().catch(async e=>{report.status='FAIL';report.errors.push(e.message);writeReport();if(browser)await browser.close().catch(()=>{});console.error(e.message);process.exitCode=1;});
