import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  GraduationCap, 
  BookOpen, 
  Video, 
  CheckCircle, 
  Lock,
  ArrowRight,
  TrendingUp,
  Clock,
  DollarSign,
  Target,
  Award,
  Sparkles,
  ExternalLink,
  Info
} from 'lucide-react'
import Navigation from '../components/Navigation'
import { generateLearningProgression, assessReadiness, LEARNING_STAGES } from '../lib/learning-progression'

export default function LearningJourney({ user, onLogout }) {
  const [selectedTopic, setSelectedTopic] = useState('Machine Learning')
  const [progression, setProgression] = useState(null)
  const [currentStage, setCurrentStage] = useState('foundation')
  const [userProgress, setUserProgress] = useState({
    videosCompleted: 15,
    totalVideos: 20,
    projectsCompleted: 2,
    totalHours: 35,
    confidenceLevel: 7,
    certificationsEarned: 0,
    portfolioProjects: 0,
    workExperience: 0,
    needsDegree: false
  })

  useEffect(() => {
    // Generate progression for selected topic
    const prog = generateLearningProgression(selectedTopic, 'beginner', [])
    setProgression(prog)
  }, [selectedTopic])

  const readiness = progression ? assessReadiness(userProgress, currentStage) : null

  const getStageIcon = (stageId) => {
    switch(stageId) {
      case 'foundation': return Video
      case 'structured': return BookOpen
      case 'formal': return GraduationCap
      default: return Video
    }
  }

  const getStageColor = (stageId) => {
    switch(stageId) {
      case 'foundation': return 'blue'
      case 'structured': return 'purple'
      case 'formal': return 'green'
      default: return 'gray'
    }
  }

  const isStageUnlocked = (stageId) => {
    if (stageId === 'foundation') return true
    if (stageId === 'structured') {
      const foundationReadiness = assessReadiness(userProgress, 'foundation')
      return foundationReadiness.ready
    }
    if (stageId === 'formal') {
      const structuredReadiness = assessReadiness({
        ...userProgress,
        certificationsEarned: 1,
        portfolioProjects: 5,
        workExperience: 6
      }, 'structured')
      return structuredReadiness.ready
    }
    return false
  }

  if (!progression) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation user={user} onLogout={onLogout} />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p>Loading your learning journey...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation user={user} onLogout={onLogout} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Your Learning Journey</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Master <strong>{selectedTopic}</strong> at your own pace
            </p>
          </div>

          {/* Progress Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Stage Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  {Object.values(LEARNING_STAGES).map((stage, index) => {
                    const Icon = getStageIcon(stage.id)
                    const isActive = currentStage === stage.id
                    const isUnlocked = isStageUnlocked(stage.id)
                    const isCompleted = index < Object.keys(LEARNING_STAGES).findIndex(key => LEARNING_STAGES[key].id === currentStage)

                    return (
                      <div key={stage.id} className="flex-1 flex flex-col items-center relative">
                        {/* Connection Line */}
                        {index < Object.values(LEARNING_STAGES).length - 1 && (
                          <div className={`absolute top-6 left-1/2 w-full h-0.5 ${
                            isCompleted ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'
                          }`} style={{ zIndex: 0 }} />
                        )}

                        {/* Stage Circle */}
                        <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                          isActive 
                            ? 'bg-blue-600 text-white ring-4 ring-blue-200 dark:ring-blue-800' 
                            : isCompleted
                            ? 'bg-green-600 text-white'
                            : isUnlocked
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="h-6 w-6" />
                          ) : isUnlocked ? (
                            <Icon className="h-6 w-6" />
                          ) : (
                            <Lock className="h-6 w-6" />
                          )}
                        </div>

                        {/* Stage Name */}
                        <p className={`text-sm font-medium text-center ${
                          isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {stage.name}
                        </p>
                        
                        {/* Stage Status */}
                        {isActive && (
                          <Badge variant="outline" className="mt-1 text-xs">
                            Current
                          </Badge>
                        )}
                        {!isUnlocked && (
                          <Badge variant="outline" className="mt-1 text-xs text-gray-500">
                            Locked
                          </Badge>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Current Stage Progress */}
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Videos Completed</p>
                  <div className="flex items-center gap-2">
                    <Progress value={(userProgress.videosCompleted / userProgress.totalVideos) * 100} className="flex-1" />
                    <span className="text-sm font-medium">
                      {userProgress.videosCompleted}/{userProgress.totalVideos}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Projects</p>
                  <p className="text-2xl font-bold">{userProgress.projectsCompleted}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Learning Hours</p>
                  <p className="text-2xl font-bold">{userProgress.totalHours}h</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Confidence</p>
                  <p className="text-2xl font-bold">{userProgress.confidenceLevel}/10</p>
                </div>
              </div>

              {/* Readiness Score */}
              {readiness && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-blue-900 dark:text-blue-100">
                      Readiness for Next Stage
                    </p>
                    <Badge variant={readiness.ready ? "default" : "outline"} className={readiness.ready ? "bg-green-600" : ""}>
                      {readiness.score}%
                    </Badge>
                  </div>
                  <Progress value={readiness.score} className="mb-2" />
                  {readiness.ready ? (
                    <p className="text-sm text-green-700 dark:text-green-300">
                      🎉 You're ready to progress to the next stage!
                    </p>
                  ) : (
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Keep learning! You need 75% readiness to unlock the next stage.
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stage Details */}
          {progression.stages.map((stageData, index) => {
            const stage = stageData.stage
            const Icon = getStageIcon(stage.id)
            const isActive = currentStage === stage.id
            const isUnlocked = isStageUnlocked(stage.id)
            const colorClass = getStageColor(stage.id)

            return (
              <Card key={stage.id} className={`mb-6 ${!isUnlocked ? 'opacity-60' : ''}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-3 rounded-lg ${
                        colorClass === 'blue' ? 'bg-blue-100 dark:bg-blue-900' :
                        colorClass === 'purple' ? 'bg-purple-100 dark:bg-purple-900' :
                        'bg-green-100 dark:bg-green-900'
                      }`}>
                        <Icon className={`h-6 w-6 ${
                          colorClass === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                          colorClass === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                          'text-green-600 dark:text-green-400'
                        }`} />
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {stage.name}
                          {isActive && <Badge>Current Stage</Badge>}
                          {!isUnlocked && <Lock className="h-4 w-4 text-gray-400" />}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {stage.description}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Stage Overview */}
                  <div className="grid md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Duration</p>
                        <p className="font-semibold">{stage.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Commitment</p>
                        <p className="font-semibold">{stage.commitment}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Cost</p>
                        <p className="font-semibold">{stage.cost}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Outcomes</p>
                        <p className="font-semibold">{stage.outcomes.length} goals</p>
                      </div>
                    </div>
                  </div>

                  {/* Learning Outcomes */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">What You'll Achieve:</h4>
                    <ul className="space-y-1">
                      {stage.outcomes.map((outcome, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Resources */}
                  <div className="space-y-4">
                    {Object.entries(stageData.resources).map(([resourceType, resourceData]) => (
                      <div key={resourceType} className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-yellow-500" />
                          {resourceData.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {resourceData.description}
                        </p>
                        
                        {Array.isArray(resourceData.items) && (
                          <div className="space-y-2">
                            {resourceData.items.slice(0, 3).map((item, i) => (
                              <div key={i} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{item.name || item.program || item}</p>
                                  {item.description && (
                                    <p className="text-xs text-gray-600 dark:text-gray-400">{item.description}</p>
                                  )}
                                  {item.cost && (
                                    <p className="text-xs text-gray-500 mt-1">
                                      {item.cost} • {item.duration || item.estimatedTime}
                                    </p>
                                  )}
                                </div>
                                {item.url && (
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => window.open(item.url, '_blank')}
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            ))}
                            {resourceData.items.length > 3 && (
                              <p className="text-xs text-gray-500 text-center">
                                +{resourceData.items.length - 3} more resources
                              </p>
                            )}
                          </div>
                        )}

                        {resourceData.estimatedTime && (
                          <div className="mt-2 flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                            <span>⏱️ {resourceData.estimatedTime}</span>
                            <span>💰 {resourceData.cost}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Readiness Check */}
                  {stageData.readinessCheck && (
                    <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        {stageData.readinessCheck.title}
                      </h4>
                      <ul className="space-y-1 mb-3">
                        {stageData.readinessCheck.criteria.map((criterion, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="text-orange-600">•</span>
                            <span>{criterion}</span>
                          </li>
                        ))}
                      </ul>
                      <Button size="sm" variant="outline" disabled={!isUnlocked}>
                        {stageData.readinessCheck.action}
                      </Button>
                    </div>
                  )}

                  {/* Transition Support */}
                  {stageData.transitionSupport && isActive && readiness?.ready && (
                    <div className="mt-6 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                      <h4 className="font-semibold mb-2 text-green-900 dark:text-green-100">
                        🎉 {stageData.transitionSupport.message}
                      </h4>
                      <p className="text-sm text-green-800 dark:text-green-200 mb-3">
                        Benefits of moving to the next stage:
                      </p>
                      <ul className="space-y-1 mb-4">
                        {stageData.transitionSupport.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-green-800 dark:text-green-200">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      {stageData.transitionSupport.considerations && (
                        <>
                          <p className="text-sm text-green-800 dark:text-green-200 mb-2 font-semibold">
                            Consider:
                          </p>
                          <ul className="space-y-1 mb-4">
                            {stageData.transitionSupport.considerations.map((consideration, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-green-700 dark:text-green-300">
                                <span>⚠️</span>
                                <span>{consideration}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          const nextStageIndex = Object.keys(LEARNING_STAGES).findIndex(key => LEARNING_STAGES[key].id === currentStage) + 1
                          const nextStageKey = Object.keys(LEARNING_STAGES)[nextStageIndex]
                          if (nextStageKey) {
                            setCurrentStage(LEARNING_STAGES[nextStageKey].id)
                          }
                        }}
                      >
                        Explore Next Stage
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  {/* Action Button */}
                  {isActive && (
                    <div className="mt-6">
                      <Button size="lg" className="w-full">
                        Continue Learning
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}

          {/* Attribution */}
          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                    🎯 Powered by The Learn Master
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    All resources are researched and curated by <strong>The Learn Master (LM)</strong>. 
                    Links include our attribution so institutions know you found them through our platform.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

