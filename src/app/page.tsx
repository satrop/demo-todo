"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTodo } from "@/context/TodoContext";
import { FilterType } from "@/types/todo";

export default function Home() {
  const [newTodo, setNewTodo] = useState("");
  const { todos, filter, theme, addTodo, toggleTodo, deleteTodo, clearCompleted, setFilter, toggleTheme, reorderTodos } = useTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo("");
    }
  };

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
      <header>
        <h1>TODO</h1>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </header>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-input"
          placeholder="Create a new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
      </form>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div
              className="todo-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredTodos.map((todo, index) => (
                <Draggable
                  key={todo.id}
                  draggableId={todo.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className={`todo-item ${todo.isCompleted ? "completed" : ""}`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div
                        className={`checkbox ${todo.isCompleted ? "checked" : ""}`}
                        onClick={() => toggleTodo(todo.id)}
                      >
                        {todo.isCompleted && "✓"}
                      </div>
                      <span>{todo.text}</span>
                      <button
                        className="delete-btn"
                        onClick={() => deleteTodo(todo.id)}
                        aria-label="Delete todo"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}

              <div className="filters">
                <span>{activeTodosCount} items left</span>
                <div>
                  {(["all", "active", "completed"] as FilterType[]).map((filterType) => (
                    <button
                      key={filterType}
                      className={filter === filterType ? "active" : ""}
                      onClick={() => setFilter(filterType)}
                    >
                      {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                    </button>
                  ))}
                </div>
                <button onClick={clearCompleted}>Clear Completed</button>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </main>
  );
}
