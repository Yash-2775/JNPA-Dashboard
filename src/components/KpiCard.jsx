const KpiCard = ({ title, value, subtitle }) => {
  return (
    <div className="bg-white border rounded-md px-3 py-3 text-center h-[120px] flex flex-col justify-center">
      <p className="text-xs text-slate-500">{title}</p>

      <p className="text-2xl font-semibold text-slate-700 mt-1">
        {value}
      </p>

      {subtitle && (
        <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default KpiCard;
