// components/ui/metric-card.tsx
import { cva, type VariantProps } from "class-variance-authority"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ReactNode } from "react"
import { Skeleton } from "../ui/skeleton"

const metricCardVariants = cva(
  "rounded-lg border shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 gap-5",
  {
    variants: {
      variant: {
        default: "border-border bg-card",
        primary: "border-primary/20 bg-primary/5",
        secondary: "border-secondary/20 bg-secondary/5",
        destructive: "border-destructive/20 bg-destructive/5",
        success: "border-emerald-500/20 bg-emerald-500/5",
        warning: "border-amber-500/20 bg-amber-500/5",
        info: "border-blue-500/20 bg-blue-500/5",
      },
      size: {
        sm: "p-2",
        md: "p-4",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

const metricCardTitleVariants = cva("font-medium", {
  variants: {
    variant: {
      default: "text-card-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      destructive: "text-destructive",
      success: "text-emerald-600 dark:text-emerald-400",
      warning: "text-amber-600 dark:text-amber-400",
      info: "text-blue-600 dark:text-blue-400",
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
})

const metricCardIconVariants = cva("", {
  variants: {
    variant: {
      default: "text-muted-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      destructive: "text-destructive",
      success: "text-emerald-500",
      warning: "text-amber-500",
      info: "text-blue-500",
    },
    size: {
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
    },
  },
})

const metricCardValueVariants = cva("font-bold", {
  variants: {
    variant: {
      default: "text-card-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      destructive: "text-destructive",
      success: "text-emerald-600 dark:text-emerald-400",
      warning: "text-amber-600 dark:text-amber-400",
      info: "text-blue-600 dark:text-blue-400",
    },
    size: {
      sm: "text-xl",
      md: "text-2xl",
      lg: "text-3xl",
    },
  },
})

const metricCardDescriptionVariants = cva("", {
  variants: {
    variant: {
      default: "text-muted-foreground",
      primary: "text-primary/80",
      secondary: "text-secondary/80",
      destructive: "text-destructive/80",
      success: "text-emerald-500/80",
      warning: "text-amber-500/80",
      info: "text-blue-500/80",
    },
    size: {
      sm: "text-[0.7rem]",
      md: "text-xs",
      lg: "text-sm",
    },
  },
})

type MetricCardVariants = VariantProps<typeof metricCardVariants>

interface MetricCardProps extends MetricCardVariants {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  className?: string;
  isLoading?: boolean;
}

export const MetricCard = ({
  title,
  value,
  icon,
  description,
  variant,
  size,
  className,
  isLoading
}: MetricCardProps) => {
  return (
    <Card className={metricCardVariants({ variant, size, className })}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={metricCardTitleVariants({ variant, size })}>
          {title}
        </CardTitle>
        <div className={metricCardIconVariants({ variant, size })}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className={metricCardValueVariants({ variant, size })}>
          {
            isLoading ? <Skeleton className="w-4/12 h-9 bg-gray-200" /> : value
          }
          
        </div>
        {description && (
          <p className={metricCardDescriptionVariants({ variant, size })}>
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}