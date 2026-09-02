import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Loader2, CheckCircle2, AlertTriangle, ChevronRight, Download, Briefcase } from 'lucide-react'

// Gemini-powered alongside build of JobIntelligence.tsx — same UI/UX and prompt logic,
// posts to /api/job-intel-gemini instead of /api/job-intel so outputs can be compared side by side.

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
  if (score >= 4) return 'text-amber-700';
  if (score === 3) return 'text-blue-700';
  return 'text-red-700';
}

function fitBorder(score: number) {
  if (score >= 4) return 'border-amber-300 bg-amber-50';
  if (score === 3) return 'border-blue-300 bg-blue-50';
  return 'border-red-300 bg-red-50';
}

function seniorityBadge(s: string) {
  if (s === 'Strong') return 'bg-amber-100 text-amber-800 border-amber-200';
  if (s === 'Moderate') return 'bg-blue-100 text-blue-700 border-blue-200';
  return 'bg-amber-100 text-amber-800 border-amber-200';
}

function changeTypeBadge(t: string) {
  if (t === 'AI/Digital Transformation') return 'bg-purple-100 text-purple-700 border-purple-200';
  if (t === 'Both') return 'bg-amber-100 text-amber-800 border-amber-200';
  return 'bg-stone-100 text-stone-700 border-stone-300';
}

