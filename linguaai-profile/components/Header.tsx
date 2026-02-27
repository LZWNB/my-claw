import React from 'react';
import { 
  Menu, 
  Bell, 
  User, 
  Share2, 
  Zap, 
  Flame, 
  Crown,
  Settings,
  HelpCircle,
  Moon,
  Globe,
  Clock,
  ChevronRight
} from 'lucide-react';

interface HeaderProps {
  isDark?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isDark = false }) => {
  const navLinks = [
    { label: '课程', href: '#' },
    { label: '练习', href: '#' },
    { label: '社区', href: '#' },
    { label: '排行榜', href: '#' },
  ];

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
      isDark 
        ? 'bg-[#101922]/95 border-[#1a2632] backdrop-blur-sm' 
        : 'bg-white/95 border-gray-200 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#137fec] flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              LinguaAI
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#137fec] ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className={`p-2 rounded-lg transition-colors ${
              isDark ? 'hover:bg-[#1a2632] text-gray-300' : 'hover:bg-gray-100 text-gray-600'
            }`}>
              <Bell className="w-5 h-5" />
            </button>
            <button className={`p-2 rounded-lg transition-colors ${
              isDark ? 'hover:bg-[#1a2632] text-gray-300' : 'hover:bg-gray-100 text-gray-600'
            }`}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#137fec] to-blue-600 flex items-center justify-center cursor-pointer">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
