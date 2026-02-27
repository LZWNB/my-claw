import React from 'react';
import { BookOpen, Headphones, Mic, PenTool } from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ReactNode;
  progress: number;
  color: string;
}

interface SkillProgressProps {
  isDark?: boolean;
}

const SkillProgress: React.FC<SkillProgressProps> = ({ isDark = false }) => {
  const skills: Skill[] = [
    {
      name: '词汇',
      icon: <BookOpen className="w-5 h-5" />,
      progress: 78,
      color: 'from-purple-500 to-purple-400',
    },
    {
      name: '听力',
      icon: <Headphones className="w-5 h-5" />,
      progress: 65,
      color: 'from-green-500 to-green-400',
    },
    {
      name: '口语',
      icon: <Mic className="w-5 h-5" />,
      progress: 52,
      color: 'from-orange-500 to-orange-400',
    },
    {
      name: '语法',
      icon: <PenTool className="w-5 h-5" />,
      progress: 71,
      color: 'from-pink-500 to-pink-400',
    },
  ];

  return (
    <div className={`rounded-2xl p-6 transition-colors ${
      isDark ? 'bg-[#1a2632]' : 'bg-white'
    } shadow-sm`}>
      <h3 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        技能掌握度
      </h3>

      <div className="space-y-5">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {skill.icon}
                  </div>
                </div>
                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {skill.name}
                </span>
              </div>
              <span className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {skill.progress}%
              </span>
            </div>
            <div className={`h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div
                className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                style={{ width: `${skill.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillProgress;
