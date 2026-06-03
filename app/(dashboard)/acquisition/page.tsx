"use client"

import AcquisitionChart from "@/components/dashboard/AcquisitionChart"
import PagesTable from "@/components/dashboard/PagesTable"

export default function AcquisitionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Acquisition</h2>
        <p className="text-sm text-muted-foreground">How users find your product</p>
      </div>
      <AcquisitionChart />
      <PagesTable />
    </div>
  )
}
