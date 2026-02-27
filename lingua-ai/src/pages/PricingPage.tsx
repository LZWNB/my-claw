import { useTranslation } from 'react-i18next';
import {
  Check,
  X,
  Sparkles,
  ArrowRight,
  Shield,
  Clock,
  HelpCircle,
} from 'lucide-react';
import { useState } from 'react';

// Pricing Card Component
function PricingCard({
  name,
  price,
  period,
  description,
  features,
  notIncluded,
  popular,
  buttonText,
  onSelect,
}: {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  notIncluded?: string[];
  popular?: boolean;
  buttonText: string;
  onSelect: () => void;
}) {
  return (
    <div
      className={`
        relative rounded-2xl p-6 transition-all duration-300
        ${popular
          ? 'bg-surface-light dark:bg-surface-dark border-2 border-primary shadow-xl shadow-primary/20 scale-105 z-10'
          : 'bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:shadow-lg'
        }
      `}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-sm font-medium rounded-full flex items-center gap-1">
          <Sparkles className="w-4 h-4" />
          最受欢迎
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-text-main dark:text-text-main-dark">{name}</h3>
        <p className="text-sm text-text-secondary dark:text-text-secondary-dark mt-1">{description}</p>
        <div className="mt-4">
          <span className="text-4xl font-bold text-text-main dark:text-text-main-dark">{price}</span>
          <span className="text-text-secondary dark:text-text-secondary-dark">/{period}</span>
        </div>
      </div>

      <button
        onClick={onSelect}
        className={`
          w-full py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2
          ${popular
            ? 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/30'
            : 'bg-background-light dark:bg-card-dark text-text-main dark:text-text-main-dark hover:bg-primary/5 dark:hover:bg-primary/10 border border-border-light dark:border-border-dark'
          }
        `}
      >
        {buttonText}
        <ArrowRight className="w-4 h-4" />
      </button>

      <div className="mt-6 space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 text-green-600" />
            </div>
            <span className="text-sm text-text-main dark:text-text-main-dark">{feature}</span>
          </div>
        ))}
        {notIncluded?.map((feature, index) => (
          <div key={`not-${index}`} className="flex items-center gap-3 opacity-50">
            <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
              <X className="w-3 h-3 text-gray-400" />
            </div>
            <span className="text-sm text-text-secondary dark:text-text-secondary-dark">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border-light dark:border-border-dark last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <span className="font-medium text-text-main dark:text-text-main-dark">{question}</span>
        <div className={`w-6 h-6 rounded-full bg-background-light dark:bg-card-dark flex items-center justify-center transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <ArrowRight className="w-4 h-4 text-text-secondary dark:text-text-secondary-dark rotate-90" />
        </div>
      </button>
      {isOpen && (
        <div className="pb-4 text-sm text-text-secondary dark:text-text-secondary-dark leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'free',
      name: '免费版',
      price: '¥0',
      period: '永久',
      description: '适合初学者体验',
      features: [
        '每日5次AI对话',
        '基础词汇库访问',
        '学习进度追踪',
        '社区访问权限',
      ],
      notIncluded: [
        '高级AI纠错',
        '离线学习模式',
        '个性化学习路径',
      ],
      buttonText: '开始使用',
    },
    {
      id: 'pro',
      name: 'Pro版',
      price: billingCycle === 'monthly' ? '¥29' : '¥19',
      period: billingCycle === 'monthly' ? '月' : '月',
      description: '适合认真学习者',
      features: [
        '无限AI对话',
        '完整词汇库访问',
        '高级AI纠错',
        '个性化学习路径',
        '详细学习统计',
        '优先客服支持',
      ],
      buttonText: '升级Pro',
      popular: true,
    },
    {
      id: 'premium',
      name: 'Premium版',
      price: billingCycle === 'monthly' ? '¥59' : '¥39',
      period: billingCycle === 'monthly' ? '月' : '月',
      description: '适合进阶学习者',
      features: [
        'Pro版全部功能',
        '1对1 AI私教',
        '离线学习模式',
        '多设备同步',
        '专属学习报告',
        '早鸟新功能',
        '专属客服通道',
      ],
      buttonText: '升级Premium',
    },
  ];

  const faqs = [
    {
      question: '我可以随时取消订阅吗？',
      answer: '是的，您可以随时取消订阅。取消后，您仍可使用已付费期间的全部功能，直到订阅期结束。',
    },
    {
      question: '免费版和付费版有什么区别？',
      answer: '免费版提供基础功能，包括每日5次AI对话和基础词汇库。付费版提供无限AI对话、高级纠错、个性化学习路径等高级功能。',
    },
    {
      question: '年付和月付有什么区别？',
      answer: '年付可以享受约35%的折扣优惠，同时获得所有Pro/Premium功能。我们建议长期学习的用户选择年付方案。',
    },
    {
      question: '支持哪些支付方式？',
      answer: '我们支持支付宝、微信支付、银联卡等主流支付方式。所有支付均通过安全加密通道处理。',
    },
    {
      question: '有学生优惠吗？',
      answer: '是的！我们为学生提供额外20%的优惠。请使用您的.edu邮箱注册或联系客服验证学生身份。',
    },
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="#/" className="text-xl font-bold text-primary">LinguaAI</a>
            <a
              href="#/dashboard"
              className="px-4 py-2 rounded-xl text-text-main dark:text-text-main-dark hover:bg-background-light dark:hover:bg-card-dark transition-colors"
            >
              返回应用
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-main dark:text-text-main-dark mb-4">
            选择适合您的学习方案
          </h1>
          <p className="text-lg text-text-secondary dark:text-text-secondary-dark max-w-2xl mx-auto">
            无论您是初学者还是进阶学习者，我们都有适合您的方案。所有付费方案均可免费试用7天。
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-xl font-medium transition-all ${
              billingCycle === 'monthly'
                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                : 'text-text-secondary dark:text-text-secondary-dark hover:text-text-main dark:hover:text-text-main-dark'
            }`}
          >
            月付
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
              billingCycle === 'yearly'
                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                : 'text-text-secondary dark:text-text-secondary-dark hover:text-text-main dark:hover:text-text-main-dark'
            }`}
          >
            年付
            <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">省35%</span>
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 items-start">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              {...plan}
              onSelect={() => setSelectedPlan(plan.id)}
            />
          ))}
        </div>

        {/* Features Comparison */}
        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-8 border border-border-light dark:border-border-dark mb-16">
          <h2 className="text-2xl font-bold text-text-main dark:text-text-main-dark text-center mb-8">
            功能对比
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-light dark:border-border-dark">
                  <th className="text-left py-4 font-medium text-text-secondary dark:text-text-secondary-dark">功能</th>
                  <th className="text-center py-4 font-medium text-text-secondary dark:text-text-secondary-dark">免费版</th>
                  <th className="text-center py-4 font-medium text-primary">Pro版</th>
                  <th className="text-center py-4 font-medium text-text-secondary dark:text-text-secondary-dark">Premium版</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { name: 'AI对话次数', free: '5次/天', pro: '无限', premium: '无限' },
                  { name: '词汇库', free: '基础', pro: '完整', premium: '完整' },
                  { name: 'AI纠错', free: '基础', pro: '高级', premium: '高级' },
                  { name: '学习路径', free: '标准', pro: '个性化', premium: '个性化' },
                  { name: '学习统计', free: '基础', pro: '详细', premium: '详细+报告' },
                  { name: '离线模式', free: false, pro: false, premium: true },
                  { name: '1对1 AI私教', free: false, pro: false, premium: true },
                  { name: '多设备同步', free: '2台', pro: '3台', premium: '无限' },
                  { name: '客服支持', free: '社区', pro: '优先', premium: '专属' },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-border-light dark:border-border-dark last:border-0">
                    <td className="py-4 text-text-main dark:text-text-main-dark">{row.name}</td>
                    <td className="py-4 text-center">
                      {typeof row.free === 'boolean' ? (
                        row.free ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-text-secondary dark:text-text-secondary-dark">{row.free}</span>
                      )}
                    </td>
                    <td className="py-4 text-center bg-primary/5 dark:bg-primary/10">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-primary font-medium">{row.pro}</span>
                      )}
                    </td>
                    <td className="py-4 text-center">
                      {typeof row.premium === 'boolean' ? (
                        row.premium ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-text-secondary dark:text-text-secondary-dark">{row.premium}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-text-main dark:text-text-main-dark">安全支付</h4>
              <p className="text-sm text-text-secondary dark:text-text-secondary-dark">256位SSL加密保护</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-text-main dark:text-text-main-dark">7天免费试用</h4>
              <p className="text-sm text-text-secondary dark:text-text-secondary-dark">不满意随时取消</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-text-main dark:text-text-main-dark">24/7 客服支持</h4>
              <p className="text-sm text-text-secondary dark:text-text-secondary-dark">随时为您解答问题</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-8 border border-border-light dark:border-border-dark">
          <h2 className="text-2xl font-bold text-text-main dark:text-text-main-dark text-center mb-8">
            常见问题
          </h2>
          <div className="max-w-2xl mx-auto">
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
