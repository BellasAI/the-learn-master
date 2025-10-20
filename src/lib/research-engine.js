/**
 * AI-Powered Learning Path Research Engine
 * 
 * This module uses AI to research YouTube videos and external resources
 * for any topic, then organizes them into an optimal learning sequence.
 */

import { createTrackedWatchUrl, extractVideoId } from './youtube-tracking';
import { searchYouTubeVideos as searchYouTubeAPI } from './youtube-api';

/**
 * Research and create a custom learning path
 * @param {Object} request - User's learning request
 * @returns {Promise<Object>} - Structured learning path
 */
export async function researchLearningPath(request) {
  const {
    topic,
    description,
    channels = '',
    level = 'beginner',
    tier = 'freemium'
  } = request;

  console.log('🔍 Starting research for:', topic);

  try {
    // Step 1: Analyze the topic and break it down
    const topicAnalysis = await analyzeTopicWithAI(topic, description, level);
    
    // Step 2: Search for relevant YouTube videos
    const videos = await searchYouTubeVideos(topic, channels, topicAnalysis);
    
    // Step 3: Rank and order videos by relevance and learning sequence
    const orderedVideos = await rankAndOrderVideos(videos, topicAnalysis, level);
    
    // Step 4: Find supplementary resources
    const resources = await findSupplementaryResources(topic, topicAnalysis);
    
    // Step 5: Apply tier limitations
    const finalPath = applyTierLimitations(orderedVideos, resources, tier);
    
    // Step 6: Structure the learning path
    const learningPath = structureLearningPath(
      topic,
      description,
      topicAnalysis,
      finalPath.videos,
      finalPath.resources,
      tier
    );

    console.log('✅ Research complete:', learningPath);
    return learningPath;

  } catch (error) {
    console.error('❌ Research error:', error);
    throw new Error('Failed to research learning path: ' + error.message);
  }
}

/**
 * Analyze topic with AI to understand learning objectives
 */
async function analyzeTopicWithAI(topic, description, level) {
  console.log('🤖 Analyzing topic with AI...');
  
  // In production, this would call OpenAI API or similar
  // For now, we'll use a sophisticated mock that demonstrates the structure
  
  const prompt = `
    Analyze this learning request and break it down into key concepts:
    
    Topic: ${topic}
    Description: ${description}
    Level: ${level}
    
    Provide:
    1. Key concepts to learn (in order)
    2. Prerequisites needed
    3. Learning objectives
    4. Suggested video topics
    5. Supplementary resource topics
  `;

  // Simulate AI analysis
  const analysis = {
    mainTopic: topic,
    keyConcepts: extractKeyConcepts(topic, description),
    prerequisites: determinePrerequisites(topic, level),
    learningObjectives: generateLearningObjectives(topic, description),
    suggestedVideoTopics: generateVideoTopics(topic, level),
    resourceTopics: generateResourceTopics(topic),
    difficulty: level,
    estimatedHours: estimateLearningTime(topic, level)
  };

  return analysis;
}

/**
 * Extract key concepts from topic and description
 * Now prioritizes description for more specific searches
 */
function extractKeyConcepts(topic, description) {
  const concepts = [];
  const topicLower = topic.toLowerCase();
  const descLower = description ? description.toLowerCase() : '';
  
  // PRIORITY: If description contains specific subtopics, extract them
  // Example: topic="gardening", description="fruit growing" → prioritize "fruit growing"
  if (descLower) {
    // Extract specific nouns and phrases from description
    const specificTerms = extractSpecificTerms(descLower);
    if (specificTerms.length > 0) {
      // These are the MOST specific concepts - add them first
      concepts.push(...specificTerms);
    }
  }
  
  // Parse topic for specific terms
  if (topicLower.includes('mating') || topicLower.includes('reproduction')) {
    concepts.push('Reproductive Biology');
  }
  if (topicLower.includes('bee') || topicLower.includes('insect')) {
    concepts.push('Bee Anatomy', 'Bee Behavior');
  }
  if (topicLower.includes('cycle') || topicLower.includes('lifecycle')) {
    concepts.push('Life Cycle Stages');
  }
  if (topicLower.includes('uk') || topicLower.includes('britain')) {
    concepts.push('UK Species', 'Regional Variations');
  }

  // Add general topic only if no specific concepts found
  if (concepts.length === 0) {
    concepts.push(topic);
  }

  return concepts;
}

