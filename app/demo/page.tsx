"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { WalletConnect } from "@/components/wallet-connect"
import { useFreighter } from "@/hooks/useFreighter"
import { useStellarAccount } from "@/hooks/useStellarAccount"
import Link from "next/link"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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
import {
  Zap,
  TrendingUp,
  DollarSign,
  FileText,
  Eye,
  Heart,
  Download,
  Settings,
  LogOut,
  Menu,
  X,
  ArrowDownLeft,
  Wallet,
  Send,
  Plus,
  Search,
  MoreVertical,
} from "lucide-react"

const earningsData = [
  { month: "Jan", earnings: 245, transactions: 1200 },
  { month: "Feb", earnings: 389, transactions: 1800 },
  { month: "Mar", earnings: 567, transactions: 2400 },
  { month: "Apr", earnings: 892, transactions: 3200 },
  { month: "May", earnings: 1245, transactions: 4100 },
  { month: "Jun", earnings: 1890, transactions: 5200 },
]

const contentData = [
  { name: "Articles", value: 45, color: "#06b6d4" },
  { name: "Tutorials", value: 28, color: "#0ea5e9" },
  { name: "Guides", value: 18, color: "#3b82f6" },
  { name: "Other", value: 9, color: "#1e40af" },
]

const recentTransactions = [
  {
    id: 1,
    type: "sale",
    title: "Advanced React Patterns",
    amount: 0.99,
    buyer: "John Doe",
    time: "2 hours ago",
    status: "completed",
  },
  {
    id: 2,
    type: "sale",
    title: "CSS Grid Mastery",
    amount: 0.49,
    buyer: "Jane Smith",
    time: "4 hours ago",
    status: "completed",
  },
  {
    id: 3,
    type: "sale",
    title: "TypeScript Deep Dive",
    amount: 1.99,
    buyer: "Mike Johnson",
    time: "6 hours ago",
    status: "completed",
  },
  {
    id: 4,
    type: "sale",
    title: "Next.js 15 Guide",
    amount: 0.79,
    buyer: "Sarah Williams",
    time: "8 hours ago",
    status: "completed",
  },
  {
    id: 5,
    type: "sale",
    title: "Web Performance Tips",
    amount: 0.29,
    buyer: "Tom Brown",
    time: "10 hours ago",
    status: "completed",
  },
]

const contentItems = [
  {
    id: 1,
    title: "Advanced React Patterns",
    price: 0.99,
    views: 2341,
    sales: 156,
    rating: 4.8,
    status: "published",
  },
  {
    id: 2,
    title: "CSS Grid Mastery",
    price: 0.49,
    views: 1892,
    sales: 98,
    rating: 4.6,
    status: "published",
  },
  {
    id: 3,
    title: "TypeScript Deep Dive",
    price: 1.99,
    views: 3421,
    sales: 234,
    rating: 4.9,
    status: "published",
  },
  {
    id: 4,
    title: "Next.js 15 Guide",
    price: 0.79,
    views: 1567,
    sales: 87,
    rating: 4.7,
    status: "draft",
  },
]

