(async()=>{
const $=id=>document.getElementById(id),scene=$('motion-scene'),prefix=$('prefix'),suffix=$('suffix'),ring=$('ring-layer'),mascot=$('mascot-layer'),reveal=$('reveal-rect'),retrieve=$('retrieve-rect'),reduce=matchMedia('(prefers-reduced-motion: reduce)');
await document.fonts.load('600 104px "Cormorant Garamond"','DoLaby');await document.fonts.ready;
const left=150,prefixEnd=left+prefix.getComputedTextLength();suffix.setAttribute('x',prefixEnd);
const end=prefixEnd+suffix.getComputedTextLength(),start=end+56,rest=102,final=prefixEnd+72;
scene.dataset.prefixEnd=prefixEnd.toFixed(3);scene.dataset.suffixEnd=end.toFixed(3);
let running=false,t=1.6,last=0;
const clamp=v=>Math.max(0,Math.min(1,v)),ease=v=>{v=clamp(v);return v*v*(3-2*v)},mix=(a,b,u)=>a+(b-a)*ease(u);
function render(time){
t=Math.max(0,Math.min(4.8,time));let x,scale=1,alpha=0,bodyScale=0,phase;
if(t<.2){x=start;phase='dormant';}
else if(t<1.4){x=mix(start,rest,(t-.2)/1.2);phase='reveal';}
else if(t<2.15){x=rest;phase='hold';}
else if(t<3.7){x=mix(rest,end+28,(t-2.15)/1.55);phase='retrieve';alpha=ease((t-3.05)/.85);bodyScale=.4*alpha;scale=1-(1-.3)*alpha;}
else{alpha=1;bodyScale=.4;scale=.3;x=mix(end+28,final,(t-3.7)/.7);phase=t<4.4?'settle':'complete';}
const revealX=t<1.4?x+24:0;reveal.setAttribute('x',revealX);reveal.setAttribute('width',720-revealX);
const suffixClip=t<2.15?0:(t>=3.7?end:Math.max(prefixEnd,Math.min(end,x-24)));retrieve.setAttribute('x',suffixClip);retrieve.setAttribute('width',Math.max(0,end-suffixClip));
ring.setAttribute('transform',`translate(${x} 128) scale(${scale})`);
mascot.setAttribute('transform',`translate(${x} 128) scale(${bodyScale})`);mascot.setAttribute('opacity',alpha);
prefix.dataset.unchanged='true';scene.dataset.phase=phase;scene.dataset.time=t.toFixed(3);scene.dataset.ringX=x.toFixed(3);scene.dataset.mascotAlpha=alpha.toFixed(3);scene.dataset.suffixClip=suffixClip.toFixed(3);
$('time').textContent=t.toFixed(2)+' / 4.80 s';$('seek').value=t;
}
function stop(message){running=false;scene.dataset.playing='false';if(message)$('status').textContent=message;}
function tick(stamp){if(!running)return;if(!last)last=stamp;t+=(stamp-last)/1000;last=stamp;render(t);if(t>=4.8){stop('انتهى المشهد. الاسم الكامل ثابت في رابط البداية.');return;}requestAnimationFrame(tick);}
$('play').addEventListener('click',()=>{if(reduce.matches){render(1.6);stop('تقليل الحركة مفعّل: تظهر الهوية الكاملة دون انتقال.');return;}t=0;last=0;running=true;scene.dataset.playing='true';$('status').textContent='مشهد العلامة قيد التشغيل.';render(0);requestAnimationFrame(tick);});
$('pause').addEventListener('click',()=>stop('الحركة متوقفة مؤقتًا عند '+t.toFixed(2)+' ثانية.'));
$('skip').addEventListener('click',()=>{stop();render(1.6);scene.dataset.phase='skipped';$('status').textContent='تم التخطي إلى الاسم الكامل الثابت.';});
$('seek').addEventListener('input',e=>{stop();render(Number(e.target.value));$('status').textContent='معاينة توقيت يدوي؛ ليست حالة معالجة في المنتج.';});
$('language').addEventListener('click',()=>{const ar=document.documentElement.dir!=='rtl';document.documentElement.dir=ar?'rtl':'ltr';document.documentElement.lang=ar?'ar':'en';scene.setAttribute('direction','ltr');});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop('توقفت الحركة عند انتقال المتصفح إلى الخلفية.');});
new IntersectionObserver(entries=>{if(!entries[0].isIntersecting&&running)stop('توقفت الحركة خارج مساحة العرض.');},{threshold:.05}).observe($('stage'));
reduce.addEventListener('change',()=>{if(reduce.matches){stop();render(1.6);$('status').textContent='تقليل الحركة مفعّل؛ هوية كاملة ثابتة.';}});
render(1.6);if(reduce.matches)$('status').textContent='تقليل الحركة مفعّل؛ هوية كاملة ثابتة.';
const seekParam=new URLSearchParams(location.search).get('t');if(seekParam!==null&&!reduce.matches){render(Number(seekParam));$('status').textContent='معاينة توقيت يدوي؛ ليست حالة معالجة في المنتج.';}
})();