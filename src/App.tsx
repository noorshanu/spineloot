
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Gameplay from './components/Gameplay'
import Tokenomics from './components/Tokenomics'
import Leaderboard from './components/Leaderboard'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import Aboutus from './components/Aboutus'
import Cta from './components/Cta'
import Postersection from './components/Postersection'
import AirdropPage from './pages/AirdropPage'
import AstroLoader from './components/AstroLoader'
import AstroLoaderDemo from './components/AstroLoaderDemo'

function HomePage() {
  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <Hero />
      <Features />
      <Aboutus />
      <Postersection />
      {/* <Gameplay /> */}
      <Tokenomics />
      <Cta />
      {/* <Leaderboard /> */}
      <FAQ />
      <Footer />
    </div>
  )
}

export function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoaderComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <AstroLoader onComplete={handleLoaderComplete} />}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/airdrop" element={<AirdropPage />} />
          <Route path="/astro-loader-demo" element={<AstroLoaderDemo />} />
        </Routes>
      </Router>
    </>
  )
}
