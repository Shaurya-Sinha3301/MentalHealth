'use client';

import { useState } from 'react';
import Link from 'next/link';
import { JournalAnalyzer } from '@/components/JournalAnalyzer';
import { JournalHistory } from '@/components/JournalHistory';
import { MentalHealthChatbot } from '@/components/MentalHealthChatbot';
import { AnimatedCard } from '@/components/animations/AnimatedCard';
import { AnimatedButton } from '@/components/animations/AnimatedButton';
import { Button } from '@/components/ui/button';
import { Brain, MessageCircle, BookOpen, BarChart3, Home, Settings, User } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'journal' | 'chat' | 'history'>('journal');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-r border-white/20 min-h-screen">
          <div className="p-6">
            <Link href="/landing" className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl shadow-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                MentalMind
              </h1>
            </Link>

            <nav className="space-y-2">
              <Button
                variant={activeTab === 'journal' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('journal')}
              >
                <BookOpen className="h-4 w-4 mr-3" />
                Journal
              </Button>
              
              <Button
                variant={activeTab === 'chat' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('chat')}
              >
                <MessageCircle className="h-4 w-4 mr-3" />
                AI Companion
              </Button>
              
              <Button
                variant={activeTab === 'history' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('history')}
              >
                <BarChart3 className="h-4 w-4 mr-3" />
                History
              </Button>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link href="/analytics">
                  <Button variant="ghost" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-3" />
                    Analytics
                  </Button>
                </Link>
                
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </Button>
                
                <Button variant="ghost" className="w-full justify-start">
                  <User className="h-4 w-4 mr-3" />
                  Profile
                </Button>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">
                {activeTab === 'journal' && 'Journal & Analysis'}
                {activeTab === 'chat' && 'AI Companion'}
                {activeTab === 'history' && 'Your Journey'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {activeTab === 'journal' && 'Express your thoughts and get AI-powered insights'}
                {activeTab === 'chat' && 'Chat with your personal mental wellness companion'}
                {activeTab === 'history' && 'Track your progress and mood patterns over time'}
              </p>
            </div>

            <AnimatedCard 
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-0"
              animationType="scale"
              delay={0.2}
            >
              {activeTab === 'journal' && <JournalAnalyzer />}
              {activeTab === 'chat' && <MentalHealthChatbot />}
              {activeTab === 'history' && <JournalHistory />}
            </AnimatedCard>
          </div>
        </div>
      </div>
    </div>
  );
}