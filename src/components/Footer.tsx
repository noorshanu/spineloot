
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Twitter, Rocket, Star, Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-astro-bg/50 backdrop-blur-md border-t border-astro-primary/20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 astro-grid opacity-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-astro-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-astro-secondary/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative"
              >
                <img 
                  src="/logo.jpg" 
                  alt="SpinLoot" 
                  className="w-12 h-12 rounded-full border-2 border-astro-primary/30"
                />
                <div className="absolute inset-0 rounded-full bg-astro-primary/20 blur-sm" />
              </motion.div>
              <div>
                <span className="text-astro-primary font-bold text-2xl astro-text">SpinLoot</span>
                <p className="text-white/60 text-sm">Space Gaming Platform</p>
              </div>
            </div>
            <p className="text-white/70 mb-6 max-w-md">
              The future of Web3 gaming. Spin, win, and earn with the most entertaining 
              crypto gaming platform on Solana. Explore the cosmos of possibilities!
            </p>
            <div className="flex gap-4">
              <motion.a
                href="https://twitter.com/Spin_loot"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-astro-panel/50 hover:bg-astro-panel/70 text-astro-primary hover:text-white transition-all duration-300 border border-astro-primary/20 hover:border-astro-primary/40 glow-effect"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-astro-primary astro-text">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/70 hover:text-astro-primary transition-colors duration-300 flex items-center gap-2 group">
                  <Star className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/airdrop" className="text-white/70 hover:text-astro-primary transition-colors duration-300 flex items-center gap-2 group">
                  <Rocket className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Airdrop
                </Link>
              </li>
              <li>
                <a href="#features" className="text-white/70 hover:text-astro-primary transition-colors duration-300 flex items-center gap-2 group">
                  <Zap className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Features
                </a>
              </li>
              <li>
                <a href="#tokenomics" className="text-white/70 hover:text-astro-primary transition-colors duration-300 flex items-center gap-2 group">
                  <Star className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Tokenomics
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-astro-primary astro-text">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#faq" className="text-white/70 hover:text-astro-primary transition-colors duration-300 flex items-center gap-2 group">
                  <Star className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  FAQ
                </a>
              </li>
              <li>
                <a href="https://whitehpaper.gitbook.io/spinloot" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-astro-primary transition-colors duration-300 flex items-center gap-2 group">
                  <Zap className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Whitepaper
                </a>
              </li>
              <li>
                <a href="https://twitter.com/Spin_loot" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-astro-primary transition-colors duration-300 flex items-center gap-2 group">
                  <Twitter className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-astro-primary/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              © 2025 SpinLoot. All rights reserved. Built on Solana.
            </p>
            {/* <div className="flex items-center gap-4 text-white/50 text-sm">
              <span>🚀 Powered by Space Technology</span>
              <span>⭐ Cosmic Gaming</span>
            </div> */}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-astro-accent rounded-full star"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 30}%`
            }}
          />
        ))}
      </div>
    </footer>
  )
}
