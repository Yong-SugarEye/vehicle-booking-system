import KpiCard from '../components/KpiCard';
import ChartCard from '../components/ChartCard';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, XAxis, YAxis, CartesianGrid, Bar } from 'recharts';
import { orderTypeMap } from '../data/mockData';

const COLORS = ['#ef4444', '#10b981', '#3b82f6'];

export default function WorkOrderDashboard({ workOrders }) {
  const total = workOrders.length;
  const statusCounts = ['Open', 'Closed', 'In Progress'].map((status) => ({
    name: status,
    value: workOrders.filter((w) => w.status === status).length,
  }));

  const pmCount = workOrders.filter((w) => orderTypeMap[w.orderNo.slice(0, 2)] === 'PM').length;
  const cmCount = workOrders.filter((w) => orderTypeMap[w.orderNo.slice(0, 2)] === 'CM').length;
  const breakdownJobs = workOrders.filter((w) => orderTypeMap[w.orderNo.slice(0, 2)] === 'BD').length;
  const pmCompliance = ((pmCount / total) * 100).toFixed(1);

  const byOwner = Object.values(
    workOrders.reduce((acc, wo) => {
      acc[wo.owner] = acc[wo.owner] || { owner: wo.owner, orders: 0 };
      acc[wo.owner].orders += 1;
      return acc;
    }, {})
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <KpiCard label="Total Work Orders" value={total} tone="blue" />
        <KpiCard label="PM Compliance" value={`${pmCompliance}%`} tone={Number(pmCompliance) > 35 ? 'green' : 'yellow'} />
        <KpiCard label="CM vs PM Ratio" value={`${cmCount}:${pmCount}`} tone="blue" />
        <KpiCard label="Breakdown Jobs (BD)" value={breakdownJobs} tone={breakdownJobs > 2 ? 'red' : 'green'} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Work Orders by Status">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={statusCounts} dataKey="value" nameKey="name" outerRadius={100}>
                {statusCounts.map((item, index) => (
                  <Cell key={item.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Work Orders by Owner">
          <ResponsiveContainer>
            <BarChart data={byOwner}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="owner" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="orders" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
