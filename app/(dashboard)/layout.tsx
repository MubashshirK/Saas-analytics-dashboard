"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/components/dashboard/Sidebar"
import TopBar from "@/components/dashboard/TopBar"
import EventsFeed from "@/components/dashboard/EventsFeed"
import { DashboardContext } from "@/lib/dashboard-context"
import type { DateRange } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [dateRange, setDateRange] = useState<DateRange>("7d")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    const savedDateRange = localStorage.getItem("dateRange") as DateRange | null
    if (savedDateRange === "7d" || savedDateRange === "30d" || savedDateRange === "90d") {
      setDateRange(savedDateRange)
    }
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed")
    if (saved === "true") setSidebarCollapsed(true)
  }, [])

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", String(sidebarCollapsed))
  }, [sidebarCollapsed])

  useEffect(() => {
    localStorage.setItem("dateRange", dateRange)
  }, [dateRange])

  return (
    <DashboardContext value={{ dateRange, setDateRange, sidebarCollapsed, setSidebarCollapsed }}>
      <div className="flex min-h-screen bg-muted/30">
        <Sidebar />
        <div
          className={cn(
            "flex flex-1 flex-col transition-[margin] duration-300 will-change-[margin-left]",
            sidebarCollapsed ? "md:ml-16" : "md:ml-60",
            "xl:mr-[280px]"
          )}
        >
          <TopBar dateRange={dateRange} onDateRangeChange={setDateRange} />
          <main className="flex-1 space-y-6 p-6">
            {children}
          </main>
        </div>
        <EventsFeed />
      </div>
    </DashboardContext>
  )
}
