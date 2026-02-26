import { Link } from 'react-router-dom';

export function Hero() {

  const stats = [
    { value: '50万+', label: '活跃学习者' },
    { value: '1000万+', label: '掌握单词量' },
    { value: '250万+', label: 'AI 对话次数' },
    { value: '4.9/5', label: '应用商店评分' },
  ];

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 self-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary lg:self-start">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span>新功能：AI 发音教练</span>
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-text-main dark:text-text-main-dark sm:text-5xl lg:text-6xl">
              <span className="text-primary">30天内</span>自信说英语
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-text-secondary dark:text-text-secondary-dark lg:mx-0">
              专为东亚学习者设计的综合学习平台。通过针对母语习惯定制的个性化 AI 反馈，全面提升您的口语对话、词汇量和语法水平。
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Link
                to="/register"
                className="flex h-12 min-w-[160px] items-center justify-center gap-2 rounded-xl bg-primary px-6 text-base font-bold text-white shadow-lg shadow-primary/25 transition-transform hover:scale-105 hover:bg-primary-dark"
              >
                开始免费学习
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
              <button className="flex h-12 min-w-[160px] items-center justify-center gap-2 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-6 text-base font-bold text-text-main dark:text-text-main-dark transition-colors hover:bg-background-light dark:hover:bg-background-dark">
                <span className="material-symbols-outlined text-lg">play_circle</span>
                观看演示
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-text-secondary dark:text-text-secondary-dark lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-surface-light dark:border-surface-dark bg-gradient-to-br from-blue-400 to-blue-600"
                  />
                ))}
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface-light dark:border-surface-dark bg-primary text-[10px] font-bold text-white">+2k</div>
              </div>
              <p>今天已有 2,000+ 学习者加入</p>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative mx-auto w-full max-w-[600px] lg:mx-0">
            <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl filter dark:bg-primary/10"></div>
            <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl filter dark:bg-purple-500/10"></div>
            
            <div className="relative overflow-hidden rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-2xl">
              <div className="aspect-[4/3] w-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-white">chat</span>
                  </div>
                  <p className="text-text-secondary dark:text-text-secondary-dark">AI 对话练习界面预览</p>
                </div>
              </div>
              
              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-border-light dark:border-border-dark bg-surface-light/90 dark:bg-surface-dark/90 p-4 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <span className="material-symbols-outlined">mic</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-bold text-text-main dark:text-text-main-dark">发音评分</p>
                      <p className="text-sm font-bold text-green-600 dark:text-green-400">92%</p>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-background-light dark:bg-background-dark">
                      <div className="h-full w-[92%] rounded-full bg-green-500"></div>
                    </div>
                    <p className="mt-1 text-xs text-text-secondary dark:text-text-secondary-dark">"最后一句的语调非常棒！"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mx-auto max-w-7xl mt-20">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 border-y border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-4 py-12">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-3xl font-black text-text-main dark:text-text-main-dark">{stat.value}</h3>
              <p className="text-sm font-medium text-text-secondary dark:text-text-secondary-dark">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
