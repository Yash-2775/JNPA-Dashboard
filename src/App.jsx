import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import logo from "./assets/jnpa-logo.png";

export default function App() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4">
        <div className="flex items-center gap-2 mb-6">
          <img src={logo} alt="JNPA" className="w-10 h-10" />
          <span className="font-bold text-lg">JNPA</span>
        </div>

        <nav className="space-y-3">
          {[
            "Container Terminals",
            "Vessel Report",
            "Yard Inventory",
            "CFS Pendency",
            "ICD Pendency",
            "Gate Movement",
          ].map((item) => (
            <button
              key={item}
              className="w-full text-left px-4 py-2 rounded-lg bg-slate-50 hover:bg-blue-100 hover:text-blue-700 transition"
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-700">
            CONTAINER TERMINALS
          </h1>
          <span className="text-sm text-slate-500">
            Units: TEUs for all metrics displayed
          </span>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <KpiCard title="Total | FY" value="6.34M" sub="Prev Year: 5.63M" />
          <KpiCard title="Current Month" value="3.2L" sub="Prev Year: 2.57L" />
          <KpiCard title="Today's Total" value="0" sub="Prev Year: 15,144" />
        </div>

        {/* Export & Import */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Export */}
          <Section title="Export" color="blue">
            <KpiCard title="Overall Export | FY" value="3.14M" />
            <KpiCard title="Current Month Export" value="1.6L" />
            <KpiCard title="Today's Export" value="0" />
          </Section>

          {/* Import */}
          <Section title="Import" color="orange">
            <KpiCard title="Overall Import | FY" value="3.2M" />
            <KpiCard title="Current Month Import" value="1.6L" />
            <KpiCard title="Today's Import" value="0" />
          </Section>
        </div>
      </main>
    </div>
  );
}

/* Reusable Components */

function KpiCard({ title, value, sub }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <p className="text-sm text-slate-500">{title}</p>
      <h2 className="text-2xl font-bold text-slate-700">{value}</h2>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}

function Section({ title, color, children }) {
  return (
    <div className={`rounded-lg p-4 bg-${color}-50`}>
      <h2 className={`text-lg font-semibold text-${color}-700 mb-4`}>
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
}
