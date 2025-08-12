
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import AirdropPage from './pages/AirdropPage'

function HomePage() {
  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <Hero />
      <Features />
      <Aboutus />
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
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/airdrop" element={<AirdropPage />} />
      </Routes>
    </Router>
  )
}
