import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  BookOpen, 
  MessageSquare,
  ExternalLink,
  Play,
  Youtube
} from 'lucide-react'
import Navigation from '../components/Navigation'
import { 
  createTrackedEmbedUrl, 
  createTrackedWatchUrl, 
  extractVideoId,
  trackVideoView,
  trackVideoCompletion,
  trackExternalClick
} from '../lib/youtube-tracking'

export default function LearningPath({ user, onLogout }) {
  const { pathId } = useParams()
  const [currentLesson, setCurrentLesson] = useState(0)
  const [completedLessons, setCompletedLessons] = useState([0, 1])

  // Mock data - in production, this would be fetched from an API
  const courseData = {
    'ai-fundamentals': {
      title: 'AI Fundamentals',
      description: 'Master the core concepts of Artificial Intelligence',
      channelId: 'UC-various', // For tracking purposes
      modules: [
        {
          title: 'Introduction to AI',
          lessons: [
            {
              title: 'What is AI? History and Evolution',
              videoUrl: 'https://www.youtube.com/watch?v=mSd9nmPM7Vg',
              channelName: 'Simplilearn',
              duration: '15:30',
              resources: [
                { title: 'AI History Timeline', url: '#' },
                { title: 'Key Milestones in AI', url: '#' }
              ]
            },
            {
              title: 'The Subfields of AI',
              videoUrl: 'https://www.youtube.com/watch?v=R42q6likyGo',
              channelName: 'IBM Technology',
              duration: '12:45',
              resources: [
                { title: 'AI Subfields Overview', url: '#' }
              ]
            }
          ]
        },
        {
          title: 'Machine Learning Fundamentals',
          lessons: [
            {
              title: 'Introduction to Machine Learning',
              videoUrl: 'https://www.youtube.com/watch?v=Gv9_4yMHFhI',
              channelName: 'Simplilearn',
              duration: '18:20',
              resources: [
                { title: 'ML Crash Course by Google', url: 'https://developers.google.com/machine-learning/crash-course' }
              ]
            },
            {
              title: 'Supervised Learning',
              videoUrl: 'https://www.youtube.com/watch?v=1FZ0A1QCMWc',
              channelName: 'StatQuest',
              duration: '20:15',
              resources: [
                { title: 'Scikit-learn Documentation', url: 'https://scikit-learn.org/stable/' }
              ]
            }
          ]
        },
        {
          title: 'Neural Networks',
          lessons: [
            {
              title: 'Introduction to Neural Networks',
              videoUrl: 'https://www.youtube.com/watch?v=aircAruvnKk',
              channelName: '3Blue1Brown',
              duration: '19:13',
              resources: [
                { title: '3Blue1Brown NN Series', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi' }
              ]
            }
          ]
        }
      ]
    }
  }

  const course = courseData[pathId] || courseData['ai-fundamentals']
  
  // Flatten lessons for easier navigation
  const allLessons = []
  course.modules.forEach((module, moduleIndex) => {
    module.lessons.forEach((lesson, lessonIndex) => {
      allLessons.push({
        ...lesson,
        moduleIndex,
        lessonIndex,
        moduleTitle: module.title
      })
    })
  })

  const currentLessonData = allLessons[currentLesson]
  const progress = (completedLessons.length / allLessons.length) * 100

  // Extract video ID and create tracked URLs
  const videoId = extractVideoId(currentLessonData.videoUrl)
  const trackedEmbedUrl = createTrackedEmbedUrl(videoId, {
    campaign: pathId,
    learningPath: course.title,
    lessonId: `${currentLessonData.moduleIndex}-${currentLessonData.lessonIndex}`
  })
  const trackedWatchUrl = createTrackedWatchUrl(videoId, {
    campaign: pathId,
    learningPath: course.title,
    lessonId: `${currentLessonData.moduleIndex}-${currentLessonData.lessonIndex}`,
    content: currentLessonData.title
  })

  // Track video view when lesson changes
  useEffect(() => {
    if (videoId) {
      trackVideoView(videoId, {
        learningPath: course.title,
        lessonTitle: currentLessonData.title,
        channelName: currentLessonData.channelName,
        moduleTitle: currentLessonData.moduleTitle
      })
    }
  }, [currentLesson, videoId])

  const handleLessonComplete = () => {
    // Track completion
    if (!completedLessons.includes(currentLesson) && videoId) {
      trackVideoCompletion(videoId, {
        learningPath: course.title,
        lessonTitle: currentLessonData.title,
        channelName: currentLessonData.channelName
      })
      setCompletedLessons([...completedLessons, currentLesson])
    }
    
    if (currentLesson < allLessons.length - 1) {
      setCurrentLesson(currentLesson + 1)
    }
  }

  const handleWatchOnYouTube = () => {
    // Track external click
    if (videoId) {
      trackExternalClick(videoId, {
        learningPath: course.title,
        lessonTitle: currentLessonData.title,
        channelName: currentLessonData.channelName
      })
    }
    // Open in new tab
    window.open(trackedWatchUrl, '_blank')
  }

  const isLessonCompleted = (index) => completedLessons.includes(index)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <Card>
              <CardContent className="pt-6">
                <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{course.description}</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Course Progress</span>
                      <span className="font-semibold">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  <Badge variant="outline">
                    {completedLessons.length} / {allLessons.length} completed
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Video Player */}
            <Card>
              <CardContent className="pt-6">
                <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                  <iframe
                    src={trackedEmbedUrl}
                    title={currentLessonData.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-1">{currentLessonData.title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {currentLessonData.moduleTitle} • {currentLessonData.duration}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      by {currentLessonData.channelName}
                    </p>
                  </div>
                  {isLessonCompleted(currentLesson) && (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleLessonComplete}
                    className="flex-1"
                  >
                    {isLessonCompleted(currentLesson) ? 'Next Lesson' : 'Mark as Complete'}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleWatchOnYouTube}
                    className="flex items-center gap-2"
                  >
                    <Youtube className="h-4 w-4" />
                    Watch on YouTube
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-3 text-center">
                  🎯 Watching from The Learn Master helps us track which content is most valuable to learners
                </p>
              </CardContent>
            </Card>

            {/* Resources */}
            {currentLessonData.resources && currentLessonData.resources.length > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Supplementary Resources
                  </h3>
                  <div className="space-y-2">
                    {currentLessonData.resources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="text-sm font-medium">{resource.title}</span>
                        <ExternalLink className="h-4 w-4 text-gray-400" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Discussion */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Discussion
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Share your thoughts, ask questions, or help fellow learners
                </p>
                <Button variant="outline" className="w-full">
                  Join Discussion
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Course Content */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Course Content</h3>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {course.modules.map((module, moduleIndex) => (
                    <div key={moduleIndex}>
                      <h4 className="font-semibold text-sm mb-2">{module.title}</h4>
                      <div className="space-y-1">
                        {module.lessons.map((lesson, lessonIndex) => {
                          const lessonGlobalIndex = allLessons.findIndex(
                            l => l.moduleIndex === moduleIndex && l.lessonIndex === lessonIndex
                          )
                          const isActive = lessonGlobalIndex === currentLesson
                          const isCompleted = isLessonCompleted(lessonGlobalIndex)
                          
                          return (
                            <button
                              key={lessonIndex}
                              onClick={() => setCurrentLesson(lessonGlobalIndex)}
                              className={`w-full text-left p-3 rounded-lg transition-colors ${
                                isActive 
                                  ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500' 
                                  : 'hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent'
                              }`}
                            >
                              <div className="flex items-start gap-2">
                                {isCompleted ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                ) : (
                                  <Circle className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm font-medium ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                                    {lesson.title}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">{lesson.duration}</p>
                                </div>
                                {isActive && (
                                  <Play className="h-4 w-4 text-blue-600 flex-shrink-0 mt-1" />
                                )}
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

