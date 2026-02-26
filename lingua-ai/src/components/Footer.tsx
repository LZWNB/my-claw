export function Footer() {
  return (
    <footer className="border-t border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-4 py-12 text-sm sm:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-text-main dark:text-text-main-dark">
              <span className="material-symbols-outlined text-primary">language</span>
              <span className="text-lg font-bold">LinguaAI</span>
            </div>
            <p className="text-text-secondary dark:text-text-secondary-dark">让东亚地区的每个人都能获得无障碍、个性化且高效的语言学习体验。</p>
          </div>

          {/* Platform */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-text-main dark:text-text-main-dark">平台</h4>
            <a className="text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary" href="#">功能</a>
            <a className="text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary" href="#">定价</a>
            <a className="text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary" href="#">面向学校</a>
            <a className="text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary" href="#">面向企业</a>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-text-main dark:text-text-main-dark">资源</h4>
            <a className="text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary" href="#">博客</a>
            <a className="text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary" href="#">社区</a>
            <a className="text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary" href="#">帮助中心</a>
            <a className="text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary" href="#">语法指南</a>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-text-main dark:text-text-main-dark">法律</h4>
            <a className="text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary" href="#">隐私政策</a>
            <a className="text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary" href="#">服务协议</a>
            <a className="text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary" href="#">Cookie 政策</a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border-light dark:border-border-dark pt-8 sm:flex-row">
          <p className="text-text-secondary dark:text-text-secondary-dark">© 2023 LinguaAI Inc. 保留所有权利。</p>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-xs font-medium text-text-secondary dark:text-text-secondary-dark">系统运行正常</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
