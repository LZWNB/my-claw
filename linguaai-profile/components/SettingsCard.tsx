import React from 'react';
import { Globe, Clock, Moon, ChevronRight } from 'lucide-react';

interface SettingsCardProps {
  isDark?: boolean;
  onToggleDarkMode?: () => void;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ isDark = false, onToggleDarkMode }) => {
  return (
    <div className={`rounded-2xl p-6 transition-colors ${
      isDark ? 'bg-[#1a2632]' : 'bg-white'
    } shadow-sm`}>
      <h3 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        偏好设置
      </h3>

      <div className="space-y-5">
        {/* Language Selection */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <Globe className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            </div>
            <div>
              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>目标语言</p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>英语 (美式)</p>
            </div>
          </div>
          <button className={`p-1 rounded-lg transition-colors ${
            isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
          }`}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Reminder Time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <Clock className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            </div>
            <div>
              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>学习提醒</p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>每天 20:00</p>
            </div>
          </div>
          <button className={`p-1 rounded-lg transition-colors ${
            isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
          }`}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <Moon className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            </div>
            <div>
              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>深色模式</p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {isDark ? '已开启' : '已关闭'}
              </p>
            </div>
          </div>
          <button
            onClick={onToggleDarkMode}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              isDark ? 'bg-[#137fec]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                isDark ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsCard;
