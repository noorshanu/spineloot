import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Rocket, Star, Planet, Zap, Sparkles } from 'lucide-react'

interface AstroLoaderProps {
  onComplete: () => void
}

export default function AstroLoader({ onComplete }: AstroLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [showRocket, setShowRocket] = useState(false)
  const [showPlanets, setShowPlanets] = useState(false)
  const [showStars, setShowStars] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)

  const phases = [
    "Initializing cosmic systems...",
    "Calibrating space coordinates...", 
    "Establishing quantum connection...",
    "Loading stellar data...",
    "Preparing for launch...",
    "Welcome to SpinLoot Universe! 🚀"
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
        return prev + Math.random() * 8 + 2
      })
    }, 200)

    // Show different animation phases
    setTimeout(() => setShowRocket(true), 600)
    setTimeout(() => setShowPlanets(true), 1200)
    setTimeout(() => setShowStars(true), 1800)

    // Update phases
    const phaseInterval = setInterval(() => {
      setCurrentPhase(prev => {
        const newPhase = Math.floor((progress / 100) * phases.length)
        return Math.min(newPhase, phases.length - 1)
      })
    }, 800)

    return () => {
      clearInterval(interval)
      clearInterval(phaseInterval)
    }
  }, [onComplete, progress])

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-astro-bg via-astro-panel to-astro-dark flex items-center justify-center overflow-hidden">
      {/* Astro Background Elements */}
      <div className="absolute inset-0">
        {/* Cosmic Grid */}
        <div className="absolute inset-0 astro-grid opacity-20" />
        
        {/* Radial Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-radial-primary opacity-30" />
        <div className="absolute top-0 right-0 w-full h-full bg-radial-secondary opacity-20" />
        <div className="absolute bottom-0 left-1/2 w-full h-full bg-radial-accent opacity-15" />
        
        {/* Floating Cosmic Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-astro-primary rounded-full"
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

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Astro Bot Logo */}
        <motion.div
          className="mb-8"
          animate={{
            scale: [1, 1.05, 1],
            filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="relative">
            <img 
              src="/bot-hero.png" 
              alt="SpinLoot Astro Bot" 
              className="w-32 h-32 mx-auto drop-shadow-2xl filter brightness-90"
            />
            {/* Cosmic glow effect */}
            <div className="absolute inset-0 w-32 h-32 mx-auto bg-gradient-to-r from-astro-primary/40 to-astro-secondary/40 rounded-full blur-2xl animate-pulse" />
            <div className="absolute inset-0 w-32 h-32 mx-auto bg-gradient-to-r from-astro-accent/20 to-astro-primary/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </motion.div>

        {/* Astro Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-astro-primary via-astro-secondary to-astro-accent mb-4 tracking-wider astro-text"
        >
          SPINLOOT
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl text-astro-light/80 mb-8 font-semibold tracking-wide"
        >
          Exploring the cosmos of possibilities...
        </motion.p>

        {/* Progress Bar - Astro Style */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="w-96 h-4 bg-astro-panel/50 rounded-full overflow-hidden mx-auto mb-8 border border-astro-primary/30 backdrop-blur-sm"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-astro-primary via-astro-secondary to-astro-accent rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          >
            {/* Glowing effect on progress */}
            <div className="absolute inset-0 bg-gradient-to-r from-astro-primary/50 to-astro-secondary/50 blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          </motion.div>
        </motion.div>

        {/* Progress Percentage */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-3xl font-bold text-astro-primary mb-8 astro-text"
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
          className="text-lg text-astro-light/70 mb-8 font-medium"
        >
          {phases[currentPhase]}
        </motion.div>

        {/* Astro Animated Elements */}
        <div className="flex justify-center items-center gap-16">
          {/* Rocket */}
          {showRocket && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 50 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -20, 0]
              }}
              transition={{
                opacity: { duration: 0.8 },
                scale: { duration: 0.8 },
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="text-4xl"
            >
              <Rocket className="w-12 h-12 text-astro-primary" />
            </motion.div>
          )}

          {/* Planets */}
          {showPlanets && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex gap-4"
            >
              {['🪐', '🌍', '⭐'].map((planet, index) => (
                <motion.div
                  key={index}
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                  className="text-3xl"
                >
                  {planet}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Stars */}
          {showStars && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex gap-3"
            >
              {[...Array(5)].map((_, index) => (
                <motion.div
                  key={index}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                  className="text-2xl"
                >
                  <Star className="w-6 h-6 text-astro-accent fill-current" />
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
          className="mt-12 text-astro-light/50 font-medium"
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Preparing your cosmic journey...
            <Sparkles className="w-4 h-4" />
          </motion.span>
        </motion.div>
      </div>

      {/* Cosmic Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-astro-secondary rounded-full"
            animate={{
              x: [0, Math.random() * 800 - 400],
              y: [0, Math.random() * 800 - 400],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Cosmic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-astro-dark/20 via-transparent to-astro-dark/20" />
    </div>
  )
}
