import { Diamond } from 'lucide-react';

interface ProCardProps {
  planName: string;
  billingCycle: string;
  daysRemaining: number;
  nextBillingDate: string;
}

export function ProCard({
  planName,
  billingCycle,
  daysRemaining,
  nextBillingDate,
}: ProCardProps) {
  return (
    <div className="bg-gradient-to-br from-[#1a2632] to-[#101922] text-white rounded-xl p-6 shadow-lg border border-slate-700 relative overflow-hidden">
      {/* Background Icon */}
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Diamond className="w-32 h-32" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg text-white">{planName}</h3>
            <p className="text-xs text-slate-400">{billingCycle}</p>
          </div>
          <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] font-bold px-2 py-1 rounded uppercase">
            活跃
          </span>
        </div>

        {/* Days Remaining */}
        <div className="text-3xl font-bold mb-1">
          {daysRemaining} <span className="text-sm font-normal text-slate-400">天剩余</span>
        </div>
        <p className="text-xs text-slate-400 mb-6">下次扣费日期: {nextBillingDate}</p>

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <button className="w-full py-2 bg-white text-slate-900 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors">
            管理订阅
          </button>
          <button className="w-full py-2 bg-transparent border border-slate-600 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
            查看发票
          </button>
        </div>
      </div>
    </div>
  );
}
