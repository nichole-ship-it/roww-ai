# roww.ai Website Requirements

## Who you're working with
I'm Nichole. I lead product for a living, but I haven't written code in 20 years. Explain each step in plain English, tell me exactly what to click or type when I need to do something, and ask me before doing anything that's hard to undo (DNS changes, deleting files, paid services). Work in phases and show me a local preview after each one.

## The goal
Build roww.ai, a site for rowing parents who follow two family rowers:

* Parker Mace, a junior rower on Tufts University Men's Rowing
* Evelyn "Evie" Mace, a freshman coxswain on Stanford Women's Rowing

The site is also my Constant Contact account's home base, so I can experience the product as a real small business customer: growing an email list, sending newsletters, and promoting events.

## Tech approach
* A simple static site: plain HTML, CSS and a little JavaScript. No framework, no build step, nothing I'd need to maintain.
* Keep content I'll update often (schedules, accomplishments, offerings) in simple data files (JSON or Markdown) so I can edit text without touching layout code.
* Put the code in a GitHub repository I own, and host it free on GitHub Pages, with automatic deploys whenever changes are pushed. (Changed from Netlify on Nov 12, 2026, to avoid a second account.)
* Connect the custom domain roww.ai. Important: I already use Google Workspace on roww.ai for email. Do not change or remove any existing MX, TXT, SPF, DKIM or DMARC records. Walk me through the DNS steps at my registrar one at a time and show me what will change before I save anything.

## Pages

### 1. Home
Hero with headline, a short intro, and buttons for "See race schedules" and "Get the newsletter". Cards linking to Parker's and Evie's pages. An "Up next on the water" preview showing the next 3 races for each team. A strip linking to the five offerings. A crimson signup band with the Constant Contact form. A footer with the disclaimer below.

### 2. Schedules
* The full 2026/27 season for Tufts Men's Rowing and Stanford Women's Rowing, side by side, with a filter for Both, Tufts or Stanford.
* Pull the starting data from the official schedule pages (gotuftsjumbos.com men's rowing schedule and gostanford.com women's rowing schedule). Store it in `data/schedules.json` with date, time, event name, location, home or away, and result.
* Show times in Eastern. For Stanford races, also show Pacific.
* Mark past races as complete and show results when available.
* An "Add to my calendar" link for each team (a downloadable .ics file).
* Nice to have: a weekly automatic check that refreshes the schedule data and flags changes for me to approve.

### 3. Parker and 4. Evie (same template)
Large hero photo, name, team tag, class year and position, a short intro paragraph, quick-facts tiles, an "At [school]" accomplishments timeline, a "High school and junior rowing" timeline, and a photo gallery. All text comes from `data/parker.json` and `data/evie.json`. I'll provide the accomplishments and photos. Leave clearly marked placeholders until I do.

