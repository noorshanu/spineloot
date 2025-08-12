
import Section from './Section'
import Container from './Container'

const QA = [
  { q: "Kya ye real payouts dete ho?", a: "Haan bhai, Solana par non-custodial payouts — win ≡ instant." },
  { q: "Free daily spin kaise milta hai?", a: "Roz ek free spin — streak maintain karoge to bonus bhi milega." },
  { q: "Provably fair ka matlab?", a: "RNG on-chain, smart-contracts se verifiable outcomes. Sab transparent." },
  { q: "$SPNL ka use?", a: "Spins, loot store, staking (revenue share), governance votes, aur rewards." },
]

export default function FAQ() {
  return (
    <Section id="faq" className="bg-casino-bg">
      <Container>
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">FAQ</h2>
        <div className="space-y-4">
          {QA.map((x) => (
            <details key={x.q} className="glass rounded-2xl p-5">
              <summary className="cursor-pointer font-semibold">{x.q}</summary>
              <p className="mt-2 text-white/80">{x.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  )
}
