import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  GraduationCap, 
  Video, 
  FileText, 
  Code, 
  Users, 
  Headphones, 
  FlaskConical,
  ExternalLink,
  RefreshCw,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const EnhancedLearningPath = ({ topic, userLevel, description }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedSections, setExpandedSections] = useState({
    videos: true,
    courses: true,
    books: false,
    colleges: false,
    docs: false,
    practice: false,
    community: false,
    podcasts: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Mock data - in production, this comes from AI research
  const learningPath = {
    topic: topic,
    level: userLevel,
    overview: {
      totalResources: 45,
      estimatedTime: '3-6 months',
      difficulty: userLevel,
      keyConcepts: [
        'Fundamentals',
        'Core Principles',
        'Practical Applications',
        'Advanced Techniques'
      ]
    },
    
    // YouTube Videos
    videos: [
      {
        title: `Complete Guide to ${topic}`,
        channel: 'Educational Channel',
        duration: '15:30',
        views: '125K',
        relevance: 100,
        url: `https://youtube.com/watch?v=example1&ref=learnmaster&utm_source=learnmaster&topic=${encodeURIComponent(topic)}`
      },
      {
        title: `${topic} - Detailed Explanation`,
        channel: 'Expert Tutorials',
        duration: '22:45',
        views: '89K',
        relevance: 95,
        url: `https://youtube.com/watch?v=example2&ref=learnmaster&utm_source=learnmaster&topic=${encodeURIComponent(topic)}`
      },
      {
        title: `${topic} - Practical Examples`,
        channel: 'Pro Academy',
        duration: '18:20',
        views: '67K',
        relevance: 90,
        url: `https://youtube.com/watch?v=example3&ref=learnmaster&utm_source=learnmaster&topic=${encodeURIComponent(topic)}`
      }
    ],

    // Online Courses
    courses: [
      {
        title: `${topic} Specialization`,
        platform: 'Coursera',
        provider: 'Stanford University',
        duration: '3 months',
        cost: '$49/month',
        rating: 4.8,
        students: '125K',
        certificate: true,
        url: `https://coursera.org/specializations/example?ref=learnmaster`
      },
      {
        title: `Complete ${topic} Bootcamp`,
        platform: 'Udemy',
        provider: 'Expert Instructor',
        duration: '40 hours',
        cost: '$89.99',
        rating: 4.7,
        students: '89K',
        certificate: true,
        url: `https://udemy.com/course/example?ref=learnmaster`
      },
      {
        title: `${topic} Nanodegree`,
        platform: 'Udacity',
        provider: 'Industry Experts',
        duration: '4 months',
        cost: '$399/month',
        rating: 4.6,
        students: '45K',
        certificate: true,
        url: `https://udacity.com/course/example?ref=learnmaster`
      }
    ],

    // Books
    books: [
      {
        title: `${topic}: A Comprehensive Guide`,
        author: 'Dr. Expert Name',
        publisher: 'O\'Reilly Media',
        year: 2024,
        pages: 450,
        format: ['Paperback', 'Kindle', 'PDF'],
        rating: 4.7,
        price: '$49.99',
        url: `https://amazon.com/dp/example?tag=learnmaster-20`
      },
      {
        title: `Practical ${topic}`,
        author: 'Industry Professional',
        publisher: 'Manning Publications',
        year: 2023,
        pages: 380,
        format: ['Paperback', 'eBook'],
        rating: 4.6,
        price: '$44.99',
        url: `https://amazon.com/dp/example2?tag=learnmaster-20`
      },
      {
        title: `${topic} for Beginners`,
        author: 'Teaching Expert',
        publisher: 'No Starch Press',
        year: 2024,
        pages: 320,
        format: ['Paperback', 'PDF'],
        rating: 4.8,
        price: 'FREE (PDF)',
        url: `https://example.com/free-book?ref=learnmaster`
      }
    ],

    // Colleges & Universities
    colleges: [
      {
        name: 'Stanford Online',
        program: `Graduate Certificate in ${topic}`,
        type: 'Certificate',
        duration: '6-12 months',
        cost: '$3,000-$5,000',
        format: 'Online',
        accreditation: 'Stanford University',
        url: `https://online.stanford.edu/programs/example?ref=learnmaster`
      },
      {
        name: 'Georgia Tech',
        program: `Master of Science in ${topic}`,
        type: 'Master\'s Degree',
        duration: '2-3 years',
        cost: '$7,000 total',
        format: 'Online',
        accreditation: 'ABET Accredited',
        url: `https://omscs.gatech.edu?ref=learnmaster`
      },
      {
        name: 'MIT OpenCourseWare',
        program: `Introduction to ${topic}`,
        type: 'Free Course',
        duration: '12 weeks',
        cost: 'FREE',
        format: 'Self-paced',
        accreditation: 'MIT',
        url: `https://ocw.mit.edu/courses/example?ref=learnmaster`
      }
    ],

    // Documentation & Articles
    documentation: [
      {
        title: `Official ${topic} Documentation`,
        type: 'Official Docs',
        provider: 'Official Source',
        description: 'Comprehensive reference guide',
        url: `https://docs.example.com?ref=learnmaster`
      },
      {
        title: `${topic} Tutorial Series`,
        type: 'Tutorial',
        provider: 'MDN Web Docs',
        description: 'Step-by-step learning path',
        url: `https://developer.mozilla.org/example?ref=learnmaster`
      },
      {
        title: `${topic} Best Practices`,
        type: 'Article',
        provider: 'Medium',
        description: 'Industry best practices and patterns',
        url: `https://medium.com/example?ref=learnmaster`
      }
    ],

    // Practice Platforms
    practice: [
      {
        name: 'Interactive Playground',
        type: 'Coding Platform',
        description: `Practice ${topic} with interactive exercises`,
        difficulty: 'All Levels',
        exercises: '200+',
        url: `https://example-playground.com?ref=learnmaster`
      },
      {
        name: 'Challenge Platform',
        type: 'Competition',
        description: 'Compete with others and build portfolio',
        difficulty: 'Intermediate+',
        challenges: '150+',
        url: `https://example-challenges.com?ref=learnmaster`
      }
    ],

    // Community Resources
    community: [
      {
        name: `r/${topic.replace(/\s+/g, '')}`,
        platform: 'Reddit',
        members: '125K',
        activity: 'Very Active',
        description: 'Community discussions and help',
        url: `https://reddit.com/r/example?ref=learnmaster`
      },
      {
        name: `${topic} Discord`,
        platform: 'Discord',
        members: '45K',
        activity: 'Active',
        description: 'Real-time chat and support',
        url: `https://discord.gg/example?ref=learnmaster`
      },
      {
        name: `${topic} Stack Overflow`,
        platform: 'Stack Overflow',
        questions: '50K+',
        activity: 'Very Active',
        description: 'Q&A for specific problems',
        url: `https://stackoverflow.com/questions/tagged/example?ref=learnmaster`
      }
    ],

    // Podcasts
    podcasts: [
      {
        title: `The ${topic} Podcast`,
        host: 'Industry Experts',
        episodes: '150+',
        frequency: 'Weekly',
        rating: 4.8,
        url: `https://podcast-platform.com/example?ref=learnmaster`
      },
      {
        title: `${topic} Deep Dive`,
        host: 'Technical Experts',
        episodes: '80+',
        frequency: 'Bi-weekly',
        rating: 4.7,
        url: `https://podcast-platform.com/example2?ref=learnmaster`
      }
    ]
  };

  const ResourceCard = ({ icon: Icon, title, badge, children, sectionKey }) => {
    const isExpanded = expandedSections[sectionKey];
    
    return (
      <Card className="mb-4">
        <CardHeader 
          className="cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => toggleSection(sectionKey)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon className="w-6 h-6 text-indigo-600" />
              <div>
                <CardTitle className="text-lg">{title}</CardTitle>
                {badge && <Badge variant="secondary" className="mt-1">{badge}</Badge>}
              </div>
            </div>
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </CardHeader>
        {isExpanded && (
          <CardContent>
            {children}
          </CardContent>
        )}
      </Card>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Complete Learning Path: {topic}
            </h1>
            <p className="text-gray-600">
              {learningPath.overview.totalResources} curated resources • {learningPath.overview.estimatedTime} • {learningPath.overview.difficulty} level
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refine Search
          </Button>
        </div>

        {/* Key Concepts */}
        <div className="flex gap-2 flex-wrap">
          {learningPath.overview.keyConcepts.map((concept, idx) => (
            <Badge key={idx} variant="outline">{concept}</Badge>
          ))}
        </div>
      </div>

      {/* Attribution Notice */}
      <Card className="mb-6 bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="text-2xl">📊</div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Traffic Attribution Active</h3>
              <p className="text-sm text-blue-800">
                All resources include The Learn Master tracking. Content creators and platforms will see you came from our platform!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for filtering */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="colleges">Colleges</TabsTrigger>
          <TabsTrigger value="docs">Docs</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Resources */}
      <div className="space-y-4">
        {/* YouTube Videos */}
        {(activeTab === 'all' || activeTab === 'videos') && (
          <ResourceCard 
            icon={Video} 
            title="YouTube Videos" 
            badge={`${learningPath.videos.length} videos`}
            sectionKey="videos"
          >
            <div className="space-y-3">
              {learningPath.videos.map((video, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center font-semibold text-indigo-600">
                    {idx + 1}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-gray-900 mb-1">{video.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      by {video.channel} • {video.duration} • {video.views} views
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant={video.relevance === 100 ? "default" : "secondary"}>
                        {video.relevance}% relevant
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <a href={video.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      Watch
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </ResourceCard>
        )}

        {/* Online Courses */}
        {(activeTab === 'all' || activeTab === 'courses') && (
          <ResourceCard 
            icon={GraduationCap} 
            title="Online Courses" 
            badge={`${learningPath.courses.length} courses`}
            sectionKey="courses"
          >
            <div className="grid md:grid-cols-2 gap-4">
              {learningPath.courses.map((course, idx) => (
                <div key={idx} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <Badge>{course.platform}</Badge>
                    <span className="text-sm font-semibold text-indigo-600">{course.cost}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{course.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{course.provider}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>⭐ {course.rating}</span>
                    <span>{course.duration}</span>
                    <span>{course.students} students</span>
                  </div>
                  {course.certificate && (
                    <Badge variant="outline" className="mb-3">✓ Certificate Included</Badge>
                  )}
                  <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                    <a href={course.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      View Course
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </ResourceCard>
        )}

        {/* Books */}
        {(activeTab === 'all' || activeTab === 'books') && (
          <ResourceCard 
            icon={BookOpen} 
            title="Recommended Books" 
            badge={`${learningPath.books.length} books`}
            sectionKey="books"
          >
            <div className="space-y-3">
              {learningPath.books.map((book, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 w-16 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded flex items-center justify-center text-white text-2xl">
                    📖
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-gray-900 mb-1">{book.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      by {book.author} • {book.publisher} ({book.year})
                    </p>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                      <span>⭐ {book.rating}</span>
                      <span>{book.pages} pages</span>
                      <span className="font-semibold text-indigo-600">{book.price}</span>
                    </div>
                    <div className="flex gap-2">
                      {book.format.map((fmt, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{fmt}</Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <a href={book.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      Get Book
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </ResourceCard>
        )}

        {/* Colleges & Universities */}
        {(activeTab === 'all' || activeTab === 'colleges') && (
          <ResourceCard 
            icon={GraduationCap} 
            title="Colleges & Universities" 
            badge={`${learningPath.colleges.length} programs`}
            sectionKey="colleges"
          >
            <div className="space-y-4">
              {learningPath.colleges.map((college, idx) => (
                <div key={idx} className="p-4 border-2 border-purple-200 rounded-lg bg-purple-50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{college.name}</h4>
                      <p className="text-lg font-semibold text-purple-900">{college.program}</p>
                    </div>
                    <Badge variant="default">{college.type}</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                    <div>
                      <span className="text-gray-600">Duration:</span>
                      <p className="font-semibold">{college.duration}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Cost:</span>
                      <p className="font-semibold text-purple-600">{college.cost}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Format:</span>
                      <p className="font-semibold">{college.format}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Accreditation:</span>
                      <p className="font-semibold">{college.accreditation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-purple-800 mb-3">
                    <span>🎓</span>
                    <span>Recommended by The Learn Master (LM)</span>
                  </div>
                  <Button className="w-full gap-2" asChild>
                    <a href={college.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      View Program Details
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </ResourceCard>
        )}

        {/* Documentation & Articles */}
        {(activeTab === 'all' || activeTab === 'docs') && (
          <ResourceCard 
            icon={FileText} 
            title="Documentation & Articles" 
            badge={`${learningPath.documentation.length} resources`}
            sectionKey="docs"
          >
            <div className="space-y-2">
              {learningPath.documentation.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 transition-colors">
                  <div>
                    <h4 className="font-semibold text-gray-900">{doc.title}</h4>
                    <p className="text-sm text-gray-600">{doc.provider} • {doc.description}</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </ResourceCard>
        )}

        {/* Practice Platforms */}
        {(activeTab === 'all' || activeTab === 'practice') && (
          <ResourceCard 
            icon={Code} 
            title="Practice Platforms" 
            badge={`${learningPath.practice.length} platforms`}
            sectionKey="practice"
          >
            <div className="grid md:grid-cols-2 gap-4">
              {learningPath.practice.map((platform, idx) => (
                <div key={idx} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <Badge className="mb-2">{platform.type}</Badge>
                  <h4 className="font-semibold text-gray-900 mb-2">{platform.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{platform.description}</p>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-gray-600">{platform.difficulty}</span>
                    <span className="font-semibold text-indigo-600">{platform.exercises || platform.challenges}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                    <a href={platform.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      Start Practicing
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </ResourceCard>
        )}

        {/* Community Resources */}
        {(activeTab === 'all' || activeTab === 'community') && (
          <ResourceCard 
            icon={Users} 
            title="Community & Support" 
            badge={`${learningPath.community.length} communities`}
            sectionKey="community"
          >
            <div className="space-y-3">
              {learningPath.community.map((community, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-2xl">
                      👥
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{community.name}</h4>
                      <p className="text-sm text-gray-600">{community.description}</p>
                      <div className="flex gap-3 text-xs text-gray-500 mt-1">
                        <span>{community.members} members</span>
                        <span>•</span>
                        <span className="text-green-600">{community.activity}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={community.url} target="_blank" rel="noopener noreferrer">
                      Join
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </ResourceCard>
        )}

        {/* Podcasts */}
        {activeTab === 'community' && (
          <ResourceCard 
            icon={Headphones} 
            title="Podcasts" 
            badge={`${learningPath.podcasts.length} podcasts`}
            sectionKey="podcasts"
          >
            <div className="grid md:grid-cols-2 gap-4">
              {learningPath.podcasts.map((podcast, idx) => (
                <div key={idx} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Headphones className="w-5 h-5 text-indigo-600" />
                    <Badge variant="outline">{podcast.frequency}</Badge>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{podcast.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">by {podcast.host}</p>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span>⭐ {podcast.rating}</span>
                    <span>{podcast.episodes} episodes</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                    <a href={podcast.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      Listen
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </ResourceCard>
        )}
      </div>

      {/* Refine Search Section */}
      <Card className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Want to refine your search?</h3>
              <p className="text-sm text-gray-600">
                Get more specific results by refining your topic or adding more details
              </p>
            </div>
            <Button className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Refine Topic
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedLearningPath;

