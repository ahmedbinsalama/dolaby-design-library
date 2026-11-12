from pathlib import Path
import csv,json,html

ROOT=Path(__file__).resolve().parent
def write(path,text):
 p=ROOT/path;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text,encoding='utf-8')
def csvfile(path,rows):
 with (ROOT/path).open('w',encoding='utf-8-sig',newline='') as f:
  w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
names=['Header / Navigation','Wordmark / AssistantTrigger','Button / IconButton','Link','TextField / Email / URL','Textarea / Composer','Select / Combobox','Checkbox','Radio','Switch','Chip / Filter','Tabs','Dialog / Sheet','Toast / Alert','Tooltip / Help','Stepper / Progress','ImageUpload / Capture','GarmentCard','OutfitCard','MerchantProductCard','SuggestionReason / SourceLabel','ConversationMessage / LabyState','Carousel / AlternativeList','Empty / Error / Loading','ConsentGroup','Account / PreferenceForm','Search / Sort','Table / MobileRecordCard','Status / Tag / VerificationLabel','Export / ContentRevisionControls']
purposes=['Keep core task, wardrobe and saved ideas reachable.','Home identity and text-assistant action remain distinct.','Make the next reversible action clear; disabled/loading communicates scope.','Navigate to a real destination, without acting as a false button.','Collect a short labeled value with suitable input semantics.','Accept garment description or guided text without a photo requirement.','Offer a compact set of choices using native selection behavior.','Set an independent yes/no fact or permission choice.','Choose exactly one option in a named group.','Change one explicit purpose-specific local preference.','Choose context/filter without discarding current task input.','Switch a related view while preserving orientation.','Confirm consequential local actions with a cancel route.','Announce actual local success/failure and a clear next action.','Explain why a question is asked without hiding critical instructions.','Orient the three-step task without suggesting progress from a server.','Accept an optional local file; description remains equivalent.','Show garment illustration, ownership/source and available actions.','Present an outfit idea with editable parts and no-buy path.','Keep merchant provenance, sample price and external responsibility visible.','Explain a recommendation and distinguish fact from inference.','Associate assistant copy with a real interaction state.','Offer alternatives in a static equivalent list; no automatic cycling.','Make empty/failure/wait states actionable and truthful.','Keep availability, offers and research choices separate.','Request account at save and support later preference changes.','Find and order relevant records without hidden exclusion.','Compare records on desktop and provide readable mobile cards.','Describe status/source certainty with text, never color alone.','Export synthetic records or preview local content without public publishing.']
states={
1:['default','current destination','keyboard focus'],2:['home link','assistant trigger','focus'],3:['default','hover','pressed','focus','disabled','loading'],4:['default','hover','focus','visited'],5:['empty','filled','focus','error','disabled'],6:['empty','filled','focus','error'],7:['closed','open native options','selected','disabled'],8:['unchecked','checked','focus','disabled'],9:['unselected','selected','focus','disabled'],10:['off','on','focus','disabled'],11:['unselected','selected','focus'],12:['active','inactive','focus'],13:['closed','open','confirm','cancel'],14:['information','local success','failure with recovery'],15:['closed','expanded','focus'],16:['upcoming','current','completed local step'],17:['empty','valid local selection','unsupported file','oversize'],18:['owned','suggested ownership unconfirmed','removed from demo'],19:['example','edited','pending save','locally saved'],20:['synthetic catalog','stale/unavailable design case','handoff failure'],21:['user input','catalog attribution','assistant inference','unknown'],22:['dormant','attend','ready','input','processing','result','clarify','no-result','error','success','return'],23:['primary','alternative','expanded list'],24:['empty','simulated wait','failure','retry','recovered'],25:['unselected','selected','withdrawn local choice'],26:['guest','demo signed in','save pending','preferences edited'],27:['empty search','matches','no matches','selected sort'],28:['desktop rows','mobile cards','record detail','filtered empty'],29:['new','reviewed','unknown','source-labeled'],30:['draft','local preview','locally approved','exported synthetic CSV']}
catalog=[]
for n,(name,purpose) in enumerate(zip(names,purposes),1):
 geometry='48px minimum control height; 44px icon target; 8px control radius/spacing as applicable.'
 keyboard='Native Tab traversal; Enter/Space activates buttons; labels provide names.'
 if n in [1,2]:geometry='Header 1248–1328px max composition, 40/24/16px page gutters; wordmark stays LTR.'
 if n in [18,19,20]:geometry='Card 12px radius, 14–20px content padding; art preserves aspect ratio; no image cropping of key garment information.'
 if n==13:geometry='520px max dialog; 16px viewport inset; 28px padding.';keyboard='Native dialog traps focus while open; Escape cancels; browser returns focus to trigger.'
 if n==12:keyboard='Demo buttons are Tab reachable. Production tabs must add Arrow/Home/End behavior; this gallery does not certify a full ARIA tabs implementation.'
 if n==7:keyboard='Native select: Tab, arrows, Enter/Escape as supported by browser; avoid custom combobox complexity.'
 if n==9:keyboard='Native radio group: Tab to group and arrow between options.'
 if n==28:geometry='Desktop table at >600px; readable labeled record cards at ≤600px; no clipped full-width table.'
 if n==22:geometry='Text bubble max 600px, 18/20px padding; use canonical Laby source, simplify below64px.'
 catalog.append({'id':f'U{n:02}','name':name,'purpose':purpose,'source':'prototype/app.js + prototype/app.css; gallery source catalog.js','status':'DESIGN_RESOLVED','geometry':geometry,'anchors':'Use logical inline/block alignment; content grows vertically.','tokens':['--color-ivory','--color-linen','--color-ink','--color-coffee','--color-green','--color-sand'],'variants':['AR / RTL','EN / LTR']+(['mobile','desktop'] if n not in [3,4,8,9,10] else []),'states':states[n],'keyboard':keyboard,'responsive':'Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.','localization':'Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.','composition':'Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.','prohibited':'Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status.','editable_source':'HTML/CSS/JS; no flattened source frame','export':'PNG previews are evidence; edit original HTML/CSS.','license':'Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.','acceptance':'Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.','limits':'A local component source is not a production backend or native Figma file.'})
