import React from 'react'
import { motion } from 'framer-motion'
import Container from './Container'
import Section from './Section'

const Aboutus = () => {
  return (
    <Section id="about" className="backdrop-blur-sm relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid bg-[length:20px_20px] opacity-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-casino-red/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-casino-gold/20 rounded-full blur-3xl" />
      
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-casino-gold/30 px-4 py-2 text-casino-gold bg-casino-gold/10 mb-6">
              <span className="text-sm font-semibold">🎰 About SpinLoot</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-black leading-tight">
              The Future of{' '}
              <span className="bg-gradient-to-r from-casino-gold to-casino-red bg-clip-text text-transparent">
                Web3 Gaming
              </span>
            </h2>
            
            <p className="text-lg text-white/80 leading-relaxed">
              SpinLoot is a Telegram-based spinning-style crypto spin game powered by Solana. 
              Players spin for prizes — including $SPIN tokens, SOL, NFTs, and jackpot loot boxes — 
              in a provably fair, addictive, and memeable format.
            </p>
            
            <p className="text-lg text-white/80 leading-relaxed">
              Think "Web3 spin game" with instant payouts, social leaderboards, and degenerate fun. 
              Every spin is a chance to win big while building the most entertaining gaming community in crypto.
            </p>
            
            {/* Feature highlights */}
         
          </motion.div>
          
          {/* Interactive Ace Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-md">
              {/* Glowing background effect */}
            
              
              {/* Main image container */}
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="relative "
              >
                <motion.img
                  src="/ace.png"
                  alt="Ace Cards - SpinLoot"
                  className="w-full h-auto rounded-2xl"
                  animate={{
                    rotateY: [0, 5, 0],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-casino-gold rounded-full"
                      animate={{
                        x: [0, 20, 0],
                        y: [0, -20, 0],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut"
                      }}
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + i * 10}%`
                      }}
                    />
                  ))}
                </div>
                
                {/* Card glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-casino-red/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-casino-gold rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-casino-red rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}

export default Aboutus