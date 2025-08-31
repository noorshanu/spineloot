import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import apiService from '../services/api';

interface User {
  id: string;
  walletAddress: string;
  displayName?: string;
  email?: string;
  avatar?: string;
  role: string;
  totalPoints: number;
  currentTier: string;
  referralCode: string;
  referralCount: number;
  totalReferralEarnings: number;
  isActive: boolean;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  connectWallet: (referralCode?: string) => Promise<void>;
  disconnectWallet: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { publicKey, connected } = useWallet();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for existing token and user data on mount
  useEffect(() => {
    const token = apiService.getToken();
    if (token) {
      refreshUser();
    }
  }, []);

  // Auto-connect when wallet connects
  useEffect(() => {
    if (connected && publicKey && !user) {
      // Add a small delay to prevent rapid requests
      const timer = setTimeout(() => {
        connectWallet();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [connected, publicKey, user]);

  const connectWallet = async (referralCode?: string) => {
    if (!publicKey) {
      setError('No wallet connected');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const walletAddress = publicKey.toString();
      
      // Check for referral code in URL parameters and localStorage
      const urlParams = new URLSearchParams(window.location.search);
      const urlReferralCode = urlParams.get('ref') || urlParams.get('referral');
      const pendingReferralCode = localStorage.getItem('pendingReferralCode');
      const finalReferralCode = referralCode || urlReferralCode || pendingReferralCode;

      const response = await apiService.connectWallet(
        walletAddress,
        finalReferralCode || undefined,
        undefined, // displayName
        undefined  // email
      );

      if (response.status === 'success' && response.data) {
        const { user: userData, token } = response.data!;
        apiService.setToken(token);
        setUser(userData);
        
        // Clear referral code from URL and localStorage
        if (finalReferralCode) {
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete('ref');
          newUrl.searchParams.delete('referral');
          window.history.replaceState({}, '', newUrl.toString());
          localStorage.removeItem('pendingReferralCode');
        }
      } else {
        setError(response.message || 'Failed to connect wallet');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setUser(null);
    apiService.clearToken();
    setError(null);
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const response = await apiService.updateProfile(updates);
      if (response.status === 'success' && response.data) {
        setUser(response.data as User);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    if (!apiService.getToken()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await apiService.getProfile();
      if (response.status === 'success' && response.data) {
        setUser(response.data);
      } else {
        // Token might be invalid, clear it
        apiService.clearToken();
        setUser(null);
      }
    } catch (err) {
      // Token might be invalid, clear it
      apiService.clearToken();
      setUser(null);
      setError(err instanceof Error ? err.message : 'Failed to refresh user');
    } finally {
      setLoading(false);
    }
  };

  const value: UserContextType = {
    user,
    loading,
    error,
    connectWallet,
    disconnectWallet,
    updateProfile,
    refreshUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
