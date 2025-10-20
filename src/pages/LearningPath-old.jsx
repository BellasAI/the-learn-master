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
  Play
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
      modules: [
        {
          title: 'Introduction to AI',
          lessons: [
            {
              title: 'What is AI? History and Evolution',
              videoUrl: 'https://www.youtube.com/embed/mSd9nmPM7Vg',
              duration: '15:30',
              resources: [
                { title: 'AI History Timeline', url: '#' },
                { title: 'Key Milestones in AI', url: '#' }
              ]
            },
            {
              title: 'The Subfields of AI',
              videoUrl: 'https://www.youtube.com/embed/R42q6likyGo',
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
              videoUrl: 'https://www.youtube.com/embed/Gv9_4yMHFhI',
              duration: '18:20',
              resources: [
                { title: 'ML Crash Course by Google', url: 'https://developers.google.com/machine-learning/crash-course' }
              ]
            },
            {
              title: 'Supervised Learning',
              videoUrl: 'https://www.youtube.com/embed/1FZ0A1QCMWc',
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
              videoUrl: 'https://www.youtube.com/embed/aircAruvnKk',
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

  const handleLessonComplete = () => {
    if (!completedLessons.includes(currentLesson)) {
      setCompletedLessons([...completedLessons, currentLesson])
    }
    if (currentLesson < allLessons.length - 1) {
      setCurrentLesson(currentLesson + 1)
    }
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
                    src={currentLessonData.videoUrl}
                    title={currentLessonData.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{currentLessonData.title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {currentLessonData.moduleTitle} • {currentLessonData.duration}
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
                </div>
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
                        <span>{resource.title}</span>
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
                <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                  Discussion feature coming soon! Share your thoughts and questions with other learners.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Course Content */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Course Content</h3>
                <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {course.modules.map((module, moduleIndex) => (
                    <div key={moduleIndex}>
                      <h4 className="font-semibold text-sm mb-2 text-gray-700 dark:text-gray-300">
                        {module.title}
                      </h4>
                      <div className="space-y-1 mb-4">
                        {module.lessons.map((lesson, lessonIndex) => {
                          const globalIndex = allLessons.findIndex(
                            l => l.moduleIndex === moduleIndex && l.lessonIndex === lessonIndex
                          )
                          const isActive = globalIndex === currentLesson
                          const isCompleted = isLessonCompleted(globalIndex)
                          
                          return (
                            <button
                              key={lessonIndex}
                              onClick={() => setCurrentLesson(globalIndex)}
                              className={`w-full text-left p-3 rounded-lg transition-colors flex items-start gap-3 ${
                                isActive 
                                  ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500' 
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent'
                              }`}
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                              ) : isActive ? (
                                <Play className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                              ) : (
                                <Circle className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium ${isActive ? 'text-blue-900 dark:text-blue-100' : ''}`}>
                                  {lesson.title}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {lesson.duration}
                                </p>
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

