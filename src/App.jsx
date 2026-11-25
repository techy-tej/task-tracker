import React, { useState, useMemo, useEffect } from 'react';
import { ArrowUpDown, Sun, Moon } from 'lucide-react';
import Analytics from './components/Analytics';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const PRIORITY_WEIGHT = {
  High: 3,
  Medium: 2,
  Low: 1,
};

const INITIAL_TASKS = [
  {
    id: '1',
    title: 'Review product roadmap notes before standup',
    description: 'Highlight key blockers and confirm sprint priorities with the team.',
    priority: 'High',
    completed: false,
  },
  {
    id: '2',
    title: 'Send invoice & project wrap-up email',
    description: 'Attach final PDF deliverables and thank the client.',
    priority: 'Medium',
    completed: true,
  },
  {
    id: '3',
    title: 'Water indoor plants & tidy desk',
    description: 'Reset workspace before wrapping up for the evening.',
    priority: 'Low',
    completed: false,
  },
];

function App() {
  const currentHour = new Date().getHours();
  const isEveningOrNight = currentHour >= 18 || currentHour < 6;

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('human_task_tracker_v1');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('task_tracker_theme');
    if (savedTheme) return savedTheme === 'dark';
    return isEveningOrNight || window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [filterStatus, setFilterStatus] = useState('All');
  const [sortByPriority, setSortByPriority] = useState(false);

  // Sync dark mode class on <html> and persist to localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('task_tracker_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('task_tracker_theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('human_task_tracker_v1', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleComplete = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const formattedDate = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  const counts = useMemo(
    () => ({
      All: tasks.length,
      Pending: tasks.filter((t) => !t.completed).length,
      Completed: tasks.filter((t) => t.completed).length,
    }),
    [tasks]
  );

  const visibleTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      if (filterStatus === 'Pending') return !task.completed;
      if (filterStatus === 'Completed') return task.completed;
      return true;
    });

    if (!sortByPriority) return filtered;

    return [...filtered].sort(
      (a, b) => PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority]
    );
  }, [tasks, filterStatus, sortByPriority]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-stone-950 text-stone-800 dark:text-stone-100 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300 selection:bg-teal-100 dark:selection:bg-teal-900 selection:text-teal-900 dark:selection:text-teal-100">
      <div className="max-w-3xl mx-auto">
        {/* Warm Editorial Header with Dark Mode Toggle */}
        <header className="mb-8 flex items-start sm:items-end justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1.5">
              {isEveningOrNight ? (
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-500" />
              )}
              {formattedDate}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              {getGreeting()}, let’s focus.
            </h1>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
              Keep things light, prioritized, and intentional.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-200 hover:border-stone-300 dark:hover:border-stone-700 shadow-xs transition-all cursor-pointer shrink-0"
          >
            {darkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-medium">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-stone-600" />
                <span className="text-xs font-medium">Dark</span>
              </>
            )}
          </button>
        </header>

        {/* Real-time Analytics */}
        <Analytics tasks={tasks} />

        {/* Add Task Card */}
        <TaskForm onAddTask={handleAddTask} />

        {/* Filter & Priority Sort Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          {/* Filter Pills with Live Counts */}
          <div className="inline-flex p-1 bg-stone-200/70 dark:bg-stone-900 border border-transparent dark:border-stone-800 rounded-2xl self-start">
            {['All', 'Pending', 'Completed'].map((status) => {
              const active = filterStatus === status;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFilterStatus(status)}
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    active
                      ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  <span>{status}</span>
                  <span
                    className={`text-xs px-1.5 py-0.2 rounded-full ${
                      active
                        ? 'bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 font-semibold'
                        : 'text-stone-400 dark:text-stone-500'
                    }`}
                  >
                    {counts[status]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Priority Sort Button */}
          <button
            type="button"
            onClick={() => setSortByPriority((prev) => !prev)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium border transition-all self-start sm:self-auto cursor-pointer ${
              sortByPriority
                ? 'bg-teal-700 dark:bg-teal-600 text-white border-teal-700 dark:border-teal-600 shadow-xs'
                : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
            }`}
          >
            <ArrowUpDown className="w-4 h-4" />
            {sortByPriority ? 'Sorted: High → Low' : 'Sort by Priority'}
          </button>
        </div>

        {/* Task List */}
        <TaskList
          tasks={visibleTasks}
          filterStatus={filterStatus}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </div>
  );
}

export default App;
