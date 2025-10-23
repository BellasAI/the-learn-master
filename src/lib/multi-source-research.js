/**
 * Multi-Source Research Engine
 * 
 * Searches for educational content across multiple platforms:
 * - Academic courses (Coursera, edX, universities)
 * - Books (Amazon, Google Books)
 * - Professional certifications
 * - Government resources
 * - YouTube videos
 * - Articles and blogs
 * - Podcasts
 * 
 * Returns comprehensive, verified content with availability status
 */

import { searchYouTubeAPI } from './youtube-api.js';

/**
 * Main research function that searches all sources
 */
export async function conductMultiSourceResearch(topic, description, options = {}) {
  console.log('🔍 Starting multi-source research for:', topic);
  
  const results = {
    topic,
    description,
    timestamp: new Date().toISOString(),
    sources: {
      academic: [],
      books: [],
      certifications: [],
      government: [],
      videos: [],
      articles: [],
      podcasts: []
    },
    coverage: {
      fundamentals: 0,
      reinforcement: 0,
      practicalApplication: 0,
      advancedMastery: 0,
      overall: 0
    },
    gaps: [],
    totalCost: 0,
    estimatedHours: 0
  };

  try {
    // Run all searches in parallel for efficiency
    const [academic, books, certifications, government, videos, articles, podcasts] = await Promise.all([
      searchAcademicCourses(topic, description),
      searchBooks(topic, description),
      searchCertifications(topic, description),
      searchGovernmentResources(topic, description),
      searchVideos(topic, description, options),
      searchArticles(topic, description),
      searchPodcasts(topic, description)
    ]);

    results.sources.academic = academic;
    results.sources.books = books;
    results.sources.certifications = certifications;
    results.sources.government = government;
    results.sources.videos = videos;
    results.sources.articles = articles;
    results.sources.podcasts = podcasts;

    // Calculate coverage and gaps
    const analysis = await analyzeCoverageAndGaps(results, topic, description);
    results.coverage = analysis.coverage;
    results.gaps = analysis.gaps;
    results.totalCost = analysis.totalCost;
    results.estimatedHours = analysis.estimatedHours;

    console.log('✅ Multi-source research complete');
    console.log(`📊 Overall coverage: ${results.coverage.overall}%`);
    console.log(`❌ Identified ${results.gaps.length} content gaps`);

    return results;

  } catch (error) {
    console.error('❌ Multi-source research failed:', error);
    throw new Error(`Research failed: ${error.message}`);
  }
}

/**
 * Search for academic courses on platforms like Coursera, edX, etc.
 */
async function searchAcademicCourses(topic, description) {
  console.log('📚 Searching academic courses...');
  
  const courses = [];
  
  // Search query combining topic and description
  const searchQuery = description 
    ? `${topic} ${description} course online`
    : `${topic} course online`;

  try {
    // Search for courses using web search
    // In production, this would use actual APIs from Coursera, edX, etc.
    const courseResults = await searchWeb(searchQuery + ' site:coursera.org OR site:edx.org OR site:udacity.com');
    
    // Parse and structure course results
    for (const result of courseResults.slice(0, 5)) {
      courses.push({
        type: 'academic_course',
        title: result.title,
        provider: extractProvider(result.url),
        url: result.url,
        description: result.snippet,
        estimatedCost: extractCost(result.snippet) || 'Varies',
        estimatedHours: extractHours(result.snippet) || 'Unknown',
        level: extractLevel(result.snippet),
        verified: false, // Will be verified in next phase
        relevanceScore: 0.8
      });
    }
  } catch (error) {
    console.warn('⚠️ Academic course search failed:', error.message);
  }

  console.log(`✅ Found ${courses.length} academic courses`);
  return courses;
}

/**
 * Search for books on Amazon, Google Books, etc.
 */
async function searchBooks(topic, description) {
  console.log('📖 Searching books...');
  
  const books = [];
  
  const searchQuery = description 
    ? `${topic} ${description} book`
    : `${topic} book`;

  try {
    // Search for books
    const bookResults = await searchWeb(searchQuery + ' site:amazon.com OR site:books.google.com');
    
    for (const result of bookResults.slice(0, 5)) {
      books.push({
        type: 'book',
        title: result.title,
        author: extractAuthor(result.snippet),
        url: result.url,
        description: result.snippet,
        estimatedCost: extractCost(result.snippet) || '$20-40',
        format: extractFormat(result.snippet) || 'Physical/eBook',
        verified: false,
        relevanceScore: 0.7
      });
    }
  } catch (error) {
    console.warn('⚠️ Book search failed:', error.message);
  }

  console.log(`✅ Found ${books.length} books`);
  return books;
}

