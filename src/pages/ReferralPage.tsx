import React, { useState, useEffect } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import ReferredUsersList from '../components/ReferredUsersList';
import { useUser } from '../contexts/UserContext';
import apiService from '../services/api';

interface ReferralData {
  referralCode: string;
  referralCount: number;
  totalReferralEarnings: number;
  referralLink: string;
}

interface ReferralStats {
  totalReferred: number;
  totalEarnings: number;
}

export default function ReferralPage() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [referralData, setReferralData] = useState<ReferralData | null>(null);
  const [referralStats, setReferralStats] = useState<ReferralStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [manualReferralCode, setManualReferralCode] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const [validatingCode, setValidatingCode] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  
  // Dynamic URL generation
  const baseUrl = 'https://www.spinloot.co/';

  // Fetch referral data
  useEffect(() => {
    if (user) {
      fetchReferralData();
    }
  }, [user]);

  // Check for pending referral code on mount
  useEffect(() => {
    const pendingCode = localStorage.getItem('pendingReferralCode');
    if (pendingCode) {
      setManualReferralCode(pendingCode);
      setValidationMessage('✅ You have a pending referral code: ' + pendingCode);
    }
  }, []);

  const fetchReferralData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch referral info and stats in parallel
      const [referralInfoResponse, referredUsersResponse] = await Promise.all([
        apiService.getReferralInfo(),
        apiService.getReferredUsers(),
      ]);

      if (referralInfoResponse.status === 'success' && referralInfoResponse.data) {
        setReferralData(referralInfoResponse.data as ReferralData);
      }

      if (referredUsersResponse.status === 'success' && referredUsersResponse.data) {
        setReferralStats({
          totalReferred: referredUsersResponse.data.totalReferred,
          totalEarnings: referredUsersResponse.data.totalEarnings,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch referral data');
      console.error('Referral data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string, type: 'code' | 'link') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleAddReferralCode = async () => {
    if (!manualReferralCode.trim()) return;

    try {
      setValidatingCode(true);
      setValidationMessage('');

      const response = await apiService.validateReferralCode(manualReferralCode.trim());
      
      if (response.status === 'success' && response.data?.valid) {
        setValidationMessage('✅ Referral code added successfully! You will get bonus points when you connect your wallet.');
        // Store the valid code in localStorage for when user connects wallet
        localStorage.setItem('pendingReferralCode', manualReferralCode.trim());
        // Hide the manual input after successful addition
        setTimeout(() => {
          setShowManualInput(false);
        }, 3000);
      } else {
        setValidationMessage('❌ Invalid referral code. Please check and try again.');
      }
    } catch (err) {
      setValidationMessage('❌ Error: ' + (err instanceof Error ? err.message : 'Failed to add referral code'));
    } finally {
      setValidatingCode(false);
    }
  };

  const handleNavigation = (tabId: string) => {
    switch (tabId) {
      case 'home':
        navigate('/');
        break;
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'social':
        navigate('/social');
        break;
      case 'daily-spin':
        navigate('/daily-spin');
        break;
      case 'whitepaper':
        navigate('/whitepaper');
        break;
      case 'referral':
        // Already on referral page
        break;
      default:
        break;
    }
  };

  const statsCards = [
    {
      label: 'Total Referrals',
      value: referralStats?.totalReferred || 0,
      icon: Users,
      color: 'text-astro-primary'
    },
    {
      label: 'Referral Earnings',
      value: `${referralStats?.totalEarnings || 0} Points`,
      icon: Gift,
      color: 'text-astro-accent'
    },
    {
      label: 'Current Tier',
      value: 'Newcomer',
      icon: Star,
      color: 'text-astro-success'
    },
    {
      label: 'Total Points',
      value: referralData?.totalReferralEarnings || 0,
      icon: TrendingUp,
      color: 'text-astro-secondary'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-astro-primary via-astro-secondary to-astro-accent astro-text mb-2">
          Refer & Earn
        </h1>
        <p className="text-white/70 text-lg">Invite friends and earn rewards together!</p>
      </div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg"
        >
          <div className="text-red-400 font-semibold">Error: {error}</div>
          <button
            onClick={fetchReferralData}
            className="mt-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            Retry
          </button>
        </motion.div>
      )}

      {/* Referral Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsCards.map((stat, index) => {
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
              <div className="text-2xl font-bold text-astro-primary">
                {loading ? '...' : stat.value}
              </div>
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
               {/* Add Friend's Referral Code */}
               {!user?.referralCode && (
             <div>
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-semibold text-astro-primary">Add Friend's Referral Code</h3>
                 <button
                   onClick={() => setShowManualInput(!showManualInput)}
                   className="text-astro-accent hover:text-astro-secondary transition-colors"
                 >
                   {showManualInput ? 'Hide' : 'Add Code'}
                 </button>
               </div>
             
             {showManualInput && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="astro-glass rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-astro-accent mb-6 flex items-center gap-2">
                <UserPlus className="w-6 h-6" />
                Add Friend's Referral Code
              </h2>
              
              <div className="p-4 bg-astro-primary/10 rounded-lg border border-astro-primary/20">
                <div className="text-sm text-white/70 mb-2">Enter your friend's referral code</div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={manualReferralCode}
                    onChange={(e) => setManualReferralCode(e.target.value.toUpperCase())}
                    placeholder="Enter referral code (e.g., ABC12345)"
                    className="flex-1 px-4 py-2 bg-astro-panel/50 border border-astro-primary/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-astro-primary"
                    maxLength={20}
                  />
                  <button
                    onClick={handleAddReferralCode}
                    disabled={validatingCode || !manualReferralCode.trim()}
                    className="px-6 py-2 bg-astro-accent text-white rounded-lg hover:bg-astro-accent/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {validatingCode ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Adding...
                      </>
                    ) : (
                      'Add'
                    )}
                  </button>
                </div>
                
                {validationMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-3 p-3 rounded-lg text-sm ${
                      validationMessage.includes('✅') 
                        ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                        : validationMessage.includes('❌')
                        ? 'bg-red-500/20 border border-red-500/30 text-red-400'
                        : 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-400'
                    }`}
                  >
                    {validationMessage}
                  </motion.div>
                )}
                
                                 <div className="mt-3 text-xs text-white/60">
                   ⚠️ Important: Once you add a referral code, it cannot be changed. Make sure you enter the correct code!
                 </div>
               </div>
             </motion.div>
           )}
             </div>
           )}
            <div className="space-y-4">
              {/* Referral Code */}
              <div>
                <div className="text-sm text-white/70 mb-2">Referral Code</div>
                <div className="flex items-center gap-3 p-4 bg-astro-primary/10 rounded-lg border border-astro-primary/20">
                  <div className="flex-1">
                    <div className="sm:text-2xl text-xl font-mono font-bold text-astro-primary">
                      {loading ? 'Loading...' : (referralData?.referralCode || user?.referralCode || 'Not available')}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(referralData?.referralCode || user?.referralCode || '', 'code')}
                    className="px-4 py-2 bg-astro-primary text-white rounded-lg hover:bg-astro-primary/80 transition-all flex items-center gap-2"
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
                    <div className="sm:text-sm text-xs font-mono text-astro-secondary break-all">
                      {loading ? 'Loading...' : `${baseUrl}${referralData?.referralCode || user?.referralCode || ''}`}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(`${baseUrl}${referralData?.referralCode || user?.referralCode || ''}`, 'link')}
                    className="px-4 py-2 bg-astro-secondary text-white rounded-lg hover:bg-astro-secondary/80 transition-all flex items-center gap-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="pt-4">
                <div className="text-sm text-white/70 mb-3">Share your referral code:</div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all"
                    onClick={() => {
                      const text = `Join me on SpinLoot ( ${baseUrl} )! Use my referral code: ${referralData?.referralCode || user?.referralCode}`;
                      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
                      window.open(url, '_blank');
                    }}
                  >
                    <Twitter className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all"
                    onClick={() => {
                      const text = `Join me on SpinLoot ( ${baseUrl} )! Use my referral code: ${referralData?.referralCode || user?.referralCode}`;
                      const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
                      window.open(url, '_blank');
                    }}
                  >
                    <MessageCircle className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-all"
                    onClick={() => {
                      const text = `Join me on SpinLoot ( ${baseUrl} )! Use my referral code: ${referralData?.referralCode || user?.referralCode}`;
                      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(baseUrl)}&quote=${encodeURIComponent(text)}`;
                      window.open(url, '_blank');
                    }}
                  >
                    <Facebook className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

       

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
        </motion.div>

        {/* Rewards & History Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Referred Users List */}
          <ReferredUsersList />
        </motion.div>
      </div>
    </div>
  );
}
