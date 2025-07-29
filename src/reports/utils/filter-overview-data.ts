import {
  OverviewData,
  OverViewMode,
  Report,
} from "../interfaces/reports.interfaces";

export const filterOverViewData = (
  reports: Report[],
  overViewMode: OverViewMode = OverViewMode.year_to_date
): OverviewData[] => {
  const now = new Date(new Date().toISOString());
  let startDate: Date;
  let groupBy: "day" | "month";

  switch (overViewMode) {
    case OverViewMode.last_7_days:
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 6);
      groupBy = "day";
      break;
    case OverViewMode.last_30_days:
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 30);
      groupBy = "day";
      break;
    case OverViewMode.last_3_months:
      startDate = new Date(now);
      startDate.setMonth(now.getMonth() - 2);
      startDate.setDate(1);
      groupBy = "month";
      break;
    case OverViewMode.year_to_date:
    default:
      startDate = new Date(now.getFullYear(), 0, 1);
      groupBy = "month";
      break;
  }

  const formatKey = (date: Date): string => {
    if (groupBy === "day") {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } else {
      return date
        .toLocaleString("default", {
          month: "short",
        })
        .toLowerCase();
    }
  };
  const counts: Record<string, number> = {};

  reports.forEach((report) => {
    const createdAt = new Date(report.createdAt);
    if (createdAt >= startDate && createdAt <= now) {
      const key = formatKey(createdAt);
      counts[key] = (counts[key] || 0) + 1;
    }
  });

  const labels: { key: string; name: string }[] = [];

  if (groupBy === "day") {
    const tmp = new Date(startDate);
    while (tmp <= now) {
      const key = tmp.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      labels.push({ key, name: key });
      tmp.setDate(tmp.getDate() + 1);
    }
  } else {
    const tmp = new Date(startDate);
    while (tmp <= now) {
      const key = tmp
        .toLocaleString("default", { month: "short" })
        .toLowerCase();
      if (!labels.find((l) => l.key === key)) {
        labels.push({ key, name: key });
      }
      tmp.setMonth(tmp.getMonth() + 1);
    }
  }
  const sorted = labels.map(({ key, name }) => ({
    name,
    total: counts[key] || 0,
  }));

  return sorted;
};
