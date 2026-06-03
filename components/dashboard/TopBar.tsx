"use client"

import { useState, useEffect } from "react"
import { Sun, Moon, Download } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import type { DateRange } from "@/lib/data"

interface TopBarProps {
  dateRange: DateRange
  onDateRangeChange: (val: DateRange) => void
}

export default function TopBar({ dateRange, onDateRangeChange }: TopBarProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = theme === "dark"

  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-6">
      <h1 className="text-lg font-semibold tracking-tight">Dashboard</h1>

      <div className="flex items-center gap-4">
        <Tabs value={dateRange} onValueChange={(v) => onDateRangeChange(v as DateRange)}>
          <TabsList className="h-8">
            <TabsTrigger value="7d" className="text-xs">7 days</TabsTrigger>
            <TabsTrigger value="30d" className="text-xs">30 days</TabsTrigger>
            <TabsTrigger value="90d" className="text-xs">90 days</TabsTrigger>
          </TabsList>
        </Tabs>

        <Button variant="outline" size="sm" className="gap-2">
          <Download size={14} />
          Export
        </Button>

        <div className="flex items-center gap-3 border-l pl-4">
          {mounted ? (
            <>
              <Sun size={14} className="text-muted-foreground" />
              <Switch
                checked={isDark}
                onCheckedChange={(c) => setTheme(c ? "dark" : "light")}
                size="sm"
              />
              <Moon size={14} className="text-muted-foreground" />
            </>
          ) : (
            <div className="h-[18px] w-[52px]" />
          )}
        </div>
      </div>
    </header>
  )
}
