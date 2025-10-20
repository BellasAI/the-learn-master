/**
 * AI-Powered Transcript Analysis
 * 
 * Uses OpenAI to analyze video transcripts and:
 * - Identify key concepts and important moments
 * - Highlight educational content
 * - Extract learning objectives
 * - Create summaries
 * - Generate study materials
 */

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || 
                       (typeof process !== 'undefined' ? process.env.OPENAI_API_KEY : null);
const OPENAI_BASE_URL = import.meta.env.VITE_OPENAI_BASE_URL || 
                        (typeof process !== 'undefined' ? process.env.OPENAI_BASE_URL : null) ||
                        'https://api.openai.com/v1';

/**
 * Analyze transcript and identify key moments
 * @param {Object} transcript - Transcript with segments
 * @param {string} topic - The learning topic
 * @param {string} level - Learning level (beginner/intermediate/advanced)
 * @returns {Promise<Object>} - Analysis with highlights
 */
export async function analyzeTranscript(transcript, topic, level = 'beginner') {
  console.log(`🤖 Analyzing transcript for topic: ${topic}`);

  if (!OPENAI_API_KEY) {
    console.warn('⚠️ OpenAI API key not available, using basic analysis');
    return basicAnalysis(transcript, topic);
  }

  try {
    // Prepare transcript text
    const transcriptText = transcript.segments
      .map((seg, i) => `[${formatTime(seg.start)}] ${seg.text}`)
      .join('\n');

    // Truncate if too long (OpenAI token limits)
    const maxLength = 8000; // ~2000 tokens
    const truncatedText = transcriptText.length > maxLength 
      ? transcriptText.substring(0, maxLength) + '\n...(transcript continues)'
      : transcriptText;

    const prompt = `You are an expert educational content analyst. Analyze this video transcript about "${topic}" for ${level} learners.

TRANSCRIPT:
${truncatedText}

TASK:
Identify the most important educational moments in this transcript. For each key moment:
1. Identify the timestamp
2. Explain why it's important
3. Extract key concepts taught
4. Rate importance (1-10)

Focus on:
- Core definitions and explanations
- Critical concepts for understanding ${topic}
- Practical examples and applications
- Common mistakes or clarifications
- Implementation details

Respond in JSON format:
{
  "summary": "Brief 2-3 sentence summary of the video",
  "keyLearnings": ["learning 1", "learning 2", ...],
  "highlights": [
    {
      "timestamp": 45,
      "text": "exact quote from transcript",
      "reason": "why this is important",
      "concepts": ["concept1", "concept2"],
      "importance": 9
    }
  ],
  "prerequisites": ["prerequisite knowledge needed"],
  "nextSteps": ["what to learn next"]
}

Only include the TOP 5-10 most important moments. Be selective!`;

    const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert educational content analyst who identifies key learning moments in educational videos.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 2000,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const analysis = JSON.parse(data.choices[0].message.content);

    console.log(`✅ AI analysis complete: ${analysis.highlights?.length || 0} highlights found`);

    return {
      ...analysis,
      analyzedAt: new Date().toISOString(),
      topic,
      level
    };

  } catch (error) {
    console.error('❌ AI analysis failed:', error);
    console.warn('⚠️ Falling back to basic analysis');
    return basicAnalysis(transcript, topic);
  }
}

/**
 * Basic analysis without AI
 * Uses heuristics to identify important moments
 */
