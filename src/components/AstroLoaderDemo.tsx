import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, RefreshCw } from 'lucide-react'
import AstroLoader from './AstroLoader'

export default function AstroLoaderDemo() {
  const [showLoader, setShowLoader] = useState(false)

  const handleShowLoader = () => {
    setShowLoader(true)
  }

  const handleLoaderComplete = () => {
    setShowLoader(false)
  }

  if (showLoader) {
    return <AstroLoader onComplete={handleLoaderComplete} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-astro-bg via-astro-panel to-astro-dark flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 astro-grid opacity-10" />
        <div className="absolute top-0 left-0 w-full h-full bg-radial-primary opacity-20" />
        <div className="absolute top-0 right-0 w-full h-full bg-radial-secondary opacity-15" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="astro-glass rounded-3xl p-12 max-w-2xl mx-auto"
        >
          <div className="mb-8">
            <img 
              src="/bot-hero.png" 
              alt="SpinLoot Astro Bot" 
              className="w-24 h-24 mx-auto mb-6 drop-shadow-2xl"
            />
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-astro-primary via-astro-secondary to-astro-accent mb-4 astro-text">
              Astro Loader Demo
            </h1>
            <p className="text-lg text-astro-light/70">
              Experience the cosmic loading screen with space-themed animations and Astro bot styling
            </p>
          </div>

          <div className="space-y-6">
            <motion.button
              onClick={handleShowLoader}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-astro-primary to-astro-secondary text-white font-bold text-lg shadow-lg shadow-astro-primary/40 hover:shadow-neon transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-6 h-6" />
              Launch Astro Loader
            </motion.button>

            <div className="text-sm text-astro-light/50">
              Click to experience the cosmic loading animation
            </div>
          </div>

          {/* Features List */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-astro-primary">Features</h3>
              <ul className="space-y-2 text-astro-light/70">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-astro-primary rounded-full" />
                  Cosmic particle effects
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-astro-primary rounded-full" />
                  Space-themed animations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-astro-primary rounded-full" />
                  Astro color scheme
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-astro-primary rounded-full" />
                  Progressive loading phases
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-astro-secondary">Animations</h3>
              <ul className="space-y-2 text-astro-light/70">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-astro-secondary rounded-full" />
                  Floating rocket
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-astro-secondary rounded-full" />
                  Orbiting planets
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-astro-secondary rounded-full" />
                  Twinkling stars
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-astro-secondary rounded-full" />
                  Cosmic particles
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
