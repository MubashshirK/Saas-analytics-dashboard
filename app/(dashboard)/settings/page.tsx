"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your workspace preferences</p>
      </div>

      <Card>
        <CardHeader>
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Data Export</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Export your analytics data as CSV or JSON for external analysis.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">Export CSV</Button>
            <Button variant="outline" size="sm">Export JSON</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
