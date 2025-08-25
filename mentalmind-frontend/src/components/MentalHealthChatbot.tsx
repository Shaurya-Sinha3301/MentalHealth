'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

import { AnimatedButton } from '@/components/animations/AnimatedButton';
import { api, ApiError } from '@/lib/api';
import { ChatMessage } from '@/types/api';
import { MessageCircle, Send, Trash2, Bot, User, Loader2 } from 'lucide-react';

export function MentalHealthChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      const history = await api.getChatHistory();
      setMessages(history);
    } catch (err) {
      console.error('Failed to load chat history:', err);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.sendChatMessage({ message: userMessage });
      
      // Reload chat history to get the latest messages
      await loadChatHistory();
      console.log('Message sent successfully:', response);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(`Failed to send message: ${err.message}`);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = async () => {
    try {
      await api.clearChatHistory();
      setMessages([]);
    } catch (err) {
      console.error('Failed to clear chat history:', err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-[600px] flex flex-col bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full shadow-lg">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Mental Wellness Companion</h3>
              <p className="text-sm text-muted-foreground">
                I'm here to listen and support you
              </p>
            </div>
          </div>
          {messages.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearHistory}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <p className="text-muted-foreground text-lg">
                Hi! I&apos;m your mental wellness companion.
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                How are you feeling today?
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.is_user ? 'justify-end' : 'justify-start'}`}
            >
              {!message.is_user && (
                <div className="flex-shrink-0 self-end">
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}
              
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                  message.is_user
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                    : 'bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-white/20'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                  {message.message}
                </p>
                <p className={`text-xs mt-2 ${
                  message.is_user ? 'text-blue-100' : 'text-muted-foreground'
                }`}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>

              {message.is_user && (
                <div className="flex-shrink-0 self-end">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                    <User className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 self-end">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 border-t border-white/10 p-4">
        {error && (
          <div className="text-sm text-red-600 bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm p-3 rounded-lg mb-3 border border-red-200/50">
            {error}
          </div>
        )}
        
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Share your thoughts and feelings..."
              className="w-full min-h-[48px] max-h-32 resize-none rounded-xl border border-white/20 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-0 focus-visible:border-transparent"
              rows={1}
            />
          </div>
          <AnimatedButton 
            onClick={sendMessage} 
            disabled={!inputMessage.trim() || isLoading}
            size="lg"
            className="px-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 shadow-lg"
            celebrateOnClick={true}
            hoverEffect={true}
          >
            <Send className="h-4 w-4" />
          </AnimatedButton>
        </div>
        
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Press Enter to send • Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}