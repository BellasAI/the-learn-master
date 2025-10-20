import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BookOpen, Brain, TrendingUp, Users, Check, Sparkles } from 'lucide-react'

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
      progress: {
        completedCourses: 2,
        totalCourses: 10,
        certificates: 1
      }
    })
  }

  const pricingTiers = [
    {
      name: 'Freemium',
      price: 'Free',
      description: 'Perfect for getting started',
      features: [
        'Access to AI Fundamentals learning path',
        'Limited custom research (1-2 topics/channels)',
        'Basic progress tracking',
        'Community access'
      ]
    },
    {
      name: 'Starter',
      price: '$10',
      period: '/month',
      description: 'For dedicated learners',
      features: [
        'Full access to all curated learning paths',
        '5 custom research requests per month',
        'Advanced progress tracking & analytics',
        'Priority community support',
        'Downloadable resources'
      ],
      popular: true
    },
    {
      name: 'Advanced',
      price: '$25',
      period: '/month',
      description: 'For serious professionals',
      features: [
        'Unlimited custom research requests',
        'In-depth research with comprehensive results',
        'Priority support',
        'All Starter features',
        'Early access to new content'
      ]
    },
    {
      name: 'Scholar',
      price: '$50',
      period: '/month',
      description: 'For mastery seekers',
      features: [
        'All Advanced features',
        'Personalized 1-on-1 mentorship sessions',
        'Exclusive workshops and webinars',
        'Custom curriculum design',
        'Certificate of completion'
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
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            From AI to Beekeeping, from Python to Photography - The Learn Master (LM) researches and curates 
            the best YouTube learning content for any topic you want to master.
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
            >
              View Demo
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Curated Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Expert-curated YouTube videos and tutorials organized into structured learning paths
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Track Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor your learning journey with detailed analytics and achievement tracking
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Sparkles className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle>Custom Research</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Request personalized learning paths on any topic, researched and curated for you
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-10 w-10 text-orange-600 mb-2" />
              <CardTitle>Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with fellow learners, share insights, and grow together
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-4">Choose Your Plan</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
            Start free and upgrade as you grow
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

        {/* Login Modal */}
        {showLogin && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Sign in to continue your learning journey</CardDescription>
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

