<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark">
    <!-- Header -->
    <header class="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">
              {{ user?.name?.[0] || 'U' }}
            </div>
            <div>
              <h1 class="text-xl font-bold text-text-main dark:text-text-main-dark">
                {{ t('dashboard.welcome', { name: user?.name || 'User' }) }}
              </h1>
              <div class="flex items-center gap-2 text-sm text-text-secondary dark:text-text-secondary-dark">
                <Flame class="w-4 h-4 text-orange-500" />
                <span>{{ t('dashboard.streak', { days: stats.streakDays }) }}</span>
              </div>
            </div>
          </div>
          <a
            href="#/chat"
            class="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-all duration-200 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
          >
            {{ t('dashboard.continue') }}
          </a>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Left Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Stats Cards -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              :icon="BookOpen"
              :label="t('dashboard.stats.vocabulary')"
              :value="stats.totalWords.toLocaleString()"
              subtext="本周 +15%"
              color="#137fec"
            />
            <StatCard
              :icon="Target"
              :label="t('dashboard.stats.dailyGoal')"
              value="85%"
              subtext="即将完成"
              color="#8b5cf6"
            />
            <StatCard
              :icon="Flame"
              :label="t('dashboard.stats.streak')"
              :value="`${stats.streakDays}天`"
              subtext="个人最佳: 24"
              color="#f97316"
            />
            <StatCard
              :icon="Trophy"
              :label="t('dashboard.stats.globalRank')"
              value="#420"
              subtext="前 5%"
              color="#ec4899"
            />
          </div>

          <!-- Progress Prediction Chart -->
          <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-lg font-bold text-text-main dark:text-text-main-dark flex items-center gap-2">
                  <TrendingUp class="w-5 h-5 text-primary" />
                  {{ t('dashboard.progress.title') }}
                </h3>
                <p class="text-sm text-text-secondary dark:text-text-secondary-dark">
                  {{ t('dashboard.progress.subtitle') }}
                </p>
              </div>
              <div class="flex items-center gap-4">
                <div class="text-right">
                  <div class="flex items-baseline gap-1">
                    <span class="text-3xl font-bold text-text-main dark:text-text-main-dark">3,850</span>
                    <span class="text-sm text-text-secondary dark:text-text-secondary-dark">{{ t('dashboard.progress.words') }}</span>
                  </div>
                  <span class="text-xs text-green-500 font-medium">{{ t('dashboard.progress.growth') }} +22%</span>
                </div>
              </div>
            </div>

            <!-- SVG Chart -->
            <div class="h-48 mb-4">
              <ProgressChart :data="predictionData" color="#137fec" />
            </div>

            <!-- Legend -->
            <div class="flex items-center gap-6 text-sm">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-primary" />
                <span class="text-text-secondary dark:text-text-secondary-dark">实际进度</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-primary/40" />
                <span class="text-text-secondary dark:text-text-secondary-dark">AI 预测</span>
              </div>
            </div>
          </div>

          <!-- Daily Tasks -->
          <div class="grid md:grid-cols-2 gap-4">
            <!-- Dictation Card -->
            <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark hover:shadow-lg transition-all duration-300">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Headphones class="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-text-main dark:text-text-main-dark">{{ t('dashboard.daily.dictation') }}</h4>
                    <span class="text-xs text-purple-600 bg-purple-100 dark:bg-purple-900/30 px-2 py-0.5 rounded-full">新内容</span>
                  </div>
                </div>
              </div>
              <p class="text-sm text-text-secondary dark:text-text-secondary-dark mb-4">
                通过今天的"商务旅行"对话练习你的听力技巧。
              </p>
              <div class="flex items-center gap-2 mb-4">
                <div class="flex-1 h-2 bg-background-light dark:bg-card-dark rounded-full overflow-hidden">
                  <div class="w-1/3 h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" />
                </div>
                <span class="text-xs text-text-secondary dark:text-text-secondary-dark">01:12 / 04:30</span>
              </div>
              <button class="w-full py-2.5 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors flex items-center justify-center gap-2">
                <Play class="w-4 h-4" />
                开始练习
              </button>
            </div>

            <!-- Flashcard Card -->
            <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark hover:shadow-lg transition-all duration-300">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Layers class="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-text-main dark:text-text-main-dark">{{ t('dashboard.daily.flashcard') }}</h4>
                    <span class="text-xs text-text-secondary dark:text-text-secondary-dark">待复习 20</span>
                  </div>
                </div>
              </div>

              <Flashcard
                word="Ephemeral"
                phonetic="/ɪˈfemərəl/"
                definition="短暂的；瞬息万变的"
                @flip="() => {}"
              />

              <button class="w-full mt-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark text-text-main dark:text-text-main-dark font-medium hover:bg-background-light dark:hover:bg-card-dark transition-colors flex items-center justify-center gap-2">
                <RotateCcw class="w-4 h-4" />
                全部复习 (20)
              </button>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Calendar -->
          <Calendar :check-in-dates="checkInDates" />

          <!-- Leaderboard -->
          <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 border border-border-light dark:border-border-dark">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-text-main dark:text-text-main-dark flex items-center gap-2">
                <Trophy class="w-5 h-5 text-yellow-500" />
                {{ t('dashboard.leaderboard.title') }}
              </h3>
              <a href="#/social" class="text-sm text-primary hover:text-primary-dark transition-colors">
                {{ t('dashboard.leaderboard.viewAll') }}
              </a>
            </div>

            <div class="space-y-2">
              <LeaderboardItem
                v-for="(friend, index) in friends"
                :key="friend.name"
                :rank="index + 1"
                :name="friend.name"
                :avatar="friend.avatar"
                :xp="friend.xp"
                :streak="friend.streak"
              />
            </div>

            <div class="mt-4 pt-4 border-t border-border-light dark:border-border-dark">
              <LeaderboardItem
                :rank="8"
                :name="user?.name || 'You'"
                :avatar="(user?.name?.[0] || 'Y')"
                :xp="stats.totalXP"
                :streak="stats.streakDays"
                :is-current-user="true"
              />
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 border border-border-light dark:border-border-dark">
            <h3 class="font-bold text-text-main dark:text-text-main-dark mb-4 flex items-center gap-2">
              <Zap class="w-5 h-5 text-yellow-500" />
              快捷操作
            </h3>
            <div class="grid grid-cols-2 gap-3">
              <a
                href="#/dictation"
                class="flex flex-col items-center gap-2 p-4 rounded-xl bg-background-light dark:bg-card-dark hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors group"
              >
                <Headphones class="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <span class="text-sm font-medium text-text-main dark:text-text-main-dark">单词听写</span>
              </a>
              <a
                href="#/vocabulary"
                class="flex flex-col items-center gap-2 p-4 rounded-xl bg-background-light dark:bg-card-dark hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors group"
              >
                <BookOpen class="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <span class="text-sm font-medium text-text-main dark:text-text-main-dark">词汇学习</span>
              </a>
              <a
                href="#/learning-path"
                class="flex flex-col items-center gap-2 p-4 rounded-xl bg-background-light dark:bg-card-dark hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors group"
              >
                <Target class="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <span class="text-sm font-medium text-text-main dark:text-text-main-dark">学习路径</span>
              </a>
              <a
                href="#/social"
                class="flex flex-col items-center gap-2 p-4 rounded-xl bg-background-light dark:bg-card-dark hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors group"
              >
                <Users class="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <span class="text-sm font-medium text-text-main dark:text-text-main-dark">社交中心</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  BookOpen,
  Target,
  Flame,
  Trophy,
  Play,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Layers,
  TrendingUp,
  Calendar as CalendarIcon,
  Users,
  Zap,
  Award,
} from 'lucide-vue-next';
import { useAppStore } from '../stores/appStore';
import ProgressChart from '../components/ProgressChart.vue';
import Calendar from '../components/Calendar.vue';
import StatCard from '../components/StatCard.vue';
import LeaderboardItem from '../components/LeaderboardItem.vue';
import Flashcard from '../components/Flashcard.vue';

const { t } = useI18n();
const store = useAppStore();

const user = computed(() => store.user);
const stats = computed(() => store.stats);

const friends = [
  { name: 'Sarah Chen', xp: 2890, streak: 45, avatar: 'S' },
  { name: 'Mike Ross', xp: 2450, streak: 12, avatar: 'M' },
  { name: 'Kenji Sato', xp: 1920, streak: 3, avatar: 'K' },
  { name: 'Emma Wilson', xp: 1850, streak: 8, avatar: 'E' },
  { name: 'David Kim', xp: 1680, streak: 15, avatar: 'D' },
];

// Mock check-in data
const checkInDates = [1, 3, 5, 6, 8, 9, 12, 15, 16, 18, 20, 22, 25, 26];

// Prediction chart data (next 7 days prediction)
const predictionData = [2800, 2950, 3100, 3250, 3400, 3550, 3700, 3850];
</script>
