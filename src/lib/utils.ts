import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformReportData(data: {
  highPriorityReports: number;
  mediumPriorityReports: number;
  lowPriorityReports: number;
}) {
  return [
    {
      label: "Altos",
      value: data.highPriorityReports,
      fill: "var(--color-high)",
    },
    {
      label: "Moderados",
      value: data.mediumPriorityReports,
      fill: "var(--color-medium)",
    },
    {
      label: "Bajos",
      value: data.lowPriorityReports,
      fill: "var(--color-low)",
    },
  ];
}
