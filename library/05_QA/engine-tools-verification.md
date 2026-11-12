# Engine tools: actual verification

12 November 2026. These are local implementation checks by the assistant, not independent certification.

- Mixed exporter smoke:10 actual files generated in a separate validation folder: Arabic390 px UI, English1440 px UI, Arabic portrait and English vertical social PNG/JPG,17-page PDF, two logo PNGs and one Laby PNG. Actual output dimensions were read from the written images; the PDF reopened with17 pages and13908 extractable text characters. Its rendered cover was visually inspected.
- Full brand branch:97 actual files generated:44 indexed logo PNGs,3 avatars,48 Laby PNGs,1 multi-size ICO and1 PDF. The ICO reopened with7 sizes from 16 through 256; the PDF reopened with17 pages. See engine-brand-export.json.
- Component metadata companion:30 unique records; canonical JSON and the JavaScript data companion compare equal. The read-only synchronization check passed. The optional write command is supplied; it was not needed to change the delivered companion.
- Engine and asset-browser documents:390/768/1440 CSS-pixel checks passed, with no horizontal overflow or broken visible images. Desktop previews were visually inspected. English source descriptions use LTR direction within the Arabic document.
- The portable integrity checker passed against a candidate delivery folder and its ZIP. The adjacent final archive receipt records the final package CRC/member-hash verification after all records were assembled.

## Test environment and limits

Existing bundled Node.js 24.22.1, Playwright 1.62.1, Sharp 0.35.5 and Chromium were used. The sources pin the two package versions and require Node 20.9 or later. A clean npm install on another device was not performed. Full 104 UI / 120 social regeneration with the newly supplied exporter was not repeated; original final outputs were separately rendered and verified, and representative new exporter paths were exercised. Existing initial interaction, motion and platform limitations remain unchanged.

The smoke/full-brand outputs are retained in sibling ENGINE_VALIDATION and ENGINE_BRAND_VALIDATION workspace folders, outside the delivery ZIP, as duplicate validation derivatives. The canonical deliverable exports remain in 02_BRAND_KIT, 03_UIUX_KIT and 04_SOCIAL_KIT. Reports record actual validation-file sizes; a re-exported PDF may have different metadata/compression from the canonical PDF.

No account/profile, remote model, production endpoint, publishing action or purchase was used. The future integration seams are labeled specification-only in the engine handoff.
