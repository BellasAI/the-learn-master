import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  BookOpen, 
  Video, 
  FileText, 
  GraduationCap,
  Clock,
  CheckCircle2,
  Circle,
  Play,
  ExternalLink,
  Sparkles,
  ChevronRight,
  Info
} from 'lucide-react';

const IntelligentLearningPath = ({ topic, userLevel, description }) => {
  const [selectedResources, setSelectedResources] = useState({
    videos: true,
    books: true,
    articles: true,
    courses: true,
    practice: true
  });
  
  const [viewMode, setViewMode] = useState('structured'); // 'structured' or 'list'
  const [completedSteps, setCompletedSteps] = useState([]);

  const toggleResource = (type) => {
    setSelectedResources(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const markComplete = (stepId) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  // AI-generated structured learning path
  const structuredPath = {
    topic: topic,
    totalDuration: '8-12 weeks',
    estimatedHours: 120,
    
    phases: [
      {
        id: 'phase-1',
        title: 'Phase 1: Foundations',
        duration: '2-3 weeks',
        hours: 25,
        description: 'Build a solid understanding of core concepts and terminology',
        steps: [
          {
            id: 'step-1-1',
            type: 'video',
            title: 'Introduction to Quantum Computing',
            resource: 'Quantum Computing Explained - Basics',
            channel: 'Educational Channel',
            timestamp: { start: '0:00', end: '12:30' },
            duration: '12:30',
            description: 'Watch the introduction section to understand what quantum computing is and why it matters',
            why: 'This provides the essential context you need before diving into technical details',
            prerequisites: [],
            url: 'https://youtube.com/watch?v=example1&t=0s&ref=learnmaster'
          },
          {
            id: 'step-1-2',
            type: 'article',
            title: 'Classical vs Quantum Computing',
            resource: 'Understanding the Fundamental Differences',
            provider: 'Medium',
            readTime: '8 min',
            description: 'Read sections 1-3 to understand how quantum computers differ from traditional computers',
            why: 'This article builds on the video by explaining the key differences in computational approaches',
            prerequisites: ['step-1-1'],
            url: 'https://medium.com/example?ref=learnmaster'
          },
          {
            id: 'step-1-3',
            type: 'video',
            title: 'What is a Qubit?',
            resource: 'Quantum Computing Fundamentals',
            channel: 'Expert Tutorials',
            timestamp: { start: '5:15', end: '18:45' },
            duration: '13:30',
            description: 'Watch ONLY the qubit explanation segment - skip the intro and advanced topics for now',
            why: 'Qubits are the building blocks of quantum computing. This focused segment explains them clearly without overwhelming you',
            prerequisites: ['step-1-1', 'step-1-2'],
            url: 'https://youtube.com/watch?v=example2&t=315s&ref=learnmaster'
          },
          {
            id: 'step-1-4',
            type: 'book',
            title: 'Quantum Computing Basics',
            resource: 'Chapter 1: Introduction to Quantum Mechanics',
            author: 'Dr. Expert Name',
            pages: '1-25',
            readTime: '45 min',
            description: 'Read the first chapter to get a deeper theoretical understanding',
            why: 'The book provides mathematical foundations that videos can\'t fully explain',
            prerequisites: ['step-1-3'],
            url: 'https://amazon.com/dp/example?tag=learnmaster-20'
          },
          {
            id: 'step-1-5',
            type: 'practice',
            title: 'Foundations Quiz',
            resource: 'Test Your Understanding',
            platform: 'Interactive Platform',
            exercises: 10,
            description: 'Complete 10 multiple-choice questions to verify your understanding',
            why: 'This ensures you\'ve grasped the fundamentals before moving to more complex topics',
            prerequisites: ['step-1-1', 'step-1-2', 'step-1-3', 'step-1-4'],
            url: 'https://practice-platform.com/quiz?ref=learnmaster'
          }
        ]
      },
      {
        id: 'phase-2',
        title: 'Phase 2: Core Concepts',
        duration: '3-4 weeks',
        hours: 40,
        description: 'Master the key principles of quantum computing',
        steps: [
          {
            id: 'step-2-1',
            type: 'video',
            title: 'Quantum Superposition',
            resource: 'Advanced Quantum Concepts',
            channel: 'Pro Academy',
            timestamp: { start: '2:30', end: '10:00' },
            duration: '7:30',
            description: 'Watch the superposition explanation segment',
            why: 'Superposition is one of the most important quantum phenomena - this segment explains it with clear examples',
            prerequisites: ['step-1-5'],
            url: 'https://youtube.com/watch?v=example3&t=150s&ref=learnmaster'
          },
          {
            id: 'step-2-2',
            type: 'video',
            title: 'Quantum Entanglement',
            resource: 'Advanced Quantum Concepts',
            channel: 'Pro Academy',
            timestamp: { start: '15:30', end: '25:15' },
            duration: '9:45',
            description: 'Continue with the entanglement section from the same video',
            why: 'Entanglement builds directly on superposition - watching these segments back-to-back creates a coherent understanding',
            prerequisites: ['step-2-1'],
            url: 'https://youtube.com/watch?v=example3&t=930s&ref=learnmaster'
          },
          {
            id: 'step-2-3',
            type: 'article',
            title: 'Quantum Gates Explained',
            resource: 'Understanding Quantum Logic Gates',
            provider: 'Quantum Computing Weekly',
            readTime: '12 min',
            description: 'Read the complete article on quantum gates',
            why: 'Gates are how we manipulate qubits - this article provides the bridge between theory and practical implementation',
            prerequisites: ['step-2-2'],
            url: 'https://example.com/quantum-gates?ref=learnmaster'
          },
          {
            id: 'step-2-4',
            type: 'course',
            title: 'Quantum Algorithms Module',
            resource: 'Introduction to Quantum Algorithms',
            platform: 'Coursera',
            duration: '2 weeks',
            description: 'Complete weeks 1-2 of the quantum algorithms course',
            why: 'This structured course ties together all the concepts you\'ve learned and shows how they\'re used in real algorithms',
            prerequisites: ['step-2-1', 'step-2-2', 'step-2-3'],
            url: 'https://coursera.org/learn/quantum-algorithms?ref=learnmaster'
          },
          {
            id: 'step-2-5',
            type: 'practice',
            title: 'Build Your First Quantum Circuit',
            resource: 'Hands-on Quantum Programming',
            platform: 'IBM Quantum Experience',
            exercises: 5,
            description: 'Create 5 basic quantum circuits using IBM\'s visual interface',
            why: 'Hands-on practice solidifies your understanding and shows you how theory translates to practice',
            prerequisites: ['step-2-4'],
            url: 'https://quantum-computing.ibm.com?ref=learnmaster'
          }
        ]
      },
      {
        id: 'phase-3',
        title: 'Phase 3: Practical Applications',
        duration: '3-5 weeks',
        hours: 55,
        description: 'Apply your knowledge to real-world quantum computing problems',
        steps: [
          {
            id: 'step-3-1',
            type: 'video',
            title: 'Real-World Quantum Applications',
            resource: 'Quantum Computing in Industry',
            channel: 'Tech Insights',
            timestamp: { start: '8:00', end: '22:30' },
            duration: '14:30',
            description: 'Watch the applications overview - skip the theoretical recap at the beginning',
            why: 'See how companies like Google, IBM, and startups are using quantum computing today',
            prerequisites: ['step-2-5'],
            url: 'https://youtube.com/watch?v=example4&t=480s&ref=learnmaster'
          },
          {
            id: 'step-3-2',
            type: 'book',
            title: 'Quantum Algorithms in Practice',
            resource: 'Chapters 5-7: Shor\'s and Grover\'s Algorithms',
            author: 'Industry Expert',
            pages: '120-185',
            readTime: '2 hours',
            description: 'Deep dive into the two most famous quantum algorithms',
            why: 'These algorithms demonstrate quantum advantage - understanding them is crucial for practical work',
            prerequisites: ['step-3-1'],
            url: 'https://amazon.com/dp/example2?tag=learnmaster-20'
          },
          {
            id: 'step-3-3',
            type: 'video',
            title: 'Implementing Shor\'s Algorithm',
            resource: 'Quantum Programming Tutorial',
            channel: 'Code Academy',
            timestamp: { start: '12:00', end: '35:45' },
            duration: '23:45',
            description: 'Watch the implementation walkthrough',
            why: 'See how the theory from the book translates into actual code',
            prerequisites: ['step-3-2'],
            url: 'https://youtube.com/watch?v=example5&t=720s&ref=learnmaster'
          },
          {
            id: 'step-3-4',
            type: 'practice',
            title: 'Capstone Project',
            resource: 'Build a Quantum Application',
            platform: 'Project Platform',
            exercises: 1,
            description: 'Create a complete quantum computing project of your choice',
            why: 'This project demonstrates your mastery and gives you portfolio material',
            prerequisites: ['step-3-1', 'step-3-2', 'step-3-3'],
            url: 'https://project-platform.com?ref=learnmaster'
          }
        ]
      }
    ]
  };

  // Separate lists view
  const separateLists = {
    videos: [
      {
        title: 'Introduction to Quantum Computing',
        channel: 'Educational Channel',
        duration: '45:30',
        segments: [
          { title: 'What is Quantum Computing?', start: '0:00', end: '12:30' },
          { title: 'History of Quantum Computing', start: '12:30', end: '25:00' },
          { title: 'Why Quantum Matters', start: '25:00', end: '35:15' }
        ],
        url: 'https://youtube.com/watch?v=example1&ref=learnmaster'
      },
      {
        title: 'Quantum Computing Fundamentals',
        channel: 'Expert Tutorials',
        duration: '1:15:20',
        segments: [
          { title: 'Introduction', start: '0:00', end: '5:15' },
          { title: 'What is a Qubit?', start: '5:15', end: '18:45' },
          { title: 'Quantum States', start: '18:45', end: '32:00' },
          { title: 'Measurement', start: '32:00', end: '45:30' }
        ],
        url: 'https://youtube.com/watch?v=example2&ref=learnmaster'
      }
    ],
    books: [
      {
        title: 'Quantum Computing Basics',
        author: 'Dr. Expert Name',
        chapters: [
          { number: 1, title: 'Introduction to Quantum Mechanics', pages: '1-25' },
          { number: 2, title: 'Qubits and Quantum States', pages: '26-55' },
          { number: 3, title: 'Quantum Gates', pages: '56-90' }
        ],
        url: 'https://amazon.com/dp/example?tag=learnmaster-20'
      }
    ],
    articles: [
      {
        title: 'Classical vs Quantum Computing',
        provider: 'Medium',
        readTime: '8 min',
        sections: ['Introduction', 'Key Differences', 'When to Use Each', 'Future Outlook'],
        url: 'https://medium.com/example?ref=learnmaster'
      }
    ]
  };

  const ResourceIcon = ({ type }) => {
    const icons = {
      video: Video,
      book: BookOpen,
      article: FileText,
      course: GraduationCap,
      practice: CheckCircle2
    };
    const Icon = icons[type] || Circle;
    return <Icon className="w-5 h-5" />;
  };

  const StepCard = ({ step, phaseId, isCompleted }) => {
    const hasPrereqs = step.prerequisites && step.prerequisites.length > 0;
    const prereqsMet = !hasPrereqs || step.prerequisites.every(id => completedSteps.includes(id));
    
    return (
      <Card className={`mb-4 ${isCompleted ? 'bg-green-50 border-green-200' : prereqsMet ? '' : 'opacity-50'}`}>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            {/* Completion Checkbox */}
            <div className="flex-shrink-0 mt-1">
              <button
                onClick={() => markComplete(step.id)}
                disabled={!prereqsMet}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                  ${isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-green-500'}
                  ${!prereqsMet ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {isCompleted && <CheckCircle2 className="w-4 h-4 text-white" />}
              </button>
            </div>

            {/* Resource Icon */}
            <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
              ${step.type === 'video' ? 'bg-red-100 text-red-600' : ''}
              ${step.type === 'book' ? 'bg-blue-100 text-blue-600' : ''}
              ${step.type === 'article' ? 'bg-green-100 text-green-600' : ''}
              ${step.type === 'course' ? 'bg-purple-100 text-purple-600' : ''}
              ${step.type === 'practice' ? 'bg-orange-100 text-orange-600' : ''}
            `}>
              <ResourceIcon type={step.type} />
            </div>

            {/* Content */}
            <div className="flex-grow">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.resource}</p>
                </div>
                <Badge variant="outline">{step.type}</Badge>
              </div>

              {/* Metadata */}
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                {step.channel && <span>📺 {step.channel}</span>}
                {step.author && <span>📖 {step.author}</span>}
                {step.provider && <span>📄 {step.provider}</span>}
                {step.platform && <span>💻 {step.platform}</span>}
                {step.timestamp && (
                  <span className="font-semibold text-red-600">
                    ⏱️ {step.timestamp.start} - {step.timestamp.end}
                  </span>
                )}
                {step.duration && <span>⏱️ {step.duration}</span>}
                {step.readTime && <span>📚 {step.readTime}</span>}
                {step.pages && <span>📄 Pages {step.pages}</span>}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-700 mb-2">{step.description}</p>

              {/* Why this step */}
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-3">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-1">Why this step?</p>
                    <p className="text-sm text-blue-800">{step.why}</p>
                  </div>
                </div>
              </div>

              {/* Prerequisites */}
              {hasPrereqs && (
                <div className="text-xs text-gray-500 mb-3">
                  Prerequisites: {step.prerequisites.map(id => {
                    const met = completedSteps.includes(id);
                    return (
                      <span key={id} className={met ? 'text-green-600' : 'text-gray-500'}>
                        {met ? '✓' : '○'} {id}
                      </span>
                    );
                  }).reduce((prev, curr) => [prev, ', ', curr])}
                </div>
              )}

              {/* Action Button */}
              <Button 
                variant={prereqsMet ? "default" : "outline"}
                size="sm" 
                className="gap-2"
                disabled={!prereqsMet}
                asChild={prereqsMet}
              >
                {prereqsMet ? (
                  <a href={step.url} target="_blank" rel="noopener noreferrer">
                    <Play className="w-4 h-4" />
                    {step.type === 'video' ? 'Watch Segment' : 
                     step.type === 'book' ? 'Read Chapter' :
                     step.type === 'article' ? 'Read Article' :
                     step.type === 'course' ? 'Start Course' :
                     'Start Practice'}
                  </a>
                ) : (
                  <span>Complete prerequisites first</span>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Your Personalized Learning Path: {topic}
        </h1>
        <p className="text-gray-600 mb-4">
          {structuredPath.totalDuration} • {structuredPath.estimatedHours} hours • {userLevel} level
        </p>

        {/* Resource Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Customize Your Learning Path
            </CardTitle>
            <CardDescription>
              Choose which types of resources you want to include in your learning path
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {Object.entries(selectedResources).map(([type, selected]) => (
                <div key={type} className="flex items-center gap-2">
                  <Checkbox 
                    id={type}
                    checked={selected}
                    onCheckedChange={() => toggleResource(type)}
                  />
                  <label htmlFor={type} className="text-sm font-medium capitalize cursor-pointer">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* View Mode Toggle */}
        <div className="flex gap-2">
          <Button 
            variant={viewMode === 'structured' ? 'default' : 'outline'}
            onClick={() => setViewMode('structured')}
          >
            📚 Structured Path (Recommended)
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'default' : 'outline'}
            onClick={() => setViewMode('list')}
          >
            📋 Separate Lists
          </Button>
        </div>
      </div>

      {/* Structured Path View */}
      {viewMode === 'structured' && (
        <div>
          {/* AI Curation Notice */}
          <Card className="mb-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-purple-900 mb-1">
                    AI-Curated Learning Path
                  </h3>
                  <p className="text-sm text-purple-800">
                    Manus has analyzed hundreds of resources and created this optimized learning path specifically for you. 
                    Each step builds on the previous one, with video timestamps pointing to exact segments you need to watch.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Overview */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-gray-600">
                  {completedSteps.length} / {structuredPath.phases.reduce((sum, phase) => sum + phase.steps.length, 0)} steps completed
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(completedSteps.length / structuredPath.phases.reduce((sum, phase) => sum + phase.steps.length, 0)) * 100}%` 
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Phases */}
          {structuredPath.phases.map((phase, phaseIdx) => (
            <div key={phase.id} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                  {phaseIdx + 1}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{phase.title}</h2>
                  <p className="text-sm text-gray-600">
                    {phase.duration} • {phase.hours} hours • {phase.steps.length} steps
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-6 ml-13">{phase.description}</p>

              {/* Steps */}
              <div className="ml-13">
                {phase.steps.map(step => (
                  <StepCard 
                    key={step.id}
                    step={step}
                    phaseId={phase.id}
                    isCompleted={completedSteps.includes(step.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Separate Lists View */}
      {viewMode === 'list' && (
        <div className="space-y-6">
          {/* Videos List */}
          {selectedResources.videos && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-red-600" />
                  YouTube Videos ({separateLists.videos.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {separateLists.videos.map((video, idx) => (
                  <div key={idx} className="mb-6 last:mb-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{video.title}</h4>
                        <p className="text-sm text-gray-600">{video.channel} • {video.duration}</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={video.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                    <div className="ml-4 space-y-2">
                      <p className="text-sm font-semibold text-gray-700 mb-2">📍 Key Segments:</p>
                      {video.segments.map((segment, segIdx) => (
                        <div key={segIdx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div>
                            <span className="text-sm font-medium text-gray-900">{segment.title}</span>
                            <span className="text-sm text-red-600 ml-2">
                              {segment.start} - {segment.end}
                            </span>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <a href={`${video.url}&t=${segment.start.replace(':', 'm')}s`} target="_blank" rel="noopener noreferrer">
                              <Play className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Books List */}
          {selectedResources.books && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Books ({separateLists.books.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {separateLists.books.map((book, idx) => (
                  <div key={idx} className="mb-6 last:mb-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{book.title}</h4>
                        <p className="text-sm text-gray-600">by {book.author}</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={book.url} target="_blank" rel="noopener noreferrer">
                          Get Book
                        </a>
                      </Button>
                    </div>
                    <div className="ml-4 space-y-2">
                      <p className="text-sm font-semibold text-gray-700 mb-2">📖 Recommended Chapters:</p>
                      {book.chapters.map((chapter, chapIdx) => (
                        <div key={chapIdx} className="p-2 bg-gray-50 rounded">
                          <span className="text-sm font-medium text-gray-900">
                            Chapter {chapter.number}: {chapter.title}
                          </span>
                          <span className="text-sm text-blue-600 ml-2">
                            (Pages {chapter.pages})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Articles List */}
          {selectedResources.articles && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  Articles & Documentation ({separateLists.articles.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {separateLists.articles.map((article, idx) => (
                  <div key={idx} className="mb-4 last:mb-0 p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{article.title}</h4>
                        <p className="text-sm text-gray-600">{article.provider} • {article.readTime}</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                          Read
                        </a>
                      </Button>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {article.sections.map((section, secIdx) => (
                        <Badge key={secIdx} variant="outline">{section}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default IntelligentLearningPath;

