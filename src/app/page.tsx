"use client";

import { useTodo } from "@/context/TodoContext";
import { Header } from "@/components/header/Header";
import { TodoInput } from "@/components/input/TodoInput";
import { Filters } from "@/components/filters/Filters";
import { DragDrop } from "@/components/drag-drop/DragDrop";

export default function Home() {
  const { todos, filter, addTodo, toggleTodo, deleteTodo, clearCompleted, setFilter, reorderTodos } = useTodo();

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.isCompleted;
    if (filter === "completed") return todo.isCompleted;
    return true;
  });

  const activeTodosCount = todos.filter((todo) => !todo.isCompleted).length;

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    reorderTodos(result.source.index, result.destination.index);
  };

  return (
    <main className="container">
      <Header />
      <TodoInput onSubmit={addTodo} />
      <DragDrop
        todos={filteredTodos}
        onDragEnd={handleDragEnd}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
      <Filters
        className={todos.length > 0 ? "has-todos" : ""}
        activeCount={activeTodosCount}
        currentFilter={filter}
        onFilterChange={setFilter}
        onClearCompleted={clearCompleted}
      />
      <p className="notice">Drag and drop to reorder list</p>
    </main>
  );
}
