import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Loader2, CheckCircle2, AlertTriangle, ChevronRight, Download } from 'lucide-react'
import AdkarRadar from '../components/AdkarRadar'

// Gemini-powered alongside build of ChangeReadiness.tsx — same UI/UX, same ADKAR/TRANSFORM/OPERATE
// logic, posts to /api/analyze-gemini instead of /api/analyze so outputs can be compared side by side.

interface AdkarDimension {
  score: number;
  label: string;
  rationale: string;
  keyGap: string;
}

interface Risk {
  title: string;
  severity: 'High' | 'Medium' | 'Low';
  description: string;
}

interface FrameworkRec {
  framework: string;
  stages: string[];
  actions: string[];
}

interface AssessmentResult {
  changeType: string;
  projectSummary: string;
  overallReadiness: string;
  overallReadinessScore: number;
  adkar: {
    awareness: AdkarDimension;
    desire: AdkarDimension;
    knowledge: AdkarDimension;
    ability: AdkarDimension;
    reinforcement: AdkarDimension;
  };
  risks: Risk[];
  frameworkRecommendations: {
    awareness: FrameworkRec;
    desire: FrameworkRec;
    knowledge: FrameworkRec;
    ability: FrameworkRec;
    reinforcement: FrameworkRec;
  };
  priorityActions: string[];
}

const STEPS = [
  'Parsing project brief',
  'Detecting change type',
  'Assessing ADKAR dimensions',
  'Mapping to TRANSFORM™ / OPERATE™ frameworks',
  'Generating readiness report',
];

const ADKAR_KEYS = ['awareness', 'desire', 'knowledge', 'ability', 'reinforcement'] as const;
const ADKAR_LABELS: Record<string, string> = {
  awareness: 'Awareness',
  desire: 'Desire',
  knowledge: 'Knowledge',
  ability: 'Ability',
  reinforcement: 'Reinforcement',
};

function scoreColor(score: number): string {
  if (score >= 4) return 'text-amber-700';
  if (score === 3) return 'text-blue-700';
  return 'text-red-700';
}

function scoreBg(score: number): string {
  if (score >= 4) return 'border-amber-300 bg-amber-50';
  if (score === 3) return 'border-blue-300 bg-blue-50';
  return 'border-red-300 bg-red-50';
}

function severityBadge(severity: string): string {
  if (severity === 'High') return 'bg-red-100 text-red-700 border border-red-200';
  if (severity === 'Medium') return 'bg-amber-100 text-amber-800 border border-amber-200';
  return 'bg-blue-100 text-blue-700 border border-blue-200';
}

function readinessBadge(r: string): string {
  if (r === 'High') return 'bg-amber-100 text-amber-800 border border-amber-200';
  if (r === 'Medium') return 'bg-blue-100 text-blue-700 border border-blue-200';
  return 'bg-red-100 text-red-700 border border-red-200';
}

function frameworkBadge(f: string): string {
  if (f === 'OPERATE™') return 'bg-purple-100 text-purple-700 border border-purple-200';
  if (f === 'Both') return 'bg-amber-100 text-amber-800 border border-amber-200';
  return 'bg-stone-100 text-stone-700 border border-stone-300';
}

