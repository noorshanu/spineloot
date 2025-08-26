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
  MessageCircle
} from 'lucide-react';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReferralModal({ isOpen, onClose }: ReferralModalProps) {
  const [copied, setCopied] = useState(false);
  const [referralCode] = useState('SPINLOOT2024');
  const [referralLink] = useState('https://spinloot.com/ref/SPINLOOT2024');

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
    { label: 'Total Referrals', value: '24', icon: Users },
    { label: 'Earnings', value: '120 SPIN', icon: Gift },
    { label: 'Active Referrals', value: '18', icon: Star },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-gradient-to-br from-astro-panel to-astro-dark rounded-3xl border border-astro-primary/20 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative p-6 border-b border-astro-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-astro-primary astro-text">
                    Refer & Earn
                  </h2>
                  <p className="text-white/70 mt-1">
                    Invite friends and earn rewards together!
                  </p>
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
            <div className="p-6 space-y-6">
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
                    <span>Earn <strong className="text-astro-accent">50 SPIN</strong> for each successful referral</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-astro-accent rounded-full" />
                    <span>Your friends get <strong className="text-astro-secondary">25 SPIN</strong> bonus on signup</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-astro-accent rounded-full" />
                    <span>Unlock exclusive rewards at milestone referrals</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
