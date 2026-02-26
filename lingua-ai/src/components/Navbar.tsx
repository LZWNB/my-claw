import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAppStore } from '../stores/appStore';
import type { Language } from '../types';

export function Navbar() {
  const { i18n } = useTranslation();
  const { toggleTheme, language, setLanguage } = useAppStore();

  const languages: { code: Language; label: string }[] = [
    { code: 'zh-CN', label: '简' },
    { code: 'zh-TW', label: '繁' },
    { code: 'ja', label: 'JP' },
    { code: 'ko', label: 'KR' },
  ];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border-light dark:border-border-dark bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md px-6 py-4 md:px-10">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <span className="material-symbols-outlined text-3xl">language</span>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-text-main dark:text-text-main-dark">LinguaAI</h2>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        <nav className="flex gap-6">
          <a className="text-sm font-medium text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary transition-colors" href="#features">功能</a>
          <a className="text-sm font-medium text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary transition-colors" href="#pricing">定价</a>
          <a className="text-sm font-medium text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary transition-colors" href="#community">社区</a>
        </nav>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Language Selector */}
        <div className="hidden sm:flex items-center gap-1 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark p-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                language === lang.code
                  ? 'text-primary bg-white dark:bg-surface-dark shadow-sm font-bold'
                  : 'text-text-secondary dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-text-secondary hover:bg-background-light dark:hover:bg-background-dark transition-colors"
        >
          <span className="material-symbols-outlined text-xl dark:hidden">dark_mode</span>
          <span className="material-symbols-outlined text-xl hidden dark:block">light_mode</span>
        </button>

        {/* Login Button */}
        <Link
          to="/login"
          className="hidden sm:flex h-9 px-4 items-center justify-center rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-sm font-bold text-text-main dark:text-text-main-dark hover:bg-background-light dark:hover:bg-background-dark transition-colors"
        >
          登录
        </Link>

        {/* Register Button */}
        <Link
          to="/register"
          className="flex h-9 px-4 items-center justify-center rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors"
        >
          立即注册
        </Link>
      </div>
    </header>
  );
}
