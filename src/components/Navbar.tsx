
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Menu, X, Rocket, Star } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-astro-bg/90 backdrop-blur-md border-b border-astro-primary/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative"
            >
              <img 
                src="/logo.jpg" 
                alt="SpinLoot" 
                className="w-10 h-10 rounded-full border-2 border-astro-primary/30 group-hover:border-astro-primary/60 transition-colors"
              />
              <div className="absolute inset-0 rounded-full bg-astro-primary/20 blur-sm group-hover:bg-astro-primary/30 transition-colors" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-astro-primary font-black text-xl tracking-wide astro-text">
                SpinLoot
              </span>
              <span className="text-white/60 text-xs">Space Gaming</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#tokenomics">Tokenomics</NavLink>
            <NavLink href="#faq">FAQ</NavLink>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/airdrop"
                className="px-6 py-2 rounded-full bg-gradient-to-r from-astro-primary to-astro-secondary text-white font-semibold border border-astro-primary/50 hover:shadow-neon transition-all duration-300 glow-effect"
              >
                <Rocket className="w-4 h-4 inline mr-2" />
                Join Airdrop
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-astro-panel/50 border border-astro-primary/20 text-astro-primary hover:bg-astro-panel/70 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-astro-bg/95 backdrop-blur-md border-t border-astro-primary/20"
          >
            <div className="px-4 py-6 space-y-4">
              <MobileNavLink href="#features" onClick={() => setIsOpen(false)}>
                Features
              </MobileNavLink>
              <MobileNavLink href="#tokenomics" onClick={() => setIsOpen(false)}>
                Tokenomics
              </MobileNavLink>
              <MobileNavLink href="#faq" onClick={() => setIsOpen(false)}>
                FAQ
              </MobileNavLink>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-4"
              >
                <Link
                  to="/airdrop"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-6 py-3 rounded-full bg-gradient-to-r from-astro-primary to-astro-secondary text-white font-semibold border border-astro-primary/50 hover:shadow-neon transition-all duration-300 text-center glow-effect"
                >
                  <Rocket className="w-4 h-4 inline mr-2" />
                  Join Airdrop
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-astro-accent rounded-full star"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: '50%'
            }}
          />
        ))}
      </div>
    </motion.nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      className="text-white/80 hover:text-astro-primary transition-colors duration-300 font-medium relative group"
      whileHover={{ y: -2 }}
    >
      {children}
      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-astro-primary group-hover:w-full transition-all duration-300" />
    </motion.a>
  )
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className="block text-white/80 hover:text-astro-primary transition-colors duration-300 font-medium py-2 border-b border-astro-primary/10"
      whileHover={{ x: 5 }}
    >
      {children}
    </motion.a>
  )
}
