#!/usr/bin/env python3
"""Build root HTML and derived catalog from canonical site-src and library files. Stdlib only."""
from pathlib import Path
import json,hashlib,csv,re,html,struct
R=Path(__file__).resolve().parents[1]
CFG=json.loads((R/'site.config.json').read_text())
NAV=[('index.html','الرئيسية'),('brand.html','الهوية'),('assets.html','الأصول'),('ui.html','الواجهات'),('social.html','المحتوى'),('docs.html','الأدلة')]
LOGO='library/01_SHARED_FOUNDATIONS/canonical-logo/logo-lockup.svg'
ICONS='''<svg xmlns="http://www.w3.org/2000/svg" style="display:none"><symbol id="i-search" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></symbol><symbol id="i-download" viewBox="0 0 24 24"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/></symbol><symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></symbol><symbol id="i-code" viewBox="0 0 24 24"><path d="m8 5-7 7 7 7M16 5l7 7-7 7M14 3l-4 18"/></symbol></svg>'''
def icon(name):return '<svg class="icon" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"><use href="#i-'+name+'"></use></svg>'
def nav(current):return ''.join('<a href="'+p+'"'+(' aria-current="page"' if p==current else '')+'>'+label+'</a>' for p,label in NAV)
def head(title):return f'''<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="مكتبة دولابي للهوية والأصول والواجهات وقوالب المحتوى. معاينات حقيقية، مصادر قابلة للتحرير، وتنزيلات منظمة."><meta name="theme-color" content="#FCF8F0"><title>{html.escape(title)} · DoLaby Library</title><link rel="icon" href="library/02_BRAND_KIT/logo-exports/favicon.ico"><link rel="stylesheet" href="assets/site.css"><script defer src="data/catalog.js"></script><script defer src="assets/site.js"></script>'''
def header(current):return f'''<a class="skip-link" href="#main">تجاوز إلى المحتوى</a>{ICONS}<header class="site-header"><div class="wrap header-inner"><a class="site-logo" href="index.html" aria-label="DoLaby — المكتبة الرئيسية"><img src="{LOGO}" width="164" height="48" alt="DoLaby"></a><nav class="site-nav" aria-label="التنقل الرئيسي">{nav(current)}</nav><div class="header-tools"><button class="search-trigger" data-open-search aria-label="ابحث في المكتبة">{icon('search')}<span class="search-word">بحث</span><span class="key" aria-hidden="true">⌘ K</span></button><a class="button small-button" href="downloads.html">التنزيلات {icon('download')}</a><button class="button icon-button menu-toggle" id="menu-toggle" aria-expanded="false" aria-controls="mobile-nav" aria-label="فتح قائمة التنقل">{icon('menu')}</button></div></div><nav class="mobile-nav" id="mobile-nav" aria-label="التنقل على الهاتف">{nav(current)}<a href="engines.html">المحركات</a><a href="files.html">كل الملفات</a><a href="downloads.html">التنزيلات</a></nav></header>'''
def footer():return f'''<footer class="site-footer"><div class="wrap"><div class="footer-top"><div><img class="footer-logo" src="{LOGO}" alt="DoLaby"><p>أصل مشترك، وحضور متّسق.<br>مكتبة الهوية والتجربة والمحتوى، بالمصادر التي بُنيت منها.</p><span class="eyebrow">just say dolaby<br>and get ready with laby</span></div><div><h3>تصفّح المكتبة</h3><div class="footer-links"><a href="brand.html">الهوية البصرية</a><a href="assets.html">الأصول المنفردة</a><a href="ui.html">الواجهات والمكونات</a><a href="social.html">قوالب المحتوى</a></div></div><div><h3>المصادر والتسليم</h3><div class="footer-links"><a href="engines.html">المحركات وملفات التنفيذ</a><a href="docs.html">الأدلة والفحوص</a><a href="files.html">فهرس جميع الملفات</a><a href="downloads.html">الحزم والتراخيص</a><a href="{CFG['repository']}" target="_blank" rel="noopener">المستودع على GitHub ↗</a></div></div></div><div class="footer-bottom"><span>DoLaby · مكتبة التصميم <bdi>1.0.0</bdi> · مصادر الحزم <bdi>1.0.0</bdi></span><span>نموذج المنتج يستخدم بيانات مصطنعة. تفاصيل التنفيذ وحدوده في الأدلة.</span></div></div></footer><dialog class="search-dialog" id="search-dialog" aria-labelledby="search-title"><div class="search-dialog-head"><label class="sr-label" for="global-search" id="search-title" hidden>ابحث في جميع ملفات المكتبة</label><input id="global-search" type="search" placeholder="ابحث عن شعار، قالب، مكوّن أو ملف…" aria-label="ابحث في جميع ملفات المكتبة" autocomplete="off"><button class="button soft" id="close-search" aria-label="إغلاق البحث">إغلاق</button></div><p class="search-hint" id="search-count">ابدأ بكتابة اسم أو نوع الملف.</p><div class="search-results" id="search-results"></div></dialog><div class="toast" id="toast" role="status" aria-live="polite" hidden></div>'''

