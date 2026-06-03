"use client"

import { useDateRange } from "@/lib/dashboard-context"
import KPICards from "@/components/dashboard/KPICards"
import RevenueChart from "@/components/dashboard/RevenueChart"
import AcquisitionChart from "@/components/dashboard/AcquisitionChart"
import PagesTable from "@/components/dashboard/PagesTable"
import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap"

export default function OverviewPage() {
  const { dateRange } = useDateRange()

  return (
    <>
      <KPICards dateRange={dateRange} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueChart dateRange={dateRange} />
        <AcquisitionChart />
      </div>
      <PagesTable />
      <ActivityHeatmap />
    </>
  )
}
