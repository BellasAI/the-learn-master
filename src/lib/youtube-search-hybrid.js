/**
 * Hybrid YouTube Search using OpenAI + YouTube RSS
 * 
 * This approach uses:
 * 1. YouTube RSS feeds (no API key needed)
 * 2. OpenAI to analyze and filter educational content
 * 3. Smart ranking and relevance scoring
 */

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || 
                       (typeof process !== 'undefined' ? process.env.OPENAI_API_KEY : null);
const OPENAI_BASE_URL = import.meta.env.VITE_OPENAI_BASE_URL || 
                        (typeof process !== 'undefined' ? process.env.OPENAI_BASE_URL : null) ||
                        'https://api.openai.com/v1';

/**
 * Search YouTube using RSS feeds + OpenAI analysis
 * This works without YouTube API key!
 */
export async function searchYouTubeHybrid(topic, options = {}) {
  const {
    maxResults = 15,
    level = 'beginner',
    preferredChannels = ''
  } = options;

  console.log('🔍 Hybrid search for:', topic);

  try {
    // Step 1: Get videos from YouTube RSS (no API key needed!)
    const rssVideos = await searchYouTubeRSS(topic, maxResults);
    
    if (rssVideos.length === 0) {
      throw new Error('No videos found via RSS feed');
    }

    console.log(`📺 Found ${rssVideos.length} videos from RSS`);

    // Step 2: Use OpenAI to analyze and filter educational content
    const analyzedVideos = await analyzeVideosWithAI(rssVideos, topic, level);

    // Step 3: Boost preferred channels
    if (preferredChannels) {
      const channelList = preferredChannels.toLowerCase().split(',').map(c => c.trim());
      analyzedVideos.forEach(video => {
        if (channelList.some(ch => video.channelName.toLowerCase().includes(ch))) {
          video.relevanceScore = Math.min(video.relevanceScore + 0.15, 1.0);
          video.preferredChannel = true;
        }
      });
    }

    // Step 4: Sort by relevance
    analyzedVideos.sort((a, b) => b.relevanceScore - a.relevanceScore);

    console.log(`✅ Returning ${analyzedVideos.length} curated videos`);
    return analyzedVideos;

  } catch (error) {
    console.error('❌ Hybrid search failed:', error);
    throw error;
  }
}

/**
 * Search YouTube RSS feeds (no API key needed!)
 */
async function searchYouTubeRSS(topic, maxResults) {
  // Use SPECIFIC search queries that maintain the exact topic
  const searches = [
    `${topic} tutorial`,
    `${topic} course`,
    `${topic} explained`,
    `learn ${topic}`
  ];

  const allVideos = [];
  const seenIds = new Set();

  for (const query of searches) {
    try {
      const url = `https://www.youtube.com/feeds/videos.xml?search_query=${encodeURIComponent(query)}`;
      const response = await fetch(url);
      
      if (!response.ok) continue;

      const xmlText = await response.text();
      const videos = parseYouTubeRSS(xmlText);

      // Add unique videos
      videos.forEach(video => {
        if (!seenIds.has(video.id) && allVideos.length < maxResults * 2) {
          seenIds.add(video.id);
          allVideos.push(video);
        }
      });

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.warn('RSS search failed for:', query, error);
    }
  }

  return allVideos;
}

/**
 * Parse YouTube RSS XML feed
 */
function parseYouTubeRSS(xmlText) {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    const entries = xmlDoc.querySelectorAll('entry');
    
    const videos = [];
    entries.forEach(entry => {
      try {
        const videoId = entry.querySelector('yt\\:videoId, videoId')?.textContent;
        const title = entry.querySelector('title')?.textContent;
        const author = entry.querySelector('author name')?.textContent;
        const published = entry.querySelector('published')?.textContent;
        const mediaGroup = entry.querySelector('media\\:group, group');
        const description = mediaGroup?.querySelector('media\\:description, description')?.textContent || '';
        
        if (videoId && title) {
          videos.push({
            id: videoId,
            title: title,
            channelName: author || 'Unknown',
            channelId: '',
            duration: '10:00', // Unknown from RSS
            views: 0, // Unknown from RSS
            likes: 0,
            publishedAt: published ? published.split('T')[0] : '',
            description: description,
            thumbnail: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
            relevanceScore: 0.5, // Will be updated by AI
            tags: []
          });
        }
      } catch (err) {
        console.warn('Failed to parse RSS entry:', err);
      }
    });
    
    return videos;
  } catch (error) {
    console.error('Failed to parse RSS XML:', error);
    return [];
  }
}

/**
 * Use OpenAI to analyze videos and determine educational value
 */
