"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, DollarSign, Eye, FileText, ArrowUpRight } from "lucide-react"
import Link from "next/link"

const earningsData = [
  { date: "Mon", earnings: 45 },
  { date: "Tue", earnings: 52 },
  { date: "Wed", earnings: 48 },
  { date: "Thu", earnings: 61 },
  { date: "Fri", earnings: 55 },
  { date: "Sat", earnings: 67 },
  { date: "Sun", earnings: 72 },
]

const viewsData = [
  { date: "Mon", views: 240 },
  { date: "Tue", views: 320 },
  { date: "Wed", views: 280 },
  { date: "Thu", views: 390 },
  { date: "Fri", views: 350 },
  { date: "Sat", views: 420 },
  { date: "Sun", views: 480 },
]

const categoryData = [
  { name: "Tutorials", value: 35 },
  { name: "Courses", value: 25 },
  { name: "Templates", value: 20 },
  { name: "Other", value: 20 },
]

const COLORS = ["#0066ff", "#00d4ff", "#00ff88", "#ffaa00"]

export function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: "Total Earnings", value: "$2,450.50", icon: DollarSign, trend: "+12.5%" },
          { label: "Total Views", value: "12,450", icon: Eye, trend: "+8.2%" },
          { label: "Content Items", value: "24", icon: FileText, trend: "+2" },
          { label: "This Month", value: "$890.25", icon: TrendingUp, trend: "+23.1%" },
        ].map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className="p-6 border-primary/10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-xs text-primary mt-3 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                {stat.trend}
              </p>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Earnings Chart */}
        <Card className="p-6 border-primary/10">
          <h3 className="font-semibold text-foreground mb-4">Earnings This Week</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={earningsData}>
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
              <Bar dataKey="earnings" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Views Chart */}
        <Card className="p-6 border-primary/10">
          <h3 className="font-semibold text-foreground mb-4">Views This Week</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={viewsData}>
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
              <Line
                type="monotone"
                dataKey="views"
                stroke="var(--color-accent)"
                strokeWidth={2}
                dot={{ fill: "var(--color-accent)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Content by Category */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 border-primary/10 md:col-span-2">
          <h3 className="font-semibold text-foreground mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {[
              { id: "TXN001", amount: "$12.50", content: "React Tutorial", date: "2 hours ago", status: "Completed" },
              { id: "TXN002", amount: "$8.75", content: "Design Course", date: "5 hours ago", status: "Completed" },
              { id: "TXN003", amount: "$15.00", content: "Performance Guide", date: "1 day ago", status: "Completed" },
            ].map((txn) => (
              <div key={txn.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">{txn.content}</p>
                  <p className="text-xs text-muted-foreground">{txn.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-primary">{txn.amount}</p>
                  <p className="text-xs text-primary">{txn.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-primary/10">
          <h3 className="font-semibold text-foreground mb-4">Content by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 border-primary/10">
        <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/upload">
            <Button className="bg-primary hover:bg-primary/90">Upload New Content</Button>
          </Link>
          <Link href="/dashboard/earnings">
            <Button variant="outline" className="bg-transparent">
              View Earnings
            </Button>
          </Link>
          <Link href="/dashboard/wallet">
            <Button variant="outline" className="bg-transparent">
              Manage Wallet
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
