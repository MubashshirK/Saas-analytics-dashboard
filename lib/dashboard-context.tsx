"use client"

import { createContext, useContext } from "react"
import type { DateRange } from "./data"

export const DashboardContext = createContext<{
  dateRange: DateRange
  setDateRange: (d: DateRange) => void
  sidebarCollapsed: boolean
  setSidebarCollapsed: (c: boolean) => void
}>({
  dateRange: "7d",
  setDateRange: () => {},
  sidebarCollapsed: false,
  setSidebarCollapsed: () => {},
})

export const useDashboard = () => useContext(DashboardContext)
