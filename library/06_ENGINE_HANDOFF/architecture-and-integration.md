# Engine architecture and production boundaries

Version 1.0.0 · local design handoff · requesting founder is acceptance owner. This describes code that exists and clearly separated future integration contracts. It is not a claim that a production service was built.

## Implemented dependency flow

1. Shared CSS values, local font files and canonical SVGs feed the brand book, product UI and social layouts.
2. UI query parameters select a screen and locale. app.js renders the screen and handles local navigation/actions/forms. Synthetic records and authored garment/outfit vectors populate the demonstration.
3. Motion measures two text layers after font loading, then uses one animation clock to update SVG transforms and masks.
4. Social template records/configuration feed a shared renderer and stylesheet. The editor changes DOM text/artwork and saves an HTML snapshot with relative assets. Export indices enumerate actual intended derivatives.
5. The local exporter opens only package file URLs in an isolated context, waits for fonts, sets explicit CSS viewports, checks output dimensions, and writes derivatives plus an execution report to a separate folder.
6. The verifier compares delivered bytes with the manifest and optionally checks ZIP members. Neither tool sends content to an external service.

The browser masters are self-contained local HTML/CSS/JavaScript/SVG sources. No React build, server framework, database migration or API server is required for the supplied demonstration. An optional Python localhost server is supplied for browsers that restrict file URLs.

## Actual state and persistence

| Domain | Actual behavior | Persistence |
|---|---|---|
| Description, selected occasion, synthetic save/account flags, swapped outfit, deletion and consent switches | Local variables and event handlers | Current page session only |
| UI photo | Local ObjectURL; JPG/PNG up to 5 MB | Not uploaded; reset/reload clears it |
| Product recommendations | Fixed authored examples and alternative compositions | Source constants; no inferred output |
| Preferences form | Local confirmation dialog | No production settings write |
| Admin records | Synthetic array; local status edit and CSV download | Reload resets source state |
| Social editor text | contenteditable DOM | Save HTML to retain edits |
| Social image | FileReader data URL; PNG/JPG/WebP up to 10 MB | Embedded in saved HTML |
| Template choice | Query/default or wrapper configuration | URL or wrapper source |
| Brand motion | Current clock/paused state | Not persisted; static full identity defaults |

The seven entity definitions are human-readable design contracts. They do not validate every runtime value. DoLabyUI.getState exposes only screen/lang/saved/signedIn/deleted/swapped; it is a demo inspection helper, not an application API.

## Future production seams — SPECIFICATION ONLY

| Seam | Required behavior before connection | Created here? |
|---|---|---|
| Input interpretation / recommendation service | Preserve user corrections; separate stated ownership from inference; return known facts, inferences, unknowns and status; support bounded errors/retry | No |
| Wardrobe/outfit storage | Real IDs, ownership, retention, versioning, deletion scope and persistence receipts | No |
| Account/session service | Real authentication, session lifetime and access enforcement | No |
| Merchant catalog | Permissioned data/images, freshness timestamp, price/currency, stock uncertainty and verified destination | No |
| Referral | Merchant-owned checkout; no purchase/commission assumptions; explicit return path | No |
| Purpose choices | Separate availability/offers/research events; actual timestamps and applicable review | No |
| Admin operations | Server-enforced roles, audited mutations, export scope and real operational ownership | No |
| Model evaluation | Representative consented data, predeclared metrics, correction/error cases, uncertainty and stop rules | No |

No endpoint URLs, response latency targets, accuracy percentages, model choice or operating cost is asserted. Those decisions require actual engineering and empirical evaluation. Creating this design package changes no business evidence gate.

## Change propagation

Keep one canonical master per purpose. JSON tokens and CSS are delivered companions and must be updated together. Gallery and prototype renderers are separate. Standalone garment SVGs do not automatically rewrite inline template paths. After editing: inspect the changed source, regenerate affected outputs, run the appropriate interaction checks, then issue a new manifest/version. Preserve the delivered original for comparison.

## Local tool dependencies and verified scope

package.json pins the versions used in the supplied exporter smoke test. The web demonstration does not require these Node packages. The smoke result in 05_QA/engine-export-smoke.json identifies its actual files and limits; it is not a complete re-run of all prior browser checks. The initial release evidence remains under 05_QA.

## Catalog and social-motion companions

component-catalog.json is the canonical metadata. tools/sync-catalog.cjs compares or regenerates catalog-data.js for local-file loading; it does not rewrite app.js. The social intro/outro source is 04_SOCIAL_KIT/motion/index.html, with an inline 4-second opacity timeline and controls. No encoded video/audio is supplied.
