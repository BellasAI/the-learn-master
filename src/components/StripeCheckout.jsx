import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Crown, Loader2 } from 'lucide-react'
import { STRIPE_CONFIG, getTierDetails } from '../lib/stripe-config'

// Initialize Stripe
const stripePromise = loadStripe(STRIPE_CONFIG.publishableKey)

export default function StripeCheckout({ user, onClose }) {
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  const handleCheckout = async (tierKey) => {
    setLoading(tierKey)
    setError(null)

    try {
      // In production, this would call your backend API to create a Stripe Checkout session
      // For now, we'll show a demo message
      
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // This is where you'd redirect to Stripe Checkout
      // const stripe = await stripePromise
      // const response = await fetch('/api/create-checkout-session', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ priceId: tierDetails.priceId, userId: user.id })
      // })
      // const session = await response.json()
      // await stripe.redirectToCheckout({ sessionId: session.id })
      
      alert(`Stripe integration coming soon!\n\nYou selected: ${getTierDetails(tierKey).name}\nPrice: $${getTierDetails(tierKey).price}/month\n\nWe're setting up Stripe to process payments securely.`)
      
    } catch (err) {
      setError('Failed to start checkout. Please try again.')
      console.error('Checkout error:', err)
    } finally {
      setLoading(null)
    }
  }

  const tiers = ['starter', 'advanced', 'scholar']
  const currentTier = user?.tier || 'freemium'

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="w-full max-w-5xl my-8">
        <CardHeader>
          <CardTitle className="text-2xl">Upgrade Your Plan</CardTitle>
          <CardDescription>
            Choose a plan that fits your learning needs. Cancel anytime.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {tiers.map((tierKey) => {
              const tier = getTierDetails(tierKey)
              const isCurrentTier = currentTier === tierKey
              const isPopular = tierKey === 'starter'
              
              return (
                <Card 
                  key={tierKey} 
                  className={`relative hover:shadow-xl transition-all ${
                    isPopular ? 'border-blue-600 border-2' : ''
                  } ${isCurrentTier ? 'opacity-60' : ''}`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl">{tier.name}</CardTitle>
                      {isCurrentTier && (
                        <Badge variant="outline">Current</Badge>
                      )}
                    </div>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">${tier.price}</span>
                      <span className="text-gray-600 dark:text-gray-400">/month</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className="w-full"
                      onClick={() => handleCheckout(tierKey)}
                      disabled={isCurrentTier || loading !== null}
                      variant={isPopular ? 'default' : 'outline'}
                    >
                      {loading === tierKey ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : isCurrentTier ? (
                        'Current Plan'
                      ) : (
                        <>
                          <Crown className="h-4 w-4 mr-2" />
                          Upgrade to {tier.name}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Info Section */}
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">💳 Secure Payment Processing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We use Stripe for secure payment processing. Your payment information is never stored on our servers.
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">✅ What You Get</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Instant access to your upgraded plan</li>
                <li>• More research requests per month</li>
                <li>• Full video collections and resources</li>
                <li>• Priority support</li>
                <li>• Cancel anytime, no questions asked</li>
              </ul>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">🔄 Flexible Billing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Change your plan anytime. Upgrade or downgrade with prorated charges. Cancel with one click.
              </p>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

