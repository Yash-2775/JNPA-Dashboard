export default function MonthlyTable({ currentList, previousList }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
      <h3 className="text-sm font-semibold mb-3">
        Monthly Container Traffic (TEUs)
      </h3>

      <table className="min-w-full border text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="border px-3 py-2">Month</th>
            <th className="border px-3 py-2">Import</th>
            <th className="border px-3 py-2">Export</th>
            <th className="border px-3 py-2">Total</th>
            <th className="border px-3 py-2">Prev Year Total</th>
          </tr>
        </thead>

        <tbody>
          {currentList.map((row, i) => (
            <tr key={row.monthName} className="hover:bg-slate-50">
              <td className="border px-3 py-2">{row.monthName}</td>
              <td className="border px-3 py-2 text-right">{row.impTeus}</td>
              <td className="border px-3 py-2 text-right">{row.expTeus}</td>
              <td className="border px-3 py-2 text-right font-medium">
                {row.totalTeus}
              </td>
              <td className="border px-3 py-2 text-right text-slate-500">
                {previousList[i]?.totalTeus || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
