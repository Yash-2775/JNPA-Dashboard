export function computeKpis(currentList, previousList) {
  const sum = (arr, key) =>
    arr.reduce((total, item) => total + item[key], 0);

  return {
    overall: {
      totalFY: sum(currentList, "totalTeus"),
      prevFY: sum(previousList, "totalTeus"),
      currentMonth: currentList[currentList.length - 1]?.totalTeus || 0,
      prevYearMonth:
        previousList[previousList.length - 1]?.totalTeus || 0,
      today: 0, // API does not provide daily yet
    },
    export: {
      overallFY: sum(currentList, "expTeus"),
      currentMonth: currentList[currentList.length - 1]?.expTeus || 0,
      today: 0,
    },
    import: {
      overallFY: sum(currentList, "impTeus"),
      currentMonth: currentList[currentList.length - 1]?.impTeus || 0,
      today: 0,
    },
  };
}
