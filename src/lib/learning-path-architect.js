/**
 * Learning Path Architect
 * 
 * Knowledge-first approach to learning path creation
 * Focuses on what learners need to know, then finds the best resources
 */

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || 
                       (typeof process !== 'undefined' ? process.env.OPENAI_API_KEY : null);
const OPENAI_BASE_URL = import.meta.env.VITE_OPENAI_BASE_URL || 
                        (typeof process !== 'undefined' ? process.env.OPENAI_BASE_URL : null) ||
                        'https://api.openai.com/v1';

/**
 * Design a comprehensive learning path structure
 * This is Tier 1 of the two-tier search approach
 */
export async function designLearningPathStructure(topic, description, level = 'beginner') {
  console.log('🎓 Designing learning path structure for:', topic);
  
  if (!OPENAI_API_KEY) {
    console.warn('⚠️ OpenAI API key not configured, using fallback structure');
    return createFallbackStructure(topic, level);
  }
  
  try {
    const prompt = `You are an expert learning path architect. Design a comprehensive, structured learning journey for someone who wants to learn about: "${topic}"

Additional context: ${description || 'No additional context provided'}
Current level: ${level}

Design a learning path with these stages:
1. FUNDAMENTALS - Core concepts and prerequisites
2. REINFORCEMENT - Practice and deeper understanding  
3. PRACTICAL APPLICATION - Hands-on skills and real-world use
4. ADVANCED MASTERY - Expert-level knowledge and specialization

For each stage, identify:
- Learning objectives (what they should know/be able to do)
- Key concepts to master
- Prerequisites (if any)
- Estimated time to complete
- Assessment checkpoints

Respond with JSON in this exact format:
{
  "topic": "${topic}",
  "totalEstimatedHours": number,
  "difficulty": "beginner|intermediate|advanced",
  "prerequisites": ["list of prerequisites"],
  "stages": [
    {
      "id": 1,
      "title": "Fundamentals",
      "description": "brief description",
      "estimatedHours": number,
      "learningObjectives": ["objective 1", "objective 2"],
      "keyConcepts": [
        {
          "concept": "concept name",
          "importance": "why this matters",
          "prerequisites": ["what you need to know first"]
        }
      ],
      "assessmentCheckpoint": "how to verify mastery"
    }
  ],
  "learningOutcomes": ["what you'll be able to do after completion"],
  "careerApplications": ["how this knowledge is used professionally"],
  "nextSteps": ["what to learn after mastering this"]
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
        temperature: 0.7,
        max_tokens: 2000
      })
    });
    
    const data = await response.json();
    const structure = JSON.parse(data.choices[0].message.content);
    
    console.log('✅ Learning path structure designed:', structure.stages.length, 'stages');
    return structure;
    
  } catch (error) {
    console.error('❌ Failed to design learning path structure:', error);
    return createFallbackStructure(topic, level);
  }
}

/**
 * Create fallback structure if AI is unavailable
 */
function createFallbackStructure(topic, level) {
  return {
    topic,
    totalEstimatedHours: level === 'beginner' ? 20 : level === 'intermediate' ? 40 : 60,
    difficulty: level,
    prerequisites: [],
    stages: [
      {
        id: 1,
        title: 'Fundamentals',
        description: `Learn the core concepts of ${topic}`,
        estimatedHours: 8,
        learningObjectives: [
          `Understand what ${topic} is and why it matters`,
          'Learn fundamental terminology and concepts',
          'Identify key principles and best practices'
        ],
        keyConcepts: [
          {
            concept: 'Basic Concepts',
            importance: 'Foundation for all future learning',
            prerequisites: []
          }
        ],
        assessmentCheckpoint: 'Can explain core concepts to a beginner'
      },
      {
        id: 2,
        title: 'Reinforcement',
        description: `Deepen your understanding of ${topic}`,
        estimatedHours: 8,
        learningObjectives: [
          'Apply concepts to simple scenarios',
          'Understand common patterns and techniques',
          'Recognize and avoid common mistakes'
        ],
        keyConcepts: [
          {
            concept: 'Practical Techniques',
            importance: 'Enables real-world application',
            prerequisites: ['Basic Concepts']
          }
        ],
        assessmentCheckpoint: 'Can apply concepts to solve simple problems'
      },
      {
        id: 3,
        title: 'Practical Application',
        description: `Apply ${topic} to real-world scenarios`,
        estimatedHours: 12,
        learningObjectives: [
          'Complete hands-on projects',
          'Solve real-world problems',
          'Build portfolio-worthy work'
        ],
        keyConcepts: [
          {
            concept: 'Real-World Application',
            importance: 'Demonstrates mastery',
            prerequisites: ['Basic Concepts', 'Practical Techniques']
          }
        ],
        assessmentCheckpoint: 'Can complete projects independently'
      },
      {
        id: 4,
        title: 'Advanced Mastery',
        description: `Master advanced aspects of ${topic}`,
        estimatedHours: 12,
        learningObjectives: [
          'Understand advanced techniques',
          'Optimize for performance and quality',
          'Teach others and contribute to the field'
        ],
        keyConcepts: [
          {
            concept: 'Advanced Techniques',
            importance: 'Separates experts from practitioners',
            prerequisites: ['Real-World Application']
          }
        ],
        assessmentCheckpoint: 'Can mentor others and solve complex problems'
      }
    ],
    learningOutcomes: [
      `Comprehensive understanding of ${topic}`,
      'Ability to apply knowledge to real-world scenarios',
      'Confidence to teach others'
    ],
    careerApplications: ['Professional use in relevant fields'],
    nextSteps: ['Specialize in advanced topics', 'Contribute to the community']
  };
}

/**
 * Search for content for each stage in parallel
 * This is Tier 2 of the two-tier search approach
 */
export async function searchContentForStages(structure, searchFunction) {
  console.log('🔍 Searching for content for', structure.stages.length, 'stages in parallel...');
  
  // Create search queries for each stage
  const searchPromises = structure.stages.map(async (stage) => {
    const stageKeywords = stage.keyConcepts.map(c => c.concept).join(' ');
    const query = `${structure.topic} ${stageKeywords} ${stage.title}`;
    
    console.log(`  Stage ${stage.id}: Searching for "${query}"`);
    
    try {
      // Call the provided search function (could be YouTube, articles, podcasts, etc.)
      const results = await searchFunction(query, {
        level: stage.title === 'Fundamentals' ? 'beginner' :
               stage.title === 'Reinforcement' ? 'intermediate' :
               stage.title === 'Practical Application' ? 'intermediate' :
               'advanced',
        maxResults: 5
      });
      
      return {
        stageId: stage.id,
        content: results
      };
    } catch (error) {
      console.error(`❌ Failed to search for stage ${stage.id}:`, error);
      return {
        stageId: stage.id,
        content: []
      };
    }
  });
  
  // Wait for all searches to complete
  const allResults = await Promise.all(searchPromises);
  
  console.log('✅ Content search complete for all stages');
  return allResults;
}

/**
 * Match and rank content to specific learning objectives
 */
export async function matchContentToObjectives(stage, content) {
  if (!OPENAI_API_KEY || content.length === 0) {
    return content; // Return as-is if no AI or no content
  }
  
  try {
    const prompt = `You are evaluating educational content for a learning stage.

Stage: ${stage.title}
Learning Objectives:
${stage.learningObjectives.map((obj, i) => `${i + 1}. ${obj}`).join('\n')}

Key Concepts:
${stage.keyConcepts.map(c => `- ${c.concept}: ${c.importance}`).join('\n')}

Content to evaluate:
${content.map((item, i) => `${i + 1}. ${item.title}`).join('\n')}

For each piece of content, rate how well it matches the learning objectives (0-1 score).
Also identify which specific objectives and concepts it addresses.

Respond with JSON array:
[
  {
    "contentIndex": 0,
    "relevanceScore": 0.0-1.0,
    "matchedObjectives": [0, 1],
    "matchedConcepts": ["concept name"],
    "reasoning": "brief explanation"
  }
]`;

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
        max_tokens: 1000
      })
    });
    
    const data = await response.json();
    const matches = JSON.parse(data.choices[0].message.content);
    
    // Enhance content with matching information
    const enhancedContent = content.map((item, index) => {
      const match = matches.find(m => m.contentIndex === index);
      if (match) {
        return {
          ...item,
          relevanceScore: match.relevanceScore,
          matchedObjectives: match.matchedObjectives.map(i => stage.learningObjectives[i]),
          matchedConcepts: match.matchedConcepts,
          matchReasoning: match.reasoning
        };
      }
      return item;
    });
    
    // Sort by relevance
    return enhancedContent.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
    
  } catch (error) {
    console.error('❌ Failed to match content to objectives:', error);
    return content;
  }
}

/**
 * Assemble complete knowledge-first learning path
 */
export async function assembleKnowledgePath(structure, stageContent) {
  console.log('🎯 Assembling knowledge-first learning path...');
  
  const assembledPath = {
    ...structure,
    stages: structure.stages.map(stage => {
      const content = stageContent.find(sc => sc.stageId === stage.id);
      return {
        ...stage,
        resources: content ? content.content : [],
        resourceCount: content ? content.content.length : 0,
        status: content && content.content.length > 0 ? 'complete' : 'incomplete'
      };
    }),
    metadata: {
      createdAt: new Date().toISOString(),
      totalResources: stageContent.reduce((sum, sc) => sum + (sc.content?.length || 0), 0),
      completeness: calculateCompleteness(structure, stageContent)
    }
  };
  
  console.log('✅ Knowledge path assembled:', assembledPath.metadata.totalResources, 'resources across', assembledPath.stages.length, 'stages');
  return assembledPath;
}

/**
 * Calculate how complete the learning path is
 */
function calculateCompleteness(structure, stageContent) {
  const totalStages = structure.stages.length;
  const completedStages = stageContent.filter(sc => sc.content && sc.content.length >= 3).length;
  
  const completenessScore = completedStages / totalStages;
  
  return {
    score: completenessScore,
    completedStages,
    totalStages,
    rating: completenessScore >= 0.9 ? 'Excellent' :
            completenessScore >= 0.7 ? 'Good' :
            completenessScore >= 0.5 ? 'Fair' : 'Needs Improvement',
    missingStages: structure.stages
      .filter((stage, index) => {
        const content = stageContent.find(sc => sc.stageId === stage.id);
        return !content || content.content.length < 3;
      })
      .map(stage => stage.title)
  };
}

/**
 * Generate learning path summary for user
 */
export function generatePathSummary(knowledgePath) {
  return {
    title: `Complete Learning Path: ${knowledgePath.topic}`,
    overview: {
      totalTime: `${knowledgePath.totalEstimatedHours} hours`,
      difficulty: knowledgePath.difficulty,
      stages: knowledgePath.stages.length,
      resources: knowledgePath.metadata.totalResources,
      completeness: knowledgePath.metadata.completeness.rating
    },
    stagesSummary: knowledgePath.stages.map(stage => ({
      title: stage.title,
      time: `${stage.estimatedHours} hours`,
      objectives: stage.learningObjectives.length,
      resources: stage.resourceCount,
      status: stage.status
    })),
    outcomes: knowledgePath.learningOutcomes,
    nextSteps: knowledgePath.nextSteps
  };
}

