import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Loader2, CheckCircle2, AlertTriangle, ChevronRight, Download, Briefcase } from 'lucide-react'

interface RoleSnapshot {
  title: string;
  company: string;
  changeType: string;
  seniorityFit: string;
  locationFit: string;
  locationNote: string;
  fitSummary: string;
  verdict: string;
  verdictReason: string;
}

interface FitItem {
  requirement: string;
  score: number;
  label: string;
  evidence: string;
}

interface TalkingPoint {
  angle: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  linkToJD: string;
}

interface FrameworkAngle {
  jdRequirement: string;
  starHook: string;
  bridgeLine: string;
  frameworkPositioning: string;
  forwardApplication: string;
}

interface QuestionItem {
  question: string;
  intent: string;
}

interface WatchOut {
  gap: string;
  preparedAnswer: string;
}

interface IntelResult {
  roleSnapshot: RoleSnapshot;
  fitAssessment: FitItem[];
  talkingPoints: TalkingPoint[];
  frameworkAngles: FrameworkAngle[];
  questionsToAsk: QuestionItem[];
  watchOuts: WatchOut[];
}

const STEPS = [
  'Parsing job description',
  'Profiling role requirements',
  'Mapping to your experience',
  'Building STAR talking points',
  'Generating interview brief',
];

function fitColor(score: number) {
  if (score >= 4) return 'text-gold-400';
  if (score === 3) return 'text-blue-400';
  return 'text-red-400';
}

function fitBorder(score: number) {
  if (score >= 4) return 'border-gold-500/40 bg-gold-500/5';
  if (score === 3) return 'border-blue-500/40 bg-blue-500/5';
  return 'border-red-500/40 bg-red-500/5';
}

function seniorityBadge(s: string) {
  if (s === 'Strong') return 'bg-gold-500/10 text-gold-400 border-gold-500/30';
  if (s === 'Moderate') return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
  return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
}

function changeTypeBadge(t: string) {
  if (t === 'AI/Digital Transformation') return 'bg-purple-500/10 text-purple-300 border-purple-500/30';
  if (t === 'Both') return 'bg-gold-500/10 text-gold-400 border-gold-500/30';
  return 'bg-slate-700 text-slate-300 border-slate-600';
}

