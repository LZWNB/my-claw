import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, MessageCircle } from 'lucide-react';

export function Hero() {
  const { t } = useTranslation();

  const stats = [
    { value: '50万+', label: t('hero.stats.learners') },
    { value: '1000万+', label: t('hero.stats.words') },
    { value: '250万+', label: t('hero.stats.conversations') },
    { value: '4.9/5', label: t('hero.stats.rating') },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              AI 智能教练
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              {t('hero.title')}
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all hover:scale-105"
              >
                {t('hero.startFree')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                <Play className="w-5 h-5" />
                {t('hero.watchDemo')}
              </button>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white dark:border-gray-900"
                  />
                ))}
              </div>
              <span>今天已有 2,000+ 学习者加入</span>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-600 flex items-center justify-center">
                    <MessageCircle className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">AI 对话练习界面预览</p>
                </div>
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <span className="text-green-600 text-lg">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">发音评分</p>
                    <p className="text-xs text-gray-500">92% - 优秀！</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
