/* ==========================================================================
   Quiz: Communication style.  Mode: quadrant.
   Two axes read from option {x,y} deltas:
     x  ask (-)  <->  tell (+)
     y  task (-) <->  people (+)
   Sign picks one of four styles; magnitude plots the point on the grid.
   Each question offers all four corners, so any style is reachable.
   ========================================================================== */
window.QuizHub.registerQuiz({
  id: "communication-style",
  title: "What's your communication style?",
  blurb: "Twelve quick reads on how you get your point across, placed on a simple map of styles.",
  mode: "quadrant",
  accent: "#3F8F7F",
  accentLight: "#63B3A2",
  hubTag: "Communication",

  intro: {
    eyebrow: "Communication Style",
    headline: "What's your\ncommunication style?",
    lead: "Twelve quick reads on how you get your point across. Your answers place you on a simple map of four styles. There is no better corner to land in.",
    startLabel: "Find my style",
    startMeta: "about three minutes",
  },

  about: {
    trigger: "About the map",
    eyebrow: "The Map",
    title: "Two axes, four styles",
    body: [
      "Communication style comes down to two questions. First, do you lean toward asking or telling? Second, do you center the task or the people?",
      "Put those together and you get four styles: the Driver, the Energizer, the Analyst, and the Diplomat. Most people lean to one corner and carry a bit of the others.",
    ],
    chips: ["Driver", "Energizer", "Analyst", "Diplomat"],
    note: "This is a friendly take on a long-standing model of communication styles. A bit of fun, not a clinical assessment.",
  },

  honesty: "A bit of fun, not a personality test. Tag me with your result. ♥",

  attribution: {
    name: "Abhilash Purohit",
    linkedin: "https://www.linkedin.com/in/abhilashpurohit",
    handle: "linkedin.com/in/abhilashpurohit",
    certLine: "Find your style",
  },

  certificate: {
    eyebrow: "Communication Style",
    caption: "My communication style is {code}, {subhead}. Find yours, created by {author}.",
  },

  shareLabel: "Share my style",
  result: {
    tagPrompt: "Post your style and tag <strong>Abhilash Purohit</strong>. Then tag three people and guess their corner before they take it. ♥",
  },

  results: {
    axes: {
      x: { lowKey: "ask", low: "Ask", highKey: "tell", high: "Tell", label: "How you engage" },
      y: { lowKey: "task", low: "Task", highKey: "people", high: "People", label: "What you center" },
    },
    quadrants: {
      "tell-task": {
        name: "The Driver",
        tagline: "Decisive and direct",
        blurb: "You communicate to move things. You lead with the point, make the call, and keep everyone out of the weeds. People come to you when they want a decision, not a discussion. At your best you give a team momentum and clarity. Watch that the pace leaves room for the people who need a beat to catch up.",
      },
      "tell-people": {
        name: "The Energizer",
        tagline: "Persuasive and warm",
        blurb: "You communicate to bring people with you. You make ideas vivid, read the room, and get others invested. When the energy dips, you lift it. At your best you turn a plan into something people actually want. Watch that the spark stays backed by the substance underneath.",
      },
      "ask-task": {
        name: "The Analyst",
        tagline: "Precise and evidence-first",
        blurb: "You communicate to get it right. You build the case, mind the detail, and let sound reasoning carry the weight. People trust what you say because you have checked it. At your best you keep everyone honest. Watch that precision does not crowd out the headline people need first.",
      },
      "ask-people": {
        name: "The Diplomat",
        tagline: "Attuned and trusted",
        blurb: "You communicate to build trust. You read what people need, choose your words with care, and keep relationships intact through hard conversations. People open up to you. At your best you hold a team together. Watch that being considerate does not soften a message that needs to land plainly.",
      },
    },
  },

  variants: [
    {
      id: "main",
      name: "Communication style",
      questions: [
        {
          q: "You have five minutes to update a busy leadership team. You...",
          options: [
            { text: "Lead with the decision and the two numbers that back it.", scores: { x: 2, y: -2 } },
            { text: "Open with a quick story so it lands, then the ask.", scores: { x: 2, y: 2 } },
            { text: "Ask questions that walk them to the analysis.", scores: { x: -2, y: -2 } },
            { text: "Check what they need to hear first, then shape it to them.", scores: { x: -2, y: 2 } },
          ],
        },
        {
          q: "A teammate hands you work that is below the bar. You...",
          options: [
            { text: "Tell them plainly what to fix and by when.", scores: { x: 2, y: -2 } },
            { text: "Frame it as a challenge and get them fired up to redo it.", scores: { x: 2, y: 2 } },
            { text: "Point to the specific gaps against the spec.", scores: { x: -1, y: -2 } },
            { text: "Acknowledge the effort first, then guide them gently.", scores: { x: -2, y: 2 } },
          ],
        },
        {
          q: "In a heated meeting, your instinct is to...",
          options: [
            { text: "Cut to the point and push for a decision.", scores: { x: 2, y: -2 } },
            { text: "Lift the energy and rally people to a way forward.", scores: { x: 2, y: 2 } },
            { text: "Slow it down and lay out the facts.", scores: { x: -2, y: -2 } },
            { text: "Make sure everyone feels heard before moving on.", scores: { x: -2, y: 2 } },
          ],
        },
        {
          q: "When you disagree with someone senior, you...",
          options: [
            { text: "Say it plainly. They will respect the directness.", scores: { x: 2, y: -1 } },
            { text: "Make the case with conviction and bring others along.", scores: { x: 2, y: 2 } },
            { text: "Bring the evidence and let it speak.", scores: { x: -2, y: -2 } },
            { text: "Raise it privately and carefully.", scores: { x: -2, y: 2 } },
          ],
        },
        {
          q: "Your favourite way to persuade is...",
          options: [
            { text: "State the recommendation and stand behind it.", scores: { x: 2, y: -1 } },
            { text: "Paint the picture so people want it.", scores: { x: 2, y: 2 } },
            { text: "Build the argument step by step.", scores: { x: -2, y: -2 } },
            { text: "Understand their view, then meet them there.", scores: { x: -2, y: 2 } },
          ],
        },
        {
          q: "People are most likely to describe you as...",
          options: [
            { text: "Decisive.", scores: { x: 2, y: -2 } },
            { text: "Inspiring.", scores: { x: 2, y: 2 } },
            { text: "Rigorous.", scores: { x: -2, y: -2 } },
            { text: "Trusted.", scores: { x: -2, y: 2 } },
          ],
        },
        {
          q: "In writing, you tend to...",
          options: [
            { text: "Keep it short and land the point.", scores: { x: 2, y: -2 } },
            { text: "Make it vivid and human.", scores: { x: 1, y: 2 } },
            { text: "Be precise and complete.", scores: { x: -2, y: -2 } },
            { text: "Mind the tone as much as the content.", scores: { x: -2, y: 2 } },
          ],
        },
        {
          q: "Under pressure, you get...",
          options: [
            { text: "More direct.", scores: { x: 2, y: -1 } },
            { text: "More animated.", scores: { x: 2, y: 2 } },
            { text: "More methodical.", scores: { x: -2, y: -2 } },
            { text: "More careful with people.", scores: { x: -2, y: 2 } },
          ],
        },
        {
          q: "The feedback you value most is...",
          options: [
            { text: "Blunt and fast.", scores: { x: 2, y: -2 } },
            { text: "Encouraging and big-picture.", scores: { x: 1, y: 2 } },
            { text: "Specific and reasoned.", scores: { x: -2, y: -2 } },
            { text: "Kind and constructive.", scores: { x: -2, y: 2 } },
          ],
        },
        {
          q: "You would rather a meeting...",
          options: [
            { text: "End early with a clear decision.", scores: { x: 2, y: -2 } },
            { text: "Leave everyone energized.", scores: { x: 2, y: 2 } },
            { text: "Cover the details properly.", scores: { x: -2, y: -2 } },
            { text: "Leave everyone on the same page.", scores: { x: -1, y: 2 } },
          ],
        },
        {
          q: "When you present, you lead with...",
          options: [
            { text: "The bottom line.", scores: { x: 2, y: -2 } },
            { text: "A hook.", scores: { x: 2, y: 1 } },
            { text: "The method and the data.", scores: { x: -2, y: -2 } },
            { text: "The audience and what matters to them.", scores: { x: -2, y: 2 } },
          ],
        },
        {
          q: "At your best, your communication is...",
          options: [
            { text: "Clear and decisive.", scores: { x: 2, y: -2 } },
            { text: "Compelling and warm.", scores: { x: 2, y: 2 } },
            { text: "Precise and sound.", scores: { x: -2, y: -2 } },
            { text: "Considerate and connective.", scores: { x: -2, y: 2 } },
          ],
        },
      ],
    },
  ],
});
