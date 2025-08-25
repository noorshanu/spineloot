import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { RotateCcw, Gift, Star, Zap, Crown, Coins, Rocket } from 'lucide-react'

interface SpinnerReward {
  id: string
  name: string
  points: number
  color: string
  icon: React.ReactNode
  probability: number
}

interface DailySpinnerProps {
  onRewardEarned: (points: number) => void
  isSpinning: boolean
  onSpinComplete: () => void
}

const spinnerRewards: SpinnerReward[] = [
  {
    id: 'jackpot',
    name: 'COSMIC JACKPOT!',
    points: 100,
    color: 'text-astro-accent',
    icon: <Crown className="w-8 h-8" />,
    probability: 0.05 // 5%
  },
  {
    id: 'mega',
    name: 'Stellar Win',
    points: 50,
    color: 'text-astro-secondary',
    icon: <Zap className="w-8 h-8" />,
    probability: 0.1 // 10%
  },
  {
    id: 'big',
    name: 'Galaxy Win',
    points: 25,
    color: 'text-astro-primary',
    icon: <Star className="w-8 h-8" />,
    probability: 0.15 // 15%
  },
  {
    id: 'normal',
    name: 'Space Win',
    points: 15,
    color: 'text-astro-success',
    icon: <Gift className="w-8 h-8" />,
    probability: 0.3 // 30%
  },
  {
    id: 'small',
    name: 'Planet Win',
    points: 10,
    color: 'text-astro-warning',
    icon: <Coins className="w-8 h-8" />,
    probability: 0.4 // 40%
  }
]

