import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Search, 
  Clock, 
  CheckCircle, 
  Loader2, 
  Sparkles, 
  Lock, 
  Info, 
  AlertCircle,
  Video,
  BookOpen,
  TrendingUp,
  Zap,
  ArrowRight,
  ExternalLink
} from 'lucide-react'
import Navigation from '../components/Navigation'
import { researchLearningPath, getResearchPreview } from '../lib/research-engine'
import { screenUserRequest } from '../lib/content-safety'
import { verifyLearningPath, generateVerificationSummary } from '../lib/quality-verification'
import DisclaimerModal, { BlockedContentModal, QualityVerificationModal } from '../components/DisclaimerModal'

export default function RequestPath({ user, onLogout }) {
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    channels: '',
    level: 'beginner'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [researchProgress, setResearchProgress] = useState(0)
  const [researchStage, setResearchStage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [researchResult, setResearchResult] = useState(null)
  const [preview, setPreview] = useState(null)
  const [safetyCheck, setSafetyCheck] = useState(null)
  const [showDisclaimer, setShowDisclaimer] = useState(false)
  const [showBlocked, setShowBlocked] = useState(false)
  const [showQualityVerification, setShowQualityVerification] = useState(false)
  const [qualityVerification, setQualityVerification] = useState(null)

  // Tier configuration
  const tierLimits = {
    freemium: { 
      requests: 1, 
      videosPerTopic: 3,
      resourcesPerTopic: 3,
      topicsPerMonth: 1,
      depth: 'Limited Preview',
      description: 'Get a taste of 3 curated videos on 1 topic',
      price: 'Free'
    },
    starter: { 
      requests: 5, 
      videosPerTopic: 10,
      resourcesPerTopic: 10,
      topicsPerMonth: 2,
      depth: 'Complete Collection',
      description: 'Full video collections for 2 topics per month',
      price: '$10/month'
    },
    advanced: { 
      requests: 'Unlimited', 
      videosPerTopic: 'Unlimited',
      resourcesPerTopic: 'Unlimited',
      topicsPerMonth: 'Unlimited',
      depth: 'Comprehensive + Resources',
      description: 'Unlimited topics with in-depth resources',
      price: '$25/month'
    },
    scholar: { 
      requests: 'Unlimited', 
      videosPerTopic: 'Unlimited',
      resourcesPerTopic: 'Unlimited',
      topicsPerMonth: 'Unlimited',
      depth: 'Expert + Mentorship',
      description: 'Everything plus personalized guidance',
      price: '$50/month'
    }
  }

  const currentTier = user?.tier || 'freemium'
  const limits = tierLimits[currentTier]
  const requestsUsed = 0 // This would come from backend

  // Generate preview when topic changes
  useEffect(() => {
    if (formData.topic.length > 3) {
      const delayDebounce = setTimeout(() => {
        const previewData = getResearchPreview(formData.topic, formData.level)
        setPreview(previewData)
      }, 500)

      return () => clearTimeout(delayDebounce)
    } else {
      setPreview(null)
    }
  }, [formData.topic, formData.level])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.topic.trim()) {
      alert('Please enter a topic')
      return
    }
    
    if (!formData.description.trim()) {
      alert('Please describe what you want to learn')
      return
    }
    
    // Check if user has reached their limit
    if (currentTier === 'freemium' && requestsUsed >= limits.requests) {
      alert('You have reached your monthly limit. Please upgrade to submit more requests.')
      return
    }
    
    setIsSubmitting(true)
    setResearchProgress(0)
    setResearchStage('Checking content safety...')
    
    try {
      // STEP 1: Safety screening
      const safety = await screenUserRequest(
        formData.topic,
        formData.description,
        user?.age || null
      )
      
      setSafetyCheck(safety)
      
      // If blocked, show blocked modal
      if (!safety.allowed) {
        setShowBlocked(true)
        setIsSubmitting(false)
        return
      }
      
      // If requires disclaimer, show disclaimer modal
      if (safety.requiresDisclaimer) {
        setShowDisclaimer(true)
        setIsSubmitting(false)
        return
      }
      
      // Continue with research
      await proceedWithResearch()
      
    } catch (error) {
      console.error('Safety check error:', error)
      // Fail open - allow research to continue
      await proceedWithResearch()
    }
  }
  
  const proceedWithResearch = async () => {
    setIsSubmitting(true)
    setResearchProgress(0)
    
    try {
      // Simulate research progress
      const stages = [
        { progress: 20, message: 'Analyzing your request...' },
        { progress: 40, message: 'Searching YouTube for relevant videos...' },
        { progress: 60, message: 'Ranking videos by relevance...' },
        { progress: 80, message: 'Finding supplementary resources...' },
        { progress: 95, message: 'Structuring your learning path...' },
        { progress: 100, message: 'Complete!' }
      ]

      for (const stage of stages) {
        await new Promise(resolve => setTimeout(resolve, 800))
        setResearchProgress(stage.progress)
        setResearchStage(stage.message)
      }

      // Perform actual research
      const result = await researchLearningPath({
        ...formData,
        tier: currentTier
      })

      // STEP 2: Quality verification
      setResearchStage('Verifying learning path quality...')
      const verification = await verifyLearningPath(result, formData)
      const verificationSummary = generateVerificationSummary(verification, formData)
      
      setQualityVerification({
        ...verification,
        summary: verificationSummary
      })
      
      // If quality is good, show results
      if (verification.ready && verification.confidence > 0.7) {
        setResearchResult(result)
        setSubmitted(true)
      } else {
        // Show quality verification modal for user decision
        setResearchResult(result)
        setShowQualityVerification(true)
      }
      
    } catch (error) {
      console.error('Research error:', error)
      alert('Failed to research learning path. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleStartNewRequest = () => {
    setSubmitted(false)
    setResearchResult(null)
    setFormData({ topic: '', description: '', channels: '', level: 'beginner' })
    setPreview(null)
  }

  // Show research result
  if (submitted && researchResult) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation user={user} onLogout={onLogout} />
        
        <div className="container mx-auto px-4 py-8">
          {/* Success Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Your Learning Path is Ready!</h1>
            <p className="text-gray-600 dark:text-gray-400">
              We've researched and curated the best content for: <strong>{researchResult.topic}</strong>
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Learning Path Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-yellow-500" />
                    Learning Path Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Key Concepts You'll Learn:</h3>
                    <div className="flex flex-wrap gap-2">
                      {researchResult.analysis.keyConcepts.map((concept, index) => (
                        <Badge key={index} variant="outline">{concept}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Learning Objectives:</h3>
                    <ul className="space-y-1">
                      {researchResult.analysis.learningObjectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Videos</p>
                      <p className="text-2xl font-bold">{researchResult.videos.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Resources</p>
                      <p className="text-2xl font-bold">{researchResult.resources.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Est. Time</p>
                      <p className="text-2xl font-bold">{researchResult.analysis.estimatedHours}h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Curated Videos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Video className="h-5 w-5" />
                      Curated Videos ({researchResult.videos.length})
                    </span>
                    {researchResult.tier === 'freemium' && (
                      <Badge variant="outline" className="text-orange-600">
                        Preview Mode - 3 of {researchResult.metadata.totalVideos} videos
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Videos arranged in optimal learning sequence
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {researchResult.videos.map((video, index) => (
                      <div key={video.id} className="flex gap-4 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {video.lessonNumber}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold mb-1">{video.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            by {video.channelName} • {video.duration} • {video.views.toLocaleString()} views
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              Relevance: {Math.round(video.finalScore * 100)}%
                            </Badge>
                            {video.preferredChannel && (
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                                Preferred Channel
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open(video.watchUrl, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {researchResult.tier === 'freemium' && (
                    <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg">
                      <p className="text-sm text-orange-800 dark:text-orange-200 mb-2">
                        <Lock className="h-4 w-4 inline mr-1" />
                        <strong>Upgrade to see all {researchResult.metadata.totalVideos} videos</strong>
                      </p>
                      <Button size="sm" className="w-full">
                        Upgrade to Starter - $10/month
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Supplementary Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Supplementary Resources ({researchResult.resources.length})
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Additional materials ranked by relevance - all links include The Learn Master attribution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {researchResult.resources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                      >
                        <div className="flex-1">
                          <p className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {resource.title}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {resource.description} • {resource.source}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {resource.type}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Relevance: {Math.round(resource.relevanceScore * 100)}%
                            </Badge>
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0 ml-2" />
                      </a>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-xs text-blue-800 dark:text-blue-200">
                      <Info className="h-3 w-3 inline mr-1" />
                      All external links include The Learn Master attribution (ref=learnmaster) so sources know you came from our platform
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-4">
                <Button onClick={handleStartNewRequest} variant="outline" className="flex-1">
                  Request Another Path
                </Button>
                <Button className="flex-1">
                  Start Learning
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Your Plan */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Plan: {currentTier}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Videos per topic</p>
                    <p className="text-lg font-bold">{limits.videosPerTopic}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Resources per topic</p>
                    <p className="text-lg font-bold">{limits.resourcesPerTopic}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Topics per month</p>
                    <p className="text-lg font-bold">{limits.topicsPerMonth}</p>
                  </div>
                  
                  {currentTier === 'freemium' && (
                    <Button className="w-full mt-4">
                      Upgrade to Starter
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Attribution Info */}
              <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Traffic Attribution Active
                  </h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    All videos and resources include The Learn Master tracking. Creators will see you came from our platform!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
            <Sparkles className="h-10 w-10 text-yellow-500" />
            Request Custom Learning Path
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tell us what you want to learn, and we'll research and curate the best YouTube content for you
          </p>
        </div>

        {/* How to Use */}
        <Card className="mb-8 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
              <Info className="h-5 w-5" />
              How to Use This Research System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mb-3">
                  1
                </div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Select Your Topic</h3>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Choose ONE topic you want to learn. Be specific about what you want to achieve.
                </p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold mb-3">
                  2
                </div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">We Research</h3>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Our AI searches YouTube for the best educational videos matching your request.
                </p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold mb-3">
                  3
                </div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Get Your Path</h3>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Receive curated videos organized into a structured learning path.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>New Learning Path Request</CardTitle>
                <CardDescription>
                  You have {limits.requests - requestsUsed} topic request{limits.requests - requestsUsed !== 1 ? 's' : ''} remaining this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Topic */}
                  <div>
                    <Label htmlFor="topic">
                      Topic * (Select ONE topic to research)
                    </Label>
                    <Input
                      id="topic"
                      name="topic"
                      value={formData.topic}
                      onChange={handleChange}
                      placeholder="e.g., Python Programming, Digital Marketing, Graphic Design, Mating Cycle of Bees in the UK"
                      required
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      💡 Be specific: "Python for Data Science" is better than just "Python"
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">
                      What do you want to learn? *
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Example: I want to learn Python for data science. I'm a complete beginner with no programming experience. I want to understand data analysis, visualization, and basic machine learning."
                      rows={5}
                      required
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Include: Your current level, specific goals, and what you want to achieve
                    </p>
                  </div>

                  {/* Preferred Channels */}
                  <div>
                    <Label htmlFor="channels">
                      Preferred YouTube Channels (Optional)
                    </Label>
                    <Input
                      id="channels"
                      name="channels"
                      value={formData.channels}
                      onChange={handleChange}
                      placeholder="e.g., freeCodeCamp, Traversy Media, The Net Ninja"
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      We'll prioritize these channels if they have relevant content
                    </p>
                  </div>

                  {/* Experience Level */}
                  <div>
                    <Label htmlFor="level">Your Experience Level</Label>
                    <select
                      id="level"
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                      disabled={isSubmitting}
                    >
                      <option value="beginner">Beginner - New to this topic</option>
                      <option value="intermediate">Intermediate - Some knowledge</option>
                      <option value="advanced">Advanced - Looking to deepen expertise</option>
                    </select>
                  </div>

                  {/* Research Preview */}
                  {preview && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        Research Preview
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Estimated Videos</p>
                          <p className="font-semibold">{preview.estimatedVideos}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Estimated Time</p>
                          <p className="font-semibold">{preview.estimatedTime}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">Key Concepts:</p>
                        <div className="flex flex-wrap gap-1">
                          {preview.keyConcepts.map((concept, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{concept}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {researchStage}
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Research This Topic
                      </>
                    )}
                  </Button>

                  {/* Research Progress */}
                  {isSubmitting && (
                    <div className="space-y-2">
                      <Progress value={researchProgress} className="h-2" />
                      <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                        {researchStage}
                      </p>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Plan */}
            <Card className={currentTier === 'freemium' ? 'border-orange-200' : ''}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{currentTier} Plan</CardTitle>
                  {currentTier === 'freemium' && (
                    <Badge variant="outline" className="text-orange-600">Limited</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Topics per month</p>
                  <p className="text-2xl font-bold">{limits.topicsPerMonth}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Videos per topic</p>
                  <p className="text-2xl font-bold">{limits.videosPerTopic}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Research depth</p>
                  <p className="text-sm font-semibold">{limits.depth}</p>
                </div>

                {currentTier === 'freemium' && (
                  <>
                    <div className="pt-3 border-t">
                      <p className="text-sm text-orange-800 dark:text-orange-200 mb-2">
                        <strong>Preview Mode:</strong> You'll receive 3 curated videos to get started.
                      </p>
                      <p className="text-xs text-orange-700 dark:text-orange-300">
                        Upgrade to see the full collection! 🚀
                      </p>
                    </div>
                    <Button className="w-full">
                      Upgrade to Starter - $10/month
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Plan Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Plan Comparison</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 border rounded-lg">
                  <p className="font-semibold">Freemium</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">1 topic, 3 videos preview</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-semibold">Starter ($10/mo)</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">2 topics, full collections</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-semibold">Advanced ($25/mo)</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Unlimited topics + resources</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-semibold">Scholar ($50/mo)</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Everything + mentorship</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Safety and Quality Modals */}
      {showDisclaimer && safetyCheck && (
        <DisclaimerModal
          disclaimerType={safetyCheck.disclaimerType}
          topic={formData.topic}
          onAccept={async () => {
            setShowDisclaimer(false)
            await proceedWithResearch()
          }}
          onDecline={() => {
            setShowDisclaimer(false)
            setIsSubmitting(false)
          }}
          requiresAcceptance={safetyCheck.severity === 'critical' || safetyCheck.severity === 'high'}
        />
      )}
      
      {showBlocked && safetyCheck && (
        <BlockedContentModal
          reason={safetyCheck.reason}
          category={safetyCheck.category}
          message={safetyCheck.message}
          alternatives={safetyCheck.alternatives}
          onClose={() => {
            setShowBlocked(false)
            setIsSubmitting(false)
          }}
        />
      )}
      
      {showQualityVerification && qualityVerification && (
        <QualityVerificationModal
          verification={qualityVerification}
          originalRequest={formData}
          onProceed={() => {
            setShowQualityVerification(false)
            setSubmitted(true)
          }}
          onRefine={() => {
            setShowQualityVerification(false)
            setIsSubmitting(false)
            // User can modify their request
          }}
        />
      )}
    </div>
  )
}

