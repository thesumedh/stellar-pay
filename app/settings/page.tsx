"use client"

import type React from "react"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Lock, User, Zap } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    bio: "Content creator and developer",
    website: "https://example.com",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground">Manage your account and preferences</p>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-muted/50">
                <TabsTrigger value="profile" className="gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="gap-2">
                  <Lock className="w-4 h-4" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="gap-2">
                  <Bell className="w-4 h-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="billing" className="gap-2">
                  <Zap className="w-4 h-4" />
                  <span className="hidden sm:inline">Billing</span>
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card className="p-6 border-primary/10">
                  <h2 className="text-xl font-semibold text-foreground mb-6">Profile Information</h2>

                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                      <Input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Tell us about yourself"
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Website</label>
                      <Input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://example.com"
                      />
                    </div>

                    <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
                  </form>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <Card className="p-6 border-primary/10">
                  <h2 className="text-xl font-semibold text-foreground mb-6">Security Settings</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-foreground mb-3">Change Password</h3>
                      <form className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
                          <Input type="password" placeholder="••••••••" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                          <Input type="password" placeholder="••••••••" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                          <Input type="password" placeholder="••••••••" />
                        </div>
                        <Button className="bg-primary hover:bg-primary/90">Update Password</Button>
                      </form>
                    </div>

                    <div className="border-t border-border/50 pt-6">
                      <h3 className="font-medium text-foreground mb-3">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Add an extra layer of security to your account
                      </p>
                      <Button variant="outline" className="bg-transparent">
                        Enable 2FA
                      </Button>
                    </div>

                    <div className="border-t border-border/50 pt-6">
                      <h3 className="font-medium text-foreground mb-3">Active Sessions</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-foreground">Chrome on macOS</p>
                            <p className="text-xs text-muted-foreground">Last active: 2 hours ago</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            Sign Out
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card className="p-6 border-primary/10">
                  <h2 className="text-xl font-semibold text-foreground mb-6">Notification Preferences</h2>

                  <div className="space-y-4">
                    {[
                      { label: "New Purchase", description: "Get notified when someone buys your content" },
                      { label: "Earnings", description: "Daily earnings summary" },
                      { label: "Messages", description: "Messages from other creators" },
                      { label: "Updates", description: "Product updates and announcements" },
                    ].map((notif) => (
                      <div key={notif.label} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium text-foreground">{notif.label}</p>
                          <p className="text-sm text-muted-foreground">{notif.description}</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded border-input" />
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Billing Tab */}
              <TabsContent value="billing" className="space-y-6">
                <Card className="p-6 border-primary/10">
                  <h2 className="text-xl font-semibold text-foreground mb-6">Billing Information</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-foreground mb-3">Subscription Plan</h3>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm text-foreground mb-2">Free Plan</p>
                        <p className="text-xs text-muted-foreground">Unlimited uploads • 0.1% platform fee</p>
                      </div>
                    </div>

                    <div className="border-t border-border/50 pt-6">
                      <h3 className="font-medium text-foreground mb-3">Payout Method</h3>
                      <div className="p-4 bg-muted/30 rounded-lg mb-4">
                        <p className="text-sm text-foreground mb-1">Stellar Wallet</p>
                        <p className="text-xs text-muted-foreground font-mono">GBRPYHIL2CI3...XVXVXV</p>
                      </div>
                      <Button variant="outline" className="bg-transparent">
                        Change Payout Method
                      </Button>
                    </div>

                    <div className="border-t border-border/50 pt-6">
                      <h3 className="font-medium text-foreground mb-3">Billing History</h3>
                      <div className="space-y-2">
                        {[
                          { date: "Oct 1, 2025", amount: "$0.00", status: "Free Plan" },
                          { date: "Sep 1, 2025", amount: "$0.00", status: "Free Plan" },
                        ].map((bill, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                            <div>
                              <p className="text-sm font-medium text-foreground">{bill.date}</p>
                              <p className="text-xs text-muted-foreground">{bill.status}</p>
                            </div>
                            <p className="text-sm font-semibold text-foreground">{bill.amount}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Danger Zone */}
            <Card className="p-6 border-destructive/20 bg-destructive/5">
              <h2 className="text-xl font-semibold text-destructive mb-4">Danger Zone</h2>
              <p className="text-sm text-muted-foreground mb-4">
                These actions cannot be undone. Please proceed with caution.
              </p>
              <Button
                variant="outline"
                className="bg-transparent border-destructive text-destructive hover:bg-destructive/10"
              >
                Delete Account
              </Button>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
