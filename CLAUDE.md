# roww.ai

Static family rowing site. Full requirements: `roww-requirements.md` (read it first).

- Plain HTML, CSS and a little JavaScript. No framework, no build step.
- Editable content lives in `data/*.json`; layout lives in the HTML/CSS.
- Deploys to Netlify from the `main` branch (publish directory: repo root).
- The owner hasn't coded in 20 years: explain in plain English and ask before anything hard to undo (DNS, deleting files, paid services).
- Never touch MX, TXT, SPF, DKIM or DMARC records for roww.ai (Google Workspace email).
- Work in phases; stop after each for review.

## Layout
- `index.html`, `schedules.html`, `parker.html`, `evie.html`, `offer.html`: the five pages
- `css/site.css`: shared styles and color/font tokens
- `js/`: small scripts that read `data/` and fill the pages
- `data/`: schedules.json, parker.json, evie.json, offerings.json
- `images/`: compressed photos; `images/CREDITS.md` lists every photo's source

## Preview locally
`python3 -m http.server 8000` from the repo root, then open http://localhost:8000