/**
 * Extract specific terms from description
 * Helps identify subtopics within a broader topic
 */
function extractSpecificTerms(description) {
  const terms = [];
  
  // Common patterns for specific subtopics
  const patterns = [
    /\b(\w+\s+growing)\b/g,  // "fruit growing", "vegetable growing"
    /\b(growing\s+\w+)\b/g,  // "growing tomatoes", "growing apples"
    /\b(\w+\s+cultivation)\b/g,  // "fruit cultivation"
    /\b(\w+\s+farming)\b/g,  // "fruit farming"
    /\b(\w+\s+gardening)\b/g,  // "container gardening", "organic gardening"
    /\b(\w+\s+training)\b/g,  // "neural network training"
    /\b(\w+\s+development)\b/g,  // "web development"
    /\b(\w+\s+programming)\b/g,  // "Python programming"
    /\b(\w+\s+design)\b/g,  // "UI design"
    /\b(\w+\s+architecture)\b/g,  // "software architecture"
  ];
  
  patterns.forEach(pattern => {
    const matches = description.match(pattern);
    if (matches) {
      matches.forEach(match => {
        const cleaned = match.trim();
        if (cleaned.length > 3 && !terms.includes(cleaned)) {
          terms.push(cleaned);
        }
      });
    }
  });
  
  // Also extract capitalized phrases (likely specific topics)
  const capitalizedPhrases = description.match(/[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*/g) || [];
  capitalizedPhrases.forEach(phrase => {
    if (phrase.length > 3 && !terms.includes(phrase.toLowerCase())) {
      terms.push(phrase.toLowerCase());
    }
  });
  
  return terms;
}

/**
 * Determine prerequisites based on topic and level
 */
function determinePrerequisites(topic, level) {
  if (level === 'beginner') {
    return ['Basic understanding of the subject area'];
  } else if (level === 'intermediate') {
    return ['Foundational knowledge', 'Basic terminology'];
  } else {
    return ['Strong foundational knowledge', 'Practical experience'];
  }
}

/**
 * Generate learning objectives
 */
function generateLearningObjectives(topic, description) {
  return [
    `Understand the fundamentals of ${topic}`,
    `Identify key concepts and terminology`,
    `Apply knowledge to real-world scenarios`,
    `Develop practical skills in ${topic}`
  ];
}

/**
 * Generate suggested video topics for search
 */
function generateVideoTopics(topic, level) {
  const prefix = level === 'beginner' ? 'Introduction to' : 
                 level === 'intermediate' ? 'Understanding' : 
                 'Advanced';
  
  return [
    `${prefix} ${topic}`,
    `${topic} explained`,
    `${topic} tutorial`,
    `${topic} guide`,
    `${topic} for ${level}s`
  ];
}

/**
 * Generate resource topics
 */
function generateResourceTopics(topic) {
  return [
    `${topic} documentation`,
    `${topic} research papers`,
    `${topic} case studies`,
    `${topic} best practices`
  ];
}

/**
 * Estimate learning time
 */
function estimateLearningTime(topic, level) {
  const baseHours = {
    'beginner': 10,
    'intermediate': 20,
    'advanced': 40
  };
  return baseHours[level] || 15;
}

/**
 * Search YouTube for relevant videos using REAL YouTube Data API
 */
async function searchYouTubeVideos(topic, preferredChannels, analysis) {
  console.log('🎥 Searching YouTube for REAL videos...');
  
  try {
    // Build the most specific search query
    // If we have specific concepts from description, use those instead of general topic
    let searchQuery = topic;
    
    if (analysis.keyConcepts && analysis.keyConcepts.length > 0) {
      // Use the FIRST (most specific) concept as the search query
      searchQuery = analysis.keyConcepts[0];
      console.log(`🎯 Using specific search query: "${searchQuery}" (from concepts)`);
    }
    
    // Use real YouTube API with the refined search query
    const videos = await searchYouTubeAPI(searchQuery, {
      maxResults: 25,
      preferredChannels: preferredChannels,
      level: analysis.difficulty,
      videoDuration: 'medium',
      additionalKeywords: analysis.keyConcepts.slice(1, 3)
    });

    if (!videos || videos.length === 0) {
      console.error('❌ No videos found for topic:', topic);
      throw new Error('No educational videos found for this topic. Please try a different search term.');
    }

    console.log(`✅ Found ${videos.length} real educational videos`);
    return videos;

  } catch (error) {
    console.error('❌ YouTube search failed:', error);
    throw new Error('Failed to search YouTube: ' + error.message + '. Please check your YouTube API configuration.');
  }
}

/**
 * Rank and order videos by relevance and optimal learning sequence
 */
async function rankAndOrderVideos(videos, analysis, level) {
  console.log('📊 Ranking and ordering videos...');
  
  // Calculate comprehensive scores
  const scoredVideos = videos.map(video => {
    let score = video.relevanceScore;
    
    // Boost for preferred channels
    if (video.preferredChannel) score += 0.15;
    
    // Boost for recent videos
    const monthsOld = (Date.now() - new Date(video.publishedAt)) / (1000 * 60 * 60 * 24 * 30);
    if (monthsOld < 6) score += 0.05;
    
    // Boost for high view count (indicates quality)
    if (video.views > 100000) score += 0.05;
    if (video.views > 50000) score += 0.03;
    
    // Adjust for level appropriateness
    if (level === 'beginner' && video.title.toLowerCase().includes('beginner')) {
      score += 0.1;
    }
    if (level === 'advanced' && video.title.toLowerCase().includes('advanced')) {
      score += 0.1;
    }
    
    return { ...video, finalScore: Math.min(score, 1.0) };
  });

  // Sort by score
  scoredVideos.sort((a, b) => b.finalScore - a.finalScore);
  
  // Reorder for optimal learning sequence
  const orderedVideos = reorderForLearningSequence(scoredVideos, analysis, level);
  
  return orderedVideos;
}

/**
 * Reorder videos for optimal learning progression
 */
function reorderForLearningSequence(videos, analysis, level) {
  // Separate into categories
  const introVideos = videos.filter(v => 
    v.title.toLowerCase().includes('introduction') || 
    v.title.toLowerCase().includes('beginner') ||
    v.title.toLowerCase().includes('guide')
  );
  
  const intermediateVideos = videos.filter(v => 
    !introVideos.includes(v) && 
    !v.title.toLowerCase().includes('advanced')
  );
  
  const advancedVideos = videos.filter(v => 
    v.title.toLowerCase().includes('advanced') ||
    v.title.toLowerCase().includes('expert')
  );

  // Build learning sequence based on level
  let sequence = [];
  
  if (level === 'beginner') {
    sequence = [
      ...introVideos.slice(0, 2),
      ...intermediateVideos.slice(0, 2),
      ...advancedVideos.slice(0, 1)
    ];
  } else if (level === 'intermediate') {
    sequence = [
      ...introVideos.slice(0, 1),
      ...intermediateVideos.slice(0, 3),
      ...advancedVideos.slice(0, 1)
    ];
  } else {
    sequence = [
      ...intermediateVideos.slice(0, 2),
      ...advancedVideos.slice(0, 3)
    ];
  }

  // Fill remaining slots with highest scored videos
  const remaining = videos.filter(v => !sequence.includes(v));
  sequence.push(...remaining);

  return sequence;
}

/**
 * Find supplementary resources (articles, docs, research papers)
 */
async function findSupplementaryResources(topic, analysis) {
  console.log('📚 Finding supplementary resources...');
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In production, this would search various sources
  // For now, return structured mock data
  
  const resources = [
    {
      title: `${topic} - Wikipedia`,
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(topic)}`,
      type: 'encyclopedia',
      relevanceScore: 0.90,
      description: 'Comprehensive encyclopedia entry',
      source: 'Wikipedia'
    },
    {
      title: `${topic} Research Papers`,
      url: `https://scholar.google.com/scholar?q=${encodeURIComponent(topic)}`,
      type: 'academic',
      relevanceScore: 0.85,
      description: 'Academic research and papers',
      source: 'Google Scholar'
    },
    {
      title: `${topic} Documentation`,
      url: `https://www.google.com/search?q=${encodeURIComponent(topic + ' documentation')}`,
      type: 'documentation',
      relevanceScore: 0.80,
      description: 'Official documentation and guides',
      source: 'Web Search'
    },
    {
      title: `${topic} Community Forum`,
      url: `https://www.reddit.com/search/?q=${encodeURIComponent(topic)}`,
      type: 'community',
      relevanceScore: 0.75,
      description: 'Community discussions and Q&A',
      source: 'Reddit'
    },
    {
      title: `${topic} Online Courses`,
      url: `https://www.coursera.org/search?query=${encodeURIComponent(topic)}`,
      type: 'course',
      relevanceScore: 0.70,
      description: 'Structured online courses',
      source: 'Coursera'
    }
  ];

  // Sort by relevance
  resources.sort((a, b) => b.relevanceScore - a.relevanceScore);
  
  // Add LearnHub tracking to all URLs
  const trackedResources = resources.map(resource => ({
    ...resource,
    url: addLearnHubTracking(resource.url, topic)
  }));

  return trackedResources;
}

