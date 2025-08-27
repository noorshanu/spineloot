import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus,
  Copy,
  Check,
  Share2,
  Twitter,
  Facebook,
  Instagram,
  MessageCircle,
  Gift,
  Users,
  Star,
  ArrowLeft,
  TrendingUp,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ReferredUsersList from '../components/ReferredUsersList';
import { useUser } from '../contexts/UserContext';

export default function ReferralPage() {
  const { user } = useUser();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const baseUrl = window.location.origin;
      const referralLink = user?.referralCode 
        ? `${baseUrl}/ref/${user.referralCode}`
        : `${baseUrl}/connect-wallet`;
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(user?.referralCode || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareOptions = [
    { name: 'Twitter', icon: Twitter, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { name: 'Facebook', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-600/10' },
    { name: 'Instagram', icon: Instagram, color: 'text-pink-500', bg: 'bg-pink-500/10' },
    { name: 'WhatsApp', icon: MessageCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
  ];

  const referralStats = [
    { label: 'Total Referrals', value: user?.referralCount?.toString() || '0', icon: Users, color: 'text-astro-primary' },
    { label: 'Referral Earnings', value: `${user?.totalReferralEarnings || 0} Points`, icon: Gift, color: 'text-astro-accent' },
    { label: 'Current Tier', value: user?.currentTier || 'Newcomer', icon: Star, color: 'text-astro-secondary' },
    { label: 'Total Points', value: `${user?.totalPoints || 0}`, icon: TrendingUp, color: 'text-astro-success' },
  ];

  // Remove hardcoded referral history since we'll use real data from ReferredUsersList component

  return (
    <div className="min-h-screen bg-gradient-to-br from-astro-bg via-astro-panel to-astro-dark">
      {/* Background Effects */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 astro-grid opacity-10" />
        <div className="absolute top-0 left-0 w-full h-full bg-radial-primary opacity-20" />
        <div className="absolute top-0 right-0 w-full h-full bg-radial-secondary opacity-15" />
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link
              to="/dashboard"
              className="p-2 rounded-lg bg-astro-primary/20 text-astro-primary hover:bg-astro-primary/30 transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-astro-primary via-astro-secondary to-astro-accent astro-text">
                Refer & Earn
              </h1>
              <p className="text-white/70 mt-2">Invite friends and earn rewards together!</p>
            </div>
          </div>

          {/* Referral Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {referralStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="astro-glass rounded-2xl p-6 text-center"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-2xl font-bold text-astro-primary">{stat.value}</div>
                  <div className="text-white/70 font-semibold">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Referral Code & Link Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="astro-glass rounded-2xl p-6">
                <h2 className="text-xl font-bold text-astro-primary mb-6 flex items-center gap-2">
                  <UserPlus className="w-6 h-6" />
                  Your Referral Code
                </h2>
                
                <div className="space-y-4">
                  {/* Referral Code */}
                  <div>
                    <div className="text-sm text-white/70 mb-2">Referral Code</div>
                    <div className="flex items-center gap-3 p-4 bg-astro-primary/10 rounded-lg border border-astro-primary/20">
                      <div className="flex-1">
                        <div className="text-2xl font-mono font-bold text-astro-primary">{user?.referralCode || 'Loading...'}</div>
                      </div>
                      <button
                        onClick={handleCopyCode}
                        className="px-4 py-2 rounded-lg bg-astro-accent/20 text-astro-accent hover:bg-astro-accent/30 transition-all flex items-center gap-2"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  {/* Referral Link */}
                  <div>
                    <div className="text-sm text-white/70 mb-2">Referral Link</div>
                    <div className="flex items-center gap-3 p-4 bg-astro-secondary/10 rounded-lg border border-astro-secondary/20">
                      <div className="flex-1">
                        <div className="text-sm font-mono text-astro-secondary truncate">
                          {user?.referralCode ? `https://spinloot.com/ref/${user.referralCode}` : 'Loading...'}
                        </div>
                      </div>
                      <button
                        onClick={handleCopy}
                        className="px-4 py-2 rounded-lg bg-astro-secondary/20 text-astro-secondary hover:bg-astro-secondary/30 transition-all flex items-center gap-2"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-astro-secondary mb-4">Share on Social Media</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {shareOptions.map((option, index) => {
                      const Icon = option.icon;
                      return (
                        <motion.button
                          key={option.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-4 rounded-lg ${option.bg} ${option.color} hover:scale-105 transition-all flex items-center justify-center gap-2`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-semibold">{option.name}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Rewards & History Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Rewards Info */}
              <div className="astro-glass rounded-2xl p-6 bg-gradient-to-r from-astro-accent/10 to-astro-secondary/10 border border-astro-accent/20">
                <h2 className="text-xl font-bold text-astro-accent mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6" />
                  Rewards Program
                </h2>
                <div className="space-y-4 text-sm text-white/80">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-astro-accent rounded-full" />
                    <span>Earn <strong className="text-astro-accent">100 Points</strong> for each successful referral</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-astro-accent rounded-full" />
                    <span>Your friends get <strong className="text-astro-secondary">50 Points</strong> bonus on signup</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-astro-accent rounded-full" />
                    <span>Unlock exclusive rewards at milestone referrals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-astro-accent rounded-full" />
                    <span>Earn <strong className="text-astro-success">200 Points</strong> for 10+ referrals</span>
                  </div>
                </div>
              </div>

              {/* Referral History - Removed since we have ReferredUsersList component */}

              {/* Referred Users List */}
              <ReferredUsersList />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
