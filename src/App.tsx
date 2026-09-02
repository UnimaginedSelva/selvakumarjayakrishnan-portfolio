import { useEffect } from 'react'
import { Routes, Route, useSearchParams } from 'react-router-dom'
import { scrollToSection } from './utils/scroll'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Frameworks from './components/Frameworks'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChangeReadiness from './pages/ChangeReadiness'
import JobIntelligence from './pages/JobIntelligence'
import ChangeReadinessGemini from './pages/ChangeReadinessGemini'
import JobIntelligenceGemini from './pages/JobIntelligenceGemini'
import Blog from './pages/Blog'
import Journey from './pages/Journey'
import TrendBulletin from './pages/TrendBulletin'

function Portfolio() {
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const scrollTarget = searchParams.get('scroll')
    if (scrollTarget) {
      setTimeout(() => scrollToSection(scrollTarget), 100)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-[#faf6ec] text-stone-900">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Frameworks />
      <Contact />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/change-readiness" element={<ChangeReadiness />} />
      <Route path="/job-intelligence" element={<JobIntelligence />} />
      <Route path="/change-readiness-gemini" element={<ChangeReadinessGemini />} />
      <Route path="/job-intelligence-gemini" element={<JobIntelligenceGemini />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<Blog />} />
      <Route path="/journey" element={<Journey />} />
      <Route path="/trend-bulletin" element={<TrendBulletin />} />
    </Routes>
  )
}
