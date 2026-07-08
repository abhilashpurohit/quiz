/* ==========================================================================
   Quiz Hub — shared engine.

   One engine, many quizzes. A quiz is a declarative data object registered with
   registerQuiz(). bootQuiz(id) wires it up. Nothing here is quiz-specific.

   Scoring is a strategy that switches on quiz.mode:
     - ladder    weighted questions produce a rank (e.g. CEFR A1..C2)
     - archetype answers add points to types; the top type wins, no bad result
     - tally     right/wrong out of N, mapped to a banded result
   Adding a fourth mode means adding one case to computeOutcome(); quiz data and
   the rest of the engine stay untouched.
   ========================================================================== */
(function () {
  "use strict";

  var QH = (window.QuizHub = window.QuizHub || { quizzes: {} });

  QH.registerQuiz = function (q) {
    QH.quizzes[q.id] = q;
    return q;
  };

  // DOM-free scoring seam. Given a quiz id, variant id, and an array of chosen
  // option indexes, returns the normalized outcome. Used by tests and reusable
  // anywhere scoring is needed without rendering.
  QH.score = function (quizId, variantId, chosen) {
    quiz = QH.quizzes[quizId];
    variant = quiz.variants.filter(function (v) { return v.id === variantId; })[0] || quiz.variants[0];
    questions = variant.questions;
    answers = chosen;
    return computeOutcome();
  };

  // Test seam: render a certificate canvas for given answers (used to verify
  // layout headlessly). Returns the <canvas>. Renderer is defined below.
  QH.renderCertificateFor = function (quizId, variantId, chosen, name) {
    var outcome = QH.score(quizId, variantId, chosen);
    certName = name || "";
    return renderCertificate(outcome);
  };

  // ---- small helpers ------------------------------------------------------
  function $(id) { return document.getElementById(id); }
  function setHTML(id, html) { var e = $(id); if (e) e.innerHTML = html; }
  function br(s) { return String(s).replace(/\n/g, "<br />"); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fill(tpl, map) {
    return String(tpl == null ? "" : tpl).replace(/\{(\w+)\}/g, function (m, k) {
      return map[k] != null ? map[k] : m;
    });
  }

  // ---- module state (one quiz per page) ----------------------------------
  var quiz = null;         // active quiz definition
  var variant = null;      // active variant object
  var questions = [];      // questions for the active variant
  var idx = 0;
  var answers = [];        // per-question: chosen option index
  var locked = false;
  var lastOutcome = null;  // normalized outcome for share/certificate
  var STORAGE_KEY = "";
  var certName = "";       // optional name drawn on the certificate
  var NAME_KEY = "quizhub-name";   // shared across all quizzes on the hub

  // ---- persistence --------------------------------------------------------
  function saveResult(payload) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(payload)); } catch (e) {}
  }
  function loadResult() {
    try { var raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : null; }
    catch (e) { return null; }
  }
  function clearResult() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }
  // Name is stored under a shared key, so it carries across every quiz. Reset
  // clears the result but keeps the name (same person often takes several).
  function loadName() { try { return localStorage.getItem(NAME_KEY) || ""; } catch (e) { return ""; } }
  function saveName(v) { try { if (v) localStorage.setItem(NAME_KEY, v); else localStorage.removeItem(NAME_KEY); } catch (e) {} }

  // ---- theming ------------------------------------------------------------
  function applyTheme() {
    if (quiz.accent) {
      var root = document.documentElement.style;
      root.setProperty("--accent", quiz.accent);
      root.setProperty("--accent-light", quiz.accentLight || quiz.accent);
    }
    if (quiz.title) document.title = quiz.title;
  }

  // ===========================================================================
  //  SCORING STRATEGIES  ->  a single normalized Outcome the UI can render.
  //  Outcome = { code, subhead, blurb, stats:[{val,label}], eyebrow,
  //              headlineStyle, caption, raw }
  // ===========================================================================
  function computeOutcome() {
    switch (quiz.mode) {
      case "ladder":    return outcomeLadder();
      case "archetype": return outcomeArchetype();
      case "tally":     return outcomeTally();
      default: throw new Error("Unknown quiz mode: " + quiz.mode);
    }
  }

  function correctCount() {
    var n = 0;
    for (var i = 0; i < questions.length; i++) {
      if (answers[i] === questions[i].correct) n++;
    }
    return n;
  }

  // ladder: either flat thresholds on the total, or a per-level walk-up.
  function outcomeLadder() {
    var scoring = variant.scoring || quiz.scoring || { type: "thresholds", thresholds: [] };
    var correct = correctCount();
    var level;

    if (scoring.type === "perLevel") {
      var order = quiz.results.levelOrder;
      var per = {};
      order.forEach(function (l) { per[l] = { correct: 0, total: 0 }; });
      questions.forEach(function (qq, i) {
        if (!per[qq.level]) per[qq.level] = { correct: 0, total: 0 };
        per[qq.level].total++;
        if (answers[i] === qq.correct) per[qq.level].correct++;
      });
      // highest level passed, walking up, stopping at the first failure.
      var pass = scoring.passMark || Math.ceil((per[order[0]].total || 6) * 0.67);
      level = order[0];
      var passedAny = false;
      for (var k = 0; k < order.length; k++) {
        if (per[order[k]].correct >= pass) { level = order[k]; passedAny = true; }
        else break;
      }
      if (!passedAny) level = order[0];
    } else {
      // thresholds: first band whose `max` correct-count we fall within.
      var t = scoring.thresholds;
      level = t[t.length - 1].level;
      for (var j = 0; j < t.length; j++) {
        if (correct <= t[j].max) { level = t[j].level; break; }
      }
    }

    var band = quiz.results.bands[level];
    var stats = [{ val: correct + "/" + questions.length, label: "Correct" }];
    if (typeof band.percentile === "number") {
      stats.push({ val: "Top " + (100 - band.percentile) + "%", label: "Among test-takers" });
    }
    return {
      code: level,
      subhead: band.name,
      blurb: band.blurb,
      stats: stats,
      eyebrow: (quiz.certificate && quiz.certificate.eyebrow) || quiz.results.eyebrow || "",
      headlineStyle: (quiz.certificate && quiz.certificate.headlineStyle) || "monogram",
      caption: fill(captionTpl(), { code: level, subhead: band.name, quizTitle: quiz.title, author: authorName() }),
      raw: { level: level, correct: correct, total: questions.length },
    };
  }

  // archetype: sum points per type, rank, name the top with a runner-up.
  function outcomeArchetype() {
    var totals = {};
    Object.keys(quiz.results.types).forEach(function (k) { totals[k] = 0; });
    questions.forEach(function (qq, i) {
      var chosen = qq.options[answers[i]];
      if (chosen && chosen.scores) {
        Object.keys(chosen.scores).forEach(function (k) {
          totals[k] = (totals[k] || 0) + chosen.scores[k];
        });
      }
    });
    var ranked = Object.keys(totals).sort(function (a, b) {
      if (totals[b] !== totals[a]) return totals[b] - totals[a];
      // stable tiebreak by declared order
      return quiz.results.order.indexOf(a) - quiz.results.order.indexOf(b);
    });
    var topKey = ranked[0], secondKey = ranked[1];
    var top = quiz.results.types[topKey];
    var second = quiz.results.types[secondKey];

    var sum = 0;
    Object.keys(totals).forEach(function (k) { sum += totals[k]; });
    var matchPct = sum > 0 ? Math.round((totals[topKey] / sum) * 100) : 0;

    var blurb = top.blurb;
    // add a runner-up line when the second type is a real presence, not noise.
    if (second && totals[secondKey] > 0 && quiz.results.runnerUp) {
      blurb += " " + fill(quiz.results.runnerUp, { top: top.name, second: second.name });
    }

    var stats = [
      { val: matchPct + "%", label: "You" },
      { val: second ? second.name : "—", label: "Runner-up" },
    ];
    return {
      code: top.name,
      subhead: top.tagline,
      blurb: blurb,
      stats: stats,
      eyebrow: (quiz.certificate && quiz.certificate.eyebrow) || quiz.results.eyebrow || "",
      headlineStyle: (quiz.certificate && quiz.certificate.headlineStyle) || "name",
      caption: fill(captionTpl(), {
        code: top.name, subhead: top.tagline, quizTitle: quiz.title, author: authorName(),
      }),
      raw: { top: topKey, second: secondKey, totals: totals },
    };
  }

  // tally: right/wrong out of N -> a band.
  function outcomeTally() {
    var scoring = variant.scoring || quiz.scoring || { thresholds: [] };
    var correct = correctCount();
    var t = scoring.thresholds;
    var key = t[t.length - 1].band;
    for (var j = 0; j < t.length; j++) {
      if (correct <= t[j].max) { key = t[j].band; break; }
    }
    var band = quiz.results.bands[key];
    var stats = [{ val: correct + "/" + questions.length, label: "Correct" }];
    if (band.stat) stats.push({ val: band.stat, label: band.statLabel || "" });
    return {
      code: correct + "/" + questions.length,
      subhead: band.name,
      blurb: band.blurb,
      stats: stats,
      eyebrow: (quiz.certificate && quiz.certificate.eyebrow) || quiz.results.eyebrow || "",
      headlineStyle: (quiz.certificate && quiz.certificate.headlineStyle) || "score",
      caption: fill(captionTpl(), {
        code: correct + "/" + questions.length, subhead: band.name,
        quizTitle: quiz.title, author: authorName(),
      }),
      raw: { band: key, correct: correct, total: questions.length },
    };
  }

  function authorName() { return (quiz.attribution && quiz.attribution.name) || ""; }
  function captionTpl() {
    return (quiz.certificate && quiz.certificate.caption) ||
      "My result: {code} ({subhead}) on “{quizTitle}”. Take it yourself, created by {author}.";
  }

  // ===========================================================================
  //  INTRO
  // ===========================================================================
  function renderIntro() {
    var i = quiz.intro;
    var variantsHTML;
    if (quiz.variants.length > 1) {
      variantsHTML = '<div class="modes">' + quiz.variants.map(function (v) {
        return '<button class="mode" data-variant="' + esc(v.id) + '">' +
          '<div><div class="mode-name">' + esc(v.name) + '</div>' +
          '<div class="mode-sub">' + esc(v.sub || "") + '</div></div>' +
          '<div class="mode-count">' + v.questions.length + '<span>questions</span></div>' +
          '</button>';
      }).join("") + '</div>';
    } else {
      var v0 = quiz.variants[0];
      variantsHTML = '<div class="single-start">' +
        '<button class="btn full" data-variant="' + esc(v0.id) + '">' +
        esc(i.startLabel || "Begin the test") + '</button>' +
        '<div class="start-meta">' + v0.questions.length + " questions" +
        (i.startMeta ? ", " + esc(i.startMeta) : "") + '</div></div>';
    }

    var aboutHTML = quiz.about
      ? '<div class="about-link-wrap"><button class="btn link about-trigger">' +
        esc(quiz.about.trigger) + '</button></div>'
      : "";

    setHTML("intro",
      '<div class="eyebrow">' + esc(i.eyebrow) + '</div>' +
      '<h1 class="title">' + br(i.headline) + '</h1>' +
      '<div class="rule"></div>' +
      '<p class="lead">' + esc(i.lead) + '</p>' +
      variantsHTML +
      '<div id="prev-cta" class="hidden"><div class="saved-note">You’ve taken this before. ' +
        '<button class="btn link" id="view-saved">View your saved result</button></div></div>' +
      aboutHTML
    );

    $("intro").querySelectorAll("[data-variant]").forEach(function (b) {
      b.addEventListener("click", function () { start(b.getAttribute("data-variant")); });
    });
    var vs = $("view-saved"); if (vs) vs.addEventListener("click", showSaved);
    var at = $("intro").querySelector(".about-trigger");
    if (at) at.addEventListener("click", openAbout);

    refreshIntro();
  }

  function refreshIntro() {
    var saved = loadResult();
    var cta = $("prev-cta");
    if (cta) cta.classList.toggle("hidden", !saved);
  }

  // ===========================================================================
  //  QUIZ FLOW
  // ===========================================================================
  function show(id) {
    ["intro", "quiz", "result"].forEach(function (s) {
      $(s).classList.toggle("hidden", s !== id);
    });
    window.scrollTo(0, 0);
  }

  function start(variantId) {
    variant = quiz.variants.filter(function (v) { return v.id === variantId; })[0] || quiz.variants[0];
    questions = variant.questions;
    idx = 0;
    answers = [];
    locked = false;
    show("quiz");
    renderQuestion();
  }

  function renderQuestion() {
    var qq = questions[idx];
    $("q-label").textContent = "Question " + (idx + 1);
    $("q-count").textContent = (idx + 1) + " / " + questions.length;
    $("q-fill").style.width = (idx / questions.length * 100) + "%";
    $("q-text").textContent = qq.q;

    var optsEl = $("q-opts");
    optsEl.innerHTML = "";
    var opts = qq.options.map(function (o) { return typeof o === "string" ? o : o.text; });
    opts.forEach(function (text, i) {
      var b = document.createElement("button");
      b.className = "opt";
      b.onclick = function () { choose(i); };
      var letter = document.createElement("span");
      letter.className = "letter";
      letter.textContent = String.fromCharCode(65 + i);
      b.appendChild(letter);
      b.appendChild(document.createTextNode(text));
      optsEl.appendChild(b);
    });

    $("q-next").classList.add("hidden");
    locked = false;
  }

  var showsFeedback = function () { return quiz.mode === "ladder" || quiz.mode === "tally"; };

  function choose(i) {
    if (locked) return;
    locked = true;
    answers[idx] = i;
    var qq = questions[idx];
    var buttons = $("q-opts").querySelectorAll(".opt");

    // Feedback modes mark only the chosen answer green or red. The correct
    // answer is NOT revealed, so the quiz reads as an assessment, not a drill.
    // A quiz can opt into revealing the right answer with revealCorrect: true.
    var reveal = quiz.revealCorrect === true;
    buttons.forEach(function (b, bi) {
      b.disabled = true;
      if (showsFeedback()) {
        if (bi === i) b.classList.add(i === qq.correct ? "correct" : "wrong");
        else if (reveal && bi === qq.correct) b.classList.add("correct");
        else b.classList.add("dim");
      } else {
        if (bi === i) b.classList.add("picked");
        else b.classList.add("dim");
      }
    });

    $("q-fill").style.width = ((idx + 1) / questions.length * 100) + "%";
    var nextBtn = $("q-next");
    nextBtn.textContent = (idx + 1 === questions.length) ? "See my result" : "Next question";
    nextBtn.classList.remove("hidden");
  }

  function next() {
    if (idx + 1 < questions.length) { idx++; renderQuestion(); }
    else finish();
  }

  function finish() {
    var outcome = computeOutcome();
    var payload = {
      code: outcome.code, subhead: outcome.subhead, blurb: outcome.blurb,
      stats: outcome.stats, eyebrow: outcome.eyebrow, headlineStyle: outcome.headlineStyle,
      caption: outcome.caption, variantId: variant.id, date: new Date().toISOString(),
    };
    saveResult(payload);
    renderResult(payload, true);
  }

  // ===========================================================================
  //  RESULT
  // ===========================================================================
  function renderResult(payload, justFinished) {
    lastOutcome = payload;
    var statsHTML = (payload.stats || []).map(function (s) {
      return '<div class="stat"><div class="val">' + esc(s.val) + '</div>' +
        '<div class="lab">' + esc(s.label) + '</div></div>';
    }).join("");

    var att = quiz.attribution || {};
    var moreHTML = quiz.hubHref
      ? '<div class="more-quizzes"><a href="' + esc(quiz.hubHref) + '">' +
        esc(quiz.moreLabel || "More quizzes") + " →</a></div>"
      : "";

    setHTML("result",
      '<div class="result-card" id="result-card">' +
        '<div class="frame"></div>' +
        '<div class="r-eyebrow">' + esc(payload.eyebrow) + '</div>' +
        '<div class="r-awarded" id="r-awarded"></div>' +
        '<div class="headline ' + esc(payload.headlineStyle) + '">' + esc(payload.code) + '</div>' +
        '<div class="subhead">' + esc(payload.subhead) + '</div>' +
        '<div class="rrule"></div>' +
        '<p class="blurb">' + esc(payload.blurb) + '</p>' +
        '<div class="stats">' + statsHTML + '</div>' +
      '</div>' +
      '<div class="after">' +
        '<div class="name-field">' +
          '<label for="cert-name">Add your name to the certificate (optional)</label>' +
          '<input id="cert-name" type="text" maxlength="40" placeholder="Your name" autocomplete="name" />' +
          '<div class="name-note">Stays on your device. Appears on the image you download or share.</div>' +
        '</div>' +
        '<div class="row primary-row">' +
          '<button class="btn" id="share-btn">' + esc(quiz.shareLabel || "Share my result") + '</button>' +
          '<button class="btn ghost" id="download-btn">Download image</button>' +
        '</div>' +
        (quiz.result && quiz.result.tagPrompt ? '<p>' + quiz.result.tagPrompt + '</p>' : "") +
        '<div class="row">' +
          '<button class="btn ghost" id="again-btn">Take it again</button>' +
          '<button class="btn ghost" id="reset-btn">Reset for someone else</button>' +
        '</div>' +
        moreHTML +
        '<div class="saved-note" id="save-status"></div>' +
      '</div>'
    );

    $("share-btn").addEventListener("click", shareCard);
    $("download-btn").addEventListener("click", downloadCard);
    $("again-btn").addEventListener("click", resetTest);
    $("reset-btn").addEventListener("click", resetTest);

    // optional name: prefill from the shared key, update live on the card
    certName = loadName();
    var nameInput = $("cert-name");
    if (nameInput) {
      nameInput.value = certName;
      updateAwarded();
      nameInput.addEventListener("input", function () {
        certName = this.value.trim();
        saveName(certName);
        updateAwarded();
      });
    }

    var status = $("save-status");
    if (justFinished) {
      status.textContent = "Result saved to this device.";
    } else {
      var d = payload.date ? new Date(payload.date) : null;
      status.textContent = d ? "Saved on " + d.toLocaleDateString() : "";
    }
    show("result");
  }

  function updateAwarded() {
    var el = $("r-awarded");
    if (el) el.textContent = certName ? "Awarded to " + certName : "";
  }

  function resetTest() { clearResult(); show("intro"); refreshIntro(); }

  function showSaved() {
    var saved = loadResult();
    if (saved) renderResult(saved, false);
  }

  // ===========================================================================
  //  CERTIFICATE  (canvas -> PNG, attribution baked in, 2x for crispness)
  //  Headline font auto-fits so it never clips, from a 2-char level code up to
  //  a long archetype name.
  // ===========================================================================
  function wrapText(ctx, text, maxWidth) {
    var words = text.split(" "), lines = [], line = "";
    for (var i = 0; i < words.length; i++) {
      var test = line ? line + " " + words[i] : words[i];
      if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = words[i]; }
      else line = test;
    }
    if (line) lines.push(line);
    return lines;
  }
  // largest font size (down to min) that fits `text` in `maxWidth`.
  function fitFont(ctx, text, maxWidth, maxSize, minSize, fontFor) {
    for (var s = maxSize; s > minSize; s -= 2) {
      ctx.font = fontFor(s);
      if (ctx.measureText(text).width <= maxWidth) return s;
    }
    return minSize;
  }

  function renderCertificate(payload) {
    var S = 2, W = 640, H = 800;
    var canvas = document.createElement("canvas");
    canvas.width = W * S; canvas.height = H * S;
    var ctx = canvas.getContext("2d");
    ctx.scale(S, S);

    var INK = "#1B2A41", PAPER = "#F7F4EC";
    var ACCENT = quiz.accent || "#B08432";
    var ACCENT_L = quiz.accentLight || accentLightFrom(ACCENT);
    var innerW = W - 160;
    var cx = W / 2;

    ctx.fillStyle = INK; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = hexA(ACCENT, 0.45); ctx.lineWidth = 1.5;
    ctx.strokeRect(24, 24, W - 48, H - 48);
    ctx.textAlign = "center";

    // eyebrow (letter-spaced by hand for canvas)
    ctx.fillStyle = ACCENT_L;
    ctx.font = "700 13px Helvetica, Arial, sans-serif";
    ctx.fillText(spaced(payload.eyebrow.toUpperCase()), cx, 92);

    // optional name, in the gap between eyebrow and headline; fits to width.
    if (certName) {
      var awarded = "Awarded to " + certName;
      var asz = fitFont(ctx, awarded, innerW, 20, 13, function (s) { return "italic " + s + "px Georgia, serif"; });
      ctx.font = "italic " + asz + "px Georgia, serif";
      ctx.fillStyle = "rgba(247,244,236,0.8)";
      ctx.fillText(awarded, cx, 124);
    }

    // headline: monogram (huge), name (fit + wrap), or score (large)
    ctx.fillStyle = PAPER;
    var serif = function (s) { return "700 " + s + "px Georgia, 'Times New Roman', serif"; };
    var headlineBottom;
    if (payload.headlineStyle === "monogram") {
      var ms = fitFont(ctx, payload.code, innerW, 150, 60, serif);
      ctx.font = serif(ms);
      ctx.fillText(payload.code, cx, 250);
      headlineBottom = 250;
    } else if (payload.headlineStyle === "name") {
      var ns = fitFont(ctx, payload.code, innerW, 84, 34, serif);
      ctx.font = serif(ns);
      var lines = ctx.measureText(payload.code).width > innerW
        ? wrapText(ctx, payload.code, innerW) : [payload.code];
      var y = 210;
      lines.forEach(function (ln) { ctx.fillText(ln, cx, y); y += ns * 1.05; });
      headlineBottom = y - ns * 0.35;
    } else { // score
      ctx.font = serif(96);
      ctx.fillText(payload.code, cx, 245);
      headlineBottom = 245;
    }

    // subhead (italic serif)
    ctx.fillStyle = ACCENT_L;
    var subSize = fitFont(ctx, payload.subhead, innerW, 32, 18, function (s) {
      return "italic 700 " + s + "px Georgia, serif";
    });
    ctx.font = "italic 700 " + subSize + "px Georgia, serif";
    var subY = headlineBottom + 44;
    ctx.fillText(payload.subhead, cx, subY);

    // rule
    ctx.strokeStyle = ACCENT; ctx.lineWidth = 2;
    var ruleY = subY + 30;
    ctx.beginPath(); ctx.moveTo(cx - 24, ruleY); ctx.lineTo(cx + 24, ruleY); ctx.stroke();

    // blurb: shrink the font (16 -> 12) until the whole wrapped block fits above
    // a hard floor, so a long archetype blurb can never overrun the stats or the
    // attribution baked in below. This is the "must not clip" guarantee.
    var blurbTop = ruleY + 40;
    var blurbFloor = 582;                 // block must end above this
    ctx.fillStyle = "rgba(247,244,236,0.85)";
    var bSize = 16, blurbLines = [], lineH = 25;
    for (bSize = 16; bSize >= 12; bSize--) {
      ctx.font = bSize + "px Helvetica, Arial, sans-serif";
      lineH = Math.round(bSize * 1.55);
      blurbLines = wrapText(ctx, payload.blurb, innerW);
      if (blurbTop + blurbLines.length * lineH <= blurbFloor) break;
    }
    ctx.font = bSize + "px Helvetica, Arial, sans-serif";
    var by = blurbTop + bSize;
    blurbLines.forEach(function (ln) { ctx.fillText(ln, cx, by); by += lineH; });

    // stats (1 or 2, centered) — follow the blurb but stay clear of attribution.
    var stats = payload.stats || [];
    var statsY = Math.min(620, Math.max(560, by + 34));
    if (stats.length === 1) {
      drawStat(ctx, stats[0], cx, statsY, PAPER, ACCENT);
    } else if (stats.length >= 2) {
      drawStat(ctx, stats[0], cx - 90, statsY, PAPER, ACCENT);
      drawStat(ctx, stats[1], cx + 90, statsY, PAPER, ACCENT);
    }

    // attribution baked into the image
    var att = quiz.attribution || {};
    ctx.strokeStyle = hexA(ACCENT, 0.3); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx - 20, H - 122); ctx.lineTo(cx + 20, H - 122); ctx.stroke();
    ctx.fillStyle = "rgba(247,244,236,0.7)";
    ctx.font = "14px Helvetica, Arial, sans-serif";
    ctx.fillText(att.certLine || "Take the quiz yourself", cx, H - 94);
    ctx.fillStyle = ACCENT_L;
    ctx.font = "700 15px Helvetica, Arial, sans-serif";
    ctx.fillText("Created by " + (att.name || ""), cx, H - 70);
    ctx.fillStyle = "rgba(247,244,236,0.5)";
    ctx.font = "13px Helvetica, Arial, sans-serif";
    ctx.fillText(att.handle || "", cx, H - 48);

    return canvas;
  }

  function drawStat(ctx, stat, x, y, paper, accent) {
    ctx.fillStyle = paper;
    var vs = fitFont(ctx, String(stat.val), 150, 30, 15, function (s) {
      return "700 " + s + "px Georgia, serif";
    });
    ctx.font = "700 " + vs + "px Georgia, serif";
    ctx.fillText(stat.val, x, y);
    ctx.fillStyle = hexA(accent, 0.9);
    ctx.font = "700 11px Helvetica, Arial, sans-serif";
    ctx.fillText(spaced(String(stat.label).toUpperCase()), x, y + 22);
  }

  // canvas has no letter-spacing; fake it for short all-caps strings.
  function spaced(s) { return s.split("").join(" "); }
  function hexA(hex, a) {
    var h = hex.replace("#", "");
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }
  function accentLightFrom(hex) {
    var h = hex.replace("#", "");
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    var lift = function (c) { return Math.min(255, Math.round(c + (255 - c) * 0.18)); };
    return "#" + [lift(r), lift(g), lift(b)].map(function (c) {
      var s = c.toString(16); return s.length === 1 ? "0" + s : s;
    }).join("");
  }

  function certificateBlob() {
    return new Promise(function (resolve) {
      renderCertificate(lastOutcome).toBlob(function (blob) { resolve(blob); }, "image/png");
    });
  }
  function fileName() {
    return quiz.id + "-" + String(lastOutcome.code).replace(/[^\w-]+/g, "-").toLowerCase() + ".png";
  }
  function downloadCard() {
    if (!lastOutcome) return;
    var canvas = renderCertificate(lastOutcome);
    var link = document.createElement("a");
    link.download = fileName();
    link.href = canvas.toDataURL("image/png");
    link.click();
  }
  async function shareCard() {
    if (!lastOutcome) return;
    var caption = lastOutcome.caption;
    try {
      var blob = await certificateBlob();
      var file = new File([blob], fileName(), { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text: caption });
        return;
      }
      if (navigator.share) { await navigator.share({ text: caption }); return; }
      downloadCard();
      try { await navigator.clipboard.writeText(caption); } catch (e) {}
      var status = $("save-status");
      if (status) status.textContent = "Image downloaded and caption copied. Paste it into your post.";
    } catch (e) { /* user cancelled the share sheet, or unsupported; no action */ }
  }

  // ===========================================================================
  //  ABOUT MODAL  (generalized "how this works" — closes on X, outside, Esc)
  // ===========================================================================
  function buildAbout() {
    if (!quiz.about) return;
    var a = quiz.about;
    var bodyParas = Array.isArray(a.body) ? a.body : [a.body];
    var chipsHTML = a.chips
      ? '<div class="chip-scale">' + a.chips.map(function (c) {
          return '<span class="chip">' + esc(c) + "</span>";
        }).join("") + "</div>"
      : "";
    var linkHTML = a.link
      ? '<a class="modal-link" href="' + esc(a.link.href) + '" target="_blank" rel="noopener">' +
        esc(a.link.label) + " →</a>"
      : "";
    setHTML("about-modal",
      '<div class="modal">' +
        '<button class="modal-close" id="about-close" aria-label="Close">&times;</button>' +
        (a.eyebrow ? '<div class="eyebrow">' + esc(a.eyebrow) + "</div>" : "") +
        '<h2 class="modal-title">' + esc(a.title) + "</h2>" +
        '<div class="rule"></div>' +
        bodyParas.map(function (p) { return '<p class="modal-body">' + esc(p) + "</p>"; }).join("") +
        chipsHTML +
        (a.note ? '<p class="modal-body small">' + a.note + "</p>" : "") +
        linkHTML +
      "</div>"
    );
    $("about-modal").addEventListener("click", function (e) {
      if (e.target === $("about-modal")) closeAbout();
    });
    $("about-close").addEventListener("click", closeAbout);
  }
  function openAbout() { $("about-modal").classList.remove("hidden"); }
  function closeAbout() { $("about-modal").classList.add("hidden"); }

  // ===========================================================================
  //  FOOTER
  // ===========================================================================
  function renderFooter() {
    var att = quiz.attribution || {};
    setHTML("site-footer",
      '<div class="foot-rule"></div>' +
      "Made by <strong>" + esc(att.name || "") + "</strong>" +
      (att.linkedin ? ' · <a href="' + esc(att.linkedin) + '" target="_blank" rel="noopener">Connect on LinkedIn</a>' : "") +
      (quiz.honesty ? '<div class="foot-note">' + esc(quiz.honesty) + "</div>" : "")
    );
  }

  // ===========================================================================
  //  BOOT
  // ===========================================================================
  QH.bootQuiz = function (id) {
    quiz = QH.quizzes[id];
    if (!quiz) throw new Error("Quiz not registered: " + id);
    // No hub / cross-links by default: quizzes are standalone. A quiz can opt
    // back in by setting quiz.hubHref, and renderResult renders the link then.
    STORAGE_KEY = "quizhub-" + quiz.id + "-v1";
    applyTheme();
    renderIntro();
    buildAbout();
    renderFooter();
    $("q-next").addEventListener("click", next);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAbout();
    });
    show("intro");
  };
})();
