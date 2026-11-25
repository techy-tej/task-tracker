# Task Tracker & Productivity Analytics Dashboard

A calm, editorial-inspired single-page **Task Tracker** built with **React**, **Tailwind CSS v4**, and **Bun**. Designed to help you organize daily tasks by priority, track real-time completion metrics, and adapt seamlessly between warm alabaster **Light Mode** and charcoal **Dark Mode**.

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
- **Time-Aware Adaptive Theme & Header**
  - Automatically defaults to **Dark Mode** during evening/night hours (`6:00 PM – 6:00 AM`) or when your system prefers dark mode, while allowing manual override anytime via the header toggle.
  - Displays a dynamic time-of-day greeting alongside a `<Sun />` or `<Moon />` date indicator.

---

## Project Architecture

The application follows a modular component structure inside `src/`:

```text
task-tracker/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Analytics.jsx    # Real-time stats, SVG ring & encouragement banner
│   │   ├── TaskForm.jsx     # Task creation form with validation & priority
│   │   ├── TaskItem.jsx     # Individual task card with toggle & delete
│   │   └── TaskList.jsx     # Filtered/sorted list & empty-state view
│   ├── App.jsx              # Root state, theme toggle, filtering & sorting
│   ├── index.css            # Tailwind CSS v4 import & dark mode variant
│   └── main.jsx             # React DOM entry point
├── index.html
├── oxlint.json              # Generated because Oxlint was selected in create-vite
├── package.json
├── vite.config.js
└── README.md