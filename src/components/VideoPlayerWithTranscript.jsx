import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Download, 
  FileText, 
  Bookmark, 
  BookmarkCheck,
  ExternalLink, 
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Search,
  StickyNote
} from 'lucide-react';

/**
 * Enhanced Video Player with AI-Powered Transcripts
 * 
 * Features:
 * - Embedded YouTube player
 * - AI-highlighted transcripts
 * - Clickable timestamps
 * - Personal notes
 * - Bookmarks
 * - Downloadable PDFs
 */
export default function VideoPlayerWithTranscript({ 
  video, 
  transcript, 
  highlights,
  onBookmark,
  onAddNote,
  userTier = 'freemium'
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);
  const [userNotes, setUserNotes] = useState('');
  const [bookmarked, setBookmarked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const playerRef = useRef(null);

  // Tier permissions
  const canViewTranscript = ['starter', 'advanced', 'scholar'].includes(userTier);
  const canViewHighlights = ['advanced', 'scholar'].includes(userTier);
  const canDownload = ['advanced', 'scholar'].includes(userTier);
  const canAddNotes = ['advanced', 'scholar'].includes(userTier);

  // Format timestamp (seconds to MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Jump to timestamp in video
  const jumpToTime = (seconds) => {
    if (playerRef.current) {
      // For YouTube iframe API
      playerRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: 'seekTo',
          args: [seconds, true]
        }),
        '*'
      );
    }
  };

  // Handle bookmark toggle
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    if (onBookmark) {
      onBookmark(video.id, !bookmarked);
    }
  };

  // Handle note save
  const handleSaveNote = () => {
    if (onAddNote) {
      onAddNote(video.id, userNotes, currentTime);
    }
  };

  // Download transcript as PDF
  const handleDownloadPDF = async () => {
    if (!canDownload) {
      alert('Upgrade to Advanced or Scholar plan to download transcripts!');
      return;
    }

    // This will be implemented with PDF generation
    const pdfContent = generateTranscriptPDF(video, transcript, highlights, userNotes);
    // Trigger download
    downloadFile(pdfContent, `${video.title}-transcript.pdf`, 'application/pdf');
  };

  // Download transcript as Markdown
  const handleDownloadMarkdown = async () => {
    if (!canDownload) {
      alert('Upgrade to Advanced or Scholar plan to download transcripts!');
      return;
    }

    const markdown = generateTranscriptMarkdown(video, transcript, highlights, userNotes);
    downloadFile(markdown, `${video.title}-transcript.md`, 'text/markdown');
  };

  // Filter transcript by search query
  const filteredTranscript = transcript?.segments?.filter(segment => 
    searchQuery === '' || 
    segment.text.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Video Player Column */}
      <div className="lg:col-span-2 space-y-4">
        {/* Embedded Video Player */}
        <Card>
          <CardContent className="p-0">
            <div className="relative aspect-video bg-black">
              <iframe
                ref={playerRef}
                src={`https://www.youtube.com/embed/${video.id}?enablejsapi=1&rel=0&modestbranding=1`}
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>

        {/* Video Info & Actions */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-xl mb-2">{video.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{video.channelName}</span>
                  <span>•</span>
                  <span>{video.views?.toLocaleString()} views</span>
                  <span>•</span>
                  <span><Clock className="inline w-4 h-4 mr-1" />{video.duration}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={bookmarked ? "default" : "outline"}
                  size="sm"
                  onClick={handleBookmark}
                >
                  {bookmarked ? <BookmarkCheck className="w-4 h-4 mr-2" /> : <Bookmark className="w-4 h-4 mr-2" />}
                  {bookmarked ? 'Saved' : 'Save'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  YouTube
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {video.description}
            </p>
          </CardContent>
        </Card>

        {/* Personal Notes (Advanced/Scholar only) */}
        {canAddNotes && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <StickyNote className="w-5 h-5 mr-2" />
                Your Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                placeholder="Add your personal notes here..."
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <Button onClick={handleSaveNote} size="sm">
                Save Note
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Transcript Column */}
      <div className="lg:col-span-1">
        <Card className="sticky top-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Transcript
                {canViewHighlights && (
                  <Badge variant="secondary" className="ml-2">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Highlights
                  </Badge>
                )}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTranscript(!showTranscript)}
              >
                {showTranscript ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>
          </CardHeader>

          {showTranscript && (
            <CardContent className="space-y-4">
              {/* Download Options */}
              {canDownload && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadPDF}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadMarkdown}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Markdown
                  </Button>
                </div>
              )}

              {/* Search Transcript */}
              {canViewTranscript && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search transcript..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-md text-sm"
                  />
                </div>
              )}

              {/* Transcript Content */}
              {!canViewTranscript ? (
                <div className="text-center py-8 space-y-3">
                  <div className="text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="font-medium">Transcripts Available in Paid Plans</p>
                    <p className="text-sm">Upgrade to Starter, Advanced, or Scholar to access video transcripts</p>
                  </div>
                  <Button size="sm" variant="default">
                    Upgrade Now
                  </Button>
                </div>
              ) : !transcript || !transcript.segments ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No transcript available for this video</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {filteredTranscript.map((segment, index) => {
                    const isHighlighted = canViewHighlights && 
                      highlights?.some(h => h.timestamp === segment.start);
                    const highlight = highlights?.find(h => h.timestamp === segment.start);

                    return (
                      <div
                        key={index}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          isHighlighted 
                            ? 'bg-yellow-50 border-2 border-yellow-300 dark:bg-yellow-900/20 dark:border-yellow-700' 
                            : 'bg-muted/50 hover:bg-muted'
                        }`}
                        onClick={() => jumpToTime(segment.start)}
                      >
                        <div className="flex items-start gap-2">
                          <Badge variant="outline" className="text-xs shrink-0">
                            {formatTime(segment.start)}
                          </Badge>
                          {isHighlighted && (
                            <Sparkles className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                          )}
                        </div>
                        <p className="text-sm mt-2 leading-relaxed">
                          {segment.text}
                        </p>
                        {isHighlighted && highlight && (
                          <div className="mt-2 pt-2 border-t border-yellow-300 dark:border-yellow-700">
                            <p className="text-xs text-yellow-800 dark:text-yellow-200 font-medium">
                              💡 {highlight.reason}
                            </p>
                            {highlight.concepts && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {highlight.concepts.map((concept, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {concept}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Upgrade Prompt for Highlights */}
              {canViewTranscript && !canViewHighlights && (
                <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                        Unlock AI Highlights
                      </p>
                      <p className="text-xs text-yellow-800 dark:text-yellow-200 mt-1">
                        Upgrade to Advanced or Scholar to get AI-powered highlights of key concepts
                      </p>
                      <Button size="sm" variant="default" className="mt-2">
                        Upgrade to Advanced
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}

// Helper function to generate PDF content (placeholder)
function generateTranscriptPDF(video, transcript, highlights, notes) {
  // This will be implemented with actual PDF generation library
  return new Blob(['PDF content placeholder'], { type: 'application/pdf' });
}

// Helper function to generate Markdown content
function generateTranscriptMarkdown(video, transcript, highlights, notes) {
  let markdown = `# ${video.title}\n\n`;
  markdown += `**Channel:** ${video.channelName}\n`;
  markdown += `**Duration:** ${video.duration}\n`;
  markdown += `**Link:** https://www.youtube.com/watch?v=${video.id}\n\n`;
  markdown += `---\n\n`;

  if (notes) {
    markdown += `## Your Notes\n\n${notes}\n\n---\n\n`;
  }

  markdown += `## Transcript\n\n`;

  transcript?.segments?.forEach(segment => {
    const isHighlighted = highlights?.some(h => h.timestamp === segment.start);
    const highlight = highlights?.find(h => h.timestamp === segment.start);

    markdown += `### [${formatTime(segment.start)}](https://www.youtube.com/watch?v=${video.id}&t=${Math.floor(segment.start)}s)`;
    
    if (isHighlighted) {
      markdown += ` ⭐\n\n`;
    } else {
      markdown += `\n\n`;
    }

    markdown += `> ${segment.text}\n\n`;

    if (isHighlighted && highlight) {
      markdown += `💡 **${highlight.reason}**\n\n`;
      if (highlight.concepts) {
        markdown += `**Key Concepts:** ${highlight.concepts.join(', ')}\n\n`;
      }
    }

    markdown += `---\n\n`;
  });

  return new Blob([markdown], { type: 'text/markdown' });
}

// Helper function to download file
function downloadFile(blob, filename, mimeType) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Helper function to format time
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

