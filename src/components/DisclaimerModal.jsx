import React, { useState } from 'react';
import { generateDisclaimer } from '../lib/content-safety';

/**
 * Disclaimer Modal Component
 * Shows safety disclaimers before allowing access to sensitive content
 */
export default function DisclaimerModal({ 
  disclaimerType, 
  topic, 
  onAccept, 
  onDecline,
  requiresAcceptance = true 
}) {
  const [accepted, setAccepted] = useState(false);
  
  const disclaimer = generateDisclaimer(disclaimerType, topic);
  
  if (!disclaimer) {
    return null;
  }
  
  const handleAccept = () => {
    if (requiresAcceptance && !accepted) {
      alert('Please acknowledge that you understand the disclaimer');
      return;
    }
    onAccept();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`p-6 border-b ${
          disclaimer.severity === 'critical' ? 'bg-red-50 border-red-200' :
          disclaimer.severity === 'high' ? 'bg-orange-50 border-orange-200' :
          disclaimer.severity === 'medium' ? 'bg-yellow-50 border-yellow-200' :
          'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{disclaimer.icon}</span>
            <h2 className="text-2xl font-bold text-gray-900">
              {disclaimer.title}
            </h2>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="prose prose-sm max-w-none">
            {disclaimer.content.split('\n\n').map((paragraph, index) => {
              // Check if it's a heading (starts with **)
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h3 key={index} className="text-lg font-bold text-gray-900 mt-4 mb-2">
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              
              // Check if it's a bullet point
              if (paragraph.startsWith('•')) {
                const points = paragraph.split('\n').filter(p => p.trim());
                return (
                  <ul key={index} className="list-disc list-inside space-y-1 my-3">
                    {points.map((point, i) => (
                      <li key={i} className="text-gray-700">
                        {point.replace('• ', '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              
              // Check if it's a warning (starts with ⚠️)
              if (paragraph.includes('⚠️')) {
                return (
                  <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3">
                    <p className="text-gray-800 font-medium">
                      {paragraph}
                    </p>
                  </div>
                );
              }
              
              // Regular paragraph
              return (
                <p key={index} className="text-gray-700 my-3">
                  {paragraph}
                </p>
              );
            })}
          </div>
          
          {/* Acceptance checkbox */}
          {requiresAcceptance && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="mt-1 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 font-medium">
                  I understand and accept that this information is for educational purposes only. 
                  I will seek appropriate professional advice for {disclaimerType} matters.
                </span>
              </label>
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-3 justify-end">
          <button
            onClick={onDecline}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAccept}
            disabled={requiresAcceptance && !accepted}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              requiresAcceptance && !accepted
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {requiresAcceptance ? 'I Accept - Continue' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Blocked Content Modal
 * Shows when content cannot be provided
 */
export function BlockedContentModal({ reason, category, message, alternatives, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        {/* Header */}
        <div className="p-6 border-b bg-red-50 border-red-200">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🚫</span>
            <h2 className="text-2xl font-bold text-gray-900">
              Request Cannot Be Processed
            </h2>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            {message}
          </p>
          
          {alternatives && alternatives.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                ✅ Suggested Alternatives:
              </h3>
              <ul className="space-y-2">
                {alternatives.map((alt, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span className="text-gray-700">{alt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {category === 'directly_harmful' && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Need help?</strong> If you're struggling, please reach out:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                <li>• National Suicide Prevention Lifeline: 988</li>
                <li>• Crisis Text Line: Text HOME to 741741</li>
                <li>• International Association for Suicide Prevention: <a href="https://www.iasp.info/resources/Crisis_Centres/" className="text-blue-600 hover:underline">Find help worldwide</a></li>
              </ul>
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Quality Verification Summary Modal
 * Shows verification results before displaying learning path
 */
export function QualityVerificationModal({ verification, originalRequest, onProceed, onRefine }) {
  const summary = verification.summary || {};
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        {/* Header */}
        <div className="p-6 border-b bg-blue-50 border-blue-200">
          <div className="flex items-center gap-3">
            <span className="text-4xl">✅</span>
            <h2 className="text-2xl font-bold text-gray-900">
              Learning Path Quality Verification
            </h2>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <p className="text-gray-700">
              <strong>Your Request:</strong> "{originalRequest.topic}"
              {originalRequest.description && ` - ${originalRequest.description}`}
            </p>
          </div>
          
          {/* Verification Sections */}
          <div className="space-y-4">
            {summary.sections?.map((section, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{section.icon}</span>
                    <h3 className="font-bold text-gray-900">{section.title}</h3>
                  </div>
                  {section.score !== undefined && (
                    <span className="text-sm font-medium text-gray-600">
                      {section.score}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>{section.rating}</strong>
                </p>
                <p className="text-sm text-gray-700">
                  {section.details}
                </p>
              </div>
            ))}
          </div>
          
          {/* Overall Confidence */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">Overall Confidence:</span>
              <span className="text-lg font-bold text-blue-600">
                {Math.round(verification.confidence * 100)}%
              </span>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-3 justify-end">
          <button
            onClick={onRefine}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors"
          >
            ↻ Refine Request
          </button>
          <button
            onClick={onProceed}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            ✓ Proceed with Learning Path
          </button>
        </div>
      </div>
    </div>
  );
}

