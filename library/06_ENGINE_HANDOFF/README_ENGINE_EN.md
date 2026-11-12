# DoLaby engine handoff

Open index.html for the engine map. Actual masters remain in 01_SHARED_FOUNDATIONS, 02_BRAND_KIT, 03_UIUX_KIT and 04_SOCIAL_KIT. This directory documents their implementation and supplies local export/integrity tools. No duplicate live masters or production AI service are introduced.

Optional developer workflow: npm install, npx playwright install chromium, npm run smoke, then npm run export. Outputs go to a separate _REGENERATED_EXPORTS folder. Use --kit and --output as described in README_ENGINE_AR.md. The delivered files themselves open without these dependencies. Run python3 tools/verify-package.py to compare the original delivery with its manifest.

See architecture-and-integration.md for actual state, persistence and clearly labeled specification-only future integration seams. engine-map.json links source paths and hashes. Native Figma/Canva, 3D, backend and live AI are not created. Initial verification and the exporter smoke result are under 05_QA.
