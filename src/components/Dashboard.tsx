import React, { useState, useEffect } from 'react';
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
import { Link, useLocation } from 'react-router-dom';
import { useAirdrop } from '../contexts/AirdropContext';
import { useUser } from '../contexts/UserContext';

export default function Dashboard() {
  const { airdropData, completeTask, spinDailySpinner, loading, refreshTasks } = useAirdrop();
  const { user } = useUser();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSpinnerSpinning, setIsSpinnerSpinning] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [actionClickedTasks, setActionClickedTasks] = useState<Set<string>>(new Set());
  const [whitepaperActiveTab, setWhitepaperActiveTab] = useState('overview');

  // Handle navigation state from other pages
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);


  const handleSpinnerReward = async (points: number) => {
    try {
      const result = await spinDailySpinner();
      // Refresh tasks after spinner to update points
      await refreshTasks();
      // The spinner component will handle the animation
    } catch (error) {
      console.error('Failed to spin:', error);
    }
  };

  const handleSpinComplete = () => {
    setIsSpinnerSpinning(false);
  };

  const handleTaskComplete = async (taskId: string) => {
    try {
      await completeTask(taskId);
      // Refresh tasks after completion
      await refreshTasks();
    } catch (error) {
      console.error('Failed to complete task:', error);
    }
  };

  const handleActionClicked = (taskId: string) => {
    setActionClickedTasks(prev => new Set(prev).add(taskId));
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
              {airdropData.totalPoints || 0}
            </div>
          </div>
          <div className="text-white/70 font-semibold text-sm sm:text-base">All-Time Points</div>
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
                style={{ width: `${Math.min((airdropData.totalPoints / 60) * 100, 100)}%` }}
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
        
        {/* Show wallet connect button if user is not connected */}
        {!user ? (
          <div className="text-center py-12">
            <div className="mb-6">
              <Users className="w-16 h-16 mx-auto text-astro-primary/50 mb-4" />
              <h3 className="text-xl font-semibold text-white/70 mb-2">Connect Your Wallet</h3>
              <p className="text-white/50 text-sm max-w-md mx-auto">
                Connect your wallet to view and complete social tasks. Earn points by following, liking, and engaging with SpinLoot on social media!
              </p>
            </div>
            <div className="flex justify-center">
              <WalletConnectButton />
            </div>
          </div>
        ) : (
          /* Show tasks if user is connected */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {airdropData.tasks && airdropData.tasks.length > 0 ? (
              airdropData.tasks.map((task: any, index: number) => {
                const actionClicked = actionClickedTasks.has(task.taskId);
                return (
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
                        onClick={() => handleActionClicked(task.taskId)}
                        className="flex-1 px-4 py-2 rounded-lg bg-astro-accent/20 text-astro-accent text-center text-sm font-semibold hover:bg-astro-accent/30 transition-all"
                      >
                        {task.action}
                      </a>
                    )}
                    <button
                      onClick={() => handleTaskComplete(task.taskId)}
                      disabled={task.completed || !actionClicked}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        task.completed
                          ? 'bg-astro-success/20 text-astro-success cursor-not-allowed'
                          : !actionClicked
                          ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                          : 'bg-astro-primary/20 text-astro-primary hover:bg-astro-primary/30'
                      }`}
                    >
                      {task.completed 
                        ? 'Completed' 
                        : !actionClicked 
                        ? 'Complete Action First' 
                        : 'Mark Complete'
                      }
                    </button>
                  </div>
                </motion.div>
              );
            })
            ) : (
              /* Show loading or no tasks message */
              <div className="col-span-full text-center py-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-astro-primary/30 px-4 py-2 text-astro-primary bg-astro-primary/10 mb-4">
                  <Users className="w-5 h-5" />
                  <span className="text-sm font-semibold">Loading Tasks...</span>
                </div>
                <p className="text-white/50 text-sm">Fetching your social tasks...</p>
              </div>
            )}
          </div>
        )}
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

  const renderWhitepaper = () => {
    const tabs = [
      { id: 'overview', label: 'Overview', icon: '📋' },
      { id: 'vision', label: 'Vision', icon: '🎯' },
      { id: 'product', label: 'Product', icon: '🎮' },
      { id: 'token', label: '$SPIN Token', icon: '💰' },
      { id: 'economy', label: 'Economy', icon: '📊' },
      { id: 'roadmap', label: 'Roadmap', icon: '🗺️' },
    ];

    const renderTabContent = () => {
      switch (whitepaperActiveTab) {
        case 'overview':
          return (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-astro-secondary mb-4">Introduction</h3>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                  SpinLoot is a Telegram-based, spinning-style crypto game on Solana. Players spin for prizes—$SPIN tokens, SOL, NFTs, and jackpot loot boxes—in a provably fair, snackable loop that feels like an arcade and spreads like a meme. There are no player deposits or wagering. Progression and rewards are driven by free daily energy, quests, streaks, referrals, parties/guilds, and seasonal events. Prizes are funded via sponsors and a game treasury fed by in-app earned-token sinks.
                </p>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed mt-4">
                  Why Telegram? It collapses the onboarding funnel. Players start in one tap, with wallet flows handled behind a simple UI. Why Solana? It gives us ultra-fast, low-fee transactions for instant prize delivery, item mints, and verifiable randomness.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-astro-secondary mb-4">Market Problem & Opportunity</h3>
                <ul className="space-y-3 text-white/70 text-sm sm:text-base">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-astro-primary rounded-full mt-2 flex-shrink-0" />
                    <span><strong>Onboarding friction:</strong> Most Web3 games demand wallets, bridges, and confusing signers. Result: churn.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-astro-primary rounded-full mt-2 flex-shrink-0" />
                    <span><strong>Paywalls & toxicity:</strong> "Play-to-pay" loops (deposits/lootboxes) erode trust and invite regulatory headaches.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-astro-primary rounded-full mt-2 flex-shrink-0" />
                    <span><strong>Opaqueness:</strong> Jackpot odds and RNG are often unverifiable; users assume the house always wins.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-astro-primary rounded-full mt-2 flex-shrink-0" />
                    <span><strong>Low retention:</strong> Many token games spike at launch, then die when rewards dry up or bots farm them.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-astro-primary rounded-full mt-2 flex-shrink-0" />
                    <span><strong>Weak social loops:</strong> Minimal reasons to invite friends, form teams, or return daily.</span>
                  </li>
                </ul>
                <p className="text-white/70 text-sm sm:text-base mt-4">
                  <strong>SpinLoot's answer:</strong> Telegram-native onboarding, free-to-play economics, provable fairness, and social compulsion (referrals, parties, leaderboards, live events)—all anchored by a utility token that doesn't require pay-in.
                </p>
              </div>
            </div>
          );

        case 'vision':
          return (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-astro-secondary mb-4">Vision</h3>
                <p className="text-white/70 text-sm sm:text-base mb-4">
                  To become the most entertaining, viral, and rewarding spinning game in Web3, powered by:
                </p>
                <ul className="space-y-4 text-white/70 text-sm sm:text-base">
                  <li className="flex items-start gap-4 p-4 rounded-lg bg-astro-primary/10">
                    <span className="text-3xl">🎡</span>
                    <div>
                      <h4 className="font-semibold text-astro-primary mb-1">Arcade Mechanics</h4>
                      <span>Spin-to-win mechanics anyone can pick up in seconds</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 p-4 rounded-lg bg-astro-secondary/10">
                    <span className="text-3xl">⚡</span>
                    <div>
                      <h4 className="font-semibold text-astro-secondary mb-1">Solana Speed</h4>
                      <span>Instant payouts and on-chain state updates</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 p-4 rounded-lg bg-astro-accent/10">
                    <span className="text-3xl">💰</span>
                    <div>
                      <h4 className="font-semibold text-astro-accent mb-1">$SPIN Utility</h4>
                      <span>Progression, buffs, cosmetics, and community control</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 p-4 rounded-lg bg-astro-success/10">
                    <span className="text-3xl">🧠</span>
                    <div>
                      <h4 className="font-semibold text-astro-success mb-1">Normie-Friendly</h4>
                      <span>Telegram UI that removes Web3 friction</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          );

        case 'product':
          return (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-astro-secondary mb-4">Product Overview</h3>
                <div className="space-y-6">
                  <div className="p-6 rounded-lg bg-astro-primary/10">
                    <h4 className="text-lg font-semibold text-astro-primary mb-3">Core Loop</h4>
                    <p className="text-white/70 text-sm sm:text-base">
                      Claim free daily energy → spin → win prizes → complete quests/streaks → climb leaderboards → invite friends → join parties → unlock higher-tier wheels.
                    </p>
                  </div>
                  <div className="p-6 rounded-lg bg-astro-secondary/10">
                    <h4 className="text-lg font-semibold text-astro-secondary mb-3">Prize Types</h4>
                    <p className="text-white/70 text-sm sm:text-base">
                      $SPIN, SOL (sponsor-funded), on-chain NFTs/cosmetics, and seasonal jackpot loot boxes.
                    </p>
                  </div>
                  <div className="p-6 rounded-lg bg-astro-accent/10">
                    <h4 className="text-lg font-semibold text-astro-accent mb-3">Key Features</h4>
                    <ul className="space-y-3 text-white/70 text-sm sm:text-base">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-astro-accent rounded-full mt-2 flex-shrink-0" />
                        <span><strong>No Deposits:</strong> Players never pay to play. Rewards are funded by sponsors and the treasury.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-astro-accent rounded-full mt-2 flex-shrink-0" />
                        <span><strong>Instant Payouts:</strong> Prizes settle on Solana with minimal delay and fees.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-astro-accent rounded-full mt-2 flex-shrink-0" />
                        <span><strong>Provable Fairness:</strong> Each spin uses a verifiable randomness workflow; odds and loot tables are published per season.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );

        case 'token':
          return (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-astro-secondary mb-4">$SPIN Token — Use Cases (Utility Only)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-astro-primary/10">
                      <h4 className="font-semibold text-astro-primary mb-2">Energy Acceleration</h4>
                      <p className="text-white/70 text-sm">Use earned $SPIN to speed up energy refills (no purchases). Portion burned to stabilize supply.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-astro-secondary/10">
                      <h4 className="font-semibold text-astro-secondary mb-2">Tier Access & Time-Locks</h4>
                      <p className="text-white/70 text-sm">Lock earned $SPIN for a fixed period to unlock higher-tier wheels and better loot tables.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-astro-accent/10">
                      <h4 className="font-semibold text-astro-accent mb-2">Loot Modifiers</h4>
                      <p className="text-white/70 text-sm">Redeem $SPIN for optional perks—re-spin vouchers, luck boosts, streak protection, and cosmetic effects.</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-astro-success/10">
                      <h4 className="font-semibold text-astro-success mb-2">Season Pass</h4>
                      <p className="text-white/70 text-sm">Hit gameplay milestones to mint a free pass NFT that improves drops and XP multipliers.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-astro-warning/10">
                      <h4 className="font-semibold text-astro-warning mb-2">Crafting & Cosmetics</h4>
                      <p className="text-white/70 text-sm">Spend $SPIN to combine duplicates into limited skins/frames/emotes (purely cosmetic).</p>
                    </div>
                    <div className="p-4 rounded-lg bg-astro-primary/10">
                      <h4 className="font-semibold text-astro-primary mb-2">Governance</h4>
                      <p className="text-white/70 text-sm">Token-weighted, non-binding votes on next-season themes, prize mixes, and feature priorities.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <p className="text-yellow-400 text-sm font-semibold">
                    <strong>Important:</strong> $SPIN is a utility token. Players cannot deposit money to obtain it inside the game; they earn it by playing.
                  </p>
                </div>
              </div>
            </div>
          );

        case 'economy':
          return (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-astro-secondary mb-4">Economy Design (Free-to-Play, No Wagering)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-lg bg-astro-success/10">
                    <h4 className="text-lg font-semibold text-astro-success mb-3">Sources</h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-astro-success rounded-full mt-2 flex-shrink-0" />
                        <span>Daily energy, streaks, quests, leaderboards, party milestones</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-astro-success rounded-full mt-2 flex-shrink-0" />
                        <span>Referral milestones and community events</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-astro-success rounded-full mt-2 flex-shrink-0" />
                        <span>Seasonal airdrops/partner campaigns</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-6 rounded-lg bg-astro-warning/10">
                    <h4 className="text-lg font-semibold text-astro-warning mb-3">Sinks (Stability)</h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-astro-warning rounded-full mt-2 flex-shrink-0" />
                        <span>Energy accelerators, re-spins, luck boosts, streak protection (partial burn)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-astro-warning rounded-full mt-2 flex-shrink-0" />
                        <span>Crafting/cosmetics & Season Pass mints (burn + treasury top-up)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-astro-warning rounded-full mt-2 flex-shrink-0" />
                        <span>Time-locked tier access (temporary supply reduction)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-astro-warning rounded-full mt-2 flex-shrink-0" />
                        <span>Tournament/event entries (earn-to-enter; sponsor-funded rewards)</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-6 rounded-lg bg-astro-primary/10">
                  <p className="text-white/70 text-sm sm:text-base">
                    <strong>Outcome:</strong> A circular economy that never requires player deposits, funds prizes sustainably, and maintains utility demand for $SPIN without creating a pay-to-win meta.
                  </p>
                </div>
              </div>
            </div>
          );

        case 'roadmap':
          return (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-astro-secondary mb-4">Roadmap</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-astro-success/10">
                      <div className="w-4 h-4 bg-astro-success rounded-full" />
                      <span className="text-white/70 text-sm sm:text-base">MVP: Daily energy, base wheel, quests, referrals, leaderboards</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-astro-primary/10">
                      <div className="w-4 h-4 bg-astro-primary rounded-full" />
                      <span className="text-white/70 text-sm sm:text-base">Anti-Bot & PoP v1: Device signals, cooldown tuning</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-astro-secondary/10">
                      <div className="w-4 h-4 bg-astro-secondary rounded-full" />
                      <span className="text-white/70 text-sm sm:text-base">Tiered Wheels: Time-locked $SPIN access; parties/guilds</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-astro-accent/10">
                      <div className="w-4 h-4 bg-astro-accent rounded-full" />
                      <span className="text-white/70 text-sm sm:text-base">Treasury Loop & Burns: Route spends to prize treasury</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-astro-success/10">
                      <div className="w-4 h-4 bg-astro-success rounded-full" />
                      <span className="text-white/70 text-sm sm:text-base">Season Pass & Crafting: Earn-to-mint pass; cosmetics</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-astro-primary/10">
                      <div className="w-4 h-4 bg-astro-primary rounded-full" />
                      <span className="text-white/70 text-sm sm:text-base">Governance Signaling: Token-holder votes on themes</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-astro-secondary/10">
                      <div className="w-4 h-4 bg-astro-secondary rounded-full" />
                      <span className="text-white/70 text-sm sm:text-base">Creator Quests: KOL-led challenge ladders</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-astro-accent/10">
                      <div className="w-4 h-4 bg-astro-accent rounded-full" />
                      <span className="text-white/70 text-sm sm:text-base">Global Scale: New languages, security audits</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="astro-glass rounded-2xl p-4 sm:p-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-astro-primary mb-6 astro-text">Whitepaper</h2>
          
          {/* Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 sm:gap-3">
                             {tabs.map((tab) => (
                 <motion.button
                   key={tab.id}
                   onClick={() => setWhitepaperActiveTab(tab.id)}
                   className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                     whitepaperActiveTab === tab.id
                       ? 'bg-astro-primary text-white shadow-lg'
                       : 'bg-astro-primary/10 text-astro-primary hover:bg-astro-primary/20'
                   }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={whitepaperActiveTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-[400px]"
          >
            {renderTabContent()}
          </motion.div>

          {/* Download Button */}
          <div className="text-center pt-8 border-t border-astro-primary/20">
            <motion.button
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/tokenomics.pdf';
                link.download = 'tokenomics.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-gradient-to-r from-astro-primary to-astro-secondary text-white font-semibold hover:from-astro-primary/80 hover:to-astro-secondary/80 transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Tokenomics
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  };

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
              className="lg:hidden p-2 rounded-lg bg-astro-primary/20 text-astro-primary hover:bg-astro-primary/30 transition-all z-50"
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
        {/* Desktop Sidebar - Always visible on lg+ screens */}
        <div className="hidden lg:block w-64 bg-astro-panel/95 backdrop-blur-md border-r border-astro-primary/20 h-screen flex flex-col">
          {/* Logo */}
          {/* <div className="p-6 border-b border-astro-primary/20 flex-shrink-0">
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="SpinLoot" className="w-8 h-8 rounded-full" />
              <span className="text-astro-primary font-bold text-xl astro-text">SpinLoot</span>
            </div>
          </div> */}

          {/* Navigation */}
          <nav className="p-4 flex-1">
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
                      onClick={() => setActiveTab(item.id)}
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

          {/* Bottom Section */}
          <div className="p-4 space-y-4 flex-shrink-0">
            {/* Account Section */}
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-astro-accent/20 text-astro-accent border border-astro-accent/30 hover:bg-astro-accent/30 transition-all">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">Account</span>
            </button>
          </div>
        </div>

        {/* Mobile Sidebar - Slides in/out */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: isSidebarOpen ? 0 : -300 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`fixed lg:hidden z-50 w-64 bg-astro-panel/95 backdrop-blur-md border-r border-astro-primary/20 h-screen flex flex-col`}
        >
          {/* Logo */}
          <div className="p-6 border-b border-astro-primary/20 flex-shrink-0">
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="SpinLoot" className="w-8 h-8 rounded-full" />
              <span className="text-astro-primary font-bold text-xl astro-text">SpinLoot</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 flex-1">
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

          {/* Bottom Section */}
          <div className="p-4 space-y-4 flex-shrink-0">
            {/* Account Section */}
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-astro-accent/20 text-astro-accent border border-astro-accent/30 hover:bg-astro-accent/30 transition-all">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">Account</span>
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 min-h-screen lg:min-h-0">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
