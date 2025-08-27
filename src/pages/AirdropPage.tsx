import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Twitter, 
  MessageCircle, 
  CheckCircle, 
  Circle, 
  Trophy, 
  Users, 
  Star,
  ExternalLink,
  Home,
  HelpCircle,
  Rocket
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import DailySpinner from '../components/DailySpinner'
import AstroLoader from '../components/AstroLoader'
import Dashboard from '../components/Dashboard'
import { useAirdrop } from '../contexts/AirdropContext'
import { useUser } from '../contexts/UserContext'

interface Task {
  id: string
  title: string
  description: string
  points: number
  maxCompletions: number
  completed: boolean
  completions: number
  type: 'once' | 'daily' | 'limited'
  action: string
  link?: string
  actionClicked: boolean
}

interface AirdropData {
  totalPoints: number
  tasks: Task[]
  lastUpdated: string
}

const defaultTasks: Task[] = [
  {
    id: 'follow',
    title: 'Follow @SpinLoot',
    description: 'Follow our official Twitter account',
    points: 5,
    maxCompletions: 1,
    completed: false,
    completions: 0,
    type: 'once',
    action: 'Follow',
    link: 'https://twitter.com/Spin_loot',
    actionClicked: false
  },
  {
    id: 'like_rt',
    title: 'Like + RT Pinned Post',
    description: 'Like and retweet our pinned announcement',
    points: 5,
    maxCompletions: 1,
    completed: false,
    completions: 0,
    type: 'once',
    action: 'Like & RT',
    link: 'https://x.com/spin_loot/status/1954819766990016658?s=61',
    actionClicked: false
  },
  {
    id: 'comment',
    title: 'Comment + Tag Friends',
    description: 'Comment (≥10 words) + #SpinLoot + tag 3 friends',
    points: 10,
    maxCompletions: 1,
    completed: false,
    completions: 0,
    type: 'once',
    action: 'Comment',
    link: 'https://x.com/spin_loot/status/1955511995471655025?s=61',
    actionClicked: false
  },
  {
    id: 'quote_tweet',
    title: 'Quote-tweet Pinned Post',
    description: 'Quote-tweet our pinned post with your thoughts',
    points: 10,
    maxCompletions: 5,
    completed: false,
    completions: 0,
    type: 'daily',
    action: 'Quote Tweet',
    link: 'https://x.com/spin_loot/status/1955293428092162185?s=61',
    actionClicked: false
  },
  {
    id: 'original_tweet',
    title: 'Original Tweet',
    description: 'Create original tweet mentioning @SpinLoot + #SpinLoot',
    points: 10,
    maxCompletions: 5,
    completed: false,
    completions: 0,
    type: 'daily',
    action: 'Tweet',
    link: 'https://twitter.com/intent/tweet?text=🚀 Excited about @Spin_loot! The future of Web3 gaming is here! #SpinLoot',
    actionClicked: false
  },
  {
    id: 'x_space',
    title: 'Join X Space',
    description: 'RT announcement + reply with codeword',
    points: 10,
    maxCompletions: 2,
    completed: false,
    completions: 0,
    type: 'limited',
    action: 'Join Space',
    link: 'https://twitter.com/Spin_loot',
    actionClicked: false
  }
]

const AirdropPage = () => {
  const { width, height } = useWindowSize()
  const [showConfetti, setShowConfetti] = useState(false)
  const [completedTaskPoints, setCompletedTaskPoints] = useState(0)
  const [isSpinnerSpinning, setIsSpinnerSpinning] = useState(false)
  const [showDailySpinner, setShowDailySpinner] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const { airdropData, loading: airdropLoading } = useAirdrop()
  const { user, loading: userLoading } = useUser()

  // Handle loading state
  useEffect(() => {
    if (!userLoading && !airdropLoading) {
      setIsLoading(false)
    }
  }, [userLoading, airdropLoading])

  const handleSpinnerReward = (points: number) => {
    setCompletedTaskPoints(points)
    setShowConfetti(true)
    setTimeout(() => {
      setShowConfetti(false)
    }, 3000)
  }

  const handleSpinStart = () => {
    setIsSpinnerSpinning(true)
  }

  const handleSpinComplete = () => {
    setIsSpinnerSpinning(false)
  }

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      // This would need to be implemented in the backend
      console.log('Reset progress - not implemented yet')
    }
  }

  const getTier = (points: number) => {
    if (points >= 60) return { name: 'Cosmic Creator', color: 'text-astro-accent', icon: Trophy, reward: '30M $SPNL Raffle Entry' }
    if (points >= 30) return { name: 'Space Explorer', color: 'text-astro-primary', icon: Star, reward: 'Base Airdrop' }
    return { name: 'Newcomer', color: 'text-white/60', icon: Circle, reward: 'Keep earning points!' }
  }

  const tier = getTier(airdropData.totalPoints)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <AstroLoader onComplete={handleLoadingComplete} />
  }

  return (
    <>
      {/* Confetti Celebration */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti
            width={width}
            height={height}
            numberOfPieces={200}
            recycle={false}
            colors={['#00D4FF', '#FF6B9D', '#FFD93D', '#4ECDC4', '#FFA726', '#FF5252', '#E8F4FD', '#0A0A1F', '#1A1A4A']}
            gravity={0.3}
            wind={0.05}
            initialVelocityX={15}
            initialVelocityY={30}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
          >
            <div className="bg-gradient-to-br from-astro-primary/90 to-astro-secondary/90 backdrop-blur-md rounded-2xl p-8 border-2 border-astro-primary/20 shadow-2xl">
              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 0.5, repeat: 3 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-3xl font-black text-white mb-2 astro-text">Congratulations!</h2>
              <p className="text-lg text-white/80 font-semibold">Task Completed Successfully!</p>
              <p className="text-sm text-white/60 mt-2">+{completedTaskPoints} Points Earned</p>
            </div>
          </motion.div>
        </div>
      )}
      
      <Dashboard />
    </>
  )
}

export default AirdropPage