details_path=ROOT/'components/component-details.json'
if details_path.exists():
 detail_map=json.loads(details_path.read_text())
 for item in catalog: item.update(detail_map.get(item['id'],{}))
write('components/component-catalog.json',json.dumps(catalog,ensure_ascii=False,indent=2)+'\n')
write('components/catalog-data.js','// Generated from component-catalog.json; edit JSON and regenerate.\nwindow.COMPONENT_CATALOG='+json.dumps(catalog,ensure_ascii=False)+';\n')
base=(ROOT/'prototype/index.html').read_text()
write('components/index.html',base.replace('href="app.css"','href="../prototype/app.css"').replace('src="app.js"','src="../prototype/app.js"').replace('</body>','<script src="catalog-data.js"></script><script src="catalog.js"></script></body>'))
doc='# DoLaby component library v1.0\n\n30 actual editable HTML/CSS component families. Open index.html through a local server for the documented gallery. No native Figma or production API is claimed.\n\n'
for c in catalog:
 doc+=f"## {c['id']} — {c['name']}\n\n{c['purpose']}\n\n- Anatomy: {', '.join(c.get('anatomy',[]))}\n- Properties: {json.dumps(c.get('properties',{}),ensure_ascii=False)}\n- Geometry: {c['geometry']}\n- States/events: {', '.join(c['states'])}.\n- Tokens: {', '.join(c['tokens'])}.\n- Keyboard: {c['keyboard']}\n- AR/EN: {c['localization']}\n- Responsive: {c['responsive']}\n- Composition: {c['composition']}\n- Avoid: {c['prohibited']}\n- Source/export: {c['source']}; PNG previews are derived views.\n- Acceptance: {c['acceptance']}\n- Limits: {c['limits']}\n\n"
write('components/component-library.md',doc)

