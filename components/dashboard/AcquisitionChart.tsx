"use client"

import { useMemo } from "react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { acquisitionData } from "@/lib/data"

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border bg-popover p-2 text-sm shadow-md">
      <span className="font-medium">{label}: </span>
      <span>{payload[0].value}%</span>
    </div>
  )
}

export default function AcquisitionChart() {
  const data = useMemo(() => acquisitionData, [])

  return (
    <Card className="animate-in fade-in slide-in-from-bottom-2">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Acquisition Channels
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 4, right: 8, bottom: 4, left: -16 }}>
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="source"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={72}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--muted))" }} />
              <Bar
                dataKey="value"
                radius={[0, 6, 6, 0]}
                barSize={24}
              >
                {data.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex flex-wrap gap-4">
          {data.map((entry) => (
            <div key={entry.source} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span
                className="inline-block size-3 rounded"
                style={{ backgroundColor: entry.color }}
              />
              {entry.source}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
