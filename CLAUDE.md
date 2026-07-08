# Quiz Hub

Short, professional-audience quizzes made to be shared on LinkedIn. Each quiz is
quick to take, self-scoring, and ends in a certificate image with attribution
baked in, so every share points back to the author.

The site root is a hub that lists every quiz and each result links back to it
(`BUILD_HUB` in `build.js`). Set it false to make quizzes standalone with the root
returning a 404 and no cross-links.

One shared **engine**. Each quiz is a **data file** that plugs into it. Adding a
quiz means authoring a data file, not rebuilding machinery.

## Writing rules (STRICT — every line of copy)

These are firm and non-negotiable. Apply to every question, result blurb, hub
description, and button label.

- No em dashes. Use commas, periods, or restructure.
- Never use "surface" as a verb.
- Avoid "literacy" in the "shared literacy" sense.
- No corporate jargon or clichés. Plain, direct prose.
- Lead with the real idea, not methodology or throat-clearing.
- Prefer unadorned clarity over clever or evocative phrasing.
- Sentence-case buttons and labels. Plain verbs that say what happens.
- Result blurbs should feel specific and a little flattering, without empty praise.

## Architecture

```
src/
  engine/engine.css     shared styles (per-quiz accent via --accent)
  engine/engine.js      the engine: flow, scoring strategies, certificate, share, persistence
  quizzes/<id>.js       one declarative data file per quiz (calls window.QuizHub.registerQuiz)
  templates/quiz.html   per-quiz page shell (engine + one quiz inlined)
  templates/notfound.html  404 page for unknown paths
  templates/hub.html    hub page shell at the root (BUILD_HUB in build.js)
build.js                inlines engine + data -> docs/<id>/index.html + docs/404.html
serve.js                zero-dep static server for local testing
docs/                   build output, committed and served by GitHub Pages
```

The engine reads quiz data. It never hard-codes anything quiz-specific. The build
produces standalone HTML per quiz, each with the engine inlined, so every quiz is
independently hostable and works on any static host. The root is a hub listing
every quiz; set `BUILD_HUB = false` in `build.js` to make the root a 404 instead
and drop the per-result cross-links.

## Scoring modes

Chosen per quiz via `mode`. Scoring is a strategy that switches on mode in
`computeOutcome()` (engine.js). Add a fourth mode by adding one case there; quiz
data and the rest of the engine stay untouched.

- **`ladder`** — weighted questions produce a rank on a scale (e.g. CEFR A1..C2).
  Questions have `correct` (option index) and, for the per-level walk-up, a
  `level`. Scoring per variant is either `{ type: "thresholds", thresholds: [{max, level}] }`
  or `{ type: "perLevel", passMark }`. Shows correct/wrong feedback.
- **`archetype`** — each option carries `scores: { typeKey: points }`. Points sum
  per type; the top type wins, with a runner-up. No right/wrong feedback, no bad
  result. Result types live in `results.types`.
- **`tally`** — right/wrong out of N mapped to a band via
  `{ thresholds: [{max, band}] }`. Bands live in `results.bands`. Shows feedback.
- **`quadrant`** — each option carries `scores: { x, y }` deltas on two axes
  (`results.axes`, each with low/high keys + labels). Sign picks one of four
  `results.quadrants`; magnitude plots a point on a 2x2 drawn on the certificate.
  No right/wrong. See `communication-style.js`.

## Quiz data shape (see src/quizzes/ for full examples)

```js
window.QuizHub.registerQuiz({
  id: "my-quiz",              // must match the file name
  title, blurb, mode,        // blurb is the hub card text
  accent, accentLight,       // optional per-quiz accent (defaults to brass)
  hubTag,                    // short label on the hub card
  intro: { eyebrow, headline, lead, startLabel, startMeta },
  about: { trigger, eyebrow, title, body, chips, note, link },   // "how it works" modal (optional)
  honesty: "...",            // "a bit of fun, not an official test"
  attribution: { name, linkedin, handle, certLine },             // baked into the certificate
  certificate: { eyebrow, headlineStyle, caption },              // headlineStyle: monogram | name | score
  shareLabel, result: { tagPrompt },
  results: { ... },          // mode-specific: bands / types / thresholds
  variants: [ { id, name, sub, questions: [...], scoring: {...} } ],
});
```

Copy in fields like `tagPrompt`, `about.note`, and `about.body` may contain simple
HTML (e.g. `<strong>`). Everything else is escaped by the engine.

## Add a quiz

1. Create `src/quizzes/<id>.js` and register the quiz (copy an existing one).
2. Add `{ id: "<id>" }` to `quizzes.config.js` (order in that list = hub order).
3. `npm run og` to generate its share-preview image (needs `npm i -D canvas`).
4. `npm run build` then `npm run serve`, open http://localhost:8000.
5. Verify the certificate does not clip on the longest result text (see below).

## Show / hide quizzes

All visibility lives in `quizzes.config.js`. Per quiz:

- **Shown** — `{ id: "..." }` — built and listed on the hub.
- **Unlisted** — `{ id: "...", listed: false }` — built and shareable at `/<id>`,
  but hidden from the hub listing (soft launch: share the link directly).
- **Off** — comment the line out — not built at all (parked/draft).

Order in the list is the hub order. Rebuild after changing it.

## Build, run, test

```
npm run build     # writes docs/
npm run serve     # serves docs/ at http://localhost:8000
npm run dev       # build then serve
```

Test on a real server, not `file://`. localStorage, the canvas certificate, and
clipboard only work on an http origin.

## Certificate

Rendered to a `<canvas>` as a 2x PNG with attribution baked in. The headline font
auto-fits so it never clips, from a two-character level code to a long archetype
name; the blurb shrinks to stay clear of the stats and attribution. When adding a
quiz, still eyeball the certificate for your longest result. The engine exposes
`QuizHub.renderCertificateFor(id, variantId, answers)` and
`QuizHub.score(id, variantId, answers)` for headless checks.

## Deploy (GitHub Pages)

`docs/` is the committed build output. In the GitHub repo: Settings -> Pages ->
Build and deployment -> Deploy from a branch -> `main` / `/docs`. A custom domain
can point here later. Rebuild and commit `docs/` whenever source changes.

## Status

Launched with two quizzes: `english-cefr` (ladder) and `mahabharata-leader`
(archetype). Roadmap adds business-writing (ladder), negotiation/presentation
(archetype), and real-or-AI / fallacy / grammar (tally). Ship, learn, expand.
