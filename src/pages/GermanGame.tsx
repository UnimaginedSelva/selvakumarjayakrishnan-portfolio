import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, Flame, Heart, Trophy, RotateCcw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { levels, gameSource, type GameLevel, type VocabItem, type VerbItem } from '../data/germanGame'

const PROGRESS_KEY = 'german-game-progress'
const ROUND_SIZE = 8
const START_HEARTS = 5

interface Progress {
  [levelId: string]: { bestScore: number; playCount: number }
}

function loadProgress(): Progress {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveProgress(levelId: string, scorePct: number) {
  const p = loadProgress()
  const existing = p[levelId]
  p[levelId] = {
    bestScore: existing ? Math.max(existing.bestScore, scorePct) : scorePct,
    playCount: (existing?.playCount ?? 0) + 1,
  }
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p))
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const PRONOUN_LABELS: Record<string, string> = {
  ich: 'ich', du: 'du', erSieEs: 'er/sie/es', wir: 'wir', ihr: 'ihr', sie: 'sie',
}

type Question =
  | { kind: 'mc-de-en'; prompt: string; pronunciation?: string; correct: string; options: string[] }
  | { kind: 'mc-en-de'; prompt: string; correct: string; options: string[] }
  | { kind: 'typed-en'; prompt: string; pronunciation?: string; correct: string }
  | { kind: 'mc-verb'; prompt: string; correct: string; options: string[] }

function buildQuestions(level: GameLevel, allLevels: GameLevel[]): Question[] {
  const items = shuffle(level.items).slice(0, ROUND_SIZE)

  if (level.type === 'verb') {
    const verbPool = allLevels.find(l => l.type === 'verb')!.items as VerbItem[]
    return items.map(item => {
      const v = item as VerbItem
      const pronounKeys = Object.keys(v.conjugations) as (keyof VerbItem['conjugations'])[]
      const pronoun = pronounKeys[Math.floor(Math.random() * pronounKeys.length)]
      const correct = v.conjugations[pronoun]
      const distractorPool = shuffle(
        verbPool.filter(o => o.infinitive !== v.infinitive).map(o => o.conjugations[pronoun])
      ).slice(0, 3)
      const options = shuffle([correct, ...distractorPool])
      return {
        kind: 'mc-verb',
        prompt: `${v.infinitive} (${v.english}) — ${PRONOUN_LABELS[pronoun]}?`,
        correct,
        options,
      }
    })
  }

  const pool = allLevels.filter(l => l.type === level.type).flatMap(l => l.items) as VocabItem[]
  return items.map(item => {
    const v = item as VocabItem
    const useTyped = Math.random() < 0.35
    if (useTyped) {
      return { kind: 'typed-en', prompt: v.german, pronunciation: v.pronunciation, correct: v.english }
    }
    const showGerman = Math.random() < 0.6
    if (showGerman) {
      const distractors = shuffle(pool.filter(o => o.german !== v.german).map(o => o.english)).slice(0, 3)
      return {
        kind: 'mc-de-en',
        prompt: v.german,
        pronunciation: v.pronunciation,
        correct: v.english,
        options: shuffle([v.english, ...distractors]),
      }
    } else {
      const distractors = shuffle(pool.filter(o => o.german !== v.german).map(o => o.german)).slice(0, 3)
      return {
        kind: 'mc-en-de',
        prompt: v.english,
        correct: v.german,
        options: shuffle([v.german, ...distractors]),
      }
    }
  })
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[.!?]/g, '')
    .replace(/\s+/g, ' ')
}

