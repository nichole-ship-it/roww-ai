# How to update roww.ai

You can update the site two ways:

- **Small text changes** (a race result, a new accomplishment, a time change): edit the file on GitHub from any browser. Steps below.
- **Bigger changes** (new sections, design, new pages): open the Claude app on your phone with your personal account and ask for the change in the roww-ai project.

Every saved change goes live at **roww.ai** within 1–2 minutes. If you don't see it, wait a minute and refresh. On a phone, pull down to refresh.

---

## The basics: editing a file on GitHub

1. Go to **github.com** and sign in as **nichole-ship-it** (your nichole@roww.ai login).
2. Open **github.com/nichole-ship-it/roww-ai**.
3. Click the **data** folder, then the file you want (see the table below).
4. Click the **pencil icon** (top right of the file) to edit.
5. Make your change.
6. Click the green **Commit changes…** button. In the box that pops up, type a short note like "Add NIRC result", then click **Commit changes** again. That's "save and publish."

| To change… | Open this file |
| --- | --- |
| Race dates, times, results | `data/schedules.json` |
| Parker's page | `data/parker.json` |
| Evie's page | `data/evie.json` |
| What We Offer page | `data/offerings.json` |

### The three rules that keep the site working
These files use a format called JSON. It's picky about punctuation:

1. **Text goes inside straight double quotes:** `"like this"`. To use a quote mark inside text, type `\"` (example: `"Evelyn \"Evie\" Mace"`).
2. **Items in a list are separated by commas**, and the **last item has no comma** after it.
3. **Don't delete the `{ } [ ]` brackets.**

If you make a mistake, that section of the site shows "unavailable right now." To fix it, open the file on GitHub, click **History** (top right), and look at your last change, or ask Claude on your phone to fix it.

**Formatting tricks** in Parker, Evie and What We Offer text:
- `**words**` shows the words in **bold**.
- `[words]` shows a yellow "to do" highlight. Use it as a placeholder.

---

## Change a schedule entry

In `data/schedules.json`, each race is one line like this:

```
{ "team": "stanford", "date": "2027-04-17", "end_date": null, "time_et": null, "event": "Big Row vs. California", "location": "Redwood City, CA", "venue": "home", "result": null, "link": null },
```

- **Add a start time:** change `"time_et": null` to `"time_et": "10:30"`. Use **Eastern time, 24-hour clock** (1:30 PM is `"13:30"`). Stanford races show Pacific automatically.
- **Add a result:** change `"result": null` to `"result": "1V8 won by 2 seconds"`.
- **Add a recap link:** change `"link": null` to `"link": "https://…"`.
- **Add a new race:** copy a whole line, paste it right below, and change the details. Dates are `YYYY-MM-DD`. `venue` is `"home"`, `"away"` or `"neutral"`. `team` is `"tufts"` or `"stanford"`.
- **Tufts' spring races aren't posted yet.** When you add them, also change the `"tufts"` note near the top of the file to `""` so the "hasn't posted yet" message disappears.
- After any change, update `"updated"` near the top to today's date.

The site sorts races by date, marks past races "Final," and updates the Home page's "Up next" on its own.

---

## Add an accomplishment

In `data/parker.json` or `data/evie.json`, find `"school"` (At Tufts / At Stanford) or `"youth"` (High school and junior rowing). Each item looks like:

```
{ "when": "May 2026", "text": "**NIRC champion**, third varsity eight" },
```

Copy a line, paste it where you want it in the list (newest first), and edit it. Mind the commas: every line ends with a comma **except the last one in the list**.

**Other things you can change in the same file:**
- `"intro"`: the paragraph under the name
- `"facts"`: the three tiles
- `"subtitle"`: class year and position

---

## Swap or add a photo

1. **Upload the photo.** In the repo, open the **images** folder, click **Add file → Upload files**, drag in your photo, and click **Commit changes**. Use a simple file name with no spaces, like `head-of-charles-2027.jpg`. Phone photos are large, so shrink them first if you can; under 500 KB is ideal.
2. **Use it.** Open the page's data file and change the `"image"` value to the full file name, for example `"image": "head-of-charles-2027.jpg"`. Update `"alt"` with a short description of the photo (it's read aloud to people using screen readers).
   - Hero photo: `"hero"` in parker.json or evie.json
   - Gallery: add a line to `"gallery"`
   - What We Offer: the `"image"` in that section of offerings.json
3. Photos already on the site use names without an ending (like `"parker-shell"`). Those are specially resized; leave them as they are.
4. Add a line to `images/CREDITS.md` saying where the photo came from.

---

## Check your change
Open **roww.ai** after 1–2 minutes and look at the page you changed, on your phone too if you can. If something looks wrong, open the file's **History** on GitHub to see exactly what changed, or ask Claude on your phone: *"Something broke on roww.ai after my last edit to data/parker.json. Please fix it."*

## Things that live elsewhere
- **Domain and DNS:** Porkbun (porkbun.com). Never edit the MX or TXT records; those are your Gmail.
- **Hosting:** GitHub Pages (repo → Settings → Pages). It should show "DNS check successful" and have Enforce HTTPS ticked.
- **Email list:** Constant Contact (Phase 4).
