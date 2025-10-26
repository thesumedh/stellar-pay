"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CreditCard, DollarSign, FileText, Sparkles, CheckCircle } from "lucide-react"

export default function MagicalDemoPage() {
  const [userBalance, setUserBalance] = useState(0)
  const [creatorEarnings, setCreatorEarnings] = useState(0)
  const [unlockedArticles, setUnlockedArticles] = useState<number[]>([])
  const [aiSummaries, setAiSummaries] = useState<{[key: number]: string}>({})
  const [loading, setLoading] = useState<{[key: string]: boolean}>({})

  const topUpAccount = () => {
    setLoading({...loading, topup: true})
    setTimeout(() => {
      setUserBalance(10.00)
      setLoading({...loading, topup: false})
    }, 1000)
  }

  const buyArticle = (articleId: number, price: number) => {
    if (userBalance >= price) {
      setUserBalance(prev => prev - price)
      setCreatorEarnings(prev => prev + price)
      setUnlockedArticles(prev => [...prev, articleId])
    }
  }

  const generateSummary = async (articleId: number) => {
    setLoading({...loading, [`ai_${articleId}`]: true})
    
    const sampleContent = "This article covers advanced React patterns including render props, higher-order components, and custom hooks. It explains how to build reusable components and manage complex state effectively."
    
    try {
      const response = await fetch('/api/ai/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: sampleContent })
      })
      
      const data = await response.json()
      
      if (userBalance >= 0.01) {
        setUserBalance(prev => prev - 0.01)
        setCreatorEarnings(prev => prev + 0.01)
        setAiSummaries(prev => ({...prev, [articleId]: data.summary}))
      }
    } catch (error) {
      setAiSummaries(prev => ({...prev, [articleId]: "AI summary failed"}))
    }
    
    setLoading({...loading, [`ai_${articleId}`]: false})
  }

  const articles = [
    { id: 1, title: "Advanced React Patterns", price: 0.05 },
    { id: 2, title: "CSS Grid Mastery", price: 0.03 },
    { id: 3, title: "TypeScript Deep Dive", price: 0.07 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">✨ Magical Demo Flow</h1>
          <p className="text-slate-400">Experience instant micropayments with AI features</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* User Dashboard */}
          <Card className="p-6 border-slate-700/50 bg-slate-800/30">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-green-400" />
              User Dashboard
            </h2>
            
            <div className="space-y-6">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <p className="text-green-400 font-semibold text-2xl">
                  Balance: ${userBalance.toFixed(2)}
                </p>
              </div>

              <Button 
                onClick={topUpAccount}
                disabled={loading.topup}
                className="w-full bg-blue-600 hover:bg-blue-700 h-12 gap-2"
              >
                <CreditCard className="w-5 h-5" />
                {loading.topup ? "Processing..." : "Top Up $10.00 (Fake Credit Card)"}
              </Button>

              <div className="space-y-3">
                <h3 className="font-semibold">Available Articles</h3>
                {articles.map(article => (
                  <div key={article.id} className="bg-slate-700/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium">{article.title}</span>
                      <span className="text-green-400">${article.price.toFixed(2)}</span>
                    </div>
                    
                    {unlockedArticles.includes(article.id) ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm">Article Unlocked!</span>
                        </div>
                        
                        <Button
                          onClick={() => generateSummary(article.id)}
                          disabled={loading[`ai_${article.id}`]}
                          className="w-full bg-purple-600 hover:bg-purple-700 h-10 gap-2"
                        >
                          <Sparkles className="w-4 h-4" />
                          {loading[`ai_${article.id}`] ? "Generating..." : "Generate AI Summary ($0.01)"}
                        </Button>
                        
                        {aiSummaries[article.id] && (
                          <div className="bg-purple-500/10 border border-purple-500/20 rounded p-3">
                            <p className="text-sm text-purple-200">{aiSummaries[article.id]}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Button
                        onClick={() => buyArticle(article.id, article.price)}
                        disabled={userBalance < article.price}
                        className="w-full bg-cyan-600 hover:bg-cyan-700 h-10"
                      >
                        Buy Article ${article.price.toFixed(2)}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Creator Dashboard */}
          <Card className="p-6 border-slate-700/50 bg-slate-800/30">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-cyan-400" />
              Creator Dashboard
            </h2>
            
            <div className="space-y-6">
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                <p className="text-cyan-400 font-semibold text-2xl">
                  Earnings: ${creatorEarnings.toFixed(2)}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Recent Sales</h3>
                <div className="space-y-2">
                  {unlockedArticles.map(articleId => {
                    const article = articles.find(a => a.id === articleId)
                    return (
                      <div key={articleId} className="bg-green-500/10 border border-green-500/20 rounded p-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{article?.title}</span>
                          <span className="text-green-400 font-semibold">+${article?.price.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-slate-400">Just now</p>
                      </div>
                    )
                  })}
                  
                  {Object.keys(aiSummaries).map(articleId => (
                    <div key={`ai_${articleId}`} className="bg-purple-500/10 border border-purple-500/20 rounded p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">AI Summary Generated</span>
                        <span className="text-purple-400 font-semibold">+$0.01</span>
                      </div>
                      <p className="text-xs text-slate-400">Just now</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-slate-400 text-sm">
            ✨ This demo shows instant micropayments with real-time balance updates and AI features
          </p>
        </div>
      </div>
    </div>
  )
}