/**
 * Add LearnHub tracking to external URLs
 */
function addLearnHubTracking(url, topic) {
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.append('ref', 'learnmaster');
    urlObj.searchParams.append('utm_source', 'learnmaster');
    urlObj.searchParams.append('utm_medium', 'learning_path');
    urlObj.searchParams.append('utm_campaign', encodeURIComponent(topic));
    return urlObj.toString();
  } catch (error) {
    // If URL parsing fails, return original
    return url;
  }
}

/**
 * Apply tier limitations to videos and resources
 */
function applyTierLimitations(videos, resources, tier) {
  const limits = {
    freemium: { videos: 3, resources: 3 },
    starter: { videos: 10, resources: 10 },
    advanced: { videos: 999, resources: 999 },
    scholar: { videos: 999, resources: 999 }
  };

  const limit = limits[tier] || limits.freemium;

  return {
    videos: videos.slice(0, limit.videos),
    resources: resources.slice(0, limit.resources),
    isLimited: tier === 'freemium' || tier === 'starter',
    totalAvailable: {
      videos: videos.length,
      resources: resources.length
    }
  };
}

/**
 * Structure the final learning path
 */
function structureLearningPath(topic, description, analysis, videos, resources, tier) {
  // Add tracked URLs to videos
  const trackedVideos = videos.map((video, index) => ({
    ...video,
    lessonNumber: index + 1,
    watchUrl: createTrackedWatchUrl(video.id, {
      campaign: topic.toLowerCase().replace(/\s+/g, '_'),
      learningPath: topic,
      lessonId: `custom-${index}`,
      content: video.title
    }),
    embedUrl: `https://www.youtube.com/embed/${video.id}?ref=learnmaster&utm_source=learnmaster&utm_campaign=${encodeURIComponent(topic)}`
  }));

  return {
    id: `custom-${Date.now()}`,
    topic,
    description,
    tier,
    createdAt: new Date().toISOString(),
    analysis: {
      keyConcepts: analysis.keyConcepts,
      prerequisites: analysis.prerequisites,
      learningObjectives: analysis.learningObjectives,
      estimatedHours: analysis.estimatedHours
    },
    videos: trackedVideos,
    resources,
    metadata: {
      totalVideos: trackedVideos.length,
      totalResources: resources.length,
      difficulty: analysis.difficulty,
      isComplete: tier !== 'freemium'
    },
    progress: {
      completedLessons: [],
      percentComplete: 0
    }
  };
}

/**
 * Get a preview of what the research will include
 */
export function getResearchPreview(topic, level) {
  return {
    estimatedVideos: level === 'beginner' ? '8-12' : level === 'intermediate' ? '10-15' : '12-20',
    estimatedResources: '5-10',
    estimatedTime: level === 'beginner' ? '10-15 hours' : level === 'intermediate' ? '20-30 hours' : '40-60 hours',
    keyConcepts: extractKeyConcepts(topic, ''),
    willInclude: [
      'Curated YouTube video tutorials',
      'Optimal learning sequence',
      'Supplementary reading materials',
      'Research papers and documentation',
      'Community resources',
      'Practice exercises (where available)'
    ]
  };
}

export default {
  researchLearningPath,
  getResearchPreview
};

