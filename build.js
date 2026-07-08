#!/usr/bin/env node
/* ==========================================================================
   Quiz Hub build.

   One master source (engine + quiz data) -> standalone HTML per quiz + the hub,
   each with the engine inlined. Output goes to docs/ so GitHub Pages can serve
   it directly. Zero dependencies.

   Quiz ORDER on the hub follows QUIZ_ORDER below. Add a quiz by dropping a data
   file in src/quizzes/ and naming it here.
   ========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const SRC = path.join(ROOT, "src");
const OUT = path.join(ROOT, "docs");

// Quizzes to build. (Order only matters when the hub is enabled.)
const QUIZ_ORDER = ["english-cefr", "mahabharata-leader", "communication-style"];

// The hub (a page listing every quiz) is intentionally OFF: quizzes are shared
// standalone and the site root returns a 404 instead of a public catalog. Flip
// to true to bring back the hub at the root and re-enable cross-links.
const BUILD_HUB = false;

// Firebase Realtime Database URL for the anonymous taker counter. Empty string
// disables it (no requests fired). Paste the DB url here, e.g.
// "https://quiz-xxxx-default-rtdb.asia-southeast1.firebasedatabase.app".
const ANALYTICS_URL = "https://abhilashpurohit-b72f5-default-rtdb.asia-southeast1.firebasedatabase.app";

// Hub identity. Brand-neutral but attributed. To adopt a brand name later,
// change HUB_TITLE / HUB_EYEBROW here in one place.
const HUB = {
  title: "Quizzes worth taking",
  eyebrow: "By Abhilash Purohit",
  blurb: "Short, honest quizzes for working people. Each takes a few minutes and ends in something you can share. Pick one to start.",
  note: "All in good fun. Made to be shared, not to be graded.",
  author: "Abhilash Purohit",
  authorLinkedin: "https://www.linkedin.com/in/abhilashpurohit",
};

// ---- helpers --------------------------------------------------------------
function read(p) { return fs.readFileSync(p, "utf8"); }
function replaceAll(str, token, value) { return str.split(token).join(value); }
function attr(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
// Run a quiz data file in a stub so we can read its metadata at build time.
function loadQuiz(code) {
  let captured = null;
  const win = { QuizHub: { quizzes: {}, registerQuiz: function (q) { captured = q; return q; } } };
  // eslint-disable-next-line no-new-func
  new Function("window", code)(win);
  if (!captured) throw new Error("Data file did not call window.QuizHub.registerQuiz(...)");
  return captured;
}
function questionCountLabel(quiz) {
  const counts = quiz.variants.map(function (v) { return v.questions.length; });
  const min = Math.min.apply(null, counts), max = Math.max.apply(null, counts);
  return min === max ? min + " questions" : min + "–" + max + " questions";
}
function tagFor(quiz) {
  if (quiz.hubTag) return quiz.hubTag;
  return { ladder: "Level test", archetype: "Archetype", tally: "Spot check" }[quiz.mode] || "Quiz";
}

// ---- inputs ---------------------------------------------------------------
const engineCss = read(path.join(SRC, "engine", "engine.css"));
const engineJs = read(path.join(SRC, "engine", "engine.js"));
const quizTpl = read(path.join(SRC, "templates", "quiz.html"));
const hubTpl = read(path.join(SRC, "templates", "hub.html"));

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

// ---- build each quiz page -------------------------------------------------
const manifest = [];
QUIZ_ORDER.forEach(function (id) {
  const file = path.join(SRC, "quizzes", id + ".js");
  const code = read(file);
  const quiz = loadQuiz(code);
  if (quiz.id !== id) {
    throw new Error("Quiz id '" + quiz.id + "' does not match file name '" + id + ".js'");
  }

  let html = quizTpl;
  html = replaceAll(html, "{{ENGINE_CSS}}", engineCss);
  html = replaceAll(html, "{{ENGINE_JS}}", engineJs);
  html = replaceAll(html, "{{QUIZ_JS}}", code);
  html = replaceAll(html, "{{QUIZ_ID}}", quiz.id);
  html = replaceAll(html, "{{TITLE}}", attr(quiz.title));
  html = replaceAll(html, "{{BLURB}}", attr(quiz.blurb));
  html = replaceAll(html, "{{ANALYTICS_URL}}", ANALYTICS_URL);

  // Directory URLs: docs/<id>/index.html serves at /<id> (no .html in the path).
  const outDir = path.join(OUT, id);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html);
  const kb = (Buffer.byteLength(html) / 1024).toFixed(1);
  console.log("  built " + id + "/index.html  (" + kb + " KB)");

  manifest.push({
    id: quiz.id,
    title: quiz.title,
    blurb: quiz.blurb,
    mode: quiz.mode,
    accent: quiz.accent || "#B08432",
    tag: tagFor(quiz),
    count: questionCountLabel(quiz),
    href: id + "/",
  });
});

// ---- root: hub, or a 404 (no public listing) ------------------------------
if (BUILD_HUB) {
  let hub = hubTpl;
  hub = replaceAll(hub, "{{ENGINE_CSS}}", engineCss);
  hub = replaceAll(hub, "{{HUB_TITLE}}", attr(HUB.title));
  hub = replaceAll(hub, "{{HUB_EYEBROW}}", attr(HUB.eyebrow));
  hub = replaceAll(hub, "{{HUB_BLURB}}", attr(HUB.blurb));
  hub = replaceAll(hub, "{{HUB_NOTE}}", attr(HUB.note));
  hub = replaceAll(hub, "{{AUTHOR}}", attr(HUB.author));
  hub = replaceAll(hub, "{{AUTHOR_LINKEDIN}}", attr(HUB.authorLinkedin));
  hub = replaceAll(hub, "{{MANIFEST}}", JSON.stringify(manifest));
  fs.writeFileSync(path.join(OUT, "index.html"), hub);
  console.log("  built index.html (hub, " + manifest.length + " quizzes)");
} else {
  // No index.html at the root, so the root returns 404. GitHub Pages serves
  // this 404.html (with a 404 status) for the root and any unknown path.
  let nf = read(path.join(SRC, "templates", "notfound.html"));
  nf = replaceAll(nf, "{{ENGINE_CSS}}", engineCss);
  nf = replaceAll(nf, "{{AUTHOR}}", attr(HUB.author));
  nf = replaceAll(nf, "{{AUTHOR_LINKEDIN}}", attr(HUB.authorLinkedin));
  fs.writeFileSync(path.join(OUT, "404.html"), nf);
  console.log("  built 404.html (no hub; root and unknown paths return 404)");
}

// A .nojekyll file keeps GitHub Pages from touching the output.
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");

console.log("Done. Output in docs/");
