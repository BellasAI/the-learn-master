import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  BookOpen, 
  Brain, 
  TrendingUp, 
  Award, 
  Play, 
  Search,
  LogOut,
  User,
  Menu
} from 'lucide-react'
import Navigation from '../components/Navigation'

export default function Dashboard({ user, onLogout }) {
  const recentCourses = [
    {
      id: 'ai-fundamentals',
      title: 'AI Fundamentals',
      progress: 65,
      lastLesson: 'Neural Networks Basics',
      thumbnail: '🧠'
    },
    {
      id: 'python-basics',
      title: 'Python for Beginners',
      progress: 30,
      lastLesson: 'Functions and Modules',
      thumbnail: '🐍'
    }
  ]

  const recommendations = [
    {
      id: 'deep-learning',
      title: 'Deep Learning Specialization',
      description: 'Master neural networks and deep learning',
      lessons: 24,
      duration: '12 weeks',
      thumbnail: '🤖'
    },
    {
      id: 'nlp-basics',
      title: 'Natural Language Processing',
      description: 'Learn to process and analyze text data',
      lessons: 18,
      duration: '8 weeks',
      thumbnail: '💬'
    },
    {
      id: 'computer-vision',
      title: 'Computer Vision Fundamentals',
      description: 'Build AI systems that can see and understand',
      lessons: 20,
      duration: '10 weeks',
      thumbnail: '👁️'
    }
  ]

  const stats = [
    { label: 'Courses Completed', value: user?.progress?.completedCourses || 0, icon: Award, color: 'text-yellow-600' },
    { label: 'In Progress', value: 2, icon: BookOpen, color: 'text-blue-600' },
    { label: 'Total Learning Hours', value: 45, icon: TrendingUp, color: 'text-green-600' },
    { label: 'Certificates', value: user?.progress?.certificates || 0, icon: Award, color: 'text-purple-600' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Continue your learning journey where you left off
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-10 w-10 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Learning */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Continue Learning</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {recentCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="text-6xl">{course.thumbnail}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Last: {course.lastLesson}
                      </p>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span className="font-semibold">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <Link to={`/learning/${course.id}`}>
                        <Button className="w-full">
                          <Play className="h-4 w-4 mr-2" />
                          Continue
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommended for You */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Recommended for You</h2>
            <Link to="/catalog">
              <Button variant="outline">
                View All
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-5xl mb-3">{course.thumbnail}</div>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <span>{course.lessons} lessons</span>
                    <span>{course.duration}</span>
                  </div>
                  <Link to={`/learning/${course.id}`}>
                    <Button className="w-full" variant="outline">
                      Start Learning
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:shadow-xl transition-shadow cursor-pointer">
            <Link to="/request">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <Search className="h-12 w-12" />
                  <div>
                    <h3 className="text-xl font-bold mb-1">Request Custom Learning Path</h3>
                    <p className="text-blue-100">
                      Tell us what you want to learn, and we'll research it for you
                    </p>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:shadow-xl transition-shadow cursor-pointer">
            <Link to="/catalog">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <BookOpen className="h-12 w-12" />
                  <div>
                    <h3 className="text-xl font-bold mb-1">Explore Course Catalog</h3>
                    <p className="text-purple-100">
                      Browse our curated collection of learning paths
                    </p>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}

