
import { motion } from 'framer-motion'
import Section from './Section'
import { Button } from './Button'
import { HERO } from '@/data/content'
import Container from './Container'
import { StatCard } from './StatCard'
import { Twitter, MessageCircle } from 'lucide-react'

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-radial-red">
      <div className="absolute inset-0 bg-radial-gold pointer-events-none" />
      <Section>
        <Container className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-white/70 mb-4 bg-white/5">
              <span>Powered by</span> <span className="font-bold text-casino-blue">Solana ⚡</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black leading-[1.05]">
              {HERO.title}
            </h1>
            <p className="mt-4 text-lg text-white/80">{HERO.punch}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button>{HERO.ctaPrimary}</Button>
              <Button variant="ghost">{HERO.ctaSecondary}</Button>
            </div>
            
            {/* Social Media Icons */}
            <div className="mt-8 flex items-center gap-4">
              <motion.a
                href="https://twitter.com/spineloot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-300 border border-white/20 hover:border-white/40"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="w-5 h-5" />
                <span className="font-semibold">Follow on X</span>
              </motion.a>
              
              <motion.a
                href="https://t.me/spineloot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-casino-blue/20 hover:bg-casino-blue/30 text-casino-blue hover:text-white transition-all duration-300 border border-casino-blue/30 hover:border-casino-blue/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-semibold">Join Telegram</span>
              </motion.a>
            </div>
            {/* <div className="mt-10 grid grid-cols-3 gap-4">
              <StatCard kpi="⚡ Instant" label="Payouts" />
              <StatCard kpi="🌀 Daily" label="Free Spin" />
              <StatCard kpi="🔒 Audited" label="Contracts" />
            </div> */}
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            className="relative"
          >
            <div className="aspect-square w-full max-w-[520px] mx-auto glass rounded-3xl p-6 shadow-glow relative">
              <Wheel />
              <img src="/casino.png" alt="SpinLoot" className="absolute top-24 left-28 w-[300px] right-0 animate-spin-slow" />
            </div>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}

function Wheel() {
  // Decorative wheel (placeholder) – not a real RNG. Good for landing visuals.
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 rounded-2xl bg-grid bg-[length:18px_18px] opacity-20" />
      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full border-8 border-white/10 bg-gradient-to-br from-casino-red/70 via-casino-gold/40 to-transparent animate-spin-slow" />
        <Pointer />
      </div>
      <style>{`
        .animate-spin-slow { animation: spin 10s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

function Pointer() {
  return (
    <div className="absolute -top-1 left-1/2 -translate-x-1/2">
      <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-white/80 drop-shadow" />
    </div>
  )
}