def parse_assignment(path,name):
 s=path.read_text();return json.loads(s.split(name+'=',1)[1].strip().removesuffix(';'))
def id_for(path):return 'f-'+hashlib.sha256(path.encode()).hexdigest()[:12]
def read_json(p):return json.loads((R/'library'/p).read_text())

PAGE_META=json.loads((R/'site-src/pages.json').read_text())
for page in PAGE_META:
 source=(R/'site-src'/page['file']).read_text()
 output='<!doctype html><html lang="ar" dir="rtl"><head>'+head(page['title'])+'</head><body data-page="'+page['key']+'">'+header(page['file'])+source+footer()+'</body></html>'
 (R/page['file']).write_text(output)

ASSET_PATHS=set()
with (R/'library/00_START_HERE/asset-library.csv').open(encoding='utf-8-sig') as f:
 for row in csv.DictReader(f):ASSET_PATHS.add('library/'+row['path'])
NAMES={'ring-master':'الحلقة الأساسية','logo-lockup':'الشعار المركّب','wordmark-outlined':'الكلمة — مسارات متجهية','wordmark-live':'الكلمة — نص حي','tagline-one':'العبارة في سطر','tagline-two':'العبارة في سطرين','avatar':'صورة الملف الشخصي','favicon':'أيقونة الموقع','laby-front':'لابي — أمامي','laby-side':'لابي — جانبي','laby-back':'لابي — خلفي','laby-three-quarter':'لابي — ثلاثة أرباع','laby-seated':'لابي — جلوس','laby-standing':'لابي — وقوف','laby-small':'لابي — المقاس الصغير','symbol-wardrobe':'رمز الدولاب','symbol-camera':'رمز الصورة','symbol-mirror':'رمز المرآة','symbol-outfit-wheel':'دائرة الإطلالة','symbol-garment-button':'رمز زر الملابس','symbol-color-selection':'اختيار الألوان','shirt':'رسم القميص','trousers':'رسم البنطلون','shoes':'رسم الحذاء','scarf':'رسم الوشاح','tote':'رسم الحقيبة','brand-book':'كتاب الهوية','tokens':'قيم التصميم المشتركة','entity-schemas':'تعريفات الكيانات السبعة','demo-data':'البيانات التجريبية','microcopy':'نصوص الواجهة','component-catalog':'كتالوج المكونات','motion-spec':'مواصفات الحركة','README_ENGINE_AR':'دليل المحركات بالعربية','README_ENGINE_EN':'دليل المحركات بالإنجليزية','architecture-and-integration':'بنية المحركات وحدود الربط','known-limitations':'حدود التسليم','acceptance':'نتائج فحوص القبول','copy-library':'النصوص والأوصاف البديلة','rights-register':'سجل حقوق الأصول','platform-verification':'توثيق مقاسات المنصات','requirement-completion':'سجل اكتمال المتطلبات','engine-map':'خريطة المحركات','font-manifest':'فهرس الخطوط','asset-register':'سجل الأصول','final-file-verification':'الفحص النهائي للملفات','sources-and-rights':'المصادر والحقوق','export-guide':'دليل التصدير','index':'صفحة العرض','app':'محرك الواجهة','render':'محرك القوالب','styles':'تنسيق القوالب','catalog':'عرض المكونات'}
KIT_NAMES={'foundations':'الأسس المشتركة','brand':'الهوية البصرية','ui':'الواجهات','social':'المحتوى الاجتماعي','engines':'المحركات','docs':'الأدلة','qa':'الفحوص','site':'مصدر الموقع'}
def title_for(p):
 stem=p.stem
 if stem in NAMES:return NAMES[stem]
 for name in sorted(NAMES,key=len,reverse=True):
  if stem.startswith(name+'-'):
   tail=stem[len(name)+1:].replace('transparent','شفاف').replace('ivory','عاجي')
   return NAMES[name]+' · '+tail
 return stem.replace('-',' ').replace('_',' ')
def kit_for(path):
 for prefix,kit in [('00_','docs'),('01_','foundations'),('02_','brand'),('03_','ui'),('04_','social'),('05_','qa'),('06_','engines')]:
  if path.startswith(prefix):return kit
 return 'docs'
