/**
 * Content Safety and Moderation System
 * 
 * Approach: Minimal censorship, maximum safety
 * - Block only illegal/directly harmful content
 * - Add disclaimers for sensitive topics
 * - Provide educational context
 * - Respect user autonomy
 */

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || 
                       (typeof process !== 'undefined' ? process.env.OPENAI_API_KEY : null);
const OPENAI_BASE_URL = import.meta.env.VITE_OPENAI_BASE_URL || 
                        (typeof process !== 'undefined' ? process.env.OPENAI_BASE_URL : null) ||
                        'https://api.openai.com/v1';

/**
 * Hard blocks - only for illegal or directly harmful content
 */
const PROHIBITED_CONTENT = {
  illegal_activities: [
    'unauthorized computer access', 'hacking for illegal purposes',
    'fraud', 'identity theft', 'forgery',
    'illegal drug manufacturing', 'drug trafficking',
    'weapons for illegal use', 'explosives for illegal use',
    'copyright piracy for profit', 'counterfeiting money'
  ],
  
  directly_harmful: [
    'suicide methods', 'suicide encouragement',
    'self-harm promotion', 'self-harm methods',
    'eating disorder promotion', 'pro-ana', 'pro-mia',
    'dangerous viral challenges'
  ],
  
  exploitation: [
    'child exploitation', 'child abuse',
    'human trafficking', 'non-consensual activities'
  ],
  
  hate_extremism: [
    'hate speech promotion', 'extremist recruitment',
    'terrorism methods', 'radicalization content'
  ]
};

/**
 * Content that requires disclaimers but is allowed
 */
const DISCLAIMER_CATEGORIES = {
  medical: {
    keywords: ['treatment', 'cure', 'disease', 'diagnosis', 'medication', 'health', 
               'therapy', 'remedy', 'supplement', 'diet', 'nutrition', 'mental health'],
    severity: 'critical',
    requiresAcceptance: true
  },
  
  legal: {
    keywords: ['law', 'legal', 'contract', 'lawsuit', 'rights', 'attorney',
               'court', 'litigation', 'legal advice'],
    severity: 'high',
    requiresAcceptance: true
  },
  
  financial: {
    keywords: ['investing', 'trading', 'stocks', 'cryptocurrency', 'forex',
               'financial advice', 'investment strategy', 'loans', 'credit'],
    severity: 'high',
    requiresAcceptance: true
  },
  
  safety_critical: {
    keywords: ['electrical', 'wiring', 'construction', 'building', 'climbing',
               'diving', 'flying', 'automotive repair', 'gas', 'plumbing'],
    severity: 'medium',
    requiresAcceptance: false
  },
  
  controversial_educational: {
    keywords: ['political theory', 'controversial', 'alternative viewpoint',
               'religious studies', 'ethical debate'],
    severity: 'low',
    requiresAcceptance: false
  }
};

/**
 * Age-restricted content (not blocked, just gated)
 */
const AGE_RESTRICTIONS = {
  alcohol: { minAge: 18, keywords: ['alcohol', 'wine', 'beer', 'brewing', 'distilling'] },
  gambling: { minAge: 18, keywords: ['gambling', 'betting', 'casino', 'poker'] },
  firearms: { minAge: 18, keywords: ['firearms', 'guns', 'shooting', 'weapons'], requiresSafetyDisclaimer: true },
  mature_content: { minAge: 18, keywords: ['adult content', 'mature themes'] }
};

/**
 * Main safety screening function
 */
export async function screenUserRequest(topic, description = '', userAge = null) {
  console.log('🛡️ Screening request for safety...');
  
  const fullRequest = `${topic} ${description}`.toLowerCase();
  
  // 1. Check for prohibited content (hard blocks)
  const prohibitedCheck = checkProhibitedContent(fullRequest);
  if (prohibitedCheck.isProhibited) {
    return {
      allowed: false,
      reason: 'prohibited_content',
      category: prohibitedCheck.category,
      message: prohibitedCheck.message,
      alternatives: prohibitedCheck.alternatives
    };
  }
  
  // 2. Use AI to detect harmful intent (nuanced check)
  const aiCheck = await aiSafetyAnalysis(topic, description);
  if (!aiCheck.safe) {
    return {
      allowed: aiCheck.allowWithDisclaimer,
      reason: aiCheck.reason,
      message: aiCheck.message,
      disclaimer: aiCheck.disclaimer,
      requiresAcceptance: true
    };
  }
  
  // 3. Check for topics requiring disclaimers
  const disclaimerCheck = checkDisclaimerRequirements(fullRequest);
  
  // 4. Check age restrictions
  const ageCheck = checkAgeRestrictions(fullRequest, userAge);
  if (!ageCheck.allowed) {
    return {
      allowed: false,
      reason: 'age_restricted',
      minAge: ageCheck.minAge,
      message: `This content is restricted to users ${ageCheck.minAge} years or older`,
      category: ageCheck.category
    };
  }
  
  // 5. Compile final result
  return {
    allowed: true,
    requiresDisclaimer: disclaimerCheck.required,
    disclaimerType: disclaimerCheck.type,
    disclaimerSeverity: disclaimerCheck.severity,
    requiresAcceptance: disclaimerCheck.requiresAcceptance,
    warnings: [...disclaimerCheck.warnings, ...ageCheck.warnings],
    educationalContext: aiCheck.educationalContext
  };
}

