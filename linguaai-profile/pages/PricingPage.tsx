import React, { useState } from 'react';
import {
  Menu,
  X,
  Check,
  X as XIcon,
  Sparkles,
  Users,
  Zap,
  Globe,
  Headphones,
  BookOpen,
  ArrowRight,
  Star,
  Crown,
  Heart
} from 'lucide-react';

// Types
interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  unavailableFeatures: string[];
  badge?: string;
  badgeColor?: string;
  isPopular?: boolean;
  isBestValue?: boolean;
  icon: React.ReactNode;
}

interface ComparisonFeature {
  name: string;
  free: string | boolean;
  pro: string | boolean;
  family: string | boolean;
}

// Data
const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: '免费入门版',
    price: '¥0',
    period: '永久',
    description: '适合初次体验AI翻译的用户',
    features: [
      '每月100次基础翻译',
      '支持5种常见语言',
      '标准翻译质量',
      '基础语法检查',
      '网页端使用'
    ],
    unavailableFeatures: [
      '高级AI润色',
      '离线翻译',
      'API接口',
      '优先客服支持'
    ],
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    id: 'pro',
    name: '个人专业版',
    price: '¥68',
    period: '月',
    description: '适合专业人士和语言学习者',
    features: [
      '无限次高级翻译',
      '支持50+种语言',
      'AI智能润色优化',
      '专业术语库',
      '离线翻译功能',
      '文档批量翻译',
      '优先客服支持'
    ],
    unavailableFeatures: [],
    badge: '最受欢迎',
    badgeColor: 'bg-[#D4AF37]',
    isPopular: true,
    icon: <Crown className="w-6 h-6" />
  },
  {
    id: 'family',
    name: '家庭版',
    price: '¥128',
    period: '月',
    description: '适合家庭和小团队使用',
    features: [
      '包含专业版全部功能',
      '5个独立账号',
      '家庭共享词库',
      '团队管理后台',
      'API接口访问',
      '专属客户经理',
      '定制化服务'
    ],
    unavailableFeatures: [],
    badge: '最具性价比',
    badgeColor: 'bg-[#137fec]',
    isBestValue: true,
    icon: <Users className="w-6 h-6" />
  }
];

const comparisonFeatures: ComparisonFeature[] = [
  { name: '每月翻译次数', free: '100次', pro: '无限次', family: '无限次' },
  { name: '支持语言数量', free: '5种', pro: '50+种', family: '50+种' },
  { name: 'AI智能润色', free: false, pro: true, family: true },
  { name: '专业术语库', free: false, pro: true, family: true },
  { name: '离线翻译', free: false, pro: true, family: true },
  { name: '文档批量翻译', free: false, pro: true, family: true },
  { name: '账号数量', free: '1个', pro: '1个', family: '5个' },
  { name: 'API接口', free: false, pro: false, family: true },
  { name: '客服支持', free: '基础', pro: '优先', family: '专属经理' },
  { name: '团队管理', free: false, pro: false, family: true }
];

