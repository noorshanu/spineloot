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
  RefreshCw,
  ArrowLeft,
  Home,
  HelpCircle
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

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
    link: 'https://twitter.com/spineloot',
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
    link: 'https://twitter.com/spineloot/status/123456789',
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
    link: 'https://twitter.com/spineloot/status/123456789',
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
    link: 'https://twitter.com/spineloot/status/123456789',
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
    link: 'https://twitter.com/intent/tweet?text=🎰 Excited about @SpinLoot! The future of Web3 gaming is here! #SpinLoot',
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
    link: 'https://twitter.com/spineloot',
    actionClicked: false
  }
]

const AirdropPage = () => {
  const { width, height } = useWindowSize()
  const [showConfetti, setShowConfetti] = useState(false)
  const [completedTaskPoints, setCompletedTaskPoints] = useState(0)
  
  const [airdropData, setAirdropData] = useState<AirdropData>({
    totalPoints: 0,
    tasks: defaultTasks,
    lastUpdated: new Date().toISOString()
  })

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('spinloot-airdrop')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setAirdropData(parsed)
      } catch (error) {
        console.error('Error loading airdrop data:', error)
      }
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('spinloot-airdrop', JSON.stringify(airdropData))
  }, [airdropData])

  const markActionClicked = (taskId: string) => {
    setAirdropData(prev => {
      const updatedTasks = prev.tasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            actionClicked: true
          }
        }
        return task
      })

      return {
        ...prev,
        tasks: updatedTasks,
        lastUpdated: new Date().toISOString()
      }
    })
  }

  const completeTask = (taskId: string) => {
    setAirdropData(prev => {
      const updatedTasks = prev.tasks.map(task => {
        if (task.id === taskId) {
          const newCompletions = task.completions + 1
          const isCompleted = newCompletions >= task.maxCompletions
          return {
            ...task,
            completions: newCompletions,
            completed: isCompleted
          }
        }
        return task
      })

      const totalPoints = updatedTasks.reduce((sum, task) => {
        return sum + (task.points * task.completions)
      }, 0)

      return {
        ...prev,
        tasks: updatedTasks,
        totalPoints,
        lastUpdated: new Date().toISOString()
      }
    })

    // Get points for the completed task
    const task = airdropData.tasks.find(t => t.id === taskId)
    const points = task?.points || 0
    setCompletedTaskPoints(points)

    // Show confetti celebration
    setShowConfetti(true)
    setTimeout(() => {
      setShowConfetti(false)
    }, 3000)
  }

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setAirdropData({
        totalPoints: 0,
        tasks: defaultTasks,
        lastUpdated: new Date().toISOString()
      })
    }
  }

  const getTier = (points: number) => {
    if (points >= 60) return { name: 'Creator', color: 'text-casino-gold', icon: Trophy, reward: '30M $SPNL Raffle Entry' }
    if (points >= 30) return { name: 'Base', color: 'text-casino-blue', icon: Star, reward: 'Base Airdrop' }
    return { name: 'Newcomer', color: 'text-white/60', icon: Circle, reward: 'Keep earning points!' }
  }

  const tier = getTier(airdropData.totalPoints)

  return (
    <div className="min-h-screen text-white bg-black/30 backdrop-blur-sm  overflow-hidden">
      {/* Confetti Celebration */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti
            width={width}
            height={height}
            numberOfPieces={200}
            recycle={false}
            colors={['#FFD600', '#C9A900', '#FF6B35', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8']}
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
            <div className="bg-casino-gold/90 backdrop-blur-md rounded-2xl p-8 border-2 border-white/20 shadow-2xl">
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
              <h2 className="text-3xl font-black text-black mb-2">Congratulations!</h2>
              <p className="text-lg text-black/80 font-semibold">Task Completed Successfully!</p>
              <p className="text-sm text-black/60 mt-2">+{completedTaskPoints} Points Earned</p>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Background */}
      <div className="fixed inset-0 bg-grid bg-[length:20px_20px] opacity-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-casino-red/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-casino-gold/20 rounded-full blur-3xl" />
      
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-casino-gold rounded-full opacity-30"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
            style={{
              left: `${10 + i * 8}%`,
              top: `${20 + (i % 3) * 25}%`
            }}
          />
        ))}
      </div>
      
      {/* Header */}
      <header className="relative z-10 border-b border-white/20 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 font-black tracking-wide">
              <img src="/logo.jpg" alt="SpinLoot" className="w-10 h-10 rounded-full" />
              <span className="text-casino-gold text-lg">SpinLoot</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                <Home className="w-4 h-4" />
                <span className="font-semibold">Home</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-casino-gold/30 px-4 py-2 text-casino-gold bg-casino-gold/10 mb-6">
            <Trophy className="w-5 h-5" />
            <span className="text-sm font-semibold">Social Airdrop Campaign</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
            SpinLoot Social Airdrop
          </h1>
          
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Complete social tasks to earn points and qualify for $SPNL airdrop rewards. 
            Base tier requires 30+ points, Creator tier requires 60+ points.
          </p>

          {/* Campaign Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6 text-center"
              whileHover={{ 
                scale: 1.05,
                y: -5,
                boxShadow: "0 20px 40px rgba(245, 196, 81, 0.15)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-3xl font-bold text-casino-gold mb-2">
                {airdropData.totalPoints}
              </div>
              <div className="text-white/70 text-sm">Total Points</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6 text-center"
              whileHover={{ 
                scale: 1.05,
                y: -5,
                boxShadow: "0 20px 40px rgba(245, 196, 81, 0.15)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`text-2xl font-bold mb-2 ${tier.color}`}>
                {tier.name}
              </div>
              <div className="text-white/70 text-sm">Current Tier</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6 text-center"
              whileHover={{ 
                scale: 1.05,
                y: -5,
                boxShadow: "0 20px 40px rgba(245, 196, 81, 0.15)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-3xl font-bold text-casino-red mb-2">
                {airdropData.tasks.filter(t => t.completed).length}/{airdropData.tasks.length}
              </div>
              <div className="text-white/70 text-sm">Tasks Completed</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="glass rounded-2xl p-6 text-center"
              whileHover={{ 
                scale: 1.05,
                y: -5,
                boxShadow: "0 20px 40px rgba(245, 196, 81, 0.15)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-2xl font-bold text-casino-gold mb-2">
                {tier.reward}
              </div>
              <div className="text-white/70 text-sm">Reward</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Rules Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center mb-8"
        >
          <motion.button
            onClick={() => {
              document.getElementById('campaign-rules')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              })
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-300 border border-white/20 hover:border-white/40"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <HelpCircle className="w-5 h-5" />
            <span className="font-semibold">📋 Click to view Campaign Rules & Requirements</span>
          </motion.button>
        </motion.div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-12">
          {airdropData.tasks.map((task, index) => {
            const progress = (task.completions / task.maxCompletions) * 100
            
            const getIcon = (taskId: string) => {
              switch (taskId) {
                case 'follow':
                case 'like_rt':
                case 'quote_tweet':
                case 'original_tweet':
                  return <Twitter className="w-6 h-6 text-casino-gold" />
                case 'comment':
                  return <MessageCircle className="w-6 h-6 text-casino-gold" />
                case 'x_space':
                  return <Users className="w-6 h-6 text-casino-gold" />
                default:
                  return <Star className="w-6 h-6 text-casino-gold" />
              }
            }
            
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-8 hover:bg-white/5 transition-all duration-300 group"
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  boxShadow: "0 20px 40px rgba(245, 196, 81, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="p-3 rounded-xl bg-casino-gold/20"
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5,
                        backgroundColor: 'rgba(245, 196, 81, 0.3)'
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {getIcon(task.id)}
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 group-hover:text-casino-gold transition-colors duration-300">{task.title}</h3>
                      <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">{task.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <motion.div 
                      className="text-casino-gold font-bold text-2xl"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {task.points} pts
                    </motion.div>
                    <div className="text-white/50 text-sm">
                      {task.completions}/{task.maxCompletions}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/10 rounded-full h-3 mb-6">
                  <div 
                    className="bg-gradient-to-r from-casino-gold to-casino-red h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  {task.link && (
                    <motion.a
                      href={task.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => markActionClicked(task.id)}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-casino-blue/20 hover:bg-casino-blue/30 text-casino-blue hover:text-white transition-all duration-300 border border-casino-blue/30 hover:border-casino-blue/50"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span className="font-semibold">{task.action}</span>
                    </motion.a>
                  )}
                  
                  <motion.button
                    onClick={() => completeTask(task.id)}
                    disabled={task.completed || !task.actionClicked}
                    whileHover={task.actionClicked && !task.completed ? { scale: 1.05 } : {}}
                    whileTap={task.actionClicked && !task.completed ? { scale: 0.95 } : {}}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                      task.completed
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-not-allowed'
                        : !task.actionClicked
                        ? 'bg-gray-500/20 text-gray-400 border border-gray-500/30 cursor-not-allowed'
                        : 'bg-casino-gold/20 hover:bg-casino-gold/30 text-casino-gold hover:text-white border border-casino-gold/30 hover:border-casino-gold/50'
                    }`}
                  >
                    {task.completed ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                    <span className="font-semibold">
                      {task.completed 
                        ? 'Completed' 
                        : !task.actionClicked 
                        ? 'Complete Action First' 
                        : 'Mark Complete'
                      }
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Campaign Rules & Actions */}
        <motion.div
          id="campaign-rules"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass rounded-3xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Campaign Rules & Rewards</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-casino-gold">Requirements</h3>
                <div className="space-y-3 text-white/70">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-casino-gold rounded-full mt-2 flex-shrink-0" />
                    <span>X account age ≥60 days, ≥50 followers, public profile</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-casino-gold rounded-full mt-2 flex-shrink-0" />
                    <span>Unique comments (≥10 words); no copy-paste/emoji spam</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-casino-gold rounded-full mt-2 flex-shrink-0" />
                    <span>One wallet/person; duplicate content across accounts = ban</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-casino-gold">Rewards</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-casino-blue/10 border border-casino-blue/20">
                    <div>
                      <div className="font-bold text-casino-blue">Base Tier</div>
                      <div className="text-sm text-white/70">30+ points</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">Base Airdrop</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-xl bg-casino-gold/10 border border-casino-gold/20">
                    <div>
                      <div className="font-bold text-casino-gold">Creator Tier</div>
                      <div className="text-sm text-white/70">60+ points</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">30M $SPNL Raffle</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="w-full sm:w-auto text-lg px-8 py-4 px-10 rounded-full bg-gradient-to-b from-[#FFD600] to-[#C9A900] shadow-lg shadow-black/40 text-black font-bold border border-yellow-400 py-2 text-base uppercase hover:translate-y-[-1px] transition-all"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                🎰 Join SpinLoot
              </motion.button>
              <motion.button
                onClick={resetProgress}
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-300 border border-white/20 hover:border-white/40"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="w-5 h-5" />
                <span className="font-semibold">Reset Progress</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/20 bg-black/80 backdrop-blur-md mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo.jpg" alt="SpinLoot" className="w-12 h-12 rounded-full" />
                <span className="text-casino-gold font-bold text-xl">SpinLoot</span>
              </div>
              <p className="text-white/70 mb-4 max-w-md">
                The future of Web3 gaming. Spin, win, and earn with the most entertaining 
                crypto gaming platform on Solana.
              </p>
              <div className="flex gap-4">
                <motion.a
                  href="https://twitter.com/spineloot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://t.me/spineloot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MessageCircle className="w-5 h-5" />
                </motion.a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-casino-gold">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-white/70 hover:text-white transition-colors duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/airdrop" className="text-white/70 hover:text-white transition-colors duration-300">
                    Airdrop
                  </Link>
                </li>
                <li>
                  <a href="#features" className="text-white/70 hover:text-white transition-colors duration-300">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#tokenomics" className="text-white/70 hover:text-white transition-colors duration-300">
                    Tokenomics
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-casino-gold">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#faq" className="text-white/70 hover:text-white transition-colors duration-300">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="https://t.me/spineloot" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors duration-300">
                    Telegram
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/spineloot" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors duration-300">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-white/50 text-sm">
              © 2024 SpinLoot. All rights reserved. Built on Solana.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default AirdropPage
