# Aice Ruby Jane — Ruang proyek / Option C

An interactive Three.js gallery with scroll-controlled camera, five project dialogs, About and Contact, keyboard navigation, reduced motion, and WebGL-unavailable fallback. Original procedural oak/plaster textures, contact-occlusion gradients and botanical shadow overlays keep all runtime assets local. This is a real-time stylized architectural scene, not a photorealistic path-traced room. Foliage shadows and contact occlusion are procedural approximations.

## Preview

Run `python3 -m http.server 4173 --bind 127.0.0.1` here; open http://127.0.0.1:4173/. No build/install required. ES modules require HTTP, not file://.

## Public site

https://aicerubyjane.github.io/portofolio-baru-v2/

Dedicated repository, main branch, root directory, GitHub Pages. No production services are connected to this portfolio.

## Content and sources

Project order: Aicestore, AireshGPT, Aicy Photobox, Camellia Digital, IDX Chart Rider. Descriptions derive from the supplied public sites and repositories. The game is not a financial tool. No employment, revenue, performance, customer metrics or sole-authorship claims are made. The portrait is explicitly a replaceable placeholder, not a generated identity. Contact and biography are owner-approved.

- https://aicestore.web.id
- https://t.me/aireshgpt_bot
- https://github.com/aicerubyjane/Photobox-Web
- https://aicerubyjane.github.io/Photobox-Web/
- https://camelliashop.aicerubyjane.my.id/
- https://github.com/aicerubyjane/IDX-Chart-Rider
- https://aicerubyjane.github.io/IDX-Chart-Rider/

All supplied URLs were attempted in a real Chromium browser. The Photobox demo timed out from the verification host; its features are attributed to its public repository, not a claimed successful demo test. No transactions or bot conversations were initiated.

## Assets / attribution

Three.js 0.170.0 is locally vendored, unmodified, with its MIT license at `vendor/three/LICENSE`. Geometry, canvas material textures, shadow masks, placeholder typography and optional Web Audio tones are original procedural work for this portfolio. No third-party photographs or music are embedded. Sound is off by default and only begins after clicking its control; it stops when the tab is hidden. Replace the `.portrait` placeholder with an owner-approved photo and descriptive alt text when available.

## Verification

`qa/option-c-results.json`: current Chromium desktop 1440×900 and narrow 390×844 / 320×740 checks: real wheel input changes camera coordinates, five dialogs in order, project URL targets, Escape, focus trap/return, About/Contact navigation, audio toggle, overflow, page errors, reduced motion, and forced WebGL fallback. Screenshots and interaction recording remain outside the public repository. Earlier `qa/source-*` and `qa/publication-*` results are historical evidence, not current tests. Mobile checks use Chromium viewport emulation, not physical iOS/Safari devices.
