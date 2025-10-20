import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, BookOpen, TrendingUp, ArrowRight, Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard({ user }) {
  const navigate = useNavigate()
  
  // Calculate requests remaining
  const requestsRemaining = user.requestsLimit - (user.requestsThisMonth || 0)
  const tierLimits = {
    freemium: 1,
    starter: 2,
    advanced: 5,
    scholar: 10
  }

  const tierNames = {
    freemium: 'Freemium',
    starter: 'Starter',
    advanced: 'Advanced',
    scholar: 'Scholar'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Ready to master a new topic? Let's get started.
        </p>
      </div>

      {/* Current Plan Card */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-600" />
              Your Current Plan: {tierNames[user.tier]}
            </CardTitle>
            <CardDescription>
              {user.tier === 'freemium' && 'Start with one free research per month'}
              {user.tier === 'starter' && 'Perfect for dedicated learners'}
              {user.tier === 'advanced' && 'For serious professionals'}
              {user.tier === 'scholar' && 'Master any topic with unlimited research'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Research Requests This Month</span>
                  <span className="text-sm font-semibold">
                    {user.requestsThisMonth || 0} / {tierLimits[user.tier]}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${((user.requestsThisMonth || 0) / tierLimits[user.tier]) * 100}%` }}
                  />
                </div>
              </div>
              
              {requestsRemaining > 0 ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <p className="text-green-800 dark:text-green-200 font-medium">
                    ✨ You have {requestsRemaining} research {requestsRemaining === 1 ? 'request' : 'requests'} remaining this month!
                  </p>
                </div>
              ) : (
                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                  <p className="text-orange-800 dark:text-orange-200 font-medium mb-2">
                    You've used all your research requests for this month.
                  </p>
                  <Button size="sm" variant="outline" onClick={() => navigate('/profile')}>
                    Upgrade Plan
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-3xl font-bold text-blue-600">{user.requestsThisMonth || 0}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Topics Researched</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">{tierNames[user.tier]}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Current Plan</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Action Card */}
      <Card className="mb-8 border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="h-7 w-7 text-blue-600" />
            Request a Custom Learning Path
          </CardTitle>
          <CardDescription className="text-base">
            Tell us what you want to learn, and we'll research and curate the best resources for you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 dark:bg-blue-900 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-300">1</span>
                </div>
                <div>
                  <div className="font-semibold mb-1">Choose Your Topic</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    From AI to beekeeping - any topic you want to master
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 dark:bg-purple-900 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-purple-600 dark:text-purple-300">2</span>
                </div>
                <div>
                  <div className="font-semibold mb-1">We Research</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Our AI finds the best videos, courses, books, and resources
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-100 dark:bg-green-900 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-green-600 dark:text-green-300">3</span>
                </div>
                <div>
                  <div className="font-semibold mb-1">Get Your Path</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Structured learning path with timestamps and resources
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="w-full md:w-auto"
              onClick={() => navigate('/request')}
              disabled={requestsRemaining === 0}
            >
              {requestsRemaining > 0 ? (
                <>
                  Request Learning Path <ArrowRight className="ml-2 h-5 w-5" />
                </>
              ) : (
                'Upgrade to Request More'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
              What You'll Get
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="text-blue-600 mt-1">✓</div>
                <div>
                  <div className="font-medium">Curated Video Collection</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {user.tier === 'freemium' ? '3 preview videos' : 'Full collection of 15-40 videos'} ranked by relevance
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="text-blue-600 mt-1">✓</div>
                <div>
                  <div className="font-medium">Precise Timestamps</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Watch only relevant segments - save hours!
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="text-blue-600 mt-1">✓</div>
                <div>
                  <div className="font-medium">Supplementary Resources</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Books, articles, courses, and more
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="text-blue-600 mt-1">✓</div>
                <div>
                  <div className="font-medium">Formal Education Options</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Universities, bootcamps, and certificates
                  </div>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-purple-600" />
              Why The Learn Master?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="text-purple-600 mt-1">⏱️</div>
                <div>
                  <div className="font-medium">Save Hours of Research</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    We do the searching, you do the learning
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="text-purple-600 mt-1">🎯</div>
                <div>
                  <div className="font-medium">Quality Over Quantity</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Only the best resources, verified and ranked
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="text-purple-600 mt-1">📚</div>
                <div>
                  <div className="font-medium">Complete Learning Journey</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    From YouTube to university degrees
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="text-purple-600 mt-1">✨</div>
                <div>
                  <div className="font-medium">AI-Powered Curation</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Smart research that understands your needs
                  </div>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Upgrade Prompt for Freemium Users */}
      {user.tier === 'freemium' && (
        <Card className="border-2 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle>Want More Research?</CardTitle>
            <CardDescription>
              Upgrade to get more monthly researches, full video collections, and in-depth resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <div className="font-semibold mb-1">Starter - $10/mo</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">2 researches, full videos</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <div className="font-semibold mb-1">Advanced - $25/mo</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">5 researches, in-depth</div>
              </div>
              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                <div className="font-semibold mb-1">Scholar - $50/mo</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">10 researches, premium</div>
              </div>
            </div>
            <Button onClick={() => navigate('/profile')}>
              View Plans & Upgrade
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

