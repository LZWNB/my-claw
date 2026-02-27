import React from 'react';

interface LearningChartProps {
  isDark?: boolean;
}

const LearningChart: React.FC<LearningChartProps> = ({ isDark = false }) => {
  // 最近7天的学习数据
  const data = [
    { day: '周一', hours: 1.5 },
    { day: '周二', hours: 2.0 },
    { day: '周三', hours: 1.2 },
    { day: '周四', hours: 2.5 },
    { day: '周五', hours: 1.8 },
    { day: '周六', hours: 3.0 },
    { day: '周日', hours: 2.2 },
  ];

  const maxHours = Math.max(...data.map(d => d.hours));

  return (
    <div className={`rounded-2xl p-6 transition-colors ${
      isDark ? 'bg-[#1a2632]' : 'bg-white'
    } shadow-sm`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          学习数据分析
        </h3>
        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          最近7天
        </span>
      </div>

      {/* Chart */}
      <div className="flex items-end justify-between gap-3 h-48">
        {data.map((item, index) => {
          const heightPercent = (item.hours / maxHours) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end justify-center h-36">
                <div
                  className="w-full max-w-12 rounded-t-lg bg-gradient-to-t from-[#137fec] to-blue-400 transition-all duration-500 hover:from-blue-600 hover:to-blue-300"
                  style={{ height: `${heightPercent}%` }}
                />
              </div>
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {item.day}
              </span>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className={`mt-6 pt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>本周总时长</p>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              14.2 <span className="text-sm font-normal">小时</span>
            </p>
          </div>
          <div className="text-right">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>日均学习</p>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              2.0 <span className="text-sm font-normal">小时</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningChart;
