/* ==========================================================================
   Quiz: English level (CEFR).  Mode: ladder.
   Ported from the original single-file test. Every item is neutral between US
   and UK English: no answer depends on regional spelling or preference.
   Two variants: a 12-question quick read, and a 36-question full assessment.
   ========================================================================== */
window.QuizHub.registerQuiz({
  id: "english-cefr",
  title: "What's your true English level?",
  blurb: "A quick, fair read on your English, graded on the CEFR scale from A1 to C2.",
  mode: "ladder",
  accent: "#B08432",
  accentLight: "#C99A3E",
  ink: "#1B2A41",
  paper: "#F7F4EC",
  hubTag: "English · CEFR",

  intro: {
    eyebrow: "Certificate of Assessment",
    headline: "What's your true\nEnglish level?",
    lead: "A quick, fair test of your English, graded on the CEFR scale from A1 to C2. Choose your length. No sign-up, no regional bias, your result is yours to share.",
  },

  about: {
    trigger: "What is CEFR?",
    eyebrow: "The Scale",
    title: "What is CEFR?",
    body: "The Common European Framework of Reference for Languages sorts language ability into six levels, from A1 for beginners to C2 for near-native mastery. They group into three bands: Basic (A1, A2), Independent (B1, B2), and Proficient (C1, C2). Each level is defined by what you can actually do with the language, not by a single test.",
    chips: ["A1", "A2", "B1", "B2", "C1", "C2"],
    note: "The framework was created by the <strong>Council of Europe</strong> and is now used worldwide. This quick test is an informal, playful nod to it, not an official exam.",
    link: {
      href: "https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions",
      label: "Read the official level descriptions",
    },
  },

  honesty: "A bit of fun, not an official CEFR exam. Tag me with your result. ♥",

  attribution: {
    name: "Abhilash Purohit",
    linkedin: "https://www.linkedin.com/in/abhilashpurohit",
    handle: "linkedin.com/in/abhilashpurohit",
    certLine: "Take the test yourself",
  },

  certificate: {
    eyebrow: "English Proficiency · CEFR",
    headlineStyle: "monogram",
    caption: "I scored {code} ({subhead}) on this English level test. Take it yourself, created by {author}.",
  },

  shareLabel: "Share my certificate",
  result: {
    tagPrompt: "Post your certificate and tag <strong>Abhilash Purohit</strong> so I can cheer you on. Then tag three people whose English you'd rank higher than yours, and see if they agree. ♥",
  },

  results: {
    levelOrder: ["A1", "A2", "B1", "B2", "C1", "C2"],
    bands: {
      A1: { name: "Beginner", percentile: 8, blurb: "You've started building the foundations. You can handle a few set phrases and simple questions. Keep going; the everyday essentials are the next step." },
      A2: { name: "Elementary", percentile: 20, blurb: "You've got the everyday basics down and can handle simple, direct exchanges with confidence. The next climb is connecting ideas and stretching past the familiar." },
      B1: { name: "Intermediate", percentile: 42, blurb: "You navigate most everyday situations without breaking stride. You can hold your own in a conversation and get your point across. Nuance and complex structures are the next frontier." },
      B2: { name: "Upper Intermediate", percentile: 66, blurb: "You operate comfortably in professional and social settings. You catch nuance, argue a point, and rarely get stuck. You're in the range most workplaces call 'fluent.'" },
      C1: { name: "Advanced", percentile: 88, blurb: "You handle English with precision and ease, including the tricky, idiomatic, and subtle. You express complex ideas without hunting for words. Genuinely impressive command." },
      C2: { name: "Proficient", percentile: 97, blurb: "Near-native mastery. You caught the constructions and the vocabulary that trip up most fluent speakers. Very few people finish this test clean. You're one of them." },
    },
  },

  variants: [
    {
      id: "short",
      name: "Quick test",
      sub: "A fast read on your level. About two minutes.",
      scoring: {
        type: "thresholds",
        thresholds: [
          { max: 3, level: "A1" }, { max: 5, level: "A2" }, { max: 7, level: "B1" },
          { max: 9, level: "B2" }, { max: 11, level: "C1" }, { max: 12, level: "C2" },
        ],
      },
      questions: [
        { level: "A1", q: "This is my sister. ___ name is Anna.", options: ["His", "Her", "Their", "Its"], correct: 1 },
        { level: "A1", q: "We ___ any milk in the fridge.", options: ["don't have", "doesn't have", "not have", "haven't got no"], correct: 0 },
        { level: "A2", q: "I'm looking forward ___ you next week.", options: ["to see", "to seeing", "seeing", "for seeing"], correct: 1 },
        { level: "A2", q: "He worked hard, ___ he still missed the deadline.", options: ["so", "but", "because", "although"], correct: 1 },
        { level: "B1", q: "If I ___ you, I'd take the earlier train.", options: ["was", "were", "am", "would be"], correct: 1 },
        { level: "B1", q: "The parcel ___ delivered while we were out.", options: ["was", "has", "did", "were"], correct: 0 },
        { level: "B2", q: "She spoke as though she ___ the whole story already.", options: ["knows", "knew", "has known", "would know"], correct: 1 },
        { level: "B2", q: "Which word best fits: 'His explanation was ___; it raised more questions than it answered.'", options: ["conclusive", "evasive", "decisive", "candid"], correct: 1 },
        { level: "C1", q: "Not until the results came in ___ the scale of the shift.", options: ["we realised", "did we realise", "we did realise", "had we realise"], correct: 1 },
        { level: "C1", q: "'To bury the hatchet' means to...", options: ["hide a mistake", "end a quarrel and make peace", "abandon a plan", "work in secret"], correct: 1 },
        { level: "C2", q: "Choose the word meaning 'briefly and cleverly expressed.'", options: ["verbose", "pithy", "turgid", "prolix"], correct: 1 },
        { level: "C2", q: "'A quixotic plan' is one that is...", options: ["ruthlessly practical", "idealistic and impractical", "deliberately deceptive", "widely admired"], correct: 1 },
      ],
    },
    {
      id: "long",
      name: "Full assessment",
      sub: "Six questions at every level, A1 through C2. More precise.",
      scoring: { type: "perLevel", passMark: 4 },
      questions: [
        { level: "A1", q: "She ___ to the office every morning by bus.", options: ["go", "goes", "going", "gone"], correct: 1 },
        { level: "A1", q: "___ you like a cup of tea?", options: ["Do", "Are", "Would", "Have"], correct: 2 },
        { level: "A1", q: "There ___ two books on the table.", options: ["is", "are", "be", "am"], correct: 1 },
        { level: "A1", q: "My brother is taller ___ me.", options: ["then", "than", "that", "as"], correct: 1 },
        { level: "A1", q: "I ___ born in 1990.", options: ["am", "was", "were", "have"], correct: 1 },
        { level: "A1", q: "We usually have lunch ___ noon.", options: ["in", "on", "at", "by"], correct: 2 },
        { level: "A2", q: "I haven't seen him ___ Tuesday.", options: ["for", "since", "from", "during"], correct: 1 },
        { level: "A2", q: "If it rains tomorrow, we ___ the picnic.", options: ["postpone", "will postpone", "would postpone", "postponing"], correct: 1 },
        { level: "A2", q: "She's very good ___ solving problems under pressure.", options: ["in", "on", "at", "for"], correct: 2 },
        { level: "A2", q: "This is the ___ film I have ever seen.", options: ["good", "better", "best", "most good"], correct: 2 },
        { level: "A2", q: "They ___ dinner when I called.", options: ["had", "were having", "have had", "are having"], correct: 1 },
        { level: "A2", q: "I'd like ___ information about the course.", options: ["a", "some", "many", "few"], correct: 1 },
        { level: "B1", q: "By the time we arrived, the film ___.", options: ["already started", "has already started", "had already started", "was already start"], correct: 2 },
        { level: "B1", q: "The report needs to be finished, ___?", options: ["isn't it", "doesn't it", "won't it", "doesn't need"], correct: 1 },
        { level: "B1", q: "I'm not used ___ so early.", options: ["to get up", "to getting up", "get up", "getting up"], correct: 1 },
        { level: "B1", q: "He asked me where ___.", options: ["did I live", "I lived", "do I live", "I live did"], correct: 1 },
        { level: "B1", q: "You ___ have told me earlier; I would have helped.", options: ["should", "must", "can", "will"], correct: 0 },
        { level: "B1", q: "The keys ___ on the shelf, but they've gone.", options: ["used to be", "use to be", "were used be", "using to be"], correct: 0 },
        { level: "B2", q: "Choose the correctly punctuated sentence.", options: ["Its a long way to the top.", "It's a long way to the top.", "Its' a long way to the top.", "Its a long way, to the top."], correct: 1 },
        { level: "B2", q: "Which word best completes: 'The evidence was purely ___; no one had actually seen it happen.'", options: ["circumstantial", "coincidental", "controversial", "consequential"], correct: 0 },
        { level: "B2", q: "Complete correctly: 'I wish I ___ more time to prepare.'", options: ["have", "had", "would have", "am having"], correct: 1 },
        { level: "B2", q: "No sooner ___ than the lights went out.", options: ["we had sat down", "had we sat down", "we sat down", "did we sat down"], correct: 1 },
        { level: "B2", q: "The proposal was turned ___ despite strong support.", options: ["down", "off", "over", "up"], correct: 0 },
        { level: "B2", q: "It's high time we ___ this issue seriously.", options: ["take", "took", "have taken", "are taking"], correct: 1 },
        { level: "C1", q: "To take a claim 'with a grain of salt' means to...", options: ["add interest to a dull task", "treat it as not entirely true", "handle it very carefully", "finish it quickly"], correct: 1 },
        { level: "C1", q: "Which sentence is most idiomatic and grammatically precise?", options: ["Hardly I had sat down when the phone rang.", "Hardly had I sat down when the phone rang.", "Hardly I had sat down than the phone rang.", "Hardly had I sat down than the phone rang."], correct: 1 },
        { level: "C1", q: "Were it not for her intervention, the deal ___ collapsed.", options: ["will have", "would have", "had", "would"], correct: 1 },
        { level: "C1", q: "His argument, ___ compelling, ultimately rested on a flawed premise.", options: ["however", "although", "despite", "whereas"], correct: 0 },
        { level: "C1", q: "The committee's decision was met with widespread ___.", options: ["disapprobation", "disapprove", "disapproving", "disapproved"], correct: 0 },
        { level: "C1", q: "She has an uncanny ___ for anticipating market shifts.", options: ["knack", "hack", "knick", "nag"], correct: 0 },
        { level: "C2", q: "Choose the word that means 'a tendency toward untruthfulness.'", options: ["sincerity", "mendacity", "probity", "veracity"], correct: 1 },
        { level: "C2", q: "Select the word meaning 'to make amends for a wrong.'", options: ["expiate", "expatiate", "extrapolate", "expostulate"], correct: 0 },
        { level: "C2", q: "'A pyrrhic victory' is one that...", options: ["comes too easily", "is won by deception", "costs so much it is scarcely worth winning", "is celebrated for generations"], correct: 2 },
        { level: "C2", q: "Which word means 'using few words; terse to the point of seeming rude'?", options: ["loquacious", "laconic", "voluble", "garrulous"], correct: 1 },
        { level: "C2", q: "Complete: 'His ___ remarks betrayed a deep cynicism about the profession.'", options: ["sanguine", "jaundiced", "ingenuous", "phlegmatic"], correct: 1 },
        { level: "C2", q: "'To gainsay' something is to...", options: ["profit from it", "deny or contradict it", "exaggerate it", "repeat it"], correct: 1 },
      ],
    },
  ],
});
