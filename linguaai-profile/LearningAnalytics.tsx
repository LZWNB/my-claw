import { BarChart3 } from 'lucide-react';

interface DayData {
  day: string;
  hours: number;
  isToday?: boolean;
}

const weekData: DayData[] = [
  { day: '一', hours: 0.8 },
  { day: '二', hours: 1.3 },
  { day: '三', hours: 0.6 },
  { day: '四', hours: 1.6 },
  { day: '今天', hours: 1.9, isToday: true },
  { day: '六', hours: 0 },
  { day: '日', hours: 0 },
];

interface SkillData {
  name: string;
  percentage: number;
  color: string;
}

const skills: SkillData[] = [
  { name: '词汇 (Vocabulary)', percentage: 85, color: 'bg-emerald-500' },
  { name: '听力 (Listening)', percentage: 62, color: 'bg-[#137fec]' },
  { name: '口语 (Speaking)', percentage: 45, color: 'bg-amber-500' },
  { name: '语法 (Grammar)', percentage: 78, color: 'bg-indigo-500' },
];

export function LearningAnalytics() {
  const maxHours = Math.max(...weekData.map(d => d.hours));

  return (
    <div className="bg-white dark:bg-[#1a2632] rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#137fec]" />
          学习数据分析
        </h3>
        <select className="bg-transparent border-none text-sm font-medium text-slate-500 focus:ring-0 cursor-pointer">
          <option>最近7天</option>
          <option>最近30天</option>
          <option>全部时间</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="flex flex-col">
          <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4">
            学习时长分布 (小时)
          </h4>
          <div className="flex items-end gap-2 h-40 mt-auto">
            {weekData.map((item, index) => {
              const height = maxHours > 0 ? (item.hours / maxHours) * 100 : 0;
              return (
                <div
                  key={index}
                  className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-sm relative group cursor-pointer"
                >
                  <div
                    className={`absolute bottom-0 w-full rounded-t-sm transition-all ${
                      item.isToday
                        ? 'bg-[#137fec] shadow-[0_0_10px_rgba(19,127,236,0.3)]'
                        : 'bg-blue-300 dark:bg-blue-900/50 group-hover:bg-[#137fec]'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded pointer-events-none transition-opacity">
                    {item.hours}h
                  </div>
                  <span
                    className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs ${
                      item.isToday ? 'font-bold text-[#137fec]' : 'text-slate-400'
                    }`}
                  >
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skills Progress */}
        <div className="flex flex-col pt-6 md:pt-0">
          <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4">
            技能掌握度
          </h4>
          <div className="flex flex-col gap-4">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-700 dark:text-slate-300">{skill.name}</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {skill.percentage}%
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${skill.color} rounded-full`}
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