def record(p,library=True):
 path=p.relative_to(R).as_posix();rel=p.relative_to(R/'library').as_posix() if library else path
 fmt=p.suffix.lower().lstrip('.') or 'file';data=p.read_bytes()
 kind='image' if fmt in ['svg','png','jpg','jpeg','ico'] else 'html' if fmt=='html' else 'pdf' if fmt=='pdf' else 'download' if fmt=='zip' else 'font' if fmt in ['woff2','ttf','otf'] else 'document' if fmt in ['md','txt'] else 'data' if fmt in ['json','csv'] else 'code'
 dims=None
 if fmt=='png' and data[:8]==b'\x89PNG\r\n\x1a\n':dims=list(struct.unpack('>II',data[16:24]))
 if fmt=='svg':
  m=re.search(r'viewBox=["\']([\d. -]+)',data.decode('utf8'))
  if m:
   a=m[1].split()
   if len(a)==4:dims=[float(a[2]),float(a[3])]
 kit=kit_for(rel) if library else ('qa' if path.startswith('qa/') else 'docs' if path.startswith(('docs/','downloads/')) else 'site')
 lang='ar' if re.search(r'[-/]ar(?:[-./]|$)|_AR',path) else 'en' if re.search(r'[-/]en(?:[-./]|$)|_EN',path) else 'shared'
 return {'id':id_for(path),'path':path,'relative':rel,'title':title_for(p),'kit':kit,'kitLabel':KIT_NAMES[kit],'format':fmt.upper(),'kind':kind,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'dimensions':dims,'language':lang,'editable':fmt in ['svg','html','css','js','cjs','json','md','txt','csv','py','command','yml','yaml'],'asset':path in ASSET_PATHS or kind=='font','origin':'kit-v1.0.0' if library else 'site-source'}
files=[record(p) for p in sorted((R/'library').rglob('*')) if p.is_file()]
for sub in ['assets','scripts','site-src','docs','qa','downloads']:
 for p in sorted((R/sub).rglob('*')):
  if p.is_file() and '__pycache__' not in str(p) and not p.name.startswith('.'):files.append(record(p,False))
for p in sorted(R.glob('*.html')):files.append(record(p,False))
for name in ['README.md','site.config.json']:
 if (R/name).is_file():files.append(record(R/name,False))
for name,fmt,title in [('catalog.json','JSON','فهرس المكتبة المشتق'),('catalog.js','JS','بيانات الفهرس للمتصفح'),('file-index.csv','CSV','فهرس الملفات CSV')]:
 path='data/'+name
 files.append({'id':id_for(path),'path':path,'relative':path,'title':title,'kit':'site','kitLabel':KIT_NAMES['site'],'format':fmt,'kind':'data' if fmt!='JS' else 'code','bytes':None,'sha256':None,'dimensions':None,'language':'shared','editable':True,'asset':False,'origin':'generated-index','hash_note':'Generated catalog excludes its own hash and byte count to avoid self-reference.'})
screens=read_json('03_UIUX_KIT/responsive-screens/compositions.json')
screen_titles=['إطلالة تبدأ بما تملكه','سياق اليوم','وصف القطعة أو صورتها','تأكيد القطعة وتصحيحها','توضيح الاختيارات','المثال جاهز للاستكشاف','اقتراح الإطلالة','استبدال قطعة','تفاصيل الإطلالة','الدولاب التدريجي','الإطلالات المحفوظة','حفظ الفكرة والحساب','تفضيلات الراحة والذوق','البيانات والموافقات','القطعة المكمّلة','تفاصيل المنتج والإحالة','الخطأ وإعادة المحاولة','اهتمام العلامات','تأكيد نهاية المثال','نظرة الإدارة','السجلات والمراجعة','تحرير المحتوى']
for s in screens:s['title']=screen_titles[int(s['screen'][1:])-1]
templates=parse_assignment(R/'library/04_SOCIAL_KIT/master/templates.js','window.SOCIAL_TEMPLATES')
catalog={'version':CFG['version'],'kitVersion':CFG['library_version'],'repository':CFG['repository'],'files':files,'screens':screens,'screenTitles':screen_titles,'components':read_json('03_UIUX_KIT/components/component-catalog.json'),'templates':templates,'socialExports':read_json('04_SOCIAL_KIT/export-index.json'),'engines':read_json('06_ENGINE_HANDOFF/engine-map.json')['engines'],'kitNames':KIT_NAMES,'counts':{'libraryFiles':sum(x['origin']=='kit-v1.0.0' for x in files),'siteFiles':sum(x['origin']=='site-source' for x in files),'assetFiles':sum(x['asset'] for x in files),'screenCompositions':len(screens),'componentFamilies':30,'templateConcepts':len(templates)}}
(R/'data/catalog.json').write_text(json.dumps(catalog,ensure_ascii=False,indent=2))
(R/'data/catalog.js').write_text('/* Generated by scripts/build.py; edit canonical sources. */\nwindow.DOLABY_CATALOG='+json.dumps(catalog,ensure_ascii=False,separators=(',',':'))+';\n')
with (R/'data/file-index.csv').open('w',encoding='utf-8-sig',newline='') as f:
 w=csv.DictWriter(f,fieldnames=['id','title','kit','format','path','bytes','sha256']);w.writeheader();w.writerows({k:v for k,v in x.items() if k in w.fieldnames} for x in files)
print('Built',len(PAGE_META),'HTML pages;',catalog['counts'])
