"use client"

import { useMemo } from "react"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { heatmapData } from "@/lib/data"

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

function getOpacity(value: number): string {
  const maxVal = Math.max(...heatmapData.flat())
  const ratio = value / maxVal
  if (ratio === 0) return "10"
  if (ratio <= 0.2) return "20"
  if (ratio <= 0.4) return "40"
  if (ratio <= 0.6) return "60"
  if (ratio <= 0.8) return "80"
  return "100"
}

const LEGEND_STEPS = [10, 20, 40, 60, 80, 100]

export default function ActivityHeatmap() {
  const data = useMemo(() => heatmapData, [])

  return (
    <Card className="animate-in fade-in slide-in-from-bottom-2">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Activity Heatmap
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="overflow-x-auto">
          <div className="inline-flex flex-col gap-1">
            {data.map((row, dayIdx) => (
              <div key={dayIdx} className="flex items-center gap-2">
                <span className="w-8 text-right text-[11px] font-medium text-muted-foreground">
                  {DAYS[dayIdx]}
                </span>
                <div className="flex gap-[2px]">
                  {row.map((val, hourIdx) => {
                    const opacity = getOpacity(val)
                    return (
                      <Tooltip key={hourIdx}>
                        <TooltipTrigger>
                          <div
                            className="size-[14px] rounded-[3px] bg-primary transition-all hover:ring-2 hover:ring-ring hover:ring-offset-1 hover:ring-offset-background"
                            style={{ opacity: Number(opacity) / 100 }}
                          />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          {DAYS[dayIdx]} {hourIdx}:00 — {val} events
                        </TooltipContent>
                      </Tooltip>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span>Low</span>
          {LEGEND_STEPS.map((pct) => (
            <div
              key={pct}
              className="size-[14px] rounded-[3px] bg-primary"
              style={{ opacity: pct / 100 }}
            />
          ))}
          <span>High</span>
        </div>
      </CardContent>
    </Card>
  )
}
