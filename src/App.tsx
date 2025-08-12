
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Gameplay from './components/Gameplay'
import Tokenomics from './components/Tokenomics'
import Leaderboard from './components/Leaderboard'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import Aboutus from './components/Aboutus'

export function App() {
  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <Hero />
      <Features />
      <Aboutus />
      {/* <Gameplay /> */}
      <Tokenomics />
      <Leaderboard />
      <FAQ />
      <Footer />
    </div>
  )
}
