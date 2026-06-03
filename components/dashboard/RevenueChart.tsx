"use client"

import { useMemo } from "react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { revenueData, type DateRange } from "@/lib/data"
import { cn, useCountUp } from "@/lib/utils"
import { TrendingUp } from "lucide-react"

interface RevenueChartProps {
  dateRange: DateRange
}

type TooltipPayloadEntry = {
  name: string
  value: number
  color: string
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadEntry[]; label?: string }) {
  if (!active || !payload?.length) return null
  const seen = new Set<string>()
  const unique = payload.filter((entry) => {
    if (seen.has(entry.name)) return false
    seen.add(entry.name)
    return true
  })
  return (
    <div className="rounded-lg border bg-popover px-3 py-2 text-sm shadow-lg">
      <p className="mb-1.5 font-semibold text-foreground">{label}</p>
      {unique.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 py-0.5">
          <span
            className="inline-block size-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground">
            {entry.name === "mrr" ? "MRR" : "New Revenue"}:
          </span>
          <span className="font-semibold text-foreground tabular-nums">
            ${entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  )
}

function AnimatedMRR({ value }: { value: number }) {
  const count = useCountUp(value)
  return <>${count.toLocaleString()}</>
}

function AnimatedNewRevenue({ value }: { value: number }) {
  const count = useCountUp(value)
  return (
    <>
      <TrendingUp size={14} className="text-green-500" />
      <span className="text-green-500">+{count.toLocaleString()}</span>
    </>
  )
}

function AnimatedGrowth({ value }: { value: number }) {
  const count = useCountUp(Math.round(value * 10))
  const display = (count / 10).toFixed(1)
  return (
    <>
      {value >= 0 ? "+" : ""}{display}%
    </>
  )
}

export default function RevenueChart({ dateRange }: RevenueChartProps) {
  const data = useMemo(() => revenueData[dateRange], [dateRange])
  const current = data[data.length - 1]
  const previous = data[0]
  const mrrGrowth = ((current.mrr - previous.mrr) / previous.mrr) * 100
  const newRevenueGrowth = current.newRevenue - previous.newRevenue

  return (
    <Card>
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Revenue Overview</CardTitle>
          <span className="text-xs text-muted-foreground">{dateRange === "7d" ? "7 days" : dateRange === "30d" ? "30 days" : "90 days"}</span>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-3">
          <div className="mb-4 flex items-baseline justify-between">
            <div>
              <div className="text-2xl font-bold tabular-nums tracking-tight">
                <AnimatedMRR value={current.mrr} />
              </div>
              <div className="text-xs text-muted-foreground">Current MRR</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm font-medium tabular-nums">
                  <AnimatedNewRevenue value={newRevenueGrowth} />
                </div>
                <div className="text-xs text-muted-foreground">New Revenue</div>
              </div>
              <div className="text-right">
                <div className={cn(
                  "flex items-center gap-1 text-sm font-medium tabular-nums",
                  mrrGrowth >= 0 ? "text-green-500" : "text-red-500"
                )}>
                  <AnimatedGrowth value={mrrGrowth} />
                </div>
                <div className="text-xs text-muted-foreground">Growth</div>
              </div>
            </div>
          </div>

        <div className="h-[220px] w-full [&_.recharts-cartesian-grid-horizontal]:opacity-20 [&_.recharts-text]:fill-muted-foreground [&_.recharts-text]:text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: -8 }}>
              <defs>
                <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(217 91% 60%)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(217 91% 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                dy={8}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="mrr"
                fill="url(#mrrGradient)"
                stroke="transparent"
              />
              <Line
                type="monotone"
                dataKey="mrr"
                stroke="hsl(217 91% 60%)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5, strokeWidth: 0, fill: "hsl(217 91% 60%)" }}
              />
              <Line
                type="monotone"
                dataKey="newRevenue"
                stroke="hsl(160 84% 50%)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{ r: 5, strokeWidth: 0, fill: "hsl(160 84% 50%)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
