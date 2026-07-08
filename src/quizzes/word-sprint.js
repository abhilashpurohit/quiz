/* ==========================================================================
   Quiz: Word sprint (commonly confused words).  Mode: tally, timed.
   Fifteen glanceable pick-the-right-word questions, sixty seconds. The whole-
   quiz countdown (variant.timer) auto-advances on answer. Score is how many you
   get right before the clock runs out; the certificate shows score and time.
   ========================================================================== */
window.QuizHub.registerQuiz({
  id: "word-sprint",
  title: "Can you spot the right word?",
  blurb: "Twenty commonly confused words, timed. Its or it's, affect or effect, fewer or less.",
  mode: "tally",
  accent: "#8A5A94",
  accentLight: "#AC81B4",
  ink: "#241B2E",
  paper: "#F1EDF5",
  hubTag: "Word sprint",

  intro: {
    eyebrow: "Word Sprint",
    headline: "Can you spot\nthe right word?",
    lead: "Twenty of the words people mix up most, from its or it's to affect or effect. The clock runs as you go, but there is no limit. Get as many right as you can, and race the clock or take your time.",
    startLabel: "Start the clock",
    startMeta: "at your own pace",
  },

  about: {
    trigger: "About this sprint",
    eyebrow: "The Idea",
    title: "The words that trip everyone",
    body: [
      "These are the pairs that catch out strong writers: affect and effect, its and it's, fewer and less, who and whom, and a dozen more. They are the small errors that quietly shape how your writing lands.",
      "The clock runs as you go, but there is no limit. Answering moves you to the next word, so trust your instinct or take your time. Your score is out of twenty, and your time is there if you want to beat it.",
    ],
    note: "A bit of fun and a quick check, not a spelling bee.",
  },

  honesty: "A bit of fun, not a spelling bee. Tag me with your result. ♥",

  attribution: {
    name: "Abhilash Purohit",
    linkedin: "https://www.linkedin.com/in/abhilashpurohit",
    handle: "linkedin.com/in/abhilashpurohit",
    certLine: "Take the sprint yourself",
  },

  certificate: {
    eyebrow: "Word Sprint · Commonly Confused Words",
    headlineStyle: "score",
    caption: "I scored {code} on this word sprint in {time}. Beat me. Created by {author}.",
  },

  shareLabel: "Share my score",
  result: {
    tagPrompt: "Post your score and tag <strong>Abhilash Purohit</strong>. Then challenge three people to beat your time. ♥",
  },

  results: {
    eyebrow: "Word Sprint · Commonly Confused Words",
    // Accuracy adjective by percent right (out of twenty). Time is shown
    // separately as a metric, not folded into the label.
    accuracy: [
      { max: 54, adj: "Rough", blurb: "A fair few of the sneaky pairs got past you, and they trip up almost everyone. Worth another run. Half the trick is just knowing which words to watch for." },
      { max: 74, adj: "Sound", blurb: "A dependable feel for the words people confuse. You catch the common traps, and only the slyer pairs slip through." },
      { max: 89, adj: "Sharp", blurb: "A sharp eye for the pairs that quietly undermine good writing. You know the difference where most people just guess." },
      { max: 100, adj: "Precise", blurb: "You do not miss. Affect and effect, its and it's, none of them get past you. You are who people should run their drafts past." },
    ],
  },

  variants: [
    {
      id: "main",
      name: "Word sprint",
      timer: { countUp: true },
      scoring: {
        // Timed: band by accuracy on what you attempted, so a slow, accurate
        // reader is not punished for questions they never reached.
        accuracyBands: [
          { max: 54, band: "warming" }, { max: 74, band: "solid" },
          { max: 89, band: "sharp" }, { max: 100, band: "flawless" },
        ],
      },
      questions: [
        { q: "The delay will ___ our whole timeline.", options: ["affect", "effect"], correct: 0 },
        { q: "The team quietly lost ___ focus.", options: ["its", "it's"], correct: 0 },
        { q: "___ going to want to see this.", options: ["Your", "You're"], correct: 1 },
        { q: "This queue is for ___ than ten items.", options: ["fewer", "less"], correct: 0 },
        { q: "___ did you send the draft to?", options: ["Who", "Whom"], correct: 1 },
        { q: "Her strengths ___ the rest of the team.", options: ["complement", "compliment"], correct: 0 },
        { q: "For me it is a matter of ___.", options: ["principal", "principle"], correct: 1 },
        { q: "We need to order more ___ for the office.", options: ["stationary", "stationery"], correct: 1 },
        { q: "Please keep this ___ for now.", options: ["discreet", "discrete"], correct: 0 },
        { q: "Try not to ___ your nerve at the last minute.", options: ["lose", "loose"], correct: 0 },
        { q: "She is far more experienced ___ I am.", options: ["then", "than"], correct: 1 },
        { q: "___ ready to start whenever you are.", options: ["Their", "They're"], correct: 1 },
        { q: "Bring something light, ___ fruit or nuts.", options: ["e.g.", "i.e."], correct: 0 },
        { q: "Let's take this point a little ___ tomorrow.", options: ["farther", "further"], correct: 1 },
        { q: "Please ___ the door is locked before you leave.", options: ["assure", "ensure"], correct: 1 },
        { q: "This offer is ___ good to be true.", options: ["to", "too"], correct: 1 },
        { q: "Everyone signed off ___ the new hire.", options: ["accept", "except"], correct: 1 },
        { q: "Are you trying to ___ that I got it wrong?", options: ["imply", "infer"], correct: 0 },
        { q: "I still can't decide ___ to go.", options: ["weather", "whether"], correct: 1 },
        { q: "The team syncs ___ at nine.", options: ["everyday", "every day"], correct: 1 },
      ],
    },
  ],
});
