export default function FilterBar() {
  return (
    <div className="bg-white rounded-md border px-4 py-2 flex flex-wrap items-center gap-4 text-sm">
      {/* Interactivity Filter */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-500">Interactivity Filter</span>
        <select className="border rounded px-2 py-1 text-sm bg-white">
          <option>All</option>
          <option>Export</option>
          <option>Import</option>
        </select>
      </div>

      {/* Global Filters */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-500">Global Filters</span>
        <select className="border rounded px-2 py-1 text-sm bg-white">
          <option>FY 2024-25</option>
          <option>FY 2023-24</option>
        </select>
      </div>

      {/* Page Filters */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-500">Page Filters</span>
        <select className="border rounded px-2 py-1 text-sm bg-white">
          <option>All Pages</option>
          <option>Container Terminals</option>
          <option>Vessel Report</option>
        </select>
      </div>

      {/* Terminal Filter (right aligned like image) */}
      <div className="ml-auto flex items-center gap-2 text-sm">
        <span className="text-slate-500">Terminal</span>
        <select className="border rounded px-3 py-1 text-sm bg-white">
          <option>All</option>
          <option>APMT</option>
          <option>BMCT</option>
          <option>NSDT</option>
          <option>NSFT</option>
          <option>NSICT</option>
          <option>NSIGT</option>
        </select>
      </div>
    </div>
  );
}
