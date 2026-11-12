# DoLaby UI/UX developer handoff

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
