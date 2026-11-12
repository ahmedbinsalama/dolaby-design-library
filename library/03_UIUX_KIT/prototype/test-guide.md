# Prototype test actions

These are reproducible test instructions, not a claim that every test has already run. Overall delivery evidence lives under `05_QA`.

Use `prototype/index.html?screen=S02&lang=en` with the external diagnostic bar visible (omit `capture=1`). The current screen is observable through `document.body.dataset.screen`; `window.DoLabyUI.getState()` exposes only the demo's state for test inspection. All inputs and records are synthetic. Do not enter personal data.

## P1 — input, failure/recovery, correction and save

1. Begin at S02. Click `form[data-form="context"] button[type="submit"]` → S03.
2. Fill `#description` with `An ivory linen shirt`.
3. Click `[data-action="fail-next"]`, then `form[data-form="input"] button[type="submit"]` → S17. Verify the alert mentions the simulated failure and retained description.
4. Click `#main [data-go="S03"]` → S03; description still contains the entered text.
5. Submit the input form again → S04. Edit `#garment-name`; submit `form[data-form="garment"]` → S05.
6. Submit `form[data-form="clarify"]` → S06. Click `#main [data-go="S07"]` → S07.
7. Click `#main [data-go="S08"]` → S08, then `[data-action="swap"]` → S07. `getState().swapped` becomes true. An alternative can also be selected with `[data-action="alternative"]`.
8. Click `[data-action="save"]` → S12. The account form is shown only at save; no live account or mail exists.
9. Submit `form[data-form="account"] button[type="submit"]` → S11. Verify `getState().saved === true` and `signedIn === true`.
10. Empty input alternative: reset; open S03; clear `#description`; submit. Remain at S03 with text error `#input-error [role="alert"]`.

## P2 — optional merchant handoff, failure/recovery and no-buy return

1. Open S16 with `?screen=S16&lang=en`.
2. Click `[data-action="fail-next"]`, then `[data-action="merchant-exit"]` → S17.
3. Click `#main [data-go="S16"]` → S16; trigger `[data-action="merchant-exit"]` again. A native dialog opens, explaining that no actual merchant is connected.
4. Click `dialog [data-action="close-modal"]`. The dialog closes without a new tab, network purchase or checkout.
5. Click `#main [data-go="S07"]` (“Continue without buying”) → S07.

## P3 — independent choices, cancellation, failure and successful deletion

1. Open S14 with `?screen=S14&lang=en`.
2. Read `[data-consent="availability"]`, `[data-consent="offers"]`, `[data-consent="research"]`. Toggle availability. Only its `aria-checked` changes. Navigate away/back; local choice remains within this running session.
3. Click `[data-action="delete-garment"]`. Click `dialog [data-action="close-modal"]` (“Keep it”). Verify `getState().deleted === false`.
4. Click `[data-action="fail-next"]`, reopen deletion, then `dialog [data-action="confirm-delete"]`. Return to S14 with a failure alert and `deleted === false`.
5. Reopen deletion and confirm again → S10, with `deleted === true` and the sample shirt omitted. No server storage is represented as erased.

## Keyboard and gallery checks

- Tab from the address bar into the skip link; activate it and verify focus moves to `#main`.
- Use Enter/Space on buttons, native radio arrows, and native select controls.
- Open a confirmation dialog, use Tab, then Escape. Verify closure and return to the opener.
- In `components/index.html`, U12 tabs have IDs `gallery-tab-pieces` and `gallery-tab-outfits`, one roving `tabindex=0`, and `aria-controls="gallery-tab-panel"`. Arrow keys follow the local RTL/LTR direction; Home/End select first/last; selection updates the labelled panel.
- `components/catalog-data.js` is a generated local copy of `component-catalog.json`, so the gallery does not depend on fetching JSON from a live service.

The native-dialog and tab implementation still requires assistive-technology testing. This guide does not establish complete WCAG conformance.
