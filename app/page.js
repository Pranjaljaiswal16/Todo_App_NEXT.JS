"use client";

import { useEffect, useRef, useState } from "react";
import TodoList from "@/components/TodoList";
import TodoForm from "@/components/TodoForm";
import { useTheme } from "next-themes";
import { CheckCircle2, MoonIcon, SunIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState({ name: "", email: "" });
  const { theme = "dark", setTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    fetchTodos();
    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setShowUserMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchUser = async () => {
    const response = await fetch("/api/user");
    const data = await response.json();
    if (response.status === 401) return router.push("/login");
    if (!data.error) setUser(data);
  };

  const fetchTodos = async () => {
    const response = await fetch("/api/todos");
    const data = await response.json();
    if (response.status === 401) return router.push("/login");
    if (!data.error) setTodos(data.reverse());
  };

  const addTodo = async (text) => {
    const response = await fetch("/api/todos", { method: "POST", body: JSON.stringify({ text }) });
    const newTodo = await response.json();
    setTodos([newTodo, ...todos]);
  };

  const deleteTodo = async (id) => {
    const response = await fetch(`/api/todos/${id}`, { method: "DELETE" });
    if (response.status === 204) fetchTodos();
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const response = await fetch(`/api/todos/${id}`, { method: "PUT", body: JSON.stringify({ completed: !todo.completed }) });
    if (response.status === 200) fetchTodos();
  };

  const updateTodo = async (id, newText) => {
    const response = await fetch(`/api/todos/${id}`, { method: "PUT", body: JSON.stringify({ text: newText }) });
    if (response.status === 200) fetchTodos();
  };

  const handleLogout = async () => {
    const response = await fetch("/api/logout", { method: "POST" });
    if (response.status === 204) return router.push("/login");
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-6 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 sm:py-10">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-indigo-500/15 blur-3xl" />

      <div className="relative mx-auto w-full max-w-2xl">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-300/25">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">My tasks</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Make today count.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-cyan-600 dark:border-white/10 dark:bg-white/[0.07] dark:text-slate-300 dark:hover:text-cyan-300" aria-label="Toggle theme">
              {theme === "dark" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            </button>

            <div className="relative" ref={menuRef}>
              <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-cyan-600 dark:border-white/10 dark:bg-white/[0.07] dark:text-slate-300 dark:hover:text-cyan-300" aria-label="User menu">
                <UserIcon className="h-4 w-4" />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 z-10 mt-3 w-56 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-slate-900">
                  <div className="truncate text-sm font-semibold">{user.name}</div>
                  <div className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400" title={user.email}>{user.email}</div>
                  <button onClick={handleLogout} className="mt-4 w-full rounded-lg bg-rose-500/10 px-3 py-2 text-left text-sm font-semibold text-rose-600 transition hover:bg-rose-500/20 dark:text-rose-300">Logout</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-xl shadow-slate-200/40 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.07] dark:shadow-black/20 sm:p-7">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">Your workspace</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight">What needs your attention?</h2>
            </div>
            <div className="shrink-0 rounded-xl bg-cyan-500/10 px-3 py-2 text-right text-xs font-semibold text-cyan-700 dark:text-cyan-200">
              <span className="block text-base leading-none">{completedCount}/{todos.length}</span>
              complete
            </div>
          </div>

          <TodoForm addTodo={addTodo} />
          <div className="mt-7"><TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} updateTodo={updateTodo} /></div>
        </section>
      </div>
    </main>
  );
}
