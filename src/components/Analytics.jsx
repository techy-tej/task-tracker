import React from 'react';
import { Sparkles, CheckCircle2, Layers, Clock } from 'lucide-react';

const Analytics = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const percentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getEncouragement = () => {
    if (totalTasks === 0) return 'A fresh slate — add your first intention below.';
    if (percentage === 100) return 'Everything checked off. Take a well-earned breather.';
    if (percentage >= 70) return 'Strong momentum today — just a few items left.';
    if (percentage > 0) return 'Steady progress. One task at a time.';
    return 'Ready when you are. Pick one small task to start.';
  };

  return (
    <section className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:shadow-none p-6 sm:p-7 mb-8 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        {/* Left: Progress Ring & Human Summary */}
        <div className="flex items-center gap-5">
          <div className="relative w-22 h-22 shrink-0 flex items-center justify-center">
            <svg className="w-22 h-22 -rotate-90" viewBox="0 0 84 84">
              <circle
                cx="42"
                cy="42"
                r={radius}
                fill="none"
                className="stroke-[#F5F2EB] dark:stroke-stone-800"
                strokeWidth="7"
              />
              <circle
                cx="42"
                cy="42"
                r={radius}
                fill="none"
                stroke="#0D9488"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-stone-800 dark:text-stone-100 leading-none">
                {percentage}%
              </span>
              <span className="text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500 font-medium mt-0.5">
                Done
              </span>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Daily Pulse
            </div>
            <h2 className="text-lg font-semibold text-stone-800 dark:text-stone-100">
              {completedTasks} of {totalTasks}{' '}
              {totalTasks === 1 ? 'task' : 'tasks'} completed
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
              {getEncouragement()}
            </p>
          </div>
        </div>

        {/* Right: Clean Metric Pills */}
        <div className="grid grid-cols-3 sm:flex items-center gap-3">
          <div className="bg-[#FAF8F5] dark:bg-stone-800/70 border border-stone-200/70 dark:border-stone-700/70 rounded-2xl px-4 py-3 min-w-[92px]">
            <div className="flex items-center gap-1.5 text-stone-400 text-xs font-medium mb-1">
              <Layers className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
              Total
            </div>
            <p className="text-xl font-bold text-stone-800 dark:text-stone-100">
              {totalTasks}
            </p>
          </div>

          <div className="bg-[#FAF8F5] dark:bg-stone-800/70 border border-stone-200/70 dark:border-stone-700/70 rounded-2xl px-4 py-3 min-w-[92px]">
            <div className="flex items-center gap-1.5 text-stone-400 text-xs font-medium mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Pending
            </div>
            <p className="text-xl font-bold text-stone-800 dark:text-stone-100">
              {pendingTasks}
            </p>
          </div>

          <div className="bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-800/60 rounded-2xl px-4 py-3 min-w-[92px]">
            <div className="flex items-center gap-1.5 text-teal-700 dark:text-teal-300 text-xs font-medium mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              Done
            </div>
            <p className="text-xl font-bold text-teal-900 dark:text-teal-200">
              {completedTasks}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;