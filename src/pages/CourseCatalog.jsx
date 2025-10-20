import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Search, BookOpen, ArrowRight, Vote } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/Navigation'

export default function CourseCatalog({ user, onLogout }) {
  const navigate = useNavigate()

  // Topics users can vote on for future premium learning paths
  const votingTopics = [
    {
      title: 'AI Fundamentals',
      description: 'Complete learning path from basics to advanced AI concepts',
      icon: '🧠',
      votes: 0
    },
    {
      title: 'Python Programming',
      description: 'From beginner to professional Python developer',
      icon: '🐍',
      votes: 0
    },
    {
      title: 'Web Development',
      description: 'Full-stack web development with modern frameworks',
      icon: '💻',
      votes: 0
    },
    {
      title: 'Data Science',
      description: 'Data analysis, visualization, and machine learning',
      icon: '📊',
      votes: 0
    },
    {
      title: 'Cybersecurity',
      description: 'Security fundamentals and ethical hacking',
      icon: '🔒',
      votes: 0
    },
    {
      title: 'Cloud Computing',
      description: 'AWS, Azure, and cloud architecture',
      icon: '☁️',
      votes: 0
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🚧</div>
          <h1 className="text-4xl font-bold mb-4">Pre-Built Courses Coming Soon</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We're focusing on what makes us unique: <strong>custom research for ANY topic you want to learn</strong>.
          </p>
        </div>

        {/* Main CTA Card */}
        <Card className="mb-12 border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Sparkles className="h-7 w-7 text-blue-600" />
              Request a Custom Learning Path Instead
            </CardTitle>
            <CardDescription className="text-base">
              Why browse a catalog when we can research exactly what YOU want to learn?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="h-8 w-8 text-blue-600 dark:text-blue-300" />
                </div>
                <h3 className="font-semibold mb-2">Choose ANY Topic</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  From quantum computing to beekeeping - we research it all
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-300" />
                </div>
                <h3 className="font-semibold mb-2">We Do the Research</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Save hours - we find and organize the best resources
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-8 w-8 text-green-600 dark:text-green-300" />
                </div>
                <h3 className="font-semibold mb-2">Get Structured Path</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Videos, courses, books, and formal education options
                </p>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="w-full md:w-auto"
              onClick={() => navigate('/request')}
            >
              Request Custom Learning Path <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>

        {/* Why No Pre-Built Courses? */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Why We Focus on Custom Research</CardTitle>
            <CardDescription>
              Pre-built courses are limiting. Here's why custom research is better:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="text-2xl">✅</div>
                <div>
                  <h3 className="font-semibold mb-1">Learn Exactly What You Need</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Not interested in "AI Fundamentals"? Request "AI for Healthcare Diagnostics" or "AI for Music Production" instead.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">✅</div>
                <div>
                  <h3 className="font-semibold mb-1">Always Up-to-Date</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We research fresh content every time, not outdated courses from 2020.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">✅</div>
                <div>
                  <h3 className="font-semibold mb-1">Unlimited Topics</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We can research ANY topic, not just the 10-20 courses we pre-built.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">✅</div>
                <div>
                  <h3 className="font-semibold mb-1">Multiple Learning Styles</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We show YouTube videos, online courses, books, and university programs - you choose what fits.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Future Premium Paths - Voting */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Vote className="h-6 w-6 text-purple-600" />
              Vote for Future Premium Learning Paths
            </CardTitle>
            <CardDescription>
              We're planning to create some premium, in-depth learning paths. Help us decide what to build first!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {votingTopics.map((topic, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <div className="text-5xl mb-3">{topic.icon}</div>
                      <h3 className="font-semibold text-lg mb-2">{topic.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {topic.description}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      disabled
                    >
                      Voting Coming Soon
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                <strong>Note:</strong> Even when we build premium paths, you can still request custom research on any topic. 
                That's our core feature and it's not going anywhere!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Ready to start learning something new?
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/request')}
          >
            Request Your First Learning Path
          </Button>
        </div>
      </div>
    </div>
  )
}

