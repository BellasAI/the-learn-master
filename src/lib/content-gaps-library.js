/**
 * Content Gaps Library System
 * 
 * Tracks content gaps identified during research
 * Makes them available to content creators
 * Provides opportunity analysis and monetization potential
 * 
 * This is a separate product offering for creators who want to know
 * what educational content is missing in various topics
 */

import fs from 'fs/promises';
import path from 'path';

const GAPS_LIBRARY_PATH = '/home/ubuntu/ai-learning-platform/content-gaps-library';

/**
 * Add gaps to the Content Gaps Library
 */
export async function addToGapsLibrary(topic, gaps, researchResults) {
  console.log(`📚 Adding ${gaps.length} content gaps to library for topic: ${topic}`);

  try {
    // Ensure directory exists
    await fs.mkdir(GAPS_LIBRARY_PATH, { recursive: true });

    // Create gap entry
    const gapEntry = {
      topic,
      timestamp: new Date().toISOString(),
      totalGaps: gaps.length,
      researchSummary: {
        totalResourcesFound: countTotalResources(researchResults),
        coveragePercentage: researchResults.coverage.overall,
        verifiedResources: researchResults.verifiedCount || 0
      },
      gaps: gaps.map(gap => enrichGapData(gap, topic, researchResults)),
      metadata: {
        addedBy: 'learning-path-research',
        version: '1.0',
        lastUpdated: new Date().toISOString()
      }
    };

    // Save to file
    const filename = `${sanitizeFilename(topic)}-${Date.now()}.json`;
    const filepath = path.join(GAPS_LIBRARY_PATH, filename);
    
    await fs.writeFile(filepath, JSON.stringify(gapEntry, null, 2));

    console.log(`✅ Gaps saved to library: ${filename}`);

    // Update index
    await updateGapsIndex(topic, filename, gaps.length);

    return {
      success: true,
      filename,
      gapsAdded: gaps.length
    };

  } catch (error) {
    console.error('❌ Failed to add gaps to library:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Enrich gap data with additional analysis
 */
function enrichGapData(gap, topic, researchResults) {
  return {
    ...gap,
    
    // Add market analysis
    marketAnalysis: {
      topicPopularity: estimateTopicPopularity(topic),
      competitionLevel: estimateCompetition(gap, researchResults),
      opportunityScore: calculateOpportunityScore(gap, topic, researchResults)
    },

    // Add content suggestions
    contentSuggestions: generateContentSuggestions(gap, topic),

    // Add monetization potential
    monetization: {
      potentialRevenue: estimateRevenuePotential(gap, topic),
      recommendedPricing: suggestPricing(gap),
      platforms: suggestPlatforms(gap)
    },

    // Add creation difficulty
    creationDifficulty: {
      level: assessCreationDifficulty(gap),
      requiredExpertise: identifyRequiredExpertise(gap, topic),
      estimatedEffort: estimateCreationEffort(gap),
      resources: suggestCreationResources(gap)
    }
  };
}

/**
 * Calculate opportunity score (0-100)
 */
function calculateOpportunityScore(gap, topic, researchResults) {
  let score = 0;

  // High severity gaps are better opportunities
  if (gap.severity === 'high') score += 40;
  else if (gap.severity === 'medium') score += 25;
  else score += 10;

  // Low coverage means high demand
  const coverage = researchResults.coverage.overall;
  if (coverage < 50) score += 30;
  else if (coverage < 75) score += 20;
  else score += 10;

  // Certain gap types are more valuable
  if (gap.type === 'academic_course') score += 20;
  else if (gap.type === 'practical_guide') score += 15;
  else score += 10;

  // Cap at 100
  return Math.min(score, 100);
}

/**
 * Estimate topic popularity (simplified)
 */
function estimateTopicPopularity(topic) {
  // In production, would use Google Trends API or similar
  // For now, return categories based on common topics
  
  const highDemand = ['programming', 'ai', 'machine learning', 'web development', 'data science'];
  const mediumDemand = ['cooking', 'gardening', 'photography', 'music', 'fitness'];
  
  const topicLower = topic.toLowerCase();
  
  if (highDemand.some(t => topicLower.includes(t))) {
    return {
      level: 'high',
      estimatedSearches: '10,000-100,000/month',
      trend: 'growing'
    };
  }
  
  if (mediumDemand.some(t => topicLower.includes(t))) {
    return {
      level: 'medium',
      estimatedSearches: '1,000-10,000/month',
      trend: 'stable'
    };
  }
  
  return {
    level: 'unknown',
    estimatedSearches: 'Unknown - requires research',
    trend: 'unknown'
  };
}

/**
 * Estimate competition level
 */
function estimateCompetition(gap, researchResults) {
  const totalResources = countTotalResources(researchResults);
  
  if (totalResources > 50) {
    return {
      level: 'high',
      description: 'Many existing resources, but specific gap remains',
      advantage: 'Fill the specific gap to stand out'
    };
  }
  
  if (totalResources > 20) {
    return {
      level: 'medium',
      description: 'Moderate competition with room for quality content',
      advantage: 'Focus on quality and specificity'
    };
  }
  
  return {
    level: 'low',
    description: 'Limited existing content, high opportunity',
    advantage: 'First-mover advantage in underserved niche'
  };
}

/**
 * Generate content suggestions for creators
 */
function generateContentSuggestions(gap, topic) {
  const suggestions = [];

  if (gap.type === 'academic_course') {
    suggestions.push({
      format: 'Online Course',
      platform: 'Udemy, Teachable, Thinkific',
      structure: '6-12 modules, 20-40 hours total',
      pricing: '$50-200',
      example: `Complete ${topic} Mastery Course`
    });
    suggestions.push({
      format: 'Video Series',
      platform: 'YouTube, Skillshare',
      structure: '10-20 videos, 15-30 min each',
      pricing: 'Free (ad revenue) or $20-50',
      example: `${topic} From Zero to Hero`
    });
  }

  if (gap.type === 'practical_guide') {
    suggestions.push({
      format: 'Step-by-Step Guide',
      platform: 'eBook, PDF, Blog series',
      structure: 'Detailed walkthrough with examples',
      pricing: '$10-30',
      example: `The Complete ${topic} Handbook`
    });
    suggestions.push({
      format: 'Video Tutorials',
      platform: 'YouTube, Vimeo',
      structure: 'Hands-on demonstrations',
      pricing: 'Free (sponsorships) or $15-40',
      example: `${topic} Practical Projects`
    });
  }

  if (gap.type === 'certification') {
    suggestions.push({
      format: 'Certification Program',
      platform: 'Own website, Accredible',
      structure: 'Course + exam + certificate',
      pricing: '$200-1000',
      example: `Certified ${topic} Professional`
    });
  }

  if (gap.type === 'advanced_content') {
    suggestions.push({
      format: 'Advanced Masterclass',
      platform: 'Udemy, own website',
      structure: 'Deep dives into complex topics',
      pricing: '$100-300',
      example: `Advanced ${topic} Techniques`
    });
  }

  return suggestions;
}

/**
 * Estimate revenue potential
 */
function estimateRevenuePotential(gap, topic) {
  const popularity = estimateTopicPopularity(topic);
  const opportunityScore = gap.marketAnalysis?.opportunityScore || 50;

  let monthlyRevenue = {
    conservative: 0,
    moderate: 0,
    optimistic: 0
  };

  if (gap.type === 'academic_course') {
    if (popularity.level === 'high') {
      monthlyRevenue = {
        conservative: 500,
        moderate: 2000,
        optimistic: 10000
      };
    } else if (popularity.level === 'medium') {
      monthlyRevenue = {
        conservative: 200,
        moderate: 800,
        optimistic: 3000
      };
    } else {
      monthlyRevenue = {
        conservative: 50,
        moderate: 200,
        optimistic: 1000
      };
    }
  } else if (gap.type === 'practical_guide') {
    if (popularity.level === 'high') {
      monthlyRevenue = {
        conservative: 300,
        moderate: 1200,
        optimistic: 5000
      };
    } else {
      monthlyRevenue = {
        conservative: 100,
        moderate: 400,
        optimistic: 1500
      };
    }
  } else if (gap.type === 'certification') {
    monthlyRevenue = {
      conservative: 1000,
      moderate: 5000,
      optimistic: 20000
    };
  }

  return {
    monthly: monthlyRevenue,
    annual: {
      conservative: monthlyRevenue.conservative * 12,
      moderate: monthlyRevenue.moderate * 12,
      optimistic: monthlyRevenue.optimistic * 12
    },
    note: 'Estimates based on typical performance in similar niches. Actual results vary significantly.'
  };
}

/**
 * Suggest pricing for content
 */
function suggestPricing(gap) {
  const pricing = {
    free: {
      recommended: gap.type === 'article' || gap.type === 'video',
      monetization: 'Ad revenue, sponsorships, lead generation',
      pros: 'Wide reach, builds audience',
      cons: 'Lower direct revenue'
    },
    lowCost: {
      range: '$10-30',
      recommended: gap.type === 'book' || gap.type === 'practical_guide',
      pros: 'Low barrier to entry, high volume potential',
      cons: 'Requires many sales for significant revenue'
    },
    midCost: {
      range: '$50-200',
      recommended: gap.type === 'academic_course',
      pros: 'Good balance of accessibility and revenue',
      cons: 'Competitive price point'
    },
    premium: {
      range: '$200-1000+',
      recommended: gap.type === 'certification' || gap.type === 'advanced_content',
      pros: 'High revenue per sale, perceived value',
      cons: 'Requires strong authority and quality'
    }
  };

  return pricing;
}

/**
 * Suggest platforms for content distribution
 */
function suggestPlatforms(gap) {
  const platforms = [];

  if (gap.type === 'academic_course' || gap.type === 'practical_guide') {
    platforms.push({
      name: 'Udemy',
      pros: 'Large audience, easy setup, handles marketing',
      cons: 'High commission (50%), frequent discounts',
      bestFor: 'Beginners, wide reach'
    });
    platforms.push({
      name: 'Teachable / Thinkific',
      pros: 'Keep 90%+ revenue, full control, own branding',
      cons: 'Need to drive your own traffic',
      bestFor: 'Established creators, higher pricing'
    });
  }

  if (gap.type === 'video') {
    platforms.push({
      name: 'YouTube',
      pros: 'Massive audience, ad revenue, sponsorships',
      cons: 'Algorithm dependent, lower CPM',
      bestFor: 'Building audience, free content'
    });
    platforms.push({
      name: 'Skillshare',
      pros: 'Engaged learning audience, passive income',
      cons: 'Lower per-student revenue',
      bestFor: 'Creative topics, supplementary income'
    });
  }

  if (gap.type === 'book') {
    platforms.push({
      name: 'Amazon KDP',
      pros: 'Largest audience, easy publishing, print-on-demand',
      cons: '30-70% royalty, competitive',
      bestFor: 'All authors, must-have platform'
    });
    platforms.push({
      name: 'Gumroad',
      pros: '90%+ revenue, direct sales, email list building',
      cons: 'Need own audience',
      bestFor: 'Creators with existing audience'
    });
  }

  return platforms;
}

/**
 * Assess creation difficulty
 */
function assessCreationDifficulty(gap) {
  if (gap.type === 'certification') return 'Very Hard';
  if (gap.type === 'academic_course') return 'Hard';
  if (gap.type === 'advanced_content') return 'Hard';
  if (gap.type === 'practical_guide') return 'Medium';
  if (gap.type === 'video') return 'Medium';
  if (gap.type === 'article') return 'Easy';
  return 'Medium';
}

/**
 * Identify required expertise
 */
function identifyRequiredExpertise(gap, topic) {
  const expertise = {
    subject: `Deep knowledge of ${topic}`,
    teaching: 'Ability to explain complex concepts clearly',
    production: 'Content creation skills (writing, video, etc.)'
  };

  if (gap.type === 'certification') {
    expertise.authority = 'Recognized expert status or credentials';
    expertise.assessment = 'Ability to create valid assessments';
  }

  if (gap.type === 'academic_course') {
    expertise.curriculum = 'Course design and pedagogy';
    expertise.engagement = 'Student engagement techniques';
  }

  return expertise;
}

/**
 * Estimate creation effort
 */
function estimateCreationEffort(gap) {
  const effort = {
    hours: 0,
    weeks: 0,
    description: ''
  };

  if (gap.type === 'certification') {
    effort.hours = 200-500;
    effort.weeks = 12-24;
    effort.description = 'Requires extensive curriculum development, assessment creation, and credibility building';
  } else if (gap.type === 'academic_course') {
    effort.hours = 100-200;
    effort.weeks = 8-16;
    effort.description = 'Requires thorough content creation, video production, and student materials';
  } else if (gap.type === 'practical_guide') {
    effort.hours = 40-80;
    effort.weeks = 4-8;
    effort.description = 'Requires detailed documentation, examples, and testing';
  } else if (gap.type === 'video') {
    effort.hours = 20-40;
    effort.weeks = 2-4;
    effort.description = 'Requires scripting, filming, editing, and publishing';
  } else {
    effort.hours = 10-20;
    effort.weeks = 1-2;
    effort.description = 'Requires research, writing, and editing';
  }

  return effort;
}

/**
 * Suggest resources for content creation
 */
function suggestCreationResources(gap) {
  const resources = {
    learning: [],
    tools: [],
    communities: []
  };

  if (gap.type === 'academic_course' || gap.type === 'certification') {
    resources.learning.push('Course Design for Educators (Coursera)');
    resources.learning.push('The Business of Online Teaching');
    resources.tools.push('Teachable, Thinkific (course platforms)');
    resources.tools.push('Camtasia, ScreenFlow (video editing)');
    resources.communities.push('Online Course Creators Facebook Group');
  }

  if (gap.type === 'video') {
    resources.learning.push('YouTube Creator Academy');
    resources.tools.push('OBS Studio (recording)');
    resources.tools.push('DaVinci Resolve (editing)');
    resources.communities.push('r/YouTubers, r/NewTubers');
  }

  if (gap.type === 'book' || gap.type === 'practical_guide') {
    resources.learning.push('On Writing Well by William Zinsser');
    resources.tools.push('Scrivener (writing)');
    resources.tools.push('Grammarly (editing)');
    resources.communities.push('r/selfpublish, Indie Author Groups');
  }

  return resources;
}

/**
 * Update the gaps index for easy searching
 */
async function updateGapsIndex(topic, filename, gapCount) {
  try {
    const indexPath = path.join(GAPS_LIBRARY_PATH, 'index.json');
    
    let index = { topics: [], lastUpdated: new Date().toISOString() };
    
    try {
      const existing = await fs.readFile(indexPath, 'utf-8');
      index = JSON.parse(existing);
    } catch {
      // Index doesn't exist yet, use empty one
    }

    // Add or update topic entry
    const existingIndex = index.topics.findIndex(t => t.topic === topic);
    const entry = {
      topic,
      filename,
      gapCount,
      addedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      index.topics[existingIndex] = entry;
    } else {
      index.topics.push(entry);
    }

    index.lastUpdated = new Date().toISOString();

    await fs.writeFile(indexPath, JSON.stringify(index, null, 2));
    
  } catch (error) {
    console.error('Failed to update gaps index:', error);
  }
}

/**
 * Search the gaps library
 */
export async function searchGapsLibrary(query) {
  try {
    const indexPath = path.join(GAPS_LIBRARY_PATH, 'index.json');
    const indexData = await fs.readFile(indexPath, 'utf-8');
    const index = JSON.parse(indexData);

    const results = index.topics.filter(topic =>
      topic.topic.toLowerCase().includes(query.toLowerCase())
    );

    return results;

  } catch (error) {
    console.error('Failed to search gaps library:', error);
    return [];
  }
}

/**
 * Get gaps for a specific topic
 */
export async function getGapsForTopic(topic) {
  try {
    const searchResults = await searchGapsLibrary(topic);
    
    if (searchResults.length === 0) {
      return null;
    }

    // Get the most recent entry
    const latest = searchResults[searchResults.length - 1];
    const filepath = path.join(GAPS_LIBRARY_PATH, latest.filename);
    
    const data = await fs.readFile(filepath, 'utf-8');
    return JSON.parse(data);

  } catch (error) {
    console.error('Failed to get gaps for topic:', error);
    return null;
  }
}

/**
 * Helper functions
 */
function countTotalResources(researchResults) {
  let total = 0;
  for (const resources of Object.values(researchResults.sources)) {
    total += resources.length;
  }
  return total;
}

function sanitizeFilename(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

