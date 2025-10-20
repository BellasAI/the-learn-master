import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Brain, Sparkles, Check, Clock, Target, BookOpen } from 'lucide-react'

export default function LandingPage({ onLogin }) {
  const [showLogin, setShowLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock authentication - in production, this would call an API
    onLogin({
      name: 'John Doe',
      email: email,
      tier: 'freemium',
      requestsThisMonth: 0,
      requestsLimit: 1
    })
  }

  const pricingTiers = [
    {
      name: 'Freemium',
      price: 'Free',
      description: 'Perfect for getting started',
      features: [
        '1 custom topic research per month',
        '3 curated video previews per topic',
        '3 supplementary resources',
        'YouTube links with tracking',
        'Basic formal education recommendations'
      ]
    },
    {
      name: 'Starter',
      price: '$10',
      period: '/month',
      description: 'For dedicated learners',
      features: [
        '2 custom topic researches per month',
        'Full video collections (15-25 videos)',
        '10-15 supplementary resources per topic',
        'Video timestamp segmentation',
        'Formal education pathways',
        'Email support'
      ],
      popular: true
    },
    {
      name: 'Advanced',
      price: '$25',
      period: '/month',
      description: 'For serious professionals',
      features: [
        '5 custom topic researches per month',
        'In-depth research (30-40 resources)',
        'All resource types (videos, books, courses, articles)',
        'Priority email support (24-48hr response)',
        'All Starter features'
      ]
    },
    {
      name: 'Scholar',
      price: '$50',
      period: '/month',
      description: 'For mastery seekers',
      features: [
        '10 custom topic researches per month',
        'Access to premium library (when available)',
        'Vote on next premium topic',
        'Early access to new features',
        'Priority support (12-24hr response)',
        'All Advanced features'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Brain className="h-16 w-16 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Master Any Topic, Anywhere
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto">
            From AI to Beekeeping, from Python to Photography - The Learn Master (LM) researches and curates 
            the best learning resources from across the web for any topic you want to master.
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Save hours of research. We find the best videos, courses, books, and resources, 
            then organize them into structured learning paths with precise timestamps.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setShowLogin(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
            >
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-6 text-lg"
              onClick={() => setShowLogin(true)}
            >
              Try It Now
            </Button>
          </div>
        </div>

        {/* Value Proposition Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow border-2">
            <CardHeader>
              <Clock className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Save Hours of Research</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Stop wasting time searching for quality content. We research and curate the best resources for you.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-2">
            <CardHeader>
              <Target className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle>Watch Only What Matters</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Precise video timestamps mean you watch only relevant segments. No more 2-hour videos for 10 minutes of content!
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-2">
            <CardHeader>
              <BookOpen className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Complete Learning Paths</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                From YouTube to university degrees. We show you the complete journey from beginner to professional.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Tell Us What You Want to Learn</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Choose any topic - from quantum computing to beekeeping. Be as specific as you want.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-300">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">We Research & Curate</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI searches YouTube, online courses, books, and more to find the best resources.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600 dark:text-green-300">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Your Structured Path</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive an organized learning path with timestamps, so you learn efficiently.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-4">Choose Your Plan</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
            Start free and upgrade as you need more research
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier) => (
              <Card 
                key={tier.name} 
                className={`relative hover:shadow-xl transition-shadow ${
                  tier.popular ? 'border-blue-600 border-2' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    {tier.period && <span className="text-gray-600 dark:text-gray-400">{tier.period}</span>}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full mt-6"
                    variant={tier.popular ? 'default' : 'outline'}
                    onClick={() => setShowLogin(true)}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Social Proof / Trust Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Why The Learn Master?</h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold mb-2 text-lg">✅ Honest & Transparent</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We only show features that actually work. No fake progress bars or empty promises.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold mb-2 text-lg">🎯 Quality Over Quantity</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We curate the BEST resources, not just the most. Every video, course, and book is verified.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold mb-2 text-lg">⏱️ Time-Saving Timestamps</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Watch only relevant segments of videos. Save hours by skipping intros, ads, and tangents.
              </p>
            </div>
            <div className="bg-orange-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold mb-2 text-lg">🎓 Complete Journey</h3>
              <p className="text-gray-600 dark:text-gray-300">
                From free YouTube videos to university degrees. We show you all options at every level.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join The Learn Master and save hours of research on your next learning journey.
          </p>
          <Button 
            size="lg" 
            onClick={() => setShowLogin(true)}
            className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-6 text-lg font-semibold"
          >
            Get Started Free - No Credit Card Required
          </Button>
        </div>

        {/* Login Modal */}
        {showLogin && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Welcome to The Learn Master</CardTitle>
                <CardDescription>Sign in to start your learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      Sign In
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowLogin(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                  <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    Don't have an account? <button type="button" className="text-blue-600 hover:underline">Sign up</button>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

