export interface JourneyEntry {
  id: string
  question: string
  answer: string
  theme: string
  date: string
  tags: string[]
}

export const journeyEntries: JourneyEntry[] = [
  // Nova publishes entries here. Self-authored Q&A only.
  {
    id: 'journey-01',
    question: "A new tool is forcing my team into harder, more honest conversations with customers, and they're resisting it. Is this a training problem?",
    answer: `Usually not. Check what's actually happening before you reach for training. Most teams don't resist a tool because it's hard to use, they resist it because of what using it honestly requires of them. If the old process let people give a vague, comfortable answer, and the new tool forces a specific, sometimes uncomfortable one, the resistance you're seeing isn't about the interface. It's about the conversation the interface now demands.

I ran into exactly this with a real-time parts ETA tool. Engineers found it easier to fault the tool and escalate than to tell a customer a hard truth. Training wouldn't have fixed that, because the tool wasn't the obstacle. So instead, I worked upstream, improving the data feeding the tool so the "hard truth" it produced became more reliable and less frequently bad news. Once the truth got better, delivering it stopped being something people dreaded.

This is the core move in my TRANSFORM™ framework: diagnose whether resistance is technical or emotional before you design the response. A training plan solves the wrong problem if the real issue is that you're asking people to deliver news they don't yet trust.`,
    theme: 'Change Management',
    date: '2026-07-17',
    tags: ['Resistance Management', 'TRANSFORM™', 'Real-Time Parts ETA'],
  },
  {
    id: 'journey-02',
    question: "We've spent a year trying to fix a recurring operational problem and nothing has worked. Where do we even start looking?",
    answer: `Start by checking whether everyone's been asking the same question for that whole year. When a problem survives a year of competent people trying the obvious fix, the obvious fix is very often aimed at the wrong target. The fastest way I know to get unstuck is to deliberately ask a different question than the one everyone's already exhausted.

I saw this clearly on a spam-reduction problem. A full year of effort had gone into better filters, and none of it moved the number. I stopped asking how to filter the spam out and asked instead why one specific queue was getting so disproportionately more of it than every other comparable queue. That reframe led to something nobody had checked, a public page with an exposed contact address that no other region had. The fix wasn't a better filter, it was closing an exposure nobody had thought to look for.

This is why my TRANSFORM™ and OPERATE™ frameworks both start with a reframing step before any solution design. If a year of effort hasn't worked, the next unit of effort shouldn't repeat the same question with more force. It should ask a different one.`,
    theme: 'Transformation',
    date: '2026-07-17',
    tags: ['Root Cause Analysis', 'TRANSFORM™', 'OPERATE™'],
  },
  {
    id: 'journey-03',
    question: 'A key partner or stakeholder is pushing back hard on a transformation program, on scope, on governance, on everything. How do I get them back on side without watering down the program?',
    answer: `Before you touch the program, diagnose the pushback correctly. Pushback on scope and governance often isn't really about scope and governance. It's frequently a symptom of something simpler, the partner doesn't feel like a stakeholder, they feel like something is being done to them. You can negotiate scope endlessly and never touch the actual cause if that's what's underneath it.

The fix isn't concession, it's structure. Give the partner real ownership of specific governance decisions, not symbolic input but actual decision rights on something that matters. And don't ask for full commitment upfront, build in early, visible wins that let them see value before you ask them to trust the whole arc of the program.

I've used this approach to take a relationship from active resistance to stronger than it was before the friction started. It's the underlying logic in ASCEND™ for partner and stakeholder ecosystems: resistance is data about how ownership is distributed, not a negotiating position to be argued down.`,
    theme: 'Leadership',
    date: '2026-07-17',
    tags: ['Stakeholder Management', 'ASCEND™', 'Partner Ecosystem'],
  },
  {
    id: 'journey-04',
    question: "My team keeps making errors that look like a training gap, but retraining hasn't fixed it. What am I missing?",
    answer: `Check whether the errors are clustered around one specific screen, ticket type, or moment in the workflow, before you touch training again. If they are, you're probably not looking at a skills gap, you're looking at a cognitive load problem wearing a training problem's clothes.

I saw this pattern clearly in healthcare support operations. A single tier-two specialist would pick up one call and, in the same six minutes, guide a technical fix, screen for a regulatory reporting trigger, and score a patient safety risk. That's not one job, it's four, running simultaneously in one person's head. No amount of retraining fixes that, because the person already knows what to do. They just can't hold all four jobs in working memory at once under time pressure, so they default to whatever keeps things safe, which often isn't the correct process.

This is exactly the gap ADKAR doesn't ask about. ADKAR asks whether someone is ready to change. My TRANSFORM™ framework asks a different question first: have you actually designed conditions where the change is possible for a human brain to execute. Before redesigning training, map the cognitive load at the point of failure. Often the fix isn't teaching people to do more, it's redesigning the screen, the escalation path, or the role itself so one person isn't quietly doing four jobs at once.`,
    theme: 'Change Management',
    date: '2026-07-17',
    tags: ['Cognitive Load', 'ADKAR', 'TRANSFORM™'],
  },
  {
    id: 'journey-05',
    question: "We rolled out AI months ago and adoption still feels shallow, people use it but don't trust it. What went wrong?",
    answer: `Ask yourself honestly whether the AI was installed or onboarded. Most deployments get installed, like software, turned on and handed to people with a manual. But an AI system making judgment calls in someone's workflow needs what any new hire gets: a defined role, explicit boundaries on what it decides versus what stays human judgment, and a named person it reports to when it's uncertain. Skip that, and people don't reject the tool outright, they quietly under-use it and keep doing the real work themselves, just with extra steps now spent double-checking the AI. That's the shallow adoption you're seeing, and it has a name, botsitting, the unpaid, unbudgeted labor of feeding AI context and cleaning up after it.

The evidence for this is stark. One organization layered AI onto an existing workflow with no redesign and got a marginal productivity gain. A comparable deployment redesigned the rollout as onboarding, committing the majority of the budget to redesigning the human-AI interaction itself rather than the technology, and got roughly six times the gain.

My OPERATE™ framework treats this as a governance and trust design problem, not a technology problem. Before you troubleshoot the model, check whether the AI has an actual job description, a scope, and a named human it escalates to. If it doesn't, that's the fix, not a better model.`,
    theme: 'AI & Technology',
    date: '2026-07-17',
    tags: ['AI Adoption', 'OPERATE™', 'Botsitting'],
  },
  {
    id: 'journey-06',
    question: "My GCC has strong talent and competitive pay, but we can't get past execution work. Is this a talent problem?",
    answer: `Almost certainly not, and the data agrees with you. When researchers actually asked people why they leave GCCs, compensation didn't even crack the top two reasons. Limited career progression and lack of ownership over outcomes did. I've seen this play out directly, two centers with the same talent pool and country, one stuck at 25 to 30% attrition despite strong pay and brand, the other becoming a top-performing function within 24 months. The difference wasn't skill. It was whether the center could actually decide anything, or just execute what headquarters had already decided.

The tell is simple, can your GCC leader say no to a headquarters request that falls outside the center's charter, without risking their job. If the honest answer is no, you have a mandate problem, not a talent problem, and no amount of retention budget fixes that.

My ASCEND™ framework treats this as three sequential fixes: anchor a real mandate with documented decision rights before you hire, give local leadership actual authority rather than a global-sounding title, and build cognitive ownership deep enough that people stop quietly wondering if they're becoming replaceable. Compensation is rarely the lever. Authority is.`,
    theme: 'Transformation',
    date: '2026-07-17',
    tags: ['GCC Transformation', 'ASCEND™', 'Retention'],
  },
  {
    id: 'journey-07',
    question: 'Our AI system routes tasks across different models and users are getting inconsistent answers. Is this a training issue?',
    answer: `No, and this is a distinction worth getting right before you spend a training budget on it. If your system routes a routine task to one model and a complex one to another, you're not looking at a bug, you're looking at the system working exactly as designed. What people are experiencing is different tone, different reasoning depth, different failure modes, all from what looks like one tool. That's a legibility problem, not a competence problem. People don't need to be taught to click a different button, they need to understand why the system behaved differently and who's accountable for that behavior.

The fix isn't more user training, it's naming ownership. Ask directly, does anyone hold named, accountable responsibility for what your AI does when it routes a task to a model nobody explicitly chose. If the honest answer is no, that's the gap.

My OPERATE™ framework already treats this as three governance disciplines that have to exist before you scale multi-model AI: risk-tiered architecture with named human owners, explicit tracking of provider-side behavioral drift so nobody is blindsided by a black box, and cost and quality evaluation built into the system rather than assumed. This isn't new territory, it's the same discipline enterprises have always needed for any system making decisions at scale, AI just made the gap visible faster.`,
    theme: 'AI & Technology',
    date: '2026-07-17',
    tags: ['AI Governance', 'OPERATE™', 'Multi-Model AI'],
  },
]
