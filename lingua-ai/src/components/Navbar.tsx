import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Sun, Moon, Globe, User, Menu, X } from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import type { Language } from '../types';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme, language, setLanguage, isAuthenticated } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'zh-CN', label: '简体中文' },
    { code: 'zh-TW', label: '繁體中文' },
    { code: 'ja', label: '日本語' },
    { code: 'ko', label: '한국어' },
  ];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    setIsLangOpen(false);
  };

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/courses', label: t('nav.courses') },
    { href: '/vocabulary', label: t('nav.vocabulary') },
    { href: '/community', label: t('nav.community') },
    { href: '/pricing', label: t('nav.pricing') },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              LinguaAI
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        language === lang.code
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600" />
              ) : (
                <Sun className="w-5 h-5 text-gray-300" />
              )}
            </button>

            {/* Auth Button */}
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>{t('dashboard.continue')}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <span>{t('auth.login')}</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to={isAuthenticated ? '/dashboard' : '/login'}
                className="mx-4 mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-center hover:bg-blue-700 transition-colors"
              >
                {isAuthenticated ? t('dashboard.continue') : t('auth.login')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
