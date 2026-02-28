// 主题类型
export type Theme = 'light' | 'dark';

// 语言类型
export type Language = 'zh-CN' | 'zh-TW' | 'ja' | 'ko';

// 用户类型
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level: number;
  xp: number;
  streakDays: number;
  totalWords: number;
  createdAt: string;
}

// 单词类型
export interface Word {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  translation: string;
  example: string;
  exampleTranslation: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  category: string;
}

// 学习记录类型
export interface LearningRecord {
  id: string;
  userId: string;
  wordId: string;
  status: 'learning' | 'mastered' | 'review';
  lastReviewed: string;
  reviewCount: number;
}

// 课程类型
export interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  category: 'ielts' | 'business' | 'travel' | 'academic';
  lessons: Lesson[];
  progress: number;
}

// 课程单元类型
export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  completed: boolean;
}

// 打卡记录类型
export interface CheckIn {
  id: string;
  userId: string;
  date: string;
  xp: number;
  wordsLearned: number;
}

// 好友类型
export interface Friend {
  id: string;
  name: string;
  avatar: string;
  streakDays: number;
  xp: number;
  isOnline: boolean;
}

// 对话消息类型
export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
  grammarCheck?: {
    original: string;
    corrected: string;
    explanation: string;
  };
}

// 学习统计数据
export interface LearningStats {
  totalWords: number;
  masteredWords: number;
  learningWords: number;
  streakDays: number;
  totalXP: number;
  weeklyProgress: { day: string; xp: number }[];
  monthlyProgress: { week: string; words: number }[];
}
