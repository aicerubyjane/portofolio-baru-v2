# Aice Ruby Jane — Ruang proyek

Static interactive portfolio with a Three.js room, five project introductions, keyboard-accessible dialogs, reduced-motion support, and a WebGL-unavailable project-list fallback.

## Local preview

Run `python3 -m http.server 4173 --bind 127.0.0.1` from this folder and open http://127.0.0.1:4173/. No installation or build step is needed. Use HTTP rather than opening index.html as a file.

## GitHub Pages

In repository **Settings → Pages → Build and deployment**, select **Deploy from a branch**, branch **main**, folder **/(root)**, then **Save**. Wait for the Pages deployment to complete.

Expected URL after successful deployment: https://aicerubyjane.github.io/portofolio-baru-v2/

This URL is not proof of a live deployment. A repository deploy key can push code but cannot enable Pages settings.

## Runtime and licensing

`index.html`, `style.css`, and `app.js` are the runtime. The only runtime dependency is the local, unmodified Three.js 0.170.0 ES module in `vendor/three/three.module.js`; its MIT license is included alongside it. No CDN, remote fonts, build output, or full node_modules tree is needed. Relative paths support project-site hosting.

Project descriptions are introductions, not claims of measured outcomes. The preview does not access customer data, payments, market data, or active production systems.

## Verification

`qa/source-test-results-v3.json` records the verified source suite at desktop (1440×900), mobile (390×844), and small mobile (320×740), including WebGL, pointer/wheel camera response, chapter navigation, mesh/hotspot interactions, all five dialogs, focus handling, Escape, reduced motion, overflow, external-request checks, and forced WebGL fallback.

`qa/source-package-verification.json` identifies the original source archive. It is provenance for that archive, not a size/hash manifest of this smaller publication. `qa/publication-test-results.json` records a publication smoke test: rendering at all three viewports, five programmatically activated dialogs, overflow, page errors, external requests, and forced WebGL fallback. Full publication interaction reruns exceeded their time limits and are not claimed as passing. The app's only publication change is its local dependency import path. Private audits, recordings, screenshots, development environments, and credentials are excluded.
