export interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}

export type FilterType = "all" | "active" | "completed";

export interface TodoContextType {
  todos: Todo[];
  filter: FilterType;
  theme: "light" | "dark";
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
  setFilter: (filter: FilterType) => void;
  toggleTheme: () => void;
  reorderTodos: (startIndex: number, endIndex: number) => void;
}
