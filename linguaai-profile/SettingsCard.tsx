import { Sliders, HelpCircle } from 'lucide-react';

interface SettingsCardProps {
  language: string;
  reminderTime: string;
  darkMode: boolean;
}

export function SettingsCard({
  language,
  reminderTime,
  darkMode,
}: SettingsCardProps) {
  return (
    <>
      <div className="bg-white dark:bg-[#1a2632] rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Sliders className="w-5 h-5 text-slate-400" />
          偏好设置
        </h3>

        <div className="space-y-4">
          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              界面语言
            </label>
            <div className="relative">
              <select
                defaultValue={language}
                className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-[#137fec] focus:ring-[#137fec] py-2.5 px-3 border"
              >
                <option value="zh-CN">简体中文 (Chinese Simplified)</option>
                <option value="en">English</option>
                <option value="ja">日本語 (Japanese)</option>
                <option value="ko">한국어 (Korean)</option>
              </select>
            </div>
          </div>

          {/* Reminder Time */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              每日提醒时间
            </label>
            <input
              type="time"
              defaultValue={reminderTime}
              className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-[#137fec] focus:ring-[#137fec] py-2.5 px-3 border"
            />
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">深色模式</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked={darkMode} className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#137fec]/20 dark:peer-focus:ring-[#137fec]/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#137fec]"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Help Card */}
      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4 flex gap-3">
        <HelpCircle className="w-5 h-5 text-[#137fec] shrink-0" />
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">需要帮助？</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
            如果您遇到任何账户问题，我们的支持团队随时待命。
          </p>
          <a href="#" className="text-xs font-bold text-[#137fec] hover:underline">
            联系客服
          </a>
        </div>
      </div>
    </>
  );
}
