export function transformMonthlyTrend(currentList) {
  return currentList.map((item) => ({
    month: item.monthName,
    import: item.impTeus,
    export: item.expTeus,
  }));
}
