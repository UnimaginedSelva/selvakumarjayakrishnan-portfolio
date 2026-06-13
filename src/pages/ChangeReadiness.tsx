import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Loader2, CheckCircle2, AlertTriangle, ChevronRight } from 'lucide-react'
import AdkarRadar from '../components/AdkarRadar'

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
  if (score >= 4) return 'text-gold-400';
  if (score === 3) return 'text-blue-400';
  return 'text-red-400';
}

function scoreBg(score: number): string {
  if (score >= 4) return 'border-gold-500/40 bg-gold-500/5';
  if (score === 3) return 'border-blue-500/40 bg-blue-500/5';
  return 'border-red-500/40 bg-red-500/5';
}

function severityBadge(severity: string): string {
  if (severity === 'High') return 'bg-red-500/10 text-red-400 border border-red-500/30';
  if (severity === 'Medium') return 'bg-amber-500/10 text-amber-400 border border-amber-500/30';
  return 'bg-blue-500/10 text-blue-400 border border-blue-500/30';
}

function readinessBadge(r: string): string {
  if (r === 'High') return 'bg-gold-500/10 text-gold-400 border border-gold-500/30';
  if (r === 'Medium') return 'bg-blue-500/10 text-blue-400 border border-blue-500/30';
  return 'bg-red-500/10 text-red-400 border border-red-500/30';
}

function frameworkBadge(f: string): string {
  if (f === 'OPERATE™') return 'bg-purple-500/10 text-purple-300 border border-purple-500/30';
  if (f === 'Both') return 'bg-gold-500/10 text-gold-400 border border-gold-500/30';
  return 'bg-slate-700 text-slate-300 border border-slate-600';
}

