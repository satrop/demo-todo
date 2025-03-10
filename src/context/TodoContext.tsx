"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Todo, TodoContextType, FilterType } from "@/types/todo";

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
    const savedTodos = localStorage.getItem("todos");
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme, isClient]);

  const addTodo = (text: string) => {
    setTodos((prev) => [...prev, { id: crypto.randomUUID(), text, isCompleted: false }]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo)));
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.isCompleted));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const reorderTodos = (startIndex: number, endIndex: number) => {
    setTodos((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  // Prevent hydration mismatch by not rendering until client-side
  if (!isClient) {
    return null;
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        filter,
        theme,
        addTodo,
        toggleTodo,
        deleteTodo,
        clearCompleted,
        setFilter,
        toggleTheme,
        reorderTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
}
