import { useTranslation } from 'react-i18next';
import { ArrowRight, Download } from 'lucide-react';

export function CTA() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gray-900 dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
          {t('cta.title')}
        </h2>
        <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
          {t('cta.subtitle')}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all hover:scale-105"
          >
            {t('cta.register')}
            <ArrowRight className="w-5 h-5" />
          </a>
          <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gray-800 text-white font-semibold border border-gray-700 hover:bg-gray-700 transition-all">
            <Download className="w-5 h-5" />
            {t('cta.download')}
          </button>
        </div>
      </div>
    </section>
  );
}