export default function DailySpinner({ onRewardEarned, isSpinning, onSpinComplete }: DailySpinnerProps) {
  const [canSpin, setCanSpin] = useState(true)
  const [lastSpinDate, setLastSpinDate] = useState<string | null>(null)
  const [spinResult, setSpinResult] = useState<SpinnerReward | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [internalSpinning, setInternalSpinning] = useState(false)

  // Check if user can spin today
  useEffect(() => {
    const savedLastSpin = localStorage.getItem('spinloot-daily-spin')
    if (savedLastSpin) {
      setLastSpinDate(savedLastSpin)
      const lastSpin = new Date(savedLastSpin)
      const today = new Date()
      const isSameDay = lastSpin.toDateString() === today.toDateString()
      setCanSpin(!isSameDay)
    }
  }, [])

  const getRandomReward = (): SpinnerReward => {
    const random = Math.random()
    let cumulativeProbability = 0
    
    for (const reward of spinnerRewards) {
      cumulativeProbability += reward.probability
      if (random <= cumulativeProbability) {
        return reward
      }
    }
    
    // Fallback to small win
    return spinnerRewards[spinnerRewards.length - 1]
  }

  const handleSpin = () => {
    if (!canSpin || internalSpinning) return

    // Start spinning animation
    setInternalSpinning(true)
    
    // Calculate final position based on reward
    const reward = getRandomReward()
    const rewardIndex = spinnerRewards.findIndex(r => r.id === reward.id)
    const segmentAngle = 360 / spinnerRewards.length
    const targetAngle = 360 * 5 + (360 - (rewardIndex * segmentAngle + segmentAngle / 2))
    
    // Simulate spinning for 5-8 seconds
    const spinDuration = 5000 + Math.random() * 3000 // 5-8 seconds
    
    setTimeout(() => {
      // Show result after spin completes
      setSpinResult(reward)
      setShowResult(true)
      setInternalSpinning(false)
      
      // Save spin date
      const today = new Date().toISOString()
      localStorage.setItem('spinloot-daily-spin', today)
      setLastSpinDate(today)
      setCanSpin(false)

      // Call parent callback
      onRewardEarned(reward.points)
      
      // Hide result after 3 seconds
      setTimeout(() => {
        setShowResult(false)
        onSpinComplete()
      }, 3000)
    }, spinDuration)
  }

  const getTimeUntilNextSpin = () => {
    if (!lastSpinDate) return null
    
    const lastSpin = new Date(lastSpinDate)
    const now = new Date()
    const tomorrow = new Date(lastSpin)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    
    const timeLeft = tomorrow.getTime() - now.getTime()
    const hours = Math.floor(timeLeft / (1000 * 60 * 60))
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    
    return { hours, minutes }
  }

  const timeUntilNext = getTimeUntilNextSpin()

  return (
    <div className="relative">
      {/* Spinner Container */}
      <motion.div
        className="relative w-80 h-80 mx-auto"
        animate={internalSpinning ? {
          rotate: [0, 360 * 8 + Math.random() * 360]
        } : {}}
        transition={{
          duration: internalSpinning ? 6 : 0,
          ease: "easeOut"
        }}
      >
        {/* Spinner Wheel */}
        <div className="w-full h-full rounded-full border-8 border-astro-primary/30 bg-gradient-to-br from-astro-primary/20 to-astro-secondary/20 relative overflow-hidden">
          {/* Spinner Segments */}
          {spinnerRewards.map((reward, index) => {
            const angle = (360 / spinnerRewards.length) * index
            const segmentAngle = 360 / spinnerRewards.length
            
            return (
              <motion.div
                key={reward.id}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: 'center'
                }}
              >
                <div 
                  className="w-1/2 h-1/2 flex items-center justify-center text-center"
                  style={{
                    transform: `rotate(${segmentAngle / 2}deg)`,
                    transformOrigin: '0% 100%'
                  }}
                >
                  <div className={`${reward.color} font-bold text-sm astro-text`}>
                    {reward.points}
                  </div>
                </div>
              </motion.div>
            )
          })}
          
          {/* Center Circle */}
          <div className="absolute inset-8 rounded-full bg-astro-bg/80 border-4 border-astro-primary flex items-center justify-center">
            <div className="text-center">
              <div className="text-astro-primary font-bold text-lg astro-text">DAILY</div>
              <div className="text-white/70 text-sm">SPIN</div>
            </div>
          </div>
          
          {/* Spinner Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="w-0 h-0 border-l-8 border-r-8 border-b-12 border-transparent border-b-astro-primary shadow-glow" />
          </div>
        </div>
      </motion.div>

      {/* Spin Button */}
      <div className="text-center mt-8">
        {canSpin ? (
          <motion.button
            onClick={handleSpin}
            disabled={internalSpinning}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-astro-primary to-astro-secondary shadow-lg shadow-astro-primary/40 text-white font-bold border border-astro-primary/50 text-lg uppercase hover:translate-y-[-1px] hover:shadow-neon transition-all disabled:opacity-50 disabled:cursor-not-allowed glow-effect"
            whileHover={!internalSpinning ? { scale: 1.05, y: -2 } : {}}
            whileTap={!internalSpinning ? { scale: 0.95 } : {}}
          >
            {internalSpinning ? '🚀 Spinning...' : ' SPIN NOW!'}
          </motion.button>
        ) : (
          <div className="text-center">
            <div className="text-white/70 mb-2">Next spin available in:</div>
            <div className="text-astro-primary font-bold text-xl astro-text">
              {timeUntilNext ? `${timeUntilNext.hours}h ${timeUntilNext.minutes}m` : 'Loading...'}
            </div>
            <div className="text-white/50 text-sm mt-2">
              Come back tomorrow for another cosmic adventure!
            </div>
          </div>
        )}
      </div>

      {/* Result Modal */}
      <AnimatePresence>
        {showResult && spinResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-gradient-to-br from-astro-primary/90 to-astro-secondary/90 backdrop-blur-md rounded-3xl p-8 border-4 border-astro-primary/20 shadow-2xl text-center max-w-md mx-4"
            >
              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 0.5, repeat: 3 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              
              <div className={`${spinResult.color} text-3xl font-black mb-2 astro-text`}>
                {spinResult.name}
              </div>
              
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className={`${spinResult.color}`}
                >
                  {spinResult.icon}
                </motion.div>
                <div className="text-2xl font-bold text-white">
                  +{spinResult.points} Points!
                </div>
              </div>
              
              <div className="text-white/80 text-sm">
                Points have been added to your airdrop campaign!
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rewards Info */}
      <div className="mt-8">
        <h3 className="text-center text-astro-primary font-bold text-lg mb-4 astro-text">Possible Rewards</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {spinnerRewards.map((reward) => (
            <motion.div
              key={reward.id}
              className="text-center p-3 rounded-xl astro-glass border border-astro-primary/10"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`${reward.color} mb-1`}>
                {reward.icon}
              </div>
              <div className={`${reward.color} font-bold text-sm astro-text`}>
                {reward.points}
              </div>
              <div className="text-white/50 text-xs">
                {reward.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
