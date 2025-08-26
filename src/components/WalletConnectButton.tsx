import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Wallet, LogOut, CheckCircle, Sparkles } from 'lucide-react';

interface WalletConnectButtonProps {
  className?: string;
}

export const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({ className = '' }) => {
  const { wallet, connected, disconnect } = useWallet();

  if (connected) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {/* Connected Wallet Info */}
        <div className="hidden sm:flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-cyan-500/20 border-2 border-emerald-400/30 hover:border-emerald-400/50 transition-all duration-500 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              {/* <div className="text-sm font-bold text-emerald-300">Connected</div> */}
              <div className="text-xs opacity-90 truncate max-w-32 font-mono text-emerald-200">
                {wallet?.adapter.publicKey?.toString().slice(0, 4)}...{wallet?.adapter.publicKey?.toString().slice(-4)}
              </div>
            </div>
          </div>
        </div>
        
        {/* Disconnect Button */}
        <button
          onClick={disconnect}
          className="px-5 py-3 rounded-2xl bg-gradient-to-br from-red-500/20 via-pink-500/15 to-rose-500/20 text-red-300 hover:from-red-500/30 hover:via-pink-500/25 hover:to-rose-500/30 border-2 border-red-400/30 hover:border-red-400/50 transition-all duration-500 text-sm font-bold flex items-center gap-3 shadow-xl shadow-red-500/20 hover:shadow-red-500/30 hover:scale-105 active:scale-95 backdrop-blur-sm"
        >
          <LogOut className="w-5 h-5" />
          <span className="hidden sm:inline">Disconnect</span>
        </button>
      </div>
    );
  }

  return (
    <WalletMultiButton className={`!bg-gradient-to-br !from-purple-500/20 !via-indigo-500/15 !to-blue-500/20 !text-purple-200 hover:!from-purple-500/30 hover:!via-indigo-500/25 hover:!to-blue-500/30 border-2 !border-purple-400/30 hover:!border-purple-400/50 !transition-all !duration-500 !font-bold !text-sm sm:!text-base !px-6 !py-4 !rounded-2xl !flex !items-center !gap-3 !shadow-xl !shadow-purple-500/20 hover:!shadow-purple-500/30 hover:!scale-105 active:!scale-95 !backdrop-blur-sm ${className}`}>
      <div className="relative">
        <Wallet className="w-6 h-6 mr-3" />
        <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400 animate-ping" />
      </div>
      <span className='text-white font-bold'>Connect Wallet</span>
    </WalletMultiButton>
  );
};
