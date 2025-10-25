"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import {
  Zap,
  TrendingUp,
  Lock,
  Wallet,
  ArrowRight,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  Code2,
  Rocket,
  Newspaper,
  BookOpen,
  Users,
} from "lucide-react"

export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Zap className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              StellarPay
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/demo">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20">
                View Demo <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-40">
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-semibold">
                ⚡ Powered by Stellar Blockchain
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight text-balance">
              The Infrastructure for{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Selling Anything
              </span>{" "}
              for Less Than 25 Cents
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl">
              Liberate content creators and small businesses from expensive subscription and ad models. Enable true
              per-content monetization with zero-fee micropayments powered by Stellar.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/demo">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 text-lg px-8 font-semibold shadow-lg shadow-cyan-500/30"
              >
                Explore Demo <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-slate-700 text-slate-300 hover:bg-slate-800/50 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-800/50">
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold">The Problem: The Transaction Fee Wall</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Why micropayments are impossible with traditional payment systems
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card className="p-6 border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-all">
                <div className="flex gap-4">
                  <Newspaper className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">The Real Problem</h3>
                    <p className="text-slate-300">
                      Major newspapers lose readers because they must charge $10/month subscriptions. Readers want to
                      pay just 3 cents for one article, but payment fees make it impossible.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-all">
                <div className="flex gap-4">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">The Fee Wall</h3>
                    <p className="text-slate-300">
                      PayPal, Stripe, and banks charge a{" "}
                      <span className="font-bold text-red-400">minimum of 30 cents</span> just to process a transaction.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-all">
                <div className="flex gap-4">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">The Result</h3>
                    <p className="text-slate-300">
                      Creators must charge <span className="font-bold text-red-400">33 cents</span> or lock readers into{" "}
                      <span className="font-bold text-red-400">$10 subscriptions</span>.
                    </p>
                  </div>
                </div>
              </Card>

              <div className="pt-4 p-6 bg-red-500/5 border border-red-500/20 rounded-lg">
                <p className="text-white font-semibold mb-2">The Truth:</p>
                <p className="text-slate-300">
                  The true 3-cent economy is impossible. Creators are forced into subscription and ad models instead of
                  per-content monetization.
                </p>
              </div>
            </div>

            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Content Price</span>
                    <span className="text-3xl font-bold text-white">$0.03</span>
                  </div>
                  <div className="border-t border-slate-700/50" />
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Processing Fee</span>
                    <span className="text-3xl font-bold text-red-400">$0.30</span>
                  </div>
                  <div className="border-t border-slate-700/50" />
                  <div className="flex items-center justify-between bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                    <span className="font-semibold text-white">Customer Pays</span>
                    <span className="text-4xl font-bold text-red-400">$0.33</span>
                  </div>
                  <p className="text-xs text-slate-400 text-center pt-4">1000% markup just to cover fees</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-800/50">
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold">The Solution: Stellar + Soroban</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Blockchain technology that eliminates the fee wall entirely
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card className="p-6 border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 transition-all">
                <div className="flex gap-4">
                  <Lightbulb className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Stellar's Advantage</h3>
                    <p className="text-slate-300">
                      Stellar's network fee is fixed at <span className="font-bold text-cyan-400">0.00001 XLM</span>{" "}
                      (virtually zero). This means the payment fee is negligible.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 transition-all">
                <div className="flex gap-4">
                  <Code2 className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Soroban Smart Contracts</h3>
                    <p className="text-slate-300">
                      We build a specialized "digital cash register" (Soroban smart contract) that only charges the user
                      the exact price of the service.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 transition-all">
                <div className="flex gap-4">
                  <Rocket className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Instant Settlement</h3>
                    <p className="text-slate-300">
                      Transactions settle in seconds, not days. Creators get paid immediately, enabling true real-time
                      monetization.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border-cyan-500/20">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Content Price</span>
                    <span className="text-3xl font-bold text-white">$0.03</span>
                  </div>
                  <div className="border-t border-slate-700/50" />
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Stellar Network Fee</span>
                    <span className="text-3xl font-bold text-cyan-400">$0.00001</span>
                  </div>
                  <div className="border-t border-slate-700/50" />
                  <div className="flex items-center justify-between bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
                    <span className="font-semibold text-white">Customer Pays</span>
                    <span className="text-4xl font-bold text-cyan-400">$0.03</span>
                  </div>
                  <p className="text-xs text-slate-400 text-center pt-4">No markup. True micropayment pricing.</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-800/50">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">How StellarPay Works</h2>
          <p className="text-xl text-slate-400">Three simple steps to start monetizing</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: 1,
              title: "Connect Freighter Wallet",
              description: "Install Freighter and connect your Stellar wallet. Your wallet is your bank account.",
              icon: Wallet,
            },
            {
              step: 2,
              title: "Upload Content",
              description: "Share your digital content (articles, tutorials, designs) and set your price in cents.",
              icon: Zap,
            },
            {
              step: 3,
              title: "Get Paid Instantly",
              description: "Receive instant payments directly to your wallet. No waiting, no middlemen.",
              icon: TrendingUp,
            },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.step} className="relative">
                <Card className="p-8 border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition-all h-full">
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 flex items-center justify-center font-bold text-lg mb-4 shadow-lg shadow-cyan-500/20">
                      {item.step}
                    </div>
                    <Icon className="w-8 h-8 text-cyan-400 mb-4" />
                    <h3 className="font-semibold text-white mb-2 text-lg">{item.title}</h3>
                    <p className="text-sm text-slate-400 flex-grow">{item.description}</p>
                  </div>
                </Card>
                {item.step < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-cyan-500/30" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Why StellarPay Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-800/50">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Why StellarPay?</h2>
          <p className="text-xl text-slate-400">The future of content monetization</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Zap,
              title: "Lightning Fast",
              description: "Transactions settle in seconds, not days",
              stat: "2s",
            },
            {
              icon: DollarSign,
              title: "Virtually No Fees",
              description: "Stellar network fee is 0.00001 XLM",
              stat: "$0.00",
            },
            {
              icon: TrendingUp,
              title: "Maximize Earnings",
              description: "Keep 99.9% of every transaction",
              stat: "99.9%",
            },
            {
              icon: Lock,
              title: "Secure & Decentralized",
              description: "Built on Stellar blockchain",
              stat: "100%",
            },
          ].map((feature, idx) => (
            <Card
              key={idx}
              className="p-6 border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition-all cursor-pointer"
              onMouseEnter={() => setHoveredFeature(idx)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <feature.icon
                className={`w-8 h-8 mb-4 transition-colors ${hoveredFeature === idx ? "text-blue-400" : "text-cyan-400"}`}
              />
              <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400 mb-4">{feature.description}</p>
              <p className="text-2xl font-bold text-cyan-400">{feature.stat}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-800/50">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Who Benefits?</h2>
          <p className="text-xl text-slate-400">Perfect for creators and small businesses</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: Newspaper,
              title: "News & Publishers",
              items: [
                "Charge per article instead of subscriptions",
                "Readers pay only for what they read",
                "Increase readership by removing paywalls",
                "Monetize without ads",
              ],
            },
            {
              icon: BookOpen,
              title: "Content Creators",
              items: [
                "Charge per tutorial, guide, or article",
                "Monetize without ads or subscriptions",
                "Get paid instantly for your work",
                "Build sustainable income streams",
              ],
            },
            {
              icon: Code2,
              title: "Developers",
              items: [
                "Sell code snippets and templates",
                "Monetize API access by usage",
                "Enable micro-licensing",
                "Build new business models",
              ],
            },
            {
              icon: Users,
              title: "Educators",
              items: [
                "Sell individual lessons or courses",
                "Charge for premium content",
                "Enable pay-what-you-want models",
                "Reach students worldwide",
              ],
            },
          ].map((useCase, idx) => {
            const Icon = useCase.icon
            return (
              <Card key={idx} className="p-8 border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition-all">
                <Icon className="w-8 h-8 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-6">{useCase.title}</h3>
                <ul className="space-y-4">
                  {useCase.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-800/50">
        <Card className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 border-cyan-500/20 p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-cyan-400 mb-2">$0.001</p>
              <p className="text-slate-400">Minimum transaction</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-cyan-400 mb-2">2s</p>
              <p className="text-slate-400">Settlement time</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-cyan-400 mb-2">0.1%</p>
              <p className="text-slate-400">Platform fee</p>
            </div>
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-800/50">
        <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20 p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Liberate Your Content?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join creators earning with Stellar micropayments. No subscriptions. No ads. Just fair payment.
          </p>
          <Link href="/demo">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 text-lg px-8 font-semibold shadow-lg shadow-cyan-500/30"
            >
              Explore Demo <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 bg-slate-950/50 py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-slate-950" />
                </div>
                <span className="font-bold text-white">StellarPay</span>
              </div>
              <p className="text-sm text-slate-400">Micropayments for creators, powered by Stellar</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Docs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800/50 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2025 StellarPay. Built for the Stellar Hackathon.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
