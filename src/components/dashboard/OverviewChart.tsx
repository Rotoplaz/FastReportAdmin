import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer } from "../ui/chart";

const data = [
  {
    name: "Ene",
    total: 35,
  },
  {
    name: "Feb",
    total: 38,
  },
  {
    name: "Mar",
    total: 42,
  },
  {
    name: "Abr",
    total: 45,
  },
  {
    name: "May",
    total: 48,
  },
  {
    name: "Jun",
    total: 43,
  },
  {
    name: "Jul",
    total: 40,
  },
  {
    name: "Ago",
    total: 39,
  },
  {
    name: "Sep",
    total: 44,
  },
  {
    name: "Oct",
    total: 46,
  },
  {
    name: "Nov",
    total: 41,
  },
  {
    name: "Dic",
    total: 39,
  },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function OverviewChart() {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ChartContainer>
  );
}