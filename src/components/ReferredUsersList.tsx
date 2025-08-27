import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Gift, Calendar, Coins } from 'lucide-react';
import { apiService } from '../services/api';

interface ReferredUser {
  id: string;
  walletAddress: string;
  displayName?: string;
  joinedAt: string;
  earnedPoints: number;
}

interface ReferredUsersData {
  referredUsers: ReferredUser[];
  totalReferred: number;
  totalEarnings: number;
}

const ReferredUsersList = () => {
  const [data, setData] = useState<ReferredUsersData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReferredUsers();
  }, []);

  const fetchReferredUsers = async () => {
    try {
      setLoading(true);
      const response = await apiService.getReferredUsers();
      if (response.status === 'success' && response.data) {
        setData(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch referred users');
    } finally {
      setLoading(false);
    }
  };

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-astro-accent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-400 mb-4">Error: {error}</div>
        <button
          onClick={fetchReferredUsers}
          className="px-4 py-2 bg-astro-accent text-white rounded-lg hover:bg-astro-accent/80 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-astro-secondary/20 backdrop-blur-sm rounded-2xl p-6 border border-astro-accent/20">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-astro-accent" />
          <h2 className="text-xl font-bold text-astro-primary">Referred Users</h2>
        </div>
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-astro-accent"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-astro-secondary/20 backdrop-blur-sm rounded-2xl p-6 border border-astro-accent/20"
    >
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-astro-accent" />
        <h2 className="text-xl font-bold text-astro-primary">Referred Users</h2>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-astro-secondary/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-astro-accent">{data.totalReferred}</div>
          <div className="text-sm text-white/70">Total Referred</div>
        </div>
        <div className="bg-astro-secondary/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-astro-accent">{data.totalEarnings}</div>
          <div className="text-sm text-white/70">Total Earnings</div>
        </div>
      </div>

      {/* Users List */}
      {data.referredUsers.length === 0 ? (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-white/30 mx-auto mb-4" />
          <p className="text-white/60">No users referred yet</p>
          <p className="text-sm text-white/40 mt-2">Share your referral code to start earning 100 points per referral!</p>
          <div className="mt-4 p-4 bg-astro-accent/10 rounded-lg border border-astro-accent/20">
            <p className="text-sm text-astro-accent font-semibold">How it works:</p>
            <ul className="text-xs text-white/60 mt-2 space-y-1">
              <li>• Share your referral code with friends</li>
              <li>• They get 50 points when they sign up</li>
              <li>• You earn 100 points for each successful referral</li>
              <li>• Track all your referrals and earnings here</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {data.referredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-astro-secondary/20 rounded-lg p-4 border border-astro-accent/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="font-medium text-astro-primary">
                      {user.displayName || formatWalletAddress(user.walletAddress)}
                    </span>
                  </div>
                  <div className="text-sm text-white/60">
                    {formatWalletAddress(user.walletAddress)}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-white/70">
                    <Calendar className="w-4 h-4" />
                    {formatDate(user.joinedAt)}
                  </div>
                  <div className="flex items-center gap-1 text-astro-accent">
                    <Coins className="w-4 h-4" />
                    +{user.earnedPoints}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ReferredUsersList;
