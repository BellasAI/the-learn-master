/**
 * Quality Verification System
 * 
 * Ensures learning paths actually deliver what users requested
 * Checks coverage, quality, sequence, and completeness
 */

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || 
                       (typeof process !== 'undefined' ? process.env.OPENAI_API_KEY : null);
const OPENAI_BASE_URL = import.meta.env.VITE_OPENAI_BASE_URL || 
                        (typeof process !== 'undefined' ? process.env.OPENAI_BASE_URL : null) ||
                        'https://api.openai.com/v1';

/**
 * Verify learning path quality before showing to user
 */
export async function verifyLearningPath(learningPath, originalRequest) {
  console.log('🔍 Verifying learning path quality...');
  
  const verification = {
    status: 'pending',
    coverageScore: 0,
    qualityScore: 0,
    sequenceValid: false,
    gaps: [],
    issues: [],
    recommendations: [],
    confidence: 0,
    ready: false
  };
  
  try {
    // 1. Check knowledge coverage
    const coverageCheck = await checkKnowledgeCoverage(learningPath, originalRequest);
    verification.coverageScore = coverageCheck.score;
    verification.gaps = coverageCheck.gaps;
    
    // 2. Assess overall quality
    const qualityCheck = await assessOverallQuality(learningPath);
    verification.qualityScore = qualityCheck.score;
    verification.issues = qualityCheck.issues;
    
    // 3. Validate learning sequence
    const sequenceCheck = await validateLearningSequence(learningPath);
    verification.sequenceValid = sequenceCheck.valid;
    if (!sequenceCheck.valid) {
      verification.issues.push(sequenceCheck.issue);
    }
    
    // 4. Calculate confidence and determine if ready
    verification.confidence = (verification.coverageScore + verification.qualityScore) / 2;
    
    // Determine status
    if (verification.coverageScore < 0.6) {
      verification.status = 'insufficient_coverage';
      verification.ready = false;
      verification.recommendations.push('Search for additional resources to cover missing topics');
    } else if (verification.qualityScore < 0.6) {
      verification.status = 'low_quality';
      verification.ready = false;
      verification.recommendations.push('Filter out low-quality content and search for better resources');
    } else if (!verification.sequenceValid) {
      verification.status = 'poor_sequence';
      verification.ready = false;
      verification.recommendations.push('Reorder content for better learning progression');
    } else if (verification.gaps.length > 3) {
      verification.status = 'has_gaps';
      verification.ready = true;  // Allow but warn
      verification.recommendations.push(`Consider adding content for: ${verification.gaps.join(', ')}`);
    } else {
      verification.status = 'verified';
      verification.ready = true;
    }
    
  } catch (error) {
    console.error('❌ Verification failed:', error);
    verification.status = 'verification_failed';
    verification.ready = true;  // Fail open - allow content even if verification fails
    verification.confidence = 0.5;
  }
  
  return verification;
}

/**
 * Check if learning path covers the requested topic adequately
 */
async function checkKnowledgeCoverage(learningPath, originalRequest) {
  if (!OPENAI_API_KEY) {
    console.warn('⚠️ OpenAI API key not configured, skipping coverage check');
    return { score: 0.8, gaps: [] };  // Assume good coverage
  }
  
  try {
    // Extract all content titles and descriptions
    const contentSummary = learningPath.videos?.map(v => ({
      title: v.title,
      description: v.description?.substring(0, 200)
    })) || [];
    
    const prompt = `Analyze if this learning path adequately covers the requested topic:

User Request:
Topic: ${originalRequest.topic}
Description: ${originalRequest.description || 'No description'}
Level: ${originalRequest.level || 'Not specified'}

Learning Path Content:
${JSON.stringify(contentSummary, null, 2)}

Evaluate:
1. Does this content cover the main aspects of "${originalRequest.topic}"?
2. What important subtopics or concepts are missing?
3. Is the coverage appropriate for the requested level?

Respond with JSON:
{
  "coverageScore": 0.0-1.0,
  "mainTopicsCovered": ["list of covered topics"],
  "missingTopics": ["list of important missing topics"],
  "levelAppropriate": boolean,
  "assessment": "brief explanation"
}`;

    const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 800
      })
    });
    
    const data = await response.json();
    const analysis = JSON.parse(data.choices[0].message.content);
    
    return {
      score: analysis.coverageScore,
      gaps: analysis.missingTopics,
      covered: analysis.mainTopicsCovered,
      assessment: analysis.assessment
    };
    
  } catch (error) {
    console.error('❌ Coverage check failed:', error);
    return { score: 0.8, gaps: [] };  // Fail open
  }
}