export default function ChangeReadiness() {
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

    // Animate steps while API call runs
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
        fetch('/api/analyze', {
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
        setError(`Incomplete response from Claude. Raw: ${JSON.stringify(data).slice(0, 200)}`);
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
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/" className="text-slate-400 hover:text-gold-400 transition-colors flex items-center gap-1 text-sm">
            <ArrowLeft size={15} />
            Back to Portfolio
          </Link>
          <span className="text-slate-700">|</span>
          <span className="text-slate-300 font-medium text-sm">Change Readiness Agent</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs px-4 py-1.5 rounded-full mb-6 font-medium tracking-wide">
            AI AGENT · CHANGE MANAGEMENT
          </div>
          <h1 className="text-4xl font-bold text-slate-100 mb-3">
            Change Readiness Agent
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-2">
            Powered by ADKAR · TRANSFORM™ · OPERATE™
          </p>
          <p className="text-slate-500 text-sm max-w-lg mx-auto">
            Paste your change project brief. The agent assesses your readiness across all ADKAR dimensions and maps gaps to targeted framework interventions.
          </p>
        </div>

        {/* Input */}
        {!result && (
          <div className="card mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Project Brief
            </label>
            <textarea
              value={brief}
              onChange={e => setBrief(e.target.value)}
              placeholder="Describe your change initiative — the type of change, scope, affected stakeholders, timeline, what's been done so far, and any known challenges or resistance..."
              rows={7}
              disabled={loading}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-100 placeholder-slate-600 text-sm resize-none focus:outline-none focus:border-gold-500/60 transition-colors disabled:opacity-50"
            />
            {error && (
              <p className="mt-2 text-sm text-red-400 flex items-center gap-1.5">
                <AlertTriangle size={14} />
                {error}
              </p>
            )}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-slate-600 text-xs">
                The more context you provide, the sharper the assessment.
              </p>
              <button
                onClick={runAssessment}
                disabled={loading || brief.trim().length < 20}
                className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-900 font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
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
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Agent Processing</p>
            <div className="space-y-3">
              {STEPS.map((step, i) => {
                const done = completedSteps.includes(i);
                const active = currentStep === i && !done;
                return (
                  <div key={i} className={`flex items-center gap-3 transition-opacity ${i > currentStep && !done ? 'opacity-30' : 'opacity-100'}`}>
                    {done ? (
                      <CheckCircle2 size={16} className="text-gold-400 shrink-0" />
                    ) : active ? (
                      <Loader2 size={16} className="animate-spin text-blue-400 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                    )}
                    <span className={`text-sm ${done ? 'text-slate-300' : active ? 'text-slate-100' : 'text-slate-600'}`}>
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
            {/* Summary bar */}
            <div className="card flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Project</p>
                <p className="text-slate-200 font-medium">{result.projectSummary}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${result.changeType === 'AI/Digital Transformation' ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30' : result.changeType === 'Both' ? 'bg-gold-500/10 text-gold-400 border border-gold-500/30' : 'bg-slate-700 text-slate-300 border border-slate-600'}`}>
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
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4 self-start">Readiness Profile</p>
                <AdkarRadar scores={{
                  awareness: result.adkar.awareness.score,
                  desire: result.adkar.desire.score,
                  knowledge: result.adkar.knowledge.score,
                  ability: result.adkar.ability.score,
                  reinforcement: result.adkar.reinforcement.score,
                }} />
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gold-400 inline-block" /> Strong (4–5)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400 inline-block" /> Moderate (3)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> Weak (1–2)</span>
                </div>
              </div>

              {/* ADKAR scores */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">ADKAR Scores</p>
                {ADKAR_KEYS.map(key => {
                  const dim = result.adkar[key];
                  return (
                    <div key={key} className={`rounded-xl border p-4 ${scoreBg(dim.score)}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-slate-200">{ADKAR_LABELS[key]}</span>
                        <span className={`text-lg font-bold ${scoreColor(dim.score)}`}>{dim.score}/5</span>
                      </div>
                      <p className="text-xs text-slate-400 mb-2">{dim.rationale}</p>
                      {dim.keyGap && (
                        <p className="text-xs text-slate-500">
                          <span className="text-slate-600 font-medium">Gap: </span>{dim.keyGap}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Risks */}
            <div className="card">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Top Readiness Risks</p>
              <div className="grid sm:grid-cols-3 gap-4">
                {result.risks.map((risk, i) => (
                  <div key={i} className="bg-slate-900 border border-slate-700/50 rounded-xl p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-sm font-semibold text-slate-200">{risk.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${severityBadge(risk.severity)}`}>{risk.severity}</span>
                    </div>
                    <p className="text-xs text-slate-400">{risk.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Framework Recommendations */}
            <div className="card">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Framework Interventions by ADKAR Dimension</p>
              <div className="space-y-4">
                {ADKAR_KEYS.map(key => {
                  const rec = result.frameworkRecommendations[key];
                  const dim = result.adkar[key];
                  return (
                    <div key={key} className="border border-slate-700 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-sm font-bold ${scoreColor(dim.score)}`}>{ADKAR_LABELS[key]}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${scoreColor(dim.score)} border ${dim.score >= 4 ? 'border-gold-500/30' : dim.score === 3 ? 'border-blue-500/30' : 'border-red-500/30'} bg-transparent`}>
                          {dim.score}/5
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${frameworkBadge(rec.framework)}`}>
                          {rec.framework}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {rec.stages.map((stage, i) => (
                          <span key={i} className="text-xs bg-slate-900 border border-slate-700 text-slate-300 px-3 py-1 rounded-full">
                            {stage}
                          </span>
                        ))}
                      </div>
                      <ul className="space-y-1">
                        {rec.actions.map((action, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                            <ChevronRight size={12} className="text-gold-500 mt-0.5 shrink-0" />
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
            <div className="card bg-gold-500/5 border-gold-500/20">
              <p className="text-xs font-semibold text-gold-500/70 uppercase tracking-widest mb-4">Immediate Priority Actions</p>
              <div className="space-y-3">
                {result.priorityActions.map((action, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-slate-200">{action}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Run another */}
            <div className="text-center pt-2">
              <button
                onClick={() => { setResult(null); setBrief(''); }}
                className="text-sm text-slate-500 hover:text-gold-400 transition-colors"
              >
                ← Run another assessment
              </button>
            </div>
          </div>
        )}

        {/* Attribution */}
        <div className="text-center mt-16 pt-8 border-t border-slate-800">
          <p className="text-slate-600 text-xs">
            ADKAR® is a registered trademark of Prosci Inc. TRANSFORM™ and OPERATE™ are proprietary frameworks by{' '}
            <a href="/" className="text-slate-500 hover:text-gold-400 transition-colors">Selvakumar Jayakrishnan</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
