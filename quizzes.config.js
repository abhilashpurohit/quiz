/* ==========================================================================
   The quiz set and its visibility. This is the ONE place to control which
   quizzes exist and which show on the hub. Used by build.js and og.js.

   Each entry:
     - order in this list = order on the hub
     - present (not commented out) = the quiz is BUILT: its page works and is
       shareable at /<id>, and it gets a share-preview image
     - listed: false = built and shareable, but HIDDEN from the hub listing
       (a "soft launch": share the direct link, it won't appear in the catalog)
     - removed / commented out = not built at all (parked or draft)

   So the three states are:
     shown      ->  { id: "..." }                 (built + on the hub)
     unlisted   ->  { id: "...", listed: false }  (built, shareable, not on hub)
     off        ->  // { id: "..." }               (not built)
   ========================================================================== */
module.exports = [
  { id: "english-cefr" },
  { id: "communication-style", listed: false },
  { id: "work-superpower", listed: false },
  { id: "word-sprint", listed: false },
  // { id: "mahabharata-leader" },   // parked: not built. Uncomment to bring back.
];
