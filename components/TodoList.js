"use client";

import TodoItem from "./TodoItem";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TodoList = ({ todos, deleteTodo, toggleTodo, updateTodo }) => {
  const [filter, setFilter] = useState("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const pendingCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - pendingCount;

  if (todos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-12 text-center dark:border-white/10">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">No tasks yet. Add your first one above!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-500 dark:text-slate-400">
          <span>{pendingCount} pending</span>
          {completedCount > 0 && <span> &middot; {completedCount} completed</span>}
        </div>

        <div className="flex w-fit rounded-xl bg-slate-100 p-1 text-sm dark:bg-slate-950/60">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-lg px-3 py-1.5 transition-colors ${
              filter === "all"
                ? "bg-white font-semibold text-slate-900 shadow-sm dark:bg-white/10 dark:text-white"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`rounded-lg px-3 py-1.5 transition-colors ${
              filter === "active"
                ? "bg-white font-semibold text-slate-900 shadow-sm dark:bg-white/10 dark:text-white"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`rounded-lg px-3 py-1.5 transition-colors ${
              filter === "completed"
                ? "bg-white font-semibold text-slate-900 shadow-sm dark:bg-white/10 dark:text-white"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      <ul className="space-y-2.5">
        <AnimatePresence>
          {filteredTodos.map((todo) => (
            <motion.li
              key={todo.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.2 }}
            >
              <TodoItem
                todo={todo}
                deleteTodo={deleteTodo}
                toggleTodo={toggleTodo}
                updateTodo={updateTodo}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default TodoList;
