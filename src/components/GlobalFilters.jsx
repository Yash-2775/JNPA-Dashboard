export default function GlobalFilters() {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 flex gap-4">
      <select className="border rounded px-3 py-2 text-sm">
        <option>All Terminals</option>
        <option>JNPT</option>
        <option>NSICT</option>
        <option>NSIGT</option>
      </select>

      <select className="border rounded px-3 py-2 text-sm">
        <option>Today</option>
        <option>MTD</option>
        <option>YTD</option>
      </select>

      <select className="border rounded px-3 py-2 text-sm">
        <option>All Containers</option>
        <option>Import</option>
        <option>Export</option>
      </select>
    </div>
  );
}
