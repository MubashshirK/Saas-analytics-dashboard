# SaaS Analytics Dashboard

A production-quality, dark-mode-first SaaS analytics dashboard built with Next.js 16 and React 19. Features real-time animated metrics, interactive charts, a live events feed, responsive sidebar navigation, and full dark/light theme support — all powered by mock data with zero external API dependencies.

---

## Overview

This dashboard provides a complete analytics monitoring interface designed for SaaS businesses. It includes five main views (Overview, Acquisition, Revenue, Retention, Settings) accessible via a collapsible sidebar, with a live events feed pinned to the right side of the screen.

### Key Characteristics

| Aspect | Details |
|--------|---------|
| **Framework** | Next.js 16 with App Router and Turbopack |
| **UI Library** | shadcn/ui (base-nova style) with Tailwind CSS v4 |
| **Charts** | Recharts — Line, Bar, Area charts with custom tooltips |
| **Animation** | Custom `useCountUp` and `useAnimatedValue` hooks using requestAnimationFrame |
| **State** | React Context for shared dashboard state (date range, sidebar) |
| **Persistence** | localStorage for theme, sidebar collapse, and date range preference |
| **Font** | Inter via `next/font` |
| **Icons** | Lucide React |
| **Theming** | Custom ThemeProvider — localStorage-backed, class-based, no inline scripts |

---

## Architecture

### Project Structure

```
app/
├── layout.tsx                    # Root layout — Inter font, ThemeProvider, TooltipProvider
├── globals.css                    # Tailwind v4 + shadcn CSS variables, keyframes, body transitions
└── (dashboard)/
    ├── layout.tsx                 # Dashboard shell — Sidebar, TopBar, EventsFeed, DashboardContext
    ├── page.tsx                   # Overview — KPICards, RevenueChart, AcquisitionChart, PagesTable, ActivityHeatmap
    ├── acquisition/page.tsx       # Acquisition-focused view
    ├── revenue/page.tsx           # Revenue-focused view
    ├── retention/page.tsx         # Retention-focused view
    └── settings/page.tsx          # Workspace preferences, notifications, API keys, data export
components/
├── ui/                            # shadcn auto-generated (button, card, badge, table, tabs, etc.)
├── theme-provider.tsx             # Custom dark/light provider replacing next-themes
└── dashboard/
    ├── Sidebar.tsx                # Fixed sidebar — nav links, collapse toggle, workspace switcher
    ├── TopBar.tsx                 # Page title, date range tabs, export button, theme switch
    ├── KPICards.tsx               # 4 animated KPI cards with count-up + delta badges
    ├── RevenueChart.tsx           # Line chart — MRR (with area fill) + New Revenue (dashed)
    ├── AcquisitionChart.tsx       # Channel cards — progress bars, icons, trend indicators
    ├── PagesTable.tsx             # Sortable table with responsive column hiding
    ├── ActivityHeatmap.tsx        # 7×24 grid — opacity-based cell coloring, tooltip on hover
    └── EventsFeed.tsx             # Live feed — auto-appending events, type badges, relative timestamps
lib/
├── utils.ts                       # cn() helper, useCountUp hook, useAnimatedValue hook
├── data.ts                        # All typed mock data with DateRange variants
└── dashboard-context.tsx          # DashboardContext — dateRange, sidebarCollapsed state
```

### Data Flow

All dashboard components receive a `dateRange` prop (`"7d"` | `"30d"` | `"90d"`) from `DashboardContext`. The shared state is managed in the route group layout and wired via React Context. Each component selects the appropriate data slice from `lib/data.ts` using `useMemo`.

The `dateRange` and `sidebarCollapsed` preferences are persisted to `localStorage` and restored on page load.

---

## Features

### Charts & Visualization

- **RevenueChart** — Recharts `LineChart` with dual series (MRR + New Revenue), gradient `Area` fill, and a custom tooltip showing both values on hover.
- **AcquisitionChart** — Pure CSS progress bars per traffic source, with channel-specific icons and color coding. Both the bar width and percentage number animate on mount and when the date range changes.
- **ActivityHeatmap** — 7-day × 24-hour grid using `opacity` heat levels based on user activity volume, with a tooltip on hover.
- **PagesTable** — shadcn `Table` with sortable columns and responsive column hiding on smaller viewports.

### Animation System

The dashboard uses two custom hooks for animated counting:

| Hook | Purpose |
|------|---------|
| `useCountUp(target, duration, trigger)` | Animates from 0 to target on mount. Used by KPICards, RevenueChart summary stats, and session duration. |
| `useAnimatedValue(target, duration)` | Animates from the previous value to the new value. Used by AcquisitionChart channel percentages and growth deltas. |

Both hooks use `requestAnimationFrame` with a cubic ease-out (`1 - (1 - t)³`) for smooth deceleration. Card entry is staggered via timed opacity + translateY transitions.

### Sidebar

- **Collapsible** — Toggles between `w-60` (expanded, showing labels) and `w-16` (collapsed, icons + tooltips).
- **Persistence** — Sidebar state is saved to `localStorage` and restored on refresh.
- **Active indicator** — Left accent bar on the currently active route.
- **Collapsed tooltips** — shadcn `Tooltip` shows the nav label on hover when collapsed.
- **Workspace switcher** — DropdownMenu at the bottom with user avatar, online status indicator, and menu actions.

### Live Events Feed

- **Auto-appending** — A new event is appended every 4 seconds (up to 20 max).
- **Type badges** — Each event shows a colored pill (Signup/Upgrade/Failed).
- **Relative timestamps** — Updated every second (e.g., "3s ago", "2m ago").
- **Entry animation** — New events fade in via `@keyframes fadeIn`.
- **Scrollbar hidden** — The feed scrolls but the scrollbar is invisible via the `scrollbar-hide` utility.

### Dark / Light Mode

- **Custom ThemeProvider** — Replaces `next-themes` to avoid React 19's `<script>` tag restrictions.
- **localStorage-backed** — Theme preference persists across sessions.
- **CSS transitions** — `background-color`, `border-color`, and `color` animate smoothly on toggle via a global rule on `body *`.

---

## Routes

| Path | View | Components |
|------|------|------------|
| `/` | Overview | KPICards, RevenueChart, AcquisitionChart, PagesTable, ActivityHeatmap |
| `/acquisition` | Acquisition | AcquisitionChart (full-width), PagesTable |
| `/revenue` | Revenue | KPICards (revenue-focused), RevenueChart (full-width) |
| `/retention` | Retention | KPICards (retention-focused), ActivityHeatmap (full-width) |
| `/settings` | Settings | Workspace, display, notification, API key, export, and danger zone cards |

---

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
npm start
```

The development server runs on [http://localhost:3000](http://localhost:3000) by default.



## Customization

### Connecting Real Data

Replace the mock data in `lib/data.ts` with API calls. Each data type exports a typed interface:

```typescript
import { DateRange, KPISet, DataPoint, AcquisitionItem, PageRow, FeedEvent } from "@/lib/data"
```

Simply swap the `kpiData`, `revenueData`, `acquisitionData`, `pagesData`, `heatmapData`, and `initialEvents` exports with asynchronous fetches or database queries.

### Theming

Color tokens are defined as CSS custom properties in `app/globals.css` under `:root` (light) and `.dark` (dark) selectors. The shadcn/ui base-nova palette uses oklch color space for consistent perceived brightness.

---

## License

MIT
