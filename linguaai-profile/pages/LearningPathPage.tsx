import { useState } from 'react';
import { Check, Target, BarChart3, Clock, ArrowLeft, ArrowRight, Lightbulb, Zap } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from './Footer';

const focusOptions = [
  {
    id: 'toefl',
    title: '托福 / 雅思',
    description: '目标 100+ 或 7.0+，高强度学术备考。',
    icon: 'school',
    gradient: 'from-blue-100 to-blue-50 dark:from-slate-800 dark:to-slate-700',
  },
  {
    id: 'business',
    title: '商务英语',
    description: '谈判技巧、邮件写作及专业会议沟通。',
    icon: 'briefcase',
    gradient: 'from-indigo-100 to-indigo-50 dark:from-slate-800 dark:to-slate-700',
  },
  {
    id: 'travel',
    title: '旅行对话',
    description: '轻松应对度假及日常生活的流利对话。',
    icon: 'plane',
    gradient: 'from-emerald-100 to-emerald-50 dark:from-slate-800 dark:to-slate-700',
  },
  {
    id: 'academic',
    title: '学术写作',
    description: '大学论文写作及学术研究报告。',
    icon: 'file-text',
    gradient: 'from-orange-100 to-orange-50 dark:from-slate-800 dark:to-slate-700',
  },
];

const levelOptions = [
  {
    id: 'beginner',
    label: '初级 (A1-A2)',
    badge: '基础',
    badgeColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    description: '我可以理解基本短语并进行自我介绍。',
  },
  {
    id: 'intermediate',
    label: '中级 (B1-B2)',
    badge: '会话',
    badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    description: '我可以应对大多数旅行场景并描述经历。',
    recommended: true,
  },
  {
    id: 'advanced',
    label: '高级 (C1-C2)',
    badge: '流利',
    badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    description: '我可以流利地表达观点并理解复杂文本。',
  },
];

export function LearningPathPage() {
  const [selectedFocus, setSelectedFocus] = useState('toefl');
  const [selectedLevel, setSelectedLevel] = useState('intermediate');
  const [dailyGoal, setDailyGoal] = useState(30);

  return (
    <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#101922] flex flex-col">
      <Header />

      <main className="flex-1 flex justify-center py-8 px-4 md:px-10">
        <div className="w-full max-w-[960px] flex flex-col gap-8">
          {/* Header Section */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                定制您的学习路径
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal">
                告诉我们您的目标，我们将为您量身定制专属课程。
              </p>
            </div>

            {/* Progress Bar */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <p className="text-[#137fec] font-bold text-sm uppercase tracking-wider">第1步（共3步）</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">设定目标</p>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#137fec] w-1/3 rounded-full shadow-[0_0_10px_rgba(19,127,236,0.5)]" />
              </div>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="bg-white dark:bg-[#1a2632] rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
            {/* Focus Selection */}
            <section className="mb-10">
              <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#137fec]" />
                您的主要学习重点是什么？
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {focusOptions.map((option) => (
                  <label
                    key={option.id}
                    className="group cursor-pointer relative"
                    onClick={() => setSelectedFocus(option.id)}
                  >
                    <input
                      type="radio"
                      name="focus"
                      value={option.id}
                      checked={selectedFocus === option.id}
                      onChange={() => setSelectedFocus(option.id)}
                      className="peer sr-only"
                    />
                    <div className={`h-full flex flex-col p-4 rounded-xl border-2 border-slate-100 dark:border-slate-700 hover:border-[#137fec]/50 dark:hover:border-[#137fec]/50 peer-checked:border-[#137fec] peer-checked:bg-[#137fec]/5 dark:peer-checked:bg-[#137fec]/10 transition-all duration-200`}>
                      <div className={`mb-4 rounded-lg overflow-hidden aspect-video relative bg-gradient-to-tr ${option.gradient}`}>
                        <div className="absolute inset-0 flex items-center justify-center text-[#137fec]">
                          <span className="text-4xl">{option.icon === 'school' && '🎓'}{option.icon === 'briefcase' && '💼'}{option.icon === 'plane' && '✈️'}{option.icon === 'file-text' && '📝'}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-900 dark:text-white text-base font-bold mb-1 group-hover:text-[#137fec] transition-colors">
                          {option.title}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">{option.description}</p>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <div className="size-6 rounded-full border-2 border-slate-200 dark:border-slate-600 peer-checked:border-[#137fec] peer-checked:bg-[#137fec] flex items-center justify-center transition-colors">
                          <Check className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" />
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            <hr className="border-slate-100 dark:border-slate-800 mb-10" />

            {/* Level & Daily Goal */}
            <div className="flex flex-col md:flex-row gap-10">
              {/* Level Selection */}
              <section className="flex-1">
                <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-2 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#137fec]" />
                  当前水平
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">基于您的初始分级测试结果。</p>

                <div className="space-y-3">
                  {levelOptions.map((level) => (
                    <label
                      key={level.id}
                      className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors relative ${
                        selectedLevel === level.id
                          ? 'border-2 border-[#137fec] bg-[#137fec]/5 dark:bg-[#137fec]/10'
                          : 'border-slate-200 dark:border-slate-700 hover:border-[#137fec] bg-white dark:bg-[#15202b]'
                      }`}
                      onClick={() => setSelectedLevel(level.id)}
                    >
                      {level.recommended && (
                        <div className="absolute -right-2 -top-2 bg-[#137fec] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full shadow-sm">
                          推荐
                        </div>
                      )}
                      <input
                        type="radio"
                        name="level"
                        value={level.id}
                        checked={selectedLevel === level.id}
                        onChange={() => setSelectedLevel(level.id)}
                        className="size-5 accent-[#137fec]"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-slate-900 dark:text-white">{level.label}</span>
                          <span className={`text-xs font-medium px-2 py-1 rounded ${level.badgeColor}`}>
                            {level.badge}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{level.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </section>

              {/* Daily Goal */}
              <section className="flex-1">
                <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#137fec]" />
                  每日目标
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">您每天可以投入多少时间？</p>

                <div className="flex flex-col gap-4">
                  <div className="relative w-full pt-6 pb-2">
                    <input
                      type="range"
                      min="15"
                      max="120"
                      step="15"
                      value={dailyGoal}
                      onChange={(e) => setDailyGoal(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#137fec]"
                    />
                    <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium font-mono">
                      <span>15分</span>
                      <span>30分</span>
                      <span>45分</span>
                      <span>60分</span>
                      <span>90分</span>
                      <span>120分</span>
                    </div>
                  </div>

                  <div className="bg-[#f6f7f8] dark:bg-[#101922] p-5 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-black text-[#137fec]">
                        {dailyGoal} <span className="text-base font-normal text-slate-500 dark:text-slate-400">分钟/天</span>
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        预计提升: <span className="text-green-600 dark:text-green-400 font-bold">4个月提升1个等级</span>
                      </p>
                    </div>
                    <div className="size-12 rounded-full bg-[#137fec]/10 flex items-center justify-center text-[#137fec]">
                      <Zap className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="mt-2 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30 rounded-lg flex gap-3">
                    <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-500 shrink-0" />
                    <p className="text-sm text-yellow-800 dark:text-yellow-200 leading-relaxed">
                      <strong>提示:</strong> 持续性胜过强度。每天坚持30分钟比每周一次4小时更有效。
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-12 flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
              <button className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white font-medium text-sm flex items-center gap-2 px-4 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                返回
              </button>
              <button className="bg-[#137fec] hover:bg-blue-600 text-white text-base font-bold px-8 py-3 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center gap-2 group">
                继续
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default LearningPathPage;
