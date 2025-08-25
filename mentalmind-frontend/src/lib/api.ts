import { AnalyzeRequest, AnalyzeResponse, JournalEntry, JournalResponse, ChatRequest, ChatResponse, ChatMessage } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new ApiError(response.status, errorText || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or other errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError(0, 'Unable to connect to server. Please make sure the backend is running on http://localhost:8000');
    }
    
    throw new ApiError(0, error instanceof Error ? error.message : 'An unexpected error occurred');
  }
}

export const api = {
  analyzeText: async (data: AnalyzeRequest): Promise<AnalyzeResponse> => {
    return apiRequest<AnalyzeResponse>('/analyze', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  addJournalEntry: async (entry: JournalEntry): Promise<JournalResponse> => {
    return apiRequest<JournalResponse>('/journal', {
      method: 'POST',
      body: JSON.stringify(entry),
    });
  },

  getJournalEntries: async (): Promise<JournalEntry[]> => {
    return apiRequest<JournalEntry[]>('/logs');
  },

  sendChatMessage: async (data: ChatRequest): Promise<ChatResponse> => {
    return apiRequest<ChatResponse>('/chat', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getChatHistory: async (): Promise<ChatMessage[]> => {
    return apiRequest<ChatMessage[]>('/chat/history');
  },

  clearChatHistory: async (): Promise<{ message: string }> => {
    return apiRequest<{ message: string }>('/chat/history', {
      method: 'DELETE',
    });
  },
};

export { ApiError };