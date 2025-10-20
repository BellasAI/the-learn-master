/**
 * Transcript Export Service
 * 
 * Exports transcripts with AI highlights to:
 * - PDF (formatted, professional)
 * - Markdown (for note-taking apps)
 * - Plain text
 */

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

/**
 * Export transcript as PDF
 * @param {Object} video - Video metadata
 * @param {Object} transcript - Transcript with segments
 * @param {Object} analysis - AI analysis with highlights
 * @param {string} userNotes - User's personal notes
 * @returns {Blob} - PDF file blob
 */
export function exportTranscriptPDF(video, transcript, analysis, userNotes = '') {
  const doc = new jsPDF();
  let yPosition = 20;

  // Title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(video.title, 20, yPosition);
  yPosition += 10;

  // Video metadata
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100);
  doc.text(`Channel: ${video.channelName}`, 20, yPosition);
  yPosition += 6;
  doc.text(`Duration: ${video.duration} | Views: ${video.views?.toLocaleString()}`, 20, yPosition);
  yPosition += 6;
  doc.text(`Link: https://www.youtube.com/watch?v=${video.id}`, 20, yPosition);
  yPosition += 10;

  // Divider
  doc.setDrawColor(200);
  doc.line(20, yPosition, 190, yPosition);
  yPosition += 10;

  // Summary (if available)
  if (analysis?.summary) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0);
    doc.text('Summary', 20, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const summaryLines = doc.splitTextToSize(analysis.summary, 170);
    doc.text(summaryLines, 20, yPosition);
    yPosition += summaryLines.length * 6 + 10;
  }

  // Key Learnings (if available)
  if (analysis?.keyLearnings && analysis.keyLearnings.length > 0) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Key Learnings', 20, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    analysis.keyLearnings.forEach((learning, index) => {
      const learningLines = doc.splitTextToSize(`${index + 1}. ${learning}`, 165);
      doc.text(learningLines, 25, yPosition);
      yPosition += learningLines.length * 6 + 2;
    });
    yPosition += 8;
  }

  // User Notes (if available)
  if (userNotes && userNotes.trim()) {
    checkPageBreak(doc, yPosition, 30);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Your Notes', 20, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const notesLines = doc.splitTextToSize(userNotes, 170);
    doc.text(notesLines, 20, yPosition);
    yPosition += notesLines.length * 6 + 10;
  }

  // Transcript with Highlights
  checkPageBreak(doc, yPosition, 30);
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Transcript with AI Highlights', 20, yPosition);
  yPosition += 10;

  // Process each segment
  transcript.segments.forEach((segment, index) => {
    const isHighlighted = analysis?.highlights?.some(h => 
      Math.abs(h.timestamp - segment.start) < 2
    );
    const highlight = analysis?.highlights?.find(h => 
      Math.abs(h.timestamp - segment.start) < 2
    );

    // Check if we need a new page
    checkPageBreak(doc, yPosition, isHighlighted ? 50 : 25);

    // Timestamp
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 100, 200);
    const timestamp = formatTime(segment.start);
    doc.text(`[${timestamp}]`, 20, yPosition);

    // Highlight indicator
    if (isHighlighted) {
      doc.setFontSize(12);
      doc.text('⭐', 45, yPosition);
    }

    yPosition += 6;

    // Segment text
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0);
    
    if (isHighlighted) {
      // Highlight background
      doc.setFillColor(255, 252, 220);
      doc.rect(18, yPosition - 4, 174, doc.getTextDimensions(segment.text).h + 4, 'F');
    }

    const textLines = doc.splitTextToSize(segment.text, 170);
    doc.text(textLines, 20, yPosition);
    yPosition += textLines.length * 6;

    // Highlight explanation
    if (isHighlighted && highlight) {
      yPosition += 4;
      doc.setFontSize(9);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(150, 100, 0);
      const reasonLines = doc.splitTextToSize(`💡 ${highlight.reason}`, 165);
      doc.text(reasonLines, 25, yPosition);
      yPosition += reasonLines.length * 5;

      // Concepts
      if (highlight.concepts && highlight.concepts.length > 0) {
        yPosition += 3;
        doc.setFont('helvetica', 'bold');
        doc.text(`Key Concepts: ${highlight.concepts.join(', ')}`, 25, yPosition);
        yPosition += 5;
      }
    }

    yPosition += 8;
  });

  // Footer on each page
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Generated by The Learn Master | Page ${i} of ${pageCount}`,
      105,
      285,
      { align: 'center' }
    );
  }

  return doc.output('blob');
}

/**
 * Export transcript as Markdown
 * @param {Object} video - Video metadata
 * @param {Object} transcript - Transcript with segments
 * @param {Object} analysis - AI analysis with highlights
 * @param {string} userNotes - User's personal notes
 * @returns {Blob} - Markdown file blob
 */
export function exportTranscriptMarkdown(video, transcript, analysis, userNotes = '') {
  let markdown = '';

  // Title
  markdown += `# ${video.title}\n\n`;

  // Metadata
  markdown += `**Channel:** ${video.channelName}  \n`;
  markdown += `**Duration:** ${video.duration}  \n`;
  markdown += `**Views:** ${video.views?.toLocaleString()}  \n`;
  markdown += `**Link:** [Watch on YouTube](https://www.youtube.com/watch?v=${video.id})  \n\n`;

  markdown += `---\n\n`;

  // Summary
  if (analysis?.summary) {
    markdown += `## Summary\n\n`;
    markdown += `${analysis.summary}\n\n`;
  }

  // Key Learnings
  if (analysis?.keyLearnings && analysis.keyLearnings.length > 0) {
    markdown += `## Key Learnings\n\n`;
    analysis.keyLearnings.forEach((learning, index) => {
      markdown += `${index + 1}. ${learning}\n`;
    });
    markdown += `\n`;
  }

  // Prerequisites
  if (analysis?.prerequisites && analysis.prerequisites.length > 0) {
    markdown += `## Prerequisites\n\n`;
    analysis.prerequisites.forEach(prereq => {
      markdown += `- ${prereq}\n`;
    });
    markdown += `\n`;
  }

  // User Notes
  if (userNotes && userNotes.trim()) {
    markdown += `## Your Notes\n\n`;
    markdown += `${userNotes}\n\n`;
    markdown += `---\n\n`;
  }

  // Transcript
  markdown += `## Transcript\n\n`;

  transcript.segments.forEach((segment, index) => {
    const isHighlighted = analysis?.highlights?.some(h => 
      Math.abs(h.timestamp - segment.start) < 2
    );
    const highlight = analysis?.highlights?.find(h => 
      Math.abs(h.timestamp - segment.start) < 2
    );

    const timestamp = formatTime(segment.start);
    const timestampSeconds = Math.floor(segment.start);
    const youtubeLink = `https://www.youtube.com/watch?v=${video.id}&t=${timestampSeconds}s`;

    // Timestamp heading
    markdown += `### [${timestamp}](${youtubeLink})`;
    
    if (isHighlighted) {
      markdown += ` ⭐`;
    }
    
    markdown += `\n\n`;

    // Segment text (as blockquote)
    markdown += `> ${segment.text}\n\n`;

    // Highlight explanation
    if (isHighlighted && highlight) {
      markdown += `💡 **${highlight.reason}**\n\n`;
      
      if (highlight.concepts && highlight.concepts.length > 0) {
        markdown += `**Key Concepts:** ${highlight.concepts.join(', ')}\n\n`;
      }

      if (highlight.importance) {
        markdown += `**Importance:** ${highlight.importance}/10\n\n`;
      }
    }

    markdown += `---\n\n`;
  });

  // Next Steps
  if (analysis?.nextSteps && analysis.nextSteps.length > 0) {
    markdown += `## Next Steps\n\n`;
    analysis.nextSteps.forEach(step => {
      markdown += `- ${step}\n`;
    });
    markdown += `\n`;
  }

  // Footer
  markdown += `---\n\n`;
  markdown += `*Generated by The Learn Master on ${new Date().toLocaleDateString()}*\n`;

  return new Blob([markdown], { type: 'text/markdown' });
}

