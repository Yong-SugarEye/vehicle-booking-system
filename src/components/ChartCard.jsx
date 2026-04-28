export default function ChartCard({ title, subtitle, children }) {
  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900/90 p-4 shadow-lg">
      <header className="mb-3">
        <h3 className="text-base font-semibold text-slate-100">{title}</h3>
        {subtitle ? <p className="text-xs text-slate-400">{subtitle}</p> : null}
      </header>
      <div className="h-72 w-full">{children}</div>
    </section>
  );
}
