import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
}

export const transformReportData = (data: {
  highPriorityReports: number;
  mediumPriorityReports: number;
  lowPriorityReports: number;
}) => {
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

export const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
