import { useEffect, useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import FilterBar from "../components/FilterBar";
import KpiCard from "../components/KpiCard";
import { fetchDashboardData } from "../services/dashboardApi";

export default function ICDPendency() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData()
      .then((res) => {
        setData(res.currentList || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const latestMonth = data[data.length - 1];
  const prevMonth = data[data.length - 2];
  const currentTotal = latestMonth?.icdTotal || 0;
  const previousTotal = prevMonth?.icdTotal || 0;

  const trendData = useMemo(
    () => data.map((m) => ({
      month: m.monthName,
      value: m.icdTotal || 0,
    })),
    [data]
  );

  const tableData = useMemo(
    () => data.map((m) => ({
      month: m.monthName,
      APMT: m.icdAPMT || 0,
      BMCT: m.icdBMCT || 0,
      NSDT: m.icdNSDT || 0,
      NSFT: m.icdNSFT || 0,
      NSICT: m.icdNSICT || 0,
      NSIGT: m.icdNSIGT || 0,
    })),
    [data]
  );

  if (loading) return <div className="p-6">Loading ICD Pendency…</div>;

  return (
    <div className="space-y-6">
      <FilterBar />

      <div className="bg-white rounded-lg shadow p-4 flex justify-between">
        <h1 className="text-2xl font-semibold uppercase">ICD Pendency</h1>
        <span className="text-sm text-slate-500">
          Units: TEUs for all metrics displayed
        </span>
      </div>

      <div className="bg-blue-100 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <KpiCard
            title="JNPA Monthly ICD Pendency"
            value={currentTotal.toLocaleString()}
          />
          <KpiCard
            title="Previous Month ICD Pendency"
            value={previousTotal.toLocaleString()}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-sm font-semibold mb-2">ICD Trend | Monthly</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trendData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
        <h3 className="text-sm font-semibold mb-3">ICD Pendency by Terminals | Monthly</h3>
        <table className="min-w-full text-sm border">
          <thead className="bg-slate-100">
            <tr>
              <th className="border px-3 py-2">Month</th>
              <th className="border px-3 py-2">APMT</th>
              <th className="border px-3 py-2">BMCT</th>
              <th className="border px-3 py-2">NSDT</th>
              <th className="border px-3 py-2">NSFT</th>
              <th className="border px-3 py-2">NSICT</th>
              <th className="border px-3 py-2">NSIGT</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.month}>
                <td className="border px-3 py-2">{row.month}</td>
                <td className="border px-3 py-2">{row.APMT}</td>
                <td className="border px-3 py-2">{row.BMCT}</td>
                <td className="border px-3 py-2">{row.NSDT}</td>
                <td className="border px-3 py-2">{row.NSFT}</td>
                <td className="border px-3 py-2">{row.NSICT}</td>
                <td className="border px-3 py-2">{row.NSIGT}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}