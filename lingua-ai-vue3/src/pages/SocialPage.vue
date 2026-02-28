<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark">
    <!-- Header -->
    <header class="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold">
              {{ user?.name?.[0] || 'U' }}
            </div>
            <h1 class="text-xl font-bold text-text-main dark:text-text-main-dark">社交中心</h1>
          </div>
          <div class="flex items-center gap-2">
            <button class="p-2 rounded-xl hover:bg-background-light dark:hover:bg-card-dark transition-colors relative">
              <MessageCircle class="w-5 h-5 text-text-secondary dark:text-text-secondary-dark" />
              <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button class="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors flex items-center gap-2">
              <UserPlus class="w-4 h-4" />
              添加好友
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

      <!-- Friends Tab -->
      <div v-if="activeTab === 'friends'" class="grid lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <!-- Search -->
          <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 border border-border-light dark:border-border-dark mb-6">
            <div class="relative">
              <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary dark:text-text-secondary-dark" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索好友..."
                class="w-full pl-12 pr-4 py-3 rounded-xl bg-background-light dark:bg-card-dark border border-border-light dark:border-border-dark text-text-main dark:text-text-main-dark placeholder-text-secondary dark:placeholder-text-secondary-dark focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <!-- Friends Grid -->
          <div class="grid sm:grid-cols-2 gap-4">
            <!-- FriendCard inline -->
            <div
              v-for="friend in filteredFriends"
              :key="friend.name"
              class="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 border border-border-light dark:border-border-dark hover:shadow-lg transition-all duration-300"
            >
              <div class="flex items-center gap-3">
                <div class="relative">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold">
                    {{ friend.avatar }}
                  </div>
                  <div
                    :class="[
                      'absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-surface-light dark:border-surface-dark',
                      friend.isOnline ? 'bg-green-500' : 'bg-gray-400'
                    ]"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="font-semibold text-text-main dark:text-text-main-dark truncate">{{ friend.name }}</h4>
                  <div class="flex items-center gap-2 text-xs text-text-secondary dark:text-text-secondary-dark">
                    <span>Lv.{{ friend.level }}</span>
                    <span>·</span>
                    <span>{{ friend.xp.toLocaleString() }} XP</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-between mt-4">
                <div class="flex items-center gap-1 text-orange-500">
                  <Flame class="w-4 h-4" />
                  <span class="text-sm font-medium">{{ friend.streak }} 天</span>
                </div>
                <span v-if="!friend.isOnline && friend.lastActive" class="text-xs text-text-secondary dark:text-text-secondary-dark">{{ friend.lastActive }}</span>
              </div>

              <div class="flex gap-2 mt-4">
                <button class="flex-1 py-2 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors flex items-center justify-center gap-1">
                  <MessageCircle class="w-4 h-4" />
                  发消息
                </button>
                <button class="px-3 py-2 rounded-xl border border-border-light dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-card-dark transition-colors">
                  <MoreHorizontal class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- My Stats -->
          <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
            <h3 class="font-bold text-text-main dark:text-text-main-dark mb-4">我的社交数据</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-text-secondary dark:text-text-secondary-dark">好友数量</span>
                <span class="font-semibold text-text-main dark:text-text-main-dark">{{ friends.length }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-text-secondary dark:text-text-secondary-dark">全球排名</span>
                <span class="font-semibold text-text-main dark:text-text-main-dark">#420</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-text-secondary dark:text-text-secondary-dark">获得点赞</span>
                <span class="font-semibold text-text-main dark:text-text-main-dark">1,234</span>
              </div>
            </div>
          </div>

          <!-- Suggested Friends -->
          <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
            <h3 class="font-bold text-text-main dark:text-text-main-dark mb-4">推荐好友</h3>
            <div class="space-y-3">
              <div
                v-for="person in suggestedFriends"
                :key="person.name"
                class="flex items-center gap-3"
              >
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-sm">
                  {{ person.avatar }}
                </div>
                <div class="flex-1">
                  <p class="font-medium text-text-main dark:text-text-main-dark text-sm">{{ person.name }}</p>
                  <p class="text-xs text-text-secondary dark:text-text-secondary-dark">Lv.{{ person.level }}</p>
                </div>
                <button class="p-2 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors">
                  <UserPlus class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Feed Tab -->
      <div v-if="activeTab === 'feed'" class="grid lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <!-- Create Post -->
          <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
            <div class="flex gap-4">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold flex-shrink-0">
                {{ user?.name?.[0] || 'U' }}
              </div>
              <div class="flex-1">
                <textarea
                  placeholder="分享你的学习心得..."
                  class="w-full p-3 rounded-xl bg-background-light dark:bg-card-dark border border-border-light dark:border-border-dark text-text-main dark:text-text-main-dark placeholder-text-secondary dark:placeholder-text-secondary-dark resize-none focus:outline-none focus:border-primary"
                  rows="3"
                />
                <div class="flex items-center justify-between mt-3">
                  <div class="flex gap-2">
                    <button class="p-2 rounded-xl hover:bg-background-light dark:hover:bg-card-dark transition-colors text-text-secondary dark:text-text-secondary-dark">
                      📷 图片
                    </button>
                    <button class="p-2 rounded-xl hover:bg-background-light dark:hover:bg-card-dark transition-colors text-text-secondary dark:text-text-secondary-dark">
                      🏷️ 标签
                    </button>
                  </div>
                  <button class="px-6 py-2 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors">
                    发布
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Posts -->
          <div class="space-y-6">
            <!-- PostCard inline -->
            <div
              v-for="(post, index) in posts"
              :key="index"
              class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark"
            >
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold">
                    {{ post.avatar }}
                  </div>
                  <div>
                    <h4 class="font-semibold text-text-main dark:text-text-main-dark">{{ post.author }}</h4>
                    <span class="text-xs text-text-secondary dark:text-text-secondary-dark">{{ post.time }}</span>
                  </div>
                </div>
                <button class="p-2 rounded-xl hover:bg-background-light dark:hover:bg-card-dark transition-colors">
                  <MoreHorizontal class="w-5 h-5 text-text-secondary dark:text-text-secondary-dark" />
                </button>
              </div>

              <p class="text-text-main dark:text-text-main-dark mb-4">{{ post.content }}</p>

              <div v-if="post.image" class="rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-primary/20 to-purple-500/20 aspect-video flex items-center justify-center">
                <span class="text-text-secondary dark:text-text-secondary-dark">学习打卡图片</span>
              </div>

              <div class="flex items-center gap-6">
                <button
                  @click="toggleLike(index)"
                  :class="[
                    'flex items-center gap-2 text-sm transition-colors',
                    postLiked[index] ? 'text-red-500' : 'text-text-secondary dark:text-text-secondary-dark hover:text-red-500'
                  ]"
                >
                  <Heart :class="['w-5 h-5', postLiked[index] ? 'fill-current' : '']" />
                  <span>{{ postLikes[index] }}</span>
                </button>
                <button class="flex items-center gap-2 text-sm text-text-secondary dark:text-text-secondary-dark hover:text-primary transition-colors">
                  <MessageSquare class="w-5 h-5" />
                  <span>{{ post.comments }}</span>
                </button>
                <button class="flex items-center gap-2 text-sm text-text-secondary dark:text-text-secondary-dark hover:text-primary transition-colors">
                  <Share2 class="w-5 h-5" />
                  <span>分享</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Trending -->
          <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
            <h3 class="font-bold text-text-main dark:text-text-main-dark mb-4 flex items-center gap-2">
              <TrendingUp class="w-5 h-5 text-primary" />
              热门话题
            </h3>
            <div class="space-y-3">
              <div
                v-for="topic in trendingTopics"
                :key="topic.tag"
                class="flex items-center justify-between"
              >
                <span class="text-primary hover:underline cursor-pointer">{{ topic.tag }}</span>
                <span class="text-xs text-text-secondary dark:text-text-secondary-dark">{{ topic.count }} 帖子</span>
              </div>
            </div>
          </div>

          <!-- Active Users -->
          <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
            <h3 class="font-bold text-text-main dark:text-text-main-dark mb-4">在线好友</h3>
            <div class="flex -space-x-2">
              <div
                v-for="friend in onlineFriends"
                :key="friend.name"
                class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-sm border-2 border-surface-light dark:border-surface-dark"
                :title="friend.name"
              >
                {{ friend.avatar }}
              </div>
              <div class="w-10 h-10 rounded-full bg-background-light dark:bg-card-dark flex items-center justify-center text-text-secondary dark:text-text-secondary-dark text-xs border-2 border-surface-light dark:border-surface-dark">
                +3
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Leaderboard Tab -->
      <div v-if="activeTab === 'leaderboard'" class="grid lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-text-main dark:text-text-main-dark flex items-center gap-2">
                <Trophy class="w-6 h-6 text-yellow-500" />
                全球排行榜
              </h2>
              <button class="p-2 rounded-xl hover:bg-background-light dark:hover:bg-card-dark transition-colors">
                <Filter class="w-5 h-5 text-text-secondary dark:text-text-secondary-dark" />
              </button>
            </div>

            <div class="space-y-2">
              <!-- LeaderboardRow inline -->
              <div
                v-for="(userItem, index) in globalLeaderboard"
                :key="userItem.name"
                :class="[
                  'flex items-center gap-4 p-4 rounded-xl transition-colors',
                  userItem.isCurrentUser
                    ? 'bg-primary/5 dark:bg-primary/10 border border-primary/20'
                    : 'hover:bg-background-light dark:hover:bg-card-dark'
                ]"
              >
                <div class="w-8 flex justify-center">
                  <Crown v-if="index + 1 === 1" class="w-5 h-5 text-yellow-500" />
                  <Medal v-else-if="index + 1 === 2" class="w-5 h-5 text-gray-400" />
                  <Medal v-else-if="index + 1 === 3" class="w-5 h-5 text-amber-600" />
                  <span v-else class="w-5 text-center font-bold text-text-secondary dark:text-text-secondary-dark">{{ index + 1 }}</span>
                </div>
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-sm">
                  {{ userItem.avatar }}
                </div>
                <div class="flex-1">
                  <p class="font-medium text-text-main dark:text-text-main-dark">{{ userItem.name }}</p>
                  <p class="text-xs text-text-secondary dark:text-text-secondary-dark">{{ userItem.xp.toLocaleString() }} XP</p>
                </div>
                <div class="flex items-center gap-1 text-orange-500">
                  <Flame class="w-4 h-4" />
                  <span class="text-sm font-medium">{{ userItem.streak }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Top Performers -->
          <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
            <h3 class="font-bold text-text-main dark:text-text-main-dark mb-4">本周之星</h3>
            <div class="space-y-4">
              <div
                v-for="(userItem, index) in globalLeaderboard.slice(0, 3)"
                :key="userItem.name"
                class="flex items-center gap-3"
              >
                <div
                  :class="[
                    'w-8 h-8 rounded-lg flex items-center justify-center font-bold',
                    index === 0 ? 'bg-yellow-100 text-yellow-600' :
                    index === 1 ? 'bg-gray-100 text-gray-600' :
                    'bg-amber-100 text-amber-600'
                  ]"
                >
                  {{ index + 1 }}
                </div>
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-sm">
                  {{ userItem.avatar }}
                </div>
                <div class="flex-1">
                  <p class="font-medium text-text-main dark:text-text-main-dark text-sm">{{ userItem.name }}</p>
                  <p class="text-xs text-text-secondary dark:text-text-secondary-dark">{{ userItem.xp.toLocaleString() }} XP</p>
                </div>
                <Star
                  :class="[
                    'w-5 h-5',
                    index === 0 ? 'text-yellow-500 fill-current' :
                    index === 1 ? 'text-gray-400' :
                    'text-amber-600'
                  ]"
                />
              </div>
            </div>
          </div>

          <!-- Your Progress -->
          <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
            <h3 class="font-bold text-text-main dark:text-text-main-dark mb-4">你的进度</h3>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-text-secondary dark:text-text-secondary-dark">距离前一名</span>
                  <span class="font-medium text-text-main dark:text-text-main-dark">560 XP</span>
                </div>
                <div class="h-2 bg-background-light dark:bg-card-dark rounded-full overflow-hidden">
                  <div class="w-3/4 h-full bg-primary rounded-full" />
                </div>
              </div>
              <div class="flex items-center justify-between p-3 rounded-xl bg-background-light dark:bg-card-dark">
                <span class="text-text-secondary dark:text-text-secondary-dark">本周排名变化</span>
                <span class="text-green-500 font-medium flex items-center gap-1">
                  <TrendingUp class="w-4 h-4" />
                  +12
                </span>
              </div>
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
  Users,
  Search,
  MessageCircle,
  UserPlus,
  Trophy,
  Flame,
  TrendingUp,
  MoreHorizontal,
  Heart,
  Share2,
  MessageSquare,
  Filter,
  Medal,
  Crown,
  Star,
} from 'lucide-vue-next';
import { useAppStore } from '../stores/appStore';

