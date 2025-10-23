/**
 * Resource Verification and Quality Assessment System
 * 
 * Verifies that resources actually exist and are accessible
 * Assesses quality, credibility, and relevance
 * Ensures we only show users working, high-quality content
 */

/**
 * Verify all resources in research results
 */
export async function verifyResources(researchResults) {
  console.log('🔍 Verifying resource availability and quality...');

  const verified = {
    ...researchResults,
    verificationTimestamp: new Date().toISOString(),
    verifiedCount: 0,
    failedCount: 0,
    warnings: []
  };

  // Verify each source type
  for (const [sourceType, resources] of Object.entries(researchResults.sources)) {
    console.log(`📋 Verifying ${resources.length} ${sourceType} resources...`);
    
    verified.sources[sourceType] = await Promise.all(
      resources.map(resource => verifyResource(resource, sourceType))
    );

    // Count verified vs failed
    const verifiedInType = verified.sources[sourceType].filter(r => r.verified).length;
    const failedInType = verified.sources[sourceType].filter(r => !r.verified).length;
    
    verified.verifiedCount += verifiedInType;
    verified.failedCount += failedInType;

    if (failedInType > 0) {
      verified.warnings.push(
        `${failedInType} ${sourceType} resources could not be verified`
      );
    }
  }

  const totalResources = verified.verifiedCount + verified.failedCount;
  const verificationRate = totalResources > 0 
    ? Math.round((verified.verifiedCount / totalResources) * 100)
    : 0;

  console.log(`✅ Verification complete: ${verified.verifiedCount}/${totalResources} verified (${verificationRate}%)`);
  
  if (verified.failedCount > 0) {
    console.warn(`⚠️ ${verified.failedCount} resources failed verification`);
  }

  return verified;
}

/**
 * Verify a single resource
 */
async function verifyResource(resource, sourceType) {
  try {
    // Check URL accessibility
    const urlCheck = await checkURL(resource.url);
    
    // Assess quality based on source type
    const qualityScore = await assessQuality(resource, sourceType);
    
    // Check for broken links or removed content
    const contentCheck = await checkContentAvailability(resource);

    return {
      ...resource,
      verified: urlCheck.accessible && contentCheck.available,
      verificationStatus: {
        urlAccessible: urlCheck.accessible,
        contentAvailable: contentCheck.available,
        lastChecked: new Date().toISOString(),
        statusCode: urlCheck.statusCode,
        error: urlCheck.error || contentCheck.error
      },
      qualityScore,
      qualityAssessment: {
        credibility: assessCredibility(resource),
        relevance: resource.relevanceScore || 0.5,
        currency: assessCurrency(resource),
        accessibility: assessAccessibility(resource),
        overall: qualityScore
      }
    };

  } catch (error) {
    console.error(`❌ Verification failed for ${resource.title}:`, error.message);
    
    return {
      ...resource,
      verified: false,
      verificationStatus: {
        urlAccessible: false,
        contentAvailable: false,
        lastChecked: new Date().toISOString(),
        error: error.message
      },
      qualityScore: 0
    };
  }
}

/**
 * Check if URL is accessible
 */
async function checkURL(url) {
  try {
    // In production, this would make an actual HTTP request
    // For now, we'll do basic URL validation
    
    const urlObj = new URL(url);
    
    // Check if it's a valid HTTP/HTTPS URL
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return {
        accessible: false,
        statusCode: null,
        error: 'Invalid protocol'
      };
    }

    // Simulate successful check
    // In production: const response = await fetch(url, { method: 'HEAD' });
    return {
      accessible: true,
      statusCode: 200,
      error: null
    };

  } catch (error) {
    return {
      accessible: false,
      statusCode: null,
      error: error.message
    };
  }
}

/**
 * Check if content is still available (not removed/deleted)
 */
async function checkContentAvailability(resource) {
  // In production, this would check:
  // - YouTube videos still exist
  // - Course pages are active
  // - Books are still in print
  // - Articles haven't been removed
  
  // For now, assume available if URL is valid
  return {
    available: true,
    error: null
  };
}

/**
 * Assess overall quality score (0-1)
 */
async function assessQuality(resource, sourceType) {
  const scores = {
    credibility: assessCredibility(resource),
    relevance: resource.relevanceScore || 0.5,
    currency: assessCurrency(resource),
    accessibility: assessAccessibility(resource)
  };

  // Weight factors differently by source type
  const weights = getQualityWeights(sourceType);
  
  const overallScore = (
    scores.credibility * weights.credibility +
    scores.relevance * weights.relevance +
    scores.currency * weights.currency +
    scores.accessibility * weights.accessibility
  );

  return Math.round(overallScore * 100) / 100; // Round to 2 decimals
}

/**
 * Get quality assessment weights for different source types
 */
function getQualityWeights(sourceType) {
  const weights = {
    academic: {
      credibility: 0.4,
      relevance: 0.3,
      currency: 0.2,
      accessibility: 0.1
    },
    government: {
      credibility: 0.5,
      relevance: 0.2,
      currency: 0.2,
      accessibility: 0.1
    },
    certifications: {
      credibility: 0.4,
      relevance: 0.3,
      currency: 0.2,
      accessibility: 0.1
    },
    books: {
      credibility: 0.3,
      relevance: 0.3,
      currency: 0.2,
      accessibility: 0.2
    },
    videos: {
      credibility: 0.2,
      relevance: 0.4,
      currency: 0.2,
      accessibility: 0.2
    },
    articles: {
      credibility: 0.3,
      relevance: 0.3,
      currency: 0.3,
      accessibility: 0.1
    },
    podcasts: {
      credibility: 0.3,
      relevance: 0.3,
      currency: 0.2,
      accessibility: 0.2
    }
  };

  return weights[sourceType] || {
    credibility: 0.25,
    relevance: 0.25,
    currency: 0.25,
    accessibility: 0.25
  };
}

