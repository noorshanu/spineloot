import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, Star } from 'lucide-react';
import { WalletConnectButton } from '../components/WalletConnectButton';
import { useAirdrop } from '../contexts/AirdropContext';
import { useUser } from '../contexts/UserContext';

const SocialTasksPage = () => {
  const { airdropData, completeTask, refreshTasks } = useAirdrop();
  const { user } = useUser();
  const [actionClickedTasks, setActionClickedTasks] = useState<Set<string>>(new Set());

  const handleTaskComplete = async (taskId: string) => {
    try {
      await completeTask(taskId);
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
    return { name: 'Newcomer', color: 'text-white/60', icon: Star, reward: 'Keep earning points!' };
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
              Social Tasks
            </h1>
            <p className="text-base sm:text-lg text-astro-light/70 mb-6">
              Complete social media tasks to earn points and climb the leaderboard. The more you engage, the more you earn!
            </p>
          </div>
          <div className="hidden lg:block">
            <Users className="w-32 h-32 text-astro-primary/20" />
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
            <Star className="w-6 h-6 sm:w-8 sm:h-8 text-astro-secondary" />
            <div className="text-2xl sm:text-3xl font-bold text-astro-secondary astro-text">
              {airdropData.tasks?.filter((task: any) => task.completed).length || 0}
            </div>
          </div>
          <div className="text-white/70 font-semibold text-sm sm:text-base">Completed Tasks</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="astro-glass rounded-2xl p-4 sm:p-6 text-center sm:col-span-2 lg:col-span-1"
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-astro-primary" />
            <div className="text-2xl sm:text-3xl font-bold text-astro-primary astro-text">
              {airdropData.tasks?.length || 0}
            </div>
          </div>
          <div className="text-white/70 font-semibold text-sm sm:text-base">Total Tasks</div>
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

      {/* Social Tasks */}
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
};

export default SocialTasksPage;
