"use client"

import { DollarSign, Users, TrendingDown, Clock, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useCountUp } from "@/lib/utils"
import { kpiData, type DateRange } from "@/lib/data"

interface KPICardsProps {
  dateRange: DateRange
}

function KPIValue({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const count = useCountUp(value)
  const display =
    value >= 1000
      ? prefix + count.toLocaleString() + suffix
      : prefix + count + suffix
  return <>{display}</>
}

const cards = [
  {
    key: "mrr" as const,
    label: "Monthly Recurring Revenue",
    icon: DollarSign,
    prefix: "$",
    suffix: "",
    format: (v: number) => v.toLocaleString(),
  },
  {
    key: "activeUsers" as const,
    label: "Active Users",
    icon: Users,
    prefix: "",
    suffix: "",
    format: (v: number) => v.toLocaleString(),
  },
  {
    key: "churnRate" as const,
    label: "Churn Rate",
    icon: TrendingDown,
    prefix: "",
    suffix: "%",
    format: (v: number) => v.toFixed(1),
  },
  {
    key: "avgSession" as const,
    label: "Avg. Session Duration",
    icon: Clock,
    prefix: "",
    suffix: "",
    format: (v: string) => v,
    isString: true,
  },
]

export default function KPICards({ dateRange }: KPICardsProps) {
  const data = kpiData[dateRange]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => {
        const rawValue = data[card.key]
        const deltaKey = `${card.key}Delta` as keyof typeof data
        const delta = data[deltaKey] as number
        const isPositive = delta >= 0
        const isChurn = card.key === "churnRate"

        return (
          <Card
            key={card.key}
            className="animate-in fade-in slide-in-from-bottom-2 transition-shadow hover:shadow-md"
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {card.label}
                </span>
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                  <card.icon size={18} className="text-primary" />
                </span>
              </div>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-bold tracking-tight">
                  {card.isString ? (
                    rawValue
                  ) : (
                    <KPIValue
                      value={rawValue as number}
                      prefix={card.prefix}
                      suffix={card.suffix}
                    />
                  )}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                {isChurn && !isPositive ? (
                  <TrendingUp size={14} className="text-green-500" />
                ) : isPositive ? (
                  <TrendingUp size={14} className="text-green-500" />
                ) : (
                  <TrendingDown size={14} className="text-red-500" />
                )}
                <span
                  className={cn(
                    "text-xs font-semibold",
                    isChurn && isPositive ? "text-red-500" : isChurn ? "text-green-500" : isPositive ? "text-green-500" : "text-red-500"
                  )}
                >
                  {isPositive ? "+" : ""}
                  {delta}%
                </span>
                <span className="text-xs text-muted-foreground">vs previous period</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
