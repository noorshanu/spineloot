
import Section from './Section'
import Container from './Container'
import { FEATURES } from '@/data/content'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'

export default function Features() {
  return (
    <Section id="features" className="bg-black/80 backdrop-blur-md">
      <Container>
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-10">Why SpinLoot is unique?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => {
            const Icon = (Icons as any)[f.icon] || Icons.Sparkles
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl p-6 hover:bg-white/10 hover:scale-105 hover:shadow-glow transition-all duration-300 cursor-pointer"
              >
                <Icon className="mb-4" />
                <h3 className="font-bold text-lg">{f.title}</h3>
                <p className="text-white/70">{f.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
