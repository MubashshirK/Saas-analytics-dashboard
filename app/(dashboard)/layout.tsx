"use client"

import { useState } from "react"
import Sidebar from "@/components/dashboard/Sidebar"
import TopBar from "@/components/dashboard/TopBar"
import EventsFeed from "@/components/dashboard/EventsFeed"
import { DateRangeContext } from "@/lib/dashboard-context"
import type { DateRange } from "@/lib/data"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [dateRange, setDateRange] = useState<DateRange>("7d")

  return (
    <DateRangeContext value={{ dateRange, setDateRange }}>
      <div className="flex min-h-screen bg-muted/30">
        <Sidebar />
        <div className="flex flex-1 flex-col md:ml-60 xl:mr-[280px]">
          <TopBar dateRange={dateRange} onDateRangeChange={setDateRange} />
          <main className="flex-1 space-y-6 p-6">
            {children}
          </main>
        </div>
        <EventsFeed />
      </div>
    </DateRangeContext>
  )
}