/**
 * Check for prohibited content
 */
function checkProhibitedContent(requestText) {
  for (const [category, keywords] of Object.entries(PROHIBITED_CONTENT)) {
    for (const keyword of keywords) {
      if (requestText.includes(keyword)) {
        return {
          isProhibited: true,
          category: category,
          message: getProhibitedMessage(category),
          alternatives: getAlternatives(keyword, category)
        };
      }
    }
  }
  
  return { isProhibited: false };
}

/**
 * Get message for prohibited content
 */
function getProhibitedMessage(category) {
  const messages = {
    illegal_activities: 'We cannot provide learning paths for illegal activities. If you\'re interested in this field, we can suggest legal, ethical alternatives.',
    directly_harmful: 'We cannot provide content that may cause direct harm. If you\'re struggling, please reach out to a mental health professional or crisis helpline.',
    exploitation: 'This request involves content that we cannot and will not provide under any circumstances.',
    hate_extremism: 'We do not provide content that promotes hate, extremism, or violence.'
  };
  
  return messages[category] || 'This request cannot be processed.';
}

/**
 * Suggest alternatives for prohibited content
 */
function getAlternatives(keyword, category) {
  const alternatives = {
    'hacking for illegal purposes': ['Ethical hacking and penetration testing', 'Cybersecurity fundamentals', 'Network security'],
    'unauthorized computer access': ['Cybersecurity career path', 'Ethical hacking certification', 'Information security'],
    'illegal drug manufacturing': ['Pharmacology and drug development', 'Chemistry fundamentals', 'Medicinal chemistry'],
    'weapons for illegal use': ['Engineering and materials science', 'Physics and mechanics', 'Historical weapons studies']
  };
  
  return alternatives[keyword] || [];
}

/**
 * AI-powered safety analysis (nuanced)
 */
