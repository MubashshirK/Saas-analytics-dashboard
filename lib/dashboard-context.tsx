"use client"

import { createContext, useContext } from "react"
import type { DateRange } from "./data"

export const DateRangeContext = createContext<{
  dateRange: DateRange
  setDateRange: (d: DateRange) => void
}>({
  dateRange: "7d",
  setDateRange: () => {},
})

export const useDateRange = () => useContext(DateRangeContext)
