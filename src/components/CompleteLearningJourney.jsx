import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GraduationCap, 
  Video, 
  BookOpen,
  Award,
  Building2,
  TrendingUp,
  ExternalLink,
  Info,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const CompleteLearningJourney = ({ topic, userLevel }) => {
  const [activeStage, setActiveStage] = useState('foundation');

  // Complete learning journey from YouTube to PhD
  const learningJourney = {
    topic: topic,
    
    // Stage 1: Foundation Learning (YouTube + Free Resources)
    foundation: {
      title: 'Foundation Learning',
      subtitle: 'Start with free, flexible resources',
      duration: '1-3 months',
      cost: 'FREE',
      commitment: 'Self-paced, 5-10 hours/week',
      description: 'Begin your learning journey with curated YouTube videos, articles, and free tutorials. Perfect for exploring the topic and building foundational knowledge.',
      
      resources: [
        {
          type: 'video',
          title: 'Introduction to ' + topic,
          provider: 'YouTube',
          timestamp: '0:00 - 12:30',
          duration: '12 min',
          free: true
        },
        {
          type: 'article',
          title: 'Understanding ' + topic + ' Basics',
          provider: 'Medium / Dev.to',
          duration: '8 min read',
          free: true
        },
        {
          type: 'video',
          title: 'Core Concepts of ' + topic,
          provider: 'YouTube',
          timestamp: '5:15 - 18:45',
          duration: '13 min',
          free: true
        },
        {
          type: 'practice',
          title: 'Hands-on Exercises',
          provider: 'Interactive Platforms',
          duration: '2-3 hours',
          free: true
        }
      ],
      
      outcomes: [
        'Understand fundamental concepts',
        'Explore if this topic interests you',
        'Build basic practical skills',
        'Decide if you want to go deeper'
      ],
      
      nextStep: 'Ready for structured learning? Move to online courses and certifications.',
      
      attribution: '🎯 All resources curated and tracked by The Learn Master (LM)'
    },

    // Stage 2: Structured Learning (Courses + Certifications)
    structured: {
      title: 'Structured Learning',
      subtitle: 'Professional courses and certifications',
      duration: '3-12 months',
      cost: '$50-$500/month (or $5K-$20K for bootcamps)',
      commitment: '10-20 hours/week',
      description: 'Take your skills to a professional level with structured online courses, industry-recognized certifications, and intensive bootcamps.',
      
      resources: [
        {
          type: 'course',
          title: topic + ' Specialization',
          provider: 'Coursera',
          institution: 'Stanford University / Google',
          duration: '3-6 months',
          cost: '$49/month',
          certificate: true,
          url: 'https://coursera.org?ref=learnmaster'
        },
        {
          type: 'course',
          title: 'Complete ' + topic + ' Bootcamp',
          provider: 'Udemy',
          instructor: 'Industry Expert',
          duration: '40 hours',
          cost: '$89.99 (often on sale)',
          certificate: true,
          url: 'https://udemy.com?ref=learnmaster'
        },
        {
          type: 'bootcamp',
          title: topic + ' Intensive Bootcamp',
          provider: 'General Assembly / Le Wagon',
          duration: '12 weeks full-time',
          cost: '$12,000-$15,000',
          certificate: true,
          jobPlacement: '85% placement rate',
          url: 'https://generalassemb.ly?ref=learnmaster'
        },
        {
          type: 'certification',
          title: 'Professional ' + topic + ' Certification',
          provider: 'AWS / Google / Microsoft',
          duration: '2-4 months prep',
          cost: '$300-$500 exam fee',
          industryRecognized: true,
          url: 'https://aws.amazon.com/certification?ref=learnmaster'
        }
      ],
      
      outcomes: [
        'Industry-recognized certifications',
        'Portfolio of real-world projects',
        'Job-ready professional skills',
        'Networking with peers and instructors',
        'Career services and job placement support'
      ],
      
      nextStep: 'Want formal credentials? Explore university degrees and advanced programs.',
      
      attribution: '🎓 Recommended by The Learn Master (LM) - We may earn referral fees'
    },

    // Stage 3: Formal Education (Universities + Degrees)
    formal: {
      title: 'Formal Education',
      subtitle: 'University degrees and advanced credentials',
      duration: '1-4 years',
      cost: '$7K-$100K+ (varies widely)',
      commitment: 'Full-time or part-time study',
      description: 'Earn formal degrees from accredited universities. Ideal for research careers, academic positions, or roles requiring advanced credentials.',
      
      programs: [
        {
          type: 'certificate',
          title: 'Graduate Certificate in ' + topic,
          institution: 'Stanford Online',
          duration: '6-12 months',
          cost: '$3,000-$5,000',
          format: 'Online, part-time',
          accreditation: 'Stanford University',
          url: 'https://online.stanford.edu?ref=learnmaster'
        },
        {
          type: 'bachelors',
          title: 'Bachelor of Science in ' + topic,
          institution: 'University of London / ASU Online',
          duration: '3-4 years',
          cost: '$15,000-$60,000 total',
          format: 'Online or on-campus',
          accreditation: 'Regionally accredited',
          url: 'https://www.london.ac.uk?ref=learnmaster'
        },
        {
          type: 'masters',
          title: 'Master of Science in ' + topic,
          institution: 'Georgia Tech OMSCS',
          duration: '2-3 years',
          cost: '$7,000 total (online)',
          format: 'Online, part-time',
          accreditation: 'ABET accredited',
          ranking: 'Top 10 CS program',
          url: 'https://omscs.gatech.edu?ref=learnmaster'
        },
        {
          type: 'masters',
          title: 'Master of Science in ' + topic,
          institution: 'MIT / Stanford / CMU',
          duration: '2 years',
          cost: '$80,000-$120,000',
          format: 'On-campus, full-time',
          accreditation: 'Top-tier university',
          ranking: '#1-5 globally',
          url: 'https://www.mit.edu?ref=learnmaster'
        },
        {
          type: 'phd',
          title: 'PhD in ' + topic,
          institution: 'Research Universities',
          duration: '4-6 years',
          cost: 'Usually funded (stipend provided)',
          format: 'Full-time research',
          outcomes: 'Research career, faculty positions',
          url: 'https://www.phds.org?ref=learnmaster'
        },
        {
          type: 'free',
          title: 'Free University Courses',
          institution: 'MIT OpenCourseWare',
          duration: 'Self-paced',
          cost: 'FREE',
          format: 'Online, self-paced',
          note: 'No certificate, but same content as MIT students',
          url: 'https://ocw.mit.edu?ref=learnmaster'
        }
      ],
      
      outcomes: [
        'Formal degree from accredited university',
        'Deep theoretical and research knowledge',
        'Academic credentials for advanced careers',
        'Access to university resources and network',
        'Qualification for research and faculty positions'
      ],
      
      considerations: [
        {
          question: 'Do you need a degree?',
          answer: 'Not always! Many tech jobs value skills and portfolio over degrees. Consider your career goals carefully.'
        },
        {
          question: 'Online vs On-campus?',
          answer: 'Online programs (like Georgia Tech OMSCS at $7K) offer same degree as on-campus for fraction of cost.'
        },
        {
          question: 'When to pursue formal education?',
          answer: 'If you want to: do research, teach at university level, work in regulated industries, or pursue advanced specialization.'
        }
      ],
      
      attribution: '🎓 Recommended by The Learn Master (LM) - We may earn referral fees from partner institutions'
    }
  };

  const StageCard = ({ stage, stageKey, isActive }) => {
    const stageData = learningJourney[stageKey];
    
    return (
      <Card 
        className={`cursor-pointer transition-all ${
          isActive ? 'ring-2 ring-indigo-500 shadow-lg' : 'hover:shadow-md'
        }`}
        onClick={() => setActiveStage(stageKey)}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {stageKey === 'foundation' && <Video className="w-6 h-6 text-red-600" />}
              {stageKey === 'structured' && <Award className="w-6 h-6 text-purple-600" />}
              {stageKey === 'formal' && <GraduationCap className="w-6 h-6 text-blue-600" />}
              <div>
                <CardTitle>{stageData.title}</CardTitle>
                <CardDescription>{stageData.subtitle}</CardDescription>
              </div>
            </div>
            {isActive && <CheckCircle2 className="w-5 h-5 text-indigo-600" />}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-semibold">{stageData.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cost:</span>
              <span className="font-semibold text-green-600">{stageData.cost}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Commitment:</span>
              <span className="font-semibold">{stageData.commitment}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const activeStageData = learningJourney[activeStage];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Complete Learning Journey: {topic}
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          From free YouTube videos to university degrees - your complete path to mastery
        </p>
        <Badge variant="outline" className="text-sm">
          <Sparkles className="w-4 h-4 mr-1" />
          Curated by The Learn Master (LM)
        </Badge>
      </div>

      {/* Learning Journey Visualization */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-2 mx-auto">
              <Video className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-sm font-semibold">Foundation</p>
            <p className="text-xs text-gray-600">FREE</p>
          </div>
          
          <ArrowRight className="w-6 h-6 text-gray-400" />
          
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-2 mx-auto">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-sm font-semibold">Structured</p>
            <p className="text-xs text-gray-600">$50-500/mo</p>
          </div>
          
          <ArrowRight className="w-6 h-6 text-gray-400" />
          
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2 mx-auto">
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-sm font-semibold">Formal</p>
            <p className="text-xs text-gray-600">$7K-100K+</p>
          </div>
        </div>
      </div>

      {/* Stage Selection */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <StageCard stage="foundation" stageKey="foundation" isActive={activeStage === 'foundation'} />
        <StageCard stage="structured" stageKey="structured" isActive={activeStage === 'structured'} />
        <StageCard stage="formal" stageKey="formal" isActive={activeStage === 'formal'} />
      </div>

      {/* Active Stage Details */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">{activeStageData.title}</CardTitle>
          <CardDescription className="text-base">{activeStageData.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Foundation Stage */}
          {activeStage === 'foundation' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">📚 Learning Resources</h3>
                <div className="space-y-3">
                  {activeStageData.resources.map((resource, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                        {resource.type === 'video' && <Video className="w-5 h-5 text-red-600" />}
                        {resource.type === 'article' && <BookOpen className="w-5 h-5 text-green-600" />}
                        {resource.type === 'practice' && <CheckCircle2 className="w-5 h-5 text-orange-600" />}
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                        <p className="text-sm text-gray-600">
                          {resource.provider} • {resource.duration}
                          {resource.timestamp && <span className="text-red-600 font-semibold ml-2">⏱️ {resource.timestamp}</span>}
                        </p>
                        {resource.free && <Badge variant="outline" className="mt-1">FREE</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">🎯 What You'll Achieve</h3>
                <ul className="space-y-2">
                  {activeStageData.outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <p className="text-sm text-blue-900">
                  <strong>Next Step:</strong> {activeStageData.nextStep}
                </p>
              </div>

              <div className="text-xs text-gray-600 text-center">
                {activeStageData.attribution}
              </div>
            </div>
          )}

          {/* Structured Stage */}
          {activeStage === 'structured' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">🎓 Courses & Certifications</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {activeStageData.resources.map((resource, idx) => (
                    <Card key={idx} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <Badge>{resource.type}</Badge>
                          <span className="text-sm font-semibold text-indigo-600">{resource.cost}</span>
                        </div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <CardDescription>{resource.provider}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm mb-4">
                          {resource.institution && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Institution:</span>
                              <span className="font-semibold">{resource.institution}</span>
                            </div>
                          )}
                          {resource.instructor && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Instructor:</span>
                              <span className="font-semibold">{resource.instructor}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-semibold">{resource.duration}</span>
                          </div>
                          {resource.certificate && (
                            <Badge variant="outline" className="mt-2">✓ Certificate Included</Badge>
                          )}
                          {resource.jobPlacement && (
                            <Badge variant="outline" className="mt-2 bg-green-50">💼 {resource.jobPlacement}</Badge>
                          )}
                          {resource.industryRecognized && (
                            <Badge variant="outline" className="mt-2 bg-purple-50">⭐ Industry Recognized</Badge>
                          )}
                        </div>
                        <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            Learn More
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">🎯 What You'll Achieve</h3>
                <ul className="space-y-2">
                  {activeStageData.outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <p className="text-sm text-blue-900">
                  <strong>Next Step:</strong> {activeStageData.nextStep}
                </p>
              </div>

              <div className="text-xs text-gray-600 text-center">
                {activeStageData.attribution}
              </div>
            </div>
          )}

          {/* Formal Education Stage */}
          {activeStage === 'formal' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">🎓 University Programs & Degrees</h3>
                <div className="space-y-4">
                  {activeStageData.programs.map((program, idx) => (
                    <Card key={idx} className="border-2 border-purple-200 hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-purple-600" />
                            <Badge variant={program.type === 'free' ? 'default' : 'outline'}>
                              {program.type}
                            </Badge>
                          </div>
                          <span className="text-sm font-bold text-purple-600">{program.cost}</span>
                        </div>
                        <CardTitle className="text-lg">{program.title}</CardTitle>
                        <CardDescription className="font-semibold">{program.institution}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                          <div>
                            <span className="text-gray-600">Duration:</span>
                            <p className="font-semibold">{program.duration}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Format:</span>
                            <p className="font-semibold">{program.format}</p>
                          </div>
                          {program.accreditation && (
                            <div className="col-span-2">
                              <span className="text-gray-600">Accreditation:</span>
                              <p className="font-semibold text-green-600">{program.accreditation}</p>
                            </div>
                          )}
                          {program.ranking && (
                            <div className="col-span-2">
                              <Badge variant="outline" className="bg-yellow-50">⭐ {program.ranking}</Badge>
                            </div>
                          )}
                          {program.outcomes && (
                            <div className="col-span-2">
                              <span className="text-gray-600">Career Outcomes:</span>
                              <p className="font-semibold">{program.outcomes}</p>
                            </div>
                          )}
                          {program.note && (
                            <div className="col-span-2">
                              <p className="text-xs text-gray-600 italic">{program.note}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-purple-800 mb-3 bg-purple-50 p-2 rounded">
                          <span>🎓</span>
                          <span>Recommended by The Learn Master (LM)</span>
                        </div>
                        <Button className="w-full gap-2" asChild>
                          <a href={program.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            View Program Details
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">🎯 What You'll Achieve</h3>
                <ul className="space-y-2">
                  {activeStageData.outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">💡 Important Considerations</h3>
                <div className="space-y-4">
                  {activeStageData.considerations.map((item, idx) => (
                    <div key={idx} className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                      <p className="font-semibold text-yellow-900 mb-1">{item.question}</p>
                      <p className="text-sm text-yellow-800">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-xs text-gray-600 text-center">
                {activeStageData.attribution}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Ready to Start Your Learning Journey?
            </h3>
            <p className="text-gray-600 mb-4">
              Begin with free resources, progress to certifications, or jump straight to formal education - the choice is yours!
            </p>
            <div className="flex gap-3 justify-center">
              <Button size="lg" onClick={() => setActiveStage('foundation')}>
                Start with FREE Resources
              </Button>
              <Button size="lg" variant="outline" onClick={() => setActiveStage('formal')}>
                Explore Degrees
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompleteLearningJourney;