data={'classification':'SYNTHETIC_DEMO_DATA','garments':[{'id':'G01','name_ar':'قميص كتان عاجي','name_en':'Ivory linen shirt','ownership':'USER_ASSERTED_OWNED','source':'DEMO_USER_INPUT','color':'ivory','fabric':'linen — sample assertion','size':None,'image':'original vector illustration','observed_at':None},{'id':'G02','name_ar':'بنطلون زيتوني','name_en':'Olive trousers','ownership':'UNCONFIRMED_SUGGESTION','source':'ILLUSTRATIVE_DESIGN','size':None},{'id':'G03','name_ar':'حذاء محايد','name_en':'Neutral shoe','ownership':'UNCONFIRMED_SUGGESTION','source':'ILLUSTRATIVE_DESIGN','size':None}],
 'outfits':[{'id':'O01','garment_ids':['G01','G02','G03'],'context':'workday','status':'ILLUSTRATIVE_EXAMPLE','requires_purchase':False,'ownership_confirmed':False}],
 'recommendations':[{'id':'R01','outfit_id':'O01','reason_ar':'ألوان هادئة وقصة مريحة ليوم عمل.','reason_en':'Quiet colors and an easy silhouette for a workday.','claim_role':'DESIGN_EXAMPLE_NOT_AI_OUTPUT','confidence':None,'editable':True}],
 'merchants':[{'id':'M01','name':'Example Atelier / متجر المثال','status':'FICTIONAL','verified':False,'checkout_url':None}],
 'products':[{'id':'P-DEMO-01','merchant_id':'M01','name':'Neutral everyday shoe','price':1250,'currency':'EGP','price_status':'SYNTHETIC_EXAMPLE','available':None,'price_observed_at':None,'image_rights':'Original SVG illustration','source_url':None}],
 'consent_choices':[{'purpose':p,'selected':False,'recorded_at':None,'withdrawn_at':None,'status':'LOCAL_DEMO_ONLY'} for p in ['availability','offers','research']],
 'submissions':[{'id':'SUB-001','name':'Example Atelier','email':'demo@example.test','source':'merchant_interest','status':'new','classification':'SYNTHETIC'},{'id':'SUB-002','name':'Nour — example','email':'nour@example.test','source':'consumer_interest','status':'reviewed','classification':'SYNTHETIC'},{'id':'SUB-003','name':'Salma — example','email':'salma@example.test','source':'research','status':'new','classification':'SYNTHETIC'}]}
