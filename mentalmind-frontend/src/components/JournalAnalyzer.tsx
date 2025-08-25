'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { VoiceInput } from '@/components/VoiceInput';
import { AnimatedButton } from '@/components/animations/AnimatedButton';
import { AnimatedCard } from '@/components/animations/AnimatedCard';
import { api, ApiError } from '@/lib/api';
import { AnalyzeResponse } from '@/types/api';
import { Brain, Loader2, Heart, Lightbulb, Quote, Music, Activity } from 'lucide-react';

export function JournalAnalyzer() {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    
    try {
      const response = await api.analyzeText({ text });
      setResult(response);
      
      // Save to journal
      await api.addJournalEntry({
        text,
        mood: response.mood,
        timestamp: response.timestamp,
      });
    } catch (err) {
      if (err instanceof ApiError) {
        setError(`Analysis failed: ${err.message}`);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'positive';
      case 'negative': return 'negative';
      default: return 'neutral';
    }
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'happy': return '😊';
      case 'sad': return '😢';
      case 'angry': return '😠';
      case 'excited': return '🤩';
      case 'anxious': return '😰';
      case 'calm': return '😌';
      default: return '😐';
    }
  };

  const handleVoiceTranscript = (transcript: string) => {
    setText(prev => prev + (prev ? ' ' : '') + transcript);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            Journal Entry Analyzer
          </CardTitle>
          <CardDescription>
            Write about your thoughts and feelings, and get insights into your emotional well-being
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="journal-text" className="text-sm font-medium">
                How are you feeling today?
              </label>
              <VoiceInput 
                onTranscript={handleVoiceTranscript}
                disabled={isAnalyzing}
              />
            </div>
            <Textarea
              id="journal-text"
              placeholder="Share your thoughts, experiences, or feelings here... You can also use voice input!"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          
          {error && (
            <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
              {error}
            </div>
          )}
          
          <AnimatedButton 
            onClick={handleAnalyze} 
            disabled={isAnalyzing || !text.trim()}
            className="w-full"
            celebrateOnClick={true}
            hoverEffect={true}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Analyze Entry
              </>
            )}
          </AnimatedButton>
        </CardContent>
      </Card>

      {result && (
        <AnimatedCard animationType="slideUp" delay={0.3}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500" />
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  Sentiment
                  <Badge variant={getSentimentColor(result.sentiment)}>
                    {result.sentiment}
                  </Badge>
                </h4>
                <p className="text-sm text-muted-foreground">
                  Confidence: {(result.confidence * 100).toFixed(1)}%
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  Mood
                  <span className="text-2xl">{getMoodEmoji(result.mood)}</span>
                  <Badge variant="outline">{result.mood}</Badge>
                </h4>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  Recommendation
                </h4>
                <p className="text-sm bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                  {result.recommendation}
                </p>
              </div>

              {result.quote && (
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Quote className="h-4 w-4 text-purple-500" />
                    Inspirational Quote
                  </h4>
                  <blockquote className="text-sm italic bg-purple-50 dark:bg-purple-900/20 p-3 rounded-md border-l-4 border-purple-500">
                    &quot;{result.quote}&quot;
                  </blockquote>
                </div>
              )}

              {result.activity && (
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Activity className="h-4 w-4 text-green-500" />
                    Suggested Activity
                  </h4>
                  <p className="text-sm bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
                    {result.activity}
                  </p>
                </div>
              )}

              {result.song_suggestion && (
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Music className="h-4 w-4 text-pink-500" />
                    Song Suggestion
                  </h4>
                  <p className="text-sm bg-pink-50 dark:bg-pink-900/20 p-3 rounded-md">
                    🎵 {result.song_suggestion}
                  </p>
                </div>
              )}
            </div>
            
            <p className="text-xs text-muted-foreground">
              Analyzed on {new Date(result.timestamp).toLocaleString()}
            </p>
          </CardContent>
        </AnimatedCard>
      )}
    </div>
  );
}