/**
 * Formal Education Resources
 * 
 * Provides links to universities, colleges, and structured learning programs
 * for users who want formal credentials and degrees.
 */

export function getFormalEducationOptions(topic, level = 'beginner') {
  // Analyze topic to determine relevant educational institutions
  const topicLower = topic.toLowerCase()
  
  const options = {
    universities: [],
    onlineDegrees: [],
    certifications: [],
    bootcamps: []
  }

  // Technology & Programming
  if (topicLower.includes('programming') || topicLower.includes('software') || 
      topicLower.includes('python') || topicLower.includes('javascript') ||
      topicLower.includes('web development') || topicLower.includes('data science')) {
    
    options.universities = [
      {
        name: 'MIT OpenCourseWare',
        program: 'Computer Science & Programming',
        type: 'Free Courses',
        url: 'https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/?ref=learnmaster&utm_source=learnmaster&utm_campaign=formal_education',
        description: 'Free course materials from MIT',
        credential: 'Certificate of Completion',
        duration: 'Self-paced',
        cost: 'Free'
      },
      {
        name: 'Stanford Online',
        program: 'Computer Science',
        type: 'Online Degrees & Certificates',
        url: 'https://online.stanford.edu/programs?ref=learnmaster&utm_source=learnmaster&utm_campaign=formal_education',
        description: 'Stanford University online programs',
        credential: 'Graduate Certificate / Master\'s Degree',
        duration: '1-2 years',
        cost: '$15,000 - $50,000'
      },
      {
        name: 'Harvard Extension School',
        program: 'Software Engineering',
        type: 'Online Degrees',
        url: 'https://www.extension.harvard.edu/?ref=learnmaster&utm_source=learnmaster&utm_campaign=formal_education',
        description: 'Harvard University extension programs',
        credential: 'Graduate Certificate / Master\'s Degree',
        duration: '1-3 years',
        cost: '$20,000 - $40,000'
      }
    ]

    options.onlineDegrees = [
      {
        name: 'Georgia Tech OMSCS',
        program: 'Master of Science in Computer Science',
        type: 'Online Master\'s Degree',
        url: 'https://omscs.gatech.edu/?ref=learnmaster&utm_source=learnmaster&utm_campaign=formal_education',
        description: 'Affordable online MS in CS from top-ranked university',
        credential: 'Master\'s Degree',
        duration: '2-3 years',
        cost: '$7,000 - $10,000 total'
      },
      {
        name: 'University of Illinois',
        program: 'Master of Computer Science (MCS)',
        type: 'Online Master\'s Degree',
        url: 'https://cs.illinois.edu/academics/graduate/professional-mcs?ref=learnmaster&utm_source=learnmaster&utm_campaign=formal_education',
        description: 'Online master\'s degree in computer science',
        credential: 'Master\'s Degree',
        duration: '2-3 years',
        cost: '$20,000 - $25,000 total'
      }
    ]

    options.bootcamps = [
      {
        name: 'General Assembly',
        program: 'Software Engineering Immersive',
        type: 'Coding Bootcamp',
        url: 'https://generalassemb.ly/?ref=learnmaster&utm_source=learnmaster&utm_campaign=formal_education',
        description: 'Intensive full-stack development bootcamp',
        credential: 'Certificate',
        duration: '12 weeks',
        cost: '$15,000'
      },
      {
        name: 'App Academy',
        program: 'Software Engineering',
        type: 'Coding Bootcamp',
        url: 'https://www.appacademy.io/?ref=learnmaster&utm_source=learnmaster&utm_campaign=formal_education',
        description: 'Pay after you get a job model',
        credential: 'Certificate',
        duration: '16-24 weeks',
        cost: 'Deferred tuition'
      }
    ]
  }

  // AI & Machine Learning
  if (topicLower.includes('ai') || topicLower.includes('artificial intelligence') ||
      topicLower.includes('machine learning') || topicLower.includes('deep learning')) {
    
    options.universities.push(
      {
        name: 'Carnegie Mellon University',
        program: 'Master of Science in Artificial Intelligence',
        type: 'Online Master\'s Degree',
        url: 'https://www.cmu.edu/online/?ref=learnmaster&utm_source=learnmaster&utm_campaign=formal_education',
        description: 'Top-ranked AI program',
        credential: 'Master\'s Degree',
        duration: '2 years',
        cost: '$60,000+'
      }
    )

    options.certifications.push(
      {
        name: 'DeepLearning.AI',
        program: 'Deep Learning Specialization',
        type: 'Professional Certificate',
        url: 'https://www.deeplearning.ai/?ref=learnmaster&utm_source=learnmaster&utm_campaign=formal_education',
        description: 'Andrew Ng\'s deep learning courses',
        credential: 'Professional Certificate',
        duration: '3-4 months',
        cost: '$49/month'
      }
    )
  }

  // Business & Marketing
  if (topicLower.includes('business') || topicLower.includes('marketing') ||
      topicLower.includes('mba') || topicLower.includes('management')) {
    
    options.universities.push(
      {
        name: 'Wharton Online',
        program: 'Business Analytics',
        type: 'Online Certificate',
        url: 'https://online.wharton.upenn.edu/?ref=learnmaster&utm_source=learnmaster&utm_campaign=formal_education',
        description: 'University of Pennsylvania Wharton School',
        credential: 'Certificate',
        duration: '4-6 months',
        cost: '$2,500 - $5,000'
      }
    )

    options.onlineDegrees.push(
      {
        name: 'University of Illinois',
        program: 'iMBA (Online MBA)',
        type: 'Online MBA',
        url: 'https://onlinemba.illinois.edu/?ref=learnmaster&utm_source=learnmaster&utm_campaign=formal_education',
        description: 'Affordable online MBA from top business school',
        credential: 'MBA',
        duration: '2-3 years',
        cost: '$22,000 total'
      }
    )
  }

  // Design & Creative
  if (topicLower.includes('design') || topicLower.includes('graphic') ||
      topicLower.includes('ux') || topicLower.includes('ui')) {
    
    options.universities.push(
      {
        name: 'California Institute of the Arts',
        program: 'Graphic Design Specialization',
        type: 'Online Certificate',
        url: 'https://www.calarts.edu/?ref=learnmaster&utm_source=learnmaster&utm_campaign=formal_education',
        description: 'CalArts design programs',
        credential: 'Certificate',
        duration: '4-6 months',
        cost: '$500 - $1,000'
      }
    )

    options.bootcamps.push(
      {
        name: 'Designlab',
        program: 'UX Academy',
        type: 'Design Bootcamp',
        url: 'https://designlab.com/?ref=learnmaster&utm_source=learnmaster&utm_campaign=formal_education',
        description: 'Intensive UX/UI design bootcamp',
        credential: 'Certificate',
        duration: '6 months',
        cost: '$6,495'
      }
    )
  }

  // Science & Engineering
  if (topicLower.includes('engineering') || topicLower.includes('physics') ||
      topicLower.includes('chemistry') || topicLower.includes('biology')) {
    
    options.universities.push(
      {
        name: 'MIT OpenCourseWare',
        program: 'Engineering & Science',
        type: 'Free Courses',
        url: 'https://ocw.mit.edu/?ref=learnmaster&utm_source=learnmaster&utm_campaign=formal_education',
        description: 'Free MIT course materials',
        credential: 'Certificate of Completion',
        duration: 'Self-paced',
        cost: 'Free'
      }
    )
  }

  // Generic/Fallback options for any topic
  if (options.universities.length === 0) {
    options.universities = [
      {
        name: 'Coursera',
        program: 'University Courses & Degrees',
        type: 'Online Learning Platform',
        url: `https://www.coursera.org/search?query=${encodeURIComponent(topic)}&ref=learnmaster&utm_source=learnmaster&utm_campaign=formal_education`,
        description: 'Courses from top universities worldwide',
        credential: 'Certificates & Degrees',
        duration: 'Varies',
        cost: 'Free - $50,000+'
      },
      {
        name: 'edX',
        program: 'University Courses & MicroMasters',
        type: 'Online Learning Platform',
        url: `https://www.edx.org/search?q=${encodeURIComponent(topic)}&ref=learnmaster&utm_source=learnmaster&utm_campaign=formal_education`,
        description: 'Courses from Harvard, MIT, and more',
        credential: 'Certificates & MicroMasters',
        duration: 'Varies',
        cost: 'Free - $30,000+'
      },
      {
        name: 'FutureLearn',
        program: 'University Courses',
        type: 'Online Learning Platform',
        url: `https://www.futurelearn.com/search?q=${encodeURIComponent(topic)}&ref=learnmaster&utm_source=learnmaster&utm_campaign=formal_education`,
        description: 'Courses from UK and international universities',
        credential: 'Certificates & Degrees',
        duration: 'Varies',
        cost: 'Free - $20,000+'
      }
    ]
  }

  // Add general certification platforms
  if (options.certifications.length === 0) {
    options.certifications = [
      {
        name: 'LinkedIn Learning',
        program: `${topic} Courses`,
        type: 'Professional Development',
        url: `https://www.linkedin.com/learning/search?keywords=${encodeURIComponent(topic)}&ref=learnmaster&utm_source=learnmaster&utm_campaign=formal_education`,
        description: 'Professional certificates recognized by employers',
        credential: 'LinkedIn Certificate',
        duration: 'Varies',
        cost: '$29.99/month'
      },
      {
        name: 'Udacity',
        program: 'Nanodegree Programs',
        type: 'Professional Certificate',
        url: `https://www.udacity.com/courses/all?search=${encodeURIComponent(topic)}&ref=learnmaster&utm_source=learnmaster&utm_campaign=formal_education`,
        description: 'Industry-recognized nanodegrees',
        credential: 'Nanodegree',
        duration: '3-6 months',
        cost: '$399 - $1,600'
      }
    ]
  }

  return options
}

export function generateFormalEducationRecommendation(topic, userLevel) {
  const recommendations = {
    beginner: {
      priority: ['Free university courses', 'Online certificates', 'Bootcamps'],
      message: 'Start with free university courses to build fundamentals, then consider certificates or bootcamps for structured learning.'
    },
    intermediate: {
      priority: ['Professional certificates', 'Bootcamps', 'Online degrees'],
      message: 'Professional certificates and bootcamps can accelerate your career. Consider online degrees for comprehensive credentials.'
    },
    advanced: {
      priority: ['Master\'s degrees', 'Professional certifications', 'Specialized programs'],
      message: 'Advanced degrees and specialized certifications can position you as an expert in your field.'
    }
  }

  return recommendations[userLevel] || recommendations.beginner
}

