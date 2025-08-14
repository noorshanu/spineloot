import React from 'react'
import { motion } from 'framer-motion'
import { Twitter, ExternalLink } from 'lucide-react'

const Postersection = () => {
  const posters = [
    {
      id: 1,
      title: "SpinLoot X MoonFuel",
      description: "The most addictive Web3 spin-to-win platform powered by Solana. Join thousands of players spinning for massive rewards!",
      xLink: "https://x.com/Spin_Loot/status/1955511995471655025",
      image: "/img1.jpeg",
      stats: "10K+ Players"
    },
    {
      id: 2,
      title: "SpinLoot X Zerone", 
      description: "Win $SPNL tokens, SOL, rare NFTs, and jackpot loot boxes. Every spin could be your next big win!",
      xLink: "https://x.com/Spin_Loot/status/1954819766990016658",
      image: "/img2.jpeg",
      stats: "$500K+ Prizes"
    },
    {
      id: 3,
      title: "SpinLoot X KajLabs",
      description: "Built on Solana with transparent smart contracts. Fair gaming with instant payouts and zero gas fees!",
      xLink: "https://x.com/Spin_Loot/status/1955293428092162185", 
      image: "/img3.jpeg",
      stats: "100% Fair"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-black via-purple-900/20 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-casino-blue/10 via-purple-500/10 to-casino-blue/10"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
            animate={{
              x: [0, Math.random() * 1000],
              y: [0, Math.random() * 800],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
       <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD600] to-[#C9A900]">Our</span>       Investor
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
            Discover why top investors are backing SpinLoot's revolutionary spin-to-win platform
          </p>
        </motion.div>

        {/* Posters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posters.map((poster, index) => (
            <motion.div
              key={poster.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Poster Card */}
              <a href={poster.xLink} target="_blank" rel="noopener noreferrer" className="relative bg-black/60 backdrop-blur-md rounded-2xl p-2 border border-white/10 hover:border-yellow-400/50 transition-all duration-500 overflow-hidden">
                
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-casino-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Poster Image */}
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="aspect-[4/5] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center"
                  >
                    <div className="text-center">
                  <img src={poster.image} alt={poster.title} className="w-full h-full object-cover rounded-xl" />
                      <p className="text-white/60 text-sm"> {poster.title}</p>
                    </div>
                  </motion.div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
          

                  {/* X Link Button */}
          
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  <div className="w-8 h-8 border-2 border-yellow-400 rounded-full"></div>
                </div>
                <div className="absolute bottom-4 left-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  <div className="w-6 h-6 border-2 border-casino-blue rounded-full"></div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://x.com/Spin_Loot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-12 px-8 py-4 rounded-full bg-gradient-to-b from-[#FFD600] to-[#C9A900] text-black font-bold text-lg hover:from-[#C9A900] hover:to-[#FFD600] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Twitter className="w-6 h-6" />
            <span>Follow @Spin_Loot</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Postersection