Starting facts (verified from public sources; copy them from the mockups and link each rower's official roster page):

* **Parker:** Tufts junior, Mechanical Engineering, Newton North High School, CRI rower and captain 2018 to 2024. Tufts: 2026 NIRC champion and 2026 New England Rowing Championships winner in the third varsity eight; Head of the Charles 2024 and 2025. CRI: 2024 Northeast Youth Championships bronze in the Men's Youth 8+ (stroke seat) and 2024 Youth Nationals (stroke seat). Roster: https://gotuftsjumbos.com/sports/mens-rowing/roster/parker-mace/16356
* **Evie:** Stanford freshman coxswain, Newton North High School, National Merit Finalist. 2026 USA U19 National Team, coxswain of the Women's 8+, 5th at the U19 World Championships in Plovdiv, Bulgaria. CRI 2022 to 2026 and Cambridge Boat Club summers: 2025 Canadian Henley gold (U19 Women's 8+), 12th at the 2025 Head of the Charles (Women's Youth Eights), 13th at 2026 Youth Nationals. Roster: https://gostanford.com/sports/womens-rowing/roster/player/evelyn-mace

### 5. What we offer
Five sections, alternating photo and text: Parent Meetups, Newsletters, Announcements, Gear, Events. Each has a short headline, a few sentences, and a call to action that leads to the email signup. Gear can link to an external store or order form later.

## Constant Contact signup
Add this code to every page, just before the closing `</body>` tag:

```html
<!-- Begin Constant Contact Active Forms -->
<script> var _ctct_m = "75a6a1ada45d8d540d7086246d380469"; </script>
<script id="signupScript" src="//static.ctctcdn.com/js/signup-form-widget/current/signup-form-widget.min.js" async defer></script>
<!-- End Constant Contact Active Forms -->
```

This script powers my Constant Contact forms, but a form that sits inside the page also needs its own placeholder tag with a form ID from my Constant Contact account. When we get to this step, walk me through creating an inline form in Constant Contact and copying its embed tag. Place that inline form in the signup band on Home and What We Offer. Then help me submit a test email and confirm it shows up in my contact list.

## Look and feel: Head of the Charles in the fall
Think race program meets a New England riverbank in October: autumn trees, stone bridges, crowds on the shore, eights on the river.

* **Colors:** Crimson #8B1E2D (main accent), Navy #14213D (header, footer, text), Cream #F6F1E7 (background), Burnt orange #C8572B (buttons and highlights), Brass #B8893B (decorative only). Team accents: Tufts blue #3E8EDE and Stanford cardinal #8C1515.
* **Type:** Libre Caslon Text for headlines, Inter for body text (both free from Google Fonts).
* **Logo:** "Family Blades": two crossed oar blades, Tufts blue (left) and Stanford cardinal (right), with the ROWW wordmark. Match the mockup. Build it as an SVG, with a favicon and a social sharing image made from it.
* **Photos:** I'm attaching my own photos; use them where the mockups place them. Otherwise use only my own photos, or free licensed photos (for example from Unsplash) of the Charles River and fall regattas, and keep a list of credits. Don't copy photos, logos or artwork from the Head of the Charles, Tufts or Stanford websites. Until I send photos, use clearly labeled placeholder blocks. Resize and compress every image for fast loading.
* **Footer disclaimer:** "A rowing family site, not affiliated with Tufts, Stanford or the Head of the Charles Regatta."

Mockups: https://claude.ai/artifact/YMuGbrrvQvL9euMF2iiAjs

## Quality bar
* Looks great on a phone first, then on desktop.
* Accessible: real links and buttons, alt text on every photo, readable color contrast.
* Fast: a mobile Lighthouse score of 90 or higher.
* Page titles, descriptions and social sharing previews set for every page.
* No personal details beyond what's listed here (no home address, phone numbers or class schedules).

## Phases (stop after each one so I can review)
1. **Setup:** project folder, GitHub repo, local preview running. Tell me how to open it.
2. **Design shell:** shared header, footer, colors, fonts, logo, and the Home page with placeholders.
3. **Content pages:** Schedules with real data, Parker, Evie, What We Offer.
4. **Constant Contact:** script on every page, inline form in place, test signup confirmed.
5. **Launch:** publish on GitHub Pages, connect roww.ai safely, confirm email still works.
6. **Handoff:** a one-page "How to update the site" guide covering how to change a schedule entry, add an accomplishment, swap a photo, and publish.

## Done means
* roww.ai loads over https on phone and desktop.
* All five pages work, and schedules match the official team sites.
* A test signup lands in my Constant Contact list.
* My roww.ai Gmail still sends and receives.
* I can make a simple text update myself by following the handoff guide.

## Hosting record (Nov 12, 2026)
* Domain registrar and DNS: Porkbun. Email: Google Workspace (MX smtp.google.com, SPF TXT). Leave those alone.
* Website records to add at Porkbun: four A records on the bare domain (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) and CNAME www -> nichole-ship-it.github.io.
