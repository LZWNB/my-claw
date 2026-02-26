import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function CTA() {
  return (
    <section className="bg-surface-light dark:bg-surface-dark px-4 py-20 sm:px-10">
      <div className="mx-auto max-w-4xl rounded-3xl bg-background-dark dark:bg-primary/10 px-6 py-16 text-center shadow-2xl md:px-12">
        <h2 className="mb-4 text-3xl font-black text-white dark:text-text-main-dark sm:text-4xl">准备好开始您的旅程了吗？</h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300 dark:text-text-secondary-dark">今天就加入超过 50 万名在 AI 辅助下掌握英语的学习者行列。免费开始。</p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/register"
            className="flex h-12 min-w-[180px] items-center justify-center gap-2 rounded-xl bg-primary px-8 text-base font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary-dark"
          >
            立即免费注册
          </Link>
          <button className="flex h-12 min-w-[180px] items-center justify-center gap-2 rounded-xl border border-gray-600 bg-transparent px-8 text-base font-bold text-white transition-colors hover:bg-white/10 dark:border-border-dark dark:text-text-main-dark dark:hover:bg-white/5">
            下载应用
          </button>
        </div>
      </div>
    </section>
  );
}
