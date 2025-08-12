import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface PageLoaderProps {
  onComplete: () => void
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [showSpinner, setShowSpinner] = useState(false)
  const [showCards, setShowCards] = useState(false)
  const [showDice, setShowDice] = useState(false)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onComplete()
          }, 1000)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 200)

    // Show different animation phases
    setTimeout(() => setShowSpinner(true), 500)
    setTimeout(() => setShowCards(true), 1500)
    setTimeout(() => setShowDice(true), 2500)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Rotating Casino Logo */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <img 
            src="/casino.png" 
            alt="Casino" 
            className="w-32 h-32 opacity-20 blur-sm"
          />
        </motion.div>

        {/* Floating Casino Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 text-4xl"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🎰
        </motion.div>

        <motion.div
          className="absolute top-1/4 right-1/4 text-4xl"
          animate={{
            y: [0, 20, 0],
            rotate: [360, 0],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          🃏
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 left-1/4 text-4xl"
          animate={{
            y: [0, -15, 0],
            rotate: [0, -360],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          🎲
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-1/4 text-4xl"
          animate={{
            y: [0, 15, 0],
            rotate: [360, 0],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          💎
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Main Casino Logo */}
        <motion.div
          className="mb-8"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 6, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <img 
            src="/casino.png" 
            alt="Casino" 
            className="w-24 h-24 mx-auto drop-shadow-2xl"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-black text-casino-gold mb-4"
        >
          SpinLoot
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-white/70 mb-8"
        >
          Loading your casino experience...
        </motion.p>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-80 h-3 bg-white/20 rounded-full overflow-hidden mx-auto mb-8"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-casino-gold to-casino-red rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Progress Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-lg font-semibold text-casino-gold mb-8"
        >
          {Math.round(progress)}%
        </motion.div>

        {/* Animated Elements */}
        <div className="flex justify-center items-center gap-8">
          {/* Spinning Wheel */}
          {showSpinner && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: 360
              }}
              transition={{
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
                rotate: { duration: 2, repeat: Infinity, ease: "linear" }
              }}
              className="text-3xl"
            >
              🎡
            </motion.div>
          )}

          {/* Cards */}
          {showCards && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex gap-1"
            >
              {['🃏', '🃏', '🃏'].map((card, index) => (
                <motion.div
                  key={index}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                  className="text-2xl"
                >
                  {card}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Dice */}
          {showDice && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex gap-2"
            >
              {['🎲', '🎲'].map((dice, index) => (
                <motion.div
                  key={index}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                  className="text-2xl"
                >
                  {dice}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-8 text-white/60"
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Preparing your lucky spin...
          </motion.span>
        </motion.div>
      </div>

      {/* Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-casino-gold rounded-full"
            animate={{
              x: [0, Math.random() * 400 - 200],
              y: [0, Math.random() * 400 - 200],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>
    </div>
  )
}
