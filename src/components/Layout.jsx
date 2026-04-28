import { useState } from 'react';

const navItems = [
  { key: 'overview', label: 'Overview' },
  { key: 'cost', label: 'Cost Dashboard' },
  { key: 'workorder', label: 'Work Order' },
  { key: 'prpo', label: 'PR/PO Tracking' },
  { key: 'equipment', label: 'Equipment' },
];

export default function Layout({ activePage, onPageChange, filters, onFilterChange, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filterFields = [
    { key: 'owner', label: 'Owner / ผู้รับผิดชอบ', options: filters.owners },
    { key: 'month', label: 'Month / เดือน', options: filters.months },
    { key: 'status', label: 'Status / สถานะ', options: filters.statuses },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex">
        <aside className={`fixed z-40 h-screen w-64 border-r border-slate-800 bg-slate-900 p-4 transition-transform md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <h1 className="mb-8 text-lg font-bold text-sky-300">Maintenance Intelligence</h1>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  onPageChange(item.key);
                  setSidebarOpen(false);
                }}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${activePage === item.key ? 'bg-sky-500/20 text-sky-200' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="w-full md:ml-64">
          <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/95 p-4 backdrop-blur">
            <div className="mb-3 flex items-center justify-between">
              <button className="rounded-lg border border-slate-700 px-3 py-2 text-sm md:hidden" onClick={() => setSidebarOpen((v) => !v)}>
                Menu
              </button>
              <h2 className="text-xl font-semibold">Maintenance Dashboard / แดชบอร์ดงานซ่อม</h2>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {filterFields.map((field) => (
                <label key={field.key} className="text-xs text-slate-400">
                  {field.label}
                  <select
                    value={filters[field.key]}
                    onChange={(e) => onFilterChange(field.key, e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-2 text-sm text-slate-200"
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </header>
          <div className="p-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
