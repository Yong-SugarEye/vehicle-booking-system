import { useMemo, useState } from 'react';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import CostDashboard from './pages/CostDashboard';
import WorkOrderDashboard from './pages/WorkOrderDashboard';
import PrPoTracking from './pages/PrPoTracking';
import EquipmentDashboard from './pages/EquipmentDashboard';
import { monthlyData, workOrders, prpoData, equipmentData, filters as filterOptions } from './data/mockData';

export default function App() {
  const [activePage, setActivePage] = useState('overview');
  const [filters, setFilters] = useState({ owner: 'All', month: 'All', status: 'All', ...filterOptions });

  const filteredWorkOrders = useMemo(
    () =>
      workOrders.filter((row) =>
        (filters.owner === 'All' || row.owner === filters.owner) &&
        (filters.status === 'All' || row.status === filters.status)
      ),
    [filters.owner, filters.status]
  );

  const filteredPrpo = useMemo(
    () =>
      prpoData.filter((row) =>
        (filters.owner === 'All' || row.owner === filters.owner) &&
        (filters.month === 'All' || row.expectedInvoiceMonth === filters.month) &&
        (filters.status === 'All' || row.status === filters.status)
      ),
    [filters.owner, filters.month, filters.status]
  );

  const filteredMonthly = useMemo(
    () => monthlyData.filter((row) => filters.month === 'All' || row.month === filters.month),
    [filters.month]
  );

  const content = {
    overview: <Overview monthlyData={filteredMonthly.length ? filteredMonthly : monthlyData} />,
    cost: <CostDashboard monthlyData={filteredMonthly.length ? filteredMonthly : monthlyData} workOrders={filteredWorkOrders} />,
    workorder: <WorkOrderDashboard workOrders={filteredWorkOrders} />,
    prpo: <PrPoTracking rows={filteredPrpo} />,
    equipment: <EquipmentDashboard equipmentData={equipmentData} />,
  };

  return (
    <Layout
      activePage={activePage}
      onPageChange={setActivePage}
      filters={filters}
      onFilterChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
    >
      {content[activePage]}
    </Layout>
  );
}
