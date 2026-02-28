<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark">
    <!-- Header -->
    <header class="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-bold text-text-main dark:text-text-main-dark">个人中心</h1>
          <div class="flex items-center gap-2">
            <button class="p-2 rounded-xl hover:bg-background-light dark:hover:bg-card-dark transition-colors relative">
              <Bell class="w-5 h-5 text-text-secondary dark:text-text-secondary-dark" />
              <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button class="p-2 rounded-xl hover:bg-background-light dark:hover:bg-card-dark transition-colors">
              <Settings class="w-5 h-5 text-text-secondary dark:text-text-secondary-dark" />
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Profile Card -->
      <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark mb-6">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="relative">
            <div class="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-3xl">
              {{ user?.name?.[0] || 'U' }}
            </div>
            <button class="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary-dark transition-colors">
              <Camera class="w-4 h-4" />
            </button>
          </div>
          
          <div class="flex-1 text-center md:text-left">
            <h2 class="text-2xl font-bold text-text-main dark:text-text-main-dark">{{ user?.name || 'User' }}</h2>
            <p class="text-text-secondary dark:text-text-secondary-dark">{{ user?.email || 'user@example.com' }}</p>
            <div class="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3">
              <span class="px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium">
                Level {{ user?.level || 1 }}
              </span>
              <span class="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 text-sm font-medium flex items-center gap-1">
                <Flame class="w-3 h-3" />
                {{ stats.streakDays }} 天连胜
              </span>
              <span class="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 text-sm font-medium">
                {{ stats.totalXP.toLocaleString() }} XP
              </span>
            </div>
          </div>
          
          <button class="px-4 py-2 rounded-xl border border-border-light dark:border-border-dark text-text-main dark:text-text-main-dark hover:bg-background-light dark:hover:bg-card-dark transition-colors flex items-center gap-2">
            <Edit3 class="w-4 h-4" />
            编辑资料
          </button>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-all whitespace-nowrap',
            activeTab === tab.id
              ? 'bg-primary text-white shadow-lg shadow-primary/30'
              : 'bg-surface-light dark:bg-surface-dark text-text-secondary dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-card-dark'
          ]"
        >
          <component :is="tab.icon" class="w-4 h-4" />
          {{ tab.label }}
        </button>
      </div>

      <!-- Tab Content -->
      <div v-if="activeTab === 'overview'" class="grid lg:grid-cols-3 gap-6">
        <!-- Stats -->
        <div class="lg:col-span-2 space-y-6">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 border border-border-light dark:border-border-dark">
              <div class="text-3xl font-bold text-primary">{{ stats.totalWords.toLocaleString() }}</div>
              <div class="text-sm text-text-secondary dark:text-text-secondary-dark mt-1">总词汇量</div>
            </div>
            <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 border border-border-light dark:border-border-dark">
              <div class="text-3xl font-bold text-purple-500">{{ stats.masteredWords.toLocaleString() }}</div>
              <div class="text-sm text-text-secondary dark:text-text-secondary-dark mt-1">已掌握</div>
            </div>
            <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 border border-border-light dark:border-border-dark">
              <div class="text-3xl font-bold text-orange-500">{{ stats.streakDays }}</div>
              <div class="text-sm text-text-secondary dark:text-text-secondary-dark mt-1">当前连胜</div>
            </div>
            <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 border border-border-light dark:border-border-dark">
              <div class="text-3xl font-bold text-green-500">156</div>
              <div class="text-sm text-text-secondary dark:text-text-secondary-dark mt-1">学习天数</div>
            </div>
          </div>

          <!-- Learning History -->
          <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
            <h3 class="text-lg font-bold text-text-main dark:text-text-main-dark mb-4">最近学习记录</h3>
            <div class="space-y-3">
              <div
                v-for="(record, index) in learningHistory"
                :key="index"
                class="flex items-center gap-4 p-3 rounded-xl bg-background-light dark:bg-card-dark"
              >
                <div class="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <Calendar class="w-5 h-5 text-primary" />
                </div>
                <div class="flex-1">
                  <div class="font-medium text-text-main dark:text-text-main-dark">{{ record.date }}</div>
                  <div class="text-sm text-text-secondary dark:text-text-secondary-dark">
                    学习 {{ record.time }} · {{ record.words }} 个单词
                  </div>
                </div>
                <div class="text-right">
                  <div class="font-bold text-primary">+{{ record.xp }} XP</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Subscription -->
          <div class="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white">
            <div class="flex items-center gap-2 mb-2">
              <Award class="w-5 h-5" />
              <span class="font-semibold">Pro 会员</span>
            </div>
            <p class="text-sm opacity-80 mb-4">享受无限AI对话、高级统计等特权</p>
            <div class="text-xs opacity-60 mb-4">有效期至 2024-12-31</div>
            <button class="w-full py-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium">
              管理订阅
            </button>
          </div>

          <!-- Quick Stats -->
          <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
            <h3 class="font-bold text-text-main dark:text-text-main-dark mb-4">学习统计</h3>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-text-secondary dark:text-text-secondary-dark">本周学习时长</span>
                  <span class="font-medium text-text-main dark:text-text-main-dark">5.5 小时</span>
                </div>
                <div class="h-2 bg-background-light dark:bg-card-dark rounded-full overflow-hidden">
                  <div class="w-3/4 h-full bg-primary rounded-full" />
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-text-secondary dark:text-text-secondary-dark">本月目标进度</span>
                  <span class="font-medium text-text-main dark:text-text-main-dark">68%</span>
                </div>
                <div class="h-2 bg-background-light dark:bg-card-dark rounded-full overflow-hidden">
                  <div class="w-2/3 h-full bg-purple-500 rounded-full" />
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-text-secondary dark:text-text-secondary-dark">词汇掌握率</span>
                  <span class="font-medium text-text-main dark:text-text-main-dark">49%</span>
                </div>
                <div class="h-2 bg-background-light dark:bg-card-dark rounded-full overflow-hidden">
                  <div class="w-1/2 h-full bg-green-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'achievements'" class="grid md:grid-cols-2 gap-4">
        <AchievementBadge
          v-for="(achievement, index) in achievements"
          :key="index"
          :icon="achievement.icon"
          :title="achievement.title"
          :description="achievement.description"
          :unlocked="achievement.unlocked"
          :progress="achievement.progress"
        />
      </div>

      <div v-else-if="activeTab === 'settings'" class="grid lg:grid-cols-2 gap-6">
        <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
          <h3 class="font-bold text-text-main dark:text-text-main-dark mb-4">账户设置</h3>
          <div class="space-y-1">
            <SettingsItem :icon="User" label="个人信息" value="编辑" />
            <SettingsItem :icon="Mail" label="邮箱地址" :value="user?.email || '未设置'" />
            <SettingsItem :icon="Shield" label="密码与安全" />
            <SettingsItem :icon="CreditCard" label="订阅管理" value="Pro" />
          </div>
        </div>

        <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
          <h3 class="font-bold text-text-main dark:text-text-main-dark mb-4">偏好设置</h3>
          <div class="space-y-1">
            <button
              @click="store.toggleTheme"
              class="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-background-light dark:hover:bg-card-dark transition-colors"
            >
              <Moon class="w-5 h-5 text-text-secondary dark:text-text-secondary-dark" />
              <span class="flex-1 text-left text-text-main dark:text-text-main-dark">深色模式</span>
              <div
                :class="[
                  'w-11 h-6 rounded-full transition-colors',
                  store.theme === 'dark' ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                ]"
              >
                <div
                  :class="[
                    'w-5 h-5 rounded-full bg-white shadow-sm transition-transform mt-0.5',
                    store.theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'
                  ]"
                />
              </div>
            </button>
            <SettingsItem :icon="Globe" label="语言" value="简体中文" />
            <SettingsItem :icon="Bell" label="通知设置" />
            <SettingsItem :icon="Smartphone" label="设备管理" />
          </div>
        </div>

        <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark lg:col-span-2">
          <h3 class="font-bold text-text-main dark:text-text-main-dark mb-4">其他</h3>
          <div class="space-y-1">
            <SettingsItem :icon="Shield" label="隐私政策" />
            <SettingsItem :icon="BookOpen" label="使用条款" />
            <SettingsItem :icon="LogOut" label="退出登录" danger />
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
  User,
  Mail,
  Calendar,
  Award,
  Flame,
  BookOpen,
  Target,
  Settings,
  Bell,
  Shield,
  CreditCard,
  LogOut,
  Camera,
  Edit3,
  ChevronRight,
  Globe,
  Moon,
  Smartphone,
} from 'lucide-vue-next';
import { useAppStore } from '../stores/appStore';
import AchievementBadge from '../components/AchievementBadge.vue';
import SettingsItem from '../components/SettingsItem.vue';

