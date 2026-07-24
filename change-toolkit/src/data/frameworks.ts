export interface Stage {
  letter: string
  name: string
  principle: string
  failureMode: string
  howToApply: string[]
  successIndicators: string[]
}

export interface Framework {
  id: string
  fullName: string
  tagline: string
  layer: string
  kind: string
  region?: string | null
  stages: Stage[]
}

export const frameworks: Framework[] = [
  {
    "id": "TRANSFORM",
    "fullName": "A 9-Stage Practitioner's Playbook for Digital & AI Transformation",
    "tagline": "The technology changes. The human loop never does.",
    "layer": "Digital & AI Program Execution Layer",
    "kind": "digital-ai",
    "region": null,
    "stages": [
      {
        "letter": "T",
        "name": "Terrain Assessment",
        "principle": "Know the human landscape before the technology.",
        "failureMode": "The Technology Trap",
        "howToApply": [
          "Conduct a Change Impact Assessment segmented by role, geography, and impact depth",
          "Map the stakeholder landscape: sponsors, influencers, resistors, neutrals — including informal power networks",
          "Assess organizational change saturation — what else is competing for user attention",
          "Document current-state processes and identify which legacy behaviors carry emotional attachment",
          "For AI transformation: conduct a Shadow Data Audit before a single model is trained",
          "Identify cultural and political dynamics that could accelerate or block adoption"
        ],
        "successIndicators": [
          "Change Impact Assessment completed by role, geography, and impact depth",
          "Stakeholder map validated — sponsors, influencers, and resistors identified",
          "Readiness baseline score established",
          "Organizational change saturation documented",
          "Shadow Data Audit completed for AI initiatives"
        ]
      },
      {
        "letter": "R",
        "name": "Readiness Architecture",
        "principle": "Governance without readiness is just bureaucracy.",
        "failureMode": "Governance Breakdown & Escalation Black Holes",
        "howToApply": [
          "Design the governance model: executive steering, operational leads, workstream RACI — before the program begins",
          "Build the KT plan: documentation to shadow to reverse shadow to sign-off with hard exit criteria",
          "Define entry/exit criteria and acceptance gates for each transformation phase",
          "Establish the communication plan: audience segmentation, cadence, channel, language",
          "Design the Change Champion Network of peer-level influencers",
          "For AI: establish production readiness criteria — data quality thresholds, bias limits, kill criteria"
        ],
        "successIndicators": [
          "Governance model active with clear RACI across all workstreams",
          "KT plan approved with Shadow and Reverse Shadow phases defined",
          "Communication plan live",
          "Change Champion Network established",
          "Production readiness criteria defined for AI deployments"
        ]
      },
      {
        "letter": "A",
        "name": "Adoption Design",
        "principle": "Adoption is engineered, not hoped for.",
        "failureMode": "\"Deployment Equals Adoption\" Fallacy",
        "howToApply": [
          "Apply the ADKAR diagnostic to each user segment before designing enablement",
          "Apply the Friction Test — the system must integrate into platforms users already work in",
          "Map the WIIFM (What's In It For Me) for every user role",
          "Design role-specific enablement tracks, not one generic training program",
          "Build the go-live readiness scorecard with hard go/no-go adoption thresholds",
          "Establish 30/60/90-day pulse feedback loops"
        ],
        "successIndicators": [
          "ADKAR baseline completed per user segment",
          "Friction Test passed",
          "WIIFM mapped per user role",
          "Role-specific enablement tracks designed",
          "Go-live readiness scorecard defined with hard adoption thresholds",
          "Feedback loop mechanism built"
        ]
      },
      {
        "letter": "N",
        "name": "Navigate Resistance",
        "principle": "Resistance is information, not obstruction.",
        "failureMode": "The Frozen Middle",
        "howToApply": [
          "Identify resistance patterns: Awareness-based, Desire-based, or Ability-based",
          "Engage resistors individually, not in group settings",
          "Co-design solutions with resistors where possible",
          "Address middle manager resistance specifically",
          "Document resistance patterns and responses in the governance log",
          "For AI: address job security concerns directly, not with vague reassurance"
        ],
        "successIndicators": [
          "Resistance map completed by segment",
          "Resolution rate of identified blockers tracked",
          "Middle manager alignment score established",
          "Job security concerns addressed directly for AI programs"
        ]
      },
      {
        "letter": "S",
        "name": "Sustain & Scale",
        "principle": "Go-live is the beginning, not the end.",
        "failureMode": "Pilot Purgatory",
        "howToApply": [
          "Run a structured hypercare period: minimum 30 days post go-live",
          "Track MTTR weekly — it should trend consistently downward",
          "Implement reinforcement mechanisms: recognition, manager nudges, usage dashboards",
          "Scale adoption to lagging user segments using the champion network",
          "Establish the Run-state operating model: SLAs, support tiers, escalation paths",
          "For AI: bridge the MLOps Maturity Gap with continuous monitoring for algorithmic drift"
        ],
        "successIndicators": [
          "MTTR trending downward week-over-week",
          "Adoption rate tracked at 30/60/90 days",
          "Hypercare exit criteria formally met",
          "Run-state SLAs active",
          "MLOps monitoring framework live"
        ]
      },
      {
        "letter": "F",
        "name": "Fuel with AI",
        "principle": "AI amplifies transformation — it never replaces the human loop.",
        "failureMode": "Algorithmic Hallucination & Liability",
        "howToApply": [
          "Run shadow-mode pilots: let AI operate alongside current processes before full deployment",
          "Build explainability into the user experience",
          "Design exception management frameworks with clear human escalation paths",
          "Create AI literacy programs",
          "Establish AI governance: performance monitoring, bias detection, continuous improvement",
          "For agentic AI: define human-in-the-loop approval gates for high-impact actions"
        ],
        "successIndicators": [
          "Shadow-mode pilot completed",
          "Explainability layer validated by users",
          "Exception management framework active",
          "AI governance cadence established",
          "AI Trust Score baseline established",
          "Override rate trending toward target range"
        ]
      },
      {
        "letter": "O",
        "name": "Outcomes Governance",
        "principle": "Measure what matters, govern what moves.",
        "failureMode": "Green-Watermelon Reporting",
        "howToApply": [
          "Define the Outcomes Framework at program initiation: leading and lagging KPIs in financial language",
          "Build an adoption dashboard connected to the financial ERP, not the project tracker",
          "Establish an executive value realization review in business outcome language",
          "Create escalation thresholds with a defined intervention",
          "For AI: track spend efficiency metrics and validate baselines with finance",
          "Account for the full AI cost stack — data prep, shadow AI spend, hallucination remediation"
        ],
        "successIndicators": [
          "Outcomes dashboard live — connected to financial systems",
          "Executive review cadence established",
          "Value realization trajectory on track",
          "Escalation thresholds defined and tested"
        ]
      },
      {
        "letter": "R",
        "name": "Reinforce & Realize",
        "principle": "Value realization is a discipline, not an accident.",
        "failureMode": "Organizational Backsliding & Knowledge Erosion",
        "howToApply": [
          "Build a reinforcement calendar: touchpoints at 30/60/90/180 days post go-live",
          "Activate manager reinforcement with specific conversations and usage dashboards",
          "Recognize and celebrate adoption leaders",
          "Conduct formal benefit realization reviews against the business case",
          "Document and publish transformation wins",
          "For AI: monitor depth of adoption, not just breadth"
        ],
        "successIndicators": [
          "Reinforcement calendar active",
          "Manager enablement complete",
          "Benefit realization review conducted",
          "Wins documented and communicated",
          "AI usage depth metrics tracked beyond login rates"
        ]
      },
      {
        "letter": "M",
        "name": "Mature Continuously",
        "principle": "Transformation ends only when the organization stops growing.",
        "failureMode": "The Episodic Modernization Trap",
        "howToApply": [
          "Conduct a post-transformation retrospective — capture lessons before the team disbands",
          "Build internal change capability so the org can absorb the next generation of change",
          "Update the change playbook with lessons learned",
          "Identify the next transformation and begin Terrain Assessment before hypercare ends",
          "For AI: implement Continuous Rationalization — agents continuously updated and monitored"
        ],
        "successIndicators": [
          "Post-transformation retrospective completed",
          "Internal change capability built",
          "Next horizon identified",
          "Continuous AI model monitoring and retraining cadence established"
        ]
      }
    ]
  },
  {
    "id": "OPERATE",
    "fullName": "A 7-Stage Practitioner's Playbook for AI Operationalization",
    "tagline": "Most AI projects don't fail in the lab. They fail in the last mile.",
    "layer": "AI Operationalization Layer",
    "kind": "ai-production",
    "region": null,
    "stages": [
      {
        "letter": "O",
        "name": "Outcomes Before Algorithms",
        "principle": "If you cannot define the business outcome in financial terms before selecting the AI, you are not ready to deploy AI.",
        "failureMode": "Science Project Syndrome",
        "howToApply": [
          "Define the target business outcome in financial terms before any technology evaluation",
          "Apply the \"Cost of Doing Nothing\" test",
          "Apply the Rule-Based Filter — if simple automation gets 80% of the result, don't deploy AI",
          "Assign a Business Outcome Owner at the start",
          "For agentic AI: define outcomes against fully-loaded Total Cost of Ownership",
          "Document success metrics at initiation: 90-day, 6-month, 12-month checkpoints"
        ],
        "successIndicators": [
          "Business outcome defined in financial terms",
          "Business Outcome Owner named",
          "Rule-Based Filter applied and documented",
          "Success metrics defined and baselined",
          "Total Cost of Ownership modeled for agentic deployments"
        ]
      },
      {
        "letter": "P",
        "name": "Pipeline & Data Readiness",
        "principle": "We do not build AI to clean up bad data. We build AI on top of pristine, governed, single-source-of-truth pipelines.",
        "failureMode": "Data Foundation Disconnect",
        "howToApply": [
          "Conduct a Shadow Data Audit of all localized, unsanctioned data silos",
          "Establish Data Quality SLAs as hard entry criteria",
          "Apply the Data ROI Test — kill the project if remediation costs exceed projected return",
          "Unify data sources into a governed warehouse with automated lineage tracking",
          "For agentic AI: address the \"polling tax\" with streaming architectures",
          "Implement data lineage tracking for auditability"
        ],
        "successIndicators": [
          "Shadow Data Audit completed",
          "Data Quality SLAs defined and baselined",
          "Data ROI Test applied",
          "Governed data pipeline confirmed",
          "Data lineage tracking active",
          "Streaming architecture assessed for agentic deployments"
        ]
      },
      {
        "letter": "E",
        "name": "Ecosystem Co-Creation",
        "principle": "AI cannot be built in an IT vacuum. Business and technology must be locked together from conception to deployment.",
        "failureMode": "Siloed Engineering",
        "howToApply": [
          "Enforce the Dual-Sponsorship Mandate: named Technical Lead and Business Lead with equal authority",
          "Apply Workflow First, Algorithm Second",
          "Build cross-functional working groups at the workstream level",
          "Establish a shared definition of success before deployment",
          "Run joint design sprints before development begins",
          "For agentic AI: define semantic interoperability standards across business units"
        ],
        "successIndicators": [
          "Dual-Sponsorship Mandate confirmed",
          "Workflow mapping completed before training",
          "Joint KPI definition documented and signed off",
          "End users involved in design sprints",
          "Semantic interoperability standards defined for agentic deployments"
        ]
      },
      {
        "letter": "R",
        "name": "Responsible AI Governance",
        "principle": "Ethics, privacy, and accountability are not compliance requirements. They are the foundation of sustainable AI adoption.",
        "failureMode": "Governance & Ethics Vacuum",
        "howToApply": [
          "Define the AI Accountability Framework — a named human owner for every AI decision",
          "Embed data privacy controls by design before the model is trained",
          "Implement bias detection protocols as a hard go/no-go criterion",
          "Build explainability into the user experience",
          "For agentic AI: establish identity access management and deterministic kill-switches",
          "Establish a risk-tiered governance architecture, not one uniform policy"
        ],
        "successIndicators": [
          "AI Accountability Framework documented",
          "Data privacy controls configured before training",
          "Bias testing completed and documented",
          "Explainability layer built and validated",
          "Human override protocol defined and tested",
          "Risk-tiered governance architecture live",
          "EU AI Act obligations mapped"
        ]
      },
      {
        "letter": "A",
        "name": "Adoption Architecture",
        "principle": "Adoption is engineered from Day Zero — not launched on Day One.",
        "failureMode": "The Last-Mile Adoption Gap — The Enablement Illusion",
        "howToApply": [
          "Apply the ADKAR diagnostic to each user segment before designing enablement",
          "Apply the Friction Test — redesign integration before launch if it fails",
          "Map the WIIFM for every user role explicitly",
          "Design role-specific enablement tracks",
          "Build the go-live readiness scorecard with hard adoption thresholds",
          "Establish the \"legibility layer\" — clear AI authority, override paths, accountability"
        ],
        "successIndicators": [
          "ADKAR baseline completed per user segment",
          "Friction Test passed",
          "WIIFM mapped per user role",
          "Role-specific enablement tracks designed",
          "Go-live readiness scorecard defined",
          "Legibility layer built"
        ]
      },
      {
        "letter": "T",
        "name": "Trust Engineering",
        "principle": "User trust in AI is built through evidence, not communication. Show it working before asking people to depend on it.",
        "failureMode": "Black Box Liability",
        "howToApply": [
          "Run shadow-mode pilots — let users observe AI outputs without acting on them",
          "Build explainability into every AI recommendation",
          "Design the exception management framework with clear escalation paths",
          "Address job security concerns directly and specifically",
          "Track the AI Trust Score by user segment at 30/60/90 days",
          "Negotiate behavioral SLAs with LLM vendors — version pinning rights"
        ],
        "successIndicators": [
          "Shadow-mode pilot completed",
          "Explainability layer validated by users in each segment",
          "Exception management framework active",
          "AI Trust Score baseline established",
          "Override rate trending toward target range",
          "Behavioral SLAs negotiated with LLM vendors"
        ]
      },
      {
        "letter": "E",
        "name": "Embed, Scale & Evolve",
        "principle": "Go-live is not the finish line. It is the start of the most important phase: sustaining AI value through continuous evolution.",
        "failureMode": "Value Erosion & Model Drift",
        "howToApply": [
          "Run a structured hypercare period: minimum 30 days post go-live",
          "Track MTTR weekly, watching for a flat or rising trend as an early warning",
          "Conduct formal benefit realization reviews at 90 days, 6 months, 12 months",
          "Monitor for model drift continuously with automated retraining triggers",
          "Implement token-level cost tracking for LLM deployments",
          "Build internal AI capability so the org doesn't start from zero every 18 months"
        ],
        "successIndicators": [
          "Hypercare exit criteria met",
          "Benefit realization review completed at 90 days",
          "Model drift monitoring active",
          "Token-level cost tracking live",
          "Champion network sustaining adoption",
          "Internal AI capability development underway"
        ]
      }
    ]
  },
  {
    "id": "ASCEND",
    "fullName": "A 6-Stage Practitioner's Playbook for GCC Transformation",
    "tagline": "The technology changes. The human architecture never does.",
    "layer": "GCC Transformation Strategy Layer",
    "kind": "gcc",
    "region": null,
    "stages": [
      {
        "letter": "A",
        "name": "Anchor the Mandate",
        "principle": "A GCC without a clear strategic mandate becomes a cost center by default.",
        "failureMode": "Mandate failure — the GCC becomes whatever is easiest to measure",
        "howToApply": [
          "Define the GCC's strategic role explicitly: cost efficiency, capability building, or innovation hub",
          "Translate the mandate into business outcome KPIs, not headcount targets",
          "Establish the operating model choice upfront: Extended Office, Hybrid GCC, or Autonomous Hub",
          "Align the parent organization's leadership on what decision rights transfer, and when",
          "Document a GCC Charter — the anchor document every subsequent stage refers back to",
          "For Innovation Hub mandates, define P&L accountability and product ownership from Day 1"
        ],
        "successIndicators": [
          "GCC Charter approved by executive sponsor",
          "Operating model selected",
          "Business outcome KPIs defined",
          "Decision rights transfer plan documented"
        ]
      },
      {
        "letter": "S",
        "name": "Sequence the Transition",
        "principle": "Transition is not a project. It is a governed program with hard entry and exit criteria.",
        "failureMode": "Fracturing 3-9 months post-launch when hiring velocity outpaces operational maturity",
        "howToApply": [
          "Build a phased transition roadmap: Foundation, Consolidation, Optimization, Innovation",
          "Map each phase to hard entry and exit criteria — measurable readiness, not activity completion",
          "Establish a RACI matrix across talent, technology, compliance, KT, and governance",
          "Define parallel-running periods explicitly and budget for the productivity dip",
          "Build a transition risk register",
          "Establish a governance cadence: weekly operational, monthly executive, quarterly value"
        ],
        "successIndicators": [
          "Transition roadmap approved",
          "RACI active across all workstreams",
          "Entry/exit criteria defined per phase",
          "Parallel-running budget modeled",
          "Risk register live",
          "Governance cadence established"
        ]
      },
      {
        "letter": "C",
        "name": "Cultivate Cognitive Ownership",
        "principle": "Knowledge transfer ends when delivery behavior matches the baseline — not when training ends.",
        "failureMode": "The Activity-Based Illusion of KT",
        "howToApply": [
          "Define KT completion by delivery behavior — cycle times, quality, decision independence",
          "Calibrate KT timelines to product maturity (Innovating / Maturing / Retiring)",
          "Run structured Shadow and Reverse Shadow phases with formal sign-off",
          "Build a Cognitive Ownership Assessment across five dimensions",
          "Establish hard KT exit criteria: zero Sev 1/2 defects, onshore sign-off, completed Run Book"
        ],
        "successIndicators": [
          "KT completion defined by delivery behavior",
          "Shadow / Reverse Shadow phases completed",
          "Onshore baseline validated",
          "Cognitive Ownership Assessment established",
          "KT exit criteria met"
        ]
      },
      {
        "letter": "E",
        "name": "Empower Local Leadership",
        "principle": "Innovation cannot be approved from headquarters. Decision rights must move with accountability.",
        "failureMode": "Weak transition leadership — the single highest predictor of GCC failure",
        "howToApply": [
          "Audit the current decision rights map — which categories can transfer locally",
          "Transition innovation budgets to pod-level ownership in mature GCCs",
          "Commit senior onshore leadership full-time for 12-18 months",
          "Build dual reporting structures to global executive leadership",
          "Establish a Leadership Development Track with explicit career pathways",
          "Define 'autonomy milestones' — governance gates where decision rights transfer, earned not assumed"
        ],
        "successIndicators": [
          "Decision rights audit completed",
          "Innovation budget transfer milestones defined",
          "Senior onshore leadership committed",
          "Dual reporting structures active",
          "Leadership pathway program in place"
        ]
      },
      {
        "letter": "N",
        "name": "Navigate Cultural Intelligence",
        "principle": "Culture cannot be lifted and shifted. It must be cultivated through experience, not policy.",
        "failureMode": "\"Standardized autonomy\" — theoretically empowering, practically disorienting",
        "howToApply": [
          "Conduct a Cultural Intelligence baseline across both GCC and HQ teams",
          "Design cross-cultural immersion experiences, not awareness workshops",
          "Build 'structured autonomy' frameworks with progressively expanding local discretion",
          "Train HQ leaders specifically on collectivist operating dynamics",
          "Establish a Cultural Integration KPI beyond engagement scores",
          "Create formal 'Confident Humility' programs for GCC leaders"
        ],
        "successIndicators": [
          "Cultural intelligence baseline established",
          "Cross-cultural immersion program designed",
          "Structured autonomy framework active",
          "Cultural integration KPI tracking live"
        ]
      },
      {
        "letter": "D",
        "name": "Drive AI-Native Operations",
        "principle": "AI amplifies the GCC's value — but only after the human architecture is in place to govern it.",
        "failureMode": "Automating dysfunction instead of accelerating transformation",
        "howToApply": [
          "Assess AI readiness across data, governance, talent, process, and trust dimensions",
          "Run shadow-mode AI pilots before full deployment",
          "Build an AI governance architecture from Day 1",
          "Establish an AI Literacy Program",
          "Design exception management frameworks",
          "Build Agentic AI governance as a distinct layer above GenAI governance"
        ],
        "successIndicators": [
          "AI readiness assessment completed",
          "Shadow-mode pilot designed",
          "AI governance architecture live",
          "AI Literacy Program deployed",
          "Exception management framework active",
          "Behavioral adoption metrics tracking"
        ]
      }
    ]
  },
  {
    "id": "EMBED",
    "fullName": "A 5-Stage Practitioner's Playbook for ERP Change Management",
    "tagline": "You cannot install adoption. You have to earn it.",
    "layer": "ERP Change Management Execution Layer",
    "kind": "erp",
    "region": null,
    "stages": [
      {
        "letter": "E",
        "name": "Establish the Human Business Case",
        "principle": "The ERP budget is 92% technology and 8% people. That ratio is upside down.",
        "failureMode": "The 92/8 Investment Paradox",
        "howToApply": [
          "Quantify the People-Side Benefit Coefficient at project initiation",
          "Build a dedicated change management budget of 15-20% of total project cost",
          "Define outcome KPIs at Day 1 that measure human performance",
          "Establish executive sponsorship with defined time commitments",
          "Present the ROI of change management explicitly (3:1 to 7:1)",
          "Document the cost of failure — 189% average budget overrun"
        ],
        "successIndicators": [
          "CM budget approved as protected line item",
          "People-Side Benefit Coefficient calculated",
          "Outcome KPIs defined",
          "Executive sponsor time commitment documented"
        ]
      },
      {
        "letter": "M",
        "name": "Map the Change Terrain",
        "principle": "You cannot govern what you have not diagnosed. Change impact precedes configuration.",
        "failureMode": "The Fit-to-Standard workshop treated as technical, not human",
        "howToApply": [
          "Conduct a Change Impact Assessment before Fit-to-Standard workshops begin",
          "Map the stakeholder landscape across sponsors, leads, managers, resistors",
          "Assess organizational change saturation",
          "Embed change management resources directly into Fit-to-Standard workshops",
          "Differentiate Greenfield vs Brownfield change impact explicitly",
          "Conduct a Shadow IT Audit as a core component of terrain mapping"
        ],
        "successIndicators": [
          "Change Impact Assessment completed by role and geography",
          "Stakeholder map validated",
          "Fit-to-Standard workshops include embedded change management",
          "Change Risk Register active"
        ]
      },
      {
        "letter": "B",
        "name": "Build Readiness Into Every Sprint",
        "principle": "Change management embedded in technical milestones is adoption — change management bolted on after is a brochure.",
        "failureMode": "OCM features routinely relegated to 'future phases' that rarely materialize",
        "howToApply": [
          "Redesign Fit-to-Standard workshops with embedded ADKAR-diagnostic facilitation",
          "Build role-specific enablement tracks from the Change Impact Assessment",
          "Establish human readiness entry/exit criteria for every sprint",
          "Redesign UAT as an adoption event, not a perfunctory sign-off",
          "Build a Change Champion Network embedded within each business unit",
          "Govern Security Role Mapping as a change management event, not just an IT exercise"
        ],
        "successIndicators": [
          "ADKAR baseline by segment established",
          "Fit-to-Standard workshops include change facilitation",
          "Role-specific enablement tracks designed",
          "UAT redesigned as adoption event",
          "Champion Network active"
        ]
      },
      {
        "letter": "E",
        "name": "Execute Go-Live as a Human Event",
        "principle": "Go-live is not a technical milestone. It is the moment human adoption either begins or collapses.",
        "failureMode": "\"The Go-Live That Lies\" — green dashboard, silent shadow IT",
        "howToApply": [
          "Build a Go-Live Readiness Scorecard with dual technical AND human readiness thresholds",
          "Define rollback authority explicitly with pre-defined triggers",
          "Establish a 'Human Go-Live Command Center' alongside the technical one",
          "Communicate go-live as a beginning, not an ending",
          "Identify and neutralize shadow IT dependencies before go-live",
          "Plan for the post-go-live productivity dip as a managed, budgeted event"
        ],
        "successIndicators": [
          "Go-Live Readiness Scorecard includes human thresholds",
          "Rollback plan documented",
          "Human Command Center active",
          "Shadow IT map complete",
          "Productivity dip communicated and budgeted"
        ]
      },
      {
        "letter": "D",
        "name": "Drive Value Through Hypercare",
        "principle": "The metrics that matter are not uptime or login rates. They are proficiency, utilization, and benefit realization.",
        "failureMode": "Bad metrics are statistically worse than no metrics at all",
        "howToApply": [
          "Replace technical metrics with outcome-driven adoption metrics from Day 1",
          "Run a structured minimum 30-day hypercare period",
          "Track MTTR weekly",
          "Govern retention of project expertise with a 60-day knowledge lockout",
          "Build a formal Benefit Realization Review at 30/60/90/180 days",
          "Execute the 'Burn the Ships' legacy system decommissioning gate"
        ],
        "successIndicators": [
          "Outcome-driven metrics tracking live",
          "30-day hypercare active",
          "MTTR trending down",
          "60-day knowledge lockout enforced",
          "Benefit Realization Reviews scheduled",
          "Manager reinforcement program active"
        ]
      }
    ]
  },
  {
    "id": "BRIDGE",
    "fullName": "A Practitioner's Playbook for Digital Transformation Across ASEAN",
    "tagline": "Ten nations. One framework. Zero copy-paste.",
    "layer": "ASEAN Digital Transformation Layer",
    "kind": "digital-ai",
    "region": "asean",
    "stages": [
      {
        "letter": "B",
        "name": "Baseline the Terrain",
        "principle": "Know the maturity spectrum before the mandate.",
        "failureMode": "Assuming your program has a single starting point across 4 maturity tiers",
        "howToApply": [
          "Conduct a Digital Maturity Assessment segmented by nation, business unit, and role",
          "Map the digital divide within each market — urban vs rural, enterprise vs SME",
          "Assess shadow IT penetration — what consumer apps are staff already using",
          "Identify which national digital blueprints govern your footprint",
          "Calibrate your roadmap to the lowest maturity tier in scope, not the highest"
        ],
        "successIndicators": [
          "Maturity map validated",
          "Digital divide documented",
          "Shadow IT audit complete",
          "Blueprint alignment confirmed"
        ]
      },
      {
        "letter": "R",
        "name": "Root in Culture",
        "principle": "Technology must mold to the hierarchy — not the other way around.",
        "failureMode": "Silent subversion, the root cause of the 70-88% ASEAN failure rate",
        "howToApply": [
          "Map informal power networks alongside the formal org chart",
          "Design pre-meeting protocols that give leaders private visibility before governance forums",
          "Build shadow agile environments — test quietly, iterate privately, publish only successes",
          "Identify and appoint Cultural Bridge Leaders",
          "Never deploy 'shaming dashboards' — surface progress to leaders privately first"
        ],
        "successIndicators": [
          "Informal power map complete",
          "Pre-meeting protocols active",
          "Shadow agile environment live",
          "Cultural Bridge Leaders appointed"
        ]
      },
      {
        "letter": "I",
        "name": "Integrate with Sovereign Agendas",
        "principle": "Government blueprints are not background noise — they are your runway.",
        "failureMode": "Ignoring national digital blueprints as the operating environment",
        "howToApply": [
          "Map your transformation program against every national digital blueprint in footprint",
          "Identify alignment opportunities that unlock incentives and approvals",
          "Engage government stakeholders early — public-private partnership is the operating model",
          "Architect DEFA-readiness into your data governance model",
          "Build your talent strategy around national digital job creation targets"
        ],
        "successIndicators": [
          "Blueprint alignment map complete",
          "Government stakeholder engagement initiated",
          "DEFA readiness assessed",
          "Talent strategy aligned to national targets"
        ]
      },
      {
        "letter": "D",
        "name": "Drive Mobile-First Adoption",
        "principle": "If it doesn't work on a phone in a village, it doesn't work.",
        "failureMode": "Desktop-based portals facing immediate, severe friction",
        "howToApply": [
          "Mandate mobile-native UX as a non-negotiable requirement",
          "Apply the Grab Test — simplify if it's harder than ordering food on a super-app",
          "Design for low-bandwidth environments",
          "Build offline-first capability for field and logistics workforces",
          "Leverage WhatsApp, LINE, Telegram as communication layers, not shadow IT threats",
          "Pilot in the lowest-maturity market first"
        ],
        "successIndicators": [
          "Mobile-native UX confirmed",
          "Bandwidth requirements validated",
          "Offline-first capability built",
          "Consumer app friction benchmark applied"
        ]
      },
      {
        "letter": "G",
        "name": "Govern Across Borders",
        "principle": "Ten nations. Ten regulatory frameworks. One transformation program.",
        "failureMode": "Assuming a unified or federated regulatory environment that doesn't exist",
        "howToApply": [
          "Build a Data Sovereignty Map for every nation in program scope",
          "Architect DEFA-readiness into your data model",
          "Establish a multi-sovereign compliance governance framework with one escalation authority",
          "Design for data quality at source, not as a post-deployment cleansing exercise",
          "Build GCC governance models distinguishing global execution from local compliance"
        ],
        "successIndicators": [
          "Data sovereignty map complete",
          "Multi-sovereign compliance framework live",
          "DEFA readiness designed",
          "Data quality governance embedded at source"
        ]
      },
      {
        "letter": "E",
        "name": "Embed and Realize Value",
        "principle": "The monetization gap is the real failure mode.",
        "failureMode": "$550B gap between AI TAM and realized revenue",
        "howToApply": [
          "Run a culturally adapted hypercare model calibrated to ASEAN time zones and norms",
          "Design reinforcement mechanics for collectivist cultures — team over individual recognition",
          "Build a value realization dashboard tracking financial outcomes, not training completion",
          "Conduct formal benefit realization reviews at 30/60/90/180 days",
          "Close the pilot-to-production gap with a structured 'pilot graduation' protocol",
          "Address the AI trust deficit explicitly — publish performance data, acknowledge errors"
        ],
        "successIndicators": [
          "Culturally adapted hypercare active",
          "Collectivist reinforcement mechanics live",
          "Value realization dashboard reporting in financial language",
          "Pilot graduation protocol in place"
        ]
      }
    ]
  },
  {
    "id": "FORGED",
    "fullName": "A Practitioner's Playbook for Digital Transformation Across Europe",
    "tagline": "In Europe, transformation is not disrupted. It is FORGED.",
    "layer": "European Digital Transformation Layer",
    "kind": "digital-ai",
    "region": "europe",
    "stages": [
      {
        "letter": "F",
        "name": "Foundation",
        "principle": "Know the governance terrain before the technology.",
        "failureMode": "Mistaking legal governance architecture for standard terrain assessment",
        "howToApply": [
          "Map the Works Council structure — which bodies exist, what requires their consent",
          "Conduct a Regulatory Terrain Assessment: GDPR + national derogations + EU AI Act risk tier",
          "Assess digital maturity using the acatech Industrie 4.0 Maturity Index",
          "Map the Mittelstand profile and calibrate pace accordingly",
          "Identify the GCC footprint and cross-border data governance constraints"
        ],
        "successIndicators": [
          "Works Council map complete",
          "Regulatory terrain documented",
          "Digital maturity baseline established",
          "GCC cross-border constraints identified"
        ]
      },
      {
        "letter": "O",
        "name": "Orchestrate",
        "principle": "Co-design with Works Councils — not around them.",
        "failureMode": "Treating co-determination as an obstacle to bypass instead of a legal veto power",
        "howToApply": [
          "Engage the Works Council at Sprint Zero, before architecture decisions are made",
          "Translate technical concepts into employee-rights-impact language",
          "Build the Poldermodel cadence into your agile schedule",
          "Identify Works Council champions who can translate to peers",
          "Never present a Works Agreement as final — present it as a draft inviting input"
        ],
        "successIndicators": [
          "Works Council engagement initiated at Sprint Zero",
          "Three-step protocol active",
          "Poldermodel cadence embedded in agile schedule",
          "Works Agreement drafted"
        ]
      },
      {
        "letter": "R",
        "name": "Regulate",
        "principle": "Compliance is the architecture, not the afterthought.",
        "failureMode": "Treating GDPR as one homogenous EU-wide standard",
        "howToApply": [
          "Conduct a GDPR + national DPA mapping at program initiation",
          "Classify all AI systems against EU AI Act risk tiers in Sprint Zero",
          "Build compliance-as-code: automated GDPR logging, data-lineage, AI model documentation",
          "Design for sovereign cloud from the outset",
          "Leverage the Netherlands as a regulatory sandbox before the German rollout"
        ],
        "successIndicators": [
          "GDPR + national DPA mapping complete",
          "AI Act risk classification done",
          "Compliance-as-code embedded in SDLC",
          "Sovereign cloud architecture designed"
        ]
      },
      {
        "letter": "G",
        "name": "Govern",
        "principle": "Sovereign execution across borders and delivery hubs.",
        "failureMode": "Fragmented, legally exposed multi-jurisdiction delivery",
        "howToApply": [
          "Establish the Netherlands as the primary innovation sandbox before German rollout",
          "Build the Warsaw delivery model leveraging multi-language capabilities",
          "Design cross-border data governance addressing GDPR transfer restrictions",
          "Establish an Executive Steering Committee including Works Council representation",
          "Build a Mittelstand-specific incremental digitalization roadmap"
        ],
        "successIndicators": [
          "GCC hub architecture defined",
          "Netherlands sandbox established",
          "Cross-border data governance designed",
          "Mittelstand incremental roadmap built"
        ]
      },
      {
        "letter": "E",
        "name": "Embed",
        "principle": "Adoption built for consensus cultures, not mandates.",
        "failureMode": "Assuming training/communication can recover a program that skipped consensus",
        "howToApply": [
          "Run a minimum 30-day hypercare with Works Council representatives as co-monitors",
          "Design ADKAR adoption tracks by user segment",
          "Build AI explainability into every user-facing AI interaction (legal requirement under EU AI Act)",
          "Establish manager reinforcement through a Konsens-compatible model",
          "Track adoption in financial language for executive stakeholders"
        ],
        "successIndicators": [
          "Works Council co-monitoring active",
          "AI explainability built into every user touchpoint",
          "ADKAR adoption tracks by segment",
          "Value realization dashboard live in financial language"
        ]
      },
      {
        "letter": "D",
        "name": "Decarbonize",
        "principle": "Digital transformation and sustainability are one mandate in Europe.",
        "failureMode": "Treating sustainability as a CSR sidebar instead of a legal, financial obligation",
        "howToApply": [
          "Embed carbon tracking and CBAM reporting as functional requirements",
          "Design Green IT architecture — energy-efficient data centres, AI workload scheduling",
          "Build CSRD-compliant ESG dashboards into the outcomes framework",
          "Prioritize European sovereign cloud providers with verified carbon-neutral infrastructure",
          "Quantify the carbon impact of the transformation itself"
        ],
        "successIndicators": [
          "Green IT architecture designed",
          "Carbon tracking embedded in ERP/supply chain scope",
          "CSRD dashboard included in outcomes framework",
          "Sovereign cloud selection criteria include carbon neutrality"
        ]
      }
    ]
  },
  {
    "id": "TRUST",
    "fullName": "A Practitioner's Playbook for FSI Digital Adoption Across ASEAN & India",
    "tagline": "In FSI, trust is not a feature. It is the architecture.",
    "layer": "FSI Digital Adoption Layer",
    "kind": "digital-ai",
    "region": "fsi",
    "stages": [
      {
        "letter": "T",
        "name": "Terrain & Compliance Architecture",
        "principle": "Map the regulatory vault before you pour the foundation.",
        "failureMode": "Treating terrain assessment as readiness/stakeholder mapping alone",
        "howToApply": [
          "Map the full regulatory vault: MAS/RBI/BNM/BOT requirements, Basel IV, data sovereignty",
          "Quantify technical debt as a P&L liability — COBOL maintenance and delayed time-to-market",
          "Select the core modernization strategy: lift-and-shift, parallel attacker, or progressive strangling",
          "Map the union landscape and historical strike patterns",
          "Assess GCC maturity — BPO-mode or AI-first innovation hub mode"
        ],
        "successIndicators": [
          "Regulatory vault mapped",
          "Technical debt quantified as P&L",
          "Core modernization strategy selected",
          "Union landscape assessed",
          "GCC maturity baseline established"
        ]
      },
      {
        "letter": "R",
        "name": "Regulate by Design",
        "principle": "Code is compliance. Build it in — not on.",
        "failureMode": "Building on GDPR assumptions that DPDP Act doesn't recognize",
        "howToApply": [
          "Embed consent management architecture into the core data layer before any AI/cloud work",
          "Build breach response automation for the 72-hour reporting window",
          "Classify all AI systems against MAS/RBI/Basel risk tiers at Sprint Zero",
          "Design for algorithmic governance with continuous controls monitoring",
          "Leverage regulatory sandboxes (MAS, BOT, BNM) before enterprise deployment"
        ],
        "successIndicators": [
          "Consent management architecture built",
          "Breach response automation live",
          "AI risk classification complete",
          "Algorithmic governance framework active",
          "Sandbox testing initiated"
        ]
      },
      {
        "letter": "U",
        "name": "Unify the Delivery Model",
        "principle": "One program. Multiple jurisdictions. A single source of trust.",
        "failureMode": "Treating GCCs as back-office processing centres",
        "howToApply": [
          "Elevate GCCs to AI-first strategic partners with direct ML model ownership",
          "Select the core banking modernization approach at program initiation",
          "Design the BaaS architecture: modular balance sheet, licensing, compliance via APIs",
          "Build cross-border data governance for DPDP/PDPA/PDPB differences",
          "Establish union engagement protocols before any automation workstream begins"
        ],
        "successIndicators": [
          "GCC strategy defined",
          "Core modernization approach selected",
          "BaaS architecture designed",
          "Cross-border data governance built",
          "Union engagement protocol active"
        ]
      },
      {
        "letter": "S",
        "name": "Scale with Trust",
        "principle": "Earn adoption before you automate decisions.",
        "failureMode": "Piloting agentic AI while 72% of CROs report limited trust in it",
        "howToApply": [
          "Deploy all AI in shadow mode first — alongside human decisions before autonomy",
          "Build algorithmic explainability into every customer-facing AI interaction",
          "Address the union workforce proactively — AI as augmentation, not replacement",
          "Track adoption in financial language: productivity gains, false positive reduction",
          "Establish a formal AI Governance Board before scaling beyond pilot"
        ],
        "successIndicators": [
          "Shadow mode protocols active for all AI deployments",
          "Algorithmic explainability built",
          "AI Governance Board established",
          "Union engagement on AI strategy initiated",
          "Adoption tracked in financial language"
        ]
      },
      {
        "letter": "T",
        "name": "Transform to Embedded Finance",
        "principle": "The bank that doesn't become infrastructure will become irrelevant.",
        "failureMode": "Competing for a customer interface the super-apps have already won",
        "howToApply": [
          "Execute the BaaS pivot — modularize balance sheet, compliance, licensing into APIs",
          "Integrate ESG infrastructure into core underwriting",
          "Build CBDC readiness for MAS Purpose Bound Money, BOT sandbox, RBI e-Rupee",
          "Design value realization governance in financial language",
          "Conduct formal benefit realization reviews at 30/60/90/180 days"
        ],
        "successIndicators": [
          "BaaS architecture live",
          "ESG integration into underwriting active",
          "CBDC readiness assessed",
          "Value realization dashboard reporting in financial language",
          "Benefit realization reviews at 30/60/90/180 days"
        ]
      }
    ]
  },
  {
    "id": "STEWARD",
    "fullName": "A Practitioner's Playbook for Cybersecurity Workforce Transformation in the Agentic AI Era",
    "tagline": "The machine hunts the threat. The human stewards the outcome.",
    "layer": "Cybersecurity Workforce Transformation",
    "kind": "cybersecurity",
    "region": null,
    "stages": [
      {
        "letter": "S",
        "name": "Survey the Extinction Layer",
        "principle": "Know what AI has already replaced — and stop competing with it.",
        "failureMode": "The Productivity Illusion — lower-tier staff 12.5% slower with AI tools",
        "howToApply": [
          "Map every task in your current role against the AI capability baseline",
          "Identify the 'floor' of your current function — where the AI has already moved it",
          "Conduct an organizational skills gap assessment against the new AI-augmented baseline",
          "Stop investing in skills AI has already commoditized",
          "Communicate findings to leadership in financial language"
        ],
        "successIndicators": [
          "Skills extinction map completed",
          "Competency gap quantified",
          "L&D investment redirected to orchestration and governance"
        ]
      },
      {
        "letter": "T",
        "name": "Transition the Talent Pipeline",
        "principle": "The Competency Bridge must be engineered — it will not build itself.",
        "failureMode": "Junior analysts never build the judgment AI now performs for them",
        "howToApply": [
          "Design an explicit L1-to-L2 Orchestrator pathway",
          "Build AI literacy into onboarding from Day 1 — prompt fluency, hallucination detection",
          "Create structured 'shadow AI' rotations for junior analysts",
          "Establish cognitive ownership milestones, not training completion certificates",
          "Partner with education providers to redesign entry-level curricula"
        ],
        "successIndicators": [
          "L1-to-L2 pathway designed",
          "AI literacy curriculum deployed",
          "Cognitive ownership assessments active"
        ]
      },
      {
        "letter": "E",
        "name": "Embed Regulatory Architecture",
        "principle": "Compliance is not a legal exercise. It is a runtime technical control.",
        "failureMode": "Behavioral drift creating compliance violations faster than reviewers can catch",
        "howToApply": [
          "Map every regulatory requirement to a specific technical control",
          "Deploy AI Security Posture Management (AI-SPM) as a continuous runtime control plane",
          "Implement data sovereignty boundary enforcement at the infrastructure layer",
          "Build regulatory mapping into the AI system design phase, not the deployment review",
          "Establish a cross-functional SGR (Security, Governance, Risk) operating model"
        ],
        "successIndicators": [
          "Regulatory-to-control mapping complete",
          "AI-SPM deployed",
          "SGR unified"
        ]
      },
      {
        "letter": "W",
        "name": "Wire the Human-in-the-Loop Gates",
        "principle": "Define precisely when the machine must defer to human judgment.",
        "failureMode": "Human gates either too broad (negating AI speed) or too narrow (catastrophic risk)",
        "howToApply": [
          "Define the AI confidence threshold for autonomous action",
          "Map every high-impact, low-reversibility action category requiring a human gate",
          "Build geopolitical and business logic context libraries for AI systems",
          "Design the escalation UX so humans get sufficient context in seconds",
          "Test the gates under adversarial red-team conditions"
        ],
        "successIndicators": [
          "Confidence threshold defined",
          "High-impact action inventory complete",
          "Escalation UX designed"
        ]
      },
      {
        "letter": "A",
        "name": "Audit Adversarial Drift",
        "principle": "Your AI is a target. Red team it before the adversary does.",
        "failureMode": "Indirect Prompt Injection hijacking AI agents via embedded content",
        "howToApply": [
          "Establish an LLM Red Teaming program using OWASP Agentic Top 10 and MITRE ATLAS",
          "Test specifically for IDPI vulnerabilities — CSS concealment, HashJack technique",
          "Build data provenance tracking so poisoned context is detectable",
          "Deploy aggressive sandboxing and execution isolation",
          "Implement behavioral baseline monitoring to catch statistical deviations"
        ],
        "successIndicators": [
          "LLM Red Team program active",
          "IDPI testing complete",
          "Behavioral baseline established"
        ]
      },
      {
        "letter": "R",
        "name": "Redesign the Agentic SOC",
        "principle": "When 92% of alerts are automated, the human workflow must transform entirely.",
        "failureMode": "Assuming the human role is just 'the remaining 8%' of the old workflow",
        "howToApply": [
          "Redesign the SOC operating model from first principles — define new role architecture",
          "Eliminate shift models built for alert processing",
          "Redesign performance metrics away from alert closure rates",
          "Apply formal ADKAR-based change management to the SOC transformation",
          "Build psychological safety for overriding AI recommendations"
        ],
        "successIndicators": [
          "New SOC role architecture defined",
          "Shift model retired for investigation-based structure",
          "New performance metrics live",
          "Change management program applied"
        ]
      },
      {
        "letter": "D",
        "name": "Drive Governance at Machine Speed",
        "principle": "Oversight must operate at the same velocity as the systems it governs.",
        "failureMode": "Governance mechanisms becoming bottlenecks that negate AI's speed advantage",
        "howToApply": [
          "Establish an AI Governance Council with CISO, General Counsel, CHRO, CFO representation",
          "Build the four governance horizons: real-time, operational, strategic, executive",
          "Align governance architecture with NIST AI RMF's GOVERN, MAP, MEASURE, MANAGE",
          "Pursue ISO/IEC 42001 certification as the formal governance standard",
          "Build a continuous improvement loop feeding findings back into architecture"
        ],
        "successIndicators": [
          "AI Governance Council established",
          "Four governance horizons active",
          "NIST AI RMF aligned",
          "ISO/IEC 42001 roadmap defined",
          "Continuous improvement loop running"
        ]
      }
    ]
  }
]
