import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

const WhitepaperPage = () => {
  const [whitepaperActiveTab, setWhitepaperActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'vision', label: 'Vision', icon: '🎯' },
    { id: 'product', label: 'Product', icon: '🎮' },
    { id: 'token', label: '$SPIN Token', icon: '💰' },
    { id: 'economy', label: 'Economy', icon: '📊' },
    { id: 'roadmap', label: 'Roadmap', icon: '🗺️' },
  ];

  const renderTabContent = () => {
    switch (whitepaperActiveTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-astro-secondary mb-4">Introduction</h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                SpinLoot is a Telegram-based, spinning-style crypto game on Solana. Players spin for prizes—$SPIN tokens, SOL, NFTs, and jackpot loot boxes—in a provably fair, snackable loop that feels like an arcade and spreads like a meme. There are no player deposits or wagering. Progression and rewards are driven by free daily energy, quests, streaks, referrals, parties/guilds, and seasonal events. Prizes are funded via sponsors and a game treasury fed by in-app earned-token sinks.
              </p>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed mt-4">
                Why Telegram? It collapses the onboarding funnel. Players start in one tap, with wallet flows handled behind a simple UI. Why Solana? It gives us ultra-fast, low-fee transactions for instant prize delivery, item mints, and verifiable randomness.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-astro-secondary mb-4">Market Problem & Opportunity</h3>
              <ul className="space-y-3 text-white/70 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-astro-primary rounded-full mt-2 flex-shrink-0" />
                  <span><strong>Onboarding friction:</strong> Most Web3 games demand wallets, bridges, and confusing signers. Result: churn.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-astro-primary rounded-full mt-2 flex-shrink-0" />
                  <span><strong>Paywalls & toxicity:</strong> "Play-to-pay" loops (deposits/lootboxes) erode trust and invite regulatory headaches.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-astro-primary rounded-full mt-2 flex-shrink-0" />
                  <span><strong>Opaqueness:</strong> Jackpot odds and RNG are often unverifiable; users assume the house always wins.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-astro-primary rounded-full mt-2 flex-shrink-0" />
                  <span><strong>Low retention:</strong> Many token games spike at launch, then die when rewards dry up or bots farm them.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-astro-primary rounded-full mt-2 flex-shrink-0" />
                  <span><strong>Weak social loops:</strong> Minimal reasons to invite friends, form teams, or return daily.</span>
                </li>
              </ul>
              <p className="text-white/70 text-sm sm:text-base mt-4">
                <strong>SpinLoot's answer:</strong> Telegram-native onboarding, free-to-play economics, provable fairness, and social compulsion (referrals, parties, leaderboards, live events)—all anchored by a utility token that doesn't require pay-in.
              </p>
            </div>
          </div>
        );

      case 'vision':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-astro-secondary mb-4">Vision</h3>
              <p className="text-white/70 text-sm sm:text-base mb-4">
                To become the most entertaining, viral, and rewarding spinning game in Web3, powered by:
              </p>
              <ul className="space-y-4 text-white/70 text-sm sm:text-base">
                <li className="flex items-start gap-4 p-4 rounded-lg bg-astro-primary/10">
                  <span className="text-3xl">🎡</span>
                  <div>
                    <h4 className="font-semibold text-astro-primary mb-1">Arcade Mechanics</h4>
                    <span>Spin-to-win mechanics anyone can pick up in seconds</span>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-4 rounded-lg bg-astro-secondary/10">
                  <span className="text-3xl">⚡</span>
                  <div>
                    <h4 className="font-semibold text-astro-secondary mb-1">Solana Speed</h4>
                    <span>Instant payouts and on-chain state updates</span>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-4 rounded-lg bg-astro-accent/10">
                  <span className="text-3xl">💰</span>
                  <div>
                    <h4 className="font-semibold text-astro-accent mb-1">$SPIN Utility</h4>
                    <span>Progression, buffs, cosmetics, and community control</span>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-4 rounded-lg bg-astro-success/10">
                  <span className="text-3xl">🧠</span>
                  <div>
                    <h4 className="font-semibold text-astro-success mb-1">Normie-Friendly</h4>
                    <span>Telegram UI that removes Web3 friction</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        );

      case 'product':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-astro-secondary mb-4">Product Overview</h3>
              <div className="space-y-6">
                <div className="p-6 rounded-lg bg-astro-primary/10">
                  <h4 className="text-lg font-semibold text-astro-primary mb-3">Core Loop</h4>
                  <p className="text-white/70 text-sm sm:text-base">
                    Claim free daily energy → spin → win prizes → complete quests/streaks → climb leaderboards → invite friends → join parties → unlock higher-tier wheels.
                  </p>
                </div>
                <div className="p-6 rounded-lg bg-astro-secondary/10">
                  <h4 className="text-lg font-semibold text-astro-secondary mb-3">Prize Types</h4>
                  <p className="text-white/70 text-sm sm:text-base">
                    $SPIN, SOL (sponsor-funded), on-chain NFTs/cosmetics, and seasonal jackpot loot boxes.
                  </p>
                </div>
                <div className="p-6 rounded-lg bg-astro-accent/10">
                  <h4 className="text-lg font-semibold text-astro-accent mb-3">Key Features</h4>
                  <ul className="space-y-3 text-white/70 text-sm sm:text-base">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-astro-accent rounded-full mt-2 flex-shrink-0" />
                      <span><strong>No Deposits:</strong> Players never pay to play. Rewards are funded by sponsors and the treasury.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-astro-accent rounded-full mt-2 flex-shrink-0" />
                      <span><strong>Instant Payouts:</strong> Prizes settle on Solana with minimal delay and fees.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-astro-accent rounded-full mt-2 flex-shrink-0" />
                      <span><strong>Provable Fairness:</strong> Each spin uses a verifiable randomness workflow; odds and loot tables are published per season.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'token':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-astro-secondary mb-4">$SPIN Token — Use Cases (Utility Only)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-astro-primary/10">
                    <h4 className="font-semibold text-astro-primary mb-2">Energy Acceleration</h4>
                    <p className="text-white/70 text-sm">Use earned $SPIN to speed up energy refills (no purchases). Portion burned to stabilize supply.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-astro-secondary/10">
                    <h4 className="font-semibold text-astro-secondary mb-2">Tier Access & Time-Locks</h4>
                    <p className="text-white/70 text-sm">Lock earned $SPIN for a fixed period to unlock higher-tier wheels and better loot tables.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-astro-accent/10">
                    <h4 className="font-semibold text-astro-accent mb-2">Loot Modifiers</h4>
                    <p className="text-white/70 text-sm">Redeem $SPIN for optional perks—re-spin vouchers, luck boosts, streak protection, and cosmetic effects.</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-astro-success/10">
                    <h4 className="font-semibold text-astro-success mb-2">Season Pass</h4>
                    <p className="text-white/70 text-sm">Hit gameplay milestones to mint a free pass NFT that improves drops and XP multipliers.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-astro-warning/10">
                    <h4 className="font-semibold text-astro-warning mb-2">Crafting & Cosmetics</h4>
                    <p className="text-white/70 text-sm">Spend $SPIN to combine duplicates into limited skins/frames/emotes (purely cosmetic).</p>
                  </div>
                  <div className="p-4 rounded-lg bg-astro-primary/10">
                    <h4 className="font-semibold text-astro-primary mb-2">Governance</h4>
                    <p className="text-white/70 text-sm">Token-weighted, non-binding votes on next-season themes, prize mixes, and feature priorities.</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-yellow-400 text-sm font-semibold">
                  <strong>Important:</strong> $SPIN is a utility token. Players cannot deposit money to obtain it inside the game; they earn it by playing.
                </p>
              </div>
            </div>
          </div>
        );

      case 'economy':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-astro-secondary mb-4">Economy Design (Free-to-Play, No Wagering)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-lg bg-astro-success/10">
                  <h4 className="text-lg font-semibold text-astro-success mb-3">Sources</h4>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-astro-success rounded-full mt-2 flex-shrink-0" />
                      <span>Daily energy, streaks, quests, leaderboards, party milestones</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-astro-success rounded-full mt-2 flex-shrink-0" />
                      <span>Referral milestones and community events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-astro-success rounded-full mt-2 flex-shrink-0" />
                      <span>Seasonal airdrops/partner campaigns</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 rounded-lg bg-astro-warning/10">
                  <h4 className="text-lg font-semibold text-astro-warning mb-3">Sinks (Stability)</h4>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-astro-warning rounded-full mt-2 flex-shrink-0" />
                      <span>Energy accelerators, re-spins, luck boosts, streak protection (partial burn)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-astro-warning rounded-full mt-2 flex-shrink-0" />
                      <span>Crafting/cosmetics & Season Pass mints (burn + treasury top-up)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-astro-warning rounded-full mt-2 flex-shrink-0" />
                      <span>Time-locked tier access (temporary supply reduction)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-astro-warning rounded-full mt-2 flex-shrink-0" />
                      <span>Tournament/event entries (earn-to-enter; sponsor-funded rewards)</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-6 rounded-lg bg-astro-primary/10">
                <p className="text-white/70 text-sm sm:text-base">
                  <strong>Outcome:</strong> A circular economy that never requires player deposits, funds prizes sustainably, and maintains utility demand for $SPIN without creating a pay-to-win meta.
                </p>
              </div>
            </div>
          </div>
        );

      case 'roadmap':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-astro-secondary mb-4">Roadmap</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-astro-success/10">
                    <div className="w-4 h-4 bg-astro-success rounded-full" />
                    <span className="text-white/70 text-sm sm:text-base">MVP: Daily energy, base wheel, quests, referrals, leaderboards</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-astro-primary/10">
                    <div className="w-4 h-4 bg-astro-primary rounded-full" />
                    <span className="text-white/70 text-sm sm:text-base">Anti-Bot & PoP v1: Device signals, cooldown tuning</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-astro-secondary/10">
                    <div className="w-4 h-4 bg-astro-secondary rounded-full" />
                    <span className="text-white/70 text-sm sm:text-base">Tiered Wheels: Time-locked $SPIN access; parties/guilds</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-astro-accent/10">
                    <div className="w-4 h-4 bg-astro-accent rounded-full" />
                    <span className="text-white/70 text-sm sm:text-base">Treasury Loop & Burns: Route spends to prize treasury</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-astro-success/10">
                    <div className="w-4 h-4 bg-astro-success rounded-full" />
                    <span className="text-white/70 text-sm sm:text-base">Season Pass & Crafting: Earn-to-mint pass; cosmetics</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-astro-primary/10">
                    <div className="w-4 h-4 bg-astro-primary rounded-full" />
                    <span className="text-white/70 text-sm sm:text-base">Governance Signaling: Token-holder votes on themes</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-astro-secondary/10">
                    <div className="w-4 h-4 bg-astro-secondary rounded-full" />
                    <span className="text-white/70 text-sm sm:text-base">Creator Quests: KOL-led challenge ladders</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-astro-accent/10">
                    <div className="w-4 h-4 bg-astro-accent rounded-full" />
                    <span className="text-white/70 text-sm sm:text-base">Global Scale: New languages, security audits</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="astro-glass rounded-2xl p-4 sm:p-8"
        >
          <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-astro-primary via-astro-secondary to-astro-accent mb-6 astro-text">
            SpinLoot Whitepaper
          </h1>
          
          {/* Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setWhitepaperActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    whitepaperActiveTab === tab.id
                      ? 'bg-astro-primary text-white shadow-lg'
                      : 'bg-astro-primary/10 text-astro-primary hover:bg-astro-primary/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={whitepaperActiveTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-[400px]"
          >
            {renderTabContent()}
          </motion.div>

          {/* Download Button */}
          <div className="text-center pt-8 border-t border-astro-primary/20">
            <motion.button
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/tokenomics.pdf';
                link.download = 'tokenomics.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-gradient-to-r from-astro-primary to-astro-secondary text-white font-semibold hover:from-astro-primary/80 hover:to-astro-secondary/80 transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Tokenomics
            </motion.button>
          </div>
        </motion.div>
      </div>
  );
};

export default WhitepaperPage;
