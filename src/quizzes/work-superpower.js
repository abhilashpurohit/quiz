/* ==========================================================================
   Quiz: Your work superpower.  Mode: archetype.
   Twelve situations, no right answers. Each option adds points to one or more
   of six superpowers; the highest total wins, with a runner-up. Balanced so
   each type is the primary of eight options and any can win.
   Keys: fixer, strategist, connector, builder, anchor, spark.
   ========================================================================== */
window.QuizHub.registerQuiz({
  id: "work-superpower",
  title: "What's your work superpower?",
  blurb: "Twelve situations reveal the superpower you quietly bring to any team. No bad results.",
  mode: "archetype",
  accent: "#D45B4A",
  accentLight: "#E67C6C",
  ink: "#2B2A2E",
  paper: "#F3F1EE",
  hubTag: "Work superpower",

  intro: {
    eyebrow: "Work Superpower",
    headline: "What's your\nwork superpower?",
    lead: "Twelve everyday situations at work, no right answers. How you handle them points to the superpower you quietly bring to any team. There are no bad results here.",
    startLabel: "Find my superpower",
    startMeta: "about three minutes",
  },

  about: {
    trigger: "About the superpowers",
    eyebrow: "The Idea",
    title: "Six ways to be the one they need",
    body: [
      "Every strong team runs on a mix of people who are good at different things. This reads your instincts against six of them, each a real superpower, none better than the rest.",
      "The Fixer makes problems disappear. The Strategist sees three moves ahead. The Connector makes things happen through people. The Builder turns ideas into real things. The Anchor keeps everyone steady. The Spark gets things going.",
    ],
    chips: ["Fixer", "Strategist", "Connector", "Builder", "Anchor", "Spark"],
    note: "A bit of fun and a little self-recognition, not a personality test.",
  },

  honesty: "A bit of fun, not a personality test. Tag me with your result. ♥",

  attribution: {
    name: "Abhilash Purohit",
    linkedin: "https://www.linkedin.com/in/abhilashpurohit",
    handle: "linkedin.com/in/abhilashpurohit",
    certLine: "Find your superpower",
  },

  certificate: {
    eyebrow: "Work Superpower",
    headlineStyle: "name",
    caption: "My work superpower is {code}, {subhead}. Find yours, created by {author}.",
  },

  shareLabel: "Share my superpower",
  result: {
    tagPrompt: "Post your superpower and tag <strong>Abhilash Purohit</strong>. Then tag three people and call out theirs. ♥",
  },

  results: {
    order: ["strategist", "connector", "builder", "fixer", "anchor", "spark"],
    runnerUp: "You have a strong streak of {second} in you, too.",
    types: {
      fixer: {
        name: "The Fixer",
        tagline: "The one who makes problems disappear",
        blurb: "When something breaks, people look for you. You cut through the mess, find what actually needs doing, and get it working again. You are quick where it counts and calm when it matters. Your gift is turning a five-alarm problem into a solved one, often before anyone else has finished panicking.",
      },
      strategist: {
        name: "The Strategist",
        tagline: "The one who sees three moves ahead",
        blurb: "You see the whole board while others watch the ball. You spot where things are heading, connect the dots nobody else does, and find the smart way through. People bring you their hardest questions because you make the complicated feel clear. Your gift is turning a fog of options into a plan worth following.",
      },
      connector: {
        name: "The Connector",
        tagline: "The one who makes things happen through people",
        blurb: "You know who to call, and they pick up. Work moves faster around you because you bring the right people together at the right moment and get them pulling the same way. You see the human map others miss. Your gift is making a room of strangers feel like a team, and turning relationships into results.",
      },
      builder: {
        name: "The Builder",
        tagline: "The one who turns ideas into real things",
        blurb: "While others talk about it, you make it. You turn a rough idea into something that works and actually ships, and you would rather have a real first version than a perfect plan. People trust you to finish what you start. Your gift is momentum, taking the thing from nothing to done.",
      },
      anchor: {
        name: "The Anchor",
        tagline: "The calm the team is built on",
        blurb: "When everything shakes, you are the one still standing steady. People bring you their stress because you bring the temperature down and the order back. You are reliable in the way that lets everyone else take risks. Your gift is being the constant a team is built on, the person others can always count on.",
      },
      spark: {
        name: "The Spark",
        tagline: "The one who gets things going",
        blurb: "You bring the energy that gets things off the ground. Where there is hesitation, you bring momentum. You start what others circle around, and your enthusiasm is contagious enough to carry a room. People feel more capable around you. Your gift is ignition, turning a maybe into a let's go.",
      },
    },
  },

  variants: [
    {
      id: "main",
      name: "Work superpower",
      questions: [
        {
          q: "A new project kicks off with a lot of unknowns. Your instinct is to...",
          options: [
            { text: "Pull together the right people to figure it out.", scores: { connector: 2 } },
            { text: "Start making a rough version to see what works.", scores: { builder: 2, spark: 1 } },
            { text: "Bring some calm and structure so no one panics.", scores: { anchor: 2 } },
            { text: "Get everyone excited about what it could be.", scores: { spark: 2 } },
          ],
        },
        {
          q: "Something breaks the day before a big deadline. You...",
          options: [
            { text: "Dive in and fix it, whatever it takes.", scores: { fixer: 2 } },
            { text: "Step back and find the smartest way through.", scores: { strategist: 2 } },
            { text: "Keep everyone steady and focused while it gets sorted.", scores: { anchor: 2 } },
            { text: "Rally the team and turn the scramble into momentum.", scores: { spark: 2 } },
          ],
        },
        {
          q: "People come to you most often for...",
          options: [
            { text: "Untangling a mess no one else can.", scores: { fixer: 2 } },
            { text: "Thinking through the bigger picture.", scores: { strategist: 2 } },
            { text: "An introduction to exactly the right person.", scores: { connector: 2 } },
            { text: "Actually getting the thing built.", scores: { builder: 2 } },
          ],
        },
        {
          q: "Give you a blank whiteboard and you'll...",
          options: [
            { text: "Map out where this could go and how to get there.", scores: { strategist: 2 } },
            { text: "Sketch the first version of the thing itself.", scores: { builder: 2 } },
            { text: "Lay out a plan everyone can rely on.", scores: { anchor: 2, strategist: 1 } },
            { text: "Fill it with ideas and possibilities.", scores: { spark: 2 } },
          ],
        },
        {
          q: "The team is stuck. You get them moving by...",
          options: [
            { text: "Removing whatever is blocking them.", scores: { fixer: 2 } },
            { text: "Bringing in the person who can unlock it.", scores: { connector: 2 } },
            { text: "Just starting, and letting progress pull them along.", scores: { builder: 2, fixer: 1 } },
            { text: "Reigniting the energy and reminding them why it matters.", scores: { spark: 2 } },
          ],
        },
        {
          q: "Under real pressure, you become...",
          options: [
            { text: "The one who jumps on the problem.", scores: { fixer: 2 } },
            { text: "The one thinking two steps ahead.", scores: { strategist: 2 } },
            { text: "The one who knows who to call.", scores: { connector: 2 } },
            { text: "The calm one everyone leans on.", scores: { anchor: 2 } },
          ],
        },
        {
          q: "Your favourite part of a win is...",
          options: [
            { text: "Watching the plan come together.", scores: { strategist: 2 } },
            { text: "Seeing the people you brought together click.", scores: { connector: 2 } },
            { text: "Knowing you held it steady the whole way.", scores: { anchor: 2 } },
            { text: "The buzz of pulling it off.", scores: { spark: 2 } },
          ],
        },
        {
          q: "A teammate is drowning in work. You...",
          options: [
            { text: "Jump in and clear the worst of it.", scores: { fixer: 2, builder: 1 } },
            { text: "Find them the right help.", scores: { connector: 2 } },
            { text: "Roll up your sleeves and build alongside them.", scores: { builder: 2 } },
            { text: "Steady them and help them prioritise.", scores: { anchor: 2 } },
          ],
        },
        {
          q: "You'd describe your edge as...",
          options: [
            { text: "I make problems disappear.", scores: { fixer: 2 } },
            { text: "I see three moves ahead.", scores: { strategist: 2 } },
            { text: "I turn ideas into real things.", scores: { builder: 2 } },
            { text: "I get things off the ground.", scores: { spark: 2 } },
          ],
        },
        {
          q: "In a meeting that's going nowhere, you...",
          options: [
            { text: "Reframe it around what actually matters.", scores: { strategist: 2 } },
            { text: "Get the right voices into the room.", scores: { connector: 2 } },
            { text: "Push for a concrete next step.", scores: { builder: 2, strategist: 1 } },
            { text: "Bring it back to calm and clarity.", scores: { anchor: 2 } },
          ],
        },
        {
          q: "The thing colleagues thank you for is...",
          options: [
            { text: "Saving the day when it counts.", scores: { fixer: 2 } },
            { text: "Shipping what you said you would.", scores: { builder: 2 } },
            { text: "Being someone they can always count on.", scores: { anchor: 2 } },
            { text: "Bringing the energy that carries them.", scores: { spark: 2 } },
          ],
        },
        {
          q: "At your best, you're the one who...",
          options: [
            { text: "Makes the impossible problem go away.", scores: { fixer: 2 } },
            { text: "Sees the path no one else spotted.", scores: { strategist: 2 } },
            { text: "Brings the right people together at the right time.", scores: { connector: 2 } },
            { text: "Lights the fire that gets everyone going.", scores: { spark: 2, connector: 1 } },
          ],
        },
      ],
    },
  ],
});
