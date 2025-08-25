'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { api, ApiError } from '@/lib/api';
import { JournalEntry } from '@/types/api';
import { History, RefreshCw, Calendar } from 'lucide-react';

export function JournalHistory() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEntries = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await api.getJournalEntries();
      setEntries(data.reverse()); // Show newest first
    } catch (err) {
      if (err instanceof ApiError) {
        setError(`Failed to load entries: ${err.message}`);
      } else {
        setError('Something went wrong loading your journal entries.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

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

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'happy': return 'positive';
      case 'excited': return 'positive';
      case 'calm': return 'positive';
      case 'sad': return 'negative';
      case 'anxious': return 'negative';
      case 'angry': return 'destructive';
      default: return 'neutral';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-6 w-6 text-primary" />
            Journal History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Loading your entries...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <History className="h-6 w-6 text-primary" />
              Journal History
            </CardTitle>
            <CardDescription>
              Your previous journal entries and mood tracking
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={loadEntries}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        {entries.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No journal entries yet.</p>
            <p className="text-sm">Start by analyzing your first entry above!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getMoodEmoji(entry.mood)}</span>
                    <Badge variant={getMoodColor(entry.mood)}>
                      {entry.mood}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(entry.timestamp).toLocaleString()}
                  </span>
                </div>
                
                <p className="text-sm leading-relaxed">
                  {entry.text.length > 200 
                    ? `${entry.text.substring(0, 200)}...` 
                    : entry.text
                  }
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}