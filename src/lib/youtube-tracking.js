/**
 * YouTube Tracking and Attribution System
 * 
 * This module handles all YouTube video tracking to ensure LearnHub
 * gets proper attribution for traffic driven to YouTube.
 */

const PLATFORM_NAME = 'learnmaster';
const PLATFORM_DOMAIN = 'learnmaster.com';

/**
 * Extract YouTube video ID from various URL formats
 */
export function extractVideoId(url) {
  if (!url) return null;
  
  // Handle different YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

/**
 * Build tracking parameters for YouTube URLs
 */
export function buildTrackingParams(options = {}) {
  const {
    campaign = 'learning_path',
    medium = 'web_app',
    content = '',
    learningPath = '',
    lessonId = ''
  } = options;
  
  const params = new URLSearchParams({
    ref: PLATFORM_NAME,
    utm_source: PLATFORM_NAME,
    utm_medium: medium,
    utm_campaign: campaign
  });
  
  if (content) {
    params.append('utm_content', content);
  }
  
  if (learningPath) {
    params.append('learning_path', learningPath);
  }
  
  if (lessonId) {
    params.append('lesson_id', lessonId);
  }
  
  return params.toString();
}

/**
 * Create tracked YouTube watch URL
 */
export function createTrackedWatchUrl(videoId, options = {}) {
  if (!videoId) return null;
  
  const trackingParams = buildTrackingParams(options);
  return `https://www.youtube.com/watch?v=${videoId}&${trackingParams}`;
}

/**
 * Create tracked YouTube embed URL
 */
export function createTrackedEmbedUrl(videoId, options = {}) {
  if (!videoId) return null;
  
  const {
    autoplay = 0,
    controls = 1,
    modestbranding = 1,
    rel = 0, // Don't show related videos from other channels
    showinfo = 0,
    campaign = 'learning_path',
    learningPath = '',
    lessonId = ''
  } = options;
  
  const params = new URLSearchParams({
    autoplay: autoplay.toString(),
    controls: controls.toString(),
    modestbranding: modestbranding.toString(),
    rel: rel.toString(),
    showinfo: showinfo.toString(),
    origin: window.location.origin,
    ref: PLATFORM_NAME
  });
  
  // Add tracking for analytics
  if (campaign) params.append('utm_campaign', campaign);
  if (learningPath) params.append('learning_path', learningPath);
  if (lessonId) params.append('lesson_id', lessonId);
  
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

/**
 * Track video view event
 */
export function trackVideoView(videoId, metadata = {}) {
  const event = {
    type: 'video_view',
    videoId,
    timestamp: new Date().toISOString(),
    platform: PLATFORM_NAME,
    ...metadata
  };
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Video View Tracked:', event);
  }
  
  // Send to analytics backend (implement when backend is ready)
  sendToAnalytics(event);
  
  return event;
}

/**
 * Track video completion
 */
export function trackVideoCompletion(videoId, metadata = {}) {
  const event = {
    type: 'video_completion',
    videoId,
    timestamp: new Date().toISOString(),
    platform: PLATFORM_NAME,
    ...metadata
  };
  
  if (process.env.NODE_ENV === 'development') {
    console.log('✅ Video Completion Tracked:', event);
  }
  
  sendToAnalytics(event);
  
  return event;
}

/**
 * Track external YouTube link click
 */
export function trackExternalClick(videoId, metadata = {}) {
  const event = {
    type: 'external_click',
    videoId,
    timestamp: new Date().toISOString(),
    platform: PLATFORM_NAME,
    destination: 'youtube',
    ...metadata
  };
  
  if (process.env.NODE_ENV === 'development') {
    console.log('🔗 External Click Tracked:', event);
  }
  
  sendToAnalytics(event);
  
  return event;
}

/**
 * Send analytics data to backend
 */
async function sendToAnalytics(event) {
  try {
    // Store in localStorage for now (will be sent to backend later)
    const existingData = JSON.parse(localStorage.getItem('learnmaster_analytics') || '[]');
    existingData.push(event);
    
    // Keep only last 1000 events
    if (existingData.length > 1000) {
      existingData.shift();
    }
    
    localStorage.setItem('learnmaster_analytics', JSON.stringify(existingData));
    
    // TODO: Send to backend API when implemented
    // await fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(event)
    // });
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
}

/**
 * Get analytics summary
 */
export function getAnalyticsSummary() {
  try {
    const data = JSON.parse(localStorage.getItem('learnmaster_analytics') || '[]');
    
    const summary = {
      totalViews: data.filter(e => e.type === 'video_view').length,
      totalCompletions: data.filter(e => e.type === 'video_completion').length,
      totalExternalClicks: data.filter(e => e.type === 'external_click').length,
      uniqueVideos: new Set(data.map(e => e.videoId)).size,
      dateRange: {
        start: data[0]?.timestamp,
        end: data[data.length - 1]?.timestamp
      }
    };
    
    return summary;
  } catch (error) {
    console.error('Error getting analytics summary:', error);
    return null;
  }
}

/**
 * Generate creator report
 * Shows traffic driven to specific creators/channels
 */
export function generateCreatorReport(channelId) {
  try {
    const data = JSON.parse(localStorage.getItem('learnmaster_analytics') || '[]');
    const channelData = data.filter(e => e.channelId === channelId);
    
    return {
      channelId,
      totalViews: channelData.filter(e => e.type === 'video_view').length,
      totalCompletions: channelData.filter(e => e.type === 'video_completion').length,
      totalExternalClicks: channelData.filter(e => e.type === 'external_click').length,
      videos: [...new Set(channelData.map(e => e.videoId))],
      dateRange: {
        start: channelData[0]?.timestamp,
        end: channelData[channelData.length - 1]?.timestamp
      }
    };
  } catch (error) {
    console.error('Error generating creator report:', error);
    return null;
  }
}

/**
 * Export analytics data for sharing with creators
 */
export function exportAnalyticsData(format = 'json') {
  try {
    const data = JSON.parse(localStorage.getItem('learnmaster_analytics') || '[]');
    
    if (format === 'json') {
      return JSON.stringify(data, null, 2);
    }
    
    if (format === 'csv') {
      const headers = ['Type', 'Video ID', 'Timestamp', 'Learning Path', 'Lesson ID'];
      const rows = data.map(e => [
        e.type,
        e.videoId,
        e.timestamp,
        e.learningPath || '',
        e.lessonId || ''
      ]);
      
      return [headers, ...rows].map(row => row.join(',')).join('\n');
    }
    
    return null;
  } catch (error) {
    console.error('Error exporting analytics:', error);
    return null;
  }
}

export default {
  extractVideoId,
  buildTrackingParams,
  createTrackedWatchUrl,
  createTrackedEmbedUrl,
  trackVideoView,
  trackVideoCompletion,
  trackExternalClick,
  getAnalyticsSummary,
  generateCreatorReport,
  exportAnalyticsData
};