/**
 * Search for professional certifications
 */
async function searchCertifications(topic, description) {
  console.log('🎓 Searching certifications...');
  
  const certifications = [];
  
  const searchQuery = description 
    ? `${topic} ${description} certification professional`
    : `${topic} certification professional`;

  try {
    const certResults = await searchWeb(searchQuery);
    
    for (const result of certResults.slice(0, 3)) {
      certifications.push({
        type: 'certification',
        title: result.title,
        provider: extractProvider(result.url),
        url: result.url,
        description: result.snippet,
        estimatedCost: extractCost(result.snippet) || 'Varies',
        estimatedHours: extractHours(result.snippet) || 'Unknown',
        prerequisites: extractPrerequisites(result.snippet),
        verified: false,
        relevanceScore: 0.75
      });
    }
  } catch (error) {
    console.warn('⚠️ Certification search failed:', error.message);
  }

  console.log(`✅ Found ${certifications.length} certifications`);
  return certifications;
}

/**
 * Search for government resources and official guides
 */
async function searchGovernmentResources(topic, description) {
  console.log('🏛️ Searching government resources...');
  
  const resources = [];
  
  const searchQuery = description 
    ? `${topic} ${description} government guide official`
    : `${topic} government guide official`;

  try {
    const govResults = await searchWeb(searchQuery + ' site:.gov OR site:.edu');
    
    for (const result of govResults.slice(0, 5)) {
      resources.push({
        type: 'government_resource',
        title: result.title,
        agency: extractAgency(result.url),
        url: result.url,
        description: result.snippet,
        estimatedCost: 'Free',
        format: 'PDF/Web',
        verified: false,
        relevanceScore: 0.9 // Government sources are highly credible
      });
    }
  } catch (error) {
    console.warn('⚠️ Government resource search failed:', error.message);
  }

  console.log(`✅ Found ${resources.length} government resources`);
  return resources;
}

/**
 * Search for videos (YouTube and other platforms)
 */
async function searchVideos(topic, description, options) {
  console.log('🎥 Searching videos...');
  
  try {
    // Use existing YouTube API search
    const videos = await searchYouTubeAPI(topic, {
      ...options,
      additionalKeywords: description ? [description] : [],
      maxResults: 20
    });

    return videos.map(video => ({
      type: 'video',
      title: video.title,
      creator: video.channelTitle,
      url: `https://www.youtube.com/watch?v=${video.id}`,
      thumbnail: video.thumbnail,
      description: video.description,
      duration: video.duration,
      estimatedCost: 'Free',
      verified: false,
      relevanceScore: video.relevanceScore || 0.6
    }));

  } catch (error) {
    console.warn('⚠️ Video search failed:', error.message);
    return [];
  }
}

/**
 * Search for articles and blog posts
 */
async function searchArticles(topic, description) {
  console.log('📰 Searching articles...');
  
  const articles = [];
  
  const searchQuery = description 
    ? `${topic} ${description} tutorial guide article`
    : `${topic} tutorial guide article`;

  try {
    const articleResults = await searchWeb(searchQuery);
    
    for (const result of articleResults.slice(0, 10)) {
      // Filter out low-quality sources
      if (isQualitySource(result.url)) {
        articles.push({
          type: 'article',
          title: result.title,
          publisher: extractDomain(result.url),
          url: result.url,
          description: result.snippet,
          estimatedCost: 'Free',
          format: 'Web',
          verified: false,
          relevanceScore: 0.6
        });
      }
    }
  } catch (error) {
    console.warn('⚠️ Article search failed:', error.message);
  }

  console.log(`✅ Found ${articles.length} articles`);
  return articles;
}

/**
 * Search for podcasts
 */
async function searchPodcasts(topic, description) {
  console.log('🎙️ Searching podcasts...');
  
  const podcasts = [];
  
  const searchQuery = description 
    ? `${topic} ${description} podcast`
    : `${topic} podcast`;

  try {
    const podcastResults = await searchWeb(searchQuery + ' site:spotify.com OR site:apple.com/podcasts');
    
    for (const result of podcastResults.slice(0, 5)) {
      podcasts.push({
        type: 'podcast',
        title: result.title,
        host: extractHost(result.snippet),
        url: result.url,
        description: result.snippet,
        estimatedCost: 'Free',
        format: 'Audio',
        verified: false,
        relevanceScore: 0.5
      });
    }
  } catch (error) {
    console.warn('⚠️ Podcast search failed:', error.message);
  }

  console.log(`✅ Found ${podcasts.length} podcasts`);
  return podcasts;
}

/**
 * Analyze coverage and identify gaps using AI
 */