async function aiSafetyAnalysis(topic, description) {
  if (!OPENAI_API_KEY) {
    console.warn('⚠️ OpenAI API key not configured, skipping AI safety check');
    return { safe: true, educationalContext: null };
  }
  
  try {
    const prompt = `Analyze this learning request for safety and educational value:

Topic: ${topic}
Description: ${description || 'No description provided'}

Determine:
1. Is this a legitimate educational request?
2. Does it involve illegal activities?
3. Could it cause direct harm?
4. Is it controversial but educational?
5. What disclaimers (if any) are needed?

Respond with JSON:
{
  "safe": boolean,
  "allowWithDisclaimer": boolean (if not safe, can we allow with strong disclaimer?),
  "reason": "explanation",
  "educationalValue": "low/medium/high",
  "disclaimer": "medical/legal/financial/safety/none",
  "educationalContext": "brief context to help user understand the topic appropriately"
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
        max_tokens: 500
      })
    });
    
    const data = await response.json();
    const analysis = JSON.parse(data.choices[0].message.content);
    
    return {
      safe: analysis.safe || analysis.allowWithDisclaimer,
      allowWithDisclaimer: analysis.allowWithDisclaimer,
      reason: analysis.reason,
      disclaimer: analysis.disclaimer,
      educationalContext: analysis.educationalContext
    };
    
  } catch (error) {
    console.error('❌ AI safety check failed:', error);
    // Fail open (allow) rather than fail closed (block)
    return { safe: true, educationalContext: null };
  }
}

/**
 * Check if content requires disclaimers
 */
function checkDisclaimerRequirements(requestText) {
  for (const [type, config] of Object.entries(DISCLAIMER_CATEGORIES)) {
    for (const keyword of config.keywords) {
      if (requestText.includes(keyword)) {
        return {
          required: true,
          type: type,
          severity: config.severity,
          requiresAcceptance: config.requiresAcceptance,
          warnings: [`This topic involves ${type} information`]
        };
      }
    }
  }
  
  return {
    required: false,
    type: null,
    severity: null,
    requiresAcceptance: false,
    warnings: []
  };
}

/**
 * Check age restrictions
 */
function checkAgeRestrictions(requestText, userAge) {
  for (const [category, config] of Object.entries(AGE_RESTRICTIONS)) {
    for (const keyword of config.keywords) {
      if (requestText.includes(keyword)) {
        // If user age is known and below minimum
        if (userAge !== null && userAge < config.minAge) {
          return {
            allowed: false,
            minAge: config.minAge,
            category: category
          };
        }
        
        // Age restriction applies but user age unknown or sufficient
        return {
          allowed: true,
          warnings: config.requiresSafetyDisclaimer 
            ? [`This topic requires safety precautions and may have age restrictions`]
            : [],
          requiresAgeVerification: userAge === null
        };
      }
    }
  }
  
  return { allowed: true, warnings: [] };
}

/**
 * Generate disclaimer content
 */
export function generateDisclaimer(type, topic) {
  const disclaimers = {
    medical: {
      title: '⚕️ Medical Information Disclaimer',
      icon: '⚕️',
      severity: 'critical',
      content: `**IMPORTANT MEDICAL DISCLAIMER**

The information provided about "${topic}" is for **educational purposes only** and is NOT medical advice.

**⚠️ Critical Points:**
• Always consult with qualified healthcare providers before making health decisions
• Do NOT stop or change prescribed medications without consulting your doctor
• This content does not replace professional medical advice, diagnosis, or treatment
• Some "natural" or "alternative" approaches can be dangerous or interact with medications
• Individual health situations vary - what works for others may not work for you

**If you have a medical emergency, call emergency services immediately.**

By continuing, you acknowledge this is educational content only and you will consult appropriate healthcare professionals for medical decisions.`,
      requiresAcceptance: true
    },
    
    legal: {
      title: '⚖️ Legal Information Disclaimer',
      icon: '⚖️',
      severity: 'high',
      content: `**LEGAL INFORMATION DISCLAIMER**

The information provided about "${topic}" is for **general educational purposes only** and does NOT constitute legal advice.

**⚠️ Important Points:**
• Laws vary significantly by jurisdiction (country, state, city)
• Legal situations are highly fact-specific
• This content does not create an attorney-client relationship
• Do NOT rely on this information for legal decisions
• Always consult with a qualified attorney licensed in your jurisdiction

**For specific legal matters, seek professional legal counsel.**

By continuing, you acknowledge this is educational content only and you will consult appropriate legal professionals for legal matters.`,
      requiresAcceptance: true
    },
    
    financial: {
      title: '💰 Financial Information Disclaimer',
      icon: '💰',
      severity: 'high',
      content: `**FINANCIAL INFORMATION DISCLAIMER**

The information provided about "${topic}" is for **educational purposes only** and should NOT be considered financial advice.

**⚠️ Important Points:**
• Past performance does not guarantee future results
• All investments carry risk, including loss of principal
• Your financial situation is unique - general information may not apply to you
• This content does not consider your specific financial circumstances
• We are not licensed financial advisors
• Tax implications vary by jurisdiction and individual circumstances

**Always consult with qualified financial advisors and tax professionals before making investment or financial decisions.**

By continuing, you acknowledge this is educational content only and you will seek appropriate professional financial advice.`,
      requiresAcceptance: true
    },
    
    safety: {
      title: '⚠️ Safety Warning',
      icon: '⚠️',
      severity: 'medium',
      content: `**SAFETY WARNING**

The topic "${topic}" involves activities that may be dangerous if performed incorrectly.

**⚠️ Safety Considerations:**
• Always follow proper safety protocols and use appropriate protective equipment
• Some activities may require professional training or certification
• Local laws and regulations may apply
• Consider professional instruction before attempting
• Understand the risks involved
• Have appropriate insurance coverage

**Your safety is your responsibility. If you're unsure, consult with professionals.**

By continuing, you acknowledge the potential risks and will take appropriate safety precautions.`,
      requiresAcceptance: false
    },
    
    controversial_educational: {
      title: '📖 Educational Context',
      icon: '📖',
      severity: 'low',
      content: `**EDUCATIONAL CONTEXT**

The topic "${topic}" may involve controversial or sensitive subjects.

**Our Approach:**
• We present information from multiple perspectives
• We include historical and academic context
• We encourage critical thinking and informed opinions
• We respect diverse viewpoints
• Content is educational, not advocacy

**Understanding different perspectives is essential for informed citizenship and critical thinking.**

This learning path aims to help you understand the topic comprehensively, not to promote any particular viewpoint.`,
      requiresAcceptance: false
    },
    
    age_restricted: {
      title: '🔞 Age-Restricted Content',
      icon: '🔞',
      severity: 'medium',
      content: `**AGE VERIFICATION REQUIRED**

The topic "${topic}" involves content that may not be suitable for minors.

**Age Restrictions:**
• You must be 18 years or older to access this content
• Local laws regarding this topic may vary
• Parental guidance may be recommended
• Some activities may be illegal for minors

**By continuing, you confirm that you are of legal age to access this content in your jurisdiction.**`,
      requiresAcceptance: true
    }
  };
  
  return disclaimers[type] || null;
}

/**
 * Export content policy for transparency
 */
export const CONTENT_POLICY = {
  version: '1.0',
  lastUpdated: '2024-01-01',
  
  principles: [
    'We believe in open access to educational content',
    'We do NOT censor based on political views or controversial topics',
    'We block only illegal content and content that directly harms users',
    'We provide disclaimers for professional topics (medical, legal, financial)',
    'We respect user autonomy while promoting safety'
  ],
  
  prohibited: PROHIBITED_CONTENT,
  disclaimers: Object.keys(DISCLAIMER_CATEGORIES),
  ageRestrictions: AGE_RESTRICTIONS,
  
  appealProcess: 'Users can request review of any content decision through our support system',
  transparency: 'We publish quarterly transparency reports on content decisions'
};

