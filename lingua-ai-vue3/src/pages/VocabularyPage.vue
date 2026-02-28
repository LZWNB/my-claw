<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <Navbar />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Left Column - Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Header -->
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {{ t('vocabulary.title') }}
            </h1>
          </div>

          <!-- Search -->
          <div class="relative">
            <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              v-model="searchQuery"
              :placeholder="t('vocabulary.search')"
              class="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Volume2 class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <!-- Categories -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="cat in categories"
              :key="cat.id"
              @click="activeCategory = cat.id"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              ]"
            >
              {{ cat.label }}
            </button>
          </div>

          <!-- Words List -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ t('vocabulary.saved') }}
              </h2>
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-500">{{ t('vocabulary.sortBy') }}</span>
                <select class="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1 bg-white dark:bg-gray-800">
                  <option>{{ t('vocabulary.recentlyAdded') }}</option>
                </select>
              </div>
            </div>

            <div
              v-for="word in words"
              :key="word.id"
              class="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                      {{ word.word }}
                    </h3>
                    <span class="text-sm text-gray-500 italic">{{ word.phonetic }}</span>
                    <span class="text-xs text-gray-400">{{ word.partOfSpeech }}</span>
                    <span
                      :class="[
                        'text-xs px-2 py-1 rounded-full',
                        word.level === 'B2' ? 'bg-blue-100 text-blue-600' :
                        word.level === 'C1' ? 'bg-orange-100 text-orange-600' :
                        'bg-purple-100 text-purple-600'
                      ]"
                    >
                      {{ word.level }}
                    </span>
                  </div>
                  <p class="text-gray-600 dark:text-gray-300 mb-2">{{ word.definition }}</p>
                  <p class="text-gray-500 dark:text-gray-400">{{ word.translation }}</p>
                </div>
                <div class="flex items-center gap-2 ml-4">
                  <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Volume2 class="w-5 h-5 text-blue-600" />
                  </button>
                  <button
                    :class="[
                      'p-2 rounded-lg',
                      word.mastered
                        ? 'bg-green-100 text-green-600'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400'
                    ]"
                  >
                    <Check class="w-5 h-5" />
                  </button>
                  <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
                    <Bookmark class="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="flex justify-center gap-2">
            <button class="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800">
              &lt;
            </button>
            <button class="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              1
            </button>
            <button class="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800">
              2
            </button>
            <button class="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800">
              3
            </button>
            <span class="w-10 h-10 flex items-center justify-center">...</span>
            <button class="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800">
              12
            </button>
            <button class="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800">
              &gt;
            </button>
          </div>
        </div>

        <!-- Right Column - Sidebar -->
        <div class="space-y-6">
          <!-- Daily Challenge -->
          <div class="bg-blue-600 rounded-2xl p-6 text-white">
            <h3 class="font-semibold mb-1">{{ t('vocabulary.dailyChallenge') }}</h3>
            <p class="text-sm text-blue-100 mb-4">{{ t('vocabulary.todayChallenge') }}</p>
            <button class="w-full py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              {{ t('vocabulary.startNow') }}
            </button>
          </div>

          <!-- Weekly Trends -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-semibold text-gray-900 dark:text-white">
                {{ t('vocabulary.weeklyTrend') }}
              </h3>
              <TrendingUp class="w-5 h-5 text-gray-400" />
            </div>
            <div class="space-y-3">
              <div
                v-for="trend in trends"
                :key="trend.rank"
                class="flex items-center gap-3"
              >
                <span
                  :class="[
                    'w-6 h-6 rounded-lg flex items-center justify-center text-sm font-bold',
                    trend.rank === 1 ? 'bg-orange-100 text-orange-600' :
                    trend.rank === 2 ? 'bg-blue-100 text-blue-600' :
                    trend.rank === 3 ? 'bg-purple-100 text-purple-600' :
                    'bg-green-100 text-green-600'
                  ]"
                >
                  {{ String(trend.rank).padStart(2, '0') }}
                </span>
                <span class="flex-1 text-gray-900 dark:text-white font-medium">
                  {{ trend.word }}
                </span>
                <span class="text-sm text-green-600">{{ trend.change }}</span>
                <ChevronRight class="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          <!-- Popular Tags -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
            <div class="flex items-center gap-2 mb-4">
              <Hash class="w-5 h-5 text-blue-600" />
              <h3 class="font-semibold text-gray-900 dark:text-white">
                {{ t('vocabulary.popularTags') }}
              </h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in tags"
                :key="tag"
                class="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-sm"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  Search,
  Volume2,
  Check,
  Bookmark,
  TrendingUp,
  Hash,
  ChevronRight,
} from 'lucide-vue-next';
import Navbar from '../components/Navbar.vue';

const { t } = useI18n();

const activeCategory = ref('all');
const searchQuery = ref('');

const categories = [
  { id: 'all', label: t('vocabulary.all') },
  { id: 'business', label: t('vocabulary.business') },
  { id: 'travel', label: t('vocabulary.travel') },
  { id: 'academic', label: t('vocabulary.academic') },
  { id: 'daily', label: t('vocabulary.daily') },
];

const words = [
  {
    id: 1,
    word: 'Serendipity',
    phonetic: '/ˌser.ənˈdɪp.ə.ti/',
    partOfSpeech: 'noun',
    level: 'B2',
    definition: 'The occurrence and development of events by chance in a happy or beneficial way.',
    translation: '意外发现珍奇事物的本领；机缘巧合',
    mastered: true,
  },
  {
    id: 2,
    word: 'Ephemeral',
    phonetic: '/ɪˈfem.ər.əl/',
    partOfSpeech: 'adjective',
    level: 'C1',
    definition: 'Lasting for a very short time.',
    translation: '短暂的；瞬息的',
    mastered: true,
  },
  {
    id: 3,
    word: 'Ubiquitous',
    phonetic: '/juːˈbɪk.wɪ.təs/',
    partOfSpeech: 'adjective',
    level: 'C2',
    definition: 'Present, appearing, or found everywhere.',
    translation: '无所不在的；普遍存在的',
    mastered: false,
  },
  {
    id: 4,
    word: 'Eloquent',
    phonetic: '/ˈel.ə.kwənt/',
    partOfSpeech: 'adjective',
    level: 'B2',
    definition: 'Fluent or persuasive in speaking or writing.',
    translation: '雄辩的；有口才的',
    mastered: true,
  },
];

const trends = [
  { rank: 1, word: 'Resilience', change: '+12%' },
  { rank: 2, word: 'Sustainable', change: '+8%' },
  { rank: 3, word: 'Innovation', change: '+5%' },
  { rank: 4, word: 'Authentic', change: '+4%' },
];

const tags = ['#TOEIC', '#商务英语', '#旅行短语', '#俚语'];
</script>
