export type DateRange = "7d" | "30d" | "90d"

export type KPISet = {
  mrr: number
  activeUsers: number
  churnRate: number
  avgSession: string
}

export type KPIWithDelta = KPISet & {
  mrrDelta: number
  activeUsersDelta: number
  churnRateDelta: number
  avgSessionDelta: number
}

export type DataPoint = {
  date: string
  mrr: number
  newRevenue: number
}

export type AcquisitionItem = {
  source: string
  value: number
  color: string
}

export type PageRow = {
  page: string
  views: number
  uniqueVisitors: number
  bounceRate: number
  avgTime: string
}

export type FeedEvent = {
  id: number
  type: "signup" | "upgrade" | "payment_failed"
  label: string
  timestamp: number
}

export const kpiData: Record<DateRange, KPIWithDelta> = {
  "7d": {
    mrr: 48290,
    activeUsers: 3842,
    churnRate: 2.3,
    avgSession: "4m 32s",
    mrrDelta: 12.5,
    activeUsersDelta: 8.3,
    churnRateDelta: -0.4,
    avgSessionDelta: 3.1,
  },
  "30d": {
    mrr: 45210,
    activeUsers: 3610,
    churnRate: 2.7,
    avgSession: "4m 12s",
    mrrDelta: 10.2,
    activeUsersDelta: 6.7,
    churnRateDelta: -0.2,
    avgSessionDelta: 2.4,
  },
  "90d": {
    mrr: 41800,
    activeUsers: 3280,
    churnRate: 3.1,
    avgSession: "3m 54s",
    mrrDelta: 8.9,
    activeUsersDelta: 5.1,
    churnRateDelta: 0.1,
    avgSessionDelta: 1.8,
  },
}

export const revenueData: Record<DateRange, DataPoint[]> = {
  "7d": [
    { date: "May 28", mrr: 47000, newRevenue: 5200 },
    { date: "May 29", mrr: 47400, newRevenue: 4800 },
    { date: "May 30", mrr: 47200, newRevenue: 5100 },
    { date: "May 31", mrr: 47800, newRevenue: 5600 },
    { date: "Jun 1", mrr: 48200, newRevenue: 5300 },
    { date: "Jun 2", mrr: 48400, newRevenue: 5900 },
    { date: "Jun 3", mrr: 48290, newRevenue: 6100 },
  ],
  "30d": [
    { date: "May 5", mrr: 43000, newRevenue: 4800 },
    { date: "May 9", mrr: 43500, newRevenue: 4600 },
    { date: "May 13", mrr: 44100, newRevenue: 5000 },
    { date: "May 17", mrr: 44800, newRevenue: 5200 },
    { date: "May 21", mrr: 45200, newRevenue: 5400 },
    { date: "May 25", mrr: 45000, newRevenue: 5100 },
    { date: "May 29", mrr: 45210, newRevenue: 5300 },
  ],
  "90d": [
    { date: "Mar 6", mrr: 38000, newRevenue: 4200 },
    { date: "Mar 20", mrr: 39100, newRevenue: 4400 },
    { date: "Apr 3", mrr: 40000, newRevenue: 4600 },
    { date: "Apr 17", mrr: 40700, newRevenue: 4500 },
    { date: "May 1", mrr: 41400, newRevenue: 4900 },
    { date: "May 15", mrr: 41600, newRevenue: 4800 },
    { date: "Jun 1", mrr: 41800, newRevenue: 5100 },
  ],
}

export const acquisitionData: AcquisitionItem[] = [
  { source: "Organic", value: 42, color: "hsl(220 70% 50%)" },
  { source: "Referral", value: 24, color: "hsl(160 60% 45%)" },
  { source: "Direct", value: 18, color: "hsl(30 80% 55%)" },
  { source: "Paid", value: 11, color: "hsl(280 60% 55%)" },
  { source: "Social", value: 5, color: "hsl(340 80% 55%)" },
]

export const pagesData: PageRow[] = [
  { page: "/dashboard", views: 12480, uniqueVisitors: 8920, bounceRate: 18.2, avgTime: "4m 12s" },
  { page: "/onboarding", views: 8340, uniqueVisitors: 6210, bounceRate: 32.5, avgTime: "2m 48s" },
  { page: "/settings/billing", views: 5620, uniqueVisitors: 4100, bounceRate: 12.8, avgTime: "3m 05s" },
  { page: "/reports", views: 4890, uniqueVisitors: 3520, bounceRate: 24.1, avgTime: "5m 33s" },
  { page: "/integrations", views: 3740, uniqueVisitors: 2810, bounceRate: 28.6, avgTime: "4m 01s" },
  { page: "/team", views: 3210, uniqueVisitors: 2450, bounceRate: 15.4, avgTime: "2m 15s" },
  { page: "/settings/profile", views: 2980, uniqueVisitors: 2340, bounceRate: 20.9, avgTime: "2m 52s" },
  { page: "/api/docs", views: 2560, uniqueVisitors: 1980, bounceRate: 22.3, avgTime: "6m 10s" },
  { page: "/changelog", views: 1890, uniqueVisitors: 1520, bounceRate: 35.7, avgTime: "1m 45s" },
  { page: "/settings/notifications", views: 1450, uniqueVisitors: 1120, bounceRate: 19.5, avgTime: "1m 58s" },
]

export const heatmapData: number[][] = [
  [45, 30, 22, 15, 10, 8, 12, 28, 65, 120, 180, 210, 195, 170, 190, 220, 250, 235, 200, 160, 110, 75, 55, 40],
  [50, 35, 25, 18, 12, 9, 15, 32, 72, 130, 190, 225, 210, 185, 200, 240, 270, 250, 215, 170, 120, 80, 60, 45],
  [48, 32, 24, 16, 11, 8, 14, 30, 68, 125, 185, 215, 200, 175, 195, 230, 260, 245, 210, 165, 115, 78, 58, 42],
  [55, 38, 28, 20, 14, 10, 18, 35, 78, 140, 200, 240, 220, 195, 215, 250, 280, 260, 225, 180, 125, 85, 62, 48],
  [42, 28, 20, 14, 9, 7, 11, 25, 60, 115, 170, 200, 185, 160, 180, 210, 240, 225, 190, 150, 105, 70, 52, 38],
  [60, 42, 30, 22, 16, 12, 20, 40, 85, 150, 210, 250, 235, 210, 230, 265, 295, 275, 240, 195, 135, 90, 65, 50],
  [38, 25, 18, 12, 8, 6, 9, 22, 55, 105, 160, 190, 175, 150, 170, 200, 225, 210, 180, 140, 95, 65, 48, 35],
]

export const initialEvents: FeedEvent[] = [
  { id: 1, type: "signup", label: "alex@company.com signed up", timestamp: Date.now() - 8000 },
  { id: 2, type: "upgrade", label: "Acme Inc. upgraded to Pro", timestamp: Date.now() - 30000 },
  { id: 3, type: "payment_failed", label: "Card declined for @johndoe", timestamp: Date.now() - 60000 },
  { id: 4, type: "signup", label: "sarah@startup.io signed up", timestamp: Date.now() - 120000 },
  { id: 5, type: "upgrade", label: "TechCorp entered Enterprise plan", timestamp: Date.now() - 180000 },
]
