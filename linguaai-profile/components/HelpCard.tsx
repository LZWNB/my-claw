import React from 'react';
import { HelpCircle, MessageCircle, FileText, ChevronRight } from 'lucide-react';

interface HelpCardProps {
  isDark?: boolean;
}

const HelpCard: React.FC<HelpCardProps> = ({ isDark = false }) => {
  const helpItems = [
    {
      icon: <HelpCircle className="w-5 h-5" />,
      title: '帮助中心',
      description: '常见问题解答',
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: '联系客服',
      description: '7x24小时在线',
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: '使用指南',
      description: '快速上手教程',
    },
  ];

  return (
    <div className={`rounded-2xl p-6 transition-colors ${
      isDark ? 'bg-[#1a2632]' : 'bg-white'
    } shadow-sm`}>
      <h3 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        帮助与支持
      </h3>

      <div className="space-y-3">
        {helpItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${
              isDark 
                ? 'hover:bg-gray-700/50' 
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  {item.icon}
                </div>
              </div>
              <div className="text-left">
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {item.description}
                </p>
              </div>
            </div>
            <ChevronRight className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default HelpCard;
