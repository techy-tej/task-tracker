import React, { useState } from 'react';
import { Plus, Flag } from 'lucide-react';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Give your task a quick title first.');
      return;
    }

    onAddTask({
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    });

    setTitle('');
    setDescription('');
    setPriority('Medium');
    setError('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:shadow-none p-6 sm:p-7 mb-8 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-stone-800 dark:text-stone-100">
          What would you like to get done?
        </h2>
        <span className="text-xs text-stone-400 dark:text-stone-500">
          Press Enter to add
        </span>
      </div>

      {error && (
        <div className="mb-4 px-4 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200/80 dark:border-rose-800/70 text-sm text-rose-700 dark:text-rose-300">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Task Title */}
          <div className="md:col-span-6">
            <label
              htmlFor="task-title"
              className="block text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5"
            >
              Task Title <span className="text-rose-500">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g., Call the designer about homepage mockups"
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:bg-white dark:focus:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 transition-all"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-6">
            <label
              htmlFor="task-desc"
              className="block text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5"
            >
              Notes / Context
            </label>
            <input
              id="task-desc"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Any helpful links, times, or reminders..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:bg-white dark:focus:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 transition-all"
            />
          </div>
        </div>

        {/* Bottom Row: Priority Dropdown + Submit */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <label
              htmlFor="task-priority"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 dark:text-stone-300"
            >
              <Flag className="w-4 h-4 text-stone-400" />
              Priority:
            </label>
            <select
              id="task-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-[#FAF8F5] dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm font-medium text-stone-700 dark:text-stone-200 focus:bg-white dark:focus:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 cursor-pointer"
            >
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-stone-900 dark:bg-teal-600 hover:bg-teal-700 dark:hover:bg-teal-500 active:scale-[0.99] text-white font-medium text-sm shadow-sm transition-all duration-200 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add to List
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;