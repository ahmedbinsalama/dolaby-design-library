# Editing and export contract

Source: `editor.html` + `master/templates.js` + `master/render.js` + `master/styles.css` and shared foundation dependencies. Individual source wrappers in `templates-empty/` and `examples-populated/` carry stable IDs and source configuration. Text, original vector garments, layout rules and brand assets remain separate objects. No full-page bitmap is embedded as a substitute for design source.

Use the route `editor.html?id=P02&lang=ar&mode=filled&clean=1` to render the exact canvas without editing controls. Set viewport width to1080 and height to the template's declared height; wait for `document.fonts.ready` and `window.SOCIAL_READY`. Capture `#artboard` or the matching exact viewport. PNG is preferred for text/line art; JPG derivatives are useful for small previews but do not replace the PNG master. Official destination verification remains limited as recorded in platform-verification.md.

`export-index.json` maps each language version and example to its exact intended canvas and PNG path. Blank and populated instances are explicitly distinguished. Exports with no corresponding file must not be claimed complete; the delivery manifest is the actual inventory.

The six carousel modules C01–C06 are components. Two actual six-slide editorial sequences per language are supplied separately under `examples-populated/carousels/`, and have their own caption/alt text. A module preview is not a complete carousel.

The typography uses Cairo forArabic and Cormorant Garamond for large English editorial titles, with Cairo for English descriptions. DoLaby remains a fixedLTR visual asset. Garment colors represent the illustrations, not an obligation to recolor product photography. Root font files are subset fonts used through CSS ranges.

Interactive story controls must be added using the publishing platform's native widgets. No fake survey or checkout action is implied by the exported graphic. The content examples and sample style suggestions are editorial illustrations, not measured product output.

Motion source is silent and local. Add licensed audio and subtitles only for the real publishing use, if needed; no music rights are implied by this package. No account templates or inaccessible Canva links are manufactured.
