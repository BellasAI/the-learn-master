import React from 'react';
import { CONTENT_POLICY } from '../lib/content-safety';

/**
 * Content Policy Page
 * Transparent explanation of what content we allow/block and why
 */
export default function ContentPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Content Policy
          </h1>
          <p className="text-lg text-gray-600">
            Our commitment to open education with responsible safety measures
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Version {CONTENT_POLICY.version} • Last updated: {CONTENT_POLICY.lastUpdated}
          </div>
        </div>

        {/* Core Principles */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🎯</span> Our Principles
          </h2>
          <ul className="space-y-3">
            {CONTENT_POLICY.principles.map((principle, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">✓</span>
                <span className="text-gray-700">{principle}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What We Allow */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>✅</span> What We Allow
          </h2>
          <p className="text-gray-700 mb-4">
            We believe in open access to educational content. We allow learning paths on:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2">✓ Controversial but Legal Topics</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Political theory (all perspectives)</li>
                <li>• Religious studies</li>
                <li>• Ethical debates</li>
                <li>• Alternative viewpoints</li>
              </ul>
            </div>
            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2">✓ Professional Topics (with disclaimers)</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Medical and health information</li>
                <li>• Legal concepts and rights</li>
                <li>• Financial and investment basics</li>
                <li>• Safety-critical activities</li>
              </ul>
            </div>
            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2">✓ Sensitive Topics (with context)</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Alternative medicine (evidence-based)</li>
                <li>• Cryptocurrency and investing</li>
                <li>• Home improvement and DIY</li>
                <li>• Firearms safety and sports</li>
              </ul>
            </div>
            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2">✓ Age-Appropriate Content</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Alcohol education (18+)</li>
                <li>• Gambling theory (18+)</li>
                <li>• Mature academic topics</li>
                <li>• Historical sensitive subjects</li>
              </ul>
            </div>
          </div>
        </div>

        {/* What We Block */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🚫</span> What We Block
          </h2>
          <p className="text-gray-700 mb-4">
            We block only content that is illegal or directly harmful:
          </p>
          <div className="space-y-4">
            <div className="border border-red-200 bg-red-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span>⚖️</span> Illegal Activities
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Content that teaches illegal activities (required by law to block)
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Unauthorized computer access / hacking for illegal purposes</li>
                <li>• Fraud, identity theft, forgery</li>
                <li>• Illegal drug manufacturing or trafficking</li>
                <li>• Weapons or explosives for illegal use</li>
                <li>• Copyright piracy for profit</li>
              </ul>
              <div className="mt-3 p-3 bg-white rounded border border-green-300">
                <p className="text-sm text-gray-700">
                  <strong>✅ Legal Alternative:</strong> We DO allow ethical hacking, cybersecurity, 
                  chemistry education, engineering, and other legitimate educational topics.
                </p>
              </div>
            </div>

            <div className="border border-red-200 bg-red-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span>⚠️</span> Directly Harmful Content
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Content that could cause direct harm to users
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Suicide methods or encouragement</li>
                <li>• Self-harm promotion</li>
                <li>• Eating disorder promotion (pro-ana, pro-mia)</li>
                <li>• Dangerous viral challenges</li>
              </ul>
              <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-300">
                <p className="text-sm text-gray-700">
                  <strong>Need help?</strong> National Suicide Prevention Lifeline: 988 | 
                  Crisis Text Line: Text HOME to 741741
                </p>
              </div>
            </div>

            <div className="border border-red-200 bg-red-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span>🛡️</span> Exploitation & Hate
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Content we will never provide under any circumstances
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Any form of exploitation</li>
                <li>• Hate speech or extremism</li>
                <li>• Terrorism or radicalization</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>📋</span> When We Add Disclaimers
          </h2>
          <p className="text-gray-700 mb-4">
            For certain topics, we provide educational content with appropriate disclaimers:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <span className="text-2xl">⚕️</span>
              <div>
                <h3 className="font-bold text-gray-900">Medical Topics</h3>
                <p className="text-sm text-gray-700">
                  Educational content only - always consult healthcare providers for medical decisions
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <span className="text-2xl">⚖️</span>
              <div>
                <h3 className="font-bold text-gray-900">Legal Topics</h3>
                <p className="text-sm text-gray-700">
                  General education only - consult qualified attorneys for legal matters
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <span className="text-2xl">💰</span>
              <div>
                <h3 className="font-bold text-gray-900">Financial Topics</h3>
                <p className="text-sm text-gray-700">
                  Educational only - consult financial advisors before making investment decisions
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-bold text-gray-900">Safety-Critical Topics</h3>
                <p className="text-sm text-gray-700">
                  Follow proper safety protocols - consider professional instruction
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>💡</span> Examples
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <p className="font-bold text-gray-900">❌ BLOCKED: "How to hack into bank accounts"</p>
              <p className="text-sm text-gray-600">Reason: Illegal activity</p>
              <p className="text-sm text-green-700 mt-1">✅ Alternative: "Ethical hacking and cybersecurity"</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-bold text-gray-900">✅ ALLOWED: "Ethical hacking and penetration testing"</p>
              <p className="text-sm text-gray-600">Reason: Legal, educational, legitimate career path</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <p className="font-bold text-gray-900">❌ BLOCKED: "How to make explosives"</p>
              <p className="text-sm text-gray-600">Reason: Safety risk, potential illegal use</p>
              <p className="text-sm text-green-700 mt-1">✅ Alternative: "Chemistry of explosives (academic context)"</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <p className="font-bold text-gray-900">⚠️ ALLOWED WITH DISCLAIMER: "Natural cancer treatment approaches"</p>
              <p className="text-sm text-gray-600">Reason: Educational with critical medical disclaimer</p>
              <p className="text-sm text-gray-600 mt-1">Note: Must include disclaimer to consult doctors</p>
            </div>
          </div>
        </div>

        {/* Appeal Process */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>📝</span> Appeal Process
          </h2>
          <p className="text-gray-700 mb-4">
            Think we made a mistake? We review all appeals fairly and transparently.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-bold text-gray-900 mb-2">How to Appeal:</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Click "Request Review" when your request is blocked</li>
              <li>Explain why you believe the content is educational and appropriate</li>
              <li>Suggest alternative framing if needed</li>
              <li>We review within 24 hours</li>
              <li>You'll receive a detailed explanation of our decision</li>
            </ol>
          </div>
        </div>

        {/* Transparency */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>📊</span> Transparency Commitment
          </h2>
          <p className="text-gray-700 mb-4">
            We publish quarterly transparency reports showing:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Total learning paths requested</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>How many were approved, approved with disclaimers, or blocked</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Reasons for blocking (by category)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Appeals received and outcomes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>User satisfaction with our content policy</span>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Questions about our content policy? <a href="/contact" className="text-blue-600 hover:underline">Contact us</a>
          </p>
        </div>
      </div>
    </div>
  );
}

