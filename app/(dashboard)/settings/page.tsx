"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Globe, Bell, Download, Key, AlertTriangle, Palette } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your workspace preferences</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <Globe size={16} className="text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Workspace</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Workspace name</Label>
              <Input id="name" defaultValue="SaaS Analytics" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input id="timezone" defaultValue="UTC (Coordinated Universal Time)" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <Palette size={16} className="text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Display</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Compact mode</p>
                <p className="text-xs text-muted-foreground">Reduce spacing between cards</p>
              </div>
              <Switch size="sm" />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="date-format">Date format</Label>
              <Input id="date-format" defaultValue="MMM DD, YYYY" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <Bell size={16} className="text-muted-foreground" />
          <CardTitle className="text-sm font-medium">Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Email reports</p>
              <p className="text-xs text-muted-foreground">Receive weekly analytics digests</p>
            </div>
            <Switch defaultChecked size="sm" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Alert on churn</p>
              <p className="text-xs text-muted-foreground">Notify when churn rate exceeds 5%</p>
            </div>
            <Switch defaultChecked size="sm" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Monthly summary</p>
              <p className="text-xs text-muted-foreground">Get a full report at the end of each month</p>
            </div>
            <Switch size="sm" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <Key size={16} className="text-muted-foreground" />
            <CardTitle className="text-sm font-medium">API Keys</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-md border px-3 py-2 text-sm font-mono text-muted-foreground">
              sk_live_••••••••••••••••••••••••••
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" size="sm">Regenerate</Button>
              <Button variant="outline" size="sm">Copy</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <Download size={16} className="text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Data Export</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Export your analytics data for external analysis.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" size="sm">Export CSV</Button>
              <Button variant="outline" size="sm">Export JSON</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-red-500/20">
        <CardHeader className="flex flex-row items-center gap-3">
          <AlertTriangle size={16} className="text-red-500" />
          <CardTitle className="text-sm font-medium text-red-500">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Irreversible actions that will affect your entire workspace.
          </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" size="sm" className="border-red-500/30 text-red-500 hover:bg-red-500/10">
                Delete workspace
              </Button>
              <Button variant="outline" size="sm" className="border-red-500/30 text-red-500 hover:bg-red-500/10">
                Revoke all keys
              </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
