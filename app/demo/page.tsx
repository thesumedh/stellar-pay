"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { connectFreighter, isFreighterInstalled } from "../../utils/freighter"
import { 
  Edit3, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share, 
  Bookmark, 
  MoreHorizontal,
  Search,
  Bell,
  User,
  TrendingUp,
  DollarSign,
  Lock,
  Unlock,
  CreditCard,
  CheckCircle,
  Loader2,
  ExternalLink,
  Plus,
  X
} from "lucide-react"

export default function DemoPage() {
  const [activeView, setActiveView] = useState("reader")
  const [address, setAddress] = useState("")
  const [readerBalance, setReaderBalance] = useState(0)
  const [writerEarnings, setWriterEarnings] = useState(0)
  const [unlockedArticles, setUnlockedArticles] = useState<number[]>([])
  const [loading, setLoading] = useState<{[key: string]: boolean}>({})
  const [transactions, setTransactions] = useState<any[]>([])
  const [isConnecting, setIsConnecting] = useState(false)
  const [showWriteModal, setShowWriteModal] = useState(false)
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "The Future of Decentralized Finance: A Deep Dive into Stellar",
      subtitle: "How Stellar is revolutionizing cross-border payments and micropayments",
      author: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      date: "Dec 15, 2024",
      readTime: "8 min read",
      price: 0.5,
      preview: "Decentralized finance has emerged as one of the most transformative sectors in the blockchain space...",
      content: "Decentralized finance has emerged as one of the most transformative sectors in the blockchain space. Among the various platforms competing for dominance, Stellar stands out with its unique approach to facilitating fast, low-cost transactions.\n\nStellar's consensus mechanism, known as the Stellar Consensus Protocol (SCP), enables the network to process thousands of transactions per second while maintaining decentralization. This makes it ideal for micropayments and cross-border remittances.\n\nThe platform's native token, XLM, serves as a bridge currency, allowing seamless conversion between different assets. This feature is particularly valuable for businesses operating in multiple currencies.",
      likes: 234,
      comments: 18,
      category: "Technology"
    }
  ])

  // New article form state
  const [newArticle, setNewArticle] = useState({
    title: "",
    subtitle: "",
    content: "",
    price: "",
    category: "Technology"
  })

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      if (!window.freighterApi) {
        alert("Freighter not installed. Visit https://www.freighter.app")
        setIsConnecting(false)
        return
      }
      
      const result = await window.freighterApi.requestAccess()
      if (result.error) {
        console.error('Connect error:', result.error)
        throw new Error(typeof result.error === 'string' ? result.error : JSON.stringify(result.error))
      }
      
      setAddress(result.address)
      setReaderBalance(10.00)
    } catch (err) {
      alert(err.message)
    }
    setIsConnecting(false)
  }

  const purchaseArticle = async (articleId: number, price: number) => {
    if (!address) {
      await handleConnect()
      return
    }

    if (!window.freighterApi) {
      alert("Freighter wallet not found. Please install Freighter.")
      return
    }

    setLoading({...loading, [`article_${articleId}`]: true})
    
    try {
      console.log('Building transaction...')
      const buildRes = await fetch('/api/stellar/build-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderPublicKey: address,
          recipientPublicKey: "GANG3GZKNCPZ5GX2HUQJTMUWJORQJ5XJMLLHFNNUW3GX4IHOGIF4IOXA",
          amount: price.toString(),
          memo: `Article purchase: ${articleId}`
        })
      })
      
      if (!buildRes.ok) {
        const responseText = await buildRes.text()
        console.error('Build response error:', responseText)
        throw new Error(`API Error: ${buildRes.status} - ${responseText.substring(0, 100)}`)
      }
      
      const buildData = await buildRes.json()
      const { xdr } = buildData
      console.log('Signing transaction...')
      
      const signedResult = await window.freighterApi.signTransaction(xdr, { network: "TESTNET" })
      if (signedResult.error) {
        console.error('Freighter signing error:', signedResult.error)
        const errorMsg = signedResult.error.message || signedResult.error.toString() || 'Freighter wallet error'
        throw new Error(errorMsg)
      }
      
      if (!signedResult.signedTxXdr) {
        throw new Error('Transaction signing failed - no signed XDR returned')
      }
      
      console.log('Submitting transaction...')
      const submitRes = await fetch('/api/stellar/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ xdr: signedResult.signedTxXdr })
      })
      
      if (!submitRes.ok) {
        const responseText = await submitRes.text()
        console.error('Submit response error:', responseText)
        throw new Error(`API Error: ${submitRes.status} - ${responseText.substring(0, 100)}`)
      }
      
      const result = await submitRes.json()
      if (result.success) {
        setReaderBalance(prev => prev - price)
        setWriterEarnings(prev => prev + price)
        setUnlockedArticles(prev => [...prev, articleId])
        
        const newTransaction = {
          id: result.transactionHash,
          articleId,
          articleTitle: articles.find(a => a.id === articleId)?.title,
          amount: price,
          timestamp: new Date().toISOString(),
          type: 'purchase',
          hash: result.transactionHash
        }
        setTransactions(prev => [newTransaction, ...prev])
        
        alert(`Article unlocked! \nTransaction: ${result.transactionHash}`)
      } else {
        throw new Error('Transaction failed')
      }
    } catch (error) {
      console.error('Purchase error:', error)
      const errorMsg = error?.message || error?.toString() || 'Transaction failed'
      alert(`Purchase failed: ${errorMsg}`)
    }
    
    setLoading({...loading, [`article_${articleId}`]: false})
  }

  const publishArticle = () => {
    if (!newArticle.title || !newArticle.content || !newArticle.price) {
      alert("Please fill in all fields")
      return
    }

    const article = {
      id: Date.now(),
      title: newArticle.title,
      subtitle: newArticle.subtitle,
      author: address ? `${address.slice(0,4)}...${address.slice(-4)}` : "Anonymous",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${address}`,
      date: new Date().toLocaleDateString(),
      readTime: `${Math.ceil(newArticle.content.length / 200)} min read`,
      price: parseFloat(newArticle.price),
      preview: newArticle.content.substring(0, 200) + "...",
      content: newArticle.content,
      likes: 0,
      comments: 0,
      category: newArticle.category
    }

    setArticles(prev => [article, ...prev])
    setNewArticle({ title: "", subtitle: "", content: "", price: "", category: "Technology" })
    setShowWriteModal(false)
    alert("Article published successfully!")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SP</span>
                </div>
                <span className="font-bold text-xl">StellarPay</span>
              </div>
              
              <nav className="hidden md:flex items-center gap-6">
                <button 
                  onClick={() => setActiveView("reader")}
                  className={`text-sm ${activeView === "reader" ? "text-black font-medium" : "text-gray-600 hover:text-black"}`}
                >
                  Reader
                </button>
                <button 
                  onClick={() => setActiveView("writer")}
                  className={`text-sm ${activeView === "writer" ? "text-black font-medium" : "text-gray-600 hover:text-black"}`}
                >
                  Writer
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {address ? (
                <div className="flex items-center gap-3">
                  <div className="text-sm">
                    <span className="text-gray-600">Balance: </span>
                    <span className="font-semibold">{readerBalance.toFixed(7)} XLM</span>
                  </div>
                  <div className="text-xs text-gray-500 max-w-[100px] truncate">
                    {address}
                  </div>
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                </div>
              ) : (
                <Button 
                  onClick={handleConnect} 
                  disabled={isConnecting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    'Connect Freighter'
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Reader View */}
      {activeView === "reader" && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {articles.map((article) => (
              <article key={article.id} className="border-b border-gray-200 pb-8">
                <div className="flex items-start gap-4">
                  <img 
                    src={article.avatar} 
                    alt={article.author}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span className="font-medium text-black">{article.author}</span>
                      <span>·</span>
                      <span>{article.date}</span>
                      <span>·</span>
                      <span>{article.readTime}</span>
                      <span>·</span>
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">{article.category}</span>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                      {article.title}
                    </h2>
                    
                    {article.subtitle && (
                      <p className="text-gray-600 mb-3 leading-relaxed">
                        {article.subtitle}
                      </p>
                    )}
                    
                    <div className="text-gray-800 leading-relaxed mb-4">
                      {unlockedArticles.includes(article.id) ? (
                        <div className="space-y-4">
                          {article.content.split('\n\n').map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                          ))}
                        </div>
                      ) : (
                        <div>
                          <p className="mb-4">{article.preview}</p>
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent h-24"></div>
                            <div className="blur-sm text-gray-400">
                              <p>This premium content is locked. Unlock it with XLM to continue reading...</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {!unlockedArticles.includes(article.id) && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Lock className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm font-medium">Premium Content - Real Stellar Transaction Required</span>
                        </div>
                        <Button
                          onClick={() => purchaseArticle(article.id, article.price)}
                          disabled={loading[`article_${article.id}`] || !address}
                          className="bg-green-600 hover:bg-green-700 text-white px-6"
                        >
                          {loading[`article_${article.id}`] ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Signing Transaction...
                            </>
                          ) : !address ? (
                            'Connect Wallet First'
                          ) : (
                            <>
                              <CreditCard className="w-4 h-4 mr-2" />
                              Unlock for {article.price} XLM
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                    
                    {unlockedArticles.includes(article.id) && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center gap-2 text-green-700">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Article unlocked with real Stellar transaction!</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 text-gray-600 hover:text-red-500">
                          <Heart className="w-5 h-5" />
                          <span className="text-sm">{article.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-sm">{article.comments}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Writer Dashboard */}
      {activeView === "writer" && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="p-6 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{writerEarnings.toFixed(7)} XLM</p>
                    <p className="text-sm text-gray-600">Total Earnings</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{articles.length}</p>
                    <p className="text-sm text-gray-600">Published Articles</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{transactions.length}</p>
                    <p className="text-sm text-gray-600">Articles Sold</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Edit3 className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{unlockedArticles.length}</p>
                    <p className="text-sm text-gray-600">Purchases</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Articles Management */}
            <Card className="border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Your Articles</h2>
                  <Button 
                    onClick={() => setShowWriteModal(true)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Write New Article
                  </Button>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {articles.map((article) => (
                  <div key={article.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                        <p className="text-gray-600 mb-3">{article.subtitle}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{article.date}</span>
                          <span>·</span>
                          <span>{article.readTime}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {article.price} XLM
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-green-600">
                          {(transactions.filter(tx => tx.articleId === article.id).reduce((sum, tx) => sum + tx.amount, 0)).toFixed(7)} XLM
                        </p>
                        <p className="text-sm text-gray-500">
                          {transactions.filter(tx => tx.articleId === article.id).length} sales
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Transactions */}
            <Card className="border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Real Stellar Transactions</h2>
                  <Button 
                    onClick={() => window.open('https://stellar.expert/explorer/testnet/account/GANG3GZKNCPZ5GX2HUQJTMUWJORQJ5XJMLLHFNNUW3GX4IHOGIF4IOXA', '_blank')}
                    variant="outline"
                    size="sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Stellar Explorer
                  </Button>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {transactions.map((tx) => (
                  <div key={tx.id} className="p-6 flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{tx.articleTitle}</p>
                      <p className="text-sm text-gray-600">Article purchase via Freighter</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500 font-mono">{tx.hash.slice(0, 8)}...{tx.hash.slice(-8)}</span>
                        <Button
                          onClick={() => window.open(`https://stellar.expert/explorer/testnet/tx/${tx.hash}`, '_blank')}
                          variant="ghost"
                          size="sm"
                          className="text-xs h-6 px-2"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View TX
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">+{tx.amount} XLM</p>
                      <p className="text-sm text-gray-500">{new Date(tx.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
                
                {transactions.length === 0 && (
                  <div className="p-6 text-center text-gray-500">
                    <p>No transactions yet.</p>
                    <p className="text-sm mt-1">Publish articles and readers will purchase them with real XLM!</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Write Article Modal */}
      {showWriteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold">Write New Article</h2>
              <Button 
                onClick={() => setShowWriteModal(false)}
                variant="ghost"
                size="sm"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                  placeholder="Enter article title..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Subtitle (Optional)</label>
                <Input
                  value={newArticle.subtitle}
                  onChange={(e) => setNewArticle({...newArticle, subtitle: e.target.value})}
                  placeholder="Enter subtitle..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <Textarea
                  value={newArticle.content}
                  onChange={(e) => setNewArticle({...newArticle, content: e.target.value})}
                  placeholder="Write your article content..."
                  rows={10}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price (XLM)</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={newArticle.price}
                    onChange={(e) => setNewArticle({...newArticle, price: e.target.value})}
                    placeholder="0.5"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={newArticle.category}
                    onChange={(e) => setNewArticle({...newArticle, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                    <option value="Science">Science</option>
                    <option value="Health">Health</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={publishArticle}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Publish Article
                </Button>
                <Button 
                  onClick={() => setShowWriteModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}