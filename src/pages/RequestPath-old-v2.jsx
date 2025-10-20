import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Search, Clock, CheckCircle, Loader2, Sparkles, Lock, Info, AlertCircle } from 'lucide-react'
import Navigation from '../components/Navigation'

export default function RequestPath({ user, onLogout }) {
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    channels: '',
    level: 'beginner'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Tier configuration
  const tierLimits = {
    freemium: { 
      requests: 1, 
      videosPerTopic: 3,
      topicsPerMonth: 1,
      depth: 'Limited Preview',
      description: 'Get a taste of 3 curated videos on 1 topic'
    },
    starter: { 
      requests: 5, 
      videosPerTopic: 'Full',
      topicsPerMonth: 2,
      depth: 'Complete Collection',
      description: 'Full video collections for 2 topics per month'
    },
    advanced: { 
      requests: 'Unlimited', 
      videosPerTopic: 'Full',
      topicsPerMonth: 'Unlimited',
      depth: 'Comprehensive + Resources',
      description: 'Unlimited topics with in-depth resources'
    },
    scholar: { 
      requests: 'Unlimited', 
      videosPerTopic: 'Full',
      topicsPerMonth: 'Unlimited',
      depth: 'Expert + Mentorship',
      description: 'Everything plus personalized guidance'
    }
  }

  const currentTier = user?.tier || 'freemium'
  const limits = tierLimits[currentTier]
  const requestsUsed = 0 // This would come from backend

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Check if user has reached their limit
    if (currentTier === 'freemium' && requestsUsed >= limits.requests) {
      alert('You have reached your monthly limit. Please upgrade to submit more requests.')
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ topic: '', description: '', channels: '', level: 'beginner' })
    }, 3000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const previousRequests = [
    {
      id: 1,
      topic: 'AI Fundamentals',
      status: 'completed',
      requestedAt: '2 days ago',
      lessons: currentTier === 'freemium' ? 3 : 12,
      isLimited: currentTier === 'freemium'
    }
  ]

  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
          Researching
        </Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Sparkles className="h-10 w-10 text-purple-600" />
            Request Custom Learning Path
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tell us what you want to learn, and we'll research and curate the best YouTube content for you
          </p>
        </div>

        {/* How to Use Section */}
        <Card className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
              <Info className="h-5 w-5" />
              How to Use This Research System
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
                  <h3 className="font-semibold">Select Your Topic</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose ONE topic you want to learn. Be specific about what you want to achieve.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">2</div>
                  <h3 className="font-semibold">We Research</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our AI searches YouTube for the best educational videos matching your request.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">3</div>
                  <h3 className="font-semibold">Get Your Path</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive curated videos organized into a structured learning path.
                </p>
              </div>
            </div>

            {/* Tier-specific information */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border-2 border-blue-300 dark:border-blue-700">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                Your Plan: {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)}
              </h3>
              <div className="space-y-2 text-sm">
                {currentTier === 'freemium' && (
                  <>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Freemium Plan:</strong> You can research <strong>1 topic per month</strong> and receive <strong>3 preview videos</strong>.
                    </p>
                    <p className="text-orange-600 dark:text-orange-400 font-medium">
                      💡 Want the full collection? Upgrade to Starter to get complete video collections for 2 topics per month!
                    </p>
                  </>
                )}
                {currentTier === 'starter' && (
                  <>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Starter Plan:</strong> You can research <strong>2 topics per month</strong> and receive <strong>full video collections</strong> for each topic.
                    </p>
                    <p className="text-green-600 dark:text-green-400 font-medium">
                      ✨ You're getting complete learning paths! Upgrade to Advanced for unlimited topics.
                    </p>
                  </>
                )}
                {currentTier === 'advanced' && (
                  <>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Advanced Plan:</strong> Research <strong>unlimited topics</strong> with comprehensive video collections and supplementary resources.
                    </p>
                  </>
                )}
                {currentTier === 'scholar' && (
                  <>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Scholar Plan:</strong> Research <strong>unlimited topics</strong> with expert-level curation, mentorship, and personalized guidance.
                    </p>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Request Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>New Learning Path Request</CardTitle>
                <CardDescription>
                  {currentTier === 'freemium' 
                    ? `You have ${limits.requests - requestsUsed} topic request remaining this month`
                    : currentTier === 'starter'
                    ? `You have ${limits.requests - requestsUsed} topic requests remaining this month`
                    : 'Unlimited topic requests available'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="topic">Topic * (Select ONE topic to research)</Label>
                    <Input
                      id="topic"
                      name="topic"
                      placeholder="e.g., Python Programming, Digital Marketing, Graphic Design"
                      value={formData.topic}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      💡 Be specific: "Python for Data Science" is better than just "Python"
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="description">What do you want to learn? *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Example: I want to learn Python for data science. I'm a complete beginner with no programming experience. I want to understand data analysis, visualization, and basic machine learning."
                      value={formData.description}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      rows={6}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Include: Your current level, specific goals, and what you want to achieve
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="channels">Preferred YouTube Channels (Optional)</Label>
                    <Input
                      id="channels"
                      name="channels"
                      placeholder="e.g., freeCodeCamp, Traversy Media, The Net Ninja"
                      value={formData.channels}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      We'll prioritize these channels if they have relevant content
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="level">Your Experience Level</Label>
                    <select
                      id="level"
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="beginner">Beginner - I'm completely new to this</option>
                      <option value="intermediate">Intermediate - I have some basic knowledge</option>
                      <option value="advanced">Advanced - I want deep, technical content</option>
                    </select>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting || submitted || (currentTier === 'freemium' && requestsUsed >= limits.requests)}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Researching Your Topic...
                      </>
                    ) : submitted ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Request Submitted!
                      </>
                    ) : (currentTier === 'freemium' && requestsUsed >= limits.requests) ? (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Monthly Limit Reached
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Research This Topic
                      </>
                    )}
                  </Button>

                  {currentTier === 'freemium' && requestsUsed >= limits.requests && (
                    <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                      <p className="text-sm text-orange-800 dark:text-orange-200 mb-2">
                        You've used your free topic request for this month.
                      </p>
                      <Button variant="default" className="w-full">
                        Upgrade to Starter - Get 2 Topics/Month
                      </Button>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Plan Info */}
            <Card className={currentTier === 'freemium' ? 'border-orange-300 dark:border-orange-700' : ''}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{currentTier.charAt(0).toUpperCase() + currentTier.slice(1)} Plan</span>
                  {currentTier === 'freemium' && <Badge variant="outline" className="text-orange-600">Limited</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Topics per month</span>
                    <span className="font-semibold">{limits.topicsPerMonth}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Videos per topic</span>
                    <span className="font-semibold">{limits.videosPerTopic}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Research depth</span>
                    <span className="font-semibold text-xs">{limits.depth}</span>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    {limits.description}
                  </p>
                </div>

                {currentTier === 'freemium' && (
                  <div className="space-y-2">
                    <div className="bg-orange-50 dark:bg-orange-950 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
                      <p className="text-xs text-orange-800 dark:text-orange-200 mb-2">
                        <strong>Preview Mode:</strong> You'll receive 3 curated videos to get started.
                      </p>
                      <p className="text-xs text-orange-600 dark:text-orange-400">
                        Upgrade to see the full collection! 🚀
                      </p>
                    </div>
                    <Button variant="default" className="w-full">
                      Upgrade to Starter - $10/month
                    </Button>
                  </div>
                )}

                {currentTier === 'starter' && (
                  <Button variant="outline" className="w-full">
                    Upgrade to Advanced
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Plan Comparison</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="space-y-1">
                  <p className="font-semibold text-gray-500">Freemium</p>
                  <p className="text-xs">1 topic, 3 videos preview</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-blue-600">Starter ($10/mo)</p>
                  <p className="text-xs">2 topics, full collections</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-purple-600">Advanced ($25/mo)</p>
                  <p className="text-xs">Unlimited topics + resources</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-green-600">Scholar ($50/mo)</p>
                  <p className="text-xs">Everything + mentorship</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Previous Requests */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Learning Paths</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {previousRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold">{request.topic}</h3>
                    {getStatusBadge(request.status)}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Requested {request.requestedAt}
                  </p>
                  {request.status === 'completed' && (
                    <>
                      <p className="text-sm text-green-600 dark:text-green-400 mb-2">
                        {request.lessons} videos ready
                      </p>
                      {request.isLimited && (
                        <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded p-2 mb-3">
                          <p className="text-xs text-orange-700 dark:text-orange-300 flex items-center gap-1">
                            <Lock className="h-3 w-3" />
                            Preview mode - Upgrade for full access
                          </p>
                        </div>
                      )}
                    </>
                  )}
                  <Button 
                    variant={request.status === 'completed' ? 'default' : 'outline'}
                    className="w-full"
                    disabled={request.status !== 'completed'}
                  >
                    {request.status === 'completed' ? 'View Path' : 'Researching...'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

