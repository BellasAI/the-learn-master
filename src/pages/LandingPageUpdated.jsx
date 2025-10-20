import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, Video, FileText, Download, BookOpen, Search, TrendingUp } from 'lucide-react';

export default function LandingPageUpdated({ onGetStarted }) {
  const features = [
    {
      icon: <Video className="w-6 h-6" />,
      title: "Curated Video Learning Paths",
      description: "AI-researched YouTube videos organized in the perfect learning sequence"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "AI-Powered Transcripts",
      description: "Full video transcripts with AI-highlighted key concepts and timestamps"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Smart Highlights",
      description: "AI identifies the most important moments and explains why they matter"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Downloadable Study Materials",
      description: "Export transcripts, notes, and study guides as PDF or Markdown"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Auto-Generated Study Guides",
      description: "AI creates comprehensive study materials with practice questions"
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Cross-Video Search",
      description: "Find concepts across all your learning materials instantly"
    }
  ];

  const pricingTiers = [
    {
      name: "Freemium",
      price: "Free",
      description: "Try our platform",
      features: [
        "1 learning path per month",
        "3 curated videos per topic",
        "Basic video links",
        "❌ No transcripts",
        "❌ No AI highlights",
        "❌ No downloads"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Starter",
      price: "$10",
      period: "/month",
      description: "Perfect for casual learners",
      features: [
        "2 learning paths per month",
        "10 videos per topic",
        "✅ Full transcripts with timestamps",
        "✅ Clickable timestamps",
        "❌ No AI highlights",
        "❌ No downloads"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Advanced",
      price: "$25",
      period: "/month",
      description: "For serious learners",
      features: [
        "5 learning paths per month",
        "Unlimited videos per topic",
        "✅ AI-highlighted transcripts",
        "✅ Download PDFs & Markdown",
        "✅ Personal notes & bookmarks",
        "✅ Searchable transcript library",
        "✅ Study guide generation"
      ],
      cta: "Upgrade to Advanced",
      popular: true
    },
    {
      name: "Scholar",
      price: "$50",
      period: "/month",
      description: "Maximum learning power",
      features: [
        "10 learning paths per month",
        "Everything in Advanced, plus:",
        "✅ Flashcard generation",
        "✅ Cross-video connections",
        "✅ Custom highlight preferences",
        "✅ Priority support",
        "✅ Early access to new features"
      ],
      cta: "Go Scholar",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Learning Platform
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Learn Anything with
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> AI-Curated </span>
            Video Paths
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Request any topic. Get a personalized learning path with curated YouTube videos, 
            AI-highlighted transcripts, and downloadable study materials. Save 10+ hours per month.
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" onClick={onGetStarted}>
              Start Learning Free
            </Button>
            <Button size="lg" variant="outline">
              See How It Works
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            No credit card required • 1 free learning path • Upgrade anytime
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything You Need to Learn Faster</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We combine AI research, video curation, and smart study tools to accelerate your learning
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shrink-0">
              1
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Request Your Topic</h3>
              <p className="text-muted-foreground">
                Tell us what you want to learn - from "neural networks" to "quantum computing" to "React hooks"
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shrink-0">
              2
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">AI Researches & Curates</h3>
              <p className="text-muted-foreground">
                Our AI searches YouTube, filters out noise, and selects only the best educational videos specific to your topic
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shrink-0">
              3
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Watch with AI Highlights</h3>
              <p className="text-muted-foreground">
                Videos play embedded with transcripts. AI highlights key concepts and explains why they're important
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shrink-0">
              4
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Download Study Materials</h3>
              <p className="text-muted-foreground">
                Export transcripts, notes, and AI-generated study guides as PDF or Markdown. Review anytime, anywhere
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Learning Plan</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when you need more. All plans include curated video learning paths.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <Card 
              key={index} 
              className={`relative ${tier.popular ? 'border-primary border-2 shadow-lg' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.period && <span className="text-muted-foreground">{tier.period}</span>}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2 text-sm">
                      {feature.startsWith('✅') || feature.startsWith('❌') ? (
                        <span>{feature}</span>
                      ) : (
                        <>
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full" 
                  variant={tier.popular ? "default" : "outline"}
                  onClick={onGetStarted}
                >
                  {tier.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Learn Smarter?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join learners who save 10+ hours per month with AI-powered study materials
            </p>
            <Button size="lg" variant="secondary" onClick={onGetStarted}>
              Start Your First Learning Path Free
            </Button>
            <p className="mt-4 text-sm opacity-75">
              No credit card required • Upgrade anytime
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