function basicAnalysis(transcript, topic) {
  const topicTerms = topic.toLowerCase().split(' ').filter(t => t.length > 3);
  
  const highlights = transcript.segments
    .map((segment, index) => {
      const textLower = segment.text.toLowerCase();
      let score = 0;

      // Score based on topic relevance
      topicTerms.forEach(term => {
        if (textLower.includes(term)) score += 2;
      });

      // Score based on educational keywords
      const eduKeywords = [
        'important', 'key', 'fundamental', 'essential', 'critical',
        'remember', 'note that', 'basically', 'in other words',
        'for example', 'such as', 'like', 'means', 'definition'
      ];
      eduKeywords.forEach(keyword => {
        if (textLower.includes(keyword)) score += 1;
      });

      // Score based on length (longer segments often more detailed)
      if (segment.text.length > 100) score += 1;

      return { segment, index, score };
    })
    .filter(item => item.score >= 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(item => ({
      timestamp: item.segment.start,
      text: item.segment.text,
      reason: 'Contains relevant keywords and educational content',
      concepts: extractConcepts(item.segment.text, topicTerms),
      importance: Math.min(10, item.score)
    }));

  return {
    summary: `Educational video about ${topic}`,
    keyLearnings: [`Understanding ${topic}`, 'Key concepts and terminology'],
    highlights,
    prerequisites: ['Basic understanding of the subject'],
    nextSteps: ['Practice with examples', 'Explore advanced topics']
  };
}

/**
 * Extract concepts from text
 */
function extractConcepts(text, topicTerms) {
  const concepts = new Set();
  
  // Add topic terms
  topicTerms.forEach(term => {
    if (text.toLowerCase().includes(term)) {
      concepts.add(term);
    }
  });

  // Extract capitalized phrases (likely concepts)
  const capitalizedPhrases = text.match(/[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*/g) || [];
  capitalizedPhrases.slice(0, 3).forEach(phrase => concepts.add(phrase));

  return Array.from(concepts).slice(0, 5);
}

/**
 * Generate study guide from transcript analysis
 * @param {Object} analysis - Transcript analysis
 * @param {Object} transcript - Original transcript
 * @param {Object} video - Video metadata
 * @returns {Promise<Object>} - Study guide
 */
export async function generateStudyGuide(analysis, transcript, video) {
  console.log('📚 Generating study guide...');

  if (!OPENAI_API_KEY) {
    return basicStudyGuide(analysis, video);
  }

  try {
    const prompt = `Create a comprehensive study guide for this educational video.

VIDEO: "${video.title}"
TOPIC: ${analysis.topic}
LEVEL: ${analysis.level}

SUMMARY: ${analysis.summary}

KEY LEARNINGS:
${analysis.keyLearnings.map((l, i) => `${i + 1}. ${l}`).join('\n')}

HIGHLIGHTS:
${analysis.highlights.map(h => `- [${formatTime(h.timestamp)}] ${h.reason}`).join('\n')}

Create a study guide with:
1. Learning Objectives (3-5 clear objectives)
2. Key Concepts (organized by importance)
3. Practice Questions (5-10 questions to test understanding)
4. Summary Notes (concise notes for review)
5. Additional Resources (what to study next)

Format as JSON:
{
  "title": "Study Guide: [Topic]",
  "learningObjectives": ["objective 1", ...],
  "keyConcepts": [
    {"concept": "name", "explanation": "brief explanation", "timestamp": 45}
  ],
  "practiceQuestions": [
    {"question": "question text", "hint": "hint for answering"}
  ],
  "summaryNotes": ["note 1", "note 2", ...],
  "additionalResources": ["resource suggestion 1", ...]
}`;

    const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: 'You are an expert educator creating study materials.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.4,
        max_tokens: 1500,
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    const studyGuide = JSON.parse(data.choices[0].message.content);

    console.log('✅ Study guide generated');

    return {
      ...studyGuide,
      videoId: video.id,
      videoTitle: video.title,
      generatedAt: new Date().toISOString()
    };

  } catch (error) {
    console.error('❌ Study guide generation failed:', error);
    return basicStudyGuide(analysis, video);
  }
}

/**
 * Basic study guide without AI
 */
function basicStudyGuide(analysis, video) {
  return {
    title: `Study Guide: ${video.title}`,
    learningObjectives: analysis.keyLearnings || [],
    keyConcepts: analysis.highlights.map(h => ({
      concept: h.concepts[0] || 'Key Concept',
      explanation: h.reason,
      timestamp: h.timestamp
    })),
    practiceQuestions: [
      { question: `What are the main concepts covered in this video about ${analysis.topic}?`, hint: 'Review the key highlights' },
      { question: `How would you explain ${analysis.topic} to someone new to the subject?`, hint: 'Use the definitions from the video' }
    ],
    summaryNotes: [analysis.summary],
    additionalResources: analysis.nextSteps || [],
    videoId: video.id,
    videoTitle: video.title,
    generatedAt: new Date().toISOString()
  };
}

/**
 * Generate flashcards from highlights
 * @param {Object} analysis - Transcript analysis
 * @returns {Promise<Array>} - Flashcards
 */
export async function generateFlashcards(analysis, video) {
  console.log('🎴 Generating flashcards...');

  if (!OPENAI_API_KEY) {
    return basicFlashcards(analysis, video);
  }

  try {
    const highlightsText = analysis.highlights
      .map(h => `[${formatTime(h.timestamp)}] ${h.text}\nConcepts: ${h.concepts.join(', ')}`)
      .join('\n\n');

    const prompt = `Create flashcards from these key moments in an educational video about ${analysis.topic}.

KEY MOMENTS:
${highlightsText}

Create 10-15 flashcards that:
- Test understanding of key concepts
- Include definitions, explanations, and applications
- Range from basic recall to deeper understanding
- Link back to video timestamps

Format as JSON:
{
  "flashcards": [
    {
      "front": "Question or term",
      "back": "Answer or definition",
      "timestamp": 45,
      "difficulty": "easy|medium|hard"
    }
  ]
}`;

    const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: 'You are an expert at creating effective study flashcards.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.5,
        max_tokens: 1500,
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    console.log(`✅ Generated ${result.flashcards.length} flashcards`);

    return result.flashcards.map(card => ({
      ...card,
      videoId: video.id,
      videoTitle: video.title
    }));

  } catch (error) {
    console.error('❌ Flashcard generation failed:', error);
    return basicFlashcards(analysis, video);
  }
}

/**
 * Basic flashcards without AI
 */
function basicFlashcards(analysis, video) {
  return analysis.highlights.slice(0, 10).map(highlight => ({
    front: `What is ${highlight.concepts[0] || 'the key concept'}?`,
    back: highlight.text,
    timestamp: highlight.timestamp,
    difficulty: 'medium',
    videoId: video.id,
    videoTitle: video.title
  }));
}

/**
 * Find connections between multiple video transcripts
 * @param {Array} analyses - Array of transcript analyses
 * @returns {Promise<Object>} - Connections between videos
 */
export async function findCrossVideoConnections(analyses) {
  console.log(`🔗 Finding connections across ${analyses.length} videos...`);

  if (!OPENAI_API_KEY || analyses.length < 2) {
    return basicConnections(analyses);
  }

  try {
    const summaries = analyses.map((a, i) => 
      `Video ${i + 1}: "${a.videoTitle}"\nSummary: ${a.summary}\nKey Concepts: ${a.highlights.map(h => h.concepts.join(', ')).join('; ')}`
    ).join('\n\n');

    const prompt = `Analyze these educational videos and find connections between them.

VIDEOS:
${summaries}

Identify:
1. Shared concepts across videos
2. Prerequisites (which videos should be watched first)
3. Complementary content (videos that build on each other)
4. Contradictions or different perspectives

Format as JSON:
{
  "sharedConcepts": [
    {"concept": "name", "videos": [0, 1, 2]}
  ],
  "learningPath": [
    {"videoIndex": 0, "reason": "Start here because..."}
  ],
  "connections": [
    {"from": 0, "to": 1, "relationship": "builds upon", "explanation": "..."}
  ]
}`;

    const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: 'You are an expert at analyzing educational content and finding connections.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 1000,
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    const connections = JSON.parse(data.choices[0].message.content);

    console.log('✅ Cross-video connections found');

    return connections;

  } catch (error) {
    console.error('❌ Connection analysis failed:', error);
    return basicConnections(analyses);
  }
}

/**
 * Basic connections without AI
 */
function basicConnections(analyses) {
  // Find shared concepts by simple keyword matching
  const allConcepts = analyses.flatMap(a => 
    a.highlights.flatMap(h => h.concepts)
  );

  const conceptCounts = {};
  allConcepts.forEach(concept => {
    conceptCounts[concept] = (conceptCounts[concept] || 0) + 1;
  });

  const sharedConcepts = Object.entries(conceptCounts)
    .filter(([_, count]) => count > 1)
    .map(([concept, _]) => ({
      concept,
      videos: analyses.map((a, i) => 
        a.highlights.some(h => h.concepts.includes(concept)) ? i : null
      ).filter(i => i !== null)
    }));

  return {
    sharedConcepts,
    learningPath: analyses.map((a, i) => ({
      videoIndex: i,
      reason: i === 0 ? 'Start with fundamentals' : 'Continue learning'
    })),
    connections: []
  };
}

/**
 * Format time helper
 */
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

