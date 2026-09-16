"use client";

import { useState } from "react";
import { TrashIcon, PencilIcon, Check, X } from "lucide-react";

const TodoItem = ({ todo, deleteTodo, toggleTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    if (editText.trim()) {
      updateTodo(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div
      className={`group rounded-2xl border p-4 transition-all ${todo.completed ? "border-slate-200 bg-slate-50/70 dark:border-white/5 dark:bg-white/[0.03]" : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md hover:shadow-cyan-500/5 dark:border-white/10 dark:bg-slate-950/30 dark:hover:border-cyan-300/50"}`}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => toggleTodo(todo.id)}
          className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border transition-colors ${
            todo.completed
              ? "border-cyan-300 bg-cyan-300"
              : "border-slate-300 hover:border-cyan-400 dark:border-slate-600 dark:hover:border-cyan-300"
          }`}
          aria-label={
            todo.completed ? "Mark as incomplete" : "Mark as complete"
          }
        >
          {todo.completed && (
            <Check className="w-4 h-4 text-primary-foreground" />
          )}
        </button>

        {isEditing ? (
          <div className="flex-1">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="w-full border-0 border-b border-cyan-400 bg-transparent p-0 text-slate-900 outline-none focus:ring-0 dark:text-white"
            />
          </div>
        ) : (
          <p
            className={`flex-1 text-sm font-medium transition-opacity ${todo.completed ? "text-slate-400 line-through dark:text-slate-500" : "text-slate-700 dark:text-slate-200"}`}
          >
            {todo.text}
          </p>
        )}

        <div className="flex items-center gap-1 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="rounded-lg p-1.5 text-emerald-500 transition-colors hover:bg-emerald-500/10"
                aria-label="Save"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                className="rounded-lg p-1.5 text-rose-500 transition-colors hover:bg-rose-500/10"
                aria-label="Cancel"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="rounded-lg p-1.5 text-cyan-600 transition-colors hover:bg-cyan-500/10 dark:text-cyan-300"
                aria-label="Edit todo"
              >
                <PencilIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="rounded-lg p-1.5 text-rose-500 transition-colors hover:bg-rose-500/10"
                aria-label="Delete todo"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
