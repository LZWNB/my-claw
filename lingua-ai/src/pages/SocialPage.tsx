import { useTranslation } from 'react-i18next';
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
} from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '../stores/appStore';

// Friend Card Component
function FriendCard({ name, avatar, level, xp, streak, isOnline, lastActive }: {
  name: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  isOnline: boolean;
  lastActive?: string;
}) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 border border-border-light dark:border-border-dark hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold">
            {avatar}
          </div>
          <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-surface-light dark:border-surface-dark ${
            isOnline ? 'bg-green-500' : 'bg-gray-400'
          }`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-text-main dark:text-text-main-dark truncate">{name}</h4>
          <div className="flex items-center gap-2 text-xs text-text-secondary dark:text-text-secondary-dark">
            <span>Lv.{level}</span>
            <span>·</span>
            <span>{xp.toLocaleString()} XP</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-1 text-orange-500">
          <Flame className="w-4 h-4" />
          <span className="text-sm font-medium">{streak} 天</span>
        </div>
        {!isOnline && lastActive && (
          <span className="text-xs text-text-secondary dark:text-text-secondary-dark">{lastActive}</span>
        )}
      </div>

      <div className="flex gap-2 mt-4">
        <button className="flex-1 py-2 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors flex items-center justify-center gap-1">
          <MessageCircle className="w-4 h-4" />
          发消息
        </button>
        <button className="px-3 py-2 rounded-xl border border-border-light dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-card-dark transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Post Card Component
function PostCard({ author, avatar, content, image, likes, comments, time, liked }: {
  author: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  time: string;
  liked?: boolean;
}) {
  const [isLiked, setIsLiked] = useState(liked);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold">
            {avatar}
          </div>
          <div>
            <h4 className="font-semibold text-text-main dark:text-text-main-dark">{author}</h4>
            <span className="text-xs text-text-secondary dark:text-text-secondary-dark">{time}</span>
          </div>
        </div>
        <button className="p-2 rounded-xl hover:bg-background-light dark:hover:bg-card-dark transition-colors">
          <MoreHorizontal className="w-5 h-5 text-text-secondary dark:text-text-secondary-dark" />
        </button>
      </div>

      <p className="text-text-main dark:text-text-main-dark mb-4">{content}</p>

      {image && (
        <div className="rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-primary/20 to-purple-500/20 aspect-video flex items-center justify-center">
          <span className="text-text-secondary dark:text-text-secondary-dark">学习打卡图片</span>
        </div>
      )}

      <div className="flex items-center gap-6">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 text-sm transition-colors ${
            isLiked ? 'text-red-500' : 'text-text-secondary dark:text-text-secondary-dark hover:text-red-500'
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          <span>{likeCount}</span>
        </button>
        <button className="flex items-center gap-2 text-sm text-text-secondary dark:text-text-secondary-dark hover:text-primary transition-colors">
          <MessageSquare className="w-5 h-5" />
          <span>{comments}</span>
        </button>
        <button className="flex items-center gap-2 text-sm text-text-secondary dark:text-text-secondary-dark hover:text-primary transition-colors">
          <Share2 className="w-5 h-5" />
          <span>分享</span>
        </button>
      </div>
    </div>
  );
}

// Leaderboard Row Component
function LeaderboardRow({ rank, name, avatar, xp, streak, isCurrentUser }: {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  streak: number;
  isCurrentUser?: boolean;
}) {
  const getRankIcon = () => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="w-5 text-center font-bold text-text-secondary dark:text-text-secondary-dark">{rank}</span>;
  };

  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl ${
      isCurrentUser
        ? 'bg-primary/5 dark:bg-primary/10 border border-primary/20'
        : 'hover:bg-background-light dark:hover:bg-card-dark'
    } transition-colors`}>
      <div className="w-8 flex justify-center">{getRankIcon()}</div>
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-sm">
        {avatar}
      </div>
      <div className="flex-1">
        <p className="font-medium text-text-main dark:text-text-main-dark">{name}</p>
        <p className="text-xs text-text-secondary dark:text-text-secondary-dark">{xp.toLocaleString()} XP</p>
      </div>
      <div className="flex items-center gap-1 text-orange-500">
        <Flame className="w-4 h-4" />
        <span className="text-sm font-medium">{streak}</span>
      </div>
    </div>
  );
}

