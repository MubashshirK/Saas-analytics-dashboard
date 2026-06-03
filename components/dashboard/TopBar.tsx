"use client"

import { useState, useEffect, useRef } from "react"
import { Sun, Moon, Download, Menu, Radio, ChevronDown } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import type { DateRange } from "@/lib/data"

interface TopBarProps {
  dateRange: DateRange
  onDateRangeChange: (val: DateRange) => void
  onToggleMobile: () => void
  mobileMenuOpen: boolean
  onToggleEventsFeed: () => void
  eventsFeedOpen: boolean
}

const DATE_OPTIONS: { value: DateRange; label: string }[] = [
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "90d", label: "90 days" },
]

export default function TopBar({ dateRange, onDateRangeChange, onToggleMobile, mobileMenuOpen, onToggleEventsFeed, eventsFeedOpen }: TopBarProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClick)
      return () => document.removeEventListener("mousedown", handleClick)
    }
  }, [dropdownOpen])

  const isDark = theme === "dark"

  return (
    <header className="flex h-14 items-center justify-between gap-3 border-b bg-background px-3 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobile}
          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted md:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <Menu size={18} />
        </button>
        <h1 className="text-lg font-semibold tracking-tight">Dashboard</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Mobile: compact date dropdown */}
        <div className="relative md:hidden" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex h-8 items-center gap-1 rounded-lg border border-border bg-background px-2 text-xs font-sans font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {DATE_OPTIONS.find((o) => o.value === dateRange)?.label}
            <ChevronDown size={12} className="text-muted-foreground" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-28 overflow-hidden rounded-lg border border-border bg-popover shadow-lg z-50">
              {DATE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { onDateRangeChange(opt.value); setDropdownOpen(false) }}
                  className={`flex w-full px-3 py-2 text-left text-xs font-sans transition-colors hover:bg-accent ${
                    opt.value === dateRange ? "bg-accent font-medium text-accent-foreground" : "text-popover-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop: date tabs */}
        <div className="hidden md:block overflow-x-auto scrollbar-hide">
          <Tabs value={dateRange} onValueChange={(v) => onDateRangeChange(v as DateRange)}>
            <TabsList className="h-8">
              {DATE_OPTIONS.map((opt) => (
                <TabsTrigger key={opt.value} value={opt.value} className="text-xs whitespace-nowrap">
                  {opt.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Mobile: events feed toggle */}
        <button
          onClick={onToggleEventsFeed}
          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted xl:hidden"
          aria-label={eventsFeedOpen ? "Close events" : "Open events"}
        >
          <Radio size={16} />
        </button>

        <Button variant="outline" size="sm" className="hidden sm:inline-flex gap-2">
          <Download size={14} />
          Export
        </Button>

        <div className="flex items-center gap-2 sm:gap-3 border-l pl-2 sm:pl-4">
          {mounted ? (
            <>
              <Sun size={14} className="text-muted-foreground shrink-0" />
              <Switch
                checked={isDark}
                onCheckedChange={(c) => setTheme(c ? "dark" : "light")}
                size="sm"
              />
              <Moon size={14} className="text-muted-foreground shrink-0" />
            </>
          ) : (
            <div className="h-[18px] w-[52px]" />
          )}
        </div>
      </div>
    </header>
  )
}
