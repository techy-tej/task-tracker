import React from 'react';
import { Coffee } from 'lucide-react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, filterStatus, onToggleComplete, onDeleteTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white/70 dark:bg-stone-900/50 rounded-3xl border border-dashed border-stone-300/90 dark:border-stone-800 py-14 px-6 text-center transition-colors">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200/60 dark:border-amber-800/60 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-3.5">
          <Coffee className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200">
          {filterStatus === 'All'
            ? 'Your list is wide open'
            : `No ${filterStatus.toLowerCase()} tasks right now`}
        </h3>
        <p className="text-sm text-stone-500 dark:text-stone-400 max-w-sm mx-auto mt-1">
          {filterStatus === 'All'
            ? 'Jot down a task above whenever something comes to mind.'
            : 'Try switching filter tabs above to see your other tasks.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;