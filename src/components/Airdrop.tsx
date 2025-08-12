import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Section from './Section'
import Container from './Container'
import { Button } from './Button'
import { 
  Twitter, 
  MessageCircle, 
  CheckCircle, 
  Circle, 
  Trophy, 
  Users, 
  Star,
  ExternalLink,
  RefreshCw
} from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  points: number
  maxCompletions: number
  completed: boolean
  completions: number
  type: 'once' | 'daily' | 'limited'
  icon: React.ComponentType<any>
  action: string
  link?: string
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
    icon: Twitter,
    action: 'Follow',
    link: 'https://twitter.com/spineloot'
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
    icon: Twitter,
    action: 'Like & RT',
    link: 'https://twitter.com/spineloot/status/123456789'
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
    icon: MessageCircle,
    action: 'Comment',
    link: 'https://twitter.com/spineloot/status/123456789'
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
    icon: Twitter,
    action: 'Quote Tweet',
    link: 'https://twitter.com/spineloot/status/123456789'
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
    icon: Twitter,
    action: 'Tweet',
    link: 'https://twitter.com/intent/tweet?text=🎰 Excited about @SpinLoot! The future of Web3 gaming is here! #SpinLoot'
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
    icon: Users,
    action: 'Join Space',
    link: 'https://twitter.com/spineloot'
  }
]

const Airdrop = () => {
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
    if (points >= 60) return { name: 'Creator', color: 'text-casino-gold', icon: Trophy }
    if (points >= 30) return { name: 'Base', color: 'text-casino-blue', icon: Star }
    return { name: 'Newcomer', color: 'text-white/60', icon: Circle }
  }

  const tier = getTier(airdropData.totalPoints)

  return (
    <Section id="airdrop" className="relative overflow-hidden bg-black/90 backdrop-blur-md">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid bg-[length:20px_20px] opacity-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-casino-red/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-casino-gold/10 rounded-full blur-3xl" />
      
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-casino-gold/30 px-4 py-2 text-casino-gold bg-casino-gold/10 mb-4">
            <Trophy className="w-5 h-5" />
            <span className="text-sm font-semibold">Social Airdrop Campaign</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            SpinLoot Social Airdrop
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Complete social tasks to earn points and qualify for $SPNL airdrop rewards. 
            Base tier requires 30+ points, Creator tier requires 60+ points.
          </p>
          
          {/* Progress Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="text-3xl font-bold text-casino-gold mb-2">
                {airdropData.totalPoints}
              </div>
              <div className="text-white/70 text-sm">Total Points</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className={`text-2xl font-bold mb-2 ${tier.color}`}>
                {tier.name}
              </div>
              <div className="text-white/70 text-sm">Current Tier</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="text-3xl font-bold text-casino-red mb-2">
                {airdropData.tasks.filter(t => t.completed).length}/{airdropData.tasks.length}
              </div>
              <div className="text-white/70 text-sm">Tasks Completed</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {airdropData.tasks.map((task, index) => {
            const Icon = task.icon
            const progress = (task.completions / task.maxCompletions) * 100
            
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 hover:bg-white/5 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-casino-gold/20">
                      <Icon className="w-5 h-5 text-casino-gold" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{task.title}</h3>
                      <p className="text-white/70 text-sm">{task.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-casino-gold font-bold text-lg">{task.points} pts</div>
                    <div className="text-white/50 text-xs">
                      {task.completions}/{task.maxCompletions}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                  <div 
                    className="bg-gradient-to-r from-casino-gold to-casino-red h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {task.link && (
                    <a
                      href={task.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-casino-blue/20 hover:bg-casino-blue/30 text-casino-blue hover:text-white transition-all duration-300 border border-casino-blue/30 hover:border-casino-blue/50"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-semibold">{task.action}</span>
                    </a>
                  )}
                  
                  <button
                    onClick={() => completeTask(task.id)}
                    disabled={task.completed}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      task.completed
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-not-allowed'
                        : 'bg-casino-gold/20 hover:bg-casino-gold/30 text-casino-gold hover:text-white border border-casino-gold/30 hover:border-casino-gold/50'
                    }`}
                  >
                    {task.completed ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                    <span className="text-sm font-semibold">
                      {task.completed ? 'Completed' : 'Mark Complete'}
                    </span>
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footer Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Campaign Rules</h3>
            <div className="text-left space-y-3 text-sm text-white/70 mb-6">
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
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="w-full sm:w-auto">
                🎰 Join SpinLoot
              </Button>
              <button
                onClick={resetProgress}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="font-semibold">Reset Progress</span>
              </button>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}

export default Airdrop
