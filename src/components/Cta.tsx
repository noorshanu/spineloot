import React from 'react'
import { motion } from 'framer-motion'
import Section from './Section'
import Container from './Container'
import { Button } from './Button'
import { Zap, Trophy, Star, ArrowRight } from 'lucide-react'

const Cta = () => {
  return (
    <Section id="cta" className="relative overflow-hidden bg-black/12 backdrop-blur-sm">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid bg-[length:20px_20px] opacity-10" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-casino-red/20 via-transparent to-casino-gold/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-casino-red/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-casino-gold/10 rounded-full blur-3xl animate-pulse" />
      
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-casino-gold/30 px-4 py-2 text-casino-gold bg-casino-gold/10 mb-6">
              <Trophy className="w-5 h-5" />
              <span className="text-sm font-semibold">Ready to Win Big?</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
              Your Next{' '}
              <span className="bg-gradient-to-r from-casino-gold via-yellow-400 to-casino-red bg-clip-text text-transparent">
                Big Win
              </span>
              {' '}Awaits!
            </h2>
            
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed">
              Join thousands of players already spinning and winning on SpinLoot. 
              Every spin is a chance to hit the jackpot and change your life forever!
            </p>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 glass rounded-xl p-4 hover:bg-white/10 transition-all"
              >
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-casino-gold flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-bold text-casino-gold text-sm sm:text-base">Instant Payouts</h4>
                  <p className="text-xs sm:text-sm text-white/70">Win = Instant SOL</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 glass rounded-xl p-4 hover:bg-white/10 transition-all"
              >
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-casino-gold flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-bold text-casino-gold text-sm sm:text-base">Daily Rewards</h4>
                  <p className="text-xs sm:text-sm text-white/70">Free spins daily</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3 glass rounded-xl p-4 hover:bg-white/10 transition-all sm:col-span-2 lg:col-span-1"
              >
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-casino-gold flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-bold text-casino-gold text-sm sm:text-base">Big Jackpots</h4>
                  <p className="text-xs sm:text-sm text-white/70">Up to 50 SOL</p>
                </div>
              </motion.div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center ">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full z-10 flex justify-center items-center "
              >
                <Button href='/airdrop' className="w-full text-center  text-sm sm:text-base px-6 py-3">🎰 Start Spinning Now</Button>
              </motion.div>
              
              {/* <motion.a
                href="https://twitter.com/Spin_loot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-casino-blue/20 hover:bg-casino-blue/30 text-casino-blue hover:text-white transition-all duration-300 border border-casino-blue/30 hover:border-casino-blue/50 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-semibold">Join Community</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a> */}
            </div>
            
            {/* Social proof */}
            {/* <div className="flex items-center gap-4 text-white/60">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-casino-gold to-casino-red border-2 border-black" />
                ))}
              </div>
              <span className="text-sm">Join 10,000+ players already winning!</span>
            </div> */}
          </motion.div>
          
          {/* Big Win Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center items-center order-first lg:order-last"
          >
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-casino-gold/30 via-yellow-400/20 to-casino-red/30 rounded-full blur-3xl animate-pulse" />
              
              {/* Main image container */}
              <motion.div
                className="relative glass rounded-3xl p-8 shadow-glow"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 0 60px rgba(245, 196, 81, 0.5)"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src="/big-win.png"
                  alt="Big Win - SpinLoot"
                  className="w-full h-auto rounded-2xl"
                  animate={{
                    rotateY: [0, 3, 0],
                    scale: [1, 1.03, 1]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Floating celebration elements */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-2xl"
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 1, 0.3],
                        rotate: [0, 360]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "easeInOut"
                      }}
                      style={{
                        left: `${10 + i * 10}%`,
                        top: `${20 + (i % 3) * 20}%`
                      }}
                    >
                      {['🎉', '💰', '🏆', '⭐', '🎰', '💎', '🔥', '✨'][i]}
                    </motion.div>
                  ))}
                </div>
                
                {/* Success glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-casino-gold/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 bg-casino-gold rounded-full flex items-center justify-center text-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🏆
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 w-10 h-10 bg-casino-red rounded-full flex items-center justify-center text-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, -360]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                💰
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}

export default Cta