const store = useAppStore();
const activeTab = ref<'friends' | 'feed' | 'leaderboard'>('friends');
const searchQuery = ref('');

const tabs = [
  { id: 'friends' as const, label: '好友', icon: Users },
  { id: 'feed' as const, label: '动态', icon: MessageSquare },
  { id: 'leaderboard' as const, label: '排行榜', icon: Trophy },
];

const friends = [
  { name: 'Sarah Chen', avatar: 'S', level: 15, xp: 2890, streak: 45, isOnline: true },
  { name: 'Mike Ross', avatar: 'M', level: 12, xp: 2450, streak: 12, isOnline: true },
  { name: 'Kenji Sato', avatar: 'K', level: 10, xp: 1920, streak: 3, isOnline: false, lastActive: '2小时前' },
  { name: 'Emma Wilson', avatar: 'E', level: 9, xp: 1850, streak: 8, isOnline: false, lastActive: '5小时前' },
  { name: 'David Kim', avatar: 'D', level: 8, xp: 1680, streak: 15, isOnline: true },
  { name: 'Lisa Wang', avatar: 'L', level: 7, xp: 1520, streak: 6, isOnline: false, lastActive: '1天前' },
];

const suggestedFriends = [
  { name: 'Anna Lee', avatar: 'A', level: 11 },
  { name: 'Chris Park', avatar: 'C', level: 9 },
  { name: 'Yuki Tanaka', avatar: 'Y', level: 8 },
];

