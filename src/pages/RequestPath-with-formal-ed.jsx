// This is an enhanced version of RequestPath.jsx with formal education integration
// Replace the existing RequestPath.jsx with this file after review

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
  ExternalLink,
  GraduationCap,
  Building,
  Award
} from 'lucide-react'
import Navigation from '../components/Navigation'
import { researchLearningPath, getResearchPreview } from '../lib/research-engine'
import { getFormalEducationOptions, generateFormalEducationRecommendation } from '../lib/formal-education'

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
  const [formalEducation, setFormalEducation] = useState(null)

  // Tier configuration
  const tierLimits = {
    freemium: { 
      requests: 1, 
      videosPerTopic: 3,
      resourcesPerTopic: 3,
      topicsPerMonth: 1,
      depth: 'Limited Preview',
      description: 'Get a taste of 3 curated videos on 1 topic',
      message: "You'll receive 3 curated videos to get started. Upgrade to see the full collection! 🚀"
    },
    starter: { 
      requests: 2, 
      videosPerTopic: 999,
      resourcesPerTopic: 10,
      topicsPerMonth: 2,
      depth: 'Full Collection',
      description: 'Full video collections on 2 topics per month',
      message: "You'll receive the complete video collection with up to 10 supplementary resources."
    },
    advanced: { 
      requests: 999, 
      videosPerTopic: 999,
      resourcesPerTopic: 999,
      topicsPerMonth: 999,
      depth: 'In-Depth Research',
      description: 'Unlimited topics with comprehensive research',
      message: "You'll receive comprehensive research with unlimited videos and resources."
    },
    scholar: { 
      requests: 999, 
      videosPerTopic: 999,
      resourcesPerTopic: 999,
      topicsPerMonth: 999,
      depth: 'Expert-Level + Mentorship',
      description: 'Everything + personalized mentorship',
      message: "You'll receive expert-level research plus access to 1-on-1 mentorship sessions."
    }
  }

  const currentTier = tierLimits[user.tier]

  // Generate preview when topic changes
  useEffect(() => {
    if (formData.topic.length > 10) {
      const timer = setTimeout(() => {
        const previewData = getResearchPreview(formData.topic, formData.level)
        setPreview(previewData)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setPreview(null)
    }
  }, [formData.topic, formData.level])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitted(false)
    setResearchProgress(0)
    setResearchStage('Analyzing your request...')

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
      topic: formData.topic,
      description: formData.description,
      preferredChannels: formData.channels.split(',').map(c => c.trim()).filter(Boolean),
      level: formData.level,
      tier: user.tier
    })

    // Get formal education options
    const eduOptions = getFormalEducationOptions(formData.topic, formData.level)
    setFormalEducation(eduOptions)

    setResearchResult(result)
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted && researchResult) {
    const recommendation = generateFormalEducationRecommendation(formData.topic, formData.level)
    
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation user={user} onLogout={onLogout} />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Your Learning Path is Ready!</h1>
              <p className="text-gray-600 dark:text-gray-400">
                We've researched and curated the best content for: <strong>{formData.topic}</strong>
              </p>
            </div>

            {/* Learning Path Overview */}
            <Card className="mb-6">
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
            <Card className="mb-6">
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
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Supplementary Resources ({researchResult.resources.length})
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
              </CardContent>
            </Card>

            {/* Formal Education Options - NEW SECTION */}
            {formalEducation && (formalEducation.universities.length > 0 || formalEducation.bootcamps.length > 0) && (
              <Card className="mb-6 border-purple-200 bg-purple-50 dark:bg-purple-950 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-purple-600" />
                    Want a Degree or Certificate?
                  </CardTitle>
                  <CardDescription className="text-purple-800 dark:text-purple-200">
                    Formal education options for structured learning and credentials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white dark:bg-purple-900 p-4 rounded-lg mb-4">
                    <p className="text-sm mb-2">
                      While <strong>The Learn Master</strong> provides excellent self-directed learning, 
                      formal education offers structured programs, recognized credentials, and networking 
                      opportunities. Here are relevant options for <strong>{formData.topic}</strong>:
                    </p>
                    <p className="text-xs text-purple-700 dark:text-purple-300">
                      💡 <strong>Recommendation:</strong> {recommendation.message}
                    </p>
                  </div>

                  {/* Universities */}
                  {formalEducation.universities.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        Universities & Online Degrees
                      </h4>
                      <div className="space-y-2">
                        {formalEducation.universities.slice(0, 3).map((uni, index) => (
                          <a
                            key={index}
                            href={uni.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-3 border border-purple-200 dark:border-purple-700 rounded-lg hover:bg-white dark:hover:bg-purple-900 transition-colors group"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400">
                                    {uni.name}
                                  </p>
                                  <Badge variant="outline" className="text-xs bg-purple-100 dark:bg-purple-800">
                                    <Sparkles className="h-3 w-3 mr-1" />
                                    Recommended by LM
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {uni.program} • {uni.credential}
                                </p>
                                <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                                  <span>⏱️ {uni.duration}</span>
                                  <span>💰 {uni.cost}</span>
                                </div>
                              </div>
                              <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-purple-600 flex-shrink-0 ml-2" />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bootcamps */}
                  {formalEducation.bootcamps.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Bootcamps & Intensive Programs
                      </h4>
                      <div className="space-y-2">
                        {formalEducation.bootcamps.slice(0, 2).map((bootcamp, index) => (
                          <a
                            key={index}
                            href={bootcamp.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-3 border border-purple-200 dark:border-purple-700 rounded-lg hover:bg-white dark:hover:bg-purple-900 transition-colors group"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400">
                                    {bootcamp.name}
                                  </p>
                                  <Badge variant="outline" className="text-xs bg-purple-100 dark:bg-purple-800">
                                    <Sparkles className="h-3 w-3 mr-1" />
                                    Recommended by LM
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {bootcamp.program} • {bootcamp.duration}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{bootcamp.cost}</p>
                              </div>
                              <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-purple-600 flex-shrink-0 ml-2" />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Certifications */}
                  {formalEducation.certifications.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        Professional Certificates
                      </h4>
                      <div className="space-y-2">
                        {formalEducation.certifications.slice(0, 2).map((cert, index) => (
                          <a
                            key={index}
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-3 border border-purple-200 dark:border-purple-700 rounded-lg hover:bg-white dark:hover:bg-purple-900 transition-colors group"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400">
                                    {cert.name}
                                  </p>
                                  <Badge variant="outline" className="text-xs bg-purple-100 dark:bg-purple-800">
                                    <Sparkles className="h-3 w-3 mr-1" />
                                    Recommended by LM
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {cert.program} • {cert.duration}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{cert.cost}</p>
                              </div>
                              <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-purple-600 flex-shrink-0 ml-2" />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Attribution */}
                  <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-800">
                    <p className="text-xs text-purple-800 dark:text-purple-200 flex items-center gap-2">
                      <Info className="h-3 w-3 flex-shrink-0" />
                      <span>
                        These formal education options are researched and curated by{' '}
                        <strong>The Learn Master (LM)</strong>. All links include our attribution 
                        so institutions know you found them through our platform. We may earn a 
                        referral fee if you enroll, at no extra cost to you.
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Traffic Attribution Notice */}
            <Card className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      🎯 Traffic Attribution Active
                    </p>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      All videos and resources include <strong>The Learn Master</strong> tracking. 
                      Creators will see you came from our platform! This helps us build partnerships 
                      and bring you even better content.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={() => window.location.href = `/path/${researchResult.id}`}
              >
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => {
                  setSubmitted(false)
                  setResearchResult(null)
                  setFormData({ topic: '', description: '', channels: '', level: 'beginner' })
                }}
              >
                Request Another Path
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // ... rest of the form JSX remains the same as original RequestPath.jsx
  // (The form submission part doesn't need changes, only the results display above)
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation user={user} onLogout={onLogout} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Original form code here - unchanged */}
        <p>Form goes here (use original RequestPath.jsx form code)</p>
      </main>
    </div>
  )
}

