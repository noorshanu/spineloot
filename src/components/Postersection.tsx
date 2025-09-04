import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Twitter, ExternalLink } from 'lucide-react'

interface Poster {
  id: number
  title: string
  xLink: string
  image: string
}

interface Partner {
  id: number
  image: string
  link: string
}

const Postersection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const posters: Poster[] = [
    {
      id: 1,
      title: "SpinLoot X MoonFuel",
      xLink: "https://x.com/Spin_Loot/status/1955511995471655025",
      image: "/img1.jpeg"
    },
    {
      id: 2,
      title: "SpinLoot X Zerone", 
      xLink: "https://x.com/Spin_Loot/status/1954819766990016658",
      image: "/img2.jpeg"
    },
    {
      id: 3,
      title: "SpinLoot X KajLabs",
      xLink: "https://x.com/Spin_Loot/status/1955293428092162185", 
      image: "/img3.jpeg"
    }
  ]

  const partners: Partner[] = [
    { id: 1,  image: "/partner/img4.JPG" ,link: "https://x.com/Spin_Loot/status/1960247451790844259?t=emO5Awpvt-dzXolIcb_OLA&s=19"},
    { id: 2,  image: "/partner/img5.JPG" ,link: "https://x.com/Spin_Loot/status/1959863822380060938?t=_5Xb1vy-Ug2c2gRZh9UIsg&s=19"},
    { id: 3,  image: "/partner/img6.JPG" ,link: "https://x.com/AtuaAI/status/1959445867334975578?t=d-6l28fqBePZo865O6Qdow&s=19"},
    { id: 4,  image:  "/partner/img7.JPG" ,link: "https://x.com/Spin_Loot/status/1959230424636617210?t=jG5IJfjX2xU1p5fDiFBg1g&s=19"},
    { id: 5,  image: "/partner/img8.JPG" ,link: "https://x.com/MajyoGame/status/1958411243326484907?t=hTg_xcWgmv4eGiFInVQblA&s=19"},
    { id: 6,  image: "/partner/img9.JPG" ,link: "https://x.com/Spin_Loot/status/1958464640783970463?t=WUO4Nj3FVZwviPiWA-bTOQ&s=19"},
    { id: 7,  image: "/partner/img10.JPG" ,link: "https://x.com/Spin_Loot/status/1958523871813947805?t=LCXT23PZ7prIPX-lduaMIg&s=19"},
    { id: 8,  image: "/partner/img11.JPG" ,link: "https://x.com/Spin_Loot/status/1958827251652296713?t=Mv6wI4obxLnJUQ2elAbYag&s=1"},
    { id: 9,  image:  "/partner/img12.JPG" ,link: "https://x.com/Imagen_Network/status/1958829056033792082?t=xC1hKpBLHkCLX1zYmmGvBg&s=19"},
    { id: 10, image: "/partner/img13.JPG" ,link: "https://x.com/FurGPTs/status/1959091045201060306?t=od4Uv2_B71tqSr3Z8EEE0A&s=19"},
    { id: 11, image: "/partner/img14.JPG" ,link: "https://x.com/Spin_Loot/status/1959230424636617210?t=00mzQ_P_kH4T3bwgbDnI9Q&s=19"},
    { id: 12, image: "/partner/img15.JPG" ,link: "https://x.com/Spin_Loot/status/1959177088843534513?t=ln4Q3QW1VGZJzWipGtqa-A&s=19" }
  ]

  const maxSlides = Math.ceil(partners.length / 3)

  const nextSlide = () => {
    setCurrentSlide(prev => prev < maxSlides - 1 ? prev + 1 : 0)
  }

  const prevSlide = () => {
    setCurrentSlide(prev => prev > 0 ? prev - 1 : maxSlides - 1)
  }

  // Calculate total width for slider
  const totalWidth = maxSlides * 100

  // Auto-slide every 5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    
    return () => clearInterval(interval)
  }, [currentSlide])

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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD600] to-[#C9A900]">Our</span> Investor
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
            Discover why top investors are backing SpinLoot's revolutionary spin-to-win platform
          </p>
        </motion.div>

        {/* Posters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posters.map((poster: Poster, index: number) => (
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
              <a href={poster.xLink} target="_blank" rel="noopener noreferrer" className="block relative bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:border-yellow-400/50 transition-all duration-500 overflow-hidden">
                
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-casino-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Poster Image */}
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className=" rounded-xl overflow-hidden"
                  >
                    <img 
                      src={poster.image} 
                      alt={poster.title} 
                      className="  rounded-xl group-hover:scale-110 transition-transform duration-500" 
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                </div>

                {/* Title */}
                <div className="relative z-10 text-center">
                  <h3 className="text-white text-lg font-semibold group-hover:text-yellow-400 transition-colors duration-300">
                    {poster.title}
                  </h3>
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

        {/* Our Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-12 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD600] to-[#C9A900]">Our</span> Partners
          </h2>

          {/* Partners Grid - 4 images per row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                {/* Partner Card */}
                <div className="relative bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:border-yellow-400/50 transition-all duration-500 overflow-hidden">
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-casino-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Partner Image */}
                  <div className="relative overflow-hidden rounded-xl">
                    <motion.a href={partner.link} target="_blank" rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-xl overflow-hidden"
                    >
                      <img 
                        src={partner.image} 
                        alt={`Partner ${partner.id}`}
                        className="w-full h-32 sm:h-40 lg:h-48 object-cover rounded-xl group-hover:scale-110 transition-transform duration-500" 
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.a>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                    <div className="w-8 h-8 border-2 border-yellow-400 rounded-full"></div>
                  </div>
                  <div className="absolute bottom-4 left-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                    <div className="w-6 h-6 border-2 border-casino-blue rounded-full"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

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