import React, { useState } from 'react';
import { StudyPhase, Word } from './types';
import { SPARK_VOCABULARY } from './data/vocabulary';
import { Timer } from './components/Timer';
import { MemorizeStep } from './components/MemorizeStep';
import { TestStep } from './components/TestStep';
import { ExpandStep } from './components/ExpandStep';
import { Dashboard } from './components/Dashboard';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, ArrowRight, Home, BarChart3 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [phase, setPhase] = useState<StudyPhase>(StudyPhase.REVIEW);
  const [sessionWords, setSessionWords] = useState<Word[]>([]);
  const [sessionScore, setSessionScore] = useState(0);
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  // Mock stats for dashboard
  const [stats, setStats] = useState({
    mastered: 42,
    toReview: 18,
    focus: 6,
    dailyProgress: [
      { day: '周一', count: 12 },
      { day: '周二', count: 15 },
      { day: '周三', count: 10 },
      { day: '周四', count: 18 },
      { day: '周五', count: 14 },
      { day: '周六', count: 22 },
      { day: '今日', count: 0 },
    ],
    examCoverage: 68,
    streak: 7,
  });

  const startStudy = () => {
    // In a real app, we'd fetch 15-20 words based on mastery
    setSessionWords(SPARK_VOCABULARY);
    setPhase(StudyPhase.MEMORIZE);
    setIsSessionComplete(false);
    setSessionScore(0);
  };

  const completeMemorize = () => setPhase(StudyPhase.TEST);
  const completeTest = (score: number) => {
    setSessionScore(score);
    setPhase(StudyPhase.EXPAND);
  };
  const completeExpand = () => {
    setIsSessionComplete(true);
    setPhase(StudyPhase.REVIEW);
    
    // Update stats
    setStats(prev => ({
      ...prev,
      mastered: prev.mastered + 3,
      dailyProgress: prev.dailyProgress.map((d, i) => 
        i === prev.dailyProgress.length - 1 ? { ...d, count: sessionWords.length } : d
      )
    }));

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation / Header */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl">S</div>
            <span className="font-black text-slate-800 tracking-tight">SPARK ENGLISH</span>
          </div>
          
          {phase !== StudyPhase.REVIEW && !isSessionComplete && (
            <Timer totalSeconds={1200} onTimeUp={() => {}} />
          )}

          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                setPhase(StudyPhase.REVIEW);
                setIsSessionComplete(false);
              }}
              className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
            >
              <Home size={20} />
            </button>
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <BarChart3 size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="py-8">
        <AnimatePresence mode="wait">
          {isSessionComplete ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto text-center px-4 py-12"
            >
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <Trophy size={48} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">今日学习达成！</h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                今日掌握 {sessionWords.length} 个中考核心词，累计打卡 {stats.streak} 天，单词量稳步提升！
              </p>
              
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-8 space-y-6">
                <div className="flex justify-around items-center">
                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">自测得分</p>
                    <p className="text-3xl font-black text-blue-600">{sessionScore}/{sessionWords.length}</p>
                  </div>
                  <div className="w-px h-12 bg-slate-100" />
                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">学习时长</p>
                    <p className="text-3xl font-black text-slate-900">20:00</p>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-slate-50 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">真题考点覆盖率</span>
                    <span className="font-bold text-blue-600">+{Math.floor(Math.random() * 5) + 2}%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">辨析类题目正确率</span>
                    <span className="font-bold text-green-600">100%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">累计掌握单词</span>
                    <span className="font-bold text-slate-900">{stats.mastered} 词</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsSessionComplete(false)}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                <span>回到主页</span>
                <ArrowRight size={20} />
              </button>
            </motion.div>
          ) : phase === StudyPhase.REVIEW ? (
            <Dashboard key="dashboard" onStartStudy={startStudy} stats={stats} />
          ) : (
            <div className="max-w-4xl mx-auto">
              {/* Phase Indicator */}
              <div className="flex justify-center gap-8 mb-12">
                {[
                  { id: StudyPhase.MEMORIZE, label: '背诵 (10\')' },
                  { id: StudyPhase.TEST, label: '自测 (6\')' },
                  { id: StudyPhase.EXPAND, label: '拓展 (4\')' },
                ].map((p) => (
                  <div key={p.id} className="flex flex-col items-center gap-2">
                    <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      phase === p.id ? 'bg-blue-600 scale-125 shadow-[0_0_10px_rgba(37,99,235,0.5)]' : 
                      (phase === StudyPhase.TEST && p.id === StudyPhase.MEMORIZE) || 
                      (phase === StudyPhase.EXPAND && (p.id === StudyPhase.MEMORIZE || p.id === StudyPhase.TEST)) ? 'bg-green-500' : 'bg-slate-200'
                    }`} />
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      phase === p.id ? 'text-blue-600' : 'text-slate-400'
                    }`}>{p.label}</span>
                  </div>
                ))}
              </div>

              {phase === StudyPhase.MEMORIZE && (
                <MemorizeStep words={sessionWords} onComplete={completeMemorize} />
              )}
              {phase === StudyPhase.TEST && (
                <TestStep words={sessionWords} onComplete={completeTest} />
              )}
              {phase === StudyPhase.EXPAND && (
                <ExpandStep words={sessionWords} onComplete={completeExpand} />
              )}
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <footer className="py-12 border-t border-slate-100 mt-12">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 opacity-30 grayscale">
            <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center text-white font-black text-sm">S</div>
            <span className="font-black text-slate-900 tracking-tight">SPARK ENGLISH</span>
          </div>
          <p className="text-slate-400 text-xs font-medium">星火英语词库授权 · 助力中考提分</p>
        </div>
      </footer>
    </div>
  );
}