write('microcopy-and-demo-data/demo-data.json',json.dumps(data,ensure_ascii=False,indent=2)+'\n')
schemas={
'Garment':{'id':'stable local identifier','owner_id':'nullable until real account exists','ownership':'USER_ASSERTED_OWNED | UNCONFIRMED_SUGGESTION','source':'user text/photo/catalog attribution','image_ref':'optional; retention rules separately implemented','attributes':'value + origin + certainty per attribute','deleted_at':'null until actual deletion event'},
'Outfit':{'id':'stable identifier','garment_ids':'ordered references','context':'user-chosen occasion','ownership_confirmed':'boolean; saving an idea does not assert all pieces are owned','saved_state':'guest | pending_account | local_saved | persisted only if implemented'},
'Recommendation':{'id':'stable identifier','outfit_id':'reference','facts':'source-linked values','inferences':'separately labeled explanation','unknowns':'explicit missing values','feedback':'reject/swap/correct, optional reason','result_status':'SIMULATED here, not MODEL_OBSERVED'},
'Product':{'id':'stable merchant scoped identifier','merchant_id':'reference','price':'decimal+currency+observed_at+source','availability':'KNOWN | UNKNOWN | STALE','size':'unknown unless catalog provides it','external_url':'verified URL required before real handoff','rights_ref':'image/data permission reference'},
'Merchant':{'id':'stable identifier','display_name':'human name','verification':'not inferred from record presence','allowed_catalog_scope':'agreement-dependent','operational_owner':'real accountable owner if available'},
'Consent':{'id':'stable purpose-specific event','purpose':'availability | offers | research','action':'selected | withdrawn','recorded_at':'actual event timestamp only','source':'interface/version','legal_basis':'external review; no legal conclusion in design'},
'Submission':{'id':'stable identifier','contact_ref':'normalized contact reference if backend implemented','source':'retained route/source history','purpose_choices':'separate references','status':'new | reviewed | archived','classification':'SYNTHETIC in this delivery'}}
write('microcopy-and-demo-data/entity-schemas.json',json.dumps(schemas,ensure_ascii=False,indent=2)+'\n')
micro=[('start','نبدأ بقطعة تحبّها؟','Start with a piece you love.'),('context','إيه المناسبة؟','What are you dressing for?'),('describe','أو صف القطعة','Or describe the piece'),('no-photo','الصورة اختيارية؛ الوصف يكفي.','A photo is optional. A description is enough.'),('clarify','تفصيلة صغيرة تفرق.','One detail makes a difference.'),('why','ليه الاختيار ده؟','Why this combination?'),('swap','نبدّل قطعة ولا نشوف بديل؟','Swap a piece or explore an alternative?'),('no-buy','أكمل بالمملوك فقط','Continue with owned clothes'),('more','شوف بديل','Explore an alternative'),('save','احفظ الإطلالة','Save outfit'),('account','احتفظ بالفكرة لوقت تاني.','Keep this idea for another day.'),('owned','من ملابسك','From your wardrobe'),('unconfirmed','اقتراح غير مؤكد الملكية','Suggested; ownership unconfirmed'),('merchant','السعر والتوفر النهائيان لدى المتجر.','Final price and availability belong to the merchant.'),('purchase','الدفع والشحن والإرجاع لدى المتجر.','Payment, shipping and returns belong to the merchant.'),('failure','لم تكتمل الخطوة. أعد المحاولة أو صحّح المدخل.','This step did not complete. Retry or correct the input.'),('delete','تحذف قطعة المثال؟','Delete the sample piece?'),('delete-failed','لم يتم الحذف. قطعتك ما زالت موجودة.','Deletion failed. Your piece is still present.'),('cancel','احتفظ بها','Keep it'),('retry','أعد المحاولة','Try again'),('availability','أخبار الإتاحة','Availability news'),('offers','العروض','Offers'),('research','المشاركة في البحث','Research invitations'),('privacy','بياناتك، وقرارك.','Your data. Your decision.'),('honest-stage','نطوّر التجربة حاليًا.','The experience is in development.'),('demo','بروتوتايب تصميم محلي؛ لا إرسال بيانات.','Local design prototype; no data transmission.'),('empty','لا توجد قطع بعد. ابدأ بقطعة واحدة.','No pieces yet. Start with one.'),('upload-error','اختر JPG أو PNG حتى 5MB، أو أكمل بالوصف.','Choose JPG or PNG up to 5MB, or continue with a description.'),('no-live-ai','هذا مثال توضيحي، لا تنسيق آلي حي.','This is an illustrative example, not live AI styling.'),('saved-local','حُفظت الفكرة في العرض.','Idea saved in this demo.'),('merchant-example','متجر المثال؛ بيانات مصطنعة.','Example Atelier; synthetic data.'),('text-only','مساعدك النصي','Your text assistant')]
csvfile('microcopy-and-demo-data/microcopy.csv',[{'id':'COPY-'+i,'ar':ar,'en':en,'status':'DESIGN_RESOLVED','context':'Local prototype and editable UI source','verification':'Editorial review by producing assistant; no independent translation/user study'} for i,ar,en in micro])
write('microcopy-and-demo-data/microcopy.json',json.dumps([{'id':'COPY-'+i,'ar':a,'en':e} for i,a,e in micro],ensure_ascii=False,indent=2)+'\n')

