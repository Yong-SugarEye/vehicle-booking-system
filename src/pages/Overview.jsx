import KpiCard from '../components/KpiCard';

const currency = (v) => `฿${v.toLocaleString()}`;

export default function Overview({ monthlyData }) {
  const totalBudget = monthlyData.reduce((sum, row) => sum + row.budget, 0);
  const actual = monthlyData.reduce((sum, row) => sum + row.actual, 0);
  const waitingInvoice = monthlyData.reduce((sum, row) => sum + row.waitingInvoice, 0);
  const remaining = totalBudget - actual;
  const avgRemaining = remaining / monthlyData.length;
  const budgetUsedPct = (actual / totalBudget) * 100;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <KpiCard label="Total Maintenance Budget / งบรวม" value={currency(totalBudget)} tone="blue" />
      <KpiCard label="Actual Cost / ค่าใช้จ่ายจริง" value={currency(actual)} tone={actual > totalBudget ? 'red' : 'green'} />
      <KpiCard label="Waiting for Invoice / รอใบแจ้งหนี้" value={currency(waitingInvoice)} tone="yellow" />
      <KpiCard label="Remaining Budget / งบคงเหลือ" value={currency(remaining)} tone={remaining < 0 ? 'red' : 'green'} />
      <KpiCard label="Avg Remaining / เดือน" value={currency(Math.round(avgRemaining))} tone="blue" />
      <KpiCard label="Budget Used / ใช้งบ" value={`${budgetUsedPct.toFixed(1)}%`} tone={budgetUsedPct > 100 ? 'red' : budgetUsedPct > 85 ? 'yellow' : 'green'} />
    </div>
  );
}
