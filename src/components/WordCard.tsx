import React from 'react';
import { Word } from '../types';
import { Volume2, BookOpen, Target, Quote, Lightbulb, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { speak } from '../services/speechService';

interface WordCardProps {
  word: Word;
  showDetails?: boolean;
}

export const WordCard: React.FC<WordCardProps> = ({ word, showDetails = true }) => {
  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speak(word.word);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 max-w-md w-full mx-auto"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">{word.word}</h2>
          <div className="flex items-center gap-2 mt-1 text-slate-500">
            <span className="font-mono">{word.phonetic}</span>
            <button 
              onClick={handleSpeak}
              className="p-1 hover:bg-slate-100 rounded-full transition-colors group"
              title="播放发音"
            >
              <Volume2 size={18} className="text-blue-500 group-active:scale-125 transition-transform" />
            </button>
          </div>
          {word.inflections && (
            <div className="mt-2 flex gap-2 flex-wrap">
              {word.inflections.map((inf, idx) => (
                <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                  {inf}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-1 justify-end">
          {word.examPoint.format.map((f) => (
            <span key={f} className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-medium uppercase tracking-wider">
              {f}
            </span>
          ))}
        </div>
      </div>

      {showDetails && (
        <div className="space-y-6">
          {/* Meanings */}
          <section>
            <div className="flex items-center gap-2 mb-2 text-slate-400">
              <BookOpen size={16} />
              <span className="text-xs font-semibold uppercase tracking-widest">基础信息</span>
            </div>
            <div className="flex gap-2 items-baseline">
              <span className="text-blue-600 font-bold italic">{word.partOfSpeech}</span>
              <p className="text-slate-700 leading-relaxed">{word.meanings.join('；')}</p>
            </div>
          </section>

          {/* Exam Point */}
          <section className="bg-amber-50/50 p-4 rounded-xl border border-amber-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-amber-600">
                <Target size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">直击考点</span>
              </div>
              <button 
                onClick={() => speak(`考点：${word.examPoint.highFreqMeaning}。${word.examPoint.description}`)}
                className="p-1 hover:bg-amber-100 rounded-full transition-colors text-amber-500"
                title="朗读考点"
              >
                <Volume2 size={14} />
              </button>
            </div>
            <p className="text-amber-900 font-medium mb-1">高频：{word.examPoint.highFreqMeaning}</p>
            <p className="text-amber-800 text-sm mb-3">{word.examPoint.description}</p>
            {word.examPoint.phrases && (
              <div className="space-y-1.5">
                {word.examPoint.phrases.map((p, idx) => (
                  <div key={idx} className="flex gap-2 text-xs items-center">
                    <span className="font-bold text-amber-700 whitespace-nowrap">{p.phrase}</span>
                    <span className="text-slate-600">{p.meaning}</span>
                    <button 
                      onClick={() => speak(p.phrase)}
                      className="p-0.5 hover:bg-amber-100 rounded transition-colors text-amber-400"
                    >
                      <Volume2 size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Differentiation */}
          {word.differentiation && (
            <section className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-blue-600">
                  <HelpCircle size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">辨析卡片：{word.differentiation.title}</span>
                </div>
                <button 
                  onClick={() => speak(word.differentiation!.title)}
                  className="p-1 hover:bg-blue-100 rounded-full transition-colors text-blue-500"
                  title="朗读标题"
                >
                  <Volume2 size={14} />
                </button>
              </div>
              
              {word.differentiation.table && (
                <div className="overflow-hidden rounded-lg border border-blue-200 mb-3">
                  <table className="w-full text-[10px] text-left">
                    <thead className="bg-blue-100 text-blue-700">
                      <tr>
                        {word.differentiation.table.header.map((h, i) => (
                          <th key={i} className="px-2 py-1.5 font-bold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-blue-50">
                      {word.differentiation.table.rows.map((row, i) => (
                        <tr key={i}>
                          {row.map((cell, j) => (
                            <td key={j} className="px-2 py-1.5 text-slate-600">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-blue-800 text-xs leading-relaxed">
                  <span className="font-bold">核心区别：</span>{word.differentiation.difference}
                </p>
                <button 
                  onClick={() => speak(`核心区别：${word.differentiation!.difference}`)}
                  className="p-1 hover:bg-blue-100 rounded-full transition-colors text-blue-400 shrink-0"
                  title="朗读核心区别"
                >
                  <Volume2 size={12} />
                </button>
              </div>
              <div className="space-y-1">
                {word.differentiation.examples.map((ex, idx) => (
                  <div key={idx} className="text-[10px] text-slate-500 italic flex items-center justify-between gap-2">
                    <span>• {ex.sentence} ({ex.translation})</span>
                    <button 
                      onClick={() => speak(ex.sentence)}
                      className="p-0.5 hover:bg-blue-100 rounded transition-colors text-blue-300"
                    >
                      <Volume2 size={10} />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Real Sentence */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Quote size={16} />
                <span className="text-xs font-semibold uppercase tracking-widest">真题例句 ({word.realSentences[0].source})</span>
              </div>
              <button 
                onClick={() => speak(word.realSentences[0].sentence)}
                className="p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                title="朗读例句"
              >
                <Volume2 size={14} />
              </button>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border-l-4 border-slate-300">
              <p className="text-slate-800 font-medium mb-1">{word.realSentences[0].sentence}</p>
              <p className="text-slate-500 text-sm">{word.realSentences[0].translation}</p>
              <div className="mt-2 text-[11px] text-blue-600/70 font-medium">
                解析：{word.realSentences[0].analysis}
              </div>
            </div>
          </section>

          {/* Core Patterns */}
          <section>
            <div className="flex items-center gap-2 mb-2 text-slate-400">
              <Lightbulb size={16} />
              <span className="text-xs font-semibold uppercase tracking-widest">核心句型</span>
            </div>
            <ul className="space-y-2">
              {word.corePatterns.map((p, idx) => (
                <li key={idx} className="text-sm flex items-start justify-between gap-4 group">
                  <div>
                    <div className="font-bold text-slate-700">{p.pattern}</div>
                    <div className="text-slate-500 italic">{p.example}</div>
                  </div>
                  <button 
                    onClick={() => speak(`${p.pattern}。${p.example}`)}
                    className="p-1.5 hover:bg-slate-100 rounded-xl transition-colors text-slate-300 group-hover:text-blue-400"
                    title="朗读句型"
                  >
                    <Volume2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </motion.div>
  );
};
