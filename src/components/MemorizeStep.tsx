import React, { useState, useEffect } from 'react';
import { Word } from '../types';
import { WordCard } from './WordCard';
import { ChevronLeft, ChevronRight, CheckCircle2, Eye, Keyboard, Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { speak, playCorrectSound, playIncorrectSound } from '../services/speechService';

interface MemorizeStepProps {
  words: Word[];
  onComplete: () => void;
}

type Mode = 'recall' | 'spell' | 'listen';

export const MemorizeStep: React.FC<MemorizeStepProps> = ({ words, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<Mode>('recall');
  const [showMeaning, setShowMeaning] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentWord = words[currentIndex];

  // Auto-pronounce word when it changes in recall mode
  useEffect(() => {
    if (mode === 'recall') {
      speak(currentWord.word);
    }
  }, [currentIndex, mode, currentWord.word]);

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowMeaning(false);
      setUserInput('');
      setIsCorrect(null);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowMeaning(false);
      setUserInput('');
      setIsCorrect(null);
    }
  };

  const checkSpell = () => {
    const correct = userInput.toLowerCase().trim() === currentWord.word.toLowerCase();
    setIsCorrect(correct);
    if (correct) {
      playCorrectSound();
      setShowMeaning(true);
    } else {
      playIncorrectSound();
    }
  };

  const handleListen = () => {
    speak(currentWord.word);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto px-4">
      {/* Mode Selector */}
      <div className="flex justify-center gap-2 p-1 bg-slate-100 rounded-xl self-center">
        <button
          onClick={() => setMode('recall')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            mode === 'recall' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Eye size={16} />
          <span>看词忆义</span>
        </button>
        <button
          onClick={() => setMode('spell')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            mode === 'spell' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Keyboard size={16} />
          <span>看义拼词</span>
        </button>
        <button
          onClick={() => setMode('listen')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            mode === 'listen' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Headphones size={16} />
          <span>听音辨词</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
          className="bg-blue-500 h-full"
        />
      </div>

      {/* Content Area */}
      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex + mode}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col items-center gap-6"
          >
            {mode === 'recall' && (
              <>
                <WordCard word={currentWord} showDetails={showMeaning} />
                {!showMeaning ? (
                  <button
                    onClick={() => setShowMeaning(true)}
                    className="mt-4 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
                  >
                    查看释义 & 考点
                  </button>
                ) : (
                  <div className="flex gap-4">
                    <button onClick={handlePrev} disabled={currentIndex === 0} className="p-3 bg-slate-100 text-slate-400 rounded-xl disabled:opacity-50">
                      <ChevronLeft size={24} />
                    </button>
                    <button onClick={handleNext} className="px-8 py-3 bg-green-600 text-white rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 transition-all flex items-center gap-2">
                      <span>{currentIndex === words.length - 1 ? '完成背诵' : '下一个'}</span>
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            )}

            {mode === 'spell' && (
              <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-6">
                <div className="text-center">
                  <span className="text-blue-600 font-bold italic text-lg">{currentWord.partOfSpeech}</span>
                  <p className="text-2xl font-bold text-slate-800 mt-2">{currentWord.meanings.join('；')}</p>
                </div>

                <div className="w-full space-y-4">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="输入单词..."
                    className={`w-full text-center text-3xl font-bold py-4 border-b-4 focus:outline-none transition-colors ${
                      isCorrect === true ? 'border-green-500 text-green-600' :
                      isCorrect === false ? 'border-red-500 text-red-600' : 'border-slate-200 focus:border-blue-500'
                    }`}
                    onKeyDown={(e) => e.key === 'Enter' && checkSpell()}
                  />
                  {isCorrect === false && (
                    <p className="text-red-500 text-center font-medium">拼写错误，再试一次！</p>
                  )}
                </div>

                {isCorrect === true ? (
                  <div className="w-full space-y-6">
                    <div className="flex items-center justify-center gap-2 text-green-600 font-bold">
                      <CheckCircle2 size={24} />
                      <span>拼写正确！</span>
                    </div>
                    <WordCard word={currentWord} />
                    <button onClick={handleNext} className="w-full py-4 bg-green-600 text-white rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 transition-all">
                      继续下一个
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={checkSpell}
                    className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                  >
                    检查拼写
                  </button>
                )}
              </div>
            )}

            {mode === 'listen' && (
              <div className="w-full max-w-md bg-white p-12 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-8">
                <button 
                  onClick={handleListen}
                  className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-100 transition-all active:scale-90 shadow-inner group"
                >
                  <Headphones size={48} className="group-active:scale-110 transition-transform" />
                </button>
                <p className="text-slate-500 font-medium">点击图标朗读单词</p>

                {!showMeaning ? (
                  <button
                    onClick={() => setShowMeaning(true)}
                    className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                  >
                    查看释义 & 考点
                  </button>
                ) : (
                  <div className="w-full space-y-6">
                    <WordCard word={currentWord} />
                    <button onClick={handleNext} className="w-full py-4 bg-green-600 text-white rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 transition-all">
                      继续下一个
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
