import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  Users, 
  Gift, 
  Star,
  Twitter,
  Facebook,
  Instagram,
  MessageCircle,
  Wallet,
  Menu,
  ArrowLeft
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReferralModal({ isOpen, onClose }: ReferralModalProps) {
  const [copied, setCopied] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('referral');
  const { user } = useUser();
  
  // Dynamic referral code and link based on user data
  const referralCode = user?.referralCode || 'CONNECT_WALLET';
  const baseUrl = window.location.origin;
  const referralLink = user?.referralCode 
    ? `${baseUrl}/ref/${user.referralCode}`
    : `${baseUrl}/connect-wallet`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
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
    { label: 'Total Referrals', value: user?.referralCount?.toString() || '0', icon: Users },
    { label: 'Earnings', value: `${user?.totalReferralEarnings || 0} Points`, icon: Gift },
    { label: 'Current Tier', value: user?.currentTier || 'Newcomer', icon: Star },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-astro-bg via-astro-panel to-astro-dark"
        >
          {/* Background Effects */}
          <div className="fixed inset-0">
            <div className="absolute inset-0 astro-grid opacity-10" />
            <div className="absolute top-0 left-0 w-full h-full bg-radial-primary opacity-20" />
            <div className="absolute top-0 right-0 w-full h-full bg-radial-secondary opacity-15" />
          </div>

          {/* Navbar */}
          <div className="relative z-10">
            <Navbar />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex h-screen pt-16">
            {/* Sidebar */}
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              onReferralClick={() => {}}
            />

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-h-screen lg:min-h-0">
              {/* Header */}
              <div className="p-6 border-b border-astro-primary/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Link
                      to="/dashboard"
                      className="p-2 rounded-lg bg-astro-primary/20 text-astro-primary hover:bg-astro-primary/30 transition-all"
                    >
                      <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                      <h1 className="text-2xl font-bold text-astro-primary astro-text">
                        Refer & Earn
                      </h1>
                      <p className="text-white/70 mt-1">
                        Invite friends and earn rewards together!
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-astro-primary/10 text-astro-primary hover:bg-astro-primary/20 transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

                            {/* Content */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {/* Wallet Connection Check */}
              {!user ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="astro-glass rounded-xl p-8 text-center border-2 border-dashed border-astro-primary/30"
                >
                  <Wallet className="w-16 h-16 text-astro-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-astro-primary mb-2">
                    Connect Your Wallet
                  </h3>
                  <p className="text-white/70 mb-4">
                    Connect your wallet to get your unique referral code and start earning rewards!
                  </p>
                  <Link
                    to="/dashboard"
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-astro-primary to-astro-secondary text-white font-semibold hover:scale-105 transition-all"
                  >
                    Connect Wallet
                  </Link>
                </motion.div>
              ) : (
                <>
                  {/* Referral Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {referralStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="astro-glass rounded-xl p-4 text-center"
                    >
                      <Icon className="w-8 h-8 text-astro-accent mx-auto mb-2" />
                      <div className="text-2xl font-bold text-astro-primary">{stat.value}</div>
                      <div className="text-sm text-white/70">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Referral Code */}
              <div className="astro-glass rounded-xl p-6">
                <h3 className="text-lg font-semibold text-astro-primary mb-4">
                  Your Referral Code
                </h3>
                <div className="flex items-center gap-3 p-4 bg-astro-primary/10 rounded-lg border border-astro-primary/20">
                  <div className="flex-1">
                    <div className="text-sm text-white/70 mb-1">Referral Code</div>
                    <div className="text-xl font-mono font-bold text-astro-primary">
                      {referralCode}
                    </div>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 rounded-lg bg-astro-accent/20 text-astro-accent hover:bg-astro-accent/30 transition-all flex items-center gap-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Referral Link */}
              <div className="astro-glass rounded-xl p-6">
                <h3 className="text-lg font-semibold text-astro-primary mb-4">
                  Share Your Link
                </h3>
                <div className="flex items-center gap-3 p-4 bg-astro-secondary/10 rounded-lg border border-astro-secondary/20 mb-4">
                  <div className="flex-1">
                    <div className="text-sm text-white/70 mb-1">Referral Link</div>
                    <div className="text-sm font-mono text-astro-secondary truncate">
                      {referralLink}
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

                {/* Share Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {shareOptions.map((option, index) => {
                    const Icon = option.icon;
                    return (
                      <motion.button
                        key={option.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-3 rounded-lg ${option.bg} ${option.color} hover:scale-105 transition-all flex items-center justify-center gap-2`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-semibold">{option.name}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Rewards Info */}
              <div className="astro-glass rounded-xl p-6 bg-gradient-to-r from-astro-accent/10 to-astro-secondary/10 border border-astro-accent/20">
                <h3 className="text-lg font-semibold text-astro-accent mb-4 flex items-center gap-2">
                  <Gift className="w-6 h-6" />
                  Rewards Program
                </h3>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-astro-accent rounded-full" />
                    <span>Earn <strong className="text-astro-accent">100 Points</strong> for each successful referral</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-astro-accent rounded-full" />
                    <span>Your friends get <strong className="text-astro-secondary">50 Points</strong> welcome bonus on signup</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-astro-accent rounded-full" />
                    <span>Unlock exclusive rewards at milestone referrals</span>
                  </div>
                </div>
              </div>
                </>
              )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
