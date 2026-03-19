import React, { useState } from 'react';
import { Word } from '../types';
import { Sparkles, Share2, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ExpandStepProps {
  words: Word[];
  onComplete: () => void;
}

export const ExpandStep: React.FC<ExpandStepProps> = ({ words, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentWord = words[currentIndex];

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto px-4">
      {/* Progress */}
      <div className="flex justify-between items-center text-sm font-medium text-slate-500">
        <span>拓展环节 (4分钟)</span>
        <span>{currentIndex + 1} / {words.length}</span>
      </div>

      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
          className="bg-purple-500 h-full"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
        >
          <div className="flex items-center gap-2 mb-8 text-purple-600 font-bold">
            <Sparkles size={20} />
            <span>单词拓展 & 场景应用</span>
          </div>

          <div className="space-y-8">
            {/* Word Header */}
            <div className="flex items-baseline gap-4">
              <h3 className="text-3xl font-bold text-slate-900">{currentWord.word}</h3>
              <span className="text-slate-400 font-mono">{currentWord.phonetic}</span>
            </div>

            {/* Derivatives */}
            <section className="bg-purple-50 p-6 rounded-xl border border-purple-100">
              <div className="flex items-center gap-2 mb-4 text-purple-700 font-bold">
                <Share2 size={18} />
                <span>派生词 (中考写作加分项)</span>
              </div>
              <div className="grid gap-4">
                {currentWord.expansion.derivatives.map((d, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="font-bold text-purple-900 min-w-[80px]">{d.word}</span>
                    <span className="text-purple-600 italic text-sm">{d.pos}</span>
                    <span className="text-slate-600 text-sm">{d.meaning}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Scenario */}
            <section>
              <div className="flex items-center gap-2 mb-4 text-slate-700 font-bold">
                <MapPin size={18} className="text-blue-500" />
                <span>场景拓展：{currentWord.expansion.scenario.title}</span>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <p className="text-slate-700 font-medium mb-2">{currentWord.expansion.scenario.usage}</p>
                <p className="text-slate-500 italic text-sm">例句：{currentWord.expansion.scenario.example}</p>
              </div>
            </section>

            {/* Synonyms */}
            <section>
              <div className="flex items-center gap-2 mb-3 text-slate-400">
                <CheckCircle2 size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">同义替换</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentWord.expansion.synonyms.map((s, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </section>

            <button
              onClick={handleNext}
              className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all flex items-center justify-center gap-2"
            >
              <span>{currentIndex === words.length - 1 ? '完成今日学习' : '下一个'}</span>
              <ArrowRight size={20} />
            </button>
            
            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs mt-4">
              <CheckCircle2 size={14} className="text-green-500" />
              <span>已完成该词的深度拓展</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
