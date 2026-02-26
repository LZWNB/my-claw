import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: 'chat_bubble',
    title: 'AI 对话伙伴',
    description: '随时随地练习口语。我们的 AI 能够理解多种口音（中文、日文、韩文），并对语法和语气提供即时、温和的纠正。',
    color: 'blue',
  },
  {
    icon: 'psychology',
    title: '智能词汇测试',
    description: '自适应测验能够识别您的薄弱环节。我们使用间隔重复算法，确保您不仅今天记住了新单词，而是永久掌握。',
    color: 'purple',
  },
  {
    icon: 'local_fire_department',
    title: '社交学习连胜',
    description: '一起学习更有趣。加入学习小组，在排行榜上竞争，保持每日打卡连胜，赢取专属徽章和奖励。',
    color: 'orange',
  },
];

export function Features() {
  const { t } = useTranslation();

  return (
    <section id="features" className="px-4 py-20 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-black tracking-tight text-text-main dark:text-text-main-dark sm:text-4xl">为什么选择 LinguaAI？</h2>
          <p className="mt-4 text-lg text-text-secondary dark:text-text-secondary-dark">利用专为高效学习设计的尖端功能，释放您的潜能。</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-8 transition-shadow hover:shadow-xl"
            >
              <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-${feature.color}-100 text-${feature.color}-600 dark:bg-${feature.color}-900/30 dark:text-${feature.color}-400`}>
                <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-text-main dark:text-text-main-dark">{feature.title}</h3>
              <p className="text-text-secondary dark:text-text-secondary-dark leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
