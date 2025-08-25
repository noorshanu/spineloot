import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface PageLoaderProps {
  onComplete: () => void
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [showAxe, setShowAxe] = useState(false)
  const [showRunes, setShowRunes] = useState(false)
  const [showFire, setShowFire] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)

  const phases = [
    "Awakening the Gods...",
    "Forging the Axe...", 
    "Reading the Runes...",
    "Igniting the Flames...",
    "Entering Valhalla..."
  ]

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
        return prev + Math.random() * 12 + 3
      })
    }, 300)

    // Show different animation phases
    setTimeout(() => setShowAxe(true), 800)
    setTimeout(() => setShowRunes(true), 1600)
    setTimeout(() => setShowFire(true), 2400)

    // Update phases
    const phaseInterval = setInterval(() => {
      setCurrentPhase(prev => {
        const newPhase = Math.floor((progress / 100) * phases.length)
        return Math.min(newPhase, phases.length - 1)
      })
    }, 1000)

    return () => {
      clearInterval(interval)
      clearInterval(phaseInterval)
    }
  }, [onComplete, progress])

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center overflow-hidden">
      {/* God of War Background Elements */}
      <div className="absolute inset-0">
        {/* Dark Mist Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-800/20 to-gray-900/40" />
        
        {/* Floating Runes */}
        <motion.div
          className="absolute top-1/4 left-1/4 text-6xl opacity-20"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ⚔️
        </motion.div>

        <motion.div
          className="absolute top-1/3 right-1/4 text-5xl opacity-20"
          animate={{
            y: [0, 25, 0],
            rotate: [360, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          🛡️
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 left-1/3 text-4xl opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, -360],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          🔥
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-1/3 text-5xl opacity-20"
          animate={{
            y: [0, 30, 0],
            rotate: [360, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          ⚡
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* God of War Style Logo */}
        <motion.div
          className="mb-8"
          animate={{
            scale: [1, 1.05, 1],
            filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="relative">
            <img 
              src="/bot-hero.png" 
              alt="SpinLoot" 
              className="w-28 h-28 mx-auto drop-shadow-2xl filter brightness-75"
            />
            {/* Glowing effect */}
            <div className="absolute inset-0 w-28 h-28 mx-auto bg-gradient-to-r from-orange-500/30 to-red-600/30 rounded-full blur-xl animate-pulse" />
          </div>
        </motion.div>

        {/* Epic Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 mb-4 tracking-wider"
          style={{ textShadow: '0 0 20px rgba(251, 146, 60, 0.5)' }}
        >
          SPINLOOT
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl text-gray-300 mb-8 font-semibold tracking-wide"
        >
          Enter the realm of legendary wins...
        </motion.p>

        {/* Progress Bar - God of War Style */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="w-96 h-4 bg-gray-800/50 rounded-full overflow-hidden mx-auto mb-8 border border-gray-600/30"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 via-red-600 to-orange-400 rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          >
            {/* Glowing effect on progress */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/50 to-red-500/50 blur-sm" />
          </motion.div>
        </motion.div>

        {/* Progress Percentage */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-2xl font-bold text-orange-400 mb-8"
          style={{ textShadow: '0 0 10px rgba(251, 146, 60, 0.5)' }}
        >
          {Math.round(progress)}%
        </motion.div>

        {/* Current Phase Text */}
        <motion.div
          key={currentPhase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-lg text-gray-400 mb-8 font-medium"
        >
          {phases[currentPhase]}
        </motion.div>

        {/* God of War Animated Elements */}
        <div className="flex justify-center items-center gap-12">
          {/* Leviathan Axe */}
          {showAxe && (
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                opacity: { duration: 0.8 },
                scale: { duration: 0.8 },
                rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="text-4xl"
            >
              ⚔️
            </motion.div>
          )}

          {/* Runes */}
          {showRunes && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex gap-3"
            >
              {['🔮', '⚡', '🔥'].map((rune, index) => (
                <motion.div
                  key={index}
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                  className="text-3xl"
                >
                  {rune}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Fire Effects */}
          {showFire && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex gap-2"
            >
              {['🔥', '🔥', '🔥'].map((fire, index) => (
                <motion.div
                  key={index}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                  className="text-3xl"
                >
                  {fire}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 text-gray-500 font-medium"
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Preparing your journey to Valhalla...
          </motion.span>
        </motion.div>
      </div>

      {/* God of War Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-500 rounded-full"
            animate={{
              x: [0, Math.random() * 600 - 300],
              y: [0, Math.random() * 600 - 300],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Dark Overlay for dramatic effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20" />
    </div>
  )
}
