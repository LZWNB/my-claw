import React from 'react';
import { Crown, Flame, Zap } from 'lucide-react';

interface ProfileCardProps {
  isDark?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ isDark = false }) => {
  return (
    <div className={`rounded-2xl p-6 transition-colors ${
      isDark ? 'bg-[#1a2632]' : 'bg-white'
    } shadow-sm`}>
      <div className="flex items-start gap-6">
        {/* Avatar */}
        <div className="relative">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#137fec] to-blue-600 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">李</span>
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center border-2 border-white dark:border-[#1a2632]">
            <Crown className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              李明
            </h2>
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold">
              PRO
            </span>
          </div>
          <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            学习英语的第 128 天
          </p>

          {/* Stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-orange-500/20' : 'bg-orange-100'}`}>
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>连胜</p>
                <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>12 天</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                <Zap className="w-5 h-5 text-[#137fec]" />
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>XP</p>
                <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>8,450</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