export function SocialPage() {
  const { user, stats } = useAppStore();
  const [activeTab, setActiveTab] = useState<'friends' | 'feed' | 'leaderboard'>('friends');
  const [searchQuery, setSearchQuery] = useState('');

  const friends = [
    { name: 'Sarah Chen', avatar: 'S', level: 15, xp: 2890, streak: 45, isOnline: true },
    { name: 'Mike Ross', avatar: 'M', level: 12, xp: 2450, streak: 12, isOnline: true },
    { name: 'Kenji Sato', avatar: 'K', level: 10, xp: 1920, streak: 3, isOnline: false, lastActive: '2小时前' },
    { name: 'Emma Wilson', avatar: 'E', level: 9, xp: 1850, streak: 8, isOnline: false, lastActive: '5小时前' },
    { name: 'David Kim', avatar: 'D', level: 8, xp: 1680, streak: 15, isOnline: true },
    { name: 'Lisa Wang', avatar: 'L', level: 7, xp: 1520, streak: 6, isOnline: false, lastActive: '1天前' },
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

  const globalLeaderboard = [
    { name: 'Alex Johnson', avatar: 'A', xp: 15200, streak: 156 },
    { name: 'Maria Garcia', avatar: 'M', xp: 14800, streak: 142 },
    { name: 'James Wilson', avatar: 'J', xp: 13500, streak: 98 },
    { name: 'Sophie Chen', avatar: 'S', xp: 12200, streak: 87 },
    { name: 'Tom Brown', avatar: 'T', xp: 11800, streak: 76 },
    { name: 'Sarah Chen', avatar: 'S', xp: 2890, streak: 45 },
    { name: 'Mike Ross', avatar: 'M', xp: 2450, streak: 12 },
    { name: user?.name || 'You', avatar: (user?.name?.[0] || 'Y'), xp: stats.totalXP, streak: stats.streakDays, isCurrentUser: true },
  ];

  const filteredFriends = friends.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold">
                {user?.name?.[0] || 'U'}
              </div>
              <h1 className="text-xl font-bold text-text-main dark:text-text-main-dark">社交中心</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl hover:bg-background-light dark:hover:bg-card-dark transition-colors relative">
                <MessageCircle className="w-5 h-5 text-text-secondary dark:text-text-secondary-dark" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                添加好友
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'friends', label: '好友', icon: Users },
            { id: 'feed', label: '动态', icon: MessageSquare },
            { id: 'leaderboard', label: '排行榜', icon: Trophy },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-surface-light dark:bg-surface-dark text-text-secondary dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-card-dark'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'friends' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Search */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 border border-border-light dark:border-border-dark mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary dark:text-text-secondary-dark" />
                  <input
                    type="text"
                    placeholder="搜索好友..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-background-light dark:bg-card-dark border border-border-light dark:border-border-dark text-text-main dark:text-text-main-dark placeholder-text-secondary dark:placeholder-text-secondary-dark focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Friends Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {filteredFriends.map((friend) => (
                  <FriendCard key={friend.name} {...friend} />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* My Stats */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
                <h3 className="font-bold text-text-main dark:text-text-main-dark mb-4">我的社交数据</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary dark:text-text-secondary-dark">好友数量</span>
                    <span className="font-semibold text-text-main dark:text-text-main-dark">{friends.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary dark:text-text-secondary-dark">全球排名</span>
                    <span className="font-semibold text-text-main dark:text-text-main-dark">#420</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary dark:text-text-secondary-dark">获得点赞</span>
                    <span className="font-semibold text-text-main dark:text-text-main-dark">1,234</span>
                  </div>
                </div>
              </div>

              {/* Suggested Friends */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
                <h3 className="font-bold text-text-main dark:text-text-main-dark mb-4">推荐好友</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Anna Lee', avatar: 'A', level: 11 },
                    { name: 'Chris Park', avatar: 'C', level: 9 },
                    { name: 'Yuki Tanaka', avatar: 'Y', level: 8 },
                  ].map((person) => (
                    <div key={person.name} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-sm">
                        {person.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-text-main dark:text-text-main-dark text-sm">{person.name}</p>
                        <p className="text-xs text-text-secondary dark:text-text-secondary-dark">Lv.{person.level}</p>
                      </div>
                      <button className="p-2 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors">
                        <UserPlus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'feed' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Create Post */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold flex-shrink-0">
                    {user?.name?.[0] || 'U'}
                  </div>
                  <div className="flex-1">
                    <textarea
                      placeholder="分享你的学习心得..."
                      className="w-full p-3 rounded-xl bg-background-light dark:bg-card-dark border border-border-light dark:border-border-dark text-text-main dark:text-text-main-dark placeholder-text-secondary dark:placeholder-text-secondary-dark resize-none focus:outline-none focus:border-primary"
                      rows={3}
                    />
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex gap-2">
                        <button className="p-2 rounded-xl hover:bg-background-light dark:hover:bg-card-dark transition-colors text-text-secondary dark:text-text-secondary-dark">
                          📷 图片
                        </button>
                        <button className="p-2 rounded-xl hover:bg-background-light dark:hover:bg-card-dark transition-colors text-text-secondary dark:text-text-secondary-dark">
                          🏷️ 标签
                        </button>
                      </div>
                      <button className="px-6 py-2 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors">
                        发布
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Posts */}
              <div className="space-y-6">
                {posts.map((post, index) => (
                  <PostCard key={index} {...post} />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
                <h3 className="font-bold text-text-main dark:text-text-main-dark mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  热门话题
                </h3>
                <div className="space-y-3">
                  {[
                    { tag: '#每日打卡', count: '12.5k' },
                    { tag: '#英语角', count: '8.2k' },
                    { tag: '#学习方法', count: '6.8k' },
                    { tag: '#AI对话', count: '5.4k' },
                    { tag: '#词汇记忆', count: '4.1k' },
                  ].map((topic) => (
                    <div key={topic.tag} className="flex items-center justify-between">
                      <span className="text-primary hover:underline cursor-pointer">{topic.tag}</span>
                      <span className="text-xs text-text-secondary dark:text-text-secondary-dark">{topic.count} 帖子</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Users */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
                <h3 className="font-bold text-text-main dark:text-text-main-dark mb-4">在线好友</h3>
                <div className="flex -space-x-2">
                  {friends.filter(f => f.isOnline).map((friend) => (
                    <div
                      key={friend.name}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-sm border-2 border-surface-light dark:border-surface-dark"
                      title={friend.name}
                    >
                      {friend.avatar}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-background-light dark:bg-card-dark flex items-center justify-center text-text-secondary dark:text-text-secondary-dark text-xs border-2 border-surface-light dark:border-surface-dark">
                    +3
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-text-main dark:text-text-main-dark flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    全球排行榜
                  </h2>
                  <button className="p-2 rounded-xl hover:bg-background-light dark:hover:bg-card-dark transition-colors">
                    <Filter className="w-5 h-5 text-text-secondary dark:text-text-secondary-dark" />
                  </button>
                </div>

                <div className="space-y-2">
                  {globalLeaderboard.map((user, index) => (
                    <LeaderboardRow
                      key={user.name}
                      rank={index + 1}
                      {...user}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Top Performers */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
                <h3 className="font-bold text-text-main dark:text-text-main-dark mb-4">本周之星</h3>
                <div className="space-y-4">
                  {globalLeaderboard.slice(0, 3).map((user, index) => (
                    <div key={user.name} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                        index === 0 ? 'bg-yellow-100 text-yellow-600' :
                        index === 1 ? 'bg-gray-100 text-gray-600' :
                        'bg-amber-100 text-amber-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-sm">
                        {user.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-text-main dark:text-text-main-dark text-sm">{user.name}</p>
                        <p className="text-xs text-text-secondary dark:text-text-secondary-dark">{user.xp.toLocaleString()} XP</p>
                      </div>
                      <Star className={`w-5 h-5 ${
                        index === 0 ? 'text-yellow-500 fill-current' :
                        index === 1 ? 'text-gray-400' :
                        'text-amber-600'
                      }`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Your Progress */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
                <h3 className="font-bold text-text-main dark:text-text-main-dark mb-4">你的进度</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text-secondary dark:text-text-secondary-dark">距离前一名</span>
                      <span className="font-medium text-text-main dark:text-text-main-dark">560 XP</span>
                    </div>
                    <div className="h-2 bg-background-light dark:bg-card-dark rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-primary rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-background-light dark:bg-card-dark">
                    <span className="text-text-secondary dark:text-text-secondary-dark">本周排名变化</span>
                    <span className="text-green-500 font-medium flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      +12
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
