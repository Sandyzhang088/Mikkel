import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Trophy, Calendar, Target, BookOpen, ChevronRight, Play } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  onStartStudy: () => void;
  stats: {
    mastered: number;
    toReview: number;
    focus: number;
    dailyProgress: { day: string; count: number }[];
    examCoverage: number;
    streak: number;
  };
}

export const Dashboard: React.FC<DashboardProps> = ({ onStartStudy, stats }) => {
  const pieData = [
    { name: '已掌握', value: stats.mastered, color: '#22c55e' },
    { name: '待复习', value: stats.toReview, color: '#3b82f6' },
    { name: '重点攻克', value: stats.focus, color: '#f59e0b' },
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">星火英语 20分钟高效背词</h1>
          <p className="text-slate-500 font-medium mt-1">碎片化时间，不知不觉提升中考词汇量</p>
        </div>
        <button
          onClick={onStartStudy}
          className="group flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
        >
          <Play size={20} fill="currentColor" />
          <span>开始今日 20 分钟学习</span>
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Trophy, label: '累计打卡', value: `${stats.streak} 天`, color: 'text-amber-600', bg: 'bg-amber-50' },
          { icon: Target, label: '真题覆盖率', value: `${stats.examCoverage}%`, color: 'text-blue-600', bg: 'bg-blue-50' },
          { icon: BookOpen, label: '已掌握单词', value: stats.mastered, color: 'text-green-600', bg: 'bg-green-50' },
          { icon: Calendar, label: '今日任务', value: '15-20 词', color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`${stat.bg} p-6 rounded-2xl border border-white shadow-sm`}
          >
            <stat.icon className={`${stat.color} mb-3`} size={24} />
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            <p className={`text-2xl font-black ${stat.color} mt-1`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">本周学习趋势</h3>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.dailyProgress}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {stats.dailyProgress.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === stats.dailyProgress.length - 1 ? '#3b82f6' : '#e2e8f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mastery Pie Chart */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">词库掌握分布</h3>
          <div className="flex-1 flex items-center justify-center">
            <div className="h-[200px] w-[200px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-black text-slate-900">{stats.mastered + stats.toReview + stats.focus}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">总计单词</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-bold text-slate-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity / Recommendations */}
      <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">今日重点复习词汇</h3>
            <p className="text-blue-100 text-sm max-w-md">系统检测到你在“词义辨析”类题目中错误率较高，建议优先复习 spend/cost/pay/take 等易混淆词。</p>
          </div>
          <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all">
            立即复习
          </button>
        </div>
        {/* Decorative Circles */}
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-blue-500 rounded-full opacity-20 blur-2xl" />
        <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-blue-700 rounded-full opacity-20 blur-2xl" />
      </div>
    </div>
  );
};
