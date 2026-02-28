<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark">
    <!-- Header -->
    <header class="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white">
              <Map class="w-5 h-5" />
            </div>
            <div>
              <h1 class="text-xl font-bold text-text-main dark:text-text-main-dark">学习路径</h1>
              <p class="text-sm text-text-secondary dark:text-text-secondary-dark">定制您的个性化学习计划</p>
            </div>
          </div>
          <button
            @click="showAssessment = true"
            class="px-4 py-2 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors flex items-center gap-2"
          >
            <Sparkles class="w-4 h-4" />
            重新评估
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Level Selector -->
      <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-2 border border-border-light dark:border-border-dark mb-6">
        <div class="flex gap-2">
          <button
            v-for="level in levelKeys"
            :key="level"
            @click="selectedLevel = level"
            :class="[
              'flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200',
              selectedLevel === level
                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                : 'text-text-secondary dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-card-dark'
            ]"
          >
            {{ levels[level].name }}
          </button>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Current Level Info -->
          <div class="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h2 class="text-2xl font-bold">{{ currentLevel.name }}阶段</h2>
                <p class="text-white/80 mt-1">{{ currentLevel.skills.filter(s => s.status === 'completed').length }}/{{ currentLevel.skills.length }} 技能已完成</p>
              </div>
              <div :class="`w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-${currentLevel.color}-400`">
                <Award class="w-8 h-8" />
              </div>
            </div>
            <div class="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                class="h-full bg-white rounded-full transition-all duration-500"
                :style="{ width: `${(currentLevel.skills.filter(s => s.status === 'completed').length / currentLevel.skills.length) * 100}%` }"
              />
            </div>
          </div>

          <!-- Skills -->
          <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
            <h3 class="font-bold text-text-main dark:text-text-main-dark mb-4 flex items-center gap-2">
              <Target class="w-5 h-5 text-primary" />
              技能树
            </h3>
            <div class="space-y-3">
              <button
                v-for="skill in currentLevel.skills"
                :key="skill.title"
                @click="handleSkillClick(skill)"
                :disabled="skill.status === 'locked'"
                :class="[
                  'w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left',
                  getSkillBgClass(skill.status),
                  getSkillBorderClass(skill.status),
                  skill.status !== 'locked' ? 'hover:shadow-lg cursor-pointer' : 'cursor-not-allowed opacity-60'
                ]"
              >
                <div class="flex items-start gap-4">
                  <div :class="[
                    'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
                    skill.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-background-light dark:bg-card-dark'
                  ]">
                    <component :is="skill.icon" :class="`w-6 h-6 ${getSkillIconClass(skill.status)}`" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2">
                      <h4 class="font-semibold text-text-main dark:text-text-main-dark truncate">{{ skill.title }}</h4>
                      <span class="text-xs">{{ getSkillBadge(skill.status) }}</span>
                    </div>
                    <p class="text-sm text-text-secondary dark:text-text-secondary-dark mt-1 line-clamp-2">{{ skill.description }}</p>
                    
                    <div v-if="skill.status === 'in-progress' && skill.progress !== undefined" class="mt-3">
                      <div class="h-1.5 bg-background-light dark:bg-card-dark rounded-full overflow-hidden">
                        <div
                          class="h-full bg-primary rounded-full transition-all duration-500"
                          :style="{ width: `${skill.progress}%` }"
                        />
                      </div>
                      <span class="text-xs text-primary mt-1">{{ skill.progress }}% 完成</span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Weekly Progress -->
          <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-text-main dark:text-text-main-dark flex items-center gap-2">
                <Calendar class="w-5 h-5 text-primary" />
                本周目标
              </h3>
              <span class="text-sm text-text-secondary dark:text-text-secondary-dark">3/7 天</span>
            </div>
            <div class="flex justify-between">
              <div
                v-for="goal in weeklyGoals"
                :key="goal.day"
                class="flex flex-col items-center gap-2"
              >
                <div :class="[
                  'w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-colors',
                  goal.completed
                    ? 'bg-green-500 text-white'
                    : goal.current
                    ? 'bg-primary text-white ring-2 ring-primary ring-offset-2 dark:ring-offset-surface-dark'
                    : 'bg-background-light dark:bg-card-dark text-text-secondary dark:text-text-secondary-dark'
                ]">
                  {{ goal.completed ? '✓' : goal.day[0] }}
                </div>
                <span class="text-xs text-text-secondary dark:text-text-secondary-dark">{{ goal.day }}</span>
              </div>
            </div>
          </div>

          <!-- Milestones -->
          <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
            <h3 class="font-bold text-text-main dark:text-text-main-dark mb-4 flex items-center gap-2">
              <Award class="w-5 h-5 text-yellow-500" />
              里程碑
            </h3>
            <div class="space-y-3">
              <div
                v-for="milestone in milestones"
                :key="milestone.title"
                :class="[
                  'p-4 rounded-xl border transition-all duration-300',
                  milestone.completed
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : 'bg-background-light dark:bg-card-dark border-border-light dark:border-border-dark'
                ]"
              >
                <div class="flex items-start gap-3">
                  <div :class="[
                    'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                    milestone.completed
                      ? 'bg-green-500 text-white'
                      : 'bg-surface-light dark:bg-surface-dark text-text-secondary dark:text-text-secondary-dark'
                  ]">
                    <Check v-if="milestone.completed" class="w-5 h-5" />
                    <Lock v-else class="w-5 h-5" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 :class="[
                      'font-semibold',
                      milestone.completed
                        ? 'text-green-700 dark:text-green-400'
                        : 'text-text-main dark:text-text-main-dark'
                    ]">
                      {{ milestone.title }}
                    </h4>
                    <p class="text-sm text-text-secondary dark:text-text-secondary-dark">{{ milestone.description }}</p>
                    <span class="inline-block mt-2 text-xs font-medium px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
                      奖励: {{ milestone.reward }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Study Stats -->
          <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
            <h3 class="font-bold text-text-main dark:text-text-main-dark mb-4 flex items-center gap-2">
              <TrendingUp class="w-5 h-5 text-primary" />
              学习统计
            </h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-text-secondary dark:text-text-secondary-dark">总学习时长</span>
                <span class="font-semibold text-text-main dark:text-text-main-dark">{{ stats.totalStudyTime || 0 }} 小时</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-text-secondary dark:text-text-secondary-dark">掌握单词</span>
                <span class="font-semibold text-text-main dark:text-text-main-dark">{{ stats.totalWords }} 个</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-text-secondary dark:text-text-secondary-dark">连续打卡</span>
                <span class="font-semibold text-text-main dark:text-text-main-dark">{{ stats.streakDays }} 天</span>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
            <h3 class="font-bold text-text-main dark:text-text-main-dark mb-4">快捷操作</h3>
            <div class="space-y-2">
              <button class="w-full py-3 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary font-medium hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors flex items-center justify-center gap-2">
                <Play class="w-4 h-4" />
                继续学习
              </button>
              <button class="w-full py-3 rounded-xl border border-border-light dark:border-border-dark text-text-main dark:text-text-main-dark font-medium hover:bg-background-light dark:hover:bg-card-dark transition-colors flex items-center justify-center gap-2">
                <RotateCcw class="w-4 h-4" />
                复习单词
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  Map,
  Target,
  Award,
  Check,
  Lock,
  BookOpen,
  Headphones,
  MessageCircle,
  PenTool,
  Play,
  RotateCcw,
  TrendingUp,
  Calendar,
  Sparkles,
} from 'lucide-vue-next';
import { useAppStore } from '../stores/appStore';

