import { Flame, Award } from 'lucide-react';

interface ProfileCardProps {
  name: string;
  englishName: string;
  avatar: string;
  joinDate: string;
  level: string;
  membership: string;
  streak: number;
  xp: number;
}

export function ProfileCard({
  name,
  englishName,
  avatar,
  joinDate,
  level,
  membership,
  streak,
  xp,
}: ProfileCardProps) {
  return (
    <div className="bg-white dark:bg-[#1a2632] rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-100 dark:border-slate-700 shrink-0">
        <img alt="Profile" className="w-full h-full object-cover" src={avatar} />
      </div>

      {/* Info */}
      <div className="flex-1 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {name} ({englishName})
          </h2>
          <span className="px-2.5 py-0.5 rounded-full bg-[#137fec]/10 text-[#137fec] text-xs font-bold border border-[#137fec]/20">
            {membership}
          </span>
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
          加入时间：{joinDate} | 当前等级：{level}
        </p>

        <div className="flex flex-wrap justify-center sm:justify-start gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
            <Flame className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {streak} 天连胜
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
            <Award className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {xp.toLocaleString()} XP
            </span>
          </div>
        </div>
      </div>

      {/* Edit Button */}
      <button className="text-slate-400 hover:text-[#137fec] transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
    </div>
  );
}
