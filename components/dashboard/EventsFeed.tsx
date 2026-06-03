"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { initialEvents, type FeedEvent } from "@/lib/data"

const EVENT_TYPES = ["signup", "upgrade", "payment_failed"] as const
const EVENT_LABELS: Record<string, string[]> = {
  signup: ["user@company.com signed up", "new@startup.io joined", "hello@agency.com registered"],
  upgrade: ["Client Inc. upgraded to Pro", "Startup LLC entered Business plan", "Enterprise Ltd. expanded seats"],
  payment_failed: ["Card declined for @user", "Invoice payment failed for Acme", "Billing issue with customer #3821"],
}

const TYPE_STYLES: Record<string, { border: string; badge: string; label: string }> = {
  signup: {
    border: "border-l-green-500",
    badge: "bg-green-500/10 text-green-500",
    label: "Signup",
  },
  upgrade: {
    border: "border-l-blue-500",
    badge: "bg-blue-500/10 text-blue-500",
    label: "Upgrade",
  },
  payment_failed: {
    border: "border-l-red-500",
    badge: "bg-red-500/10 text-red-500",
    label: "Failed",
  },
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

function relativeTime(ts: number, now: number): string {
  const seconds = Math.floor(Math.max(0, (now - ts) / 1000))
  if (seconds < 60) return `${seconds}s ago`
  const mins = Math.floor(seconds / 60)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default function EventsFeed() {
  const [events, setEvents] = useState<FeedEvent[]>(initialEvents)
  const [now, setNow] = useState(0)
  const newEventIds = useRef(new Set<number>())

  const addEvent = useCallback(() => {
    const nextId = Date.now()
    const evt = randomEvent(nextId)
    newEventIds.current.add(nextId)
    setEvents((prev) => [evt, ...prev].slice(0, 20))
    setTimeout(() => {
      newEventIds.current.delete(nextId)
    }, 500)
  }, [])

  useEffect(() => {
    const interval = setInterval(addEvent, 4000)
    return () => clearInterval(interval)
  }, [addEvent])

  useEffect(() => {
    setNow(Date.now())
    const interval = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="h-full rounded-none border-r-0 border-t xl:fixed xl:right-0 xl:top-0 xl:w-[280px] xl:border-t-0">
      <CardHeader className="flex flex-row items-center justify-between border-b px-4 py-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-green-500" />
          </span>
          Live
        </CardTitle>
        <Badge variant="secondary" className="px-1.5 py-0 text-[10px] font-medium">
          {events.length}
        </Badge>
      </CardHeader>
      <CardContent className="scrollbar-hide overflow-y-auto px-0 py-0" style={{ maxHeight: "calc(100vh - 3.5rem)" }}>
        <div className="flex flex-col">
          {events.map((evt) => {
            const style = TYPE_STYLES[evt.type]
            const isNew = newEventIds.current.has(evt.id)
            return (
              <div
                key={evt.id}
                className={`flex items-start gap-3 border-b border-border/40 border-l-2 ${style.border} px-4 py-3 text-sm ${
                  isNew ? "animate-[fadeIn_0.4s_ease-out]" : ""
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-foreground">{evt.label}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className={`rounded px-1 py-0 text-[10px] font-medium ${style.badge}`}>
                      {style.label}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {relativeTime(evt.timestamp, now)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