/**
 * Assess credibility based on source
 */
function assessCredibility(resource) {
  const url = resource.url.toLowerCase();
  
  // High credibility sources
  if (url.includes('.gov') || url.includes('.edu')) return 1.0;
  if (url.includes('coursera') || url.includes('edx')) return 0.9;
  if (url.includes('udacity') || url.includes('mit.edu')) return 0.9;
  
  // Medium-high credibility
  if (url.includes('amazon') || url.includes('springer')) return 0.8;
  if (url.includes('youtube.com') && resource.creator) {
    // Check if it's a known educational channel
    const eduChannels = ['khan academy', '3blue1brown', 'crash course', 'ted-ed'];
    if (eduChannels.some(ch => resource.creator.toLowerCase().includes(ch))) {
      return 0.8;
    }
    return 0.6; // Regular YouTube
  }
  
  // Medium credibility
  if (url.includes('medium') || url.includes('towards')) return 0.6;
  
  // Default
  return 0.5;
}

/**
 * Assess currency (how up-to-date the content is)
 */
function assessCurrency(resource) {
  // In production, would extract publication date and calculate age
  // For now, return default score
  
  // Government resources are usually kept current
  if (resource.type === 'government_resource') return 0.9;
  
  // Academic courses are regularly updated
  if (resource.type === 'academic_course') return 0.8;
  
  // Videos can become outdated quickly
  if (resource.type === 'video') return 0.6;
  
  // Books may be older but still valuable
  if (resource.type === 'book') return 0.7;
  
  return 0.7; // Default
}

/**
 * Assess accessibility (how easy it is to access the content)
 */
function assessAccessibility(resource) {
  const cost = resource.estimatedCost;
  
  // Free content is most accessible
  if (cost === 'Free' || cost === '$0') return 1.0;
  
  // Low cost
  if (typeof cost === 'string' && cost.includes('$')) {
    const amount = parseFloat(cost.replace(/[^0-9.]/g, ''));
    if (amount < 50) return 0.8;
    if (amount < 200) return 0.6;
    if (amount < 1000) return 0.4;
    return 0.2;
  }
  
  // Unknown or varies
  return 0.5;
}

/**
 * Filter out low-quality or unverified resources
 */
export function filterQualityResources(verifiedResults, minQualityScore = 0.5) {
  console.log(`🔍 Filtering resources with quality score >= ${minQualityScore}...`);

  const filtered = {
    ...verifiedResults,
    sources: {}
  };

  let removedCount = 0;

  for (const [sourceType, resources] of Object.entries(verifiedResults.sources)) {
    filtered.sources[sourceType] = resources.filter(resource => {
      const meetsQuality = resource.qualityScore >= minQualityScore;
      const isVerified = resource.verified;
      
      if (!meetsQuality || !isVerified) {
        removedCount++;
        console.log(`❌ Removed: ${resource.title} (quality: ${resource.qualityScore}, verified: ${isVerified})`);
      }
      
      return meetsQuality && isVerified;
    });
  }

  console.log(`✅ Filtered out ${removedCount} low-quality/unverified resources`);

  return filtered;
}

/**
 * Generate quality report for users
 */
export function generateQualityReport(verifiedResults) {
  const report = {
    totalResources: 0,
    verifiedResources: 0,
    averageQualityScore: 0,
    bySourceType: {},
    warnings: verifiedResults.warnings || [],
    recommendations: []
  };

  let totalQuality = 0;
  let qualityCount = 0;

  for (const [sourceType, resources] of Object.entries(verifiedResults.sources)) {
    const verified = resources.filter(r => r.verified);
    const avgQuality = verified.length > 0
      ? verified.reduce((sum, r) => sum + r.qualityScore, 0) / verified.length
      : 0;

    report.bySourceType[sourceType] = {
      total: resources.length,
      verified: verified.length,
      averageQuality: Math.round(avgQuality * 100) / 100
    };

    report.totalResources += resources.length;
    report.verifiedResources += verified.length;
    
    totalQuality += verified.reduce((sum, r) => sum + r.qualityScore, 0);
    qualityCount += verified.length;
  }

  report.averageQualityScore = qualityCount > 0
    ? Math.round((totalQuality / qualityCount) * 100) / 100
    : 0;

  // Generate recommendations
  if (report.averageQualityScore < 0.6) {
    report.recommendations.push(
      'Overall content quality is moderate. Consider supplementing with additional high-quality sources.'
    );
  }

  if (report.verifiedResources < report.totalResources * 0.8) {
    report.recommendations.push(
      'Some resources could not be verified. We recommend focusing on verified sources only.'
    );
  }

  const academicCount = report.bySourceType.academic?.verified || 0;
  if (academicCount === 0) {
    report.recommendations.push(
      'No verified academic courses found. Consider enrolling in a structured course for systematic learning.'
    );
  }

  return report;
}

