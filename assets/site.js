/* DoLaby library UI. Canonical design sources remain unchanged under library/. */
(()=>{'use strict';
const D=window.DOLABY_CATALOG;if(!D)return;
const $=s=>document.querySelector(s),e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const q=new URLSearchParams(location.search),byPath=new Map(D.files.map(f=>[f.path,f])),byId=new Map(D.files.map(f=>[f.id,f]));
const normalize=s=>String(s).toLowerCase().normalize('NFKD').replace(/[\u064b-\u065f\u0670]/g,'').replace(/[أإآ]/g,'ا').replace(/[ى]/g,'ي').replace(/[_\-/.]+/g,' ');
const matches=(f,s)=>!s||normalize(f.title+' '+f.path+' '+f.format+' '+f.kitLabel).includes(normalize(s));
const size=n=>n===null?'—':n<1024?n+' B':n<1048576?(n/1024).toFixed(1)+' KB':(n/1048576).toFixed(1)+' MB';
const image=f=>f.kind==='image';
const detail=f=>'asset.html?id='+encodeURIComponent(f.id);
const findFile=path=>byPath.get(path);
const raw=path=>e(path);
const downloadIcon='<svg class="icon" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"><use href="#i-download"></use></svg>';
let toastTimer;
function toast(text){const t=$('#toast');t.textContent=text;t.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>{t.hidden=true},3200)}
async function copy(text){try{await navigator.clipboard.writeText(text);toast('تم النسخ.');return true}catch{toast('تعذر النسخ الآلي. يمكنك تحديد النص ونسخه.');return false}}
function syncQuery(values){const u=new URL(location.href);Object.entries(values).forEach(([k,v])=>{if(!v||v==='all')u.searchParams.delete(k);else u.searchParams.set(k,v)});history.replaceState(null,'',u)}
function preview(f){if(image(f))return '<img src="'+raw(f.path)+'" alt="'+e(f.title)+'" loading="lazy">';if(f.kind==='font')return '<span class="font-glyph" aria-hidden="true">Aa</span>';return '<span class="file-symbol" aria-hidden="true">'+e(f.format)+'</span>'}
function assetCard(f){return '<article class="asset-card"><a class="asset-preview" href="'+detail(f)+'" aria-label="معاينة '+e(f.title)+'">'+preview(f)+'</a><div class="asset-info"><h3><a href="'+detail(f)+'">'+e(f.title)+'</a></h3><div class="meta"><span>'+e(f.format)+'</span><span>'+size(f.bytes)+'</span></div><div class="card-actions"><a class="text-link" href="'+detail(f)+'">تفاصيل ومعاينة</a><a class="text-link" href="'+raw(f.path)+'" download aria-label="تنزيل '+e(f.title)+'">'+downloadIcon+'</a></div></div></article>'}
function empty(message='لا توجد ملفات تطابق هذا الاختيار.'){return '<div class="empty-state"><h3>'+e(message)+'</h3><p class="muted">جرّب كلمة أقصر أو اختر مجموعة أخرى.</p></div>'}
function sourceLink(path,label){const f=findFile(path);return '<a href="'+(f?detail(f):raw(path))+'">'+e(label||path)+'</a>'}
function docLink(path){return 'document.html?path='+encodeURIComponent(path)}
function sourceURL(f){return D.repository+'/blob/main/'+f.path.split('/').map(encodeURIComponent).join('/')}
function docs(){return [
 ['ابدأ بالمكتبة','طريقة الفتح والتحرير والحفظ، وما يوجد فعليًا داخل الحزمة.','library/00_START_HERE/README_AR.md'],
 ['حدود التسليم','ما أُنتج محليًا، وما بقي غير مختبر أو خارج النطاق.','library/00_START_HERE/known-limitations.md'],
 ['دليل المطور','المكونات والتخطيط والحالات والبيانات وحدود النموذج.','library/03_UIUX_KIT/developer-handoff/README.md'],
 ['تحرير المحتوى','اختيار قالب، تعديل النص والصورة، وحفظ نسخة قابلة للتحرير.','library/04_SOCIAL_KIT/editing-guides/README_AR.md'],
 ['دليل المحركات','ملفات التنفيذ والتوقيت والحفظ وإعادة التصدير.','library/06_ENGINE_HANDOFF/README_ENGINE_AR.md'],
 ['البنية وحدود الربط','مصادر الواجهة والعقود التي تحتاج تنفيذًا إنتاجيًا لاحقًا.','library/06_ENGINE_HANDOFF/architecture-and-integration.md'],
 ['المصادر والحقوق','الرسوم والخطوط والمراجع وحدود الاستخدام الموثقة.','library/05_QA/sources-and-rights.md'],
 ['الفحوص التفاعلية','نطاق فحوص النجاح والفشل والاستجابة والإتاحة وحدودها.','library/05_QA/prototype-tests.md'],
 ['التصدير والمنصات','طريقة التصدير ومقاسات المحتوى والتحقق المحدود من المنصات.','library/04_SOCIAL_KIT/editing-guides/platform-verification.md']
 ]}

// Navigation and accessible global search use native controls and dialog behavior.
const menu=$('#menu-toggle'),mobile=$('#mobile-nav');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'إغلاق قائمة التنقل':'فتح قائمة التنقل');mobile.classList.toggle('open',open)});
const searchDialog=$('#search-dialog'),searchInput=$('#global-search');let searchOpener;
function renderSearch(){const text=searchInput.value.trim(),list=text?D.files.filter(f=>matches(f,text)):D.files.filter(f=>f.asset&&f.format==='SVG').slice(0,8);$('#search-count').textContent=text?list.length+' نتيجة؛ تظهر أول 12.':'بعض الأصول الأساسية. اكتب للبحث في كل الملفات.';$('#search-results').innerHTML=list.slice(0,12).map(f=>'<a class="search-result" href="'+detail(f)+'"><strong>'+e(f.title)+' <span class="badge">'+e(f.format)+'</span></strong><small>'+e(f.path)+'</small></a>').join('')+(text?'<a class="text-link" href="files.html?q='+encodeURIComponent(text)+'">كل النتائج في فهرس الملفات ←</a>':'')}
function openSearch(opener){searchOpener=opener||document.activeElement;if(!searchDialog.open)searchDialog.showModal();renderSearch();searchInput.focus()}
document.querySelectorAll('[data-open-search]').forEach(b=>b.addEventListener('click',()=>openSearch(b)));
$('#close-search')?.addEventListener('click',()=>searchDialog.close());
searchDialog?.addEventListener('close',()=>searchOpener?.focus());searchInput?.addEventListener('input',renderSearch);
document.addEventListener('keydown',ev=>{if((ev.metaKey||ev.ctrlKey)&&ev.key.toLowerCase()==='k'){ev.preventDefault();openSearch()}if(ev.key==='Escape'&&mobile?.classList.contains('open')){mobile.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','فتح قائمة التنقل');menu.focus()}});

const page=document.body.dataset.page;
if(page==='home'){
 const paths=['library/01_SHARED_FOUNDATIONS/canonical-logo/ring-master.svg','library/01_SHARED_FOUNDATIONS/canonical-logo/wordmark-outlined.svg','library/01_SHARED_FOUNDATIONS/canonical-laby/laby-front.svg','library/01_SHARED_FOUNDATIONS/canonical-logo/tagline-two.svg','library/02_BRAND_KIT/visual-language/symbol-wardrobe.svg','library/04_SOCIAL_KIT/illustrations/shirt.svg'];
 $('#essential-assets').innerHTML=paths.map(p=>findFile(p)).filter(Boolean).map(f=>'<a class="mini-asset" href="'+detail(f)+'"><img src="'+raw(f.path)+'" alt="'+e(f.title)+'" loading="lazy"><span>'+e(f.title)+'</span></a>').join('');
}

if(page==='brand'){
 const colors=[['العاجي','#FCF8F0','سطح الصفحة'],['الكتان','#F3E9D8','سطح دافئ'],['الحجر الرملي','#DDCDB5','تفاصيل وزخرفة'],['الأخضر العميق','#123B32','حدود وعناصر'],['الشامبانيا المعتّقة','#B69A62','تفاصيل زخرفية'],['حبر أزرق أسود','#151D2B','نصوص الواجهة'],['قهوة ماهوغاني','#382019','نصوص دافئة'],['أوكس بلَد','#591C2B','نص تحريري'],['أسود الشعار','#000000','الحلقة'],['الأسود العتيق','#1C1917','الكلمة']];
 $('#color-library').innerHTML=colors.map(([name,hex,role])=>'<article class="asset-card"><div style="height:115px;background:'+hex+'"></div><div class="asset-info"><h3>'+name+'</h3><p class="small muted">'+role+'</p><button class="button small-button soft" data-copy-color="'+hex+'"><bdi>'+hex+'</bdi> · نسخ</button></div></article>').join('');
 document.querySelectorAll('[data-copy-color]').forEach(b=>b.addEventListener('click',()=>copy(b.dataset.copyColor)));
 const input=$('#type-sample'),range=$('#type-size'),out=$('#type-output');function typeUpdate(){out.textContent=input.value;out.style.fontSize=range.value+'px';$('#type-size-value').textContent=range.value+' px'}input.addEventListener('input',typeUpdate);range.addEventListener('input',typeUpdate);
 const poses=[['front','المنظر الأمامي'],['side','المنظر الجانبي'],['back','المنظر الخلفي'],['three-quarter','ثلاثة أرباع'],['standing','الوقوف'],['seated','الجلوس']];
 $('#pose-options').innerHTML=poses.map(([file,label],i)=>'<button data-pose="'+file+'" aria-pressed="'+(i===0)+'">'+label+'</button>').join('');
 document.querySelectorAll('[data-pose]').forEach(b=>b.addEventListener('click',()=>{const label=poses.find(x=>x[0]===b.dataset.pose)[1],path='library/01_SHARED_FOUNDATIONS/canonical-laby/laby-'+b.dataset.pose+'.svg';$('#pose-image').src=path;$('#pose-image').alt='لابي — '+label;$('#pose-caption').textContent=label;$('#pose-download').href=path;document.querySelectorAll('[data-pose]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)))}));
}

if(page==='assets'){
 const text=$('#asset-search'),kit=$('#asset-kit'),format=$('#asset-format');let limit=24;
 text.value=q.get('q')||'';if([...format.options].some(x=>x.value===q.get('format')))format.value=q.get('format');if([...kit.options].some(x=>x.value===q.get('kit')))kit.value=q.get('kit');
 function render(){const files=D.files.filter(f=>f.asset&&matches(f,text.value)&&(kit.value==='all'||f.kit===kit.value)&&(format.value==='all'||(format.value==='FONT'?f.kind==='font':f.format===format.value)));$('#asset-count').textContent=files.length+' ملفًا · تظهر '+Math.min(files.length,limit);$('#asset-results').innerHTML=files.length?files.slice(0,limit).map(assetCard).join(''):empty();$('#asset-more').hidden=files.length<=limit;syncQuery({q:text.value,kit:kit.value,format:format.value});document.querySelectorAll('#asset-chips button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.q===text.value)))}
 [text,kit,format].forEach(el=>el.addEventListener(el===text?'input':'change',()=>{limit=24;render()}));$('#asset-more').addEventListener('click',()=>{limit+=24;render()});$('#asset-reset').addEventListener('click',()=>{text.value='';kit.value=format.value='all';limit=24;render();text.focus()});document.querySelectorAll('#asset-chips button').forEach(b=>b.addEventListener('click',()=>{text.value=b.dataset.q;limit=24;render()}));render();
}

if(page==='files'){
 const text=$('#file-search'),kit=$('#file-kit'),format=$('#file-format');let limit=40;
 [...new Set(D.files.map(f=>f.format))].sort().forEach(v=>format.add(new Option(v,v)));text.value=q.get('q')||'';if([...kit.options].some(x=>x.value===q.get('kit')))kit.value=q.get('kit');if([...format.options].some(x=>x.value===q.get('format')))format.value=q.get('format');
 function render(){const files=D.files.filter(f=>matches(f,text.value)&&(kit.value==='all'||kit.value===f.kit)&&(format.value==='all'||format.value===f.format));$('#file-count').textContent=files.length+' ملفًا · '+D.counts.libraryFiles+' في الحزمة المحفوظة';$('#file-results').innerHTML=files.length?files.slice(0,limit).map(f=>'<div class="file-row"><div><a class="file-name" href="'+detail(f)+'">'+e(f.title)+'</a><span class="file-path">'+e(f.path)+'</span></div><span class="badge">'+e(f.format)+'</span><span class="file-size" dir="ltr">'+size(f.bytes)+'</span><div class="row-actions"><a class="text-link" href="'+detail(f)+'">عرض</a><a class="text-link" href="'+raw(f.path)+'" download aria-label="تنزيل '+e(f.title)+'">'+downloadIcon+'</a></div></div>').join(''):empty();$('#file-more').hidden=files.length<=limit;syncQuery({q:text.value,kit:kit.value,format:format.value})}
 [text,kit,format].forEach(el=>el.addEventListener(el===text?'input':'change',()=>{limit=40;render()}));$('#file-more').addEventListener('click',()=>{limit+=40;render()});render();
}

if(page==='ui'){
 const type=$('#screen-type'),lang=$('#screen-lang'),width=$('#screen-width');let limit=12;
 D.screenTitles.forEach((title,i)=>{const id='S'+String(i+1).padStart(2,'0');type.add(new Option(id+' · '+title,id))});
 function render(){const list=D.screens.filter(s=>(type.value==='all'||s.screen===type.value)&&(lang.value==='all'||s.lang===lang.value)&&(width.value==='all'||String(s.width)===width.value));$('#screen-count').textContent=list.length+' تركيبًا مطابقًا من 104';$('#screen-results').innerHTML=list.length?list.slice(0,limit).map(s=>'<article class="screen-card"><a class="screen-preview '+(s.width===390?'mobile':'')+'" href="viewer.html?screen='+e(s.id)+'"><img src="library/'+e(s.preview)+'" alt="'+e(s.title)+' — '+s.lang+' — '+s.width+'" loading="lazy"></a><div class="screen-caption"><span class="eyebrow">'+s.id+'</span><h3>'+e(s.title)+'</h3><div class="actions"><a class="text-link" href="viewer.html?screen='+e(s.id)+'">جرّب الشاشة ←</a><a class="text-link" href="library/'+e(s.preview)+'" download>PNG ↓</a></div></div></article>').join(''):empty('لا توجد تركيبات لهذا المقاس واللغة.');$('#screen-more').hidden=list.length<=limit}
 [type,lang,width].forEach(el=>el.addEventListener('change',()=>{limit=12;render()}));$('#screen-more').addEventListener('click',()=>{limit+=12;render()});render();
 $('#component-results').innerHTML=D.components.map(c=>'<details class="component-item" id="'+e(c.id)+'"><summary><span class="badge">'+e(c.id)+'</span><h3>'+e(c.name)+'</h3></summary><p class="small" dir="ltr">'+e(c.purpose)+'</p><dl><dt>الحالات</dt><dd>'+e(c.states.join(' · '))+'</dd><dt>البنية</dt><dd>'+e(c.anatomy.join(' · '))+'</dd><dt>القيم</dt><dd>'+e(c.tokens.join(', '))+'</dd><dt>لوحة المفاتيح</dt><dd>'+e(c.keyboard)+'</dd></dl><a class="text-link" href="viewer.html?special=components&anchor='+e(c.id)+'">المثال الحي ←</a></details>').join('');
}

if(page==='social'){
 const kind=$('#social-kind'),lang=$('#social-lang'),mode=$('#social-mode');
 function render(){const list=D.templates.filter(t=>kind.value==='all'||t.id.startsWith(kind.value)),l=lang.value,m=mode.value;$('#social-count').textContent=list.length+' قالبًا · '+(l==='ar'?'العربية':'English')+' · '+(m==='filled'?'أمثلة مكتملة':'قوالب فارغة');$('#social-results').innerHTML=list.map(t=>{const x=D.socialExports.find(x=>x.id===t.id&&x.lang===l&&x.mode===m);return '<article class="template-card"><a class="template-preview" href="viewer.html?template='+t.id+'&lang='+l+'&mode='+m+'"><img src="library/04_SOCIAL_KIT/'+e(x.png)+'" alt="'+e(t[l].title.replace(/\n/g,' '))+'" loading="lazy"></a><div class="template-caption"><span class="eyebrow">'+t.id+' / '+t.width+' × '+t.height+'</span><h3>'+e(t[l].title.replace(/\n/g,' '))+'</h3><div class="actions"><a class="text-link" href="viewer.html?template='+t.id+'&lang='+l+'&mode='+m+'">افتح المحرر ←</a><a class="text-link" href="library/04_SOCIAL_KIT/'+e(x.png)+'" download>PNG ↓</a><a class="text-link" href="library/04_SOCIAL_KIT/'+e(x.jpg)+'" download>JPG ↓</a></div></div></article>'}).join('');$('#carousel-results').innerHTML=['CA01','CA02'].map((id,i)=>{const x=D.socialExports.find(x=>x.id===id+'-01'&&x.lang===l);return '<a class="kit-card" href="viewer.html?carousel='+id+'&lang='+l+'"><div class="kit-art social">'+[1,2,3].map(n=>{const s=D.socialExports.find(x=>x.id===id+'-0'+n&&x.lang===l);return '<img src="library/04_SOCIAL_KIT/'+e(s.png)+'" alt="شريحة '+n+' من '+id+'" loading="lazy">'}).join('')+'</div><div class="kit-caption"><span class="number">0'+(i+1)+'</span><div><h3>'+(i===0?'من القطعة إلى يوم العمل':'من يوم العمل إلى مشوار خفيف')+'</h3><p>6 شرائح مترابطة · '+(l==='ar'?'العربية':'English')+'</p></div><span class="arrow" aria-hidden="true">←</span></div></a>'}).join('')}
 [kind,lang,mode].forEach(el=>el.addEventListener('change',render));render();
}

if(page==='engines'){
 const statuses={IMPLEMENTED_LOCAL:'تنفيذ محلي',IMPLEMENTED_LOCAL_DEMO:'نموذج تفاعلي محلي',IMPLEMENTED_LOCAL_GALLERY:'معرض محلي',IMPLEMENTED_LOCAL_SOURCE:'مصدر ويب محلي',IMPLEMENTED_LOCAL_TOOL:'أداة محلية',DESIGN_CONTRACT_ONLY:'عقد تصميم فقط'};
 $('#engine-results').innerHTML=D.engines.map(x=>'<article class="engine-card" '+(x.id==='engine:motion'?'id="motion-engine"':'')+'><span class="badge">'+e(statuses[x.status]||x.status)+'</span><h3>'+e(x.id)+'</h3><p class="description">'+e(x.purpose)+'</p><ul>'+x.masters.map(p=>'<li>'+sourceLink('library/'+p,p)+'</li>').join('')+'</ul><p class="description muted small">'+e(x.limits)+'</p></article>').join('');
}
if(page==='docs')$('#featured-docs').innerHTML=docs().map(([title,desc,path],i)=>'<article class="doc-card"><span class="en">'+String(i+1).padStart(2,'0')+'</span><h3>'+e(title)+'</h3><p>'+e(desc)+'</p><a class="text-link" href="'+docLink(path)+'">اقرأ الدليل ←</a></article>').join('');

function getRequestedFile(){return byId.get(q.get('id'))||byPath.get(q.get('path'))}
if(page==='asset'){
 const f=getRequestedFile();
 if(!f){$('#asset-detail').innerHTML=empty('هذا الملف غير موجود في الفهرس.')}else{
  document.title=f.title+' · DoLaby Library';const dims=f.dimensions?f.dimensions.join(' × ')+(f.format==='SVG'?' / viewBox':' px'):'—';
  const display=image(f)?'<img src="'+raw(f.path)+'" alt="'+e(f.title)+'">':f.kind==='pdf'?'<iframe src="'+raw(f.path)+'" title="'+e(f.title)+'"></iframe>':f.kind==='font'?'<span class="font-glyph en" style="font-size:95px">Aa / أب</span>':'<span class="file-symbol">'+e(f.format)+'</span>';
  const open=f.kind==='html'?'<a class="button" href="viewer.html?id='+f.id+'">افتح المعاينة ←</a>':f.kind==='document'?'<a class="button" href="'+docLink(f.path)+'">اقرأ الدليل ←</a>':'<a class="button soft" href="'+raw(f.path)+'" target="_blank" rel="noopener">افتح الملف ↗</a>';
  $('#asset-detail').innerHTML='<div class="detail-layout"><div class="detail-preview">'+display+'</div><div class="detail-info"><span class="eyebrow">'+e(f.format)+' / '+e(f.kitLabel)+'</span><h2>'+e(f.title)+'</h2><p class="muted">'+(f.editable?'مصدر قابل للتحرير. راجع التبعيات والأصول المشتركة قبل تغيير النسخة.':'تصدير جاهز للاستخدام أو القراءة. المصدر القابل للتحرير موجود ضمن ملفات المجموعة.')+'</p><dl class="detail-meta"><dt>الصيغة</dt><dd>'+e(f.format)+'</dd><dt>الحجم</dt><dd>'+size(f.bytes)+'</dd><dt>المقاس</dt><dd>'+e(dims)+'</dd><dt>المصدر</dt><dd>'+e(f.origin)+'</dd><dt>المسار</dt><dd>'+e(f.path)+'</dd><dt>SHA256</dt><dd style="font:10px/1.8 monospace">'+e(f.sha256||'فهرس مشتق؛ بصمته لا تُضمّن في ذاته')+'</dd></dl><div class="actions"><a class="button" href="'+raw(f.path)+'" download>تنزيل '+e(f.format)+' ↓</a>'+open+'</div><div class="actions" style="margin-top:16px"><button class="button small-button soft" id="copy-path">نسخ المسار</button><a class="text-link" href="'+e(sourceURL(f))+'" target="_blank" rel="noopener">المصدر على GitHub ↗</a></div></div></div>';
  $('#copy-path').addEventListener('click',()=>copy(f.path));
  if(['SVG','HTML','CSS','JS','CJS','JSON','MD','TXT','CSV','PY','COMMAND','YML','YAML'].includes(f.format)){
   const box=document.createElement('details');box.className='source-section';box.innerHTML='<summary>اعرض المصدر النصي</summary><pre class="code-block" tabindex="0">جارٍ تحميل المصدر…</pre>';$('#asset-detail').append(box);let loaded=false;box.addEventListener('toggle',async()=>{if(!box.open||loaded)return;loaded=true;try{const response=await fetch(f.path);if(!response.ok)throw Error();const text=await response.text();box.querySelector('pre').textContent=text.length>100000?text.slice(0,100000)+'\n\n… المعاينة مختصرة. نزّل الملف لقراءة المصدر كاملًا.':text}catch{box.querySelector('pre').textContent='المعاينة النصية تحتاج خادم عرض محلي أو الموقع المنشور. يمكنك فتح الملف أو تنزيله مباشرة.'}});
  }
  const stem=f.path.split('/').pop().replace(/\.[^.]+$/,'').replace(/-(\d+)-(transparent|ivory)$/,'').replace(/-(128|512)$/,'');
  const related=D.files.filter(x=>x.id!==f.id&&x.path.split('/').pop().replace(/^(states-|poses-)/,'').startsWith(stem)&&x.kind==='image').slice(0,8);if(related.length){$('#related-section').hidden=false;$('#related-files').innerHTML=related.map(assetCard).join('')}
 }
}

if(page==='viewer'){
 let path='',label='',width=1080,height=950,download='',query='',anchor='',help='المعاينة تستخدم المصدر المحلي نفسه. لا تُرسل مدخلات إلى خدمة خارجية.';
 const l=q.get('lang')==='en'?'en':'ar',m=q.get('mode')==='empty'?'empty':'filled';let carousel=null;let templateEditor=false;
 if(q.has('screen')){const s=D.screens.find(x=>x.id===q.get('screen'));if(s){const parts=s.url.split('?');path='library/'+parts[0];query=parts[1]||'';label=s.title+' · '+s.lang+' · '+s.width;width=s.width;height=950;download='library/'+s.source;help='نموذج عرض ببيانات مصطنعة وحالة جلسة محلية؛ تغيير الوصف لا يشغّل محرك تنسيق AI.'}}
 else if(q.has('template')){const t=D.templates.find(x=>x.id===q.get('template'));if(t){templateEditor=true;path='library/04_SOCIAL_KIT/editor.html';query=new URLSearchParams({id:t.id,lang:l,mode:m}).toString();label=t[l].title.replace(/\n/g,' ');width=1080;height=t.height+180;download='library/04_SOCIAL_KIT/'+D.socialExports.find(x=>x.id===t.id&&x.lang===l&&x.mode===m).source;help='اختر النص لتحريره أو استبدل الرسم بصورة محلية. احفظ HTML من أدوات المحرر قبل تغيير القالب أو اللغة.'}}
 else if(q.has('carousel')){const id=q.get('carousel');const first=D.socialExports.find(x=>x.id===id+'-01'&&x.lang===l);if(first){carousel={id,lang:l,slide:1};path='library/04_SOCIAL_KIT/'+first.sourceURL.split('?')[0];query='clean=1';label=id+' · كاروسيل من 6 شرائح';height=1350;width=1080;download='library/04_SOCIAL_KIT/'+first.source;help='تسلسل من ست شرائح، بمصادر HTML وتصديرات PNG/JPG منفصلة لكل شريحة.'}}
 else if(q.get('special')==='motion'){path='library/02_BRAND_KIT/motion-web-demo/index.html';label='حركة هوية DoLaby';width=1200;height=1000;download=path}
 else if(q.get('special')==='social-motion'){path='library/04_SOCIAL_KIT/motion/index.html';label='افتتاحية وخاتمة المحتوى';width=1080;height=2070;download=path}
 else if(q.get('special')==='components'){path='library/03_UIUX_KIT/components/index.html';label='المعرض الحي للمكونات';width=1200;height=1000;download=path;anchor=/^U\d{2}$/.test(q.get('anchor')||'')?q.get('anchor'):''}
 else{const f=getRequestedFile();if(f&&f.kind==='html'){path=f.path;label=f.title;width=1200;height=1000;download=path}}
 if(!path||!byPath.has(path)){$('#viewer-content').innerHTML=empty('المعاينة المطلوبة غير موجودة.')}else{
  document.title=label+' · DoLaby Library';const url=()=>path+(query?'?'+query:'')+(anchor?'#'+anchor:'');
  $('#viewer-content').innerHTML='<div class="viewer-shell"><div class="viewer-toolbar"><div><span class="badge">HTML / LIVE SOURCE</span><strong style="display:block;margin-top:5px">'+e(label)+'</strong></div><div class="actions"><label class="small" for="viewer-width">العرض</label><select id="viewer-width"><option value="390">هاتف · 390</option><option value="768">لوحي · 768</option><option value="1080">محتوى · 1080</option><option value="1200">عرض · 1200</option><option value="1440">كمبيوتر · 1440</option></select><button class="button small-button soft" id="viewer-fit" aria-pressed="true">ملاءمة العرض</button><a class="text-link" id="viewer-original" href="'+e(url())+'" target="_blank" rel="noopener">افتح الأصل ↗</a><a class="text-link" id="viewer-download" href="'+e(download)+'" download>HTML ↓</a></div></div>'+(carousel?'<div class="viewer-toolbar"><label for="carousel-slide">الشريحة</label><select id="carousel-slide">'+[1,2,3,4,5,6].map(i=>'<option value="'+i+'">'+i+' / 6</option>').join('')+'</select><a id="carousel-png" class="text-link" download>تنزيل PNG ↓</a></div>':'')+'<div class="viewer-stage" id="viewer-stage"><div id="viewer-inner" style="position:relative;flex:none"><iframe id="source-frame" title="'+e(label)+'" sandbox="allow-scripts allow-same-origin allow-forms allow-downloads allow-modals" src="'+e(url())+'" loading="eager"></iframe></div></div><div class="viewer-meta"><p>'+e(help)+'</p><a class="text-link" href="downloads.html">للتشغيل والتحرير محليًا: حمّل الحزمة بتبعياتها ←</a></div></div>';
  const select=$('#viewer-width'),frame=$('#source-frame'),stage=$('#viewer-stage'),inner=$('#viewer-inner');select.value=String(width);let fit=true;
  if(templateEditor){
   const save=document.createElement('button');save.className='button small-button';save.id='save-viewer-html';save.textContent='حفظ تعديلات HTML';$('#viewer-download').before(save);
   frame.addEventListener('load',()=>{const nested=frame.contentDocument?.querySelector('#save');if(nested)nested.hidden=true});
   save.addEventListener('click',()=>{try{
    const doc=frame.contentDocument,board=doc.querySelector('#artboard');if(!board)throw Error();
    const clone=doc.documentElement.cloneNode(true);clone.querySelectorAll('script').forEach(x=>x.remove());clone.querySelector('#toolbar')?.remove();clone.querySelector('body').classList.add('clean');
    const packageBase=new URL('library/',location.href).href;
    clone.querySelectorAll('[src],[href]').forEach(el=>{for(const attr of ['src','href']){const value=el.getAttribute(attr);if(!value||!value.startsWith('http')&&!value.startsWith('file:'))continue;const u=new URL(value,frame.src);if(u.href.startsWith(packageBase))el.setAttribute(attr,'../'+u.href.slice(packageBase.length));}});
    const blob=new Blob(['<!doctype html>'+clone.outerHTML],{type:'text/html;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=(board.dataset.template||'template')+'-'+(board.dataset.language||l)+'-edited.html';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),2000);toast('أُنشئت نسخة HTML بالتعديلات الحالية. ضعها داخل مجلد04_SOCIAL_KIT للحفاظ على التبعيات.');
   }catch{toast('تعذر قراءة المصدر المعدّل. افتح المحرر الأصلي لحفظ النسخة.')}});
  }

  function resize(){width=Number(select.value);const scale=fit?Math.min(1,(stage.clientWidth-40)/width):1;inner.style.width=(width*scale)+'px';inner.style.height=(height*scale)+'px';frame.style.cssText='position:absolute;left:0;top:0;width:'+width+'px;height:'+height+'px;transform-origin:top left;transform:scale('+scale+');';stage.style.height=Math.min(900,Math.max(330,height*scale+40))+'px'}
  select.addEventListener('change',resize);$('#viewer-fit').addEventListener('click',()=>{fit=!fit;$('#viewer-fit').setAttribute('aria-pressed',String(fit));resize()});window.addEventListener('resize',resize);resize();
  if(carousel){function choose(){const slide=$('#carousel-slide').value,x=D.socialExports.find(x=>x.id===carousel.id+'-0'+slide&&x.lang===carousel.lang);path='library/04_SOCIAL_KIT/'+x.sourceURL.split('?')[0];query='clean=1';frame.src=url();$('#viewer-original').href=url();$('#viewer-download').href='library/04_SOCIAL_KIT/'+x.source;$('#carousel-png').href='library/04_SOCIAL_KIT/'+x.png}$('#carousel-slide').addEventListener('change',choose);choose()}
 }
}

// Small safe Markdown reader: source HTML is escaped, links are protocol-checked.
function markdown(text,base){
 const lines=text.replace(/\r/g,'').split('\n');let out=[],code=false,buffer=[],list=false,table=false;
 function inline(s){let value=e(s);value=value.replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');value=value.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(all,label,target)=>{try{const u=new URL(target.replace(/&amp;/g,'&'),base);if(!['http:','https:','file:'].includes(u.protocol))return label;return '<a href="'+e(u.href)+'" target="_blank" rel="noopener">'+label+'</a>'}catch{return label}});return value}
 function close(){if(list){out.push('</ul>');list=false}if(table){out.push('</tbody></table></div>');table=false}}
 for(let i=0;i<lines.length;i++){
  const line=lines[i];if(/^```/.test(line)){if(code){out.push('<pre tabindex="0"><code>'+e(buffer.join('\n'))+'</code></pre>');buffer=[];code=false}else{close();code=true}continue}if(code){buffer.push(line);continue}
  if(/^\s*\|/.test(line)){if(/^\s*\|?[\s:|-]+\|?\s*$/.test(line))continue;const cells=line.trim().replace(/^\||\|$/g,'').split('|').map(x=>inline(x.trim()));if(!table){if(list){out.push('</ul>');list=false}out.push('<div class="table-scroll"><table><tbody>');table=true}out.push('<tr>'+cells.map(x=>'<td>'+x+'</td>').join('')+'</tr>');continue}else if(table){out.push('</tbody></table></div>');table=false}
  const h=line.match(/^(#{1,4})\s+(.+)/);if(h){close();out.push('<h'+Math.min(5,h[1].length+1)+'>'+inline(h[2])+'</h'+Math.min(5,h[1].length+1)+'>');continue}
  if(/^\s*([-*]|\d+\.)\s+/.test(line)){if(!list){out.push('<ul>');list=true}out.push('<li>'+inline(line.replace(/^\s*([-*]|\d+\.)\s+/,''))+'</li>');continue}
  if(!line.trim()){close();continue}close();out.push(line.startsWith('>')?'<blockquote>'+inline(line.slice(1))+'</blockquote>':'<p>'+inline(line)+'</p>');
 }
 close();if(code)out.push('<pre>'+e(buffer.join('\n'))+'</pre>');return out.join('');
}
if(page==='document'){
 const path=q.get('path')||'library/00_START_HERE/README_AR.md',f=byPath.get(path);
 $('#document-sidebar').innerHTML=docs().map(([title,,p])=>'<a href="'+docLink(p)+'"'+(path===p?' aria-current="page"':'')+'>'+e(title)+'</a>').join('');
 if(!f||f.kind!=='document'){$('#document-content').innerHTML=empty('الدليل المطلوب غير موجود.')}else{
  document.title=f.title+' · DoLaby Library';$('#document-actions').innerHTML='<a class="button" href="'+raw(f.path)+'" download>تنزيل المصدر '+e(f.format)+' ↓</a><a class="text-link" href="'+detail(f)+'">تفاصيل الملف ←</a>';
  (async()=>{try{const response=await fetch(f.path);if(!response.ok)throw Error();const text=await response.text();$('#document-content').innerHTML=markdown(text,new URL(f.path,location.href))}catch{$('#document-content').innerHTML='<p class="spec-note">لقراءة الدليل داخل هذه الصفحة، افتح الموقع المنشور أو خادم العرض المحلي. يمكنك فتح المصدر مباشرة أو تنزيله.</p><a class="button" href="'+raw(f.path)+'" target="_blank" rel="noopener">افتح المصدر ↗</a>'}})();
 }
}
})();
