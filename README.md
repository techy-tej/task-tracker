# Task Tracker & Productivity Analytics Dashboard

A calm, editorial-inspired single-page **Task Tracker** built with **React**, **Tailwind CSS v4**, and **Bun**. Designed to help you organize daily tasks by priority, track real-time completion metrics, and switch effortlessly between warm alabaster **Light Mode** and charcoal **Dark Mode**.

---

## Features

- **Task Management**
  - Create tasks with a required **Title**, optional **Notes / Context**, and **Priority** level (`High`, `Medium`, `Low`).
  - Delete tasks cleanly with one click.
  - Automatic persistence using `localStorage` so tasks and theme preferences survive page reloads.
- **State Updates & Visual Completion**
  - Tactile completion toggle on every task card.
  - Completed tasks gracefully transition with strike-through typography, muted priority badges, and recessed card shading.
- **Filtering & Priority Sorting**
  - Filter tasks instantly across **All**, **Pending**, and **Completed** views with live item counters.
  - Toggleable **Sort by Priority (`High → Medium → Low`)** powered by `useMemo`.
- **Real-Time Productivity Analytics**
  - Live summary displaying **Total Tasks**, **Pending Tasks**, **Completed Tasks**, and **Completion Percentage** visualized with an animated SVG progress ring and contextual encouragement messages.
- **Light & Dark Theme Support**
  - Automatically detects your system color scheme on first visit and provides a header toggle to switch between warm alabaster light mode and deep stone dark mode.

---

## Project Architecture

The application follows a modular component structure inside `src/`:

```text
task-tracker/
├── public/
├── src/
│   ├── components/
│   │   ├── Analytics.jsx    # Real-time stats, animated SVG ring, & encouragement banner
│   │   ├── TaskForm.jsx     # Controlled form with validation & priority dropdown
│   │   ├── TaskItem.jsx     # Individual task card with completion toggle & delete action
│   │   └── TaskList.jsx     # Filtered/sorted task list & warm empty-state view
│   ├── App.jsx              # Root state, localStorage sync, theme toggle, filtering & sorting
│   ├── index.css            # Tailwind CSS v4 import & class-based dark mode variant
│   └── main.jsx             # React DOM entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md# task-tracker
