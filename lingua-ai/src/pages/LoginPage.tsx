import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../stores/appStore';

export function LoginPage() {
  const navigate = useNavigate();
  const { setUser, toggleTheme, theme } = useAppStore();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: 'user_001',
      name: formData.name || '李明',
      email: formData.email,
      level: 4,
      xp: 2890,
      streakDays: 12,
      totalWords: 2450,
      createdAt: new Date().toISOString(),
    });
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-1 min-h-screen">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary overflow-hidden items-center justify-center p-12 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-900 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        
        <div className="relative z-10 max-w-lg flex flex-col gap-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-4xl">language</span>
            <h1 className="text-3xl font-bold tracking-tight">LinguaAI</h1>
          </div>
          
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight">
            开启您的<br/>
            <span className="text-blue-200">AI驱动</span> 语言学习之旅
          </h2>
          
          <p className="text-blue-100 text-lg leading-relaxed">
            加入超过 200 万东亚学习者的社区。通过个性化 AI 辅导、游戏化挑战以及实时社交互动，让英语学习变得自然而有趣。
          </p>
          
          <div className="grid grid-cols-2 gap-6 mt-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <span className="material-symbols-outlined text-3xl mb-2 text-blue-200">psychology</span>
              <h3 className="font-bold text-lg">智能适应</h3>
              <p className="text-sm text-blue-100 opacity-80">根据您的进度实时调整课程难度。</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <span className="material-symbols-outlined text-3xl mb-2 text-blue-200">groups</span>
              <h3 className="font-bold text-lg">社交互动</h3>
              <p className="text-sm text-blue-100 opacity-80">与志同道合的学习伙伴一起练习口语。</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-8 text-sm font-medium text-blue-200">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-primary bg-gradient-to-br from-blue-400 to-blue-600" />
              ))}
            </div>
            <span>已有 500+ 新用户今日加入</span>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 relative bg-white dark:bg-background-dark">
        {/* Theme Toggle */}
        <div className="absolute top-6 right-6">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined dark:hidden">dark_mode</span>
            <span className="material-symbols-outlined hidden dark:block">light_mode</span>
          </button>
        </div>

        {/* Mobile Logo */}
        <div className="lg:hidden flex justify-center mb-6">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-3xl">language</span>
            <h2 className="text-2xl font-bold">LinguaAI</h2>
          </div>
        </div>

        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {isLogin ? '欢迎回来' : '创建账号'}
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              {isLogin ? '还没有账号？' : '已有账号？'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-primary hover:text-blue-600 transition-colors ml-1"
              >
                {isLogin ? '免费注册' : '立即登录'}
              </button>
            </p>
          </div>

          {/* Social Login */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <button className="flex items-center justify-center py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group relative overflow-hidden">
                <span className="material-symbols-outlined text-[#07C160] text-2xl z-10">chat_bubble</span>
                <div className="absolute inset-0 bg-[#07C160]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              <button className="flex items-center justify-center py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group relative overflow-hidden">
                <span className="material-symbols-outlined text-[#06C755] text-2xl z-10">forum</span>
                <div className="absolute inset-0 bg-[#06C755]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              <button className="flex items-center justify-center py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group relative overflow-hidden">
                <span className="material-symbols-outlined text-[#FEE500] text-2xl z-10 bg-black rounded-full">sms</span>
                <div className="absolute inset-0 bg-[#FEE500]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-background-dark text-slate-500">或者使用邮箱登录</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">姓名</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <span className="material-symbols-outlined text-[20px]">person</span>
                    </div>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-[#1a2632] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow sm:text-sm"
                      placeholder="请输入姓名"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">电子邮箱</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-[#1a2632] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow sm:text-sm"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">密码</label>
                  {isLogin && (
                    <div className="text-sm">
                      <a className="font-medium text-primary hover:text-blue-600" href="#">忘记密码？</a>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="block w-full pl-10 pr-10 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-[#1a2632] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow sm:text-sm"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
                    记住我
                  </label>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                {isLogin ? '登录' : '注册'}
              </button>
            </form>
          </div>

          <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-6">
            {isLogin ? '登录' : '注册'}即表示您同意我们的
            <a className="underline hover:text-slate-800 dark:hover:text-slate-200" href="#">服务条款</a>
            和
            <a className="underline hover:text-slate-800 dark:hover:text-slate-200" href="#">隐私政策</a>
          </p>
        </div>

        {/* Mobile Footer */}
        <div className="mt-8 lg:hidden flex gap-4 text-sm text-slate-400 justify-center">
          <Link to="/" className="hover:text-primary">返回首页</Link>
        </div>
      </div>
    </div>
  );
}
