"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  BarChart3,
  Wallet,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  RefreshCw,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { useDashboard } from "@/lib/dashboard-context"

const navItems = [
  { label: "Overview", href: "/", icon: LayoutDashboard },
  { label: "Acquisition", href: "/acquisition", icon: BarChart3 },
  { label: "Revenue", href: "/revenue", icon: Wallet },
  { label: "Retention", href: "/retention", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
]

export default function Sidebar() {
  const { sidebarCollapsed, setSidebarCollapsed } = useDashboard()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-30 flex h-full flex-col border-r bg-sidebar transition-[width] duration-300 will-change-[width]",
        sidebarCollapsed ? "w-16" : "w-60"
      )}
    >
      <div className="flex h-14 items-center border-b">
        {sidebarCollapsed ? (
          <div className="flex w-full items-center justify-center">
            <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60 text-sm font-bold text-primary-foreground shadow-sm">
              S
            </div>
          </div>
        ) : (
          <div className="flex w-full items-center gap-3 px-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60 text-sm font-bold text-primary-foreground shadow-sm">
              S
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">SaaS</span>
              <span className="text-[10px] text-sidebar-foreground/40">Analytics</span>
            </div>
          </div>
        )}
      </div>

      {!sidebarCollapsed && (
        <div className="px-4 pt-4 pb-1">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/30">
            Main Menu
          </span>
        </div>
      )}

      <nav className="flex flex-1 flex-col gap-0.5 px-2 py-2 overflow-hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const navContent = (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "group relative flex items-center rounded-lg text-sm font-medium transition-all",
                sidebarCollapsed ? "justify-center px-0 py-3" : "gap-3 px-3 py-2.5",
                isActive
                  ? "text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/60 hover:text-sidebar-foreground"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-sidebar-accent-foreground" />
              )}
              <span
                className={cn(
                  "flex size-5 items-center justify-center",
                  isActive && sidebarCollapsed && "rounded-md bg-sidebar-accent p-3"
                )}
              >
                <item.icon size={18} />
              </span>
              <span
                className={cn(
                  "whitespace-nowrap transition-opacity duration-200",
                  sidebarCollapsed ? "w-0 opacity-0 overflow-hidden" : "opacity-100"
                )}
              >
                {item.label}
              </span>
            </Link>
          )

          if (sidebarCollapsed) {
            return (
              <Tooltip key={item.label}>
                <TooltipTrigger>
                  <span
                    className={cn(
                      "group relative flex cursor-pointer items-center justify-center rounded-lg py-3 text-sm font-medium transition-all",
                      isActive
                        ? "text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/60 hover:text-sidebar-foreground"
                    )}
                    onClick={() => router.push(item.href)}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-sidebar-accent-foreground" />
                    )}
                    <span className="flex size-5 items-center justify-center">
                      <item.icon size={18} />
                    </span>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  {item.label}
                </TooltipContent>
              </Tooltip>
            )
          }

          return navContent
        })}
      </nav>

      <div className={cn("px-2 pb-2", sidebarCollapsed && "px-0 flex justify-center")}>
        <Tooltip>
          <TooltipTrigger>
            <span
              className={cn(
                "flex cursor-pointer items-center rounded-lg text-sidebar-foreground/30 transition-colors hover:text-sidebar-foreground",
                sidebarCollapsed ? "justify-center py-3" : "gap-2 px-3 py-2"
              )}
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={14} />}
            </span>
          </TooltipTrigger>
          <TooltipContent side="right">
            {sidebarCollapsed ? "Expand" : "Collapse"}
          </TooltipContent>
        </Tooltip>
      </div>

      <Separator />

      <div className={cn("overflow-hidden", sidebarCollapsed ? "p-2" : "p-3")}>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span
              className={cn(
                "flex w-full cursor-pointer items-center gap-3 rounded-lg text-sm transition-colors hover:bg-sidebar-accent/50",
                sidebarCollapsed
                  ? "justify-center px-0 py-3"
                  : "px-3 py-2.5 text-sidebar-foreground/70 hover:text-sidebar-foreground"
              )}
            >
              <span className="relative flex shrink-0">
                <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-sidebar-primary to-sidebar-primary/60 text-xs font-semibold text-sidebar-primary-foreground shadow-sm">
                  JD
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-sidebar bg-green-500" />
              </span>
              <span
                className={cn(
                  "flex flex-col items-start whitespace-nowrap transition-opacity duration-200",
                  sidebarCollapsed ? "w-0 opacity-0 overflow-hidden" : "opacity-100"
                )}
              >
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-sidebar-foreground/40">Workspace</span>
              </span>
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={sidebarCollapsed ? "end" : "start"} className="w-56" sideOffset={8}>
            <DropdownMenuItem className="gap-2">
              <User size={14} />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <RefreshCw size={14} />
              Switch workspace
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-red-500 focus:text-red-500">
              <LogOut size={14} />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}