export default function ChangeReadinessGemini() {
  const [brief, setBrief] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState('');

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  async function runAssessment() {
    if (brief.trim().length < 20) {
      setError('Please provide more detail about your change initiative.');
      return;
    }
    setError('');
    setResult(null);
    setCompletedSteps([]);
    setLoading(true);

    const stepTimes = [400, 600, 500, 700, 500];
    const animateSteps = async () => {
      for (let i = 0; i < STEPS.length - 1; i++) {
        setCurrentStep(i);
        await sleep(stepTimes[i]);
        setCompletedSteps(prev => [...prev, i]);
      }
      setCurrentStep(STEPS.length - 1);
    };

    try {
      const [data] = await Promise.all([
        fetch('/api/analyze-gemini', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ brief }),
        }).then(async r => {
          const text = await r.text();
          try { return JSON.parse(text); } catch { return { error: `Unexpected response: ${text.slice(0, 120)}` }; }
        }),
        animateSteps(),
      ]);

      await sleep(400);
      setCompletedSteps(prev => [...prev, STEPS.length - 1]);
      await sleep(300);

      if (data.error) {
        setError(data.error);
      } else if (!data.adkar || !data.risks || !data.frameworkRecommendations) {
        setError(`Incomplete response from Gemini. Raw: ${JSON.stringify(data).slice(0, 200)}`);
      } else {
        setResult(data as AssessmentResult);
      }
    } catch (err) {
      setError(`Assessment failed: ${err instanceof Error ? err.message : 'Unknown error'}. Please try again.`);
    } finally {
      setCurrentStep(-1);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#faf6ec] text-stone-900">
      {/* Header */}
      <div className="no-print border-b border-stone-200 bg-[#faf6ec]/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/" className="text-stone-500 hover:text-amber-700 transition-colors flex items-center gap-1 text-sm">
            <ArrowLeft size={15} />
            Back to Portfolio
          </Link>
          <span className="text-stone-300">|</span>
          <span className="text-stone-700 font-medium text-sm">Change Readiness Agent</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 text-blue-700 text-xs px-4 py-1.5 rounded-full mb-6 font-medium tracking-wide">
            AI AGENT · CHANGE MANAGEMENT · GEMINI
          </div>
          <h1 className="text-4xl font-bold text-stone-900 mb-3">
            Change Readiness Agent <span className="text-blue-700">(Gemini)</span>
          </h1>
          <p className="text-stone-500 text-lg max-w-xl mx-auto mb-2">
            Powered by ADKAR · TRANSFORM™ · OPERATE™ — running on Google Gemini
          </p>
          <p className="text-stone-500 text-sm max-w-lg mx-auto">
            Paste your change project brief. The agent assesses your readiness across all ADKAR dimensions and maps gaps to targeted framework interventions.
          </p>
        </div>

        {/* Input */}
        {!result && (
          <div className="card mb-6">
            <label className="block text-sm font-medium text-stone-700 mb-3">
              Project Brief
            </label>
            <textarea
              value={brief}
              onChange={e => setBrief(e.target.value)}
              placeholder="Describe your change initiative — the type of change, scope, affected stakeholders, timeline, what's been done so far, and any known challenges or resistance..."
              rows={7}
              disabled={loading}
              className="w-full bg-white border border-stone-300 rounded-lg p-4 text-stone-900 placeholder-stone-400 text-sm resize-none focus:outline-none focus:border-amber-600/70 transition-colors disabled:opacity-50"
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                <AlertTriangle size={14} />
                {error}
              </p>
            )}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-stone-400 text-xs">
                The more context you provide, the sharper the assessment.
              </p>
              <button
                onClick={runAssessment}
                disabled={loading || brief.trim().length < 20}
                className="flex items-center gap-2 bg-amber-700 hover:bg-amber-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
              >
                {loading ? <Loader2 size={15} className="animate-spin" /> : <ChevronRight size={15} />}
                {loading ? 'Assessing...' : 'Run Assessment'}
              </button>
            </div>
          </div>
        )}

        {/* Processing steps */}
        {loading && (
          <div className="card mb-6">
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-4">Agent Processing</p>
            <div className="space-y-3">
              {STEPS.map((step, i) => {
                const done = completedSteps.includes(i);
                const active = currentStep === i && !done;
                return (
                  <div key={i} className={`flex items-center gap-3 transition-opacity ${i > currentStep && !done ? 'opacity-30' : 'opacity-100'}`}>
                    {done ? (
                      <CheckCircle2 size={16} className="text-amber-700 shrink-0" />
                    ) : active ? (
                      <Loader2 size={16} className="animate-spin text-blue-700 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-stone-300 shrink-0" />
                    )}
                    <span className={`text-sm ${done ? 'text-stone-600' : active ? 'text-stone-900' : 'text-stone-400'}`}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6 animate-fade-in">
            {/* Download bar */}
            <div className="no-print flex justify-end">
              <button
                onClick={() => {
                  const prev = document.title;
                  const _nd = new Date(); const _ds = `${_nd.getFullYear()}-${String(_nd.getMonth()+1).padStart(2,'0')}-${String(_nd.getDate()).padStart(2,'0')}`;
                  document.title = `Change_Readiness_Assessment_Gemini_${_ds}`;
                  window.addEventListener('afterprint', () => { document.title = prev; }, { once: true });
                  window.print();
                }}
                className="flex items-center gap-2 bg-white hover:bg-stone-50 border border-stone-300 text-stone-600 hover:text-amber-700 px-4 py-2 rounded-lg text-sm transition-colors"
              >
                <Download size={14} />
                Download PDF
              </button>
            </div>
            {/* Summary bar */}
            <div className="card flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <p className="text-xs text-stone-500 uppercase tracking-widest mb-1">Project</p>
                <p className="text-stone-800 font-medium">{result.projectSummary}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${result.changeType === 'AI/Digital Transformation' ? 'bg-purple-100 text-purple-700 border border-purple-200' : result.changeType === 'Both' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-stone-100 text-stone-700 border border-stone-300'}`}>
                  {result.changeType}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${readinessBadge(result.overallReadiness)}`}>
                  {result.overallReadiness} Readiness
                </span>
              </div>
            </div>

            {/* Radar + ADKAR scores */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Radar */}
              <div className="card flex flex-col items-center">
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-4 self-start">Readiness Profile</p>
                <AdkarRadar scores={{
                  awareness: result.adkar.awareness.score,
                  desire: result.adkar.desire.score,
                  knowledge: result.adkar.knowledge.score,
                  ability: result.adkar.ability.score,
                  reinforcement: result.adkar.reinforcement.score,
                }} />
                <div className="flex items-center gap-4 mt-2 text-xs text-stone-500">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-600 inline-block" /> Strong (4–5)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-600 inline-block" /> Moderate (3)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-600 inline-block" /> Weak (1–2)</span>
                </div>
              </div>

              {/* ADKAR scores */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-widest">ADKAR Scores</p>
                {ADKAR_KEYS.map(key => {
                  const dim = result.adkar[key];
                  return (
                    <div key={key} className={`rounded-xl border p-4 ${scoreBg(dim.score)}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-stone-800">{ADKAR_LABELS[key]}</span>
                        <span className={`text-lg font-bold ${scoreColor(dim.score)}`}>{dim.score}/5</span>
                      </div>
                      <p className="text-xs text-stone-500 mb-2">{dim.rationale}</p>
                      {dim.keyGap && (
                        <p className="text-xs text-stone-500">
                          <span className="text-stone-600 font-medium">Gap: </span>{dim.keyGap}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Risks */}
            <div className="card">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-4">Top Readiness Risks</p>
              <div className="grid sm:grid-cols-3 gap-4">
                {result.risks.map((risk, i) => (
                  <div key={i} className="bg-stone-50 border border-stone-200 rounded-xl p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-sm font-semibold text-stone-800">{risk.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${severityBadge(risk.severity)}`}>{risk.severity}</span>
                    </div>
                    <p className="text-xs text-stone-500">{risk.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Framework Recommendations */}
            <div className="card">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-4">Framework Interventions by ADKAR Dimension</p>
              <div className="space-y-4">
                {ADKAR_KEYS.map(key => {
                  const rec = result.frameworkRecommendations[key];
                  const dim = result.adkar[key];
                  return (
                    <div key={key} className="border border-stone-200 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-sm font-bold ${scoreColor(dim.score)}`}>{ADKAR_LABELS[key]}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${scoreColor(dim.score)} border ${dim.score >= 4 ? 'border-amber-300' : dim.score === 3 ? 'border-blue-300' : 'border-red-300'} bg-transparent`}>
                          {dim.score}/5
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${frameworkBadge(rec.framework)}`}>
                          {rec.framework}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {rec.stages.map((stage, i) => (
                          <span key={i} className="text-xs bg-stone-50 border border-stone-200 text-stone-600 px-3 py-1 rounded-full">
                            {stage}
                          </span>
                        ))}
                      </div>
                      <ul className="space-y-1">
                        {rec.actions.map((action, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-stone-500">
                            <ChevronRight size={12} className="text-amber-700 mt-0.5 shrink-0" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Priority Actions */}
            <div className="card bg-amber-50 border-amber-200">
              <p className="text-xs font-semibold text-amber-800/80 uppercase tracking-widest mb-4">Immediate Priority Actions</p>
              <div className="space-y-3">
                {result.priorityActions.map((action, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-stone-800">{action}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Run another */}
            <div className="no-print text-center pt-2">
              <button
                onClick={() => { setResult(null); setBrief(''); }}
                className="text-sm text-stone-500 hover:text-amber-700 transition-colors"
              >
                ← Run another assessment
              </button>
            </div>
          </div>
        )}

        {/* Attribution */}
        <div className="text-center mt-16 pt-8 border-t border-stone-200">
          <p className="text-stone-500 text-xs mb-3">
            Prefer the Claude-powered version?{' '}
            <Link to="/change-readiness" className="text-amber-700 hover:text-amber-800 transition-colors">Try the original Change Readiness Agent</Link>.
          </p>
          <p className="text-stone-500 text-xs mb-3">
            Prefer something that runs entirely offline, no AI calls, installable as its own app? Try the{' '}
            <a href="/toolkit/" className="text-amber-700 hover:text-amber-800 transition-colors">Change Framework Navigator</a>{' '}
            — covers all 8 frameworks against your own maturity checklist.
          </p>
          <p className="text-stone-400 text-xs">
            ADKAR® is a registered trademark of Prosci Inc. TRANSFORM™ and OPERATE™ are proprietary frameworks by{' '}
            <a href="/" className="text-stone-500 hover:text-amber-700 transition-colors">Selvakumar Jayakrishnan</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
