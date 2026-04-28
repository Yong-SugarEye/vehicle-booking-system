const toneStyles = {
  green: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200',
  yellow: 'border-amber-500/40 bg-amber-500/10 text-amber-200',
  red: 'border-rose-500/40 bg-rose-500/10 text-rose-200',
  blue: 'border-sky-500/40 bg-sky-500/10 text-sky-200',
};

export default function KpiCard({ label, value, subValue, tone = 'blue' }) {
  return (
    <article className={`rounded-2xl border p-4 shadow-sm ${toneStyles[tone]}`}>
      <p className="text-xs uppercase tracking-wide text-slate-300">{label}</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">{value}</h3>
      {subValue ? <p className="mt-2 text-sm text-slate-300">{subValue}</p> : null}
    </article>
  );
}
