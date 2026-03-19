import React, { useState } from 'react';
import { Word } from '../types';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, AlertCircle, Target, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { playCorrectSound, playIncorrectSound } from '../services/speechService';

interface TestStepProps {
  words: Word[];
  onComplete: (score: number) => void;
}

interface Question {
  id: string;
  type: 'differentiation' | 'exam_adaptation' | 'phrase_matching';
  word: Word;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  memoryTip?: string;
}

export const TestStep: React.FC<TestStepProps> = ({ words, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  // Generate mock questions based on the words
  const questions: Question[] = [
    {
      id: 'q-0',
      type: 'differentiation',
      word: words[0],
      question: `请选择最适合填入空格的词：I don't know what to ______ the old clothes.`,
      options: ['do with', 'deal with', 'make with', 'go with'],
      correctAnswer: 0,
      explanation: `do with 常与 what 连用，表示“处理，安置”。`,
      memoryTip: `do with 搭配 what，deal with 搭配 how，中考完形高频考点！`
    },
    {
      id: 'q-1',
      type: 'exam_adaptation',
      word: words[1],
      question: `根据句意，选择正确形式：The table is ______ wood. We can see the wood grain clearly.`,
      options: ['made of', 'made from', 'made into', 'made by'],
      correctAnswer: 0,
      explanation: `be made of 表示物理变化，看得出原材料。`,
      memoryTip: `看得出原材料用 of，看不出用 from，物理 vs 化学变化是核心！`
    },
    {
      id: 'q-2',
      type: 'phrase_matching',
      word: words[2],
      question: `短语匹配：以下哪个短语表示“去了某地（还没回来）”？`,
      options: ['have been to', 'have gone to', 'have been in', 'have gone in'],
      correctAnswer: 1,
      explanation: `have gone to 表示“去了未回”，人在彼地或途中。`,
      memoryTip: `been to 是“去过已回”，gone to 是“去了未回”，中考必考辨析！`
    }
  ];

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQuestion.correctAnswer) {
      setScore(score + 1);
      playCorrectSound();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#3b82f6']
      });
    } else {
      playIncorrectSound();
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      onComplete(score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0));
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto px-4">
      {/* Progress */}
      <div className="flex justify-between items-center text-sm font-medium text-slate-500">
        <span>自测环节 (6分钟)</span>
        <span>{currentIndex + 1} / {questions.length}</span>
      </div>

      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          className="bg-blue-500 h-full"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
        >
          <div className="flex items-center gap-2 mb-6 text-blue-600 font-bold">
            {currentQuestion.type === 'differentiation' && <HelpCircle size={20} />}
            {currentQuestion.type === 'exam_adaptation' && <Target size={20} />}
            {currentQuestion.type === 'phrase_matching' && <CheckCircle2 size={20} />}
            <span>
              {currentQuestion.type === 'differentiation' ? '词义辨析' : 
               currentQuestion.type === 'exam_adaptation' ? '真题改编' : '短语匹配'}
            </span>
          </div>

          <p className="text-xl font-bold text-slate-800 mb-8 leading-relaxed">
            {currentQuestion.question}
          </p>

          <div className="grid gap-4">
            {currentQuestion.options.map((option, idx) => {
              const isCorrect = idx === currentQuestion.correctAnswer;
              const isSelected = idx === selectedOption;

              let buttonStyle = "border-slate-200 hover:border-blue-200 hover:bg-blue-50 text-slate-700";
              if (isAnswered) {
                if (isCorrect) buttonStyle = "border-green-500 bg-green-50 text-green-700";
                else if (isSelected) buttonStyle = "border-red-500 bg-red-50 text-red-700";
                else buttonStyle = "border-slate-100 text-slate-400 opacity-50";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={isAnswered}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 font-medium transition-all text-left ${buttonStyle}`}
                >
                  <span>{String.fromCharCode(65 + idx)}. {option}</span>
                  {isAnswered && isCorrect && <CheckCircle2 size={20} className="text-green-500" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle size={20} className="text-red-500" />}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-8 space-y-4"
            >
              {selectedOption === currentQuestion.correctAnswer ? (
                <div className="p-4 bg-green-50 rounded-xl border border-green-100 flex items-start gap-3">
                  <Sparkles className="text-green-600 shrink-0 mt-1" size={18} />
                  <div>
                    <p className="text-green-800 font-bold text-sm">高效记忆提示</p>
                    <p className="text-green-700 text-xs mt-1">{currentQuestion.memoryTip}</p>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 mb-2 text-slate-700 font-bold">
                    <AlertCircle size={18} className="text-blue-500" />
                    <span>考点解析卡片</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {currentQuestion.explanation}
                  </p>
                  <div className="text-xs bg-white p-3 rounded-lg border border-slate-100 text-slate-500 italic">
                    💡 提示：{currentQuestion.memoryTip}
                  </div>
                </div>
              )}
              
              <button
                onClick={handleNext}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                <span>{currentIndex === questions.length - 1 ? '查看结果' : '下一题'}</span>
                <ArrowRight size={20} />
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
