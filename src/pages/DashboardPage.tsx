import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Clock, Bot } from 'lucide-react';
import { useAirdrop } from '../contexts/AirdropContext';
import { IoIosStarOutline } from "react-icons/io";
import { FaUserSecret } from "react-icons/fa";
import { LuFileText } from "react-icons/lu";

const DashboardPage = () => {
  const { airdropData } = useAirdrop();

  const getTier = (points: number) => {
    if (points >= 60) return { name: 'Cosmic Creator', color: 'text-astro-accent', icon: Trophy, reward: '30M $SPNL Raffle Entry' };
    if (points >= 30) return { name: 'Space Explorer', color: 'text-astro-primary', icon: Trophy, reward: 'Base Airdrop' };
    return { name: 'Newcomer', color: 'text-white/60', icon: Trophy, reward: 'Keep earning points!' };
  };

  const tier = getTier(airdropData.totalPoints);

  return (
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

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="astro-glass rounded-2xl p-4 sm:p-8"
      >
        <h3 className="text-lg sm:text-xl font-bold text-astro-primary mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <motion.button
            className="p-4 rounded-lg bg-astro-primary/10 text-astro-primary border border-astro-primary/30 hover:bg-astro-primary/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaUserSecret className="w-8 h-8 mx-auto mb-2" />
            <span className="font-semibold">Social Tasks</span>
          </motion.button>
          
          <motion.button
            className="p-4 rounded-lg bg-astro-secondary/10 text-astro-secondary border border-astro-secondary/30 hover:bg-astro-secondary/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IoIosStarOutline className="w-8 h-8 mx-auto mb-2" />
            <span className="font-semibold">Daily Spin</span>
          </motion.button>
          
          <motion.button
            className="p-4 rounded-lg bg-astro-accent/10 text-astro-accent border border-astro-accent/30 hover:bg-astro-accent/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LuFileText className="w-8 h-8 mx-auto mb-2" />
            <span className="font-semibold">Whitepaper</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
