const badgeClasses = {
  Closed: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  Completed: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  Open: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  'In Progress': 'bg-sky-500/20 text-sky-300 border-sky-500/30',
  'Waiting Invoice': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  'Waiting Approval': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  'Partial Invoice': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
};

export default function DataTable({ columns, rows, searchable = true, searchTerm, onSearch }) {
  const filteredRows = rows.filter((row) => {
    if (!searchTerm) return true;
    return Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900/90 p-4 shadow-lg">
      {searchable && (
        <div className="mb-3">
          <input
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-sky-500 focus:outline-none"
            placeholder="Search / ค้นหา..."
          />
        </div>
      )}
      <div className="max-h-[400px] overflow-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="sticky top-0 bg-slate-900">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-2 py-2 font-medium text-slate-400">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, i) => (
              <tr key={i} className="border-t border-slate-800">
                {columns.map((column) => {
                  const value = row[column.key];
                  if (column.type === 'badge') {
                    return (
                      <td key={column.key} className="px-2 py-2">
                        <span className={`rounded-full border px-2 py-1 text-xs ${badgeClasses[value] || 'bg-slate-500/20 text-slate-300 border-slate-500/30'}`}>
                          {value}
                        </span>
                      </td>
                    );
                  }
                  return (
                    <td key={column.key} className="px-2 py-2 text-slate-200">
                      {column.format ? column.format(value) : value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
