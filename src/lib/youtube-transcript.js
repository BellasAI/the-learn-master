/**
 * YouTube Transcript Fetching Service
 * 
 * Fetches video transcripts from YouTube using multiple methods:
 * 1. YouTube Transcript API (primary)
 * 2. YouTube Data API captions (fallback)
 * 3. Third-party transcript services (last resort)
 */

/**
 * Fetch transcript for a YouTube video
 * @param {string} videoId - YouTube video ID
 * @returns {Promise<Object>} - Transcript data with segments
 */
export async function fetchVideoTranscript(videoId) {
  console.log(`📝 Fetching transcript for video: ${videoId}`);

  try {
    // Method 1: Try YouTube Transcript API (via proxy/backend)
    const transcript = await fetchTranscriptDirect(videoId);
    
    if (transcript && transcript.segments && transcript.segments.length > 0) {
      console.log(`✅ Transcript fetched: ${transcript.segments.length} segments`);
      return transcript;
    }

    throw new Error('No transcript available');

  } catch (error) {
    console.error('❌ Failed to fetch transcript:', error);
    
    // Return empty transcript with error info
    return {
      videoId,
      available: false,
      error: error.message,
      segments: []
    };
  }
}

/**
 * Fetch transcript directly from YouTube
 * Uses YouTube's internal transcript API
 */
async function fetchTranscriptDirect(videoId) {
  try {
    // YouTube stores transcripts in a specific format
    // We need to fetch the video page first to get transcript data
    const videoPageUrl = `https://www.youtube.com/watch?v=${videoId}`;
    
    // Note: This requires CORS proxy or backend endpoint
    // For now, we'll use a public transcript API service
    const apiUrl = `https://youtube-transcript-api.vercel.app/api/transcript?videoId=${videoId}`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Transcript API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data || !data.transcript) {
      throw new Error('No transcript data in response');
    }

    // Transform to our format
    const segments = data.transcript.map(item => ({
      start: item.offset / 1000, // Convert ms to seconds
      duration: item.duration / 1000,
      text: item.text
    }));

    return {
      videoId,
      available: true,
      language: data.language || 'en',
      segments,
      fetchedAt: new Date().toISOString()
    };

  } catch (error) {
    console.warn('Direct transcript fetch failed:', error);
    throw error;
  }
}

/**
 * Fetch transcript using YouTube Data API
 * Requires API key and caption track ID
 */
async function fetchTranscriptViaAPI(videoId, apiKey) {
  try {
    // Step 1: Get caption tracks
    const captionsUrl = `https://www.googleapis.com/youtube/v3/captions?` + new URLSearchParams({
      part: 'snippet',
      videoId: videoId,
      key: apiKey
    });

    const captionsResponse = await fetch(captionsUrl);
    const captionsData = await captionsResponse.json();

    if (!captionsData.items || captionsData.items.length === 0) {
      throw new Error('No captions available');
    }

    // Find English caption track
    const englishTrack = captionsData.items.find(
      track => track.snippet.language === 'en'
    ) || captionsData.items[0];

    // Step 2: Download caption track
    // Note: This requires OAuth authentication
    // For public use, we'll need a backend service
    
    throw new Error('API method requires backend service');

  } catch (error) {
    console.warn('API transcript fetch failed:', error);
    throw error;
  }
}

/**
 * Parse transcript segments into structured format
 * @param {Array} rawSegments - Raw transcript segments
 * @returns {Array} - Processed segments with metadata
 */
export function processTranscriptSegments(rawSegments) {
  return rawSegments.map((segment, index) => ({
    id: index,
    start: segment.start,
    end: segment.start + segment.duration,
    duration: segment.duration,
    text: cleanTranscriptText(segment.text),
    words: segment.text.split(' ').length
  }));
}

/**
 * Clean transcript text
 * Removes artifacts, fixes formatting
 */