export default function DemoPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [sendAmount, setSendAmount] = useState("")
  const [recipientKey, setRecipientKey] = useState("")
  const { isConnected, publicKey, sendPayment, isLoading } = useFreighter()
  const { balance } = useStellarAccount(publicKey)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-slate-950" />
              </div>
              <span className="font-bold text-lg hidden sm:inline">StellarPay</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700/50">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search content..."
                className="bg-transparent text-sm text-white placeholder-slate-400 outline-none w-48"
              />
            </div>
            <div className="flex items-center gap-2 text-sm">
              {isConnected ? (
                <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400">Connected</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-slate-700/50 px-3 py-1 rounded-full">
                  <Wallet className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-400">Not Connected</span>
                </div>
              )}
            </div>
            <button className="p-2 hover:bg-slate-800 rounded-lg transition">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static left-0 top-16 lg:top-0 w-64 h-[calc(100vh-4rem)] lg:h-screen bg-slate-900/50 border-r border-slate-800/50 transition-transform duration-300 z-30 overflow-y-auto`}
        >
          <nav className="p-6 space-y-2">
            {[
              { id: "overview", label: "Overview", icon: BarChart },
              { id: "content", label: "My Content", icon: FileText },
              { id: "earnings", label: "Earnings", icon: TrendingUp },
              { id: "transactions", label: "Transactions", icon: DollarSign },
              { id: "wallet", label: "Wallet", icon: Wallet },
            ].map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === item.id
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                      : "text-slate-400 hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-800/50 bg-slate-900/50">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 transition">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Disconnect Wallet</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Welcome back, Creator!</h1>
                  <p className="text-slate-400">Here's your performance overview</p>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      label: "Total Earnings",
                      value: "$4,228.45",
                      change: "+12.5%",
                      icon: DollarSign,
                      color: "from-cyan-500/10 to-cyan-500/5",
                    },
                    {
                      label: "Total Sales",
                      value: "1,847",
                      change: "+8.2%",
                      icon: TrendingUp,
                      color: "from-blue-500/10 to-blue-500/5",
                    },
                    {
                      label: "Total Views",
                      value: "24,582",
                      change: "+15.3%",
                      icon: Eye,
                      color: "from-purple-500/10 to-purple-500/5",
                    },
                    {
                      label: "Avg Rating",
                      value: "4.75/5",
                      change: "+0.2",
                      icon: Heart,
                      color: "from-pink-500/10 to-pink-500/5",
                    },
                  ].map((stat, idx) => {
                    const Icon = stat.icon
                    return (
                      <Card key={idx} className={`p-6 border-slate-700/50 bg-gradient-to-br ${stat.color}`}>
                        <div className="flex items-start justify-between mb-4">
                          <Icon className="w-8 h-8 text-cyan-400" />
                          <span className="text-xs font-semibold text-green-400">{stat.change}</span>
                        </div>
                        <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-white">{stat.value}</p>
                      </Card>
                    )
                  })}
                </div>

                {/* Charts */}
                <div className="grid lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2 p-6 border-slate-700/50 bg-slate-800/30">
                    <h3 className="text-lg font-semibold text-white mb-6">Earnings Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={earningsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1e293b",
                            border: "1px solid #475569",
                            borderRadius: "8px",
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="earnings"
                          stroke="#06b6d4"
                          strokeWidth={2}
                          dot={{ fill: "#06b6d4" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card>

                  <Card className="p-6 border-slate-700/50 bg-slate-800/30">
                    <h3 className="text-lg font-semibold text-white mb-6">Content Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={contentData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {contentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1e293b",
                            border: "1px solid #475569",
                            borderRadius: "8px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                </div>

                {/* Recent Transactions */}
                <Card className="p-6 border-slate-700/50 bg-slate-800/30">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
                    <Link href="#" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                      View All
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {recentTransactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between p-4 bg-slate-700/20 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                            <ArrowDownLeft className="w-5 h-5 text-cyan-400" />
                          </div>
                          <div>
                            <p className="font-medium text-white">{tx.title}</p>
                            <p className="text-sm text-slate-400">{tx.buyer}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-cyan-400">+${tx.amount.toFixed(2)}</p>
                          <p className="text-xs text-slate-400">{tx.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* Content Tab */}
            {activeTab === "content" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-4xl font-bold mb-2">My Content</h1>
                    <p className="text-slate-400">Manage and monetize your digital content</p>
                  </div>
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-semibold gap-2">
                    <Plus className="w-4 h-4" />
                    Upload Content
                  </Button>
                </div>

                <div className="space-y-4">
                  {contentItems.map((item) => (
                    <Card
                      key={item.id}
                      className="p-6 border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                item.status === "published"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-6 text-sm text-slate-400">
                            <span>Price: ${item.price.toFixed(2)}</span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" /> {item.views.toLocaleString()} views
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" /> {item.sales} sales
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="w-4 h-4" /> {item.rating} rating
                            </span>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-slate-700 rounded-lg transition">
                          <MoreVertical className="w-5 h-5 text-slate-400" />
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Earnings Tab */}
            {activeTab === "earnings" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Earnings</h1>
                  <p className="text-slate-400">Track your income and performance metrics</p>
                </div>

                <Card className="p-6 border-slate-700/50 bg-slate-800/30">
                  <h3 className="text-lg font-semibold text-white mb-6">Monthly Earnings</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={earningsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "1px solid #475569",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="earnings" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="transactions" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === "transactions" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Transactions</h1>
                  <p className="text-slate-400">View all your Stellar blockchain transactions</p>
                </div>

                <Card className="p-6 border-slate-700/50 bg-slate-800/30">
                  <div className="space-y-4">
                    {recentTransactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between p-4 bg-slate-700/20 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                            <ArrowDownLeft className="w-5 h-5 text-cyan-400" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-white">{tx.title}</p>
                            <p className="text-sm text-slate-400">{tx.buyer}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-cyan-400">+${tx.amount.toFixed(2)}</p>
                          <p className="text-xs text-slate-400">{tx.time}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-4">
                          View on Stellar
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* Wallet Tab */}
            {activeTab === "wallet" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Wallet</h1>
                  <p className="text-slate-400">Manage your Stellar wallet and funds</p>
                </div>

                <WalletConnect />

                {isConnected && (
                  <>
                    <Card className="p-6 border-slate-700/50 bg-slate-800/30">
                      <h3 className="text-lg font-semibold text-white mb-4">Send XLM</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-slate-400 mb-2">Recipient Address</label>
                          <input
                            type="text"
                            placeholder="G..."
                            value={recipientKey}
                            onChange={(e) => setRecipientKey(e.target.value)}
                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white font-mono text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-2">Amount (XLM)</label>
                          <input
                            type="number"
                            step="0.0000001"
                            placeholder="0.00"
                            value={sendAmount}
                            onChange={(e) => setSendAmount(e.target.value)}
                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
                          />
                        </div>
                        <Button 
                          onClick={async () => {
                            try {
                              await sendPayment(recipientKey, sendAmount, "StellarPay Demo Transaction")
                              setSendAmount("")
                              setRecipientKey("")
                              alert("Transaction sent successfully!")
                            } catch (error: any) {
                              alert(`Transaction failed: ${error.message}`)
                            }
                          }}
                          disabled={!recipientKey || !sendAmount || isLoading}
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-semibold h-12 gap-2"
                        >
                          {isLoading ? (
                            <>Loading...</>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              Send XLM
                            </>
                          )}
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-6 border-slate-700/50 bg-slate-800/30">
                      <h3 className="text-lg font-semibold text-white mb-4">Quick Send to Creator</h3>
                      <div className="space-y-4">
                        <p className="text-slate-400 text-sm">Send a tip to the StellarPay creator</p>
                        <div className="grid grid-cols-4 gap-2">
                          {["0.1", "0.5", "1.0", "5.0"].map((amount) => (
                            <Button
                              key={amount}
                              onClick={async () => {
                                try {
                                  await sendPayment(
                                    "GANG3GZKNCPZ5GX2HUQJTMUWJORQJ5XJMLLHFNNUW3GX4IHOGIF4IOXA",
                                    amount,
                                    `StellarPay Tip: ${amount} XLM`
                                  )
                                  alert(`Sent ${amount} XLM tip successfully!`)
                                } catch (error: any) {
                                  alert(`Tip failed: ${error.message}`)
                                }
                              }}
                              disabled={isLoading}
                              variant="outline"
                              className="border-slate-600 text-slate-300 hover:bg-slate-700"
                            >
                              {amount} XLM
                            </Button>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </>
                )}

                {isConnected && (
                  <Card className="p-6 border-slate-700/50 bg-slate-800/30">
                    <h3 className="text-lg font-semibold text-white mb-4">Wallet Info</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-slate-400 text-sm mb-2">Connected Wallet</p>
                        <p className="font-mono text-white text-sm break-all bg-slate-700/50 p-3 rounded">
                          {publicKey}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm mb-2">Balance</p>
                        <p className="text-2xl font-bold text-cyan-400">
                          {balance ? `${balance.xlmBalance.toFixed(7)} XLM` : 'Loading...'}
                        </p>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
