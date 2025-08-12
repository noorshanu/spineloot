
import { Button } from './Button'
import Container from './Container'
import { motion } from 'framer-motion'

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-white/20 bg-casino-bg/80 backdrop-blur-md"
    >
      <Container className="flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2 font-black tracking-wide">
          <img src="/logo.jpg" alt="SpinLoot" className="w-20 h-20 rounded-full" />
          <span className="text-casino-gold text-xl">SpinLoot</span>
         
        </a>
        <div className="hidden md:flex items-center gap-8 text-white/80">
          <a href="#gameplay" className="hover:text-white">Gameplay</a>
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#tokenomics" className="hover:text-white">Tokenomics</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost">Docs</Button>
          <Button>Launch Bot</Button>
        </div>
      </Container>
    </motion.nav>
  )
}