/**
 * Assess overall quality of resources
 */
async function assessOverallQuality(learningPath) {
  if (!OPENAI_API_KEY) {
    console.warn('⚠️ OpenAI API key not configured, skipping quality check');
    return { score: 0.8, issues: [] };
  }
  
  try {
    const videos = learningPath.videos || [];
    
    // Calculate basic quality metrics
    const metrics = {
      avgViewCount: videos.reduce((sum, v) => sum + (v.viewCount || 0), 0) / videos.length,
      hasDescriptions: videos.filter(v => v.description).length / videos.length,
      hasChannelInfo: videos.filter(v => v.channelTitle).length / videos.length,
      diverseSources: new Set(videos.map(v => v.channelTitle)).size / videos.length
    };
    
    // Simple quality score based on metrics
    let qualityScore = 0;
    const issues = [];
    
    // Check view counts (indicator of popularity/quality)
    if (metrics.avgViewCount > 10000) {
      qualityScore += 0.3;
    } else if (metrics.avgViewCount > 1000) {
      qualityScore += 0.2;
    } else {
      issues.push('Some videos have low view counts');
      qualityScore += 0.1;
    }
    
    // Check for descriptions
    if (metrics.hasDescriptions > 0.8) {
      qualityScore += 0.3;
    } else {
      issues.push('Some videos lack descriptions');
      qualityScore += 0.1;
    }
    
    // Check for channel diversity
    if (metrics.diverseSources > 0.5) {
      qualityScore += 0.2;
    } else {
      issues.push('Limited source diversity');
      qualityScore += 0.1;
    }
    
    // Check number of videos
    if (videos.length >= 5 && videos.length <= 30) {
      qualityScore += 0.2;
    } else if (videos.length < 5) {
      issues.push('Too few videos found');
    } else {
      issues.push('Too many videos - may be overwhelming');
    }
    
    return {
      score: Math.min(qualityScore, 1.0),
      issues: issues,
      metrics: metrics
    };
    
  } catch (error) {
    console.error('❌ Quality check failed:', error);
    return { score: 0.8, issues: [] };
  }
}

/**
 * Validate that learning sequence makes sense
 */
async function validateLearningSequence(learningPath) {
  const videos = learningPath.videos || [];
  
  if (videos.length < 2) {
    return { valid: true };  // Can't validate sequence with < 2 videos
  }
  
  // Check if videos are ordered by difficulty/progression
  // Look for keywords indicating level
  const beginnerKeywords = ['introduction', 'basics', 'fundamentals', 'beginner', 'getting started', 'what is'];
  const advancedKeywords = ['advanced', 'expert', 'mastery', 'deep dive', 'optimization', 'professional'];
  
  let beginnerCount = 0;
  let advancedCount = 0;
  let lastBeginnerIndex = -1;
  let firstAdvancedIndex = 999;
  
  videos.forEach((video, index) => {
    const title = video.title.toLowerCase();
    
    if (beginnerKeywords.some(kw => title.includes(kw))) {
      beginnerCount++;
      lastBeginnerIndex = index;
    }
    
    if (advancedKeywords.some(kw => title.includes(kw))) {
      advancedCount++;
      if (index < firstAdvancedIndex) {
        firstAdvancedIndex = index;
      }
    }
  });
  
  // Check if advanced content comes before beginner content
  if (firstAdvancedIndex < lastBeginnerIndex) {
    return {
      valid: false,
      issue: 'Learning sequence may be out of order (advanced content before basics)'
    };
  }
  
  // Check if there's a good mix of levels
  if (videos.length > 5 && beginnerCount === 0) {
    return {
      valid: false,
      issue: 'No introductory content found - may be too advanced'
    };
  }
  
  return { valid: true };
}

/**
 * Generate user-friendly verification summary
 */
