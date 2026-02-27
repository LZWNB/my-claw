import React from 'react';
import { Crown, Sparkles } from 'lucide-react';

interface ProCardProps {
  isDark?: boolean;
}

const ProCard: React.FC<ProCardProps> = ({ isDark = false }) => {
  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-[#137fec] via-blue-600 to-blue-800 text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Crown className="w-6 h-6 text-yellow-300" />
          <span className="text-lg font-bold">PRO 会员</span>
        </div>
        <Sparkles className="w-5 h-5 text-yellow-300" />
      </div>

      <p className="text-blue-100 text-sm mb-4">
        解锁无限课程、AI 口语教练、专属学习计划等高级功能
      </p>

      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-blue-200 text-xs">剩余天数</p>
          <p className="text-3xl font-bold">28 <span className="text-sm font-normal">天</span></p>
        </div>
        <div className="text-right">
          <p className="text-blue-200 text-xs">到期时间</p>
          <p className="text-sm font-medium">2026年3月27日</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 py-2.5 px-4 bg-white text-[#137fec] rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors">
          续费会员
        </button>
        <button className="flex-1 py-2.5 px-4 bg-blue-600/50 text-white border border-blue-400/50 rounded-xl font-semibold text-sm hover:bg-blue-600/70 transition-colors">
          管理订阅
        </button>
      </div>
    </div>
  );
};

export default ProCard;
