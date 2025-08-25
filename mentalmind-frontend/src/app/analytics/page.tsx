'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnimatedCard } from '@/components/animations/AnimatedCard';
import { api } from '@/lib/api';
import { JournalEntry } from '@/types/api';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { format, subDays, parseISO } from 'date-fns';
import { 
  Brain, 
  TrendingUp, 
  Calendar, 
  Target, 
  Activity, 
  Heart, 
  ArrowLeft,
  RefreshCw 
} from 'lucide-react';

interface MoodData {
  date: string;
  mood: string;
  moodScore: number;
  entries: number;
}

interface MoodDistribution {
  mood: string;
  count: number;
  percentage: number;
  color: string;
}

export default function Analytics() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [moodData, setMoodData] = useState<MoodData[]>([]);
  const [moodDistribution, setMoodDistribution] = useState<MoodDistribution[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  const moodColors = {
    happy: '#10B981',
    excited: '#F59E0B',
    calm: '#06B6D4',
    neutral: '#6B7280',
    sad: '#3B82F6',
    anxious: '#8B5CF6',
    angry: '#EF4444'
  };

  const moodScores = {
    happy: 5,
    excited: 4,
    calm: 4,
    neutral: 3,
    sad: 2,
    anxious: 1,
    angry: 1
  };

  useEffect(() => {
    loadAnalytics();
  }, [selectedPeriod]);

  const loadAnalytics = async () => {
    setIsLoading(true);
    try {
      const data = await api.getJournalEntries();
      setEntries(data);
      processAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const processAnalytics = (data: JournalEntry[]) => {
    const days = selectedPeriod === '7d' ? 7 : selectedPeriod === '30d' ? 30 : 90;
    const dateRange = Array.from({ length: days }, (_, i) => {
      const date = subDays(new Date(), days - 1 - i);
      return format(date, 'yyyy-MM-dd');
    });

    // Process mood data over time
    const moodByDate = dateRange.map(date => {
      const dayEntries = data.filter(entry => 
        format(parseISO(entry.timestamp), 'yyyy-MM-dd') === date
      );
      
      if (dayEntries.length === 0) {
        return {
          date: format(parseISO(date), 'MMM dd'),
          mood: 'neutral',
          moodScore: 3,
          entries: 0
        };
      }

      const avgMoodScore = dayEntries.reduce((sum, entry) => 
        sum + (moodScores[entry.mood as keyof typeof moodScores] || 3), 0
      ) / dayEntries.length;

      const dominantMood = dayEntries.reduce((acc, entry) => {
        acc[entry.mood] = (acc[entry.mood] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const topMood = Object.entries(dominantMood).reduce((a, b) => 
        dominantMood[a[0]] > dominantMood[b[0]] ? a : b
      )[0];

      return {
        date: format(parseISO(date), 'MMM dd'),
        mood: topMood,
        moodScore: Math.round(avgMoodScore * 10) / 10,
        entries: dayEntries.length
      };
    });

    setMoodData(moodByDate);

    // Process mood distribution
    const moodCounts = data.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const total = data.length;
    const distribution = Object.entries(moodCounts).map(([mood, count]) => ({
      mood,
      count,
      percentage: Math.round((count / total) * 100),
      color: moodColors[mood as keyof typeof moodColors] || '#6B7280'
    })).sort((a, b) => b.count - a.count);

    setMoodDistribution(distribution);
  };

  const getMoodEmoji = (mood: string) => {
    const emojis = {
      happy: '😊',
      excited: '🤩',
      calm: '😌',
      neutral: '😐',
      sad: '😢',
      anxious: '😰',
      angry: '😠'
    };
    return emojis[mood as keyof typeof emojis] || '😐';
  };

  const getAverageMoodScore = () => {
    if (moodData.length === 0) return 0;
    const validEntries = moodData.filter(d => d.entries > 0);
    if (validEntries.length === 0) return 0;
    return validEntries.reduce((sum, d) => sum + d.moodScore, 0) / validEntries.length;
  };

  const getTotalEntries = () => {
    return moodData.reduce((sum, d) => sum + d.entries, 0);
  };

  const getMoodTrend = () => {
    if (moodData.length < 2) return 'stable';
    const recent = moodData.slice(-7).filter(d => d.entries > 0);
    if (recent.length < 2) return 'stable';
    
    const recentAvg = recent.reduce((sum, d) => sum + d.moodScore, 0) / recent.length;
    const earlier = moodData.slice(0, -7).filter(d => d.entries > 0);
    if (earlier.length === 0) return 'stable';
    
    const earlierAvg = earlier.reduce((sum, d) => sum + d.moodScore, 0) / earlier.length;
    
    if (recentAvg > earlierAvg + 0.3) return 'improving';
    if (recentAvg < earlierAvg - 0.3) return 'declining';
    return 'stable';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading your analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Mental Health Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Insights into your mental wellness journey
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {(['7d', '30d', '90d'] as const).map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
              >
                {period === '7d' ? '7 Days' : period === '30d' ? '30 Days' : '90 Days'}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <AnimatedCard animationType="fadeIn" delay={0.1} className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Average Mood</p>
                <p className="text-2xl font-bold text-teal-600">
                  {getAverageMoodScore().toFixed(1)}/5
                </p>
              </div>
              <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-full">
                <Heart className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard animationType="fadeIn" delay={0.2} className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Entries</p>
                <p className="text-2xl font-bold text-blue-600">{getTotalEntries()}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard animationType="fadeIn" delay={0.3} className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Mood Trend</p>
                <div className="flex items-center gap-2">
                  <Badge variant={
                    getMoodTrend() === 'improving' ? 'positive' : 
                    getMoodTrend() === 'declining' ? 'negative' : 'neutral'
                  }>
                    {getMoodTrend()}
                  </Badge>
                  <TrendingUp className={`h-4 w-4 ${
                    getMoodTrend() === 'improving' ? 'text-green-600' : 
                    getMoodTrend() === 'declining' ? 'text-red-600' : 'text-gray-600'
                  }`} />
                </div>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard animationType="fadeIn" delay={0.4} className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Streak</p>
                <p className="text-2xl font-bold text-purple-600">
                  {moodData.filter(d => d.entries > 0).length} days
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </AnimatedCard>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Mood Over Time */}
          <AnimatedCard animationType="slideUp" delay={0.2} className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-teal-600" />
                Mood Over Time
              </CardTitle>
              <CardDescription>
                Track your emotional patterns and trends
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis 
                    domain={[1, 5]}
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="moodScore"
                    stroke="#14b8a6"
                    fill="url(#moodGradient)"
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </AnimatedCard>

          {/* Mood Distribution */}
          <AnimatedCard animationType="slideUp" delay={0.4} className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Mood Distribution
              </CardTitle>
              <CardDescription>
                Breakdown of your emotional states
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={moodDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="count"
                  >
                    {moodDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </AnimatedCard>
        </div>

        {/* Mood Breakdown */}
        <AnimatedCard animationType="fadeIn" delay={0.6} className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Detailed Mood Breakdown
            </CardTitle>
            <CardDescription>
              Complete analysis of your emotional patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {moodDistribution.map((mood) => (
                <div key={mood.mood} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getMoodEmoji(mood.mood)}</span>
                      <span className="font-medium capitalize">{mood.mood}</span>
                    </div>
                    <Badge variant="outline">{mood.percentage}%</Badge>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${mood.percentage}%`,
                        backgroundColor: mood.color
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {mood.count} entries
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </AnimatedCard>
      </div>
    </div>
  );
}