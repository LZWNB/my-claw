import { useTranslation } from 'react-i18next';
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
} from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import { useState } from 'react';

// Achievement Badge Component
function AchievementBadge({ icon: Icon, title, description, unlocked, progress }: {
  icon: React.ElementType;
  title: string;
  description: string;
  unlocked: boolean;
  progress?: number;
}) {
  return (
    <div className={`p-4 rounded-xl border transition-all duration-200 ${
      unlocked
        ? 'bg-primary/5 dark:bg-primary/10 border-primary/20'
        : 'bg-background-light dark:bg-card-dark border-border-light dark:border-border-dark opacity-60'
    }`}>
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          unlocked
            ? 'bg-primary text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
        }`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-text-main dark:text-text-main-dark">{title}</h4>
          <p className="text-xs text-text-secondary dark:text-text-secondary-dark mt-1">{description}</p>
          {progress !== undefined && (
            <div className="mt-2">
              <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-text-secondary dark:text-text-secondary-dark mt-1">{progress}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Settings Item Component
function SettingsItem({ icon: Icon, label, value, onClick, danger }: {
  icon: React.ElementType;
  label: string;
  value?: string;
  onClick?: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-xl hover:bg-background-light dark:hover:bg-card-dark transition-colors ${
        danger ? 'text-red-500' : ''
      }`}
    >
      <Icon className={`w-5 h-5 ${danger ? '' : 'text-text-secondary dark:text-text-secondary-dark'}`} />
      <span className={`flex-1 text-left ${danger ? '' : 'text-text-main dark:text-text-main-dark'}`}>{label}</span>
      {value && <span className="text-sm text-text-secondary dark:text-text-secondary-dark">{value}</span>}
      <ChevronRight className="w-4 h-4 text-text-secondary dark:text-text-secondary-dark" />
    </button>
  );
}

