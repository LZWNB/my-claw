import { Share2 } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description: string;
  showShareButton?: boolean;
}

export function PageHeader({ title, description, showShareButton = true }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
      <div>
        <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">
          {title}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base font-normal mt-2">{description}</p>
      </div>

      {showShareButton && (
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
            <Share2 className="w-4 h-4" />
            分享进度
          </button>
        </div>
      )}
    </div>
  );
}