function LevelSelect({ progress, onSelect }: { progress: Progress; onSelect: (level: GameLevel) => void }) {
  const navigate = useNavigate()
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 text-stone-500 hover:text-amber-800 transition-colors text-sm mb-8">
        <ArrowLeft size={14} /> Back to Portfolio
      </button>
      <p className="text-amber-700/80 text-xs uppercase tracking-widest mb-3 font-sans">Learn a Language</p>
      <h1 className="font-reading text-stone-900 text-4xl font-bold leading-tight mb-2">German Drills</h1>
      <p className="text-stone-500 text-base mb-10 max-w-xl">
        Vocabulary, verbs, and everyday phrases turned into quick quiz rounds — built from <em>{gameSource.title}</em> by {gameSource.author}.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {levels.map(level => {
          const prog = progress[level.id]
          return (
            <button
              key={level.id}
              onClick={() => onSelect(level)}
              className="text-left bg-white border border-stone-200 hover:border-amber-300 rounded-2xl p-5 transition-all shadow-sm hover:shadow-md group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-700/80 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                  {level.type === 'vocab' ? 'Vocabulary' : level.type === 'verb' ? 'Grammar' : 'Phrases'}
                </span>
                {prog && (
                  <span className="flex items-center gap-1 text-xs text-amber-700 font-sans font-semibold">
                    <Trophy size={12} /> {prog.bestScore}%
                  </span>
                )}
              </div>
              <h3 className="font-reading text-stone-900 font-semibold text-lg mb-1 group-hover:text-amber-800 transition-colors">
                {level.title}
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">{level.description}</p>
              <p className="text-stone-400 text-xs mt-3 font-sans">{level.items.length} items</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function PlayRound({ level, onFinish, onQuit }: { level: GameLevel; onFinish: (correct: number, total: number) => void; onQuit: () => void }) {
  const questions = useMemo(() => buildQuestions(level, levels), [level])
  const [qIndex, setQIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [streak, setStreak] = useState(0)
  const [hearts, setHearts] = useState(START_HEARTS)
  const [selected, setSelected] = useState<string | null>(null)
  const [typedValue, setTypedValue] = useState('')
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)

  const q = questions[qIndex]

  function handleAnswer(isCorrect: boolean, chosen: string) {
    if (feedback) return
    setSelected(chosen)
    setFeedback(isCorrect ? 'correct' : 'wrong')
    if (isCorrect) {
      setCorrectCount(c => c + 1)
      setStreak(s => s + 1)
    } else {
      setStreak(0)
      setHearts(h => Math.max(0, h - 1))
    }
  }

  function next() {
    setSelected(null)
    setTypedValue('')
    setFeedback(null)
    if (qIndex + 1 >= questions.length || hearts <= 0) {
      onFinish(correctCount, questions.length)
    } else {
      setQIndex(i => i + 1)
    }
  }

  function submitTyped() {
    if (!q || q.kind !== 'typed-en' || feedback) return
    handleAnswer(normalize(typedValue) === normalize(q.correct), typedValue)
  }

  if (hearts <= 0 && !feedback) {
    onFinish(correctCount, questions.length)
    return null
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-14">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onQuit} className="text-stone-400 hover:text-stone-600 transition-colors text-sm font-sans">
          &larr; Quit
        </button>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-amber-700 text-sm font-sans font-semibold">
            <Flame size={15} /> {streak}
          </span>
          <span className="flex items-center gap-1 text-rose-600 text-sm font-sans font-semibold">
            <Heart size={15} fill="currentColor" /> {hearts}
          </span>
        </div>
      </div>

      <div className="flex gap-[3px] h-1 mb-10">
        {questions.map((_, i) => (
          <div key={i} className={`flex-1 rounded-full ${i < qIndex ? 'bg-amber-600' : i === qIndex ? 'bg-amber-700' : 'bg-stone-200'}`} />
        ))}
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
        {q.kind === 'mc-verb' ? (
          <>
            <p className="text-stone-400 text-xs uppercase tracking-wide font-sans mb-3">Conjugate</p>
            <h2 className="font-reading text-stone-900 text-2xl font-semibold mb-8">{q.prompt}</h2>
          </>
        ) : (
          <>
            <p className="text-stone-400 text-xs uppercase tracking-wide font-sans mb-3">
              {q.kind === 'mc-en-de' ? 'Say it in German' : 'What does this mean?'}
            </p>
            <h2 className="font-reading text-stone-900 text-3xl font-semibold mb-1">{q.prompt}</h2>
            {'pronunciation' in q && q.pronunciation && (
              <p className="text-stone-400 text-sm italic mb-7">{q.pronunciation}</p>
            )}
            {!('pronunciation' in q) && <div className="mb-7" />}
          </>
        )}

        {q.kind === 'typed-en' ? (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={typedValue}
              onChange={e => setTypedValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (feedback ? next() : submitTyped())}
              disabled={!!feedback}
              placeholder="Type the English meaning…"
              className="border border-stone-300 focus:border-amber-500 outline-none rounded-lg px-4 py-3 font-sans text-stone-800"
              autoFocus
            />
            {feedback && (
              <p className={`text-sm font-sans ${feedback === 'correct' ? 'text-emerald-700' : 'text-rose-600'}`}>
                {feedback === 'correct' ? 'Correct!' : `Correct answer: ${q.correct}`}
              </p>
            )}
            {!feedback && (
              <button onClick={submitTyped} className="self-start bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors font-sans">
                Check
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-3">
            {q.options.map(opt => {
              const isCorrectOpt = opt === q.correct
              const isSelected = opt === selected
              let cls = 'border-stone-200 hover:border-amber-300 text-stone-800'
              if (feedback && isCorrectOpt) cls = 'border-emerald-400 bg-emerald-50 text-emerald-800'
              else if (feedback && isSelected && !isCorrectOpt) cls = 'border-rose-300 bg-rose-50 text-rose-700'
              return (
                <button
                  key={opt}
                  onClick={() => handleAnswer(isCorrectOpt, opt)}
                  disabled={!!feedback}
                  className={`text-left border rounded-xl px-4 py-3 font-sans text-[15px] transition-colors ${cls}`}
                >
                  {opt}
                </button>
              )
            })}
          </div>
        )}

        {feedback && q.kind !== 'typed-en' && (
          <button onClick={next} className="mt-6 w-full bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold py-3 rounded-lg transition-colors font-sans">
            Continue
          </button>
        )}
        {feedback && q.kind === 'typed-en' && (
          <button onClick={next} className="mt-4 w-full bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold py-3 rounded-lg transition-colors font-sans">
            Continue
          </button>
        )}
      </div>

      <p className="text-center text-stone-400 text-xs mt-6 font-sans">Question {qIndex + 1} of {questions.length}</p>
    </div>
  )
}

function Results({ level, correct, total, onReplay, onBack }: { level: GameLevel; correct: number; total: number; onReplay: () => void; onBack: () => void }) {
  const pct = Math.round((correct / total) * 100)
  return (
    <div className="max-w-md mx-auto px-6 py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center mx-auto mb-6">
        <Trophy size={26} className="text-amber-700" />
      </div>
      <h1 className="font-reading text-stone-900 text-3xl font-bold mb-2">{pct}%</h1>
      <p className="text-stone-500 mb-1">{correct} of {total} correct</p>
      <p className="text-stone-400 text-sm mb-10">{level.title}</p>
      <div className="flex items-center justify-center gap-3">
        <button onClick={onReplay} className="flex items-center gap-2 border border-stone-200 hover:border-amber-300 text-stone-700 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors font-sans">
          <RotateCcw size={14} /> Try Again
        </button>
        <button onClick={onBack} className="bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors font-sans">
          Back to Levels
        </button>
      </div>
    </div>
  )
}

export default function GermanGame() {
  const [progress, setProgress] = useState<Progress>({})
  const [activeLevel, setActiveLevel] = useState<GameLevel | null>(null)
  const [attempt, setAttempt] = useState(0)
  const [screen, setScreen] = useState<'select' | 'play' | 'results'>('select')
  const [lastResult, setLastResult] = useState<{ correct: number; total: number } | null>(null)

  useEffect(() => {
    setProgress(loadProgress())
  }, [])

  function startLevel(level: GameLevel) {
    setActiveLevel(level)
    setAttempt(a => a + 1)
    setScreen('play')
  }

  function finishRound(correct: number, total: number) {
    if (activeLevel) saveProgress(activeLevel.id, Math.round((correct / total) * 100))
    setProgress(loadProgress())
    setLastResult({ correct, total })
    setScreen('results')
  }

  return (
    <div className="min-h-screen bg-[#faf6ec]">
      {screen === 'select' && <LevelSelect progress={progress} onSelect={startLevel} />}
      {screen === 'play' && activeLevel && (
        <PlayRound key={`${activeLevel.id}-${attempt}`} level={activeLevel} onFinish={finishRound} onQuit={() => setScreen('select')} />
      )}
      {screen === 'results' && activeLevel && lastResult && (
        <Results
          level={activeLevel}
          correct={lastResult.correct}
          total={lastResult.total}
          onReplay={() => { setAttempt(a => a + 1); setScreen('play') }}
          onBack={() => setScreen('select')}
        />
      )}
    </div>
  )
}
