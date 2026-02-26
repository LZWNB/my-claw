import { useTranslation } from 'react-i18next';
import {
  BookOpen,
  Target,
  Flame,
  Trophy,
  Calendar,
  Play,
  RotateCcw,
  ChevronRight,
} from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function DashboardPage() {
  const { t } = useTranslation();
  const { user, stats } = useAppStore();

  const friends = [
    { name: 'Sarah Chen', xp: 2890, streak: 45, avatar: 'S' },
    { name: 'Mike Ross', xp: 2450, streak: 12, avatar: 'M' },
    { name: 'Kenji Sato', xp: 1920, streak: 3, avatar: 'K' },
  ];

  const weeklyData = stats.weeklyProgress;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                {user?.name?.[0] || 'U'}
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('dashboard.welcome', { name: user?.name || 'User' })}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('dashboard.streak', { days: stats.streakDays })}
                </p>
              </div>
            </div>
            <a
              href="/chat"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              {t('dashboard.continue')}
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-500">{t('dashboard.stats.vocabulary')}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalWords.toLocaleString()}
                </div>
                <div className="text-xs text-green-600 mt-1">本周 +15%</div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Target className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-sm text-gray-500">{t('dashboard.stats.dailyGoal')}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">85%</div>
                <div className="text-xs text-green-600 mt-1">即将完成</div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="text-sm text-gray-500">{t('dashboard.stats.streak')}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.streakDays}天
                </div>
                <div className="text-xs text-gray-500 mt-1">个人最佳: 24</div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-pink-600" />
                  </div>
                  <span className="text-sm text-gray-500">{t('dashboard.stats.globalRank')}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">#420</div>
                <div className="text-xs text-green-600 mt-1">前 5%</div>
              </div>
            </div>

            {/* Progress Chart */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {t('dashboard.progress.title')}
                </h3>
                <p className="text-sm text-gray-500">{t('dashboard.progress.subtitle')}</p>
              </div>

              <div className="flex items-end gap-2 mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">3,000</span>
                <span className="text-gray-500 mb-1">{t('dashboard.progress.words')}</span>
                <span className="text-green-600 text-sm mb-1 ml-2">{t('dashboard.progress.growth')} +22%</span>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="xp"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Daily Tasks */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <Play className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{t('dashboard.daily.dictation')}</h4>
                      <span className="text-xs text-purple-600 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-full">新内容</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">通过今天的"商务旅行"对话练习你的听力技巧。</p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <div className="w-1/3 h-full bg-purple-600 rounded-full" />
                  </div>
                  <span className="text-xs text-gray-500">01:12 / 04:30</span>
                </div>
                <button className="w-full py-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium hover:bg-purple-200 transition-colors">
                  开始练习
                </button>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <RotateCcw className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{t('dashboard.daily.flashcard')}</h4>
                      <span className="text-xs text-gray-500">待复习 20</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white text-center mb-4">
                  <p className="text-sm opacity-80 mb-2">形容词</p>
                  <h3 className="text-3xl font-bold mb-2">Ephemeral</h3>
                  <p className="text-sm opacity-80">点击翻转</p>
                </div>

                <button className="w-full py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  全部复习 (20)
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Calendar */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">‹</button>
                <span className="font-semibold text-gray-900 dark:text-white">2023年10月</span>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">›</button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {['日', '一', '二', '三', '四', '五', '六'].map((d) => (
                  <div key={d} className="text-gray-400 py-2">{d}</div>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const isToday = day === 16;
                  const isActive = [5, 16].includes(day);
                  return (
                    <div
                      key={day}
                      className={`py-2 rounded-lg cursor-pointer ${
                        isToday
                          ? 'bg-blue-600 text-white'
                          : isActive
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">{t('dashboard.leaderboard.title')}</h3>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                  {t('dashboard.leaderboard.viewAll')}
                </a>
              </div>

              <div className="space-y-3">
                {friends.map((friend, index) => (
                  <div
                    key={friend.name}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span className="text-lg font-bold text-gray-400 w-6">{index + 1}</span>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium">
                      {friend.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{friend.name}</p>
                      <p className="text-sm text-gray-500">{friend.xp.toLocaleString()} XP</p>
                    </div>
                    <div className="flex items-center gap-1 text-orange-500">
                      <Flame className="w-4 h-4" />
                      <span className="text-sm">{friend.streak}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
