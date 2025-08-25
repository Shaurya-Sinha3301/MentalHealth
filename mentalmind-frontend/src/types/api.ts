export interface AnalyzeRequest {
  text: string;
}

export interface AnalyzeResponse {
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number;
  mood: 'happy' | 'neutral' | 'sad' | 'angry' | 'excited' | 'anxious' | 'calm';
  timestamp: string;
  recommendation: string;
  quote?: string;
  activity?: string;
  song_suggestion?: string;
}

export interface JournalEntry {
  text: string;
  mood: 'happy' | 'neutral' | 'sad' | 'angry' | 'excited' | 'anxious' | 'calm';
  timestamp: string;
}

export interface ChatMessage {
  message: string;
  is_user: boolean;
  timestamp: string;
}

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  response: string;
  timestamp: string;
}

export interface JournalResponse {
  message: string;
}