const posts = [
  {
    author: 'Sarah Chen',
    avatar: 'S',
    content: '今天完成了30个单词的学习！坚持就是胜利 💪 #英语学习 #每日打卡',
    likes: 24,
    comments: 5,
    time: '2小时前',
    liked: true,
  },
  {
    author: 'Mike Ross',
    avatar: 'M',
    content: '终于突破了连续学习30天的里程碑！感谢LinguaAI的陪伴 🎉',
    image: 'milestone',
    likes: 56,
    comments: 12,
    time: '5小时前',
  },
  {
    author: 'Kenji Sato',
    avatar: 'K',
    content: '今天的AI对话练习很有帮助，纠正了我很多发音问题。推荐给所有正在学习的朋友！',
    likes: 18,
    comments: 3,
    time: '昨天',
  },
];

const trendingTopics = [
  { tag: '#每日打卡', count: '12.5k' },
  { tag: '#英语角', count: '8.2k' },
  { tag: '#学习方法', count: '6.8k' },
  { tag: '#AI对话', count: '5.4k' },
  { tag: '#词汇记忆', count: '4.1k' },
];

const user = computed(() => store.user);
const stats = computed(() => store.stats);

const globalLeaderboard = [
  { name: 'Alex Johnson', avatar: 'A', xp: 15200, streak: 156 },
  { name: 'Maria Garcia', avatar: 'M', xp: 14800, streak: 142 },
  { name: 'James Wilson', avatar: 'J', xp: 13500, streak: 98 },
  { name: 'Sophie Chen', avatar: 'S', xp: 12200, streak: 87 },
  { name: 'Tom Brown', avatar: 'T', xp: 11800, streak: 76 },
  { name: 'Sarah Chen', avatar: 'S', xp: 2890, streak: 45 },
  { name: 'Mike Ross', avatar: 'M', xp: 2450, streak: 12 },
  { name: user.value?.name || 'You', avatar: (user.value?.name?.[0] || 'Y'), xp: stats.value.totalXP, streak: stats.value.streakDays, isCurrentUser: true },
];

const filteredFriends = computed(() =>
  friends.filter(f => f.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
);

const onlineFriends = computed(() => friends.filter(f => f.isOnline));

// Post like state
const postLiked = ref(posts.map(p => p.liked));
const postLikes = ref(posts.map(p => p.likes));

const toggleLike = (index: number) => {
  if (postLiked.value[index]) {
    postLikes.value[index]--;
  } else {
    postLikes.value[index]++;
  }
  postLiked.value[index] = !postLiked.value[index];
};
</script>