const store = useAppStore();
const selectedLevel = ref<'beginner' | 'intermediate' | 'advanced'>('intermediate');
const showAssessment = ref(false);

const levels = {
  beginner: {
    name: '初级',
    color: 'green',
    skills: [
      { icon: BookOpen, title: '基础词汇', description: '掌握1000个最常用英语单词', status: 'completed' as const },
      { icon: Headphones, title: '简单听力', description: '理解慢速英语对话', status: 'completed' as const },
      { icon: MessageCircle, title: '日常对话', description: '进行简单的日常交流', status: 'in-progress' as const, progress: 65 },
      { icon: PenTool, title: '基础写作', description: '写出简单的句子和段落', status: 'available' as const },
      { icon: Target, title: '语法基础', description: '掌握基本语法规则', status: 'locked' as const },
    ],
  },
  intermediate: {
    name: '中级',
    color: 'blue',
    skills: [
      { icon: BookOpen, title: '进阶词汇', description: '掌握3000个常用单词和短语', status: 'in-progress' as const, progress: 45 },
      { icon: Headphones, title: '标准听力', description: '理解正常速度的英语对话', status: 'available' as const },
      { icon: MessageCircle, title: '流利对话', description: '就各种话题进行流利交流', status: 'locked' as const },
      { icon: PenTool, title: '学术写作', description: '写出结构清晰的文章', status: 'locked' as const },
      { icon: Target, title: '复杂语法', description: '掌握复杂句型和语法结构', status: 'locked' as const },
    ],
  },
  advanced: {
    name: '高级',
    color: 'purple',
    skills: [
      { icon: BookOpen, title: '专业词汇', description: '掌握专业领域词汇', status: 'locked' as const },
      { icon: Headphones, title: '母语级听力', description: '理解各种口音和俚语', status: 'locked' as const },
      { icon: MessageCircle, title: '商务谈判', description: '进行专业的商务沟通', status: 'locked' as const },
      { icon: PenTool, title: '创意写作', description: '写出有创意的文章和故事', status: 'locked' as const },
      { icon: Target, title: '精通语法', description: '完美掌握所有语法规则', status: 'locked' as const },
    ],
  },
};

