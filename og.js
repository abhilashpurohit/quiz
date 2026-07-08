#!/usr/bin/env node
/* ==========================================================================
   Open Graph image generator.

   Renders a 1200x630 share-preview card per quiz (and the hub), themed with
   each quiz's palette, into src/og/. These are the images WhatsApp, LinkedIn,
   Slack, etc. show when a link is pasted. Run this whenever a quiz's title,
   blurb, or palette changes:

     npm run og      (needs the `canvas` package: npm i -D canvas)

   The build (build.js) just copies src/og/*.png into docs/og/ and points the
   Open Graph meta tags at them, so the build itself stays dependency-free.
   ========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const { createCanvas } = require("canvas");

const ROOT = __dirname;
const SRC = path.join(ROOT, "src");
const OGDIR = path.join(SRC, "og");
const AUTHOR = "Abhilash Purohit";

// Same list as build.js QUIZ_ORDER.
const QUIZ_ORDER = ["english-cefr", "communication-style", "work-superpower", "word-sprint"];
// Hub card (matches HUB in build.js). Neutral navy/brass.
const HUB = {
  eyebrow: "By Abhilash Purohit",
  title: "Quizzes worth taking",
  blurb: "Short, honest quizzes for working people. Pick one to start.",
  ink: "#1B2A41", paper: "#F7F4EC", accent: "#B08432", accentLight: "#C99A3E",
};

function loadQuiz(code) {
  let q = null;
  const win = { QuizHub: { quizzes: {}, registerQuiz: function (x) { q = x; return x; } } };
  new Function("window", code)(win); // eslint-disable-line no-new-func
  return q;
}

// ---- canvas helpers -------------------------------------------------------
function fitFont(ctx, text, maxW, maxS, minS, f) {
  for (var s = maxS; s > minS; s -= 2) { ctx.font = f(s); if (ctx.measureText(text).width <= maxW) return s; }
  return minS;
}
function wrap(ctx, text, maxW) {
  var words = text.split(" "), lines = [], line = "";
  for (var i = 0; i < words.length; i++) {
    var t = line ? line + " " + words[i] : words[i];
    if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = words[i]; } else line = t;
  }
  if (line) lines.push(line);
  return lines;
}
function spaced(s) { return s.split("").join(" "); }
function hexA(hex, a) {
  var h = hex.replace("#", "");
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  return "rgba(" + parseInt(h.slice(0, 2), 16) + "," + parseInt(h.slice(2, 4), 16) + "," + parseInt(h.slice(4, 6), 16) + "," + a + ")";
}

function render(o) {
  var W = 1200, H = 630, cx = W / 2;
  var canvas = createCanvas(W, H), ctx = canvas.getContext("2d");
  var INK = o.ink, PAPER = o.paper, AC = o.accent, ACL = o.accentLight;
  var serif = function (s) { return "700 " + s + "px Georgia, 'Times New Roman', serif"; };
  var innerW = W - 220;

  ctx.fillStyle = INK; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = hexA(AC, 0.4); ctx.lineWidth = 1.5; ctx.strokeRect(28, 28, W - 56, H - 56);
  ctx.textAlign = "center";

  // eyebrow
  ctx.fillStyle = ACL;
  ctx.font = "700 22px Helvetica, Arial, sans-serif";
  ctx.fillText(spaced(o.eyebrow.toUpperCase()), cx, 152);

  // title (fit, wrap if needed)
  ctx.fillStyle = PAPER;
  var ts = fitFont(ctx, o.title, innerW, 74, 40, serif);
  ctx.font = serif(ts);
  var lines = ctx.measureText(o.title).width > innerW ? wrap(ctx, o.title, innerW) : [o.title];
  var y = lines.length > 1 ? 268 : 300;
  lines.forEach(function (l) { ctx.fillText(l, cx, y); y += ts * 1.08; });

  // rule
  ctx.strokeStyle = AC; ctx.lineWidth = 3;
  var ry = y + 4;
  ctx.beginPath(); ctx.moveTo(cx - 34, ry); ctx.lineTo(cx + 34, ry); ctx.stroke();

  // blurb (up to 2 lines)
  ctx.fillStyle = hexA(PAPER, 0.85);
  ctx.font = "26px Helvetica, Arial, sans-serif";
  var by = ry + 58;
  wrap(ctx, o.blurb, innerW - 40).slice(0, 2).forEach(function (l) { ctx.fillText(l, cx, by); by += 37; });

  // footer
  ctx.fillStyle = ACL;
  ctx.font = "700 22px Helvetica, Arial, sans-serif";
  ctx.fillText("A quiz by " + AUTHOR, cx, H - 66);

  return canvas;
}

if (!fs.existsSync(OGDIR)) fs.mkdirSync(OGDIR, { recursive: true });
QUIZ_ORDER.forEach(function (id) {
  var q = loadQuiz(fs.readFileSync(path.join(SRC, "quizzes", id + ".js"), "utf8"));
  var canvas = render({
    eyebrow: q.intro.eyebrow, title: q.title, blurb: q.blurb,
    ink: q.ink || "#1B2A41", paper: q.paper || "#F7F4EC",
    accent: q.accent || "#B08432", accentLight: q.accentLight || "#C99A3E",
  });
  fs.writeFileSync(path.join(OGDIR, id + ".png"), canvas.toBuffer("image/png"));
  console.log("  src/og/" + id + ".png");
});
fs.writeFileSync(path.join(OGDIR, "hub.png"), render(HUB).toBuffer("image/png"));
console.log("  src/og/hub.png");
console.log("Done. Rebuild to copy these into docs/og/.");
