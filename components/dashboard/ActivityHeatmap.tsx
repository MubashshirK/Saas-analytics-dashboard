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

function getOpacity(value: number): number {
  const maxVal = Math.max(...heatmapData.flat())
  const ratio = value / maxVal
  if (ratio === 0) return 0.08
  if (ratio <= 0.2) return 0.2
  if (ratio <= 0.4) return 0.4
  if (ratio <= 0.6) return 0.6
  if (ratio <= 0.8) return 0.8
  return 1
}

const LEGEND_STEPS = [0.08, 0.2, 0.4, 0.6, 0.8, 1]

export default function ActivityHeatmap() {
  const data = useMemo(() => heatmapData, [])

  return (
    <Card>
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
                  {row.map((val, hourIdx) => (
                    <Tooltip key={hourIdx}>
                      <TooltipTrigger>
                        <div
                          className="size-[14px] rounded-[3px] bg-primary transition-opacity hover:ring-2 hover:ring-ring hover:ring-offset-1 hover:ring-offset-background"
                          style={{ opacity: getOpacity(val) }}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        {DAYS[dayIdx]} {hourIdx}:00 — {val} events
                      </TooltipContent>
                    </Tooltip>
                  ))}
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
              style={{ opacity: pct }}
            />
          ))}
          <span>High</span>
        </div>
      </CardContent>
    </Card>
  )
}
