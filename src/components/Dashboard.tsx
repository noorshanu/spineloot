import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  TrendingUp,
  Clock,
  Bot,
  Menu,
  X,
  Home,
  LayoutDashboard,
  Users,
  Star,
  FileText,
  UserPlus
} from 'lucide-react';
import DailySpinner from './DailySpinner';
import { WalletConnectButton } from './WalletConnectButton';
import { Link } from 'react-router-dom';

interface DashboardProps {
  airdropData: any;
  onSpinnerReward: (points: number) => void;
  onTaskComplete?: (taskId: string) => void;
  onActionClicked?: (taskId: string) => void;
}

export default function Dashboard({ airdropData, onSpinnerReward, onTaskComplete, onActionClicked }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSpinnerSpinning, setIsSpinnerSpinning] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const handleSpinnerReward = (points: number) => {
    onSpinnerReward(points);
  };

  const handleSpinComplete = () => {
    setIsSpinnerSpinning(false);
  };

  const getTier = (points: number) => {
    if (points >= 60) return { name: 'Cosmic Creator', color: 'text-astro-accent', icon: Trophy, reward: '30M $SPNL Raffle Entry' };
    if (points >= 30) return { name: 'Space Explorer', color: 'text-astro-primary', icon: Trophy, reward: 'Base Airdrop' };
    return { name: 'Newcomer', color: 'text-white/60', icon: Trophy, reward: 'Keep earning points!' };
  };

  const tier = getTier(airdropData.totalPoints);



  const renderDashboardContent = () => (
    <div className="space-y-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="astro-glass rounded-2xl p-4 sm:p-8"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-astro-primary via-astro-secondary to-astro-accent mb-4 astro-text">
              Welcome to SpinLoot Universe
            </h1>
            <p className="text-base sm:text-lg text-astro-light/70 mb-6">
              Experience true cosmic gaming control. Complete missions, earn points, and unlock rewards in the most entertaining Web3 gaming platform.
            </p>
            <motion.button
              className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-astro-primary to-astro-secondary text-white font-bold text-base sm:text-lg shadow-lg shadow-astro-primary/40 hover:shadow-neon transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
              Control Now
            </motion.button>
          </div>
          <div className="hidden lg:block">
            <img 
              src="/bot-hero.png" 
              alt="SpinLoot Bot" 
              className="w-32 h-32 drop-shadow-2xl"
            />
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="astro-glass rounded-2xl p-4 sm:p-6 text-center"
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-astro-accent" />
            <div className="text-2xl sm:text-3xl font-bold text-astro-primary astro-text">
              {airdropData.totalPoints}
            </div>
          </div>
          <div className="text-white/70 font-semibold text-sm sm:text-base">All-Time Prisma Points</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="astro-glass rounded-2xl p-4 sm:p-6 text-center"
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-astro-secondary" />
            <div className="text-2xl sm:text-3xl font-bold text-astro-secondary astro-text">
              10
            </div>
          </div>
          <div className="text-white/70 font-semibold text-sm sm:text-base">Daily Prisma Points</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="astro-glass rounded-2xl p-4 sm:p-6 text-center sm:col-span-2 lg:col-span-1"
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-astro-primary" />
            <div className="text-2xl sm:text-3xl font-bold text-astro-primary astro-text">
              0
            </div>
          </div>
          <div className="text-white/70 font-semibold text-sm sm:text-base">Data Hours Contributed</div>
        </motion.div>
      </div>



      {/* Current Tier */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="astro-glass rounded-2xl p-4 sm:p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-astro-primary mb-2">Current Tier</h3>
            <div className={`text-xl sm:text-2xl font-bold ${tier.color} astro-text mb-2`}>
              {tier.name}
            </div>
            <p className="text-white/70 text-sm sm:text-base">{tier.reward}</p>
          </div>
          <div className="text-center sm:text-right">
            <div className="text-sm text-white/50 mb-2">Progress to next tier</div>
            <div className="w-full sm:w-32 h-3 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-astro-primary to-astro-secondary rounded-full"
                style={{ width: `${Math.min((airdropData.totalPoints / 30) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Earnings Chart */}
      
    </div>
  );

  const renderSocialTasks = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="astro-glass rounded-2xl p-4 sm:p-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-astro-primary mb-6 astro-text">Social Tasks</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {airdropData.tasks.map((task: any, index: number) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="astro-glass rounded-xl p-4 sm:p-6 hover:bg-astro-primary/5 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-base sm:text-lg mb-2">{task.title}</h3>
                  <p className="text-white/70 text-sm">{task.description}</p>
                </div>
                <div className="text-right ml-4">
                  <div className="text-astro-primary font-bold text-lg sm:text-xl">{task.points} pts</div>
                  <div className="text-white/50 text-sm">{task.completions}/{task.maxCompletions}</div>
                </div>
              </div>
              
              <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                <div 
                  className="bg-gradient-to-r from-astro-primary to-astro-secondary h-2 rounded-full"
                  style={{ width: `${(task.completions / task.maxCompletions) * 100}%` }}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {task.link && (
                  <a
                    href={task.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onActionClicked?.(task.id)}
                    className="flex-1 px-4 py-2 rounded-lg bg-astro-accent/20 text-astro-accent text-center text-sm font-semibold hover:bg-astro-accent/30 transition-all"
                  >
                    {task.action}
                  </a>
                )}
                <button
                  onClick={() => onTaskComplete?.(task.id)}
                  disabled={task.completed || !task.actionClicked}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    task.completed
                      ? 'bg-astro-success/20 text-astro-success cursor-not-allowed'
                      : !task.actionClicked
                      ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                      : 'bg-astro-primary/20 text-astro-primary hover:bg-astro-primary/30'
                  }`}
                >
                  {task.completed 
                    ? 'Completed' 
                    : !task.actionClicked 
                    ? 'Complete Action First' 
                    : 'Mark Complete'
                  }
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderDailySpin = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="astro-glass rounded-2xl p-4 sm:p-8 text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-astro-primary/30 px-4 py-2 text-astro-primary bg-astro-primary/10 mb-6">
          <Trophy className="w-5 h-5" />
          <span className="text-sm font-semibold">Daily Space Mission</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4">
          Daily Cosmic Spin
        </h2>
        
        <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-8">
          Spin the cosmic wheel once daily to earn bonus points for your airdrop campaign! 
          Higher rewards have lower chances - test your cosmic luck! 🚀
        </p>

        <div className="max-w-md mx-auto">
          <DailySpinner
            onRewardEarned={handleSpinnerReward}
            isSpinning={isSpinnerSpinning}
            onSpinComplete={handleSpinComplete}
          />
        </div>
      </motion.div>
    </div>
  );

  const renderWhitepaper = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="astro-glass rounded-2xl p-4 sm:p-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-astro-primary mb-6 astro-text">Whitepaper</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-astro-secondary mb-4">SpinLoot Protocol</h3>
              <p className="text-white/70 mb-4 text-sm sm:text-base">
                SpinLoot is a revolutionary Web3 gaming platform built on Solana that combines 
                entertainment with earning opportunities through innovative blockchain technology.
              </p>
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-astro-primary/20 text-astro-primary hover:bg-astro-primary/30 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trophy className="w-5 h-5" />
                Read Full Whitepaper
              </motion.button>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-astro-secondary mb-4">Key Features</h3>
              <ul className="space-y-3 text-white/70 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-astro-primary rounded-full mt-2 flex-shrink-0" />
                  <span>Decentralized gaming on Solana blockchain</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-astro-primary rounded-full mt-2 flex-shrink-0" />
                  <span>Fair and transparent reward distribution</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-astro-primary rounded-full mt-2 flex-shrink-0" />
                  <span>Community-driven development and governance</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-astro-primary rounded-full mt-2 flex-shrink-0" />
                  <span>Cross-platform compatibility and accessibility</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-astro-secondary mb-4">Tokenomics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-lg bg-astro-primary/10">
                  <span className="text-white/70 text-sm sm:text-base">Total Supply</span>
                  <span className="font-bold text-astro-primary text-sm sm:text-base">1,000,000,000 SPIN</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-lg bg-astro-secondary/10">
                  <span className="text-white/70 text-sm sm:text-base">Community Rewards</span>
                  <span className="font-bold text-astro-secondary text-sm sm:text-base">40%</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-lg bg-astro-accent/10">
                  <span className="text-white/70 text-sm sm:text-base">Development</span>
                  <span className="font-bold text-astro-accent text-sm sm:text-base">20%</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-lg bg-astro-success/10">
                  <span className="text-white/70 text-sm sm:text-base">Liquidity</span>
                  <span className="font-bold text-astro-success text-sm sm:text-base">30%</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-lg bg-astro-warning/10">
                  <span className="text-white/70 text-sm sm:text-base">Team</span>
                  <span className="font-bold text-astro-warning text-sm sm:text-base">10%</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-astro-secondary mb-4">Roadmap</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-astro-success rounded-full" />
                  <span className="text-white/70 text-sm sm:text-base">Q1 2024: Platform Launch</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-astro-primary rounded-full" />
                  <span className="text-white/70 text-sm sm:text-base">Q2 2024: Mobile App</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-astro-secondary rounded-full" />
                  <span className="text-white/70 text-sm sm:text-base">Q3 2024: NFT Integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-astro-accent rounded-full" />
                  <span className="text-white/70 text-sm sm:text-base">Q4 2024: DAO Governance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboardContent();
      case 'social':
        return renderSocialTasks();
      case 'daily-spin':
        return renderDailySpin();
      case 'whitepaper':
        return renderWhitepaper();
      default:
        return renderDashboardContent();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-astro-bg via-astro-panel to-astro-dark">
      {/* Background Effects */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 astro-grid opacity-10" />
        <div className="absolute top-0 left-0 w-full h-full bg-radial-primary opacity-20" />
        <div className="absolute top-0 right-0 w-full h-full bg-radial-secondary opacity-15" />
      </div>

      {/* Top Navigation */}
      <div className="sticky top-0 z-50 bg-astro-panel/80 backdrop-blur-md border-b border-astro-primary/20">
        <div className="flex items-center justify-between p-4">
          {/* Logo and Menu Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-lg bg-astro-primary/20 text-astro-primary hover:bg-astro-primary/30 transition-all"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="SpinLoot" className="w-8 h-8 rounded-full" />
              <span className="text-astro-primary font-bold text-xl astro-text">SpinLoot</span>
            </div>
          </div>

          {/* Wallet Connection */}
          <WalletConnectButton />
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className={`fixed lg:relative z-40 w-64 bg-astro-panel/95 backdrop-blur-md border-r border-astro-primary/20 min-h-screen lg:min-h-0 transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Navigation */}
          <nav className="p-4 pt-8 lg:pt-4">
            <ul className="space-y-2">
              {[
                { id: 'home', label: 'Home', icon: Home, isLink: true, path: '/' },
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'social', label: 'Social Tasks', icon: Users },
                { id: 'daily-spin', label: 'Daily Spin', icon: Star },
                { id: 'whitepaper', label: 'Whitepaper', icon: FileText },
                { id: 'referral', label: 'Refer & Earn', icon: UserPlus, isLink: true, path: '/referral' },
              ].map((item) => {
                const Icon = item.icon;
                
                if (item.isLink) {
                  return (
                    <li key={item.id}>
                      <Link
                        to={item.path || '/'}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-white/70 hover:text-white hover:bg-white/10"
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-semibold">{item.label}</span>
                      </Link>
                    </li>
                  );
                }
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        activeTab === item.id
                          ? 'bg-astro-primary/20 text-astro-primary border border-astro-primary/30'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-semibold">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>



          {/* Account Section */}
          <div className="absolute bottom-6 left-4 right-4">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-astro-accent/20 text-astro-accent border border-astro-accent/30 hover:bg-astro-accent/30 transition-all">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">Account</span>
            </button>
          </div>
        </motion.div>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-0">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