async function analyzeVideosWithAI(videos, topic, level) {
  if (!OPENAI_API_KEY) {
    console.warn('⚠️ OpenAI API key not available, using basic filtering');
    return videos.map(video => ({
      ...video,
      relevanceScore: calculateBasicRelevance(video, topic, level)
    }));
  }

  try {
    // Prepare video data for AI analysis
    const videoSummaries = videos.map((v, i) => 
      `${i + 1}. "${v.title}" by ${v.channelName}\n   Description: ${v.description.substring(0, 200)}...`
    ).join('\n\n');

    const prompt = `You are an educational content curator. Analyze these YouTube videos for the SPECIFIC topic "${topic}" at ${level} level.

IMPORTANT: Be VERY strict about topic specificity!
- If the topic is "neural networks", only include videos specifically about neural networks
- Reject general "AI" or "machine learning" videos unless they focus on neural networks
- The video title and description MUST match the exact topic requested

For each video, provide:
1. Relevance score (0.0 to 1.0) - how SPECIFICALLY relevant is it to "${topic}"?
2. Educational value (0.0 to 1.0) - is it actually educational content?
3. Level appropriateness (0.0 to 1.0) - is it suitable for ${level} learners?

Videos:
${videoSummaries}

Respond in JSON format:
{
  "videos": [
    {"index": 1, "relevance": 0.9, "educational": 0.95, "levelMatch": 0.8, "reason": "brief reason"},
    ...
  ]
}

Filter out:
- Music videos
- Vlogs or personal content
- Pranks or entertainment
- Videos that are too general (e.g., general AI when topic is neural networks)
- Videos that don't specifically address "${topic}"

Only include videos that are genuinely educational and SPECIFICALLY about "${topic}".`;

    const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: 'You are an expert educational content curator.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiAnalysis = JSON.parse(data.choices[0].message.content);

    // Apply AI scores to videos
    const analyzedVideos = [];
    aiAnalysis.videos.forEach(analysis => {
      const video = videos[analysis.index - 1];
      if (video) {
        const overallScore = (
          analysis.relevance * 0.4 +
          analysis.educational * 0.4 +
          analysis.levelMatch * 0.2
        );

        // Only include videos with decent scores
        if (overallScore >= 0.5) {
          analyzedVideos.push({
            ...video,
            relevanceScore: overallScore,
            aiReason: analysis.reason,
            aiScores: {
              relevance: analysis.relevance,
              educational: analysis.educational,
              levelMatch: analysis.levelMatch
            }
          });
        }
      }
    });

    console.log(`✅ AI filtered ${videos.length} → ${analyzedVideos.length} educational videos`);
    return analyzedVideos;

  } catch (error) {
    console.error('❌ AI analysis failed:', error);
    console.warn('⚠️ Falling back to basic filtering');
    
    // Fallback to basic filtering
    return videos.map(video => ({
      ...video,
      relevanceScore: calculateBasicRelevance(video, topic, level)
    })).filter(v => v.relevanceScore >= 0.4);
  }
}

/**
 * Calculate basic relevance without AI
 */
function calculateBasicRelevance(video, topic, level) {
  let score = 0.3; // Base score

  const titleLower = video.title.toLowerCase();
  const topicLower = topic.toLowerCase();
  const descLower = video.description.toLowerCase();

  // Topic matching
  if (titleLower.includes(topicLower)) score += 0.3;
  else if (descLower.includes(topicLower)) score += 0.15;

  // Educational keywords
  const eduKeywords = ['tutorial', 'guide', 'explained', 'course', 'learn', 'introduction', 'how to'];
  if (eduKeywords.some(kw => titleLower.includes(kw))) score += 0.2;

  // Level matching
  if (level === 'beginner' && titleLower.includes('beginner')) score += 0.15;
  if (level === 'intermediate' && titleLower.includes('intermediate')) score += 0.15;
  if (level === 'advanced' && titleLower.includes('advanced')) score += 0.15;

  // Penalize non-educational content
  const badKeywords = ['music video', 'official video', 'vlog', 'prank', 'funny', 'compilation'];
  if (badKeywords.some(kw => titleLower.includes(kw))) score -= 0.5;

  return Math.max(0, Math.min(1.0, score));
}

/**
 * Get detailed video information by scraping (no API needed)
 */
export async function getVideoDetailsNoAPI(videoId) {
  try {
    // Use YouTube's oembed endpoint (no API key needed)
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const response = await fetch(url);
    
    if (!response.ok) return null;

    const data = await response.json();
    
    return {
      id: videoId,
      title: data.title,
      channelName: data.author_name,
      thumbnail: data.thumbnail_url,
      description: ''
    };
  } catch (error) {
    console.error('Failed to get video details:', error);
    return null;
  }
}

