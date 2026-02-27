import { useState } from 'react';
import { Mic, Play, Pause, Volume2, CheckCircle, XCircle, RotateCcw, ArrowRight, Headphones } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from './Footer';

const words = [
  { id: 1, word: 'Ephemeral', phonetic: '/ɪˈfemərəl/', meaning: '短暂的，瞬息的', example: 'The beauty of the sunset was ephemeral, lasting only a few minutes.' },
  { id: 2, word: 'Serendipity', phonetic: '/ˌserənˈdɪpəti/', meaning: '意外发现珍奇事物的运气', example: 'Finding this restaurant was pure serendipity.' },
  { id: 3, word: 'Epiphany', phonetic: '/ɪˈpɪfəni/', meaning: '顿悟，突然的感悟', example: 'He had an epiphany about his career path during the trip.' },
];

export function DictationPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [progress, setProgress] = useState(33);

  const currentWord = words[currentIndex];

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // Simulate audio playback
    setTimeout(() => setIsPlaying(false), 2000);
  };

  const handleSubmit = () => {
    const correct = userInput.toLowerCase().trim() === currentWord.word.toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserInput('');
      setShowResult(false);
      setProgress(((currentIndex + 2) / words.length) * 100);
    }
  };

  const handleRetry = () => {
    setUserInput('');
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#101922] flex flex-col">
      <Header />

      <main className="flex-1 flex justify-center py-8 px-4 md:px-10">
        <div className="w-full max-w-[800px] flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Headphones className="w-6 h-6 text-[#137fec]" />
              <h1 className="text-slate-900 dark:text-white text-2xl md:text-3xl font-black leading-tight tracking-[-0.033em]">
                单词听写
              </h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-base">
              听音频，写出您听到的单词。共 {words.length} 题。
            </p>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#137fec] rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {currentIndex + 1} / {words.length}
            </span>
          </div>

          {/* Main Card */}
          <div className="bg-white dark:bg-[#1a2632] rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100 dark:border-slate-800">
            {/* Audio Player */}
            <div className="flex flex-col items-center gap-6 mb-10">
              <button
                onClick={handlePlay}
                className="size-20 rounded-full bg-[#137fec] hover:bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 transition-all hover:scale-105"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>

              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-slate-400" />
                <div className="w-32 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full bg-[#137fec] rounded-full transition-all ${isPlaying ? 'animate-pulse' : ''}`} style={{ width: isPlaying ? '100%' : '0%' }} />
                </div>
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400">点击播放按钮听单词</p>
            </div>

            {/* Input Area */}
            <div className="space-y-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="输入您听到的单词..."
                disabled={showResult}
                className="w-full text-center text-2xl md:text-3xl font-bold py-4 px-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#137fec] focus:ring-0 outline-none transition-colors disabled:opacity-50"
              />

              {!showResult ? (
                <button
                  onClick={handleSubmit}
                  disabled={!userInput.trim()}
                  className="w-full py-4 bg-[#137fec] hover:bg-blue-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all disabled:cursor-not-allowed"
                >
                  提交答案
                </button>
              ) : (
                <div className={`p-6 rounded-xl ${isCorrect ? 'bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30' : 'bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30'}`}>
                  <div className="flex items-start gap-4">
                    {isCorrect ? (
                      <CheckCircle className="w-8 h-8 text-green-500 shrink-0" />
                    ) : (
                      <XCircle className="w-8 h-8 text-red-500 shrink-0" />
                    )}

                    <div className="flex-1">
                      <p className={`text-lg font-bold ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                        {isCorrect ? '回答正确！' : '回答错误'}
                      </p>

                      <div className="mt-4 space-y-2">
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{currentWord.word}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{currentWord.phonetic}</p>
                        <p className="text-slate-700 dark:text-slate-300">{currentWord.meaning}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 italic">"{currentWord.example}"</p>
                      </div>

                      <div className="flex gap-3 mt-6">
                        {!isCorrect && (
                          <button
                            onClick={handleRetry}
                            className="flex-1 py-3 border-2 border-slate-200 dark:border-slate-700 hover:border-[#137fec] text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                          >
                            <RotateCcw className="w-4 h-4" />
                            再试一次
                          </button>
                        )}
                        <button
                          onClick={handleNext}
                          disabled={currentIndex >= words.length - 1}
                          className="flex-1 py-3 bg-[#137fec] hover:bg-blue-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                          {currentIndex >= words.length - 1 ? '已完成' : '下一题'}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default DictationPage;