export function generateVerificationSummary(verification, originalRequest) {
  const summary = {
    title: 'Learning Path Quality Verification',
    status: verification.status,
    confidence: verification.confidence,
    ready: verification.ready,
    sections: []
  };
  
  // Coverage section
  summary.sections.push({
    icon: verification.coverageScore >= 0.8 ? '✅' : verification.coverageScore >= 0.6 ? '⚠️' : '❌',
    title: 'Coverage',
    score: Math.round(verification.coverageScore * 100),
    rating: verification.coverageScore >= 0.8 ? 'Excellent' : 
            verification.coverageScore >= 0.6 ? 'Good' : 'Needs Improvement',
    details: verification.coverageScore >= 0.8 
      ? 'All major concepts covered'
      : verification.gaps.length > 0
        ? `Missing: ${verification.gaps.slice(0, 3).join(', ')}`
        : 'Some topics may not be fully covered'
  });
  
  // Quality section
  summary.sections.push({
    icon: verification.qualityScore >= 0.8 ? '✅' : verification.qualityScore >= 0.6 ? '⚠️' : '❌',
    title: 'Quality',
    score: Math.round(verification.qualityScore * 100),
    rating: verification.qualityScore >= 0.8 ? 'High Quality' : 
            verification.qualityScore >= 0.6 ? 'Good Quality' : 'Mixed Quality',
    details: verification.issues.length > 0
      ? verification.issues[0]
      : 'Resources from credible sources'
  });
  
  // Sequence section
  summary.sections.push({
    icon: verification.sequenceValid ? '✅' : '⚠️',
    title: 'Sequence',
    rating: verification.sequenceValid ? 'Validated' : 'Needs Review',
    details: verification.sequenceValid
      ? 'Logical progression from basics to advanced'
      : 'Learning order may need adjustment'
  });
  
  // Gaps section (if any)
  if (verification.gaps.length > 0) {
    summary.sections.push({
      icon: '⚠️',
      title: 'Gaps Identified',
      details: verification.gaps.slice(0, 5).join(', '),
      optional: true
    });
  }
  
  return summary;
}

/**
 * Track user feedback on learning paths
 */
export async function recordUserFeedback(pathId, userId, feedback) {
  // Store feedback for quality improvement
  const feedbackRecord = {
    pathId,
    userId,
    timestamp: new Date().toISOString(),
    rating: feedback.rating,
    helpful: feedback.helpful,
    workedWell: feedback.workedWell || [],
    missing: feedback.missing || [],
    comments: feedback.comments || ''
  };
  
  // In a real implementation, this would save to a database
  console.log('📊 User feedback recorded:', feedbackRecord);
  
  return feedbackRecord;
}

/**
 * Analyze user engagement to detect quality issues
 */
export function analyzeEngagementMetrics(pathId, metrics) {
  const issues = [];
  const warnings = [];
  
  // Low completion rate
  if (metrics.completionRate < 0.3) {
    issues.push({
      type: 'low_completion',
      severity: 'high',
      message: 'Users are not completing this learning path',
      recommendation: 'Review content relevance and difficulty'
    });
  }
  
  // High dropout at specific points
  if (metrics.dropoffPoints && metrics.dropoffPoints.length > 0) {
    warnings.push({
      type: 'dropout_points',
      severity: 'medium',
      message: `Users dropping off at: ${metrics.dropoffPoints.join(', ')}`,
      recommendation: 'Investigate these specific resources for quality issues'
    });
  }
  
  // Time spent much less than expected
  if (metrics.timeSpent < metrics.expectedTime * 0.5) {
    warnings.push({
      type: 'low_engagement',
      severity: 'medium',
      message: 'Users spending less time than expected',
      recommendation: 'Content may not be engaging or relevant'
    });
  }
  
  // Low user ratings
  if (metrics.avgRating < 3.0) {
    issues.push({
      type: 'low_rating',
      severity: 'high',
      message: 'Users rating this path poorly',
      recommendation: 'Review and potentially rebuild this learning path'
    });
  }
  
  return {
    issues,
    warnings,
    overallHealth: issues.length === 0 && warnings.length === 0 ? 'good' : 
                   issues.length === 0 ? 'fair' : 'poor'
  };
}

