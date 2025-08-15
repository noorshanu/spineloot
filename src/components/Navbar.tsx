
import { Button } from './Button'
import Container from './Container'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, Menu, Home, Gamepad2, Star, Coins, HelpCircle, MessageCircle, Trophy, Sparkles, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "#gameplay", label: "Gameplay", icon: Gamepad2 },
    { href: "#features", label: "Features", icon: Star },
    { href: "#tokenomics", label: "Tokenomics", icon: Coins },
    { href: "/airdrop", label: "Airdrop", icon: Trophy },
    { href: "#faq", label: "FAQ", icon: HelpCircle },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 border-b border-white/20 bg-casino-bg/80 backdrop-blur-md"
      >
        <Container className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-black tracking-wide">
            <img src="/logo.jpg" alt="SpinLoot" className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full" />
            <span className="text-casino-gold text-lg sm:text-xl">SpinLoot</span>
          </Link>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-white/80 hover:text-white transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8 text-white/80">
            <a href="#gameplay" className="hover:text-white transition-colors">Gameplay</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#tokenomics" className="hover:text-white transition-colors">Tokenomics</a>
            <Link to="/airdrop" className="hover:text-white transition-colors">Airdrop</Link>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          {/* Desktop buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button onClick={() => setShowModal(true)}>Launch Bot</Button>
          </div>
        </Container>
      </motion.nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-black/95 backdrop-blur-md border-l border-white/20 z-50 md:hidden"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <img src="/logo.jpg" alt="SpinLoot" className="w-10 h-10 rounded-full" />
                  <span className="text-casino-gold font-bold text-lg">SpinLoot</span>
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              {/* Navigation Items */}
              <div className="p-6 space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon
                  const isExternal = item.href.startsWith('#')
                  if (isExternal) {
                    return (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        onClick={closeMobileMenu}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-4 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                      >
                        <Icon className="w-5 h-5 text-casino-gold group-hover:scale-110 transition-transform" />
                        <span className="font-semibold">{item.label}</span>
                      </motion.a>
                    )
                  } else {
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={item.href}
                          onClick={closeMobileMenu}
                          className="flex items-center gap-4 p-4 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                        >
                          <Icon className="w-5 h-5 text-casino-gold group-hover:scale-110 transition-transform" />
                          <span className="font-semibold">{item.label}</span>
                        </Link>
                      </motion.div>
                    )
                  }
                })}
              </div>
              {/* Sidebar Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
                <Button className="w-full mb-4" onClick={() => setShowModal(true)}>🎰 Launch Bot</Button>
                <a
                  href="https://twitter.com/Spin_loot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-casino-blue/20 hover:bg-casino-blue/30 text-casino-blue hover:text-white transition-all duration-300 border border-casino-blue/30 hover:border-casino-blue/50"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-semibold">Join X</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Animated Modal for Launch Bot */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.7, opacity: 0, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative bg-gradient-to-br from-[#1a1a2e] via-[#23234d] to-[#111] border-4 border-yellow-400/40 rounded-3xl shadow-2xl p-8 w-[90vw] max-w-md flex flex-col items-center"
            >
              <button
                className="absolute top-3 right-3 text-yellow-400 hover:text-yellow-300 transition-colors text-2xl focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <X />
              </button>
              <motion.div
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="mb-4"
              >
                <Sparkles className="w-16 h-16 text-yellow-400 drop-shadow-glow animate-pulse" />
              </motion.div>
              <h2 className="text-3xl font-extrabold text-yellow-400 mb-2 text-center tracking-wide">Bot Launching Soon!</h2>
              <p className="text-white text-lg text-center mb-6">Our Telegram bot is coming soon.<br/>Follow us on Twitter for updates and thank you for your support!</p>
              <a
                href="https://x.com/Spin_Loot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-b from-[#FFD600] to-[#C9A900] text-black font-bold text-lg shadow hover:from-[#C9A900] hover:to-[#FFD600] transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
                @Spin_Loot
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
