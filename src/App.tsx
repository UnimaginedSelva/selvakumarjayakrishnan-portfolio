import { Routes, Route } from 'react-router-dom'
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
import Author from './pages/Author'
import Blog from './pages/Blog'
import Journey from './pages/Journey'

function Portfolio() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
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
      <Route path="/author" element={<Author />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/journey" element={<Journey />} />
    </Routes>
  )
}