flowrows=[
('P1','S02 → S03','Choose occasion; enter image or description','No account required','S03 validates type/size or nonempty text','Input remains in this session; retry from S17'),
('P1','S03 → S04 → S05','Review/correct piece, choose optional fit','Ownership is asserted, not image-inferred','Toolbar simulation can fail next input step','S17 → S03 restores text'),
('P1','S06 → S07 → S08/S09','Open prepared example; swap/explain/reject','No AI request occurs','Unconfirmed pieces remain labeled','Back or new task preserves user agency'),
('P1','Save → S12 → S11','Save after useful output; demo account only','Guest may continue without account','No email/auth server is claimed','Actual client state records demo signedIn/saved'),
('P2','S09 → S15 → S16','Optional complementary piece; review source','No-buy route visible','Toolbar next-failure → S17','Retry → S16; preview handoff dialog; no real merchant opened'),
('P3','S14 → local switches','Independent availability/offers/research control','Selections retained in JS memory during navigation','No legal or server persistence guarantee','Reset clears temporary state'),
('P3','S14/S10 → delete dialog','Confirm or cancel local garment deletion','Cancel leaves record unchanged','Toolbar next-failure → error on S14','Retry deletion succeeds; S10 omits sample garment'),
('P4','S18 → S19','Fill merchant interest and acknowledge demo','No live submission','Native email/required checkbox validation','Return to form; no sent-email success claim'),
('P5','S20 → S21/S22','Filter/review synthetic records; edit local draft','Role scope is design intent, not security','Empty filter returns no-results text','Clear filter; close dialog; local preview never publishes')]
csvfile('architecture-and-flows/state-transitions.csv',[dict(zip(['flow','transition','action','invariant','failure','recovery'],x)) for x in flowrows])
write('architecture-and-flows/information-architecture.md','''# DoLaby information architecture

Version1.0 — DESIGN_RESOLVED. Consumer, merchant-interest and administration remain separate roles/surfaces. P4 is qualification only in this version; a merchant self-service catalog portal is deferred.

- Consumer: S01 landing → S02 task/context → S03 input → S04 correction → S05 clarification → S06 prepared example → S07 recommendations. S08 swaps; S09 explains. S10 garments and S11 outfit ideas are reachable from navigation. S12 demo account is requested at save. S13 preferences and S14 control/delete support return visits.
- Optional commerce: S15 limited synthetic catalog → S16 product/source/handoff. No in-product checkout. S17 is shared recoverable failure.
- Merchant: S18 interest → S19 honest simulated confirmation.
- Administration: S20 overview → S21 records/review/export; S22 local copy draft/preview. No production permissions or publishing API.

The editable SVG and state-transitions.csv encode this map. Body data-screen identifies the current prototype screen; all22 screen sources use the same renderer.
''')
flow_svg='''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 880"><style>text{font-family:Arial,sans-serif;fill:#151D2B}.title{font-size:30px}.label{font-size:16px}.small{font-size:13px}.box{fill:#FCF8F0;stroke:#123B32;stroke-width:1.5}.edge{fill:none;stroke:#123B32;stroke-width:1.5;marker-end:url(#arrow)}</style><defs><marker id="arrow" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0 0 10 4 0 8" fill="#123B32"/></marker></defs><rect width="1400" height="880" fill="#F3E9D8"/><text x="50" y="62" class="title">DoLaby / Experience architecture</text><text x="50" y="93" class="small">Editable vector map • local design prototype • no live AI, identity or merchant integration</text>'''
nodes=[(50,145,'S01','Honest landing'),(260,145,'S02','Context'),(470,145,'S03–S05','Input / correct / clarify'),(740,145,'S06–S07','Example / suggestions'),(1050,145,'S08–S09','Swap / explain'),(740,320,'S12 → S11','Account at save / ideas'),(1050,320,'S10 / S13','Wardrobe / preferences'),(50,510,'S14 / P3','Consent / deletion'),(390,510,'S15–S16 / P2','Optional merchant exit'),(800,510,'S18–S19 / P4','Merchant interest'),(50,710,'S17','Recoverable failure'),(800,710,'S20–S22 / P5','Admin / records / local draft')]
for x,y,i,label in nodes:flow_svg+=f'<g id="{i.split()[0].replace("/", "-")}"><rect class="box" x="{x}" y="{y}" width="260" height="110" rx="12"/><text x="{x+20}" y="{y+37}" class="small">{html.escape(i)}</text><text x="{x+20}" y="{y+72}" class="label">{html.escape(label)}</text></g>'
for d in ['M310 200h-50','M520 200h-50','M730 200h10','M1000 200h50','M870 255v65','M1180 255v65','M390 565H310','M520 620v45H180v45','M180 710V620','M930 620v90','M870 430v36H520v44']:flow_svg+=f'<path class="edge" d="{d}"/>'
flow_svg+='<text x="50" y="850" class="small">Source: shared editable app.js, 22 screen types; state-transitions.csv provides events, failure and recovery.</text></svg>'
write('architecture-and-flows/flow-map.svg',flow_svg)

