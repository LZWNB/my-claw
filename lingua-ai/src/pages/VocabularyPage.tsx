import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Search,
  Volume2,
  Check,
  Bookmark,
  TrendingUp,
  Hash,
  ChevronRight,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';

export function VocabularyPage() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: t('vocabulary.all') },
    { id: 'business', label: t('vocabulary.business') },
    { id: 'travel', label: t('vocabulary.travel') },
    { id: 'academic', label: t('vocabulary.academic') },
    { id: 'daily', label: t('vocabulary.daily') },
  ];

  const words = [
    {
      id: 1,
      word: 'Serendipity',
      phonetic: '/ˌser.ənˈdɪp.ə.ti/',
      partOfSpeech: 'noun',
      level: 'B2',
      definition: 'The occurrence and development of events by chance in a happy or beneficial way.',
      translation: '意外发现珍奇事物的本领；机缘巧合',
      mastered: true,
    },
    {
      id: 2,
      word: 'Ephemeral',
      phonetic: '/ɪˈfem.ər.əl/',
      partOfSpeech: 'adjective',
      level: 'C1',
      definition: 'Lasting for a very short time.',
      translation: '短暂的；瞬息的',
      mastered: true,
    },
    {
      id: 3,
      word: 'Ubiquitous',
      phonetic: '/juːˈbɪk.wɪ.təs/',
      partOfSpeech: 'adjective',
      level: 'C2',
      definition: 'Present, appearing, or found everywhere.',
      translation: '无所不在的；普遍存在的',
      mastered: false,
    },
    {
      id: 4,
      word: 'Eloquent',
      phonetic: '/ˈel.ə.kwənt/',
      partOfSpeech: 'adjective',
      level: 'B2',
      definition: 'Fluent or persuasive in speaking or writing.',
      translation: '雄辩的；有口才的',
      mastered: true,
    },
  ];

  const trends = [
    { rank: 1, word: 'Resilience', change: '+12%' },
    { rank: 2, word: 'Sustainable', change: '+8%' },
    { rank: 3, word: 'Innovation', change: '+5%' },
    { rank: 4, word: 'Authentic', change: '+4%' },
  ];

  const tags = ['#TOEIC', '#商务英语', '#旅行短语', '#俚语'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {t('vocabulary.title')}
              </h1>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('vocabulary.search')}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Volume2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Words List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('vocabulary.saved')}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{t('vocabulary.sortBy')}</span>
                  <select className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1 bg-white dark:bg-gray-800">
                    <option>{t('vocabulary.recentlyAdded')}</option>
                  </select>
                </div>
              </div>

              {words.map((word) => (
                <div
                  key={word.id}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {word.word}
                        </h3>
                        <span className="text-sm text-gray-500 italic">{word.phonetic}</span>
                        <span className="text-xs text-gray-400">{word.partOfSpeech}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          word.level === 'B2' ? 'bg-blue-100 text-blue-600' :
                          word.level === 'C1' ? 'bg-orange-100 text-orange-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          {word.level}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">{word.definition}</p>
                      <p className="text-gray-500 dark:text-gray-400">{word.translation}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Volume2 className="w-5 h-5 text-blue-600" />
                      </button>
                      <button className={`p-2 rounded-lg ${
                        word.mastered
                          ? 'bg-green-100 text-green-600'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400'
                      }`}>
                        <Check className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
                        <Bookmark className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2">
              <button className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800">
                &lt;
              </button>
              <button className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                1
              </button>
              <button className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800">
                2
              </button>
              <button className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800">
                3
              </button>
              <span className="w-10 h-10 flex items-center justify-center">...</span>
              <button className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800">
                12
              </button>
              <button className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800">
                &gt;
              </button>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Daily Challenge */}
            <div className="bg-blue-600 rounded-2xl p-6 text-white">
              <h3 className="font-semibold mb-1">{t('vocabulary.dailyChallenge')}</h3>
              <p className="text-sm text-blue-100 mb-4">{t('vocabulary.todayChallenge')}</p>
              <button className="w-full py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                {t('vocabulary.startNow')}
              </button>
            </div>

            {/* Weekly Trends */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t('vocabulary.weeklyTrend')}
                </h3>
                <TrendingUp className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {trends.map((trend) => (
                  <div key={trend.rank} className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-sm font-bold ${
                      trend.rank === 1 ? 'bg-orange-100 text-orange-600' :
                      trend.rank === 2 ? 'bg-blue-100 text-blue-600' :
                      trend.rank === 3 ? 'bg-purple-100 text-purple-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {String(trend.rank).padStart(2, '0')}
                    </span>
                    <span className="flex-1 text-gray-900 dark:text-white font-medium">
                      {trend.word}
                    </span>
                    <span className="text-sm text-green-600">{trend.change}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-4">
                <Hash className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t('vocabulary.popularTags')}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
