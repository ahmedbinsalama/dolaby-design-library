# Identifier namespaces

Preserve all existing literal IDs. Add the object type when writing a cross-reference; do not rename source records.

| Display reference | Object and range | Locator |
|---|---|---|
| `flow:P1` | Product flows P1–P5 | `../03_UIUX_KIT/architecture-and-flows/` |
| `social:P01` | Social templates P01–P08, C01–C06, T01–T06, V01–V04 | `../04_SOCIAL_KIT/export-index.json` |
| `qa:Q01` | Acceptance checks Q01–Q30 | `../05_QA/acceptance.csv` |
| `source:Q001` | Original source questions Q001 onward | Original execution pack v1.1, `data/answers-index.json` and source answers; not newly authored QA |
| `brand:B01` | Brand families B01–B16 | `../02_BRAND_KIT/asset-index.json` |
| `ui:U01` | Component families U01–U30 | `../03_UIUX_KIT/components/component-catalog.json` |
| `screen:S01` | Screen types S01–S22 | `../03_UIUX_KIT/responsive-screens/compositions.json` |
| `finding:AK01` | Previous audit findings AK01–AK18 | `../05_QA/audit-finding-dispositions.csv` |

For example, `flow:P1` is the first product journey; `social:P01` is a social template. `qa:Q01` is a test, while `source:Q001` is an original question. Padding and object type both matter.

A composition ID such as `S07-ar-390` combines the screen type, language and reference viewport width. Social export suffixes identify language and `empty` or `filled`; carousel slide numbers identify members of the same template concept and do not inflate the 24-concept count.
