import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star } from 'lucide-react';
import DailySpinner from '../components/DailySpinner';
import { useAirdrop } from '../contexts/AirdropContext';

const DailySpinPage = () => {
  const { airdropData, spinDailySpinner, refreshTasks } = useAirdrop();
  const [isSpinnerSpinning, setIsSpinnerSpinning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [completedTaskPoints, setCompletedTaskPoints] = useState(0);

  const handleSpinnerReward = async (points: number) => {
    try {
      const result = await spinDailySpinner();
      await refreshTasks();
      setCompletedTaskPoints(points);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to spin:', error);
    }
  };

  const handleSpinComplete = () => {
    setIsSpinnerSpinning(false);
  };

  const getTier = (points: number) => {
    if (points >= 60) return { name: 'Cosmic Creator', color: 'text-astro-accent', icon: Trophy, reward: '30M $SPNL Raffle Entry' };
    if (points >= 30) return { name: 'Space Explorer', color: 'text-astro-primary', icon: Trophy, reward: 'Base Airdrop' };
    return { name: 'Newcomer', color: 'text-white/60', icon: Star, reward: 'Keep earning points!' };
  };

  const tier = getTier(airdropData.totalPoints);

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="astro-glass rounded-2xl p-4 sm:p-8 text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-astro-primary/30 px-4 py-2 text-astro-primary bg-astro-primary/10 mb-6">
          <Trophy className="w-5 h-5" />
          <span className="text-sm font-semibold">Daily Space Mission</span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4">
          Daily Cosmic Spin
        </h1>
        
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
            <Star className="w-6 h-6 sm:w-8 sm:h-8 text-astro-secondary" />
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
            <Star className="w-6 h-6 sm:w-8 sm:h-8 text-astro-primary" />
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

      {/* Confetti Celebration */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
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
              <p className="text-lg text-white/80 font-semibold">Daily Spin Completed!</p>
              <p className="text-sm text-white/60 mt-2">+{completedTaskPoints} Points Earned</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DailySpinPage;