export default function JobIntelligence() {
  const [jd, setJd] = useState('');
  const [companyContext, setCompanyContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [result, setResult] = useState<IntelResult | null>(null);
  const [error, setError] = useState('');
  const [expandedTP, setExpandedTP] = useState<number | null>(0);
  const [expandedFA, setExpandedFA] = useState<number | null>(0);

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  function looksLikeUrl(text: string) {
    return /^https?:\/\//i.test(text.trim());
  }

  async function runIntel() {
    if (jd.trim().length < 30) {
      setError('Please paste the full job description.');
      return;
    }
    if (looksLikeUrl(companyContext)) {
      setError('Company Context needs actual text, not a URL. Open the page, select all text, and paste it here.');
      return;
    }
    setError('');
    setResult(null);
    setCompletedSteps([]);
    setLoading(true);
    setExpandedTP(0);
    setExpandedFA(0);

    const stepTimes = [500, 600, 700, 600, 500];
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
        fetch('/api/job-intel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jd, companyContext }),
        }).then(async r => {
          const text = await r.text();
          try { return JSON.parse(text); } catch { return { error: `Unexpected response: ${text.slice(0, 150)}` }; }
        }),
        animateSteps(),
      ]);

      await sleep(400);
      setCompletedSteps(prev => [...prev, STEPS.length - 1]);
      await sleep(300);

      if (data.error) {
        setError(data.error);
      } else if (!data.roleSnapshot || !data.talkingPoints) {
        setError(`Incomplete response. Raw: ${JSON.stringify(data).slice(0, 200)}`);
      } else {
        setResult(data as IntelResult);
      }
    } catch (err) {
      setError(`Failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setCurrentStep(-1);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <div className="no-print border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/" className="text-slate-400 hover:text-gold-400 transition-colors flex items-center gap-1 text-sm">
            <ArrowLeft size={15} />
            Back to Portfolio
          </Link>
          <span className="text-slate-700">|</span>
          <span className="text-slate-300 font-medium text-sm">Job Intelligence Agent</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs px-4 py-1.5 rounded-full mb-6 font-medium tracking-wide">
            AI AGENT · INTERVIEW PREPARATION
          </div>
          <h1 className="text-4xl font-bold text-slate-100 mb-3">Job Intelligence Agent</h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-2">
            Paste a job description. Get a personalised interview brief in seconds.
          </p>
          <p className="text-slate-500 text-sm max-w-lg mx-auto">
            STAR talking points · Framework angles · Questions to ask · Watch-outs — all tailored to your background.
          </p>
        </div>

        {/* Input */}
        {!result && (
          <div className="space-y-4 mb-6">
            <div className="card">
              <label className="block text-sm font-medium text-slate-300 mb-3">Job Description <span className="text-gold-500">*</span></label>
              <textarea
                value={jd}
                onChange={e => setJd(e.target.value)}
                placeholder="Paste the full job description here — title, responsibilities, requirements..."
                rows={8}
                disabled={loading}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-100 placeholder-slate-600 text-sm resize-none focus:outline-none focus:border-gold-500/60 transition-colors disabled:opacity-50"
              />
            </div>
            <div className="card">
              <label className="block text-sm font-medium text-slate-300 mb-1">Company Context <span className="text-slate-500 font-normal">(optional but sharpens the output)</span></label>
              <p className="text-xs text-slate-500 mb-3">Paste the company's About page, LinkedIn summary, recent news, or anything that gives context.</p>
              <textarea
                value={companyContext}
                onChange={e => setCompanyContext(e.target.value)}
                placeholder="Company overview, mission, recent initiatives, culture notes..."
                rows={4}
                disabled={loading}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-100 placeholder-slate-600 text-sm resize-none focus:outline-none focus:border-gold-500/60 transition-colors disabled:opacity-50"
              />
            </div>
            {error && (
              <p className="text-sm text-red-400 flex items-center gap-1.5">
                <AlertTriangle size={14} /> {error}
              </p>
            )}
            <div className="flex justify-end">
              <button
                onClick={runIntel}
                disabled={loading || jd.trim().length < 30}
                className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-900 font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
              >
                {loading ? <Loader2 size={15} className="animate-spin" /> : <Briefcase size={15} />}
                {loading ? 'Analysing...' : 'Generate Brief'}
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
                    {done ? <CheckCircle2 size={16} className="text-gold-400 shrink-0" />
                      : active ? <Loader2 size={16} className="animate-spin text-blue-400 shrink-0" />
                      : <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />}
                    <span className={`text-sm ${done ? 'text-slate-300' : active ? 'text-slate-100' : 'text-slate-600'}`}>{step}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6 animate-fade-in">
            {/* Download + Reset */}
            <div className="no-print flex items-center justify-between">
              <button onClick={() => { setResult(null); setJd(''); setCompanyContext(''); }}
                className="text-sm text-slate-500 hover:text-gold-400 transition-colors flex items-center gap-1">
                <ArrowLeft size={13} /> New brief
              </button>
              <button
                onClick={() => {
                  const prev = document.title;
                  const _nd = new Date(); const _ds = `${_nd.getFullYear()}-${String(_nd.getMonth()+1).padStart(2,'0')}-${String(_nd.getDate()).padStart(2,'0')}`;
                  document.title = `Interview_Brief_${result.roleSnapshot.company.replace(/\s+/g, '_')}_${_ds}`;
                  window.addEventListener('afterprint', () => { document.title = prev; }, { once: true });
                  window.print();
                }}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-gold-400 px-4 py-2 rounded-lg text-sm transition-colors"
              >
                <Download size={14} /> Download PDF
              </button>
            </div>

            {/* Role Snapshot */}
            <div className="card">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Role Snapshot</p>
              {/* Verdict Banner */}
              {result.roleSnapshot.verdict && (() => {
                const v = result.roleSnapshot.verdict;
                const isApply = v === 'Apply';
                const isCaution = v === 'Apply with Caution';
                const bannerClass = isApply
                  ? 'bg-emerald-900/40 border border-emerald-500/40 text-emerald-300'
                  : isCaution
                  ? 'bg-amber-900/40 border border-amber-500/40 text-amber-300'
                  : 'bg-red-900/40 border border-red-500/40 text-red-300';
                const icon = isApply ? '✓' : isCaution ? '⚠' : '✕';
                return (
                  <div className={`flex items-start gap-3 rounded-lg px-4 py-3 mb-4 ${bannerClass}`}>
                    <span className="text-lg font-bold leading-none mt-0.5">{icon}</span>
                    <div>
                      <p className="font-semibold text-sm">{v}</p>
                      {result.roleSnapshot.verdictReason && (
                        <p className="text-xs opacity-80 mt-0.5">{result.roleSnapshot.verdictReason}</p>
                      )}
                    </div>
                  </div>
                );
              })()}
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-100 mb-1">{result.roleSnapshot.title}</h2>
                  <p className="text-gold-400 font-medium mb-3">{result.roleSnapshot.company}</p>
                  <p className="text-sm text-slate-300">{result.roleSnapshot.fitSummary}</p>
                  {result.roleSnapshot.locationNote && (
                    <p className="text-xs text-slate-500 mt-2">{result.roleSnapshot.locationNote}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end shrink-0">
                  <span className={`text-xs px-3 py-1 rounded-full border font-medium ${changeTypeBadge(result.roleSnapshot.changeType)}`}>
                    {result.roleSnapshot.changeType}
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full border font-medium ${seniorityBadge(result.roleSnapshot.seniorityFit)}`}>
                    {result.roleSnapshot.seniorityFit} Fit
                  </span>
                </div>
              </div>
            </div>

            {/* Fit Assessment */}
            <div className="card">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Fit Assessment</p>
              <div className="space-y-3">
                {result.fitAssessment.map((item, i) => (
                  <div key={i} className={`rounded-xl border p-4 ${fitBorder(item.score)}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-slate-200">{item.requirement}</span>
                      <span className={`text-lg font-bold ${fitColor(item.score)}`}>{item.score}/5</span>
                    </div>
                    <p className="text-xs text-slate-400">{item.evidence}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* STAR Talking Points */}
            <div className="card">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">STAR Talking Points</p>
              <div className="space-y-3">
                {result.talkingPoints.map((tp, i) => (
                  <div key={i} className="border border-slate-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedTP(expandedTP === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                        <span className="text-sm font-semibold text-slate-200">{tp.angle}</span>
                      </div>
                      <ChevronRight size={14} className={`text-slate-500 transition-transform ${expandedTP === i ? 'rotate-90' : ''}`} />
                    </button>
                    {expandedTP === i && (
                      <div className="px-4 pb-4 space-y-3 border-t border-slate-700/50 pt-4">
                        {[
                          { label: 'S — Situation', text: tp.situation },
                          { label: 'T — Task', text: tp.task },
                          { label: 'A — Action', text: tp.action },
                          { label: 'R — Result', text: tp.result },
                        ].map(({ label, text }) => (
                          <div key={label}>
                            <p className="text-xs font-semibold text-gold-500/70 mb-1">{label}</p>
                            <p className="text-sm text-slate-300">{text}</p>
                          </div>
                        ))}
                        <div className="mt-2 pt-3 border-t border-slate-700/50">
                          <p className="text-xs font-semibold text-blue-400/70 mb-1">Link to JD</p>
                          <p className="text-xs text-slate-400">{tp.linkToJD}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Framework Angles */}
            <div className="card">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Framework Angles</p>
              <p className="text-xs text-slate-500 mb-4">STAR hook from Dell → Bridge to what you observed → How TRANSFORM™/OPERATE™ solves it → Application in this role</p>
              <div className="space-y-3">
                {result.frameworkAngles.map((fa, i) => (
                  <div key={i} className="border border-slate-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedFA(expandedFA === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/50 transition-colors"
                    >
                      <span className="text-sm font-semibold text-slate-200">{fa.jdRequirement}</span>
                      <ChevronRight size={14} className={`text-slate-500 shrink-0 transition-transform ${expandedFA === i ? 'rotate-90' : ''}`} />
                    </button>
                    {expandedFA === i && (
                      <div className="px-4 pb-4 space-y-3 border-t border-slate-700/50 pt-4">
                        {[
                          { label: 'STAR Hook (Dell)', color: 'text-gold-500/70', text: fa.starHook },
                          { label: 'Bridge Line', color: 'text-blue-400/70', text: fa.bridgeLine },
                          { label: 'Framework Positioning', color: 'text-purple-400/70', text: fa.frameworkPositioning },
                          { label: 'Forward Application', color: 'text-green-400/70', text: fa.forwardApplication },
                        ].map(({ label, color, text }) => (
                          <div key={label}>
                            <p className={`text-xs font-semibold ${color} mb-1`}>{label}</p>
                            <p className="text-sm text-slate-300">{text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Questions to Ask */}
            <div className="card">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Questions to Ask</p>
              <div className="space-y-4">
                {result.questionsToAsk.map((q, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <div>
                      <p className="text-sm text-slate-200 font-medium mb-1">"{q.question}"</p>
                      <p className="text-xs text-slate-500">{q.intent}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Watch-outs */}
            <div className="card border-red-500/20">
              <p className="text-xs font-semibold text-red-400/70 uppercase tracking-widest mb-4">Watch-outs & Tough Questions</p>
              <div className="space-y-4">
                {result.watchOuts.map((w, i) => (
                  <div key={i} className="border border-slate-700 rounded-xl p-4">
                    <p className="text-sm font-semibold text-red-400 mb-2">{w.gap}</p>
                    <p className="text-sm text-slate-300">{w.preparedAnswer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Attribution */}
            <div className="text-center pt-4 border-t border-slate-800">
              <p className="text-slate-600 text-xs">
                TRANSFORM™ and OPERATE™ are proprietary frameworks by{' '}
                <a href="/" className="text-slate-500 hover:text-gold-400 transition-colors">Selvakumar Jayakrishnan</a>.
                ADKAR® is a registered trademark of Prosci Inc.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
