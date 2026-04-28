import ChartCard from '../components/ChartCard';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { orderTypeMap } from '../data/mockData';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#14b8a6', '#f43f5e'];

export default function CostDashboard({ monthlyData, workOrders }) {
  const ownerCost = Object.values(
    workOrders.reduce((acc, wo) => {
      acc[wo.owner] = acc[wo.owner] || { owner: wo.owner, cost: 0 };
      acc[wo.owner].cost += wo.cost;
      return acc;
    }, {})
  )
    .sort((a, b) => b.cost - a.cost)
    .slice(0, 10);

  const equipmentCost = Object.values(
    workOrders.reduce((acc, wo) => {
      acc[wo.equipment] = acc[wo.equipment] || { equipment: wo.equipment, cost: 0 };
      acc[wo.equipment].cost += wo.cost;
      return acc;
    }, {})
  )
    .sort((a, b) => b.cost - a.cost)
    .slice(0, 10);

  const categoryData = Object.values(
    workOrders.reduce((acc, wo) => {
      const prefix = wo.orderNo.slice(0, 2);
      const category = orderTypeMap[prefix] || 'Unknown';
      acc[category] = acc[category] || { name: category, value: 0 };
      acc[category].value += wo.cost;
      return acc;
    }, {})
  );

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ChartCard title="Monthly Maintenance Cost" subtitle="Actual monthly maintenance spending">
        <ResponsiveContainer>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="actual" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Actual vs Budget" subtitle="Cost control tracking">
        <ResponsiveContainer>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="budget" stroke="#10b981" strokeWidth={3} />
            <Line type="monotone" dataKey="actual" stroke="#ef4444" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Waiting for Invoice by Month" subtitle="Outstanding invoice values">
        <ResponsiveContainer>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="waitingInvoice" fill="#f59e0b" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Cost Category Mix" subtitle="CM, PM, CL, SD, IM, BD, PJ by order prefix rule">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={95}>
              {categoryData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Top 10 Cost by Work Owner">
        <ResponsiveContainer>
          <BarChart data={ownerCost} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis type="number" stroke="#94a3b8" />
            <YAxis type="category" dataKey="owner" stroke="#94a3b8" width={80} />
            <Tooltip />
            <Bar dataKey="cost" fill="#6366f1" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Top 10 Cost by Equipment / FLOC">
        <ResponsiveContainer>
          <BarChart data={equipmentCost} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis type="number" stroke="#94a3b8" />
            <YAxis type="category" dataKey="equipment" stroke="#94a3b8" width={120} />
            <Tooltip />
            <Bar dataKey="cost" fill="#14b8a6" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
