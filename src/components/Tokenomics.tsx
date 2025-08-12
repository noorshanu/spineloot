
import Section from './Section'
import Container from './Container'
import { TOKENOMICS } from '@/data/content'
import { motion } from 'framer-motion'

export default function Tokenomics() {
  const total = TOKENOMICS.reduce((acc, x) => acc + x.value, 0)
  return (
    <Section id="tokenomics" className="bg-black/80 backdrop-blur-md relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid bg-[length:20px_20px] opacity-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-casino-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-casino-red/10 rounded-full blur-3xl" />
      
      <Container>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-extrabold mb-8 text-center"
        >
          Tokenomics
        </motion.h2>
        
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
            className="p-1"
          >
            <motion.div 
              className="w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-casino-gold/40 to-casino-red/40 relative glass shadow-glow"
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 0 50px rgba(245, 196, 81, 0.4)"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.img 
                src="/casino2.png" 
                alt="Tokenomics" 
                className="w-full h-full rounded-full"
                animate={{
                  rotateY: [0, 2, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Floating particles around the image */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-casino-gold rounded-full"
                    animate={{
                      x: [0, 15, 0],
                      y: [0, -15, 0],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 1,
                      ease: "easeInOut"
                    }}
                    style={{
                      left: `${25 + i * 15}%`,
                      top: `${20 + i * 20}%`
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Tokenomics List */}
          <div className="space-y-4">
            {TOKENOMICS.map((t, i) => (
              <motion.div 
                key={t.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                transition={{ 
                  delay: i * 0.1,
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.02,
                  x: 5,
                  backgroundColor: 'rgba(255, 255, 255, 0.15)'
                }}
                className="flex items-center justify-between glass rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-glow"
              >
                <motion.span 
                  className="font-semibold"
                  whileHover={{ color: '#F5C451' }}
                  transition={{ duration: 0.2 }}
                >
                  {t.label}
                </motion.span>
                <motion.span 
                  className="text-casino-gold font-extrabold text-lg"
                  whileHover={{ 
                    scale: 1.1,
                    textShadow: "0 0 10px rgba(245, 196, 81, 0.8)"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {t.value}%
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

function fDash(pct:number){
  // convert percentage to strokeDasharray format (percent of circumference)
  const a = Math.max(1, Math.min(100, pct))
  return `${a} ${100 - a}`
}
