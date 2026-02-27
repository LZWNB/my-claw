import { useTranslation } from 'react-i18next';
import {
  Headphones,
  Play,
  RotateCcw,
  Check,
  X,
  Volume2,
  Settings,
  Trophy,
  Clock,
  ChevronRight,
  Star,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '../stores/appStore';

// Progress Bar Component
function ProgressBar({ current, total }: { current: number; total: number }) {
  const progress = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-text-secondary dark:text-text-secondary-dark">进度</span>
        <span className="font-medium text-text-main dark:text-text-main-dark">{current} / {total}</span>
      </div>
      <div className="h-2 bg-background-light dark:bg-card-dark rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// Difficulty Badge Component
function DifficultyBadge({ level }: { level: 'easy' | 'medium' | 'hard' }) {
  const config = {
    easy: { color: 'green', text: '简单' },
    medium: { color: 'yellow', text: '中等' },
    hard: { color: 'red', text: '困难' },
  };

  const { color, text } = config[level];

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${color}-100 dark:bg-${color}-900/30 text-${color}-600`}>
      {text}
    </span>
  );
}

// Result Card Component
function ResultCard({ word, userAnswer, correct, onPlay }: {
  word: string;
  userAnswer: string;
  correct: boolean;
  onPlay: () => void;
}) {
  return (
    <div className={`p-4 rounded-xl border ${
      correct
        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
        : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onPlay}
            className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
          >
            <Volume2 className="w-5 h-5" />
          </button>
          <div>
            <p className="font-semibold text-text-main dark:text-text-main-dark">{word}</p>
            {!correct && (
              <p className="text-sm text-red-500">你的答案: {userAnswer || '(未填写)'}</p>
            )}
          </div>
        </div>
        <div className={correct ? 'text-green-500' : 'text-red-500'}>
          {correct ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
        </div>
      </div>
    </div>
  );
}

export function DictationPage() {
  const { stats, updateStats } = useAppStore();

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<Array<{ word: string; userAnswer: string; correct: boolean }>>([]);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 0.75 | 0.5>(1);
  const [showHint, setShowHint] = useState(false);

  // Mock dictation words
  const words = [
    { word: 'Serendipity', phonetic: '/ˌserənˈdɪpəti/', meaning: '意外发现珍奇事物的运气', difficulty: 'hard' as const },
    { word: 'Ephemeral', phonetic: '/ɪˈfemərəl/', meaning: '短暂的', difficulty: 'hard' as const },
    { word: 'Resilient', phonetic: '/rɪˈzɪliənt/', meaning: '有弹性的；能复原的', difficulty: 'medium' as const },
    { word: 'Eloquent', phonetic: '/ˈeləkwənt/', meaning: '雄辩的', difficulty: 'medium' as const },
    { word: 'Pragmatic', phonetic: '/præɡˈmætɪk/', meaning: '务实的', difficulty: 'medium' as const },
    { word: 'Ambiguous', phonetic: '/æmˈbɪɡjuəs/', meaning: '模棱两可的', difficulty: 'hard' as const },
    { word: 'Diligent', phonetic: '/ˈdɪlɪdʒənt/', meaning: '勤奋的', difficulty: 'easy' as const },
    { word: 'Enthusiastic', phonetic: '/ɪnˌθuːziˈæstɪk/', meaning: '热情的', difficulty: 'easy' as const },
    { word: 'Meticulous', phonetic: '/məˈtɪkjələs/', meaning: '一丝不苟的', difficulty: 'hard' as const },
    { word: 'Versatile', phonetic: '/ˈvɜːrsətl/', meaning: '多才多艺的', difficulty: 'medium' as const },
  ];

  const currentWord = words[currentWordIndex];

  const handlePlay = () => {
    setIsPlaying(true);
    // Simulate audio playback
    setTimeout(() => setIsPlaying(false), 2000 / playbackSpeed);
  };

  const handleSubmit = () => {
    const correct = userInput.toLowerCase().trim() === currentWord.word.toLowerCase();
    const newResult = {
      word: currentWord.word,
      userAnswer: userInput,
      correct,
    };
    setResults([...results, newResult]);
    setShowResult(true);

    setTimeout(() => {
      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1);
        setUserInput('');
        setShowResult(false);
        setShowHint(false);
      } else {
        setSessionComplete(true);
      }
    }, 1500);
  };

  const handleSkip = () => {
    const newResult = {
      word: currentWord.word,
      userAnswer: userInput,
      correct: false,
    };
    setResults([...results, newResult]);

    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setUserInput('');
      setShowHint(false);
    } else {
      setSessionComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentWordIndex(0);
    setUserInput('');
    setResults([]);
    setShowResult(false);
    setSessionComplete(false);
    setShowHint(false);
  };

  const correctCount = results.filter(r => r.correct).length;
  const accuracy = results.length > 0 ? Math.round((correctCount / results.length) * 100) : 0;

  if (sessionComplete) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <header className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white">
                  <Headphones className="w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold text-text-main dark:text-text-main-dark">单词听写</h1>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-8 border border-border-light dark:border-border-dark text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-text-main dark:text-text-main-dark mb-2">练习完成！</h2>
            <p className="text-text-secondary dark:text-text-secondary-dark mb-8">
              你完成了 {words.length} 个单词的听写练习
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-background-light dark:bg-card-dark">
                <div className="text-3xl font-bold text-primary">{correctCount}</div>
                <div className="text-sm text-text-secondary dark:text-text-secondary-dark">正确</div>
              </div>
              <div className="p-4 rounded-xl bg-background-light dark:bg-card-dark">
                <div className="text-3xl font-bold text-red-500">{words.length - correctCount}</div>
                <div className="text-sm text-text-secondary dark:text-text-secondary-dark">错误</div>
              </div>
              <div className="p-4 rounded-xl bg-background-light dark:bg-card-dark">
                <div className="text-3xl font-bold text-green-500">{accuracy}%</div>
                <div className="text-sm text-text-secondary dark:text-text-secondary-dark">正确率</div>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <h3 className="font-semibold text-text-main dark:text-text-main-dark text-left">详细结果</h3>
              {results.map((result, index) => (
                <ResultCard
                  key={index}
                  {...result}
                  onPlay={() => {}}
                />
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleRestart}
                className="flex-1 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                再练一次
              </button>
              <a
                href="#/dashboard"
                className="flex-1 py-3 rounded-xl border border-border-light dark:border-border-dark text-text-main dark:text-text-main-dark font-semibold hover:bg-background-light dark:hover:bg-card-dark transition-colors flex items-center justify-center gap-2"
              >
                返回首页
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-text-main dark:text-text-main-dark">单词听写</h1>
                <p className="text-sm text-text-secondary dark:text-text-secondary-dark">听音频，写出你听到的单词</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(Number(e.target.value) as 1 | 0.75 | 0.5)}
                className="px-3 py-2 rounded-xl bg-background-light dark:bg-card-dark border border-border-light dark:border-border-dark text-sm text-text-main dark:text-text-main-dark focus:outline-none focus:border-primary"
              >
                <option value={1}>1.0x</option>
                <option value={0.75}>0.75x</option>
                <option value={0.5}>0.5x</option>
              </select>
              <button className="p-2 rounded-xl hover:bg-background-light dark:hover:bg-card-dark transition-colors">
                <Settings className="w-5 h-5 text-text-secondary dark:text-text-secondary-dark" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark">
          {/* Progress */}
          <div className="mb-8">
            <ProgressBar current={currentWordIndex} total={words.length} />
          </div>

          {/* Word Info */}
          <div className="flex items-center justify-between mb-8">
            <DifficultyBadge level={currentWord.difficulty} />
            <div className="flex items-center gap-2 text-text-secondary dark:text-text-secondary-dark">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{Math.ceil((words.length - currentWordIndex) * 0.5)} 分钟</span>
            </div>
          </div>

          {/* Audio Player */}
          <div className="flex flex-col items-center mb-8">
            <button
              onClick={handlePlay}
              disabled={isPlaying}
              className={`
                w-24 h-24 rounded-full flex items-center justify-center mb-4 transition-all duration-300
                ${isPlaying
                  ? 'bg-primary/20 scale-95'
                  : 'bg-primary hover:bg-primary-dark shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40'
                }
              `}
            >
              {isPlaying ? (
                <div className="flex gap-1">
                  <div className="w-1.5 h-8 bg-primary rounded-full animate-pulse" />
                  <div className="w-1.5 h-8 bg-primary rounded-full animate-pulse delay-75" />
                  <div className="w-1.5 h-8 bg-primary rounded-full animate-pulse delay-150" />
                </div>
              ) : (
                <Play className="w-10 h-10 text-white ml-1" />
              )}
            </button>
            <p className="text-text-secondary dark:text-text-secondary-dark">
              {isPlaying ? '正在播放...' : '点击播放音频'}
            </p>
          </div>

          {/* Input Area */}
          <div className="mb-6">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="输入你听到的单词..."
              className={`
                w-full px-6 py-4 text-center text-2xl font-semibold rounded-xl border-2 transition-all duration-200
                ${showResult
                  ? userInput.toLowerCase().trim() === currentWord.word.toLowerCase()
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700'
                    : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700'
                  : 'border-border-light dark:border-border-dark bg-background-light dark:bg-card-dark text-text-main dark:text-text-main-dark focus:border-primary focus:outline-none'
                }
              `}
              disabled={showResult}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !showResult && userInput.trim()) {
                  handleSubmit();
                }
              }}
            />
          </div>

          {/* Hint */}
          {showHint && (
            <div className="mb-6 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300 mb-2">
                <AlertCircle className="w-4 h-4" />
                <span className="font-medium">提示</span>
              </div>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">
                音标: {currentWord.phonetic}
              </p>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">
                释义: {currentWord.meaning}
              </p>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-4 py-2 rounded-xl text-text-secondary dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-card-dark transition-colors flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              {showHint ? '隐藏提示' : '显示提示'}
            </button>

            <div className="flex gap-3">
              <button
                onClick={handleSkip}
                disabled={showResult}
                className="px-6 py-3 rounded-xl border border-border-light dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-card-dark transition-colors disabled:opacity-50"
              >
                跳过
              </button>
              <button
                onClick={handleSubmit}
                disabled={!userInput.trim() || showResult}
                className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                提交
              </button>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
            <Star className="w-5 h-5" />
            学习小贴士
          </h3>
          <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
            <li>• 先听完整音频，再尝试拼写</li>
            <li>• 注意单词的重音和音节划分</li>
            <li>• 可以使用提示功能查看音标</li>
            <li>• 每天坚持练习，提高听力辨音能力</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