write('developer-handoff/README.md','''# DoLaby UI/UX developer handoff

Version1.0.0 • original editable HTML/CSS/JS sources • designed web experience, not a production backend.

## Open and edit

Serve the complete kit root locally, then open `03_UIUX_KIT/prototype/index.html`. Add `?screen=S01&lang=ar` or any S01–S22 with ar/en. `capture=1` hides only the external diagnostic bar for clean screen exports. Keep the diagnostic bar visible while testing failures.

Edit screen content and event logic in prototype/app.js. Shared component styles live in prototype/app.css and reference the root shared tokens. Thirty component families and their properties are in components/component-catalog.json, with a live gallery at components/index.html. 104 actual HTML reference wrappers and their exact-width preview targets are indexed in responsive-screens/compositions.json.

## Layout and anatomy

- Content max1248px; header max1328px. Desktop/tablet/mobile gutters40/24/16px, content-driven switches at900 and600px. Mobile body16px; control targets48px, standalone icon targets44px. Page titles use Cairo Arabic and Cormorant editorial English while field/body copy stays Cairo.
- Cards use shared16px radius, controls8px, dialogs24px. Cards separate art, source label, title, metadata and actions. Clothing illustrations are original SVG paths in the renderer, not photos or live recommendation outputs. Clothing colors are illustrative object colors rather than alternate brand palettes.
- Focus outline3px in ink with3px offset, from shared focus tokens. Field borders use deep green; sand is decorative separation only. Light buttons retain dark text and a green border. No default ivory-on-green text exception is used.
- AR uses RTL logical layout; DoLaby is always LTR. Prices/email/IDs use bdi or explicit LTR. No Arabic letter-spacing. Copy expands vertically rather than being silently clipped.

## State and data

The client holds a description, optional local image ObjectURL, selected occasion, sample swap, demo account/save flag, local consent choices, sample deletion and synthetic record statuses in memory. Reload/reset returns the demonstration to its baseline. There is no server persistence, analytics endpoint, AI call, email send, real identity check or real merchant checkout. Do not deploy this as a live product.

P1 starts without an account; save routes to S12 and then S11. P2 explicitly returns to an owned-only option and previews a merchant handoff in a dialog without a real link. P3 includes cancel, success and injected failure/retry. The diagnostic `Simulate next-step failure` is a deliberate test control, not product copy. In production, failures must come from actual operations.

Entity definitions in microcopy-and-demo-data/entity-schemas.json keep ownership, inference, catalog facts, timestamp uncertainty and purpose choices separate. Synthetic prices have EGP units and are labeled examples. No source observation date is invented.

## Keyboard and accessibility

Use native controls, labels and fieldsets. Buttons use Enter/Space; radios use native group keys; dialog.showModal supplies focus containment and Escape. The skip link targets main; navigation changes focus main after route changes. The status region announces local saves, edits and toggles. Errors include text and recovery, not color alone. Reduced-motion preference removes transitions and smooth scrolling. Avoid authentication designs that block password managers/paste or demand unnecessary cognitive tests.

The component-gallery tabs include selection/panel associations and roving Arrow/Home/End keyboard focus with RTL direction. They still need assistive-technology testing; static source inspection does not certify WCAG runtime behavior.

## Role boundaries

Consumers control their own sample garment/outfit ideas and purpose choices. P4 is merchant qualification, not a full merchant self-service portal. The administrative reviewer can change synthetic record state, export sample CSV and revise local text. This UI role map is not enforced authentication/authorization; production requires separate controls and qualified privacy/rights review.

## Export and migration

PNG previews are indexed by screen-language-width. They are derived exports. The editable masters remain HTML/CSS/JS. Native Figma was not created by this kit source; map each U-ID to a component, bind shared semantic values, import original SVGs and recreate auto-layout using the dimensions in the catalog. Preserve live text and correct reading order. Do not embed an entire screenshot and call it editable.

## Known limits

No complete screen-reader matrix, physical-device matrix, user study, production security certification, legal approval or native Figma import test is claimed. Browser verification performed by the overall delivery is recorded separately under05_QA. Future production implementation must connect real observation events, persistence, catalog agreements and actual permissions before making capability claims.
''')
write('developer-handoff/migration-map.csv','object_type,id,local_source,native_target,truthful_status\ncomponent,U01-U30,components/component-catalog.json,Figma component+variants,LOCAL_EDITABLE_CREATED_NATIVE_NOT_CREATED\nscreen,S01-S22,prototype/app.js,Figma responsive frame,LOCAL_EDITABLE_CREATED_NATIVE_NOT_CREATED\nreference,104-compositions,responsive-screens/compositions.json,Figma frame ID mapping,LOCAL_EDITABLE_CREATED_NATIVE_NOT_CREATED\nflow,P1-P5,architecture-and-flows/flow-map.svg,Editable vector+prototype links,LOCAL_EDITABLE_CREATED_NATIVE_NOT_CREATED\n')
write('README_AR.md','''# حزمة DoLaby للواجهة وتجربة الاستخدام

المصدر القابل للتحرير: prototype/index.html مع app.js وapp.css. افتح الحزمة من خادم محلي كي تعمل مكتبة المكونات وجميع الروابط. المصادر لا تتطلب خدمة مدفوعة أو اتصال AI.

-22 نوع شاشة مميزًا من مصدر مكونات مشترك، و104 تركيبات مرجعية بواجهتين عربية وإنجليزية.
-30 عائلة مكونات مع كتالوج حالات وأبعاد واستخدام وإتاحة.
-P1 للتنسيق والتعديل والحفظ بعد الحساب التجريبي؛ P2 للإحالة الاختيارية مع فشل وتصحيح؛ P3 للموافقات والحذف مع فشل وإعادة محاولة.
-P4 لتأهيل متجر فقط؛ P5 لسجلات ومراجعة ومسودة محتوى محلية.
-رسوم الملابس متجهة أصلية، وبيانات المتجر والأسعار مصطنعة ومعلّمة.

للتعديل: غيّر النص في app.js أو microcopy.csv، والقيم المشتركة في01_SHARED_FOUNDATIONS، ثم أعد تصدير المعاينات. ملفات PNG شواهد عرض، وليست المصدر. لم يُنشأ ملف Figma أصلي أو خادم إنتاجي.
''')
write('developer-handoff/design-decisions.csv','''id,value,status,rationale,affected_assets,verification
UI-D01,Local HTML/CSS/JS source with shared component renderer,DESIGN_RESOLVED,Honest editability and runnable prototype without native tools,S01-S22;U01-U30,Node syntax and browser evidence under05_QA
UI-D02,Merchant surface is qualification only,DESIGN_RESOLVED,Avoid inventing a merchant self-service portal before agreements,S18-S19;P4,IA and state transition inspection
UI-D03,No default ivory text on green,DESIGN_RESOLVED,Preserve strict TYPE roles and readable controls,All screens,Shared contrast evidence
UI-D04,Unconfirmed trousers and shoes stay suggestions,DESIGN_RESOLVED,One known garment does not establish ownership of a whole outfit,S07-S09,Visible source labels
UI-D05,48px controls and44px icon targets,DESIGN_RESOLVED,Project comfort target for touch,All controls,DOM measurements in overall QA
UI-D06,In-memory local state only,DESIGN_RESOLVED,Do not imply live account or server persistence,P1-P5,Source inspection and explicit prototype boundary
''')
print('Created component catalog30; source matrices104; schemas7; microcopy',len(micro),'flow transitions',len(flowrows))
