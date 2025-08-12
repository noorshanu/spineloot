
export function StatCard({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div className="glass rounded-2xl p-6 text-center shadow-gold">
      <div className="text-3xl font-extrabold text-casino-gold">{kpi}</div>
      <div className="text-white/70">{label}</div>
    </div>
  )
}
