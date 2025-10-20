/**
 * YouTube Search Integration
 * 
 * This module provides multiple methods to search YouTube:
 * 1. Hybrid Search (RSS + OpenAI) - Works without YouTube API key!
 * 2. YouTube Data API v3 - Best quality, requires API key
 * 3. Fallback methods - When all else fails
 */

import { searchYouTubeHybrid } from './youtube-search-hybrid';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

/**
 * Search YouTube for educational videos on a specific topic
 * @param {string} topic - The topic to search for
 * @param {Object} options - Search options
 * @returns {Promise<Array>} - Array of video results
 */
export async function searchYouTubeVideos(topic, options = {}) {
  const {
    maxResults = 25,
    order = 'relevance',
    videoDuration = 'medium', // short, medium, long, any
    preferredChannels = '',
    level = 'beginner'
  } = options;

  console.log('🔍 Searching YouTube for:', topic);

  try {
    // Method 1: Try Hybrid Search first (RSS + OpenAI - works without YouTube API!)
    console.log('🤖 Attempting hybrid search (RSS + AI)...');
    try {
      const hybridResults = await searchYouTubeHybrid(topic, options);
      if (hybridResults && hybridResults.length > 0) {
        console.log(`✅ Hybrid search successful: ${hybridResults.length} videos`);
        return hybridResults;
      }
    } catch (hybridError) {
      console.warn('⚠️ Hybrid search failed:', hybridError.message);
    }

    // Method 2: Try YouTube Data API (if key is configured)
    if (!YOUTUBE_API_KEY) {
      console.warn('⚠️ YouTube API key not configured');
      console.warn('⚠️ Hybrid search also failed');
      throw new Error('Unable to search YouTube. Please configure YouTube API key or check your internet connection.');
    }

    // Build search query with additional keywords from options
    const searchQuery = buildSearchQuery(topic, level, options.additionalKeywords);
    console.log('🔑 Using YouTube Data API...');

    // Continue with YouTube API search...

    // Search for videos
    const searchUrl = `${YOUTUBE_API_BASE}/search?` + new URLSearchParams({
      part: 'snippet',
      q: searchQuery,
      type: 'video',
      maxResults: maxResults,
      order: order,
      videoDuration: videoDuration,
      videoDefinition: 'any',
      videoEmbeddable: 'true',
      key: YOUTUBE_API_KEY
    });

    const searchResponse = await fetch(searchUrl);
    
    if (!searchResponse.ok) {
      throw new Error(`YouTube API error: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    
    if (!searchData.items || searchData.items.length === 0) {
      console.warn('⚠️ No videos found, using fallback');
      return await fallbackSearch(topic, options);
    }

    // Get video IDs
    const videoIds = searchData.items.map(item => item.id.videoId).join(',');

    // Get detailed video information
    const detailsUrl = `${YOUTUBE_API_BASE}/videos?` + new URLSearchParams({
      part: 'snippet,contentDetails,statistics',
      id: videoIds,
      key: YOUTUBE_API_KEY
    });

    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    // Transform to our format
    const videos = detailsData.items.map(video => ({
      id: video.id,
      title: video.snippet.title,
      channelName: video.snippet.channelTitle,
      channelId: video.snippet.channelId,
      duration: parseDuration(video.contentDetails.duration),
      views: parseInt(video.statistics.viewCount),
      likes: parseInt(video.statistics.likeCount || 0),
      publishedAt: video.snippet.publishedAt.split('T')[0],
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.medium.url,
      relevanceScore: calculateRelevanceScore(video, topic, level),
      tags: video.snippet.tags || [],
      categoryId: video.snippet.categoryId
    }));

    // Filter out non-educational content
    const educationalVideos = videos.filter(video => 
      isEducationalContent(video, topic)
    );

    // Boost preferred channels
    if (preferredChannels) {
      const channelList = preferredChannels.toLowerCase().split(',').map(c => c.trim());
      educationalVideos.forEach(video => {
        if (channelList.some(ch => video.channelName.toLowerCase().includes(ch))) {
          video.relevanceScore += 0.15;
          video.preferredChannel = true;
        }
      });
    }

    console.log(`✅ Found ${educationalVideos.length} educational videos`);
    return educationalVideos;

  } catch (error) {
    console.error('❌ YouTube API error:', error);
    console.warn('⚠️ Falling back to alternative search');
    return await fallbackSearch(topic, options);
  }
}

/**
 * Build search query with educational modifiers
 * Now accepts additional keywords for more specific searches
 */
function buildSearchQuery(topic, level, additionalKeywords = []) {
  const levelModifiers = {
    'beginner': 'tutorial',
    'intermediate': 'explained',
    'advanced': 'advanced'
  };

  const modifier = levelModifiers[level] || 'tutorial';
  
  // If we have additional keywords (from description), include them
  // This makes "gardening" + ["fruit growing"] become "fruit growing tutorial"
  if (additionalKeywords && additionalKeywords.length > 0) {
    const keywords = additionalKeywords.join(' ');
    return `${keywords} ${modifier}`;
  }
  
  // Use the EXACT topic with minimal modification
  // This ensures "neural networks" stays "neural networks", not "AI"
  return `${topic} ${modifier}`;}

/**
 * Calculate relevance score for a video
 */
function calculateRelevanceScore(video, topic, level) {
  let score = 0.3; // Lower base score - must earn relevance

  const titleLower = video.snippet.title.toLowerCase();
  const topicLower = topic.toLowerCase();
  const descLower = video.snippet.description.toLowerCase();

  // CRITICAL: Title MUST contain the specific topic or key terms
  // Split topic into key terms (e.g., "neural networks" -> ["neural", "networks"])
  const topicTerms = topicLower.split(' ').filter(term => term.length > 3);
  
  // Check if title contains the EXACT topic phrase
  if (titleLower.includes(topicLower)) {
    score += 0.4; // Big boost for exact match
  } else {
    // Check if title contains most key terms
    const termsInTitle = topicTerms.filter(term => titleLower.includes(term));
    if (termsInTitle.length >= topicTerms.length * 0.7) {
      score += 0.25; // Decent boost for partial match
    } else if (termsInTitle.length > 0) {
      score += 0.1; // Small boost for some terms
    } else {
      // No key terms found - heavily penalize
      score -= 0.3;
    }
  }

  // Title contains educational keywords
  const eduKeywords = ['tutorial', 'guide', 'explained', 'course', 'learn', 'introduction'];
  if (eduKeywords.some(kw => titleLower.includes(kw))) score += 0.1;

  // Level appropriateness
  if (level === 'beginner' && titleLower.includes('beginner')) score += 0.1;
  if (level === 'intermediate' && titleLower.includes('intermediate')) score += 0.1;
  if (level === 'advanced' && titleLower.includes('advanced')) score += 0.1;

  // Description relevance (less important than title)
  if (descLower.includes(topicLower)) score += 0.15;
  else {
    const termsInDesc = topicTerms.filter(term => descLower.includes(term));
    if (termsInDesc.length >= topicTerms.length * 0.5) score += 0.08;
  }

  // High engagement (quality indicator)
  const views = parseInt(video.statistics.viewCount);
  const likes = parseInt(video.statistics.likeCount || 0);
  if (views > 100000) score += 0.05;
  if (views > 500000) score += 0.05;
  if (likes / views > 0.02) score += 0.05; // Good like ratio

  // Recent content (within 2 years)
  const publishDate = new Date(video.snippet.publishedAt);
  const monthsOld = (Date.now() - publishDate) / (1000 * 60 * 60 * 24 * 30);
  if (monthsOld < 24) score += 0.05;

  // Educational category (27 = Education)
  if (video.snippet.categoryId === '27') score += 0.1;

  return Math.min(score, 1.0);
}

/**
 * Check if video is educational content
 * Now much stricter about topic relevance
 */
function isEducationalContent(video, topic) {
  const title = video.title.toLowerCase();
  const description = video.description.toLowerCase();
  const topicLower = topic.toLowerCase();

  // STRICT: Must be related to the SPECIFIC topic
  const topicTerms = topicLower.split(' ').filter(term => term.length > 3);
  
  // Check if title contains the exact topic or most key terms
  if (title.includes(topicLower)) {
    // Exact match - good!
  } else {
    // Check for key terms
    const termsInTitle = topicTerms.filter(term => title.includes(term));
    const termsInDesc = topicTerms.filter(term => description.includes(term));
    
    // Must have at least 70% of key terms in title OR description
    const titleMatch = termsInTitle.length >= topicTerms.length * 0.7;
    const descMatch = termsInDesc.length >= topicTerms.length * 0.7;
    
    if (!titleMatch && !descMatch) {
      // Not specific enough to the topic
      return false;
    }
  }

  // Filter out obvious non-educational content
  const nonEducationalKeywords = [
    'music video', 'official video', 'lyric video', 'live performance',
    'concert', 'vlog', 'prank', 'reaction', 'unboxing', 'haul',
    'gameplay', 'let\'s play', 'funny moments', 'compilation',
    'meme', 'tiktok', 'shorts', 'challenge'
  ];

  const hasNonEducational = nonEducationalKeywords.some(kw => 
    title.includes(kw) || description.includes(kw)
  );

  if (hasNonEducational) return false;

  // Prefer educational indicators
  const educationalKeywords = [
    'tutorial', 'guide', 'explained', 'course', 'learn', 'lesson',
    'introduction', 'how to', 'understanding', 'basics', 'fundamentals',
    'complete guide', 'crash course', 'masterclass', 'lecture'
  ];

  const hasEducational = educationalKeywords.some(kw => 
    title.includes(kw) || description.includes(kw)
  );

  // If it has educational keywords, it's likely educational
  if (hasEducational) return true;

  // If duration is very short (< 2 min) or very long (> 2 hours), be skeptical
  const durationParts = video.duration.split(':');
  const totalMinutes = durationParts.length === 3 
    ? parseInt(durationParts[0]) * 60 + parseInt(durationParts[1])
    : parseInt(durationParts[0]);

  if (totalMinutes < 2 || totalMinutes > 120) return false;

  // Default: allow if topic-related and no red flags
  return true;
}

/**
 * Parse ISO 8601 duration to readable format
 */
function parseDuration(isoDuration) {
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  
  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');

  const parts = [];
  if (hours) parts.push(hours.padStart(2, '0'));
  parts.push((minutes || '0').padStart(2, '0'));
  parts.push((seconds || '0').padStart(2, '0'));

  return parts.join(':');
}

/**
 * Fallback search using alternative methods when YouTube API is unavailable
 */
async function fallbackSearch(topic, options) {
  console.warn('⚠️ Using fallback search - results may be limited');
  
  // Option 1: Try YouTube RSS feed (no API key needed)
  try {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?search_query=${encodeURIComponent(topic + ' tutorial')}`;
    const response = await fetch(rssUrl);
    
    if (response.ok) {
      const xmlText = await response.text();
      const videos = parseYouTubeRSS(xmlText, topic);
      if (videos.length > 0) {
        console.log(`✅ Fallback found ${videos.length} videos via RSS`);
        return videos;
      }
    }
  } catch (error) {
    console.error('RSS fallback failed:', error);
  }

  // Option 2: Return curated educational channels for the topic
  console.warn('⚠️ All search methods failed - returning curated recommendations');
  return getCuratedVideos(topic, options.level);
}

/**
 * Parse YouTube RSS feed
 */
function parseYouTubeRSS(xmlText, topic) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
  const entries = xmlDoc.querySelectorAll('entry');
  
  const videos = [];
  entries.forEach(entry => {
    const videoId = entry.querySelector('videoId')?.textContent;
    const title = entry.querySelector('title')?.textContent;
    const channelName = entry.querySelector('author name')?.textContent;
    const published = entry.querySelector('published')?.textContent;
    
    if (videoId && title) {
      videos.push({
        id: videoId,
        title: title,
        channelName: channelName || 'Unknown',
        channelId: '',
        duration: '10:00', // Unknown from RSS
        views: 0,
        publishedAt: published?.split('T')[0] || '',
        description: '',
        thumbnail: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
        relevanceScore: 0.6,
        tags: [topic]
      });
    }
  });
  
  return videos;
}

/**
 * Get curated educational videos as last resort
 * These are verified educational channels
 */
function getCuratedVideos(topic, level) {
  console.warn('⚠️ CRITICAL: Returning curated recommendations only');
  console.warn('⚠️ Please configure YouTube API key for real search results');
  
  // Return empty array with warning rather than fake videos
  // This forces the user to configure the API properly
  return [];
}

/**
 * Get video details by ID
 */
export async function getVideoDetails(videoId) {
  if (!YOUTUBE_API_KEY) {
    return null;
  }

  try {
    const url = `${YOUTUBE_API_BASE}/videos?` + new URLSearchParams({
      part: 'snippet,contentDetails,statistics',
      id: videoId,
      key: YOUTUBE_API_KEY
    });

    const response = await fetch(url);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const video = data.items[0];
      return {
        id: video.id,
        title: video.snippet.title,
        channelName: video.snippet.channelTitle,
        duration: parseDuration(video.contentDetails.duration),
        views: parseInt(video.statistics.viewCount),
        description: video.snippet.description,
        thumbnail: video.snippet.thumbnails.medium.url
      };
    }
  } catch (error) {
    console.error('Error fetching video details:', error);
  }

  return null;
}

