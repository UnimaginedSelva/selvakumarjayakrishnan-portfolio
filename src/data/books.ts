export interface BookChapter {
  number: number
  title: string
  summary: string
  keyIdea: string
  actionStep: string
}

export interface Book {
  id: string
  title: string
  author: string
  editedBy?: string
  category: string
  originalYear: number
  editionYear: number
  whyDistilled: string
  chapters: BookChapter[]
}

export const books: Book[] = [
  {
    id: 'new-psycho-cybernetics',
    title: 'The New Psycho-Cybernetics',
    author: 'Maxwell Maltz, M.D.',
    editedBy: 'Dan S. Kennedy',
    category: 'Self-Help & Psychology',
    originalYear: 1960,
    editionYear: 2001,
    whyDistilled:
      "Originally published in 1960 and read by over 30 million people, Psycho-Cybernetics is the foundation nearly every self-help book since has built on — self-image, visualization, mental rehearsal. It's also 330 pages of mid-century prose repeating the same core mechanism sixteen different ways. Each chapter here is distilled to its core idea and one thing to actually go do — a way to get the substance of a classic without the density of the original.",
    chapters: [
      {
        number: 1,
        title: 'The Self-Image: Your Key to Living Without Limits',
        summary:
          'Maltz opens with the claim the whole book builds on: everyone carries an unconscious "blueprint" of who they believe they are, shaped by childhood experience, past wins and failures, and how others reacted to us. That self-image — not willpower or talent — sets the ceiling on what we can achieve. Push past it and you get "snapped back," like a stretched rubber band.\n\nHe traces this to his own career pivot: as a plastic surgeon, some patients transformed completely after surgery, while others — most strikingly a woman with a classically beautiful new face — kept behaving exactly as before, because their appearance changed but their internal self-concept didn\'t. That gap is what led him to study the self-image directly, and to reframe the mind as a goal-seeking mechanism that faithfully pursues whatever image you feed it.',
        keyIdea:
          "You don't rise to your willpower — you rise, or fall, to your self-image. Change the internal blueprint first; the external results follow almost automatically.",
        actionStep:
          'Pick someone — living or historical — who embodies a trait or achievement you want to grow into. For one month, study how they think, not just what they did. Spend a few minutes a day mentally "consulting" them on a real problem you\'re facing.',
      },
      {
        number: 2,
        title: 'How to Awaken the Automatic Success Mechanism Within You',
        summary:
          'Maltz introduces the idea of the mind as a built-in "servo-mechanism" — a goal-seeking guidance system, much like a self-correcting torpedo or an electronic brain, that steers you toward whatever target you give it. Animals get fixed, instinctive goals; humans alone can choose their own targets through creative imagination, which is what makes the whole system usable on purpose rather than by accident. He walks through everyday proof: you already pick up a pencil, catch a fly ball, or recall a forgotten name without consciously computing the mechanics — an automatic mechanism handles it by trial, error, and correction, learning from successes and quietly forgetting failures.\n\nThe chapter\'s real point is that this same effortless process scales up. You don\'t need new capacities to pursue a big goal — you already own the machinery, proven every time you do something small well. Maltz also argues the mechanism can reach beyond conscious memory for answers, citing creative and scientific "aha" moments as evidence that a clearly defined problem, handed off and left alone, tends to return its own solution.',
        keyIdea:
          'You are not the machine — you are the operator of a goal-seeking machine, and its only job is to chase whatever target you clearly hand it.',
        actionStep:
          'Choose one clear, specific target you want your "success mechanism" to work on — a skill, a habit, or an outcome. Spend ten to fifteen minutes a day building an increasingly detailed mental picture of yourself already achieving it, adding more concrete sensory detail each session, for 21 days straight.',
      },
      {
        number: 3,
        title: 'Imagination — The Ignition Key to Your Automatic Success Mechanism',
        summary:
          'Maltz argues that we never act according to reality itself, only according to what we imagine to be true about ourselves and our surroundings — and that this is a neutral, mechanical fact of how the nervous system works, not something mystical. He shows the point through hypnosis: a subject told a room is freezing will visibly shiver and develop goose bumps, because the body reacts to the believed scenario exactly as it would to the real one. The same mechanism, left unmanaged, can run destructively — as with a man convinced his ordinary looks made him repulsive, or the tragic case of a student whose imagined inferiority became a self-fulfilling, ultimately fatal belief.\n\nBecause imagination drives the nervous system regardless of whether the picture is true, Maltz reasons it can just as easily be aimed at deliberately constructive pictures. He backs this with the era\'s sports-psychology evidence: golfers, basketball players, and dart throwers who only mentally rehearsed improved nearly as much as those who physically practiced. The chapter\'s throughline is that rehearsing a task vividly and repeatedly in the imagination — what he calls the "Theater of the Mind" — plants real, usable groundwork for actual performance.',
        keyIdea:
          "Your nervous system can't tell a vividly imagined experience from a real one — so a rehearsed success is already partway to becoming an actual one.",
        actionStep:
          'Pick one upcoming situation where you want to perform well — a conversation, a presentation, a game, an interview. Each day for the next two weeks, spend a few quiet minutes running it as a detailed mental movie: the setting, the other people, your own confident words and actions, ending exactly as you want it to. Replay it, don\'t just picture it once.',
      },
      {
        number: 4,
        title: 'How to De-Hypnotize Yourself from False Beliefs',
        summary:
          'Maltz extends the previous chapter\'s point about belief and hypnosis into a practical claim: most people are walking around under a kind of self-inflicted trance, having accepted some idea about themselves — "I\'m bad at math," "I\'m not the successful type" — from a parent, teacher, or painful past moment, and then behaving loyally to that idea ever since. He illustrates this with a boy wrongly convinced he was hopeless at arithmetic, a salesman who unconsciously capped his own earnings at a fixed number no matter his territory or commission rate, and a man whose belief in a voodoo curse aged him twenty years in weeks — reversed the moment the physical "curse" turned out to be nothing.\n\nMaltz frames this as ordinary hypnosis rather than something exotic: a suggestion becomes powerful once you\'re convinced it\'s true, regardless of its actual source or accuracy. He also tackles the inferiority complex directly, arguing it comes not from real deficits but from measuring yourself against the wrong yardstick — someone else\'s. Since no two people share the same standard, comparison itself is the flawed premise, and the fix is recognizing yourself as simply unique rather than inferior or superior.',
        keyIdea:
          "A belief doesn't need a hypnotist to control you — if you're convinced it's true, it already has the same grip as one.",
        actionStep:
          'Identify one long-held negative belief about yourself that traces back to a single remark, incident, or authority figure rather than to ongoing evidence. Write down exactly where it came from and ask whether it still holds up today. Then spend a week deliberately noticing and logging moments that contradict it.',
      },
      {
        number: 5,
        title: 'How to Succeed with the Power of Rational Thinking',
        summary:
          'Maltz pushes back on the assumption that changing yourself requires excavating childhood trauma, arguing instead that ordinary conscious reasoning is the actual control knob for the automatic mechanism. He illustrates with a friend who insisted for years he hated green beans, then discovered on tasting them that he simply liked them — proof that many self-limiting "facts" are just untested assumptions that collapse the moment you question them directly, no archaeology required. He also stresses letting old mistakes go once they\'ve served their purpose: like a football receiver with a short memory for dropped passes, dwelling on past failure only feeds it forward into future failure.\n\nThe chapter lays out rational thinking\'s actual jobs: sorting true incoming information from false, drawing sound conclusions, deciding what you want rather than obsessing over what you don\'t, and keeping attention on the present task so the automatic mechanism gets accurate real-time data. Maltz gives a simple four-question drill for testing any limiting belief — is there real evidence for it, could you be wrong, would you judge someone else the same way, and is there any good reason to keep acting as if it\'s true.',
        keyIdea:
          "Most limiting beliefs aren't proven facts, they're untested assumptions — question them directly and many collapse on the spot.",
        actionStep:
          'Pick one belief that\'s been quietly limiting you ("I can\'t do X" or "I\'m just not the type"). Run it through four questions: Is there a real reason to believe this? Could I be mistaken? Would I say this about someone else in my position? Why keep acting as if it\'s true if there\'s no good reason to? Write your answers down.',
      },
      {
        number: 6,
        title: 'How to Relax and Let Your Automatic Success Mechanism Work for You',
        summary:
          "Maltz's central claim here is that stress mostly comes from trying to consciously will and micromanage a process that was built to run automatically. He points to creative workers — Napoleon Hill scrambling for a book title, Bertrand Russell tackling difficult writing — who all describe the same pattern: think hard about a problem, gather the facts, then deliberately let go and let the answer surface on its own, often during sleep or an unrelated task. Straining harder through worry and willpower doesn't speed up the solution; it jams the machinery that would otherwise deliver it.\n\nFrom this he draws several practical habits: decide, then stop relitigating the decision, the way a gambler should worry before the wheel spins, not after; focus fully on the present task instead of multitasking, since the mind (like an hourglass) can only pass one grain at a time; and sleep on unresolved problems rather than forcing them late into the night. Underlying all of it is a shift in stance from micromanaging your own mind to trusting it the way a good executive trusts a capable team — assign the goal clearly, then step back.",
        keyIdea:
          "Struggling harder doesn't get you there faster — decide, hand the problem to your automatic mechanism, and stop hovering over it.",
        actionStep:
          'Next time you face a decision or a stuck problem, set a clear stopping point: gather the facts, make your choice or state the problem plainly to yourself, then deliberately stop revisiting it for the rest of the day. If it\'s unresolved, tell yourself you\'ll "sleep on it," and notice what surfaces the next morning.',
      },
      {
        number: 7,
        title: 'You Can Acquire the Habit of Happiness',
        summary:
          'Maltz treats happiness not as a philosophical ideal but as a medical fact: people who think pleasant thoughts literally see, hear, taste, and heal better than people who don\'t. He dismantles the common excuses for staying unhappy — that happiness must be earned, that wanting it is selfish, or that it has to wait for some future milestone like a promotion or a paid-off house. None of that holds up; happiness is a mental habit practiced in the present, not a reward collected later.\n\nThe real skill, he argues, is separating fact from opinion. Losing money is a fact; deciding you\'re "ruined" is an opinion you layered on top. Most unhappiness comes from reacting to circumstances as if they were personal insults rather than neutral events. He shows patients and executives regaining their footing simply by staying goal-oriented after setbacks instead of collapsing into self-pity, and offers small daily drills — like changing a habitual routine or consciously choosing to interpret people charitably — as ways to retrain the automatic emotional reflexes that keep people stuck in grumpiness.',
        keyIdea:
          "Happiness isn't a prize you earn or a place you arrive at — it's a habit of thought you practice today, regardless of circumstances.",
        actionStep:
          'Tomorrow morning, put on the opposite shoe first and tie your laces a different way than usual. Let that small break in routine remind you, throughout the day, to consciously choose a pleasant interpretation of events instead of an automatic irritated one — and to notice the difference it makes by evening.',
      },
      {
        number: 8,
        title: 'Ingredients of the "Success-Type" Personality and How to Acquire Them',
        summary:
          'Maltz builds an acronym out of the word SUCCESS to map the traits of a well-functioning personality: a clear Sense of direction, Understanding of yourself and others, Courage to act despite risk, Charity (genuine regard for other people), Esteem for your own worth, Self-confidence built from remembered wins, and Self-acceptance of who you actually are, flaws included. None of these are fixed gifts — each can be deliberately practiced, the same way a habit is built.\n\nThe throughline is that people don\'t get stuck because they lack talent, but because they misread reality: they treat opinions as facts, punish themselves for ordinary mistakes, or measure themselves against an impossible ideal self. He introduces the idea of an "Adversity Quotient" — how well someone bounces back from setbacks without blaming themselves or others — as a trainable measure of resilience, and closes with a parable about a traveler who doesn\'t realize how many needless burdens (a boulder, a knapsack of bricks, tangled vines) he\'s been dragging until someone points them out; awareness alone lets him set them down.',
        keyIdea:
          "Success isn't a talent you're born with — it's a personality you assemble deliberately, one trainable trait at a time.",
        actionStep:
          'Write down the emotional "bricks" you\'re carrying — old grudges, guilt, or self-doubts — one per index card. Put them in a bag in your car. Each morning, heft the bag and say, "Today I\'m leaving my bricks behind," then go about your day without them, picking the bag back up only once you\'re home.',
      },
      {
        number: 9,
        title: 'How to Avoid Accidentally Activating Your Automatic Failure Mechanism',
        summary:
          'Just as a boiler needs a pressure gauge, Maltz argues the mind has warning signs when its "failure mechanism" is taking over instead of its success-oriented one. He spells these out with another acronym, FAILURE: frustration, misdirected aggressiveness, insecurity, loneliness, uncertainty, resentment, and emptiness. None of these traits are chosen maliciously — each was originally adopted, however clumsily, as a flawed attempt to solve some earlier problem, which is why understanding them (not just willing them away) is what actually dissolves them.\n\nHe walks through each symptom with case examples: the executive who can\'t enjoy a promotion because insecurity has him defending a position rather than pursuing a goal, the person who nurses resentment as if reliving the past could somehow undo it, the achiever who reaches a goal and still feels empty because success was chased for the wrong reasons. His core prescription is to treat these feelings like a car\'s dashboard warning lights — worth a glance, not a place to stare — and to correct course immediately rather than spiraling into self-blame.',
        keyIdea:
          "Frustration, resentment, and insecurity aren't character flaws — they're dashboard warning lights. Glance at them, correct course, then look back at the road.",
        actionStep:
          'Each evening, spend a few quiet minutes reviewing the day. Note any moments your "failure mechanism" flared — a flash of resentment, an insecure overreaction — without dwelling on them. Then deliberately recall one moment you handled well, and end by recommitting to tomorrow\'s goal.',
      },
      {
        number: 10,
        title: 'How to Remove Emotional Scars and Give Yourself an Emotional Facelift',
        summary:
          'Maltz draws a direct parallel between physical scar tissue, which the body forms to protect a wound but which can leave a person disfigured, and emotional scar tissue, which the psyche forms after being hurt but which can wall a person off from life entirely. A single bad experience — public humiliation, a betrayal, an old rejection — can generalize into a permanent defensive posture that misfires in totally unrelated situations, the same way a cat burned once on a stove avoids the whole kitchen forever.\n\nHis prescription is a kind of do-it-yourself emotional surgery: build a thicker emotional skin so small slights stop landing as major wounds, stop taking neutral events personally, and above all practice genuine forgiveness — not the martyred, self-righteous kind that keeps score, but the kind that fully cancels the debt and lets the grievance go. He\'s equally insistent about forgiving yourself, arguing that guilt over old mistakes is just as disfiguring as resentment toward others, and that mistakes describe an action you took, never a permanent verdict on who you are.',
        keyIdea:
          'An old hurt held onto becomes scar tissue that protects nothing and blocks everything — real forgiveness is the only scalpel that removes it cleanly.',
        actionStep:
          'Pick one person you\'ve resented for some past slight, and one mistake of your own you still feel guilty about. Spend thirty minutes in quiet reflection working through each — picturing the debt as fully cancelled, with no score being kept — and then take one small real-world action toward that person, or toward yourself, that reflects the forgiveness.',
      },
      {
        number: 11,
        title: 'How to Unlock Your Real Personality',
        summary:
          'Maltz frames personality not as something to build from scratch but as something already present and waiting to be released — babies display full, unfiltered personality because they haven\'t yet learned to inhibit themselves. What blocks adults is excessive negative feedback: a healthy amount of self-correction keeps you on course, but an oversensitive inner critic doesn\'t just correct your direction, it stops you from moving at all, the way an over-monitored stutterer freezes up trying too hard not to make an error.\n\nHe illustrates this with the paradox of "purpose tremor" — a steady hand that shakes only when you try too carefully to thread a needle — and argues most social anxiety is really "others\' consciousness," an oversized concern for what people are silently judging, when in truth most people are far too absorbed in themselves to be scrutinizing you at all. His fix is deliberate disinhibition: act first and correct as you go, stop rehearsing every sentence in advance, speak a little louder and more freely than feels natural, and let people know when you like them, treating self-expression as a course to be corrected in motion rather than a performance to be perfected in advance.',
        keyIdea:
          "Your real personality isn't missing — it's locked up by an oversensitive inner critic. Loosen the lock, and it walks out on its own.",
        actionStep:
          "For one day, deliberately practice disinhibition: speak a little before you've fully rehearsed the sentence, say what you think without pre-editing it, and compliment at least three people directly and specifically. Notice how much of your usual hesitation was really just fear of a judgment nobody was actually making.",
      },
      {
        number: 12,
        title: 'Do-It-Yourself Tranquilizers That Bring Peace of Mind',
        summary:
          "Maltz argues that disturbance isn't caused by the outside world but by our own habitual overresponse to it — like Pavlov's dog salivating at a bell long after the bell stopped meaning food. A ringing phone, a rude driver, a crowded room: none of these have any power to upset you except the power you've conditioned yourself to hand over. Relaxed muscles and anxious feelings cannot coexist, so choosing not to respond — or even just delaying the response by a few seconds — quietly breaks the old reflex.\n\nHe then offers concrete tools for that choice: build a vivid \"quiet room\" in your imagination to retreat to for a few minutes whenever pressure builds; develop a short \"clear the calculator\" ritual (a mental eraser, a snap of the fingers) to wipe out leftover tension before switching tasks, the way surgeons or performers do before going on; and stop reacting emotionally to purely imagined worst-case scenarios — straw men that exist only in your head. The chapter's throughline is that you're meant to be an actor initiating your own course, not a reactor pulled along by every passing stimulus.",
        keyIdea:
          'You are not required to answer every bell that rings. Peace of mind comes from choosing your response, not from controlling the world around you.',
        actionStep:
          'Pick one recurring "bell" in your life — a notification, a certain person\'s tone, a traffic jam — that reliably triggers tension. For one week, when it goes off, pause for ten seconds before reacting at all. Notice that the disturbance was in your response, not the trigger itself.',
      },
      {
        number: 13,
        title: 'How to Turn a Crisis into a Creative Opportunity',
        summary:
          'Some people rise under pressure while equally talented people fall apart — the difference, Maltz says, has nothing to do with raw ability and everything to do with how they\'ve trained themselves to interpret and rehearse for high-stakes moments. Overmotivated, do-or-die practice actually narrows the brain\'s "map" of a skill, so the first real crisis exposes a rigid, single-track response that shatters under pressure. The fix is what he calls shadow-boxing: rehearsing the skill repeatedly under zero pressure — in a mirror, against an imaginary opponent, with the bat on your shoulder — so a broad, flexible, calm pattern gets grooved in before it\'s ever tested for real.\n\nThe second half reframes the emotional side of crisis. The jittery, keyed-up feeling before a big moment isn\'t fear — it\'s undirected excitement, and whether it becomes stage fright or a performance edge depends entirely on whether you\'re pointed toward your goal or away from it. He also urges scaling crises down to their true size: ask what would actually happen if this went badly, remember that life is long, and trust that there\'s almost always a "second act" waiting on the other side of any single failure.',
        keyIdea:
          'Crisis doesn\'t create character, it reveals preparation — practice calmly and without pressure, and the pressure itself becomes fuel instead of a threat.',
        actionStep:
          'Before your next high-stakes moment — a presentation, a hard conversation, a big pitch — rehearse it several times in low-stakes conditions first: out loud alone, in front of a mirror, or with a friend role-playing the toughest objections. Let the rehearsal be relaxed and error-tolerant, not a dress-rehearsal-perfect performance.',
      },
      {
        number: 14,
        title: 'How to Get and Keep "That Winning Feeling"',
        summary:
          'Just as vividly imagined failure produces the same physical dread as an actual failure, Maltz argues you can deliberately manufacture the feeling of already having succeeded, and that feeling itself is the signal your inner "success mechanism" is correctly aimed. He calls it the winning feeling — the calm, almost effortless certainty that athletes describe as being "in the zone" — and shows through golfers, pitchers, and salespeople that it isn\'t caused by extra skill in the moment, but by a mental rehearsal so detailed and repeated that the nervous system treats it as memory rather than fantasy.\n\nBecause your brain stores successful actions the way a recording stores a track, you can deliberately "play back" a past success — recalling its sounds, sights, and feelings in detail — and borrow its confidence for a new challenge. Small, engineered wins (easy sales calls first, simple plays for a nervous rookie) build this habit of success over time, but you can also shortcut the process by treating hope the way worry works: rehearsing a desired outcome over and over, in growing detail, until it starts to feel just as real as the thing you\'re afraid of.',
        keyIdea:
          "Confidence isn't the cause of success, it's the readout of it — deliberately rehearse the feeling of having already won, and your actions start to catch up.",
        actionStep:
          'Recall in vivid sensory detail one specific moment you succeeded at something — the sounds, the room, how your body felt. Spend two minutes reliving it fully, then immediately carry that same feeling into a mental rehearsal of the task you\'re currently nervous about, picturing it going just as well.',
      },
      {
        number: 15,
        title: 'More Years of Life and More Life in Your Years',
        summary:
          'Writing near the end of his own life, Maltz proposes that aging is driven less by the calendar than by what researcher Hans Selye called "adaptation energy" — a finite, renewable reserve the body draws on to cope with every kind of stress, physical or emotional. Frustration and a defeated self-image burn through this reserve and worsen healing and recovery, while purpose, optimism, and something worth getting well for visibly speed it up — a pattern he\'d seen firsthand in which patients\' surgical recovery times tracked their outlook far more reliably than their charts.\n\nHe extends this into a broader claim: expecting to decline at a certain age is itself a goal the self-image will dutifully pursue, while creative, engaged people — his examples range from aging artists to a burned-out speaker who reinvented his career around a golf-course bucket list — consistently outlive and outperform their own expectations. Retirement from meaningful goals, not from a job, is what actually ages people. Maltz closes with his own broader, admittedly unprovable beliefs: that life is fundamentally goal-seeking at every scale, and that science, faith, and psychology are simply different channels for the same underlying life force, none of which should be refused out of pride or prejudice.',
        keyIdea:
          "You don't age primarily by the calendar — you age by running out of things worth adapting for, so keep manufacturing a genuine need for more life.",
        actionStep:
          'Identify one goal or project that would give you a reason to look forward to next year the way you looked forward to something in your twenties. Write down the first concrete step and take it this week, rather than waiting until conditions feel ideal.',
      },
      {
        number: 16,
        title: 'True Stories of Lives Changed Using Psycho-Cybernetics',
        summary:
          'This closing chapter trades argument for evidence: five real accounts of people who each carried a damaging, deeply believed "truth" about themselves — a stockbroker written off as unintelligent because of a speech-impairing cleft palate, a college student convinced he lacked the intelligence to graduate, a lawyer\'s assistant shaped by an alcoholic household, a last-place college rodeo team resigned to losing, and a woman with muscular dystrophy told by every doctor that she should not be able to walk. In each case, encountering Psycho-Cybernetics didn\'t hand them a shortcut so much as a workable method for testing whether their self-limiting beliefs were actually true.\n\nWhat all five stories share is that the turnaround came from small, deliberate, repeated acts — sticky notes, mental rehearsal, a changed daily routine, a decision to act contrary to the old belief just long enough for it to lose its grip — rather than from a sudden insight or a change in circumstances. None of their starting points were advantageous, and in some cases the physical or medical facts of the situation never changed at all; what changed was which "truth" about themselves they were willing to keep obeying.',
        keyIdea:
          'In every one of these lives, the limiting belief broke first, and the changed circumstances followed as a consequence, never the other way around.',
        actionStep:
          'Of these five stories, which one most resembles your own situation right now, and what specifically did that person do differently from what you\'re currently doing?',
      },
    ],
  },
]

export function getBook(bookId: string): Book | undefined {
  return books.find(b => b.id === bookId)
}
