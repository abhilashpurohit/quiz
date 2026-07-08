/* ==========================================================================
   Quiz: Mahabharata leadership archetype.  Mode: archetype.
   Twelve situations, no right answers. Each option adds points to one or more
   of six figures; the highest total is your leading style, with a runner-up.
   Balanced so each archetype is the primary of 7-8 options and any can win.
   Keys: arjuna, yudhishthira, krishna, karna, bhishma, draupadi.
   ========================================================================== */
window.QuizHub.registerQuiz({
  id: "mahabharata-archetype",
  title: "Which Mahabharata leader are you?",
  blurb: "Twelve situations, no right answers. Find the figure from the epic whose way of leading is closest to yours.",
  mode: "archetype",
  accent: "#B15A3C",
  accentLight: "#CE7A54",
  hubTag: "Leadership",

  intro: {
    eyebrow: "Leadership Archetype",
    headline: "Which Mahabharata\nleader are you?",
    lead: "Twelve situations from working life, no right answers. How you would handle them points to the figure from the Mahabharata whose way of leading is closest to yours.",
    startLabel: "Find my archetype",
    startMeta: "about three minutes",
  },

  about: {
    trigger: "About the archetypes",
    eyebrow: "The Framework",
    title: "The Mahabharata Way",
    body: [
      "The Mahabharata is full of leaders, and no two lead alike. This reads your choices against six of them, each a distinct and complete way of leading. None is better than the others.",
      "Arjuna leads through mastery. Yudhishthira leads from principle. Krishna leads from a few moves ahead. Karna leads with heart and grit. Bhishma leads by holding things together. Draupadi leads by refusing to let a wrong pass quietly.",
    ],
    chips: ["Arjuna", "Yudhishthira", "Krishna", "Karna", "Bhishma", "Draupadi"],
    note: "These readings draw on the <strong>Mahabharata Way</strong>, a leadership lens from Abhilash Purohit's work on the epic. A bit of fun and reflection, not a personality test.",
  },

  honesty: "A bit of fun and reflection, not a personality test. Tag me with your result. ♥",

  attribution: {
    name: "Abhilash Purohit",
    linkedin: "https://www.linkedin.com/in/abhilashpurohit",
    handle: "linkedin.com/in/abhilashpurohit",
    certLine: "Find your archetype",
  },

  certificate: {
    eyebrow: "Leadership Archetype · The Mahabharata Way",
    headlineStyle: "name",
    caption: "My leadership archetype is {code}, {subhead}. Find yours, created by {author}.",
  },

  shareLabel: "Share my archetype",
  result: {
    tagPrompt: "Post your archetype and tag <strong>Abhilash Purohit</strong>. Then tag three people you'd want beside you, and tell them which leader they are. ♥",
  },

  results: {
    order: ["krishna", "yudhishthira", "bhishma", "arjuna", "karna", "draupadi"],
    runnerUp: "You lead mostly as {top}, with a strong streak of {second}.",
    types: {
      arjuna: {
        name: "Arjuna",
        tagline: "The Focused Warrior",
        blurb: "You lead through mastery. You set a high bar for your own work and pull others up to meet it. When the target is clear you are hard to stop, precise and fully absorbed in the task. Your growth edge is trusting the plan when doubt creeps in, and choosing before you feel fully ready.",
      },
      yudhishthira: {
        name: "Yudhishthira",
        tagline: "The Principled Steward",
        blurb: "You lead from principle. People trust you because you play fair when cutting a corner would be easier, and you hold the line under pressure. You are the steady center a team returns to. Your growth edge is acting sooner, before all the certainty arrives, when a call has to be made.",
      },
      krishna: {
        name: "Krishna",
        tagline: "The Strategist",
        blurb: "You lead from a few moves ahead. You read the whole field, see how the pieces fit, and quietly set others up to succeed. You are comfortable with ambiguity and play the long game while others react to the moment. Your growth edge is stepping into the open, not only guiding from the wings.",
      },
      karna: {
        name: "Karna",
        tagline: "The Loyal Challenger",
        blurb: "You lead with heart and grit. You built your skill the hard way, you stay loyal to the people who backed you, and you rise highest when someone doubts you. You give generously and fight for your own. Your growth edge is choosing your commitments as carefully as you keep them.",
      },
      bhishma: {
        name: "Bhishma",
        tagline: "The Steadfast Guardian",
        blurb: "You lead by holding things together. You keep your commitments, protect your team, and give others something solid to build on. When everything shakes, you are the one still at your post. Your growth edge is knowing when loyalty to the old way should give way to a better one.",
      },
      draupadi: {
        name: "Draupadi",
        tagline: "The Catalyst",
        blurb: "You lead by refusing to let a wrong pass quietly. You name what others tiptoe around, and your conviction moves people from grumbling to action. You turn a hard moment into resolve. Your growth edge is picking the fights that matter most, so your fire lands where it counts.",
      },
    },
  },

  variants: [
    {
      id: "main",
      name: "Leadership archetype",
      questions: [
        {
          q: "A big project lands on your team with a fuzzy goal and a tight deadline. Your first move is to...",
          options: [
            { text: "Pin down exactly what 'done' looks like, then throw yourself at it.", scores: { arjuna: 2 } },
            { text: "Map who does what and line up the pieces before anyone starts.", scores: { krishna: 2 } },
            { text: "Make sure the plan is fair to the people who'll carry it, then commit.", scores: { yudhishthira: 2 } },
            { text: "Rally the team, take the hardest part yourself, and prove it can be done.", scores: { karna: 2 } },
          ],
        },
        {
          q: "A teammate makes a mistake that costs the whole group. You...",
          options: [
            { text: "Judge it by the standard you'd want applied to you, and keep it fair.", scores: { yudhishthira: 2 } },
            { text: "Steady everyone, absorb the hit, and shield the person from the fallout.", scores: { bhishma: 2 } },
            { text: "Say plainly what went wrong so it isn't repeated, then move on.", scores: { draupadi: 2 } },
            { text: "Focus on fixing it fast and getting the work back on track.", scores: { arjuna: 2 } },
          ],
        },
        {
          q: "The plan everyone agreed on is clearly failing halfway through. You...",
          options: [
            { text: "Read where it's heading and quietly steer toward a better route.", scores: { krishna: 2 } },
            { text: "Push harder and out-work the problem before giving up on it.", scores: { karna: 2, arjuna: 1 } },
            { text: "Hold the line you committed to unless there's a real reason to change.", scores: { bhishma: 2 } },
            { text: "Call it out in the room so the group stops pretending it's fine.", scores: { draupadi: 2 } },
          ],
        },
        {
          q: "You're handed more authority than the people around you expected. You...",
          options: [
            { text: "Treat it as a trust to be earned, and use it fairly.", scores: { yudhishthira: 2 } },
            { text: "See it as a duty, and take the responsibility that comes with it seriously.", scores: { bhishma: 2 } },
            { text: "Set a high standard and lead by doing the work at that level.", scores: { arjuna: 2 } },
            { text: "Use it lightly, mostly to set others up to do their best work.", scores: { krishna: 2 } },
          ],
        },
        {
          q: "Someone openly doubts whether you're good enough for the role. You...",
          options: [
            { text: "Let the work answer them. Nothing sharpens you like being underestimated.", scores: { karna: 2 } },
            { text: "Get better still, until the question stops coming up.", scores: { arjuna: 2 } },
            { text: "Name the doubt directly and don't let it sit there unspoken.", scores: { draupadi: 2 } },
            { text: "Stay steady and let your track record speak over time.", scores: { yudhishthira: 2, bhishma: 1 } },
          ],
        },
        {
          q: "Two people you respect are in a real conflict and it's stalling everything. You...",
          options: [
            { text: "Find the deal that gets both what they actually need.", scores: { krishna: 2 } },
            { text: "Weigh both sides fairly and call it honestly, even if it's unwelcome.", scores: { yudhishthira: 2 } },
            { text: "Keep the group steady and hold things together while it cools.", scores: { bhishma: 2 } },
            { text: "Force the real issue into the open so it can finally be settled.", scores: { draupadi: 2 } },
          ],
        },
        {
          q: "There's a shortcut that hits the target faster but cuts a corner you're uneasy about. You...",
          options: [
            { text: "Won't take it. Getting there the right way is the point.", scores: { yudhishthira: 2 } },
            { text: "Stick to the commitment you made, shortcut or not.", scores: { bhishma: 2, yudhishthira: 1 } },
            { text: "Find a clean way to hit the target without the corner.", scores: { arjuna: 2 } },
            { text: "Weigh what it really costs down the line before deciding.", scores: { krishna: 2 } },
          ],
        },
        {
          q: "Your team is low after a public setback. You...",
          options: [
            { text: "Take the front line yourself and show them it isn't over.", scores: { karna: 2 } },
            { text: "Steady them, remind them what holds, and protect the group.", scores: { bhishma: 2 } },
            { text: "Turn the frustration into fuel and point it at what to fix.", scores: { draupadi: 2 } },
            { text: "Reset on a clear next target and get them moving again.", scores: { arjuna: 2 } },
          ],
        },
        {
          q: "You have to choose between a safe win and a bold move that might not land. You...",
          options: [
            { text: "Take the bold move if the long game favors it.", scores: { krishna: 2 } },
            { text: "Take it if you've trained for exactly this moment.", scores: { arjuna: 2, karna: 1 } },
            { text: "Choose the one you could defend to anyone, later.", scores: { yudhishthira: 2 } },
            { text: "Take the risk. Playing safe was never how you got here.", scores: { karna: 2 } },
          ],
        },
        {
          q: "A junior person on your team has real talent but no standing yet. You...",
          options: [
            { text: "See yourself in them and back them hard.", scores: { karna: 2 } },
            { text: "Put them in the right spots to grow and be seen.", scores: { krishna: 2 } },
            { text: "Take them under your wing and steady their footing.", scores: { bhishma: 2 } },
            { text: "Give them the platform to be heard that others won't.", scores: { draupadi: 2, karna: 1 } },
          ],
        },
        {
          q: "The group is drifting from what it said it stood for. You...",
          options: [
            { text: "Say it out loud. Someone has to.", scores: { draupadi: 2 } },
            { text: "Bring it back to the principles everyone signed up to.", scores: { yudhishthira: 2 } },
            { text: "Hold the standard yourself and let it pull others back.", scores: { bhishma: 2 } },
            { text: "Model the right way so clearly it becomes the norm again.", scores: { arjuna: 2 } },
          ],
        },
        {
          q: "At your best, people follow you because...",
          options: [
            { text: "You see further, and you set them up to win.", scores: { krishna: 2 } },
            { text: "You go first into the hard thing, and you're loyal.", scores: { karna: 2 } },
            { text: "They trust you to be fair when it counts.", scores: { yudhishthira: 2 } },
            { text: "You say what needs saying, and you mean it.", scores: { draupadi: 2 } },
          ],
        },
      ],
    },
  ],
});
