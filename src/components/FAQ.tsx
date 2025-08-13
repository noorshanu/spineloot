
import Section from './Section'
import Container from './Container'
import { motion } from 'framer-motion'
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react'

const QA = [
  { 
    q: "Are the payouts real?", 
    a: "Absolutely! Non-custodial payouts on Solana — win = instant payout. Every payout goes directly to your wallet, no middleman involved!" 
  },
  { 
    q: "How do I get free daily spins?", 
    a: "One free spin every day — maintain your streak and earn bonus spins. 7-day streak = 3x bonus spins!" 
  },
  { 
    q: "What does 'provably fair' mean?", 
    a: "RNG on-chain with smart contracts for verifiable outcomes. Everything is transparent - you can verify every spin result." 
  },
  { 
    q: "What is $SPIN used for?", 
    a: "Spins, loot store, staking (revenue share), governance votes, and rewards. Strong token utility!" 
  },
  { 
    q: "What are the minimum spins?", 
    a: "Free spin = $0, Mini spin = 0.1 SOL / 50 $SPIN, Mega spin = 0.5 SOL / 250 $SPIN, Lootbox = 1 SOL / 500 $SPIN." 
  },
  { 
    q: "How big can the jackpot be?", 
    a: "Jackpot is dynamic - builds from community spins. Current record: 50 SOL! 🎉" 
  },
  { 
    q: "How does the referral system work?", 
    a: "Invite friends, earn 5% commission from their spins + free spins. Win-win situation!" 
  },
  { 
    q: "How do I get NFTs?", 
    a: "NFTs are found in rare spins and lootboxes. These NFTs can improve your spin odds!" 
  },
  { 
    q: "How is security ensured?", 
    a: "Audited smart contracts, non-custodial design, and Solana's security. Your funds never touch our wallets." 
  },
  { 
    q: "What are the leaderboard rewards?", 
    a: "Weekly top 10 players get bonus $SPIN, exclusive NFTs, and special spin multipliers!" 
  }
]

export default function FAQ() {
  return (
    <Section id="faq" className="relative overflow-hidden bg-black/80 backdrop-blur-md" >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid bg-[length:20px_20px] opacity-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-casino-red/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-casino-gold/10 rounded-full blur-3xl" />
      
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-casino-gold/30 px-4 py-2 text-casino-gold bg-casino-gold/10 mb-4">
            <HelpCircle className="w-5 h-5" />
            <span className="text-sm font-semibold">Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Got Questions?</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Everything you need to know about SpinLoot - from gameplay to payouts, we've got you covered!
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {QA.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: i * 0.1,
                duration: 0.5,
                type: 'spring',
                stiffness: 100
              }}
              className="group"
            >
              <details className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:shadow-glow cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-lg group-hover:text-casino-gold transition-colors duration-300">
                  <span className="pr-4">{item.q}</span>
                  <motion.div
                    className="text-casino-gold"
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform duration-300" />
                  </motion.div>
                </summary>
                <motion.p 
                  className="mt-4 text-white/80 leading-relaxed"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  {item.a}
                </motion.p>
              </details>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-12"
        >
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-white/70 mb-6">
              Join our Telegram community and get instant answers from our team and community!
            </p>
            <motion.a
              href="https://t.me/spineloot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-casino-blue/20 hover:bg-casino-blue/30 text-casino-blue hover:text-white transition-all duration-300 border border-casino-blue/30 hover:border-casino-blue/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold">Join Telegram Community</span>
            </motion.a>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
