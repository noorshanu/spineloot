
import Section from './Section'
import Container from './Container'
import { TOKENOMICS } from '@/data/content'
import { motion } from 'framer-motion'

export default function Tokenomics() {
  const total = TOKENOMICS.reduce((acc, x) => acc + x.value, 0)
  return (
    <Section id="tokenomics" className="bg-casino-bg">
      <Container>
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-8">Tokenomics</h2>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="glass rounded-3xl p-6">
            <div className="w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-casino-gold/40 to-casino-red/40 relative">
              {/* Simple ring chart */}
              <svg viewBox="0 0 36 36" className="w-64 h-64">
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3"></circle>
                {TOKENOMICS.reduce((acc:any, slice, idx) => {
                  const startAngle = acc.angle
                  const angle = (slice.value / total) * 100 * 3.6
                  const dash = (slice.value / total) * 100
                  const dashArray = fDash(dash)
                  const dashOffset = 100 - acc.offset
                  const color = idx % 2 === 0 ? "#F5C451" : "#E11D48"
                  acc.angle += angle
                  acc.offset += dash
                  acc.nodes.push(
                    <circle key={slice.label} cx="18" cy="18" r="15.9155" fill="none" stroke={color} strokeWidth="3"
                      strokeDasharray={dashArray} strokeDashoffset={dashOffset} />
                  )
                  return acc
                }, { angle:0, offset:0, nodes: [] as any }).nodes}
              </svg>
            </div>
          </div>
          <div className="space-y-4">
            {TOKENOMICS.map((t, i) => (
              <motion.div key={t.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between glass rounded-xl p-4">
                <span className="font-semibold">{t.label}</span>
                <span className="text-casino-gold font-extrabold">{t.value}%</span>
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
