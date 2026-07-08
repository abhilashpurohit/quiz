/* ==========================================================================
   Quiz: Word sprint (commonly confused words).  Mode: tally, timed.
   Fifteen glanceable pick-the-right-word questions, sixty seconds. The whole-
   quiz countdown (variant.timer) auto-advances on answer. Score is how many you
   get right before the clock runs out; the certificate shows score and time.
   ========================================================================== */
window.QuizHub.registerQuiz({
  id: "word-sprint",
  title: "How fast can you spot the right word?",
  blurb: "Twenty commonly confused words, sixty seconds. Its or it's, affect or effect, fewer or less.",
  mode: "tally",
  accent: "#8A5A94",
  accentLight: "#AC81B4",
  hubTag: "Word sprint",

  intro: {
    eyebrow: "Word Sprint",
    headline: "How fast can you\nspot the right word?",
    lead: "Twenty of the words people mix up most, and sixty seconds on the clock. Its or it's, affect or effect, fewer or less. Pick fast. See how many you get before time runs out.",
    startLabel: "Start the clock",
    startMeta: "sixty seconds",
  },

  about: {
    trigger: "About this sprint",
    eyebrow: "The Idea",
    title: "The words that trip everyone",
    body: [
      "These are the pairs that catch out strong writers: affect and effect, its and it's, fewer and less, who and whom, and a dozen more. They are the small errors that quietly shape how your writing lands.",
      "You have sixty seconds for twenty. Answering moves you straight to the next one, so trust your instinct and keep going.",
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
    eyebrow: "Word Sprint · Against the Clock",
    headlineStyle: "score",
    caption: "I got {code} right in {time} on this word sprint. Beat me. Created by {author}.",
  },

  shareLabel: "Share my score",
  result: {
    tagPrompt: "Post your score and tag <strong>Abhilash Purohit</strong>. Then challenge three people to beat your time. ♥",
  },

  results: {
    eyebrow: "Word Sprint · Against the Clock",
    bands: {
      warming: { name: "Warming up", blurb: "A few of the sneaky ones got past you, and these trip up almost everyone. Run it again. Half the trick is just spotting which pairs to watch for." },
      solid: { name: "Solid", blurb: "A dependable eye for the words people confuse. You catch the common traps and only the slyest ones slip through. Most writing crosses your desk in good shape." },
      sharp: { name: "Sharp eye", blurb: "A sharp eye, and under pressure. You know the pairs that quietly undermine good writing and you get them right at speed. The person others check with when they are unsure." },
      flawless: { name: "Word nerd", blurb: "Near flawless, against the clock. Affect and effect, its and it's, none of them stand a chance with you. You are who people should run their drafts past." },
    },
  },

  variants: [
    {
      id: "main",
      name: "Word sprint",
      timer: { seconds: 60 },
      scoring: {
        thresholds: [
          { max: 11, band: "warming" }, { max: 15, band: "solid" },
          { max: 18, band: "sharp" }, { max: 20, band: "flawless" },
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