/**
 * Export study guide as PDF
 * @param {Object} studyGuide - Study guide data
 * @param {Object} video - Video metadata
 * @returns {Blob} - PDF file blob
 */
export function exportStudyGuidePDF(studyGuide, video) {
  const doc = new jsPDF();
  let yPosition = 20;

  // Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(studyGuide.title || 'Study Guide', 20, yPosition);
  yPosition += 12;

  // Video info
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100);
  doc.text(`Video: ${video.title}`, 20, yPosition);
  yPosition += 6;
  doc.text(`Channel: ${video.channelName}`, 20, yPosition);
  yPosition += 12;

  // Learning Objectives
  if (studyGuide.learningObjectives && studyGuide.learningObjectives.length > 0) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0);
    doc.text('Learning Objectives', 20, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    studyGuide.learningObjectives.forEach((obj, index) => {
      const objLines = doc.splitTextToSize(`${index + 1}. ${obj}`, 165);
      doc.text(objLines, 25, yPosition);
      yPosition += objLines.length * 6 + 2;
    });
    yPosition += 10;
  }

  // Key Concepts
  if (studyGuide.keyConcepts && studyGuide.keyConcepts.length > 0) {
    checkPageBreak(doc, yPosition, 30);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Key Concepts', 20, yPosition);
    yPosition += 8;

    studyGuide.keyConcepts.forEach((concept, index) => {
      checkPageBreak(doc, yPosition, 25);

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(`${index + 1}. ${concept.concept}`, 25, yPosition);
      yPosition += 6;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const explLines = doc.splitTextToSize(concept.explanation, 160);
      doc.text(explLines, 30, yPosition);
      yPosition += explLines.length * 6;

      if (concept.timestamp !== undefined) {
        doc.setFontSize(9);
        doc.setTextColor(0, 100, 200);
        doc.text(`[${formatTime(concept.timestamp)}]`, 30, yPosition);
        yPosition += 5;
        doc.setTextColor(0);
      }

      yPosition += 5;
    });
    yPosition += 5;
  }

  // Practice Questions
  if (studyGuide.practiceQuestions && studyGuide.practiceQuestions.length > 0) {
    checkPageBreak(doc, yPosition, 30);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Practice Questions', 20, yPosition);
    yPosition += 8;

    studyGuide.practiceQuestions.forEach((q, index) => {
      checkPageBreak(doc, yPosition, 20);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      const qLines = doc.splitTextToSize(`${index + 1}. ${q.question}`, 165);
      doc.text(qLines, 25, yPosition);
      yPosition += qLines.length * 6 + 3;

      if (q.hint) {
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(100);
        const hintLines = doc.splitTextToSize(`Hint: ${q.hint}`, 160);
        doc.text(hintLines, 30, yPosition);
        yPosition += hintLines.length * 5 + 5;
        doc.setTextColor(0);
      }

      yPosition += 3;
    });
    yPosition += 5;
  }

  // Summary Notes
  if (studyGuide.summaryNotes && studyGuide.summaryNotes.length > 0) {
    checkPageBreak(doc, yPosition, 30);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Summary Notes', 20, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    studyGuide.summaryNotes.forEach(note => {
      const noteLines = doc.splitTextToSize(`• ${note}`, 165);
      doc.text(noteLines, 25, yPosition);
      yPosition += noteLines.length * 6 + 3;
    });
    yPosition += 5;
  }

  // Additional Resources
  if (studyGuide.additionalResources && studyGuide.additionalResources.length > 0) {
    checkPageBreak(doc, yPosition, 30);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Additional Resources', 20, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    studyGuide.additionalResources.forEach(resource => {
      const resLines = doc.splitTextToSize(`• ${resource}`, 165);
      doc.text(resLines, 25, yPosition);
      yPosition += resLines.length * 6 + 3;
    });
  }

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Generated by The Learn Master | Page ${i} of ${pageCount}`,
      105,
      285,
      { align: 'center' }
    );
  }

  return doc.output('blob');
}

/**
 * Download file helper
 * @param {Blob} blob - File blob
 * @param {string} filename - Filename
 */
export function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Check if we need a page break
 * @param {jsPDF} doc - PDF document
 * @param {number} yPosition - Current Y position
 * @param {number} requiredSpace - Required space
 */
function checkPageBreak(doc, yPosition, requiredSpace) {
  if (yPosition + requiredSpace > 270) {
    doc.addPage();
    return 20;
  }
  return yPosition;
}

/**
 * Format time helper
 * @param {number} seconds - Time in seconds
 * @returns {string} - Formatted time (MM:SS)
 */
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

