export function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101922] py-8 px-10">
      <div className="max-w-[1024px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
        <p>© 2024 LinguaAI. 版权所有。</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#137fec] transition-colors">隐私政策</a>
          <a href="#" className="hover:text-[#137fec] transition-colors">条款</a>
          <a href="#" className="hover:text-[#137fec] transition-colors">帮助中心</a>
        </div>
      </div>
    </footer>
  );
}
