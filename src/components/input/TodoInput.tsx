"use client";

import { useState } from "react";
import "./TodoInput.scss";

interface TodoInputProps {
  onSubmit: (text: string) => void;
}

export const TodoInput = ({ onSubmit }: TodoInputProps) => {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      onSubmit(newTodo.trim());
      setNewTodo("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <div className="faux-checkbox"></div>
        <input
          type="text"
          className="todo-input"
          placeholder="Create a new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
      </div>
    </form>
  );
};