async function analyzeCoverageAndGaps(results, topic, description) {
  console.log('📊 Analyzing coverage and gaps...');

  // Count resources by type
  const resourceCounts = {
    academic: results.sources.academic.length,
    books: results.sources.books.length,
    certifications: results.sources.certifications.length,
    government: results.sources.government.length,
    videos: results.sources.videos.length,
    articles: results.sources.articles.length,
    podcasts: results.sources.podcasts.length
  };

  // Calculate coverage for each stage
  // This is a simplified algorithm - in production would use AI analysis
  const coverage = {
    fundamentals: calculateStageCoverage(results, 'fundamentals'),
    reinforcement: calculateStageCoverage(results, 'reinforcement'),
    practicalApplication: calculateStageCoverage(results, 'practicalApplication'),
    advancedMastery: calculateStageCoverage(results, 'advancedMastery'),
    overall: 0
  };

  coverage.overall = Math.round(
    (coverage.fundamentals + coverage.reinforcement + 
     coverage.practicalApplication + coverage.advancedMastery) / 4
  );

  // Identify gaps
  const gaps = identifyContentGaps(results, coverage, topic, description);

  // Calculate total cost and time
  const { totalCost, estimatedHours } = calculateTotals(results);

  return {
    coverage,
    gaps,
    totalCost,
    estimatedHours
  };
}

/**
 * Calculate coverage for a specific learning stage
 */
function calculateStageCoverage(results, stage) {
  // Simplified coverage calculation
  // In production, this would use AI to analyze content relevance to each stage
  
  const weights = {
    academic: 0.3,
    books: 0.2,
    certifications: 0.2,
    government: 0.1,
    videos: 0.1,
    articles: 0.05,
    podcasts: 0.05
  };

  let coverage = 0;
  
  // Academic courses are most valuable
  if (results.sources.academic.length > 0) coverage += 30;
  if (results.sources.academic.length > 2) coverage += 20;
  
  // Books provide depth
  if (results.sources.books.length > 0) coverage += 20;
  if (results.sources.books.length > 2) coverage += 10;
  
  // Certifications validate skills
  if (results.sources.certifications.length > 0) coverage += 20;
  
  // Government resources for official info
  if (results.sources.government.length > 0) coverage += 10;
  
  // Videos for demonstrations
  if (results.sources.videos.length > 5) coverage += 10;
  
  // Articles for supplementary info
  if (results.sources.articles.length > 5) coverage += 5;
  
  // Podcasts for expert insights
  if (results.sources.podcasts.length > 0) coverage += 5;

  return Math.min(coverage, 100); // Cap at 100%
}

/**
 * Identify content gaps
 */
function identifyContentGaps(results, coverage, topic, description) {
  const gaps = [];

  // Check for missing critical resources
  if (results.sources.academic.length === 0) {
    gaps.push({
      type: 'academic_course',
      severity: 'high',
      title: `Comprehensive ${topic} Course`,
      description: `No structured academic courses found for ${topic}. This makes it difficult to learn fundamentals systematically.`,
      impact: 'Users will need to piece together knowledge from multiple sources without structured guidance.',
      opportunity: 'HIGH - Creating a comprehensive course would fill a significant gap',
      estimatedDemand: 'Unknown - requires market research'
    });
  }

  if (results.sources.certifications.length === 0) {
    gaps.push({
      type: 'certification',
      severity: 'medium',
      title: `Professional ${topic} Certification`,
      description: `No professional certifications found for ${topic}. This makes it harder to validate skills to employers.`,
      impact: 'Users cannot prove their expertise through recognized credentials.',
      opportunity: 'MEDIUM - Certification programs require significant expertise and authority',
      estimatedDemand: 'Unknown - requires market research'
    });
  }

  if (results.sources.government.length === 0 && requiresRegulation(topic)) {
    gaps.push({
      type: 'government_guide',
      severity: 'high',
      title: `Official ${topic} Regulations and Guidelines`,
      description: `No government resources found for ${topic}. This may indicate missing legal/regulatory guidance.`,
      impact: 'Users may not understand legal requirements or compliance issues.',
      opportunity: 'LOW - Government creates these resources, not private creators',
      estimatedDemand: 'Unknown'
    });
  }

  // Check stage-specific gaps
  if (coverage.practicalApplication < 50) {
    gaps.push({
      type: 'practical_guide',
      severity: 'high',
      title: `Practical Application Guide for ${topic}`,
      description: `Limited practical, hands-on resources found. Theory is covered but application is weak.`,
      impact: 'Users will struggle to apply knowledge in real-world situations.',
      opportunity: 'HIGH - Practical guides and tutorials are highly valued',
      estimatedDemand: 'Unknown - requires market research'
    });
  }

  if (coverage.advancedMastery < 40) {
    gaps.push({
      type: 'advanced_content',
      severity: 'medium',
      title: `Advanced ${topic} Techniques and Mastery`,
      description: `Limited advanced-level content found. Beginners are well-served but experts have few resources.`,
      impact: 'Users will hit a ceiling and cannot progress to expert level.',
      opportunity: 'MEDIUM - Advanced content requires deep expertise',
      estimatedDemand: 'Unknown - requires market research'
    });
  }

  return gaps;
}

