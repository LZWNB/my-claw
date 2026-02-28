<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark">
    <!-- Header -->
    <header class="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark sticky top-0 z-50">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white">
              <Headphones class="w-5 h-5" />
            </div>
            <div>
              <h1 class="text-xl font-bold text-text-main dark:text-text-main-dark">单词听写</h1>
              <p class="text-sm text-text-secondary dark:text-text-secondary-dark">听音频，写出你听到的单词</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <select
              v-model="playbackSpeed"
              class="px-3 py-2 rounded-xl bg-background-light dark:bg-card-dark border border-border-light dark:border-border-dark text-sm text-text-main dark:text-text-main-dark focus:outline-none focus:border-primary"
            >
              <option :value="1">1.0x</option>
              <option :value="0.75">0.75x</option>
              <option :value="0.5">0.5x</option>
            </select>
            <button class="p-2 rounded-xl hover:bg-background-light dark:hover:bg-card-dark transition-colors">
              <Settings class="w-5 h-5 text-text-secondary dark:text-text-secondary-dark" />
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="sessionComplete" class="bg-surface-light dark:bg-surface-dark rounded-2xl p-8 border border-border-light dark:border-border-dark text-center">
        <div class="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mx-auto mb-6">
          <Trophy class="w-10 h-10 text-white" />
        </div>

        <h2 class="text-2xl font-bold text-text-main dark:text-text-main-dark mb-2">练习完成！</h2>
        <p class="text-text-secondary dark:text-text-secondary-dark mb-8">
          你完成了 {{ words.length }} 个单词的听写练习
        </p>

        <div class="grid grid-cols-3 gap-4 mb-8">
          <div class="p-4 rounded-xl bg-background-light dark:bg-card-dark">
            <div class="text-3xl font-bold text-primary">{{ correctCount }}</div>
            <div class="text-sm text-text-secondary dark:text-text-secondary-dark">正确</div>
          </div>
          <div class="p-4 rounded-xl bg-background-light dark:bg-card-dark">
            <div class="text-3xl font-bold text-red-500">{{ words.length - correctCount }}</div>
            <div class="text-sm text-text-secondary dark:text-text-secondary-dark">错误</div>
          </div>
          <div class="p-4 rounded-xl bg-background-light dark:bg-card-dark">
            <div class="text-3xl font-bold text-green-500">{{ accuracy }}%</div>
            <div class="text-sm text-text-secondary dark:text-text-secondary-dark">正确率</div>
          </div>
        </div>

        <div class="space-y-3 mb-8">
          <h3 class="font-semibold text-text-main dark:text-text-main-dark text-left">详细结果</h3>
          <!-- ResultCard inline -->
          <div
            v-for="(result, index) in results"
            :key="index"
            :class="[
              'p-4 rounded-xl border',
              result.correct
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
            ]"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <button
                  class="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
                >
                  <Volume2 class="w-5 h-5" />
                </button>
                <div>
                  <p class="font-semibold text-text-main dark:text-text-main-dark">{{ result.word }}</p>
                  <p v-if="!result.correct" class="text-sm text-red-500">你的答案: {{ result.userAnswer || '(未填写)' }}</p>
                </div>
              </div>
              <div :class="result.correct ? 'text-green-500' : 'text-red-500'">
                <Check v-if="result.correct" class="w-6 h-6" />
                <X v-else class="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        <div class="flex gap-4">
          <button
            @click="handleRestart"
            class="flex-1 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw class="w-5 h-5" />
            再练一次
          </button>
          <a
            href="#/dashboard"
            class="flex-1 py-3 rounded-xl border border-border-light dark:border-border-dark text-text-main dark:text-text-main-dark font-semibold hover:bg-background-light dark:hover:bg-card-dark transition-colors flex items-center justify-center gap-2"
          >
            返回首页
            <ChevronRight class="w-5 h-5" />
          </a>
        </div>
      </div>

      <div v-else class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
        <!-- Progress -->
        <div class="mb-8">
          <!-- ProgressBar inline -->
          <div class="w-full">
            <div class="flex justify-between text-sm mb-2">
              <span class="text-text-secondary dark:text-text-secondary-dark">进度</span>
              <span class="font-medium text-text-main dark:text-text-main-dark">{{ currentWordIndex }} / {{ words.length }}</span>
            </div>
            <div class="h-2 bg-background-light dark:bg-card-dark rounded-full overflow-hidden">
              <div
                class="h-full bg-primary rounded-full transition-all duration-300"
                :style="{ width: `${(currentWordIndex / words.length) * 100}%` }"
              />
            </div>
          </div>
        </div>

        <!-- Word Info -->
        <div class="flex items-center justify-between mb-8">
          <!-- DifficultyBadge inline -->
          <span
            :class="[
              'px-3 py-1 rounded-full text-xs font-medium',
              currentWord.difficulty === 'easy' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' :
              currentWord.difficulty === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600' :
              'bg-red-100 dark:bg-red-900/30 text-red-600'
            ]"
          >
            {{ currentWord.difficulty === 'easy' ? '简单' : currentWord.difficulty === 'medium' ? '中等' : '困难' }}
          </span>
          <div class="flex items-center gap-2 text-text-secondary dark:text-text-secondary-dark">
            <Clock class="w-4 h-4" />
            <span class="text-sm">{{ Math.ceil((words.length - currentWordIndex) * 0.5) }} 分钟</span>
          </div>
        </div>

        <!-- Audio Player -->
        <div class="flex flex-col items-center mb-8">
          <button
            @click="handlePlay"
            :disabled="isPlaying"
            :class="[
              'w-24 h-24 rounded-full flex items-center justify-center mb-4 transition-all duration-300',
              isPlaying
                ? 'bg-primary/20 scale-95'
                : 'bg-primary hover:bg-primary-dark shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40'
            ]"
          >
            <template v-if="isPlaying">
              <div class="flex gap-1">
                <div class="w-1.5 h-8 bg-primary rounded-full animate-pulse" />
                <div class="w-1.5 h-8 bg-primary rounded-full animate-pulse delay-75" />
                <div class="w-1.5 h-8 bg-primary rounded-full animate-pulse delay-150" />
              </div>
            </template>
            <template v-else>
              <Play class="w-10 h-10 text-white ml-1" />
            </template>
          </button>
          <p class="text-text-secondary dark:text-text-secondary-dark">
            {{ isPlaying ? '正在播放...' : '点击播放音频' }}
          </p>
        </div>

        <!-- Input Area -->
        <div class="mb-6">
          <input
            v-model="userInput"
            type="text"
            placeholder="输入你听到的单词..."
            :disabled="showResult"
            :class="[
              'w-full px-6 py-4 text-center text-2xl font-semibold rounded-xl border-2 transition-all duration-200',
              showResult
                ? userInput.toLowerCase().trim() === currentWord.word.toLowerCase()
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700'
                  : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700'
                : 'border-border-light dark:border-border-dark bg-background-light dark:bg-card-dark text-text-main dark:text-text-main-dark focus:border-primary focus:outline-none'
            ]"
            @keydown.enter="handleEnter"
          />
        </div>

        <!-- Hint -->
        <div v-if="showHint" class="mb-6 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
          <div class="flex items-center gap-2 text-yellow-700 dark:text-yellow-300 mb-2">
            <AlertCircle class="w-4 h-4" />
            <span class="font-medium">提示</span>
          </div>
          <p class="text-sm text-yellow-600 dark:text-yellow-400">
            音标: {{ currentWord.phonetic }}
          </p>
          <p class="text-sm text-yellow-600 dark:text-yellow-400">
            释义: {{ currentWord.meaning }}
          </p>
        </div>

        <!-- Controls -->
        <div class="flex items-center justify-between">
          <button
            @click="showHint = !showHint"
            class="px-4 py-2 rounded-xl text-text-secondary dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-card-dark transition-colors flex items-center gap-2"
          >
            <Zap class="w-4 h-4" />
            {{ showHint ? '隐藏提示' : '显示提示' }}
          </button>

          <div class="flex gap-3">
            <button
              @click="handleSkip"
              :disabled="showResult"
              class="px-6 py-3 rounded-xl border border-border-light dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-card-dark transition-colors disabled:opacity-50"
            >
              跳过
            </button>
            <button
              @click="handleSubmit"
              :disabled="!userInput.trim() || showResult"
              class="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Check class="w-5 h-5" />
              提交
            </button>
          </div>
        </div>
      </div>

      <!-- Tips -->
      <div class="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
        <h3 class="font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
          <Star class="w-5 h-5" />
          学习小贴士
        </h3>
        <ul class="text-sm text-blue-600 dark:text-blue-400 space-y-1">
          <li>• 先听完整音频，再尝试拼写</li>
          <li>• 注意单词的重音和音节划分</li>
          <li>• 可以使用提示功能查看音标</li>
          <li>• 每天坚持练习，提高听力辨音能力</li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  Headphones,
  Play,
  RotateCcw,
  Check,
  X,
  Volume2,
  Settings,
  Trophy,
  Clock,
  ChevronRight,
  Star,
  AlertCircle,
  Zap,
} from 'lucide-vue-next';
import { useAppStore } from '../stores/appStore';

