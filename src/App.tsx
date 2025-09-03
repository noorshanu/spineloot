
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { WalletProvider } from './components/WalletProvider'
import { UserProvider } from './contexts/UserContext'
import { AirdropProvider } from './contexts/AirdropContext'
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
import ReferralPage from './pages/ReferralPage'
import WhitepaperPage from './pages/WhitepaperPage'
import SocialTasksPage from './pages/SocialTasksPage'
import DailySpinPage from './pages/DailySpinPage'
import DashboardPage from './pages/DashboardPage'
import DashboardLayout from './components/DashboardLayout'
import AstroLoader from './components/AstroLoader'
import AstroLoaderDemo from './components/AstroLoaderDemo'
import DebugInfo from './components/DebugInfo'

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
    <WalletProvider>
      <UserProvider>
        <AirdropProvider>
          {isLoading && <AstroLoader onComplete={handleLoaderComplete} />}
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/airdrop" element={<AirdropPage />} />
              <Route path="/ref/:referralCode" element={<AirdropPage />} />
              <Route path="/astro-loader-demo" element={<AstroLoaderDemo />} />
              
              {/* Dashboard Routes with Layout */}
              <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
              <Route path="/social" element={<DashboardLayout><SocialTasksPage /></DashboardLayout>} />
              <Route path="/daily-spin" element={<DashboardLayout><DailySpinPage /></DashboardLayout>} />
              <Route path="/whitepaper" element={<DashboardLayout><WhitepaperPage /></DashboardLayout>} />
              <Route path="/referral" element={<DashboardLayout><ReferralPage /></DashboardLayout>} />
            </Routes>
          </Router>
          <DebugInfo />
        </AirdropProvider>
      </UserProvider>
    </WalletProvider>
  )
}
