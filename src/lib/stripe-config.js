// Stripe Configuration for The Learn Master
// This file contains pricing information and Stripe product IDs

export const STRIPE_CONFIG = {
  // Stripe publishable key (test mode)
  // Replace with your actual Stripe publishable key
  // Get from: https://dashboard.stripe.com/test/apikeys
  publishableKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_YOUR_KEY_HERE',
  
  // Pricing tiers
  tiers: {
    starter: {
      name: 'Starter',
      price: 10,
      priceId: 'price_starter_monthly', // Replace with actual Stripe Price ID
      interval: 'month',
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
      price: 25,
      priceId: 'price_advanced_monthly', // Replace with actual Stripe Price ID
      interval: 'month',
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
      price: 50,
      priceId: 'price_scholar_monthly', // Replace with actual Stripe Price ID
      interval: 'month',
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
}

// Helper function to get tier details
export function getTierDetails(tierKey) {
  return STRIPE_CONFIG.tiers[tierKey] || null
}

// Helper function to format price
export function formatPrice(price) {
  return `$${price}`
}

// Helper function to get all upgrade options for a user's current tier
export function getUpgradeOptions(currentTier) {
  const tierOrder = ['freemium', 'starter', 'advanced', 'scholar']
  const currentIndex = tierOrder.indexOf(currentTier)
  
  if (currentIndex === -1 || currentIndex === tierOrder.length - 1) {
    return []
  }
  
  return tierOrder
    .slice(currentIndex + 1)
    .map(tier => STRIPE_CONFIG.tiers[tier])
    .filter(Boolean)
}

