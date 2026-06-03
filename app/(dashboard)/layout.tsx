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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [eventsFeedOpen, setEventsFeedOpen] = useState(false)

  useEffect(() => {
    const savedDateRange = localStorage.getItem("dateRange") as DateRange | null
    if (savedDateRange === "7d" || savedDateRange === "30d" || savedDateRange === "90d") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDateRange(savedDateRange)
    }
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed")
    if (saved === "true") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSidebarCollapsed(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", String(sidebarCollapsed))
  }, [sidebarCollapsed])

  useEffect(() => {
    localStorage.setItem("dateRange", dateRange)
  }, [dateRange])

  useEffect(() => {
    if (mobileMenuOpen || eventsFeedOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileMenuOpen, eventsFeedOpen])

  return (
    <DashboardContext value={{ dateRange, setDateRange, sidebarCollapsed, setSidebarCollapsed }}>
      <div className="flex flex-col min-h-screen bg-muted/30 xl:flex-row">
        <div
          className={cn(
            "fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity duration-300",
            mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={cn(
            "fixed inset-0 z-40 bg-black/50 xl:hidden transition-opacity duration-300",
            eventsFeedOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setEventsFeedOpen(false)}
        />
        <Sidebar mobileMenuOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        <div
          className={cn(
            "flex min-w-0 flex-1 flex-col transition-[margin] duration-300 will-change-[margin-left]",
            sidebarCollapsed ? "md:ml-16" : "md:ml-60",
            "xl:mr-[280px]"
          )}
        >
          <TopBar
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            onToggleMobile={() => setMobileMenuOpen((o) => !o)}
            mobileMenuOpen={mobileMenuOpen}
            onToggleEventsFeed={() => setEventsFeedOpen((o) => !o)}
            eventsFeedOpen={eventsFeedOpen}
          />
          <main className="flex-1 space-y-6 p-4 sm:p-6">
            {children}
          </main>
        </div>
        <EventsFeed mobileOpen={eventsFeedOpen} onClose={() => setEventsFeedOpen(false)} />
      </div>
    </DashboardContext>
  )
}
