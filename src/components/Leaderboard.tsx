
import Section from './Section'
import Container from './Container'
import { motion } from 'framer-motion'

const mock = [
  { name: "@DegenMaxi", score: 12500 },
  { name: "@SpinQueen", score: 9100 },
  { name: "@LootLord", score: 8700 },
  { name: "@SolSprinter", score: 7500 },
]

export default function Leaderboard() {
  return (
    <Section className="bg-casino-bg/60">
      <Container>
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">Weekly Leaderboard</h2>
        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="text-left text-white/70">
                <th className="px-6 py-3">Rank</th>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Score</th>
              </tr>
            </thead>
            <tbody>
              {mock.map((row, i) => (
                <motion.tr key={row.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="border-t border-white/10"
                >
                  <td className="px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4">{row.name}</td>
                  <td className="px-6 py-4 font-bold text-casino-gold">{row.score.toLocaleString()}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  )
}