/**
 * Check if topic requires regulatory/government guidance
 */
function requiresRegulation(topic) {
  const regulatedTopics = [
    'wine', 'alcohol', 'brewing', 'distilling',
    'medical', 'healthcare', 'pharmacy',
    'legal', 'law', 'attorney',
    'financial', 'accounting', 'tax',
    'construction', 'electrical', 'plumbing',
    'food', 'restaurant', 'catering'
  ];

  return regulatedTopics.some(regulated => 
    topic.toLowerCase().includes(regulated)
  );
}

/**
 * Calculate total cost and time investment
 */
function calculateTotals(results) {
  let totalCost = 0;
  let estimatedHours = 0;

  // Sum up costs from all sources
  for (const sourceType of Object.values(results.sources)) {
    for (const resource of sourceType) {
      const cost = parseCost(resource.estimatedCost);
      totalCost += cost;

      const hours = parseHours(resource.estimatedHours);
      estimatedHours += hours;
    }
  }

  return {
    totalCost: Math.round(totalCost),
    estimatedHours: Math.round(estimatedHours)
  };
}

/**
 * Helper function to search the web
 * In production, this would use a real search API
 */
async function searchWeb(query) {
  // Placeholder - in production would use Google Custom Search API or similar
  console.log(`🔍 Web search: ${query}`);
  
  // For now, return empty results
  // In production, this would make actual API calls
  return [];
}

/**
 * Helper functions to extract information from search results
 */
function extractProvider(url) {
  if (url.includes('coursera')) return 'Coursera';
  if (url.includes('edx')) return 'edX';
  if (url.includes('udacity')) return 'Udacity';
  if (url.includes('udemy')) return 'Udemy';
  return extractDomain(url);
}

function extractDomain(url) {
  try {
    const domain = new URL(url).hostname;
    return domain.replace('www.', '');
  } catch {
    return 'Unknown';
  }
}

function extractCost(text) {
  const costMatch = text.match(/\$\d+(?:,\d{3})*(?:\.\d{2})?/);
  return costMatch ? costMatch[0] : null;
}

function extractHours(text) {
  const hoursMatch = text.match(/(\d+)\s*(?:hours?|hrs?)/i);
  return hoursMatch ? `${hoursMatch[1]} hours` : null;
}

function extractLevel(text) {
  if (/beginner|introductory|basics/i.test(text)) return 'Beginner';
  if (/advanced|expert|master/i.test(text)) return 'Advanced';
  if (/intermediate/i.test(text)) return 'Intermediate';
  return 'All Levels';
}

function extractAuthor(text) {
  const authorMatch = text.match(/by\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/);
  return authorMatch ? authorMatch[1] : 'Unknown';
}

function extractFormat(text) {
  if (/kindle|ebook|digital/i.test(text)) return 'eBook';
  if (/hardcover|paperback|physical/i.test(text)) return 'Physical';
  return 'Physical/eBook';
}

function extractPrerequisites(text) {
  const prereqMatch = text.match(/prerequisite[s]?:?\s*([^.]+)/i);
  return prereqMatch ? prereqMatch[1].trim() : 'None specified';
}

function extractAgency(url) {
  const domain = extractDomain(url);
  return domain.replace('.gov', '').replace('.edu', '').toUpperCase();
}

function extractHost(text) {
  const hostMatch = text.match(/hosted by\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i);
  return hostMatch ? hostMatch[1] : 'Unknown';
}

function isQualitySource(url) {
  // Filter out low-quality sources
  const lowQuality = ['pinterest', 'facebook', 'twitter', 'instagram'];
  return !lowQuality.some(site => url.includes(site));
}

function parseCost(costString) {
  if (!costString || costString === 'Free' || costString === 'Varies' || costString === 'Unknown') {
    return 0;
  }
  
  // Extract first number from string like "$150" or "$20-40"
  const match = costString.match(/\$?(\d+(?:,\d{3})*(?:\.\d{2})?)/);
  if (match) {
    return parseFloat(match[1].replace(',', ''));
  }
  
  return 0;
}

function parseHours(hoursString) {
  if (!hoursString || hoursString === 'Unknown' || hoursString === 'Varies') {
    return 0;
  }
  
  const match = hoursString.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

