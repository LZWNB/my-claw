import { useTranslation } from 'react-i18next';
import { MessageCircle, Brain, Users } from 'lucide-react';

export function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: MessageCircle,
      title: t('features.aiPartner.title'),
      description: t('features.aiPartner.desc'),
      color: 'blue',
    },
    {
      icon: Brain,
      title: t('features.vocabTest.title'),
      description: t('features.vocabTest.desc'),
      color: 'purple',
    },
    {
      icon: Users,
      title: t('features.social.title'),
      description: t('features.social.desc'),
      color: 'orange',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('features.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClasses = {
              blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
              purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
              orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
            }[feature.color];

            return (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all hover:shadow-lg"
              >
                <div className={`w-14 h-14 rounded-xl ${colorClasses} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
