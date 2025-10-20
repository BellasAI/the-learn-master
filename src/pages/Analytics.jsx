import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Video, 
  Download,
  ExternalLink,
  Eye,
  CheckCircle,
  MousePointerClick
} from 'lucide-react'
import Navigation from '../components/Navigation'
import { 
  getAnalyticsSummary, 
  exportAnalyticsData 
} from '../lib/youtube-tracking'

export default function Analytics({ user, onLogout }) {
  const [analytics, setAnalytics] = useState(null)

  useEffect(() => {
    // Load analytics data
    const summary = getAnalyticsSummary()
    setAnalytics(summary)
  }, [])

  const handleExportJSON = () => {
    const data = exportAnalyticsData('json')
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `learnmaster-analytics-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleExportCSV = () => {
    const data = exportAnalyticsData('csv')
    const blob = new Blob([data], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `learnmaster-analytics-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation user={user} onLogout={onLogout} />
        <div className="container mx-auto px-4 py-8">
          <p>Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <BarChart3 className="h-10 w-10 text-blue-600" />
            Traffic Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track the traffic you're driving to YouTube creators
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Video Views</p>
                  <p className="text-3xl font-bold">{analytics.totalViews.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Videos watched through The Learn Master
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Completions</p>
                  <p className="text-3xl font-bold">{analytics.totalCompletions.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Lessons marked as complete
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">External Clicks</p>
                  <p className="text-3xl font-bold">{analytics.totalExternalClicks.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <MousePointerClick className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                "Watch on YouTube" clicks
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Unique Videos</p>
                  <p className="text-3xl font-bold">{analytics.uniqueVideos.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                  <Video className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Different videos tracked
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Traffic Impact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Your Traffic Impact
                </CardTitle>
                <CardDescription>
                  How The Learn Master is driving value to YouTube creators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      🎯 Attribution Tracking Active
                    </h3>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      All video embeds and external links include The Learn Master attribution parameters. 
                      YouTube creators can see "learnmaster.com" as a traffic source in their analytics.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Completion Rate</p>
                      <p className="text-2xl font-bold">
                        {analytics.totalViews > 0 
                          ? Math.round((analytics.totalCompletions / analytics.totalViews) * 100)
                          : 0}%
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        High-quality engaged viewers
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Click-Through Rate</p>
                      <p className="text-2xl font-bold">
                        {analytics.totalViews > 0 
                          ? Math.round((analytics.totalExternalClicks / analytics.totalViews) * 100)
                          : 0}%
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Users visiting YouTube directly
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How Tracking Works */}
            <Card>
              <CardHeader>
                <CardTitle>How YouTube Attribution Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Embedded Videos</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        All embedded videos include <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">ref=learnmaster</code> parameter
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-purple-600 dark:text-purple-400">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">External Links</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        "Watch on YouTube" buttons include UTM tracking: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">utm_source=learnmaster</code>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Creator Analytics</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Creators see The Learn Master as a traffic source in YouTube Studio analytics
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Export Data */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Export Analytics</CardTitle>
                <CardDescription>
                  Share reports with content creators
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleExportJSON}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export as JSON
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleExportCSV}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export as CSV
                </Button>
                <p className="text-xs text-gray-500">
                  Use these reports to show creators the traffic you're driving to their content
                </p>
              </CardContent>
            </Card>

            {/* Creator Partnerships */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Creator Partnerships</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Use your traffic data to:
                  </p>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Negotiate featured placements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Request exclusive content</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Build revenue sharing deals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Get cross-promotion</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Info */}
            <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  💡 Pro Tip
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Reach out to creators showing them how much traffic you've sent them. 
                  This builds relationships and opens partnership opportunities!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

