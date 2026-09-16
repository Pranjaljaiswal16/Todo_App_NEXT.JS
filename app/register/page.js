"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("Pranjal");
  const [email, setEmail] = useState("pranjaljaiswal630@gmail.com");
  const [password, setPassword] = useState("123456");

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    console.log(data);
    if (!data.error) {
      return router.push("/login");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 sm:py-12">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center justify-center sm:min-h-[calc(100vh-6rem)]">
        <section className="w-full rounded-3xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-9">
          <header className="mb-9">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300 text-lg font-black text-slate-950 shadow-lg shadow-cyan-300/20">
                ✓
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-white">Todo App</h1>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-200/70">Get organized</p>
              </div>
            </div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Create your account</p>
            <h2 className="text-3xl font-bold tracking-tight text-white">Start getting things done.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">Set up your workspace and keep every task in sight.</p>
          </header>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Name</label>
              <input
                type="text"
                className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
              <input
                type="email"
                className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
              <input
                type="password"
                className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-cyan-300 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-300/20 transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus:ring-4 focus:ring-cyan-300/30 active:translate-y-0"
            >
              Create account
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-cyan-300 transition hover:text-cyan-200 hover:underline cursor-pointer">
              Log in
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
