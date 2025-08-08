import { type ChartConfig } from "@/components/ui/chart"
import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type PieChartCardProps = {
  title: string
  description?: string
  data: {
    label: string
    value: number
    fill: string
  }[]
  footerInfo?: {
    trendText?: string
    extraText?: string
  }
}

export function PieChartCard({
  title,
  description,
  data,
  footerInfo,
}: PieChartCardProps) {
  
  const chartConfig = data.reduce((acc, item) => {
    acc[item.label] = {
      label: item.label,
      color: item.fill,
    };
    return acc;
  }, {} as ChartConfig);
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square h-[400px] w-[400px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="label" hideLabel />} />
            <Pie data={data} dataKey="value">
              <LabelList dataKey="label" fontSize={19} />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      {(footerInfo?.trendText || footerInfo?.extraText) && (
        <CardFooter className="flex-col gap-2 text-sm">
          {footerInfo.trendText && (
            <div className="flex items-center gap-2 leading-none font-medium">
              {footerInfo.trendText} <TrendingUp className="h-4 w-4" />
            </div>
          )}
          {footerInfo.extraText && (
            <div className="text-muted-foreground leading-none">
              {footerInfo.extraText}
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
