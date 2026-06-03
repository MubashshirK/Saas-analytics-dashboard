"use client"

import { useDashboard } from "@/lib/dashboard-context"
import KPICards from "@/components/dashboard/KPICards"
import RevenueChart from "@/components/dashboard/RevenueChart"

export default function RevenuePage() {
  const { dateRange } = useDashboard()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Revenue</h2>
        <p className="text-sm text-muted-foreground">Detailed MRR breakdown and trends</p>
      </div>
      <KPICards dateRange={dateRange} />
      <RevenueChart dateRange={dateRange} />
    </div>
  )
}
