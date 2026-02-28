import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  memberType: 'free' | 'pro';
}

export interface Stats {
  totalWords: number;
  streakDays: number;
  dailyGoalProgress: number;
  weeklyProgress: Array<{ day: string; minutes: number }>;
}

export const useAppStore = defineStore('app', () => {
  // State
  const theme = ref<'light' | 'dark'>('light');
  const user = ref<User | null>(null);
  const isAuthenticated = ref(false);
  const stats = ref<Stats>({
    totalWords: 2450,
    streakDays: 12,
    dailyGoalProgress: 85,
    weeklyProgress: [
      { day: '周一', minutes: 30 },
      { day: '周二', minutes: 45 },
      { day: '周三', minutes: 20 },
      { day: '周四', minutes: 60 },
      { day: '周五', minutes: 40 },
      { day: '周六', minutes: 0 },
      { day: '周日', minutes: 0 },
    ],
  });

  // Getters
  const isDark = computed(() => theme.value === 'dark');

  // Actions
  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    if (theme.value === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  function setTheme(newTheme: 'light' | 'dark') {
    theme.value = newTheme;
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  function login(userData: User) {
    user.value = userData;
    isAuthenticated.value = true;
  }

  function logout() {
    user.value = null;
    isAuthenticated.value = false;
  }

  function updateStats(newStats: Partial<Stats>) {
    stats.value = { ...stats.value, ...newStats };
  }

  return {
    theme,
    user,
    isAuthenticated,
    stats,
    isDark,
    toggleTheme,
    setTheme,
    login,
    logout,
    updateStats,
  };
});
