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

  const ebbinghausStages = [
    { label: '5分钟', status: 'completed' },
    { label: '30分钟', status: 'completed' },
    { label: '12小时', status: 'pending' },
    { label: '1天', status: 'pending' },
    { label: '2天', status: 'pending' },
    { label: '4天', status: 'pending' },
    { label: '7天', status: 'pending' },
    { label: '15天', status: 'pending' },
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">星火英语 60词高效背词</h1>
          <p className="text-slate-500 font-medium mt-1">贴合「Day」单元编排 · 艾宾浩斯抗遗忘打卡</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">当前进度</p>
            <p className="text-xl font-black text-blue-600">Day 07</p>
          </div>
          <button
            onClick={onStartStudy}
            className="group flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
          >
            <Play size={20} fill="currentColor" />
            <span>开始今日 60 词挑战</span>
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Trophy, label: '累计打卡', value: `${stats.streak} 天`, color: 'text-amber-600', bg: 'bg-amber-50' },
          { icon: Target, label: '高频词覆盖', value: `92%`, color: 'text-blue-600', bg: 'bg-blue-50' },
          { icon: BookOpen, label: '已掌握单词', value: stats.mastered, color: 'text-green-600', bg: 'bg-green-50' },
          { icon: Calendar, label: '今日任务', value: '60 词', color: 'text-purple-600', bg: 'bg-purple-50' },
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

      {/* Ebbinghaus Review Section */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-800">艾宾浩斯抗遗忘打卡</h3>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Day 07 单元</span>
        </div>
        <div className="flex flex-wrap gap-4">
          {ebbinghausStages.map((stage, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                stage.status === 'completed' 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : 'bg-white border-slate-200 text-slate-400'
              }`}>
                {stage.status === 'completed' ? <Trophy size={16} /> : <span className="text-[10px] font-bold">{idx + 1}</span>}
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{stage.label}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-slate-400 leading-relaxed">
          * 根据艾宾浩斯遗忘曲线，在特定时间点复习可将瞬时记忆转化为长期记忆。建议配合书中打卡表使用。
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">学习量趋势 (词/天)</h3>
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
          <h3 className="text-lg font-bold text-slate-800 mb-6">考频分布掌握情况</h3>
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
            <h3 className="text-xl font-bold mb-2">今日高频词重点突破</h3>
            <p className="text-blue-100 text-sm max-w-md">Day 07 单元包含 12 个高频考点词，建议在“背诵”阶段重点关注「直击考点」板块。</p>
          </div>
          <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all">
            立即开始
          </button>
        </div>
        {/* Decorative Circles */}
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-blue-500 rounded-full opacity-20 blur-2xl" />
        <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-blue-700 rounded-full opacity-20 blur-2xl" />
      </div>
    </div>
  );
};