// Components
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const navLinks = [
    { name: '首页', href: '#' },
    { name: '功能', href: '#' },
    { name: '价格', href: '#', active: true },
    { name: '文档', href: '#' },
    { name: '关于我们', href: '#' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#101922]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#137fec] rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Lingua<span className="text-[#137fec]">AI</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  link.active
                    ? 'text-[#137fec]'
                    : 'text-gray-600 dark:text-gray-300 hover:text-[#137fec] dark:hover:text-[#137fec]'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#137fec] dark:hover:text-[#137fec] transition-colors"
            >
              {isDark ? <Zap className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
            </button>
            <button className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#137fec] dark:hover:text-[#137fec] transition-colors">
              登录
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-[#137fec] rounded-lg hover:bg-[#0f6bc7] transition-colors">
              免费注册
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 dark:text-gray-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium ${
                    link.active
                      ? 'text-[#137fec]'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  登录
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-[#137fec] rounded-lg">
                  免费注册
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

const Hero: React.FC = () => {
  const [currency, setCurrency] = useState<'CNY' | 'USD'>('CNY');

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#f8fafc] to-white dark:from-[#101922] dark:to-[#0d141c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          选择适合您的<span className="text-[#137fec]">价格方案</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          无论是个人学习还是团队协作，我们都有适合您的方案。开始您的AI翻译之旅。
        </p>

        {/* Currency Toggle */}
        <div className="inline-flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <button
            onClick={() => setCurrency('CNY')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              currency === 'CNY'
                ? 'bg-white dark:bg-gray-700 text-[#137fec] shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            CNY ¥
          </button>
          <button
            onClick={() => setCurrency('USD')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              currency === 'USD'
                ? 'bg-white dark:bg-gray-700 text-[#137fec] shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            USD $
          </button>
        </div>
      </div>
    </section>
  );
};

const PricingCard: React.FC<{ plan: PricingPlan }> = ({ plan }) => {
  return (
    <div
      className={`relative bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-xl ${
        plan.isPopular
          ? 'border-2 border-[#D4AF37] shadow-lg scale-105 z-10'
          : plan.isBestValue
          ? 'border-2 border-[#137fec] shadow-lg'
          : 'border border-gray-200 dark:border-gray-700'
      }`}
    >
      {/* Badge */}
      {plan.badge && (
        <div
          className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 ${plan.badgeColor} text-white text-sm font-medium rounded-full flex items-center gap-1`}
        >
          <Star className="w-4 h-4" />
          {plan.badge}
        </div>
      )}

      {/* Icon & Name */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`p-3 rounded-xl ${
            plan.isPopular
              ? 'bg-[#D4AF37]/10 text-[#D4AF37]'
              : plan.isBestValue
              ? 'bg-[#137fec]/10 text-[#137fec]'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          {plan.icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{plan.description}</p>
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
        <span className="text-gray-500 dark:text-gray-400">/{plan.period}</span>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-600 dark:text-gray-300 text-sm">{feature}</span>
          </li>
        ))}
        {plan.unavailableFeatures.map((feature, index) => (
          <li key={`unavailable-${index}`} className="flex items-start gap-3 opacity-50">
            <XIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            <span className="text-gray-400 dark:text-gray-500 text-sm line-through">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        className={`w-full py-3 px-4 rounded-xl font-medium transition-all ${
          plan.isPopular
            ? 'bg-[#D4AF37] text-white hover:bg-[#c4a035]'
            : plan.isBestValue
            ? 'bg-[#137fec] text-white hover:bg-[#0f6bc7]'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        {plan.id === 'free' ? '免费开始' : '立即订阅'}
      </button>
    </div>
  );
};

const PricingSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-[#0d141c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ComparisonTable: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#f8fafc] dark:bg-[#101922]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            功能对比
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            详细了解各版本的功能差异，选择最适合您的方案
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  功能特性
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                  免费入门版
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-[#D4AF37]">
                  个人专业版
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-[#137fec]">
                  家庭版
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {comparisonFeatures.map((feature, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">
                    {feature.name}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {typeof feature.free === 'boolean' ? (
                      feature.free ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <XIcon className="w-5 h-5 text-gray-400 mx-auto" />
                      )
                    ) : (
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {feature.free}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10">
                    {typeof feature.pro === 'boolean' ? (
                      feature.pro ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <XIcon className="w-5 h-5 text-gray-400 mx-auto" />
                      )
                    ) : (
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {feature.pro}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center bg-[#137fec]/5 dark:bg-[#137fec]/10">
                    {typeof feature.family === 'boolean' ? (
                      feature.family ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <XIcon className="w-5 h-5 text-gray-400 mx-auto" />
                      )
                    ) : (
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {feature.family}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const CTASection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-[#137fec] to-[#0f6bc7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              教育优惠
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              课堂教学，从LinguaAI开始
            </h2>
            <p className="text-lg text-white/80 mb-8">
              为教育机构提供专属优惠，助力语言教学。支持批量账号管理、课程定制、
              学习进度追踪等功能。让AI成为您的教学助手。
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-white text-[#137fec] font-medium rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2">
                了解教育方案
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-6 py-3 bg-white/20 text-white font-medium rounded-xl hover:bg-white/30 transition-colors">
                联系销售团队
              </button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">教育机构专享</p>
                    <p className="text-white/60 text-sm">最高可享 50% 折扣</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    '批量账号管理',
                    '课程定制化服务',
                    '学习数据分析',
                    '专属技术支持',
                    '教师培训课程'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/90">
                      <Check className="w-5 h-5 text-white" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  const footerLinks = {
    product: {
      title: '产品',
      links: ['功能介绍', '价格方案', 'API文档', '更新日志', '路线图']
    },
    resources: {
      title: '资源',
      links: ['帮助中心', '使用教程', '博客', '社区', '开发者文档']
    },
    company: {
      title: '公司',
      links: ['关于我们', '联系我们', '加入我们', '合作伙伴', '媒体报道']
    },
    legal: {
      title: '法律',
      links: ['服务条款', '隐私政策', 'Cookie政策', '安全说明']
    }
  };

  return (
    <footer className="bg-[#101922] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#137fec] rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                Lingua<span className="text-[#137fec]">AI</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              智能翻译，连接世界。让语言不再是沟通的障碍。
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Headphones className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Heart className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © 2026 LinguaAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              服务条款
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              隐私政策
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Cookie设置
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Component
const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#101922] transition-colors">
      <Header />
      <main>
        <Hero />
        <PricingSection />
        <ComparisonTable />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
