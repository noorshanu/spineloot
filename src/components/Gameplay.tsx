
import Section from './Section'
import Container from './Container'
import { GAMEPLAY } from '@/data/content'
import { motion } from 'framer-motion'

export default function Gameplay() {
  return (
    <Section id="gameplay" className="bg-casino-bg/60">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">Gameplay — "Spin to Win"</h2>
            <ol className="space-y-3 list-decimal list-inside text-white/80">
              {GAMEPLAY.steps.map((s, i) => (
                <li key={i} className="leading-relaxed">{s}</li>
              ))}
            </ol>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {GAMEPLAY.tiers.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl p-6 glass ring-1 ring-white/10"
              >
                <div className="text-xl font-bold">{t.name}</div>
                <div className="text-casino-gold font-extrabold mt-1">{t.price}</div>
                <p className="text-white/70 mt-2">{t.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
