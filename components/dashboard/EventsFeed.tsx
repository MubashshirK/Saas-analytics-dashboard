"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { initialEvents, type FeedEvent } from "@/lib/data"

const EVENT_TYPES = ["signup", "upgrade", "payment_failed"] as const
const EVENT_LABELS: Record<string, string[]> = {
  signup: ["user@company.com signed up", "new@startup.io joined", "hello@agency.com registered"],
  upgrade: ["Client Inc. upgraded to Pro", "Startup LLC entered Business plan", "Enterprise Ltd. expanded seats"],
  payment_failed: ["Card declined for @user", "Invoice payment failed for Acme", "Billing issue with customer #3821"],
}

function randomEvent(id: number): FeedEvent {
  const type = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)]
  const labels = EVENT_LABELS[type]
  return {
    id,
    type,
    label: labels[Math.floor(Math.random() * labels.length)],
    timestamp: Date.now(),
  }
}

const dotColors: Record<string, string> = {
  signup: "bg-green-500",
  upgrade: "bg-blue-500",
  payment_failed: "bg-red-500",
}

function relativeTime(ts: number): string {
  const seconds = Math.floor((Date.now() - ts) / 1000)
  if (seconds < 60) return `${seconds}s ago`
  const mins = Math.floor(seconds / 60)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  return `${hours}h ago`
}

export default function EventsFeed() {
  const [events, setEvents] = useState<FeedEvent[]>(initialEvents)
  const [newIds, setNewIds] = useState<Set<number>>(new Set())

  const addEvent = useCallback(() => {
    const nextId = Date.now()
    const evt = randomEvent(nextId)
    setEvents((prev) => [evt, ...prev].slice(0, 50))
    setNewIds((prev) => new Set(prev).add(nextId))
    setTimeout(() => {
      setNewIds((prev) => {
        const copy = new Set(prev)
        copy.delete(nextId)
        return copy
      })
    }, 600)
  }, [])

  useEffect(() => {
    const interval = setInterval(addEvent, 4000)
    return () => clearInterval(interval)
  }, [addEvent])

  return (
    <Card className="h-full rounded-none border-r-0 border-t xl:fixed xl:right-0 xl:top-0 xl:w-[280px] xl:border-t-0">
      <CardHeader className="border-b px-4 py-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-green-500" />
          </span>
          Live Events
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto px-0 py-0" style={{ maxHeight: "calc(100vh - 3.5rem)" }}>
        <div className="flex flex-col">
          {events.map((evt) => (
            <div
              key={evt.id}
              className={`flex items-start gap-3 border-b border-border/40 px-4 py-3 text-sm transition-all duration-300 ${
                newIds.has(evt.id)
                  ? "-translate-y-2 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              <span
                className={`mt-1.5 size-2 shrink-0 rounded-full ${dotColors[evt.type]}`}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-foreground">{evt.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {relativeTime(evt.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
