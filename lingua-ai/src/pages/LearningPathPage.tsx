import { useTranslation } from 'react-i18next';
import {
  Map,
  Target,
  Clock,
  Award,
  ChevronRight,
  Check,
  Lock,
  Star,
  BookOpen,
  Headphones,
  MessageCircle,
  PenTool,
  Play,
  RotateCcw,
  Zap,
  TrendingUp,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '../stores/appStore';

// Skill Node Component
function SkillNode({
  icon: Icon,
  title,
  description,
  status,
  progress,
  onClick,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  progress?: number;
  onClick: () => void;
}) {
  const statusConfig = {
    locked: {
      bg: 'bg-gray-100 dark:bg-gray-800',
      border: 'border-gray-200 dark:border-gray-700',
      icon: 'text-gray-400',
      badge: '🔒',
    },
    available: {
      bg: 'bg-surface-light dark:bg-surface-dark',
      border: 'border-primary',
      icon: 'text-primary',
      badge: '▶️',
    },
    'in-progress': {
      bg: 'bg-primary/5 dark:bg-primary/10',
      border: 'border-primary',
      icon: 'text-primary',
      badge: '🔄',
    },
    completed: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-500',
      icon: 'text-green-500',
      badge: '✓',
    },
  };

  const config = statusConfig[status];

  return (
    <button
      onClick={onClick}
      disabled={status === 'locked'}
      className={`
        w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left
        ${config.bg} ${config.border}
        ${status !== 'locked' ? 'hover:shadow-lg cursor-pointer' : 'cursor-not-allowed opacity-60'}
      `}
    >
      <div className="flex items-start gap-4">
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
          ${status === 'completed' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-background-light dark:bg-card-dark'}
        `}>
          <Icon className={`w-6 h-6 ${config.icon}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-text-main dark:text-text-main-dark truncate">{title}</h4>
            <span className="text-xs">{config.badge}</span>
          </div>
          <p className="text-sm text-text-secondary dark:text-text-secondary-dark mt-1 line-clamp-2">{description}</p>
          
          {status === 'in-progress' && progress !== undefined && (
            <div className="mt-3">
              <div className="h-1.5 bg-background-light dark:bg-card-dark rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-primary mt-1">{progress}% 完成</span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

// Milestone Component
function Milestone({ title, description, completed, reward }: {
  title: string;
  description: string;
  completed: boolean;
  reward: string;
}) {
  return (
    <div className={`
      flex items-center gap-4 p-4 rounded-xl
      ${completed ? 'bg-green-50 dark:bg-green-900/20' : 'bg-background-light dark:bg-card-dark'}
    `}>
      <div className={`
        w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
        ${completed ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'}
      `}>
        {completed ? <Check className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
      </div>
      <div className="flex-1">
        <h4 className={`font-medium ${completed ? 'text-text-main dark:text-text-main-dark' : 'text-text-secondary dark:text-text-secondary-dark'}`}>
          {title}
        </h4>
        <p className="text-xs text-text-secondary dark:text-text-secondary-dark">{description}</p>
      </div>
      <div className="flex items-center gap-1 text-yellow-500">
        <Award className="w-4 h-4" />
        <span className="text-xs font-medium">{reward}</span>
      </div>
    </div>
  );
}

// Weekly Goal Component
function WeeklyGoal({ day, completed, current }: {
  day: string;
  completed: boolean;
  current: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`
          w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-1
          ${current
            ? 'bg-primary text-white shadow-lg shadow-primary/30'
            : completed
            ? 'bg-green-500 text-white'
            : 'bg-background-light dark:bg-card-dark text-text-secondary dark:text-text-secondary-dark'
          }
        `}
      >
        {completed ? <Check className="w-5 h-5" /> : day[0]}
      </div>
      <span className="text-xs text-text-secondary dark:text-text-secondary-dark">{day}</span>
    </div>
  );
}

export function LearningPathPage() {
  const { t } = useTranslation();
  const { user, stats } = useAppStore();
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [showAssessment, setShowAssessment] = useState(false);

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

  const currentLevel = levels[selectedLevel];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white">
                <Map className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-text-main dark:text-text-main-dark">学习路径</h1>
                <p className="text-sm text-text-secondary dark:text-text-secondary-dark">定制您的个性化学习计划</p>
              </div>
            </div>
            <button
              onClick={() => setShowAssessment(true)}
              className="px-4 py-2 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              重新评估
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Level Selector */}
        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-2 border border-border-light dark:border-border-dark mb-6">
          <div className="flex gap-2">
            {(Object.keys(levels) as Array<keyof typeof levels>).map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`
                  flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200
                  ${selectedLevel === level
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'text-text-secondary dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-card-dark'
                  }
                `}
              >
                {levels[level].name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Level Info */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-text-main dark:text-text-main-dark">
                    {currentLevel.name}阶段
                  </h2>
                  <p className="text-text-secondary dark:text-text-secondary-dark mt-1">
                    共 {currentLevel.skills.length} 个技能 · 预计完成时间：4周
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">
                    {Math.round(currentLevel.skills.filter(s => s.status === 'completed').length / currentLevel.skills.length * 100)}%
                  </div>
                  <div className="text-sm text-text-secondary dark:text-text-secondary-dark">已完成</div>
                </div>
              </div>

              <div className="h-2 bg-background-light dark:bg-card-dark rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{
                    width: `${currentLevel.skills.filter(s => s.status === 'completed').length / currentLevel.skills.length * 100}%`
                  }}
                />
              </div>

              {/* Skills */}
              <div className="space-y-3">
                {currentLevel.skills.map((skill, index) => (
                  <SkillNode
                    key={skill.title}
                    {...skill}
                    onClick={() => console.log('Clicked:', skill.title)}
                  />
                ))}
              </div>
            </div>

            {/* Recommended Path */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6" />
                <h3 className="text-lg font-bold">AI 推荐路径</h3>
              </div>
              <p className="text-white/80 mb-4">
                基于您的学习数据，我们为您推荐以下学习顺序，帮助您最高效地提升英语水平。
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold">1</div>
                  <div className="flex-1">
                    <p className="font-medium">完成今日词汇复习</p>
                    <p className="text-sm text-white/60">预计 15 分钟</p>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-white text-primary font-medium text-sm hover:bg-white/90 transition-colors">
                    开始
                  </button>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold">2</div>
                  <div className="flex-1">
                    <p className="font-medium">进行AI对话练习</p>
                    <p className="text-sm text-white/60">预计 20 分钟</p>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-white/20 text-white font-medium text-sm hover:bg-white/30 transition-colors">
                    稍后
                  </button>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 opacity-60">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold">3</div>
                  <div className="flex-1">
                    <p className="font-medium">听力训练</p>
                    <p className="text-sm text-white/60">预计 15 分钟</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Progress */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-text-main dark:text-text-main-dark flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  本周目标
                </h3>
                <span className="text-sm text-text-secondary dark:text-text-secondary-dark">3/7 天</span>
              </div>
              <div className="flex justify-between">
                {weeklyGoals.map((goal) => (
                  <WeeklyGoal key={goal.day} {...goal} />
                ))}
              </div>
            </div>

            {/* Milestones */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
              <h3 className="font-bold text-text-main dark:text-text-main-dark mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                里程碑
              </h3>
              <div className="space-y-3">
                {milestones.map((milestone) => (
                  <Milestone key={milestone.title} {...milestone} />
                ))}
              </div>
            </div>

            {/* Study Stats */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
              <h3 className="font-bold text-text-main dark:text-text-main-dark mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                学习统计
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-text-secondary dark:text-text-secondary-dark" />
                    <span className="text-text-secondary dark:text-text-secondary-dark">本周学习</span>
                  </div>
                  <span className="font-semibold text-text-main dark:text-text-main-dark">5.5 小时</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-text-secondary dark:text-text-secondary-dark" />
                    <span className="text-text-secondary dark:text-text-secondary-dark">掌握单词</span>
                  </div>
                  <span className="font-semibold text-text-main dark:text-text-main-dark">{stats.masteredWords}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-text-secondary dark:text-text-secondary-dark" />
                    <span className="text-text-secondary dark:text-text-secondary-dark">完成目标</span>
                  </div>
                  <span className="font-semibold text-text-main dark:text-text-main-dark">85%</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
              <h3 className="font-bold text-text-main dark:text-text-main-dark mb-4">快捷操作</h3>
              <div className="space-y-2">
                <button className="w-full py-3 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary font-medium hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" />
                  继续学习
                </button>
                <button className="w-full py-3 rounded-xl border border-border-light dark:border-border-dark text-text-main dark:text-text-main-dark font-medium hover:bg-background-light dark:hover:bg-card-dark transition-colors flex items-center justify-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  复习单词
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