const store = useAppStore();

const currentWordIndex = ref(0);
const userInput = ref('');
const isPlaying = ref(false);
const showResult = ref(false);
const results = ref<Array<{ word: string; userAnswer: string; correct: boolean }>>([]);
const sessionComplete = ref(false);
const playbackSpeed = ref<1 | 0.75 | 0.5>(1);
const showHint = ref(false);

// Mock dictation words
const words = [
  { word: 'Serendipity', phonetic: '/ˌserənˈdɪpəti/', meaning: '意外发现珍奇事物的运气', difficulty: 'hard' as const },
  { word: 'Ephemeral', phonetic: '/ɪˈfemərəl/', meaning: '短暂的', difficulty: 'hard' as const },
  { word: 'Resilient', phonetic: '/rɪˈzɪliənt/', meaning: '有弹性的；能复原的', difficulty: 'medium' as const },
  { word: 'Eloquent', phonetic: '/ˈeləkwənt/', meaning: '雄辩的', difficulty: 'medium' as const },
  { word: 'Pragmatic', phonetic: '/præɡˈmætɪk/', meaning: '务实的', difficulty: 'medium' as const },
  { word: 'Ambiguous', phonetic: '/æmˈbɪɡjuəs/', meaning: '模棱两可的', difficulty: 'hard' as const },
  { word: 'Diligent', phonetic: '/ˈdɪlɪdʒənt/', meaning: '勤奋的', difficulty: 'easy' as const },
  { word: 'Enthusiastic', phonetic: '/ɪnˌθuːziˈæstɪk/', meaning: '热情的', difficulty: 'easy' as const },
  { word: 'Meticulous', phonetic: '/məˈtɪkjələs/', meaning: '一丝不苟的', difficulty: 'hard' as const },
  { word: 'Versatile', phonetic: '/ˈvɜːrsətl/', meaning: '多才多艺的', difficulty: 'medium' as const },
];

