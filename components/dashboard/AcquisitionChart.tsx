"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import { Globe, Link, MousePointerClick, CreditCard, Users, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { acquisitionData, type DateRange } from "@/lib/data"

const SOURCE_META: Record<string, { icon: typeof Globe; color: string }> = {
  Organic: { icon: Globe, color: "hsl(217 91% 60%)" },
  Referral: { icon: Link, color: "hsl(160 84% 50%)" },
  Direct: { icon: MousePointerClick, color: "hsl(37 92% 55%)" },
  Paid: { icon: CreditCard, color: "hsl(271 81% 56%)" },
  Social: { icon: Users, color: "hsl(346 84% 55%)" },
}

function useAnimatedValue(target: number, duration = 1200): number {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)
  const fromRef = useRef(0)

  useEffect(() => {
    const from = fromRef.current
    fromRef.current = target
    const start = performance.now()

    function step(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(from + (target - from) * eased))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      }
    }

    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      fromRef.current = from
    }
  }, [target, duration])

  return value
}

interface AcquisitionChartProps {
  dateRange: DateRange
}

function ChannelRow({ source, value, trend, change, color, icon: Icon, mounted }: {
  source: string
  value: number
  trend: "up" | "down"
  change: number
  color: string
  icon: typeof Globe
  mounted: boolean
}) {
  const animatedValue = useAnimatedValue(value)
  const animatedChange = useAnimatedValue(change)
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown

  return (
    <div className="group">
      <div className="mb-1.5 flex items-center gap-3">
        <span
          className="flex size-8 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: color + "1A" }}
        >
          <Icon size={15} style={{ color }} />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{source}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tabular-nums">{animatedValue}%</span>
              <span
                className={cn(
                  "flex items-center gap-0.5 text-xs tabular-nums",
                  trend === "up" ? "text-green-500" : "text-red-500"
                )}
              >
                <TrendIcon size={12} />
                {trend === "up" ? "+" : "-"}{animatedChange}%
              </span>
            </div>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full"
              style={{
                width: mounted ? `${value}%` : "0%",
                backgroundColor: color,
                transition: "width 0.5s cubic-bezier(0, 0, 0.2, 1)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AcquisitionChart({ dateRange }: AcquisitionChartProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])
  const data = useMemo(() => acquisitionData[dateRange], [dateRange])
  const total = useMemo(() => data.reduce((s, d) => s + d.users, 0), [data])

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Acquisition Channels</CardTitle>
          <span className="text-xs text-muted-foreground">
            {total.toLocaleString()} total users
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-2">
        <div className="space-y-3">
          {data.map((entry) => {
            const meta = SOURCE_META[entry.source]
            const Icon = meta?.icon ?? Users
            const color = meta?.color ?? "hsl(0 0% 60%)"

            return (
              <ChannelRow
                key={entry.source}
                source={entry.source}
                value={entry.value}
                trend={entry.trend}
                change={entry.change}
                color={color}
                icon={Icon}
                mounted={mounted}
              />
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
