import { useTranslation } from 'react-i18next';
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
} from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import { useState } from 'react';

// SVG Line Chart Component
function ProgressChart({ data, color = '#137fec' }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 100;
  const height = 60;
  const padding = 5;

  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((value - min) / range) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `${padding},${height} ${points} ${width - padding},${height}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={areaPoints}
        fill={`url(#gradient-${color.replace('#', '')})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {data.map((value, index) => {
        const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
        const y = height - padding - ((value - min) / range) * (height - 2 * padding);
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="2"
            fill={color}
          />
        );
      })}
    </svg>
  );
}

// Calendar Component
function Calendar({ checkInDates }: { checkInDates: number[] }) {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date().getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const monthNames = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
  ];

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 border border-border-light dark:border-border-dark">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-1.5 rounded-lg hover:bg-background-light dark:hover:bg-card-dark transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-text-secondary dark:text-text-secondary-dark" />
        </button>
        <span className="font-semibold text-text-main dark:text-text-main-dark">
          {currentYear}年{monthNames[currentMonth]}
        </span>
        <button
          onClick={nextMonth}
          className="p-1.5 rounded-lg hover:bg-background-light dark:hover:bg-card-dark transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-text-secondary dark:text-text-secondary-dark" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {weekDays.map((d) => (
          <div key={d} className="text-text-secondary dark:text-text-secondary-dark py-2 text-xs font-medium">
            {d}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} className="py-2" />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const isToday = day === today && currentMonth === new Date().getMonth();
          const isCheckIn = checkInDates.includes(day);
          return (
            <div
              key={day}
              className={`
                py-2 rounded-lg cursor-pointer text-sm font-medium transition-all
                ${isToday
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : isCheckIn
                  ? 'bg-primary/10 dark:bg-primary/20 text-primary'
                  : 'text-text-main dark:text-text-main-dark hover:bg-background-light dark:hover:bg-card-dark'
                }
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center gap-4 text-xs text-text-secondary dark:text-text-secondary-dark">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span>今日</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-primary/20" />
          <span>已打卡</span>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  subtext: string;
  color: string;
}) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 border border-border-light dark:border-border-dark hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <span className="text-sm text-text-secondary dark:text-text-secondary-dark">{label}</span>
      </div>
      <div className="text-2xl font-bold text-text-main dark:text-text-main-dark">{value}</div>
      <div className="text-xs mt-1" style={{ color }}>{subtext}</div>
    </div>
  );
}

// Leaderboard Item Component
function LeaderboardItem({
  rank,
  name,
  avatar,
  xp,
  streak,
  isCurrentUser = false,
}: {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  streak: number;
  isCurrentUser?: boolean;
}) {
  const rankColors = ['#eab308', '#94a3b8', '#cd7f32'];
  const rankBg = rank <= 3 ? rankColors[rank - 1] : 'transparent';

  return (
    <div
      className={`
        flex items-center gap-3 p-3 rounded-xl transition-all duration-200
        ${isCurrentUser
          ? 'bg-primary/5 dark:bg-primary/10 border border-primary/20'
          : 'hover:bg-background-light dark:hover:bg-card-dark'
        }
      `}
    >
      <div
        className={`
          w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold
          ${rank <= 3 ? 'text-white' : 'text-text-secondary dark:text-text-secondary-dark'}
        `}
        style={{ backgroundColor: rankBg }}
      >
        {rank}
      </div>
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-medium text-sm">
        {avatar}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-text-main dark:text-text-main-dark truncate">{name}</p>
        <p className="text-xs text-text-secondary dark:text-text-secondary-dark">{xp.toLocaleString()} XP</p>
      </div>
      <div className="flex items-center gap-1 text-orange-500">
        <Flame className="w-4 h-4" />
        <span className="text-sm font-medium">{streak}</span>
      </div>
    </div>
  );
}

// Flashcard Component
function Flashcard({ word, phonetic, definition, onFlip }: { word: string; phonetic: string; definition: string; onFlip: () => void }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative h-40 cursor-pointer perspective-1000"
      onClick={() => {
        setFlipped(!flipped);
        onFlip();
      }}
    >
      <div
        className={`
          absolute inset-0 rounded-xl p-6 transition-all duration-500 transform-style-preserve-3d
          ${flipped ? 'rotate-y-180' : ''}
        `}
      >
        {/* Front */}
        <div
          className={`
            absolute inset-0 backface-hidden rounded-xl p-6 flex flex-col items-center justify-center
            bg-gradient-to-br from-primary to-primary-dark text-white
            ${flipped ? 'opacity-0' : 'opacity-100'}
          `}
        >
          <p className="text-xs opacity-70 mb-1">形容词</p>
          <h3 className="text-2xl font-bold mb-1">{word}</h3>
          <p className="text-sm opacity-80">{phonetic}</p>
          <p className="text-xs opacity-60 mt-4">点击翻转</p>
        </div>

        {/* Back */}
        <div
          className={`
            absolute inset-0 backface-hidden rounded-xl p-6 flex flex-col items-center justify-center rotate-y-180
            bg-surface-light dark:bg-card-dark border border-border-light dark:border-border-dark
            ${flipped ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <p className="text-sm text-text-secondary dark:text-text-secondary-dark text-center">{definition}</p>
          <p className="text-xs text-primary mt-4">点击翻转</p>
        </div>
      </div>
    </div>
  );
}

export function DashboardPage() {
  const { t } = useTranslation();
  const { user, stats } = useAppStore();

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
  const weeklyData = stats.weeklyProgress.map(d => d.xp);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">
                {user?.name?.[0] || 'U'}
              </div>
              <div>
                <h1 className="text-xl font-bold text-text-main dark:text-text-main-dark">
                  {t('dashboard.welcome', { name: user?.name || 'User' })}
                </h1>
                <div className="flex items-center gap-2 text-sm text-text-secondary dark:text-text-secondary-dark">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span>{t('dashboard.streak', { days: stats.streakDays })}</span>
                </div>
              </div>
            </div>
            <a
              href="#/chat"
              className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-all duration-200 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
            >
              {t('dashboard.continue')}
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                icon={BookOpen}
                label={t('dashboard.stats.vocabulary')}
                value={stats.totalWords.toLocaleString()}
                subtext="本周 +15%"
                color="#137fec"
              />
              <StatCard
                icon={Target}
                label={t('dashboard.stats.dailyGoal')}
                value="85%"
                subtext="即将完成"
                color="#8b5cf6"
              />
              <StatCard
                icon={Flame}
                label={t('dashboard.stats.streak')}
                value={`${stats.streakDays}天`}
                subtext="个人最佳: 24"
                color="#f97316"
              />
              <StatCard
                icon={Trophy}
                label={t('dashboard.stats.globalRank')}
                value="#420"
                subtext="前 5%"
                color="#ec4899"
              />
            </div>

            {/* Progress Prediction Chart */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-text-main dark:text-text-main-dark flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    {t('dashboard.progress.title')}
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
                    {t('dashboard.progress.subtitle')}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-text-main dark:text-text-main-dark">3,850</span>
                      <span className="text-sm text-text-secondary dark:text-text-secondary-dark">{t('dashboard.progress.words')}</span>
                    </div>
                    <span className="text-xs text-green-500 font-medium">{t('dashboard.progress.growth')} +22%</span>
                  </div>
                </div>
              </div>

              {/* SVG Chart */}
              <div className="h-48 mb-4">
                <ProgressChart data={predictionData} color="#137fec" />
              </div>

              {/* Legend */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-text-secondary dark:text-text-secondary-dark">实际进度</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary/40" />
                  <span className="text-text-secondary dark:text-text-secondary-dark">AI 预测</span>
                </div>
              </div>
            </div>

            {/* Daily Tasks */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Dictation Card */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <Headphones className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-main dark:text-text-main-dark">{t('dashboard.daily.dictation')}</h4>
                      <span className="text-xs text-purple-600 bg-purple-100 dark:bg-purple-900/30 px-2 py-0.5 rounded-full">新内容</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-text-secondary dark:text-text-secondary-dark mb-4">
                  通过今天的"商务旅行"对话练习你的听力技巧。
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex-1 h-2 bg-background-light dark:bg-card-dark rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" />
                  </div>
                  <span className="text-xs text-text-secondary dark:text-text-secondary-dark">01:12 / 04:30</span>
                </div>
                <button className="w-full py-2.5 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" />
                  开始练习
                </button>
              </div>

              {/* Flashcard Card */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <Layers className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-main dark:text-text-main-dark">{t('dashboard.daily.flashcard')}</h4>
                      <span className="text-xs text-text-secondary dark:text-text-secondary-dark">待复习 20</span>
                    </div>
                  </div>
                </div>

                <Flashcard
                  word="Ephemeral"
                  phonetic="/ɪˈfemərəl/"
                  definition="短暂的；瞬息万变的"
                  onFlip={() => {}}
                />

                <button className="w-full mt-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark text-text-main dark:text-text-main-dark font-medium hover:bg-background-light dark:hover:bg-card-dark transition-colors flex items-center justify-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  全部复习 (20)
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Calendar */}
            <Calendar checkInDates={checkInDates} />

            {/* Leaderboard */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 border border-border-light dark:border-border-dark">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-text-main dark:text-text-main-dark flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  {t('dashboard.leaderboard.title')}
                </h3>
                <a href="#/social" className="text-sm text-primary hover:text-primary-dark transition-colors">
                  {t('dashboard.leaderboard.viewAll')}
                </a>
              </div>

              <div className="space-y-2">
                {friends.map((friend, index) => (
                  <LeaderboardItem
                    key={friend.name}
                    rank={index + 1}
                    name={friend.name}
                    avatar={friend.avatar}
                    xp={friend.xp}
                    streak={friend.streak}
                  />
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border-light dark:border-border-dark">
                <LeaderboardItem
                  rank={8}
                  name={user?.name || 'You'}
                  avatar={(user?.name?.[0] || 'Y')}
                  xp={stats.totalXP}
                  streak={stats.streakDays}
                  isCurrentUser
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 border border-border-light dark:border-border-dark">
              <h3 className="font-bold text-text-main dark:text-text-main-dark mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                快捷操作
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="#/dictation"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-background-light dark:bg-card-dark hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors group"
                >
                  <Headphones className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-text-main dark:text-text-main-dark">单词听写</span>
                </a>
                <a
                  href="#/vocabulary"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-background-light dark:bg-card-dark hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors group"
                >
                  <BookOpen className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-text-main dark:text-text-main-dark">词汇学习</span>
                </a>
                <a
                  href="#/learning-path"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-background-light dark:bg-card-dark hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors group"
                >
                  <Target className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-text-main dark:text-text-main-dark">学习路径</span>
                </a>
                <a
                  href="#/social"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-background-light dark:bg-card-dark hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors group"
                >
                  <Users className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-text-main dark:text-text-main-dark">社交中心</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
