import { motion } from "framer-motion";
import Section from "./Section";
import { Button } from "./Button";
import { HERO } from "@/data/content";
import Container from "./Container";

import { Twitter, MessageCircle, FileText, Rocket, Zap } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-radial-primary">
      <div className="absolute inset-0 bg-radial-secondary pointer-events-none" />
      <div className="absolute inset-0 bg-radial-accent pointer-events-none" />
      <div className="absolute inset-0 bg-space-bg pointer-events-none" />
      <Section>
        <Container className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-astro-primary/20 px-3 py-1 text-astro-primary/70 mb-4 bg-astro-primary/5">
              <span>Powered by</span>{" "}
              <span className="font-bold text-astro-primary astro-text">Solana ⚡</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black leading-[1.05]">
              {HERO.title}
            </h1>
            <p className="mt-4 text-lg text-white/80">{HERO.punch}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href='/airdrop'>{HERO.ctaPrimary}</Button>
            </div>

            {/* Social Media Icons */}
            <div className="mt-8 flex items-center gap-4">
              <motion.a
                href="https://whitehpaper.gitbook.io/spinloot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-astro-panel/50 hover:bg-astro-panel/70 text-white/80 hover:text-white transition-all duration-300 border border-astro-primary/20 hover:border-astro-primary/40 glow-effect"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-5 h-5" />
                <span className="font-semibold">Whitepaper</span>
              </motion.a>
              <motion.a
                href="https://twitter.com/Spin_loot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-astro-panel/50 hover:bg-astro-panel/70 text-white/80 hover:text-white transition-all duration-300 border border-astro-primary/20 hover:border-astro-primary/40 glow-effect"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="w-5 h-5" />
                <span className="font-semibold">Follow on X</span>
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="relative"
          >
            <div className="aspect-square w-full max-w-[520px] mx-auto astro-glass rounded-3xl p-6 shadow-glow relative">
              <SpaceScene />
              <img
                src="/bot-hero.png"
                alt="SpinLoot"
                className="absolute top-4 sm:top-24 left-8 sm:left-28 w-[300px] right-0 animate-float"
              />
              <a
                href="/airdrop"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full bg-gradient-to-r from-astro-primary to-astro-secondary shadow-lg
                 shadow-astro-primary/40 text-white font-bold border border-astro-primary/50 transition-all duration-300
                  hover:translate-y-[-1px] hover:shadow-neon w-full text-center flex justify-center items-center text-2xl glow-effect"
              >
                Join Airdrop
              </a>
            </div>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}

function SpaceScene() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Galaxy Background */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-indigo-900/30" />
      <div className="absolute inset-0 rounded-2xl astro-grid opacity-10" />
      
      {/* Nebula Effect */}
      <div className="absolute inset-0 rounded-2xl">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-pink-500/20 to-transparent rounded-full blur-xl" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-blue-500/20 to-transparent rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-gradient-radial from-purple-500/15 to-transparent rounded-full blur-lg" />
      </div>
      
      {/* Planets */}
      <motion.div
        className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-br from-astro-accent to-astro-warning rounded-full shadow-cosmic"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 opacity-80" />
      </motion.div>

      <motion.div
        className="absolute top-16 right-12 w-12 h-12 bg-gradient-to-br from-astro-secondary to-astro-cosmic rounded-full shadow-neon"
        animate={{
          rotate: -360,
          scale: [1, 0.9, 1]
        }}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-400 to-purple-600 opacity-80" />
      </motion.div>

      <motion.div
        className="absolute bottom-16 left-16 w-10 h-10 bg-gradient-to-br from-astro-success to-astro-primary rounded-full shadow-space"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-80" />
      </motion.div>

      {/* Enhanced Stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute bg-astro-accent rounded-full star ${
            i % 3 === 0 ? 'w-3 h-3' : i % 2 === 0 ? 'w-2 h-2' : 'w-1 h-1'
          }`}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1.2, 0.5]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            filter: `blur(${Math.random() * 0.5}px)`
          }}
        />
      ))}

      {/* Shooting Stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          animate={{
            x: [0, 100],
            y: [0, -50],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeOut"
          }}
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + i * 10}%`
          }}
        />
      ))}

      {/* Constellation Lines */}
      <svg className="absolute inset-0 w-full h-full rounded-2xl" style={{ opacity: 0.1 }}>
        <defs>
          <linearGradient id="starLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="20%" y1="25%" x2="35%" y2="40%" stroke="url(#starLine)" strokeWidth="1" />
        <line x1="60%" y1="30%" x2="75%" y2="45%" stroke="url(#starLine)" strokeWidth="1" />
        <line x1="40%" y1="70%" x2="55%" y2="85%" stroke="url(#starLine)" strokeWidth="1" />
      </svg>

      <style>{`
        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes float { 
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .star {
          box-shadow: 0 0 4px currentColor, 0 0 8px currentColor;
        }
      `}</style>
    </div>
  );
}
