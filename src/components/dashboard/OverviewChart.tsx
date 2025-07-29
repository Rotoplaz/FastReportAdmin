import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { OverviewData } from "@/reports/interfaces/reports.interfaces";

interface Props {
  data: OverviewData[];
}


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig
export function OverviewChart({ data }: Props) {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-[420px] w-full">
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className="w-[150px]"
              nameKey="total"
              labelFormatter={(value) => {
                return value
              }}
            />
          }
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
          radius={[4, 4, 0, 0]}
          className="fill-primary"
          fill="var(--color-desktop)"
        />
      </BarChart>
    </ChartContainer>
  );
}