# Quiz Hub

Short, shareable quizzes for a professional audience. Each result exports as a
clean certificate image with attribution baked in.

Quizzes (each shared standalone):

- **What's your true English level?** a CEFR read from A1 to C2 (quick or full).
- **Which Mahabharata leader are you?** a leadership archetype from the epic.

## How it works

One shared engine drives every quiz. Each quiz is a small declarative data file
(questions, results, copy). A build step inlines the engine and outputs a
standalone HTML file per quiz, so each quiz is independently hostable and works on
any static host. There is no public listing page: the site root returns a 404.

## Develop

```
npm run build     # build into docs/
npm run serve     # serve docs/ at http://localhost:8000
npm run dev       # build then serve
```

Open http://localhost:8000. Use a real server, not `file://`: localStorage, the
canvas certificate, and clipboard need an http origin.

## Add a quiz

See [CLAUDE.md](CLAUDE.md) for the data shape, the three scoring modes, and the
step-by-step. In short: add `src/quizzes/<id>.js`, list it in `QUIZ_ORDER` in
`build.js`, rebuild.

## Deploy to GitHub Pages

`docs/` holds the committed build. After pushing to GitHub:

1. Repo **Settings -> Pages**.
2. **Build and deployment -> Deploy from a branch**.
3. Branch **main**, folder **/docs**. Save.

The `/docs` folder becomes the site root, so it never appears in URLs. Each quiz
serves at a clean path with no `.html`, e.g. `<base>/english-cefr`. The base root
returns a 404. Rebuild and commit `docs/` whenever you change the source.

## Structure

```
src/engine/     the shared engine (JS + CSS)
src/quizzes/    one data file per quiz
src/templates/  page shells
build.js        the build
serve.js        local static server
docs/           build output (served by Pages)
```

Made by Abhilash Purohit.
