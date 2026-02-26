import { useTranslation } from 'react-i18next';

const languages = [
  { name: '中文', sub: '简体' },
  { name: '繁體', sub: '繁体' },
  { name: '日本語', sub: '日语' },
  { name: '한국어', sub: '韩语' },
];

export function Localization() {
  return (
    <section className="bg-primary px-4 py-16 text-white sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="max-w-xl text-center md:text-left">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">为您量身定制的本地化支持</h2>
          <p className="mt-4 text-blue-100 text-lg">我们为简体中文、繁体中文、日语和韩语使用者提供专门的支持和本地化界面。</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {languages.map((lang) => (
            <div
              key={lang.name}
              className="flex flex-col items-center justify-center rounded-xl bg-white/10 p-4 backdrop-blur-sm transition-transform hover:-translate-y-1"
            >
              <span className="text-2xl font-bold">{lang.name}</span>
              <span className="text-xs text-blue-100">{lang.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