export function ProfilePage() {
  const { t } = useTranslation();
  const { user, stats, theme, toggleTheme } = useAppStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'settings'>('overview');

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

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-text-main dark:text-text-main-dark">个人中心</h1>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl hover:bg-background-light dark:hover:bg-card-dark transition-colors relative">
                <Bell className="w-5 h-5 text-text-secondary dark:text-text-secondary-dark" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button className="p-2 rounded-xl hover:bg-background-light dark:hover:bg-card-dark transition-colors">
                <Settings className="w-5 h-5 text-text-secondary dark:text-text-secondary-dark" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Card */}
        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-3xl">
                {user?.name?.[0] || 'U'}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary-dark transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-text-main dark:text-text-main-dark">{user?.name || 'User'}</h2>
              <p className="text-text-secondary dark:text-text-secondary-dark">{user?.email || 'user@example.com'}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3">
                <span className="px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium">
                  Level {user?.level || 1}
                </span>
                <span className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 text-sm font-medium flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  {stats.streakDays} 天连胜
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 text-sm font-medium">
                  {stats.totalXP.toLocaleString()} XP
                </span>
              </div>
            </div>
            <button className="px-4 py-2 rounded-xl border border-border-light dark:border-border-dark text-text-main dark:text-text-main-dark hover:bg-background-light dark:hover:bg-card-dark transition-colors flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              编辑资料
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: '概览', icon: User },
            { id: 'achievements', label: '成就', icon: Award },
            { id: 'settings', label: '设置', icon: Settings },
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

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Stats */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 border border-border-light dark:border-border-dark">
                  <div className="text-3xl font-bold text-primary">{stats.totalWords.toLocaleString()}</div>
                  <div className="text-sm text-text-secondary dark:text-text-secondary-dark mt-1">总词汇量</div>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 border border-border-light dark:border-border-dark">
                  <div className="text-3xl font-bold text-purple-500">{stats.masteredWords.toLocaleString()}</div>
                  <div className="text-sm text-text-secondary dark:text-text-secondary-dark mt-1">已掌握</div>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 border border-border-light dark:border-border-dark">
                  <div className="text-3xl font-bold text-orange-500">{stats.streakDays}</div>
                  <div className="text-sm text-text-secondary dark:text-text-secondary-dark mt-1">当前连胜</div>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 border border-border-light dark:border-border-dark">
                  <div className="text-3xl font-bold text-green-500">156</div>
                  <div className="text-sm text-text-secondary dark:text-text-secondary-dark mt-1">学习天数</div>
                </div>
              </div>

              {/* Learning History */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
                <h3 className="text-lg font-bold text-text-main dark:text-text-main-dark mb-4">最近学习记录</h3>
                <div className="space-y-3">
                  {learningHistory.map((record, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-xl bg-background-light dark:bg-card-dark"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-text-main dark:text-text-main-dark">{record.date}</div>
                        <div className="text-sm text-text-secondary dark:text-text-secondary-dark">
                          学习 {record.time} · {record.words} 个单词
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">+{record.xp} XP</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Subscription */}
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5" />
                  <span className="font-semibold">Pro 会员</span>
                </div>
                <p className="text-sm opacity-80 mb-4">享受无限AI对话、高级统计等特权</p>
                <div className="text-xs opacity-60 mb-4">有效期至 2024-12-31</div>
                <button className="w-full py-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium">
                  管理订阅
                </button>
              </div>

              {/* Quick Stats */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
                <h3 className="font-bold text-text-main dark:text-text-main-dark mb-4">学习统计</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text-secondary dark:text-text-secondary-dark">本周学习时长</span>
                      <span className="font-medium text-text-main dark:text-text-main-dark">5.5 小时</span>
                    </div>
                    <div className="h-2 bg-background-light dark:bg-card-dark rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-primary rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text-secondary dark:text-text-secondary-dark">本月目标进度</span>
                      <span className="font-medium text-text-main dark:text-text-main-dark">68%</span>
                    </div>
                    <div className="h-2 bg-background-light dark:bg-card-dark rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-purple-500 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text-secondary dark:text-text-secondary-dark">词汇掌握率</span>
                      <span className="font-medium text-text-main dark:text-text-main-dark">49%</span>
                    </div>
                    <div className="h-2 bg-background-light dark:bg-card-dark rounded-full overflow-hidden">
                      <div className="w-1/2 h-full bg-green-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <AchievementBadge key={index} {...achievement} />
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
              <h3 className="font-bold text-text-main dark:text-text-main-dark mb-4">账户设置</h3>
              <div className="space-y-1">
                <SettingsItem icon={User} label="个人信息" value="编辑" />
                <SettingsItem icon={Mail} label="邮箱地址" value={user?.email || '未设置'} />
                <SettingsItem icon={Shield} label="密码与安全" />
                <SettingsItem icon={CreditCard} label="订阅管理" value="Pro" />
              </div>
            </div>

            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
              <h3 className="font-bold text-text-main dark:text-text-main-dark mb-4">偏好设置</h3>
              <div className="space-y-1">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-background-light dark:hover:bg-card-dark transition-colors"
                >
                  <Moon className="w-5 h-5 text-text-secondary dark:text-text-secondary-dark" />
                  <span className="flex-1 text-left text-text-main dark:text-text-main-dark">深色模式</span>
                  <div className={`w-11 h-6 rounded-full transition-colors ${theme === 'dark' ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`} />
                  </div>
                </button>
                <SettingsItem icon={Globe} label="语言" value="简体中文" />
                <SettingsItem icon={Bell} label="通知设置" />
                <SettingsItem icon={Smartphone} label="设备管理" />
              </div>
            </div>

            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark lg:col-span-2">
              <h3 className="font-bold text-text-main dark:text-text-main-dark mb-4">其他</h3>
              <div className="space-y-1">
                <SettingsItem icon={Shield} label="隐私政策" />
                <SettingsItem icon={BookOpen} label="使用条款" />
                <SettingsItem icon={LogOut} label="退出登录" danger />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