const currentWord = computed(() => words[currentWordIndex.value]);

const correctCount = computed(() => results.value.filter(r => r.correct).length);
const accuracy = computed(() => results.value.length > 0 ? Math.round((correctCount.value / results.value.length) * 100) : 0);

const handlePlay = () => {
  isPlaying.value = true;
  // Simulate audio playback
  setTimeout(() => isPlaying.value = false, 2000 / playbackSpeed.value);
};

const handleSubmit = () => {
  const correct = userInput.value.toLowerCase().trim() === currentWord.value.word.toLowerCase();
  const newResult = {
    word: currentWord.value.word,
    userAnswer: userInput.value,
    correct,
  };
  results.value.push(newResult);
  showResult.value = true;

  setTimeout(() => {
    if (currentWordIndex.value < words.length - 1) {
      currentWordIndex.value++;
      userInput.value = '';
      showResult.value = false;
      showHint.value = false;
    } else {
      sessionComplete.value = true;
    }
  }, 1500);
};

const handleEnter = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !showResult.value && userInput.value.trim()) {
    handleSubmit();
  }
};

const handleSkip = () => {
  const newResult = {
    word: currentWord.value.word,
    userAnswer: userInput.value,
    correct: false,
  };
  results.value.push(newResult);

  if (currentWordIndex.value < words.length - 1) {
    currentWordIndex.value++;
    userInput.value = '';
    showHint.value = false;
  } else {
    sessionComplete.value = true;
  }
};

const handleRestart = () => {
  currentWordIndex.value = 0;
  userInput.value = '';
  results.value = [];
  showResult.value = false;
  sessionComplete.value = false;
  showHint.value = false;
};
</script>
