import { useState } from 'react';
import ChartCard from '../components/ChartCard';
import DataTable from '../components/DataTable';
import { ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';

const currency = (v) => `฿${v.toLocaleString()}`;

export default function EquipmentDashboard({ equipmentData }) {
  const [search, setSearch] = useState('');
  const topDowntime = [...equipmentData].sort((a, b) => b.downtimeHours - a.downtimeHours).slice(0, 10);
  const topCost = [...equipmentData].sort((a, b) => b.maintenanceCost - a.maintenanceCost).slice(0, 10);

  const columns = [
    { key: 'equipment', label: 'Equipment' },
    { key: 'functionalLocation', label: 'Functional Location' },
    { key: 'mtbf', label: 'MTBF (hr)' },
    { key: 'mttr', label: 'MTTR (hr)' },
    { key: 'downtimeHours', label: 'Downtime Hours' },
    { key: 'maintenanceCost', label: 'Maintenance Cost', format: currency },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Top 10 Downtime Equipment">
          <ResponsiveContainer>
            <BarChart data={topDowntime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="equipment" stroke="#94a3b8" interval={0} angle={-20} textAnchor="end" height={70} />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="downtimeHours" fill="#ef4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top 10 Maintenance Cost Equipment">
          <ResponsiveContainer>
            <BarChart data={topCost}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="equipment" stroke="#94a3b8" interval={0} angle={-20} textAnchor="end" height={70} />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="maintenanceCost" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <DataTable columns={columns} rows={equipmentData} searchTerm={search} onSearch={setSearch} />
    </div>
  );
}
