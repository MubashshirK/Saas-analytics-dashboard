"use client"

import { useState, useMemo } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { pagesData, type PageRow } from "@/lib/data"

type SortKey = keyof PageRow

export default function PagesTable() {
  const [sortKey, setSortKey] = useState<SortKey>("views")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")

  const sorted = useMemo(() => {
    const copy = [...pagesData]
    copy.sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }
      return sortDir === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number)
    })
    return copy
  }, [sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("desc")
    }
  }

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return null
    return sortDir === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />
  }

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Top Pages
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-b-0">
              <TableHead onClick={() => toggleSort("page")} className="h-10 cursor-pointer text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  Page <SortIcon column="page" />
                </span>
              </TableHead>
              <TableHead onClick={() => toggleSort("views")} className="h-10 cursor-pointer text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span className="inline-flex items-center gap-1 justify-end">
                  Views <SortIcon column="views" />
                </span>
              </TableHead>
              <TableHead onClick={() => toggleSort("uniqueVisitors")} className="hidden h-10 cursor-pointer text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">
                <span className="inline-flex items-center gap-1 justify-end">
                  Unique <SortIcon column="uniqueVisitors" />
                </span>
              </TableHead>
              <TableHead onClick={() => toggleSort("bounceRate")} className="hidden h-10 cursor-pointer text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">
                <span className="inline-flex items-center gap-1 justify-end">
                  Bounce <SortIcon column="bounceRate" />
                </span>
              </TableHead>
              <TableHead onClick={() => toggleSort("avgTime")} className="hidden h-10 cursor-pointer text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:table-cell">
                <span className="inline-flex items-center gap-1 justify-end">
                  Avg. Time <SortIcon column="avgTime" />
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((row, idx) => (
              <TableRow
                key={row.page}
                className="border-b border-border/40 transition-colors hover:bg-muted/30"
              >
                <TableCell className="py-3 font-mono text-xs font-medium text-foreground">
                  {row.page}
                </TableCell>
                <TableCell className="py-3 text-right text-sm tabular-nums">
                  {row.views.toLocaleString()}
                </TableCell>
                <TableCell className="hidden py-3 text-right text-sm tabular-nums md:table-cell">
                  {row.uniqueVisitors.toLocaleString()}
                </TableCell>
                <TableCell className="hidden py-3 text-right text-sm tabular-nums md:table-cell">
                  {row.bounceRate}%
                </TableCell>
                <TableCell className="hidden py-3 text-right text-sm tabular-nums lg:table-cell">
                  {row.avgTime}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
