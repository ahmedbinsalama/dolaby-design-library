# النشر والإصدارات

المستودع المرجعي: https://github.com/ahmedbinsalama/dolaby-design-library

الموقع يستخدم GitHub Pages تحت `/dolaby-design-library/`. بعد تفعيل Settings → Pages → GitHub Actions، ينفّذ pages.yml البناء وفحص الروابط وسلامة الحزمة، ثم يرفع مجلد dist وينشره. تغييرات HTML والأصول والقوالب والمصادر والبيانات والأدلة تعيد النشر تلقائيًا؛ يمكن تشغيل workflow_dispatch يدويًا أيضًا.

التشغيل الاعتيادي يحتاج صلاحيات contents:read وpages:write وid-token:write الخاصة بالنشر، ولا يحتاج أسرار خدمات. الخطوات مبنية على إجراءات GitHub الرسمية: checkout@v6 وconfigure-pages@v5 وupload-pages-artifact@v4 وdeploy-pages@v4.

مصادر التوثيق التي روجعت لهذه البنية:

- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases

أرشيف الحزمة 1.0.0 داخل downloads يحفظ الملفات الـ924 كما سُلّمت؛ بيانها الأصلي داخل library. مصدر الموقع والقوالب وسجلات الاختبار منفصلة عن هذه النسخة المجمدة. البصمات تثبت هوية البايتات ولا تثبت الطلب السوقي أو الاعتماد القانوني.