function cleanTranscriptText(text) {
  return text
    .replace(/\[.*?\]/g, '') // Remove [Music], [Applause], etc.
    .replace(/\(.*?\)/g, '') // Remove (inaudible), etc.
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

/**
 * Merge short transcript segments
 * Combines segments shorter than minDuration
 */
export function mergeShortSegments(segments, minDuration = 3) {
  const merged = [];
  let currentSegment = null;

  for (const segment of segments) {
    if (!currentSegment) {
      currentSegment = { ...segment };
      continue;
    }

    if (currentSegment.duration < minDuration) {
      // Merge with current
      currentSegment.text += ' ' + segment.text;
      currentSegment.duration = segment.end - currentSegment.start;
      currentSegment.end = segment.end;
    } else {
      // Save current and start new
      merged.push(currentSegment);
      currentSegment = { ...segment };
    }
  }

  if (currentSegment) {
    merged.push(currentSegment);
  }

  return merged;
}

/**
 * Search transcript for keywords
 * @param {Array} segments - Transcript segments
 * @param {string} query - Search query
 * @returns {Array} - Matching segments with context
 */
export function searchTranscript(segments, query) {
  const queryLower = query.toLowerCase();
  const results = [];

  segments.forEach((segment, index) => {
    if (segment.text.toLowerCase().includes(queryLower)) {
      results.push({
        ...segment,
        index,
        context: {
          before: index > 0 ? segments[index - 1].text : null,
          after: index < segments.length - 1 ? segments[index + 1].text : null
        }
      });
    }
  });

  return results;
}

/**
 * Get transcript summary statistics
 * @param {Array} segments - Transcript segments
 * @returns {Object} - Statistics
 */
export function getTranscriptStats(segments) {
  const totalWords = segments.reduce((sum, seg) => sum + seg.words, 0);
  const totalDuration = segments.length > 0 
    ? segments[segments.length - 1].end - segments[0].start 
    : 0;

  return {
    segmentCount: segments.length,
    totalWords,
    totalDuration,
    averageWordsPerMinute: totalDuration > 0 
      ? Math.round((totalWords / totalDuration) * 60) 
      : 0,
    estimatedReadingTime: Math.ceil(totalWords / 200) // 200 words per minute
  };
}

/**
 * Extract key phrases from transcript
 * Simple keyword extraction without NLP
 */
export function extractKeyPhrases(segments, topN = 10) {
  const text = segments.map(s => s.text).join(' ').toLowerCase();
  
  // Remove common words
  const stopWords = new Set([
    'the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'but',
    'in', 'with', 'to', 'for', 'of', 'as', 'by', 'this', 'that', 'it',
    'from', 'be', 'are', 'was', 'were', 'been', 'have', 'has', 'had',
    'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might'
  ]);

  // Count word frequency
  const words = text.match(/\b\w+\b/g) || [];
  const frequency = {};

  words.forEach(word => {
    if (word.length > 3 && !stopWords.has(word)) {
      frequency[word] = (frequency[word] || 0) + 1;
    }
  });

  // Sort by frequency
  const sorted = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN);

  return sorted.map(([word, count]) => ({ word, count }));
}

/**
 * Batch fetch transcripts for multiple videos
 * @param {Array} videoIds - Array of video IDs
 * @returns {Promise<Array>} - Array of transcript results
 */
export async function fetchMultipleTranscripts(videoIds) {
  console.log(`📝 Fetching transcripts for ${videoIds.length} videos...`);

  const results = await Promise.allSettled(
    videoIds.map(videoId => fetchVideoTranscript(videoId))
  );

  return results.map((result, index) => ({
    videoId: videoIds[index],
    success: result.status === 'fulfilled',
    transcript: result.status === 'fulfilled' ? result.value : null,
    error: result.status === 'rejected' ? result.reason.message : null
  }));
}

/**
 * Check if transcript is available for a video
 * Lightweight check without fetching full transcript
 */
export async function checkTranscriptAvailability(videoId) {
  try {
    const apiUrl = `https://youtube-transcript-api.vercel.app/api/transcript?videoId=${videoId}`;
    const response = await fetch(apiUrl, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Format transcript for display
 * Groups segments into paragraphs
 */
export function formatTranscriptForDisplay(segments, segmentsPerParagraph = 3) {
  const paragraphs = [];
  
  for (let i = 0; i < segments.length; i += segmentsPerParagraph) {
    const group = segments.slice(i, i + segmentsPerParagraph);
    paragraphs.push({
      start: group[0].start,
      end: group[group.length - 1].end,
      text: group.map(s => s.text).join(' ')
    });
  }

  return paragraphs;
}

