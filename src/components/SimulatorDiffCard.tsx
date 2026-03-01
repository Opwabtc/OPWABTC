interface Props { diff: number; months: number; label?: string }
export default function SimulatorDiffCard({ diff, months, label = "Reference A" }: Props) {
  if (diff <= 0) return null
  const f = (n: number) => Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return (
    <div className="sim-diff-card">
      <span className="sim-diff-amount">${f(diff)}</span>
      <span className="sim-diff-label">more than {label} after {months} {months === 1 ? "month" : "months"}.</span>
      <span className="sim-diff-note">* Simulation is illustrative only.</span>
    </div>
  )
}
