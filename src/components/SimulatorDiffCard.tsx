interface Props { diff: number; months: number; label?: string }

export default function SimulatorDiffCard({ diff, months, label = "Reference A" }: Props) {
  if (diff <= 0) return null
  const f = (n: number) => Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return (
    <div style={{ background: "linear-gradient(135deg,rgba(249,115,22,0.1),rgba(251,191,36,0.04))", border: "1px solid rgba(249,115,22,0.28)", borderRadius: "12px", padding: "0.9rem 1.25rem", marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
      <span style={{ color: "#f97316", fontWeight: 800, fontSize: "1.05rem" }}>${f(diff)}</span>
      <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem" }}>more than {label} after {months} {months === 1 ? "month" : "months"}.</span>
      <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.72rem", marginLeft: "auto" }}>* Simulation is illustrative only.</span>
    </div>
  )
}