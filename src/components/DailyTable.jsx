export default function DailyTable({ data }) {
  if (!data || data.length === 0) {
    return <div className="text-sm text-slate-500">No daily data available</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
      <h3 className="text-sm font-semibold mb-3">
        Daily Terminal-wise Container Traffic (TEUs)
      </h3>

      <table className="min-w-full border text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="border px-3 py-2 text-left">Date</th>

            {data[0].terminals.map((t) => (
              <th key={t.name} colSpan={3} className="border px-3 py-2 text-center">
                {t.name}
              </th>
            ))}
          </tr>

          <tr className="bg-slate-50">
            <th className="border px-3 py-1"></th>

            {data[0].terminals.map((t) => (
              <Fragment key={t.name}>
                <th className="border px-2 py-1">Exp</th>
                <th className="border px-2 py-1">Imp</th>
                <th className="border px-2 py-1">Total</th>
              </Fragment>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-50">
              <td className="border px-3 py-2">{row.date}</td>

              {row.terminals.map((t, i) => (
                <Fragment key={i}>
                  <td className="border px-2 py-2 text-right">{t.exp}</td>
                  <td className="border px-2 py-2 text-right">{t.imp}</td>
                  <td className="border px-2 py-2 text-right font-medium">
                    {t.total}
                  </td>
                </Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
