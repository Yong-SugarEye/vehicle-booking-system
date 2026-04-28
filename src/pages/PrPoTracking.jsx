import { useState } from 'react';
import DataTable from '../components/DataTable';

const currency = (v) => `฿${v.toLocaleString()}`;

export default function PrPoTracking({ rows }) {
  const [search, setSearch] = useState('');

  const columns = [
    { key: 'prNo', label: 'PR Number' },
    { key: 'poNo', label: 'PO Number' },
    { key: 'orderNo', label: 'Order Number' },
    { key: 'owner', label: 'Requisitioner / Owner' },
    { key: 'vendor', label: 'Vendor' },
    { key: 'poValue', label: 'PO Value', format: currency },
    { key: 'stillToInvoice', label: 'Still to be Invoiced', format: currency },
    { key: 'expectedInvoiceMonth', label: 'Expected Invoice Month' },
    { key: 'status', label: 'Status', type: 'badge' },
  ];

  return <DataTable columns={columns} rows={rows} searchTerm={search} onSearch={setSearch} />;
}
