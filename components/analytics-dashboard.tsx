"use client"

import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const earningsData = [
  { date: "Mon", earnings: 45.2, transactions: 23 },
  { date: "Tue", earnings: 52.8, transactions: 28 },
  { date: "Wed", earnings: 38.5, transactions: 19 },
  { date: "Thu", earnings: 61.3, transactions: 31 },
  { date: "Fri", earnings: 55.7, transactions: 27 },
  { date: "Sat", earnings: 72.1, transactions: 36 },
  { date: "Sun", earnings: 68.4, transactions: 34 },
]

const contentPerformance = [
  { name: "React Patterns", sales: 45, revenue: 44.55 },
  { name: "Design Course", sales: 32, revenue: 47.68 },
  { name: "Performance Guide", sales: 28, revenue: 22.12 },
  { name: "TypeScript Guide", sales: 38, revenue: 49.02 },
  { name: "Next.js Course", sales: 52, revenue: 103.48 },
]

const categoryDistribution = [
  { name: "Tutorials", value: 45, color: "var(--color-primary)" },
  { name: "Courses", value: 35, color: "var(--color-accent)" },
  { name: "Guides", value: 20, color: "var(--color-secondary)" },
]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-6 border-primary/10">
          <p className="text-sm text-muted-foreground mb-2">Avg Transaction</p>
          <p className="text-3xl font-bold text-foreground">$1.24</p>
          <p className="text-xs text-muted-foreground mt-2">+12% from last week</p>
        </Card>

        <Card className="p-6 border-primary/10">
          <p className="text-sm text-muted-foreground mb-2">Conversion Rate</p>
          <p className="text-3xl font-bold text-foreground">3.2%</p>
          <p className="text-xs text-muted-foreground mt-2">+0.5% from last week</p>
        </Card>

        <Card className="p-6 border-primary/10">
          <p className="text-sm text-muted-foreground mb-2">Avg Rating</p>
          <p className="text-3xl font-bold text-foreground">4.7</p>
          <p className="text-xs text-muted-foreground mt-2">Based on 1,234 reviews</p>
        </Card>

        <Card className="p-6 border-primary/10">
          <p className="text-sm text-muted-foreground mb-2">Network Fee Saved</p>
          <p className="text-3xl font-bold text-primary">$847.50</p>
          <p className="text-xs text-muted-foreground mt-2">vs traditional payments</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Earnings Trend */}
        <Card className="p-6 border-primary/10">
          <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Earnings</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsData}>
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
              <Legend />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="var(--color-primary)"
                strokeWidth={2}
                name="Earnings ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Transaction Volume */}
        <Card className="p-6 border-primary/10">
          <h3 className="text-lg font-semibold text-foreground mb-4">Transaction Volume</h3>
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
              <Bar dataKey="transactions" fill="var(--color-accent)" name="Transactions" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Content Performance */}
      <Card className="p-6 border-primary/10">
        <h3 className="text-lg font-semibold text-foreground mb-4">Top Performing Content</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Content</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Sales</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Revenue</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Avg Price</th>
              </tr>
            </thead>
            <tbody>
              {contentPerformance.map((item, idx) => (
                <tr key={idx} className="border-b border-border/50 hover:bg-muted/30 transition">
                  <td className="px-4 py-3 text-sm text-foreground">{item.name}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{item.sales}</td>
                  <td className="px-4 py-3 text-sm font-medium text-primary">${item.revenue.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">${(item.revenue / item.sales).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Category Distribution */}
      <Card className="p-6 border-primary/10">
        <h3 className="text-lg font-semibold text-foreground mb-4">Content Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
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
  )
}
