"use client";

import { useState } from 'react';
import { PlusIcon } from 'lucide-react';

const TodoForm = ({ addTodo }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTodo(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-14 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-400/10 dark:border-white/10 dark:bg-slate-950/50 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-cyan-300 dark:focus:bg-slate-950"
      />
      <button
        type="submit"
        disabled={!input.trim()}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-cyan-300 p-2 text-slate-950 shadow-md shadow-cyan-300/20 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Add todo"
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </form>
  );
};

export default TodoForm;