const { t } = useI18n();
const store = useAppStore();

const user = computed(() => store.user);
const stats = computed(() => store.stats);

const activeTab = ref<'overview' | 'achievements' | 'settings'>('overview');

const tabs = [
  { id: 'overview', label: '概览', icon: User },
  { id: 'achievements', label: '成就', icon: Award },
  { id: 'settings', label: '设置', icon: Settings },
];

const achievements = [
  { icon: Flame, title: '连续打卡30天', description: '连续学习30天不间断', unlocked: true },
  { icon: BookOpen, title: '词汇达人', description: '掌握1000个单词', unlocked: true },
  { icon: Target, title: '完美目标', description: '连续7天完成每日目标', unlocked: true },
  { icon: Award, title: '社交达人', description: '添加10位好友', unlocked: false, progress: 60 },
  { icon: Globe, title: '环球旅行者', description: '完成所有旅行主题课程', unlocked: false, progress: 40 },
  { icon: Smartphone, title: '移动学习', description: '在移动端学习7天', unlocked: false, progress: 20 },
];

const learningHistory = [
  { date: '2024-02-26', words: 15, xp: 120, time: '45分钟' },
  { date: '2024-02-25', words: 20, xp: 150, time: '60分钟' },
  { date: '2024-02-24', words: 10, xp: 80, time: '30分钟' },
  { date: '2024-02-23', words: 25, xp: 200, time: '75分钟' },
  { date: '2024-02-22', words: 18, xp: 140, time: '50分钟' },
];
</script>
