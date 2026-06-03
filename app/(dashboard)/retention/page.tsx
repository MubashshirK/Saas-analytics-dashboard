"use client"

import { useDateRange } from "@/lib/dashboard-context"
import KPICards from "@/components/dashboard/KPICards"
import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap"

export default function RetentionPage() {
  const { dateRange } = useDateRange()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Retention</h2>
        <p className="text-sm text-muted-foreground">User engagement and retention metrics</p>
      </div>
      <KPICards dateRange={dateRange} />
      <ActivityHeatmap />
    </div>
  )
}
