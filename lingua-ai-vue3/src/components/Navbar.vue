<template>
  <header class="sticky top-0 z-50 flex items-center justify-between border-b border-border-light dark:border-border-dark bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md px-6 py-4 md:px-10">
    <!-- Logo -->
    <router-link to="/" class="flex items-center gap-3">
      <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <span class="material-symbols-outlined text-3xl">language</span>
      </div>
      <h2 class="text-xl font-bold tracking-tight text-text-main dark:text-text-main-dark">LinguaAI</h2>
    </router-link>

    <!-- Desktop Nav -->
    <div class="hidden md:flex items-center gap-8">
      <nav class="flex gap-6">
        <a class="text-sm font-medium text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary transition-colors" href="#features">功能</a>
        <a class="text-sm font-medium text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary transition-colors" href="#pricing">定价</a>
        <a class="text-sm font-medium text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary transition-colors" href="#community">社区</a>
      </nav>
    </div>

    <!-- Right Actions -->
    <div class="flex items-center gap-3">
      <!-- Language Selector -->
      <div class="hidden sm:flex items-center gap-1 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark p-1">
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="handleLanguageChange(lang.code)"
          :class="[
            'rounded px-2 py-1 text-xs font-medium transition-colors',
            language === lang.code
              ? 'text-primary bg-white dark:bg-surface-dark shadow-sm font-bold'
              : 'text-text-secondary dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5'
          ]"
        >
          {{ lang.label }}
        </button>
      </div>

      <!-- Theme Toggle -->
      <button
        @click="toggleTheme"
        class="p-2 rounded-lg text-text-secondary hover:bg-background-light dark:hover:bg-background-dark transition-colors"
      >
        <span class="material-symbols-outlined text-xl dark:hidden">dark_mode</span>
        <span class="material-symbols-outlined text-xl hidden dark:block">light_mode</span>
      </button>

      <!-- Login Button -->
      <router-link
        to="/login"
        class="hidden sm:flex h-9 px-4 items-center justify-center rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-sm font-bold text-text-main dark:text-text-main-dark hover:bg-background-light dark:hover:bg-background-dark transition-colors"
      >
        登录
      </router-link>

      <!-- Register Button -->
      <router-link
        to="/register"
        class="flex h-9 px-4 items-center justify-center rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors"
      >
        立即注册
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAppStore } from '../stores/appStore';
import type { Language } from '../types';

const store = useAppStore();
const { toggleTheme, language, setLanguage } = store;

const languages: { code: Language; label: string }[] = [
  { code: 'zh-CN', label: '简' },
  { code: 'zh-TW', label: '繁' },
  { code: 'ja', label: 'JP' },
  { code: 'ko', label: 'KR' },
];

const handleLanguageChange = (lang: Language) => {
  setLanguage(lang);
  // Note: i18n integration would go here
};
</script>