const levelKeys = Object.keys(levels) as Array<keyof typeof levels>;
const currentLevel = computed(() => levels[selectedLevel.value]);

const milestones = [
  { title: '初学者', description: '完成初级所有技能', completed: true, reward: '100 XP' },
  { title: '进阶者', description: '完成中级所有技能', completed: false, reward: '300 XP' },
  { title: '精通者', description: '完成高级所有技能', completed: false, reward: '500 XP' },
  { title: '大师', description: '连续学习100天', completed: false, reward: '专属徽章' },
];

const weeklyGoals = [
  { day: '周一', completed: true, current: false },
  { day: '周二', completed: true, current: false },
  { day: '周三', completed: true, current: false },
  { day: '周四', completed: false, current: true },
  { day: '周五', completed: false, current: false },
  { day: '周六', completed: false, current: false },
  { day: '周日', completed: false, current: false },
];

const stats = computed(() => store.stats);

// Helper functions for skill styling
function getSkillBgClass(status: string) {
  const config: Record<string, string> = {
    locked: 'bg-gray-100 dark:bg-gray-800',
    available: 'bg-surface-light dark:bg-surface-dark',
    'in-progress': 'bg-primary/5 dark:bg-primary/10',
    completed: 'bg-green-50 dark:bg-green-900/20',
  };
  return config[status] || config.locked;
}

function getSkillBorderClass(status: string) {
  const config: Record<string, string> = {
    locked: 'border-gray-200 dark:border-gray-700',
    available: 'border-primary',
    'in-progress': 'border-primary',
    completed: 'border-green-500',
  };
  return config[status] || config.locked;
}

function getSkillIconClass(status: string) {
  const config: Record<string, string> = {
    locked: 'text-gray-400',
    available: 'text-primary',
    'in-progress': 'text-primary',
    completed: 'text-green-500',
  };
  return config[status] || config.locked;
}

function getSkillBadge(status: string) {
  const config: Record<string, string> = {
    locked: '🔒',
    available: '▶️',
    'in-progress': '🔄',
    completed: '✓',
  };
  return config[status] || config.locked;
}

function handleSkillClick(skill: any) {
  if (skill.status !== 'locked') {
    console.log('Clicked skill:', skill.title);
  }
}
</script>
