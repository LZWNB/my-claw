import { useTranslation } from 'react-i18next';

export function Localization() {
  const { t } = useTranslation();

  const languages = [
    { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
    { code: 'zh-TW', name: '繁體', flag: '🇹🇼' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
  ];

  return (
    <section className="py-20 bg-blue-600 dark:bg-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t('localization.title')}
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            {t('localization.desc')}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors cursor-pointer"
            >
              <span className="text-2xl">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
