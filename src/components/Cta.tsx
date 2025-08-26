import React from 'react'
import { motion } from 'framer-motion'
import Section from './Section'
import Container from './Container'
import { Button } from './Button'
import { Zap, Trophy, Star, ArrowRight, Rocket, Target, Sparkles } from 'lucide-react'

const Cta = () => {
  return (
    <Section id="cta" className="relative overflow-hidden bg-astro-bg/20 backdrop-blur-sm">
      {/* Background decorative elements */}
      <div className="absolute inset-0 astro-grid opacity-20" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-astro-primary/20 via-transparent to-astro-secondary/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-astro-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-astro-secondary/10 rounded-full blur-3xl animate-pulse-slow" />
      
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
            <div className="inline-flex items-center gap-2 rounded-full border border-astro-primary/30 px-4 py-2 text-astro-primary bg-astro-primary/10 mb-6">
              <Rocket className="w-5 h-5" />
              <span className="text-sm font-semibold">Ready to Launch?</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
              Your Next{' '}
              <span className="bg-gradient-to-r from-astro-primary via-astro-secondary to-astro-accent bg-clip-text text-transparent astro-text">
                Cosmic Win
              </span>
              {' '}Awaits!
            </h2>
            
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed">
              Join thousands of space explorers already spinning and winning on SpinLoot. 
              Every spin is a chance to hit the jackpot and unlock stellar rewards!
            </p>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 astro-glass rounded-xl p-4 hover:bg-astro-primary/10 transition-all glow-effect"
              >
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-astro-primary flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-bold text-astro-primary text-sm sm:text-base">Instant Payouts</h4>
                  <p className="text-xs sm:text-sm text-white/70">Win = Instant SOL</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 astro-glass rounded-xl p-4 hover:bg-astro-secondary/10 transition-all glow-effect"
              >
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-astro-secondary flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-bold text-astro-secondary text-sm sm:text-base">Daily Rewards</h4>
                  <p className="text-xs sm:text-sm text-white/70">Free spins daily</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3 astro-glass rounded-xl p-4 hover:bg-astro-accent/10 transition-all glow-effect sm:col-span-2 lg:col-span-1"
              >
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-astro-accent flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-bold text-astro-accent text-sm sm:text-base">Big Jackpots</h4>
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
                <Button href='/airdrop' className="w-full text-center text-sm sm:text-base px-6 py-3"> Start Exploring Now</Button>
              </motion.div>
            </div>
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
              <div className="absolute inset-0 bg-gradient-to-r from-astro-primary/30 via-astro-secondary/20 to-astro-accent/30 rounded-full blur-3xl animate-pulse-slow" />
              
              {/* Main image container */}
              <motion.div
                className="relative astro-glass rounded-3xl p-8 shadow-glow"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 0 60px rgba(0, 212, 255, 0.5)"
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
                  {/* Enhanced Stars */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute bg-astro-accent rounded-full star ${
                        i % 3 === 0 ? 'w-2 h-2' : i % 2 === 0 ? 'w-1.5 h-1.5' : 'w-1 h-1'
                      }`}
                      animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [0.5, 1.2, 0.5]
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }}
                      style={{
                        left: `${5 + Math.random() * 90}%`,
                        top: `${5 + Math.random() * 90}%`,
                        filter: `blur(${Math.random() * 0.3}px)`
                      }}
                    />
                  ))}
                  
                  {/* Shooting Stars */}
                  {[...Array(2)].map((_, i) => (
                    <motion.div
                      key={`shooting-${i}`}
                      className="absolute w-0.5 h-0.5 bg-white rounded-full"
                      animate={{
                        x: [0, 60],
                        y: [0, -30],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 3,
                        ease: "easeOut"
                      }}
                      style={{
                        left: `${15 + i * 30}%`,
                        top: `${20 + i * 15}%`
                      }}
                    />
                  ))}
                  
                  {/* Nebula Effects */}
                  <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-pink-400/15 to-transparent rounded-full blur-md" />
                  <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-blue-400/15 to-transparent rounded-full blur-md" />
                </div>
                
                {/* Success glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-astro-success/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
              
              {/* Decorative space elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-astro-primary to-astro-secondary rounded-full shadow-glow"
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
                <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 opacity-80" />
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-br from-astro-secondary to-astro-accent rounded-full shadow-neon"
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
                <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-80" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}

export default Cta

// Add star glow effect styles
const starStyles = `
  .star {
    box-shadow: 0 0 4px currentColor, 0 0 8px currentColor;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = starStyles;
  document.head.appendChild(style);
}