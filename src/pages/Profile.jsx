import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User, Crown, CreditCard, Settings, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/Navigation'
import StripeCheckout from '../components/StripeCheckout'

export default function Profile({ user, onLogout }) {
  const navigate = useNavigate()
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const tierInfo = {
    freemium: {
      name: 'Freemium',
      price: 'Free',
      requests: 1,
      features: [
        '1 custom topic research per month',
        '3 curated video previews per topic',
        '3 supplementary resources',
        'YouTube links with tracking',
        'Basic formal education recommendations'
      ]
    },
    starter: {
      name: 'Starter',
      price: '$10/month',
      requests: 2,
      features: [
        '2 custom topic researches per month',
        'Full video collections (15-25 videos)',
        '10-15 supplementary resources per topic',
        'Video timestamp segmentation',
        'Formal education pathways',
        'Email support'
      ]
    },
    advanced: {
      name: 'Advanced',
      price: '$25/month',
      requests: 5,
      features: [
        '5 custom topic researches per month',
        'In-depth research (30-40 resources)',
        'All resource types (videos, books, courses, articles)',
        'Priority email support (24-48hr response)',
        'All Starter features'
      ]
    },
    scholar: {
      name: 'Scholar',
      price: '$50/month',
      requests: 10,
      features: [
        '10 custom topic researches per month',
        'Access to premium library (when available)',
        'Vote on next premium topic',
        'Early access to new features',
        'Priority support (12-24hr response)',
        'All Advanced features'
      ]
    }
  }

  const currentTier = tierInfo[user?.tier] || tierInfo.freemium
  const requestsUsed = user?.requestsThisMonth || 0
  const requestsRemaining = currentTier.requests - requestsUsed

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{user?.name}</h1>
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    <Crown className="h-3 w-3 mr-1" />
                    {currentTier.name}
                  </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {user?.email}
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" disabled>
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  {user?.tier === 'freemium' && (
                    <Button onClick={() => setShowUpgradeModal(true)}>
                      <Crown className="h-4 w-4 mr-2" />
                      Upgrade Plan
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Usage */}
            <Card>
              <CardHeader>
                <CardTitle>Usage This Month</CardTitle>
                <CardDescription>
                  Track your research requests and plan usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Research Requests</span>
                      <span className="text-sm font-semibold">
                        {requestsUsed} / {currentTier.requests} used
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${(requestsUsed / currentTier.requests) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  {requestsRemaining > 0 ? (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <p className="text-green-800 dark:text-green-200 font-medium">
                        ✨ You have {requestsRemaining} research {requestsRemaining === 1 ? 'request' : 'requests'} remaining this month!
                      </p>
                      <Button 
                        size="sm" 
                        className="mt-3"
                        onClick={() => navigate('/request')}
                      >
                        Request Learning Path
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                      <p className="text-orange-800 dark:text-orange-200 font-medium mb-2">
                        You've used all your research requests for this month.
                      </p>
                      <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
                        Upgrade your plan to get more requests, or wait until next month.
                      </p>
                      <Button 
                        size="sm" 
                        onClick={() => setShowUpgradeModal(true)}
                      >
                        Upgrade Plan
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Current Plan Details */}
            <Card>
              <CardHeader>
                <CardTitle>Your {currentTier.name} Plan</CardTitle>
                <CardDescription>
                  {currentTier.price === 'Free' ? 'Free forever' : currentTier.price}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {currentTier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="text-green-600 mt-1">✓</div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={user?.name}
                      disabled
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email}
                      disabled
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Account editing coming soon. Contact support for changes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Subscription Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Subscription</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Plan</span>
                    <span className="font-semibold">{currentTier.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Price</span>
                    <span className="font-semibold">{currentTier.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Active
                    </Badge>
                  </div>
                  {user?.tier !== 'freemium' && (
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Next billing</span>
                      <span className="text-sm font-semibold">Nov 19, 2025</span>
                    </div>
                  )}
                  {user?.tier === 'freemium' && (
                    <Button 
                      className="w-full mt-4"
                      onClick={() => setShowUpgradeModal(true)}
                    >
                      <Crown className="h-4 w-4 mr-2" />
                      Upgrade Now
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/request')}
                >
                  Request Learning Path
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/dashboard')}
                >
                  Go to Dashboard
                </Button>
                {user?.tier !== 'freemium' && (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    disabled
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Billing History
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Have questions or need assistance? We're here to help!
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="mailto:support@learnmaster.com">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Support
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upgrade Modal */}
        {showUpgradeModal && (
          <StripeCheckout 
            user={user}
            onClose={() => setShowUpgradeModal(false)}
          />
        )}
      </div>
    </div>
  )
}

