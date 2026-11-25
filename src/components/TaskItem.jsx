import React from 'react';
import { Check, Trash2 } from 'lucide-react';

const PRIORITY_BADGE = {
  High: {
    pill: 'bg-rose-50 text-rose-700 border-rose-200/80 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800/70',
    dot: 'bg-rose-500 dark:bg-rose-400',
  },
  Medium: {
    pill: 'bg-amber-50 text-amber-800 border-amber-200/80 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/70',
    dot: 'bg-amber-500 dark:bg-amber-400',
  },
  Low: {
    pill: 'bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/70',
    dot: 'bg-emerald-500 dark:bg-emerald-400',
  },
};

const TaskItem = ({ task, onToggleComplete, onDeleteTask }) => {
  const badge = PRIORITY_BADGE[task.priority] || PRIORITY_BADGE.Medium;

  return (
    <div
      className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
        task.completed
          ? 'bg-[#F5F3EE]/80 dark:bg-stone-900/40 border-stone-200/60 dark:border-stone-800/60'
          : 'bg-white dark:bg-stone-900 border-stone-200/90 dark:border-stone-800 hover:border-teal-300/80 dark:hover:border-teal-700/70 hover:shadow-[0_4px_20px_rgb(0,0,0,0.03)]'
      }`}
    >
      {/* Left: Tactile Check Circle + Content */}
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={() => onToggleComplete(task.id)}
          aria-label={
            task.completed ? 'Mark task as pending' : 'Mark task as completed'
          }
          className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer ${
            task.completed
              ? 'bg-teal-600 border-teal-600 text-white scale-95'
              : 'border-stone-300 dark:border-stone-600 hover:border-teal-600 dark:hover:border-teal-500 bg-[#FAF8F5] dark:bg-stone-800'
          }`}
        >
          {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h3
              className={`font-semibold text-[15px] leading-snug transition-all duration-200 ${
                task.completed
                  ? 'line-through text-stone-400 dark:text-stone-500'
                  : 'text-stone-800 dark:text-stone-100'
              }`}
            >
              {task.title}
            </h3>

            <span
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border ${
                task.completed
                  ? 'bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500 border-stone-200 dark:border-stone-700'
                  : badge.pill
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  task.completed ? 'bg-stone-400 dark:bg-stone-500' : badge.dot
                }`}
              />
              {task.priority}
            </span>
          </div>

          {task.description && (
            <p
              className={`text-sm mt-1 leading-relaxed transition-colors ${
                task.completed
                  ? 'line-through text-stone-400 dark:text-stone-600'
                  : 'text-stone-500 dark:text-stone-400'
              }`}
            >
              {task.description}
            </p>
          )}
        </div>
      </div>

      {/* Right: Gentle Action Controls */}
      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
        <button
          type="button"
          onClick={() => onToggleComplete(task.id)}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            task.completed
              ? 'text-stone-600 dark:text-stone-300 bg-stone-200/70 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700'
              : 'text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100/80 dark:hover:bg-teal-900/60'
          }`}
        >
          {task.completed ? 'Reopen' : 'Complete'}
        </button>

        <button
          type="button"
          onClick={() => onDeleteTask(task.id)}
          aria-label="Delete task"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-stone-400 dark:text-stone-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="sm:hidden lg:inline">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;