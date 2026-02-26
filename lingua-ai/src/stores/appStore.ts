import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme, Language, User, LearningStats } from '../types';

interface AppState {
  // 主题
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  
  // 语言
  language: Language;
  setLanguage: (lang: Language) => void;
  
  // 用户
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  
  // 学习统计
  stats: LearningStats;
  updateStats: (stats: Partial<LearningStats>) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // 主题
      theme: 'light',
      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        set({ theme: newTheme });
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      },
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.classList.toggle('dark', theme === 'dark');
      },
      
      // 语言
      language: 'zh-CN',
      setLanguage: (language) => set({ language }),
      
      // 用户
      user: null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      isAuthenticated: false,
      
      // 学习统计（默认值）
      stats: {
        totalWords: 2450,
        masteredWords: 1200,
        learningWords: 1250,
        streakDays: 12,
        totalXP: 2890,
        weeklyProgress: [
          { day: '周一', xp: 120 },
          { day: '周二', xp: 200 },
          { day: '周三', xp: 150 },
          { day: '周四', xp: 280 },
          { day: '周五', xp: 180 },
          { day: '周六', xp: 320 },
          { day: '周日', xp: 240 },
        ],
        monthlyProgress: [
          { week: '第一周', words: 150 },
          { week: '第二周', words: 280 },
          { week: '第三周', words: 420 },
          { week: '第四周', words: 380 },
        ],
      },
      updateStats: (newStats) => set((state) => ({
        stats: { ...state.stats, ...newStats }
      })),
    }),
    {
      name: 'lingua-ai-storage',
    }
  )
);