export default function JobIntelligenceGemini() {
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
        fetch('/api/job-intel-gemini', {
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
    <div className="min-h-screen bg-[#faf6ec] text-stone-900">
      {/* Header */}
      <div className="no-print border-b border-stone-200 bg-[#faf6ec]/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/" className="text-stone-500 hover:text-amber-700 transition-colors flex items-center gap-1 text-sm">
            <ArrowLeft size={15} />
            Back to Portfolio
          </Link>
          <span className="text-stone-300">|</span>
          <span className="text-stone-700 font-medium text-sm">Job Intelligence Agent</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 text-blue-700 text-xs px-4 py-1.5 rounded-full mb-6 font-medium tracking-wide">
            AI AGENT · INTERVIEW PREPARATION · GEMINI
          </div>
          <h1 className="text-4xl font-bold text-stone-900 mb-3">
            Job Intelligence Agent <span className="text-blue-700">(Gemini)</span>
          </h1>
          <p className="text-stone-500 text-lg max-w-xl mx-auto mb-2">
            Paste a job description. Get a personalised interview brief in seconds — running on Google Gemini.
          </p>
          <p className="text-stone-500 text-sm max-w-lg mx-auto">
            STAR talking points · Framework angles · Questions to ask · Watch-outs — all tailored to your background.
          </p>
        </div>

        {/* Input */}
        {!result && (
          <div className="space-y-4 mb-6">
            <div className="card">
              <label className="block text-sm font-medium text-stone-700 mb-3">Job Description <span className="text-amber-700">*</span></label>
              <textarea
                value={jd}
                onChange={e => setJd(e.target.value)}
                placeholder="Paste the full job description here — title, responsibilities, requirements..."
                rows={8}
                disabled={loading}
                className="w-full bg-white border border-stone-300 rounded-lg p-4 text-stone-900 placeholder-stone-400 text-sm resize-none focus:outline-none focus:border-amber-600/70 transition-colors disabled:opacity-50"
              />
            </div>
            <div className="card">
              <label className="block text-sm font-medium text-stone-700 mb-1">Company Context <span className="text-stone-400 font-normal">(optional but sharpens the output)</span></label>
              <p className="text-xs text-stone-500 mb-3">Paste the company's About page, LinkedIn summary, recent news, or anything that gives context.</p>
              <textarea
                value={companyContext}
                onChange={e => setCompanyContext(e.target.value)}
                placeholder="Company overview, mission, recent initiatives, culture notes..."
                rows={4}
                disabled={loading}
                className="w-full bg-white border border-stone-300 rounded-lg p-4 text-stone-900 placeholder-stone-400 text-sm resize-none focus:outline-none focus:border-amber-600/70 transition-colors disabled:opacity-50"
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 flex items-center gap-1.5">
                <AlertTriangle size={14} /> {error}
              </p>
            )}
            <div className="flex justify-end">
              <button
                onClick={runIntel}
                disabled={loading || jd.trim().length < 30}
                className="flex items-center gap-2 bg-amber-700 hover:bg-amber-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
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
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-4">Agent Processing</p>
            <div className="space-y-3">
              {STEPS.map((step, i) => {
                const done = completedSteps.includes(i);
                const active = currentStep === i && !done;
                return (
                  <div key={i} className={`flex items-center gap-3 transition-opacity ${i > currentStep && !done ? 'opacity-30' : 'opacity-100'}`}>
                    {done ? <CheckCircle2 size={16} className="text-amber-700 shrink-0" />
                      : active ? <Loader2 size={16} className="animate-spin text-blue-700 shrink-0" />
                      : <div className="w-4 h-4 rounded-full border border-stone-300 shrink-0" />}
                    <span className={`text-sm ${done ? 'text-stone-600' : active ? 'text-stone-900' : 'text-stone-400'}`}>{step}</span>
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
                className="text-sm text-stone-500 hover:text-amber-700 transition-colors flex items-center gap-1">
                <ArrowLeft size={13} /> New brief
              </button>
              <button
                onClick={() => {
                  const prevTitle = document.title;
                  const prevTP = expandedTP;
                  const prevFA = expandedFA;
                  const _nd = new Date(); const _ds = `${_nd.getFullYear()}-${String(_nd.getMonth()+1).padStart(2,'0')}-${String(_nd.getDate()).padStart(2,'0')}`;
                  document.title = `Interview_Brief_Gemini_${result.roleSnapshot.company.replace(/\s+/g, '_')}_${_ds}`;
                  // Expand all accordions so every section appears in the PDF
                  setExpandedTP(-1);
                  setExpandedFA(-1);
                  setTimeout(() => {
                    window.print();
                    window.addEventListener('afterprint', () => {
                      document.title = prevTitle;
                      setExpandedTP(prevTP);
                      setExpandedFA(prevFA);
                    }, { once: true });
                  }, 80);
                }}
                className="flex items-center gap-2 bg-white hover:bg-stone-50 border border-stone-300 text-stone-600 hover:text-amber-700 px-4 py-2 rounded-lg text-sm transition-colors"
              >
                <Download size={14} /> Download PDF
              </button>
            </div>

            {/* Role Snapshot */}
            <div className="card">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-4">Role Snapshot</p>
              {/* Verdict Banner */}
              {result.roleSnapshot.verdict && (() => {
                const v = result.roleSnapshot.verdict;
                const isApply = v === 'Apply';
                const isCaution = v === 'Apply with Caution';
                const bannerClass = isApply
                  ? 'bg-emerald-100 border border-emerald-200 text-emerald-800'
                  : isCaution
                  ? 'bg-amber-100 border border-amber-200 text-amber-800'
                  : 'bg-red-100 border border-red-200 text-red-800';
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
                  <h2 className="text-xl font-bold text-stone-900 mb-1">{result.roleSnapshot.title}</h2>
                  <p className="text-amber-700 font-medium mb-3">{result.roleSnapshot.company}</p>
                  <p className="text-sm text-stone-600">{result.roleSnapshot.fitSummary}</p>
                  {result.roleSnapshot.locationNote && (
                    <p className="text-xs text-stone-500 mt-2">{result.roleSnapshot.locationNote}</p>
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
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-4">Fit Assessment</p>
              <div className="space-y-3">
                {result.fitAssessment.map((item, i) => (
                  <div key={i} className={`rounded-xl border p-4 ${fitBorder(item.score)}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-stone-800">{item.requirement}</span>
                      <span className={`text-lg font-bold ${fitColor(item.score)}`}>{item.score}/5</span>
                    </div>
                    <p className="text-xs text-stone-500">{item.evidence}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* STAR Talking Points */}
            <div className="card">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-4">STAR Talking Points</p>
              <div className="space-y-3">
                {result.talkingPoints.map((tp, i) => (
                  <div key={i} className="border border-stone-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedTP(expandedTP === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-stone-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                        <span className="text-sm font-semibold text-stone-800">{tp.angle}</span>
                      </div>
                      <ChevronRight size={14} className={`text-stone-400 transition-transform ${expandedTP === i ? 'rotate-90' : ''}`} />
                    </button>
                    {(expandedTP === -1 || expandedTP === i) && (
                      <div className="px-4 pb-4 space-y-3 border-t border-stone-200 pt-4">
                        {[
                          { label: 'S — Situation', text: tp.situation },
                          { label: 'T — Task', text: tp.task },
                          { label: 'A — Action', text: tp.action },
                          { label: 'R — Result', text: tp.result },
                        ].map(({ label, text }) => (
                          <div key={label}>
                            <p className="text-xs font-semibold text-amber-800/80 mb-1">{label}</p>
                            <p className="text-sm text-stone-600">{text}</p>
                          </div>
                        ))}
                        <div className="mt-2 pt-3 border-t border-stone-200">
                          <p className="text-xs font-semibold text-blue-700/80 mb-1">Link to JD</p>
                          <p className="text-xs text-stone-500">{tp.linkToJD}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Framework Angles */}
            <div className="card">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-1">Framework Angles</p>
              <p className="text-xs text-stone-500 mb-4">STAR hook from Dell → Bridge to what you observed → How TRANSFORM™/OPERATE™ solves it → Application in this role</p>
              <div className="space-y-3">
                {result.frameworkAngles.map((fa, i) => (
                  <div key={i} className="border border-stone-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedFA(expandedFA === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-stone-50 transition-colors"
                    >
                      <span className="text-sm font-semibold text-stone-800">{fa.jdRequirement}</span>
                      <ChevronRight size={14} className={`text-stone-400 shrink-0 transition-transform ${expandedFA === i ? 'rotate-90' : ''}`} />
                    </button>
                    {(expandedFA === -1 || expandedFA === i) && (
                      <div className="px-4 pb-4 space-y-3 border-t border-stone-200 pt-4">
                        {[
                          { label: 'STAR Hook (Dell)', color: 'text-amber-800/80', text: fa.starHook },
                          { label: 'Bridge Line', color: 'text-blue-700/80', text: fa.bridgeLine },
                          { label: 'Framework Positioning', color: 'text-purple-700/80', text: fa.frameworkPositioning },
                          { label: 'Forward Application', color: 'text-green-700/80', text: fa.forwardApplication },
                        ].map(({ label, color, text }) => (
                          <div key={label}>
                            <p className={`text-xs font-semibold ${color} mb-1`}>{label}</p>
                            <p className="text-sm text-stone-600">{text}</p>
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
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-4">Questions to Ask</p>
              <div className="space-y-4">
                {result.questionsToAsk.map((q, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <div>
                      <p className="text-sm text-stone-800 font-medium mb-1">"{q.question}"</p>
                      <p className="text-xs text-stone-500">{q.intent}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Watch-outs */}
            <div className="card border-red-200">
              <p className="text-xs font-semibold text-red-700/80 uppercase tracking-widest mb-4">Watch-outs & Tough Questions</p>
              <div className="space-y-4">
                {result.watchOuts.map((w, i) => (
                  <div key={i} className="border border-stone-200 rounded-xl p-4">
                    <p className="text-sm font-semibold text-red-700 mb-2">{w.gap}</p>
                    <p className="text-sm text-stone-600">{w.preparedAnswer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Attribution */}
            <div className="text-center pt-4 border-t border-stone-200">
              <p className="text-stone-400 text-xs mb-2">
                Prefer the Claude-powered version?{' '}
                <Link to="/job-intelligence" className="text-stone-500 hover:text-amber-700 transition-colors">Try the original Job Intelligence Agent</Link>.
              </p>
              <p className="text-stone-400 text-xs">
                TRANSFORM™ and OPERATE™ are proprietary frameworks by{' '}
                <a href="/" className="text-stone-500 hover:text-amber-700 transition-colors">Selvakumar Jayakrishnan</a>.
                ADKAR® is a registered trademark of Prosci Inc.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
