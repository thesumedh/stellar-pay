"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Upload, Eye, DollarSign, TrendingUp, Settings, LogOut } from "lucide-react"

const dashboardData = [
  { date: "Mon", earnings: 45, views: 120 },
  { date: "Tue", earnings: 52, views: 150 },
  { date: "Wed", earnings: 38, views: 100 },
  { date: "Thu", earnings: 61, views: 180 },
  { date: "Fri", earnings: 55, views: 160 },
  { date: "Sat", earnings: 72, views: 200 },
  { date: "Sun", earnings: 68, views: 190 },
]

const recentContent = [
  { id: 1, title: "Web Design Tips", views: 1240, earnings: 12.4, status: "active" },
  { id: 2, title: "React Hooks Guide", views: 892, earnings: 8.92, status: "active" },
  { id: 3, title: "CSS Grid Tutorial", views: 654, earnings: 6.54, status: "active" },
  { id: 4, title: "JavaScript Basics", views: 432, earnings: 4.32, status: "draft" },
]

export function CreatorDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Creator Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 border-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
                <p className="text-3xl font-bold text-foreground">$2,847.50</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">This Month</p>
                <p className="text-3xl font-bold text-foreground">$847.20</p>
              </div>
              <TrendingUp className="w-8 h-8 text-accent opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Views</p>
                <p className="text-3xl font-bold text-foreground">4,218</p>
              </div>
              <Eye className="w-8 h-8 text-secondary opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Content</p>
                <p className="text-3xl font-bold text-foreground">12</p>
              </div>
              <Upload className="w-8 h-8 text-primary opacity-20" />
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 border-primary/10">
            <h2 className="text-lg font-semibold text-foreground mb-4">Earnings Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="earnings" stroke="var(--color-primary)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 border-primary/10">
            <h2 className="text-lg font-semibold text-foreground mb-4">Views by Day</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="views" fill="var(--color-accent)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Content Management */}
        <Card className="border-primary/10">
          <div className="p-6 border-b border-border/50 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Your Content</h2>
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <Upload className="w-4 h-4" />
              Upload New
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Views</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Earnings</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentContent.map((item) => (
                  <tr key={item.id} className="border-b border-border/50 hover:bg-muted/50 transition">
                    <td className="px-6 py-4 text-sm text-foreground">{item.title}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{item.views.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm font-medium text-primary">${item.earnings.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  )
}
