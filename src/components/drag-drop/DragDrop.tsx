import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Todo } from "@/types/todo";
import "./DragDrop.scss";

interface DragDropProps {
  todos: Todo[];
  onDragEnd: (result: DropResult) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const DragDrop = ({ todos, onDragEnd, onToggle, onDelete }: DragDropProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <div
            className="todo-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todos.map((todo, index) => (
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
                      onClick={() => onToggle(todo.id)}
                    >
                      <div className="checkmark"></div>
                    </div>
                    <span onClick={() => onToggle(todo.id)}>{todo.text}</span>
                    <button
                      className="delete-btn"
                      onClick={() => onDelete(todo.id)}
                      aria-label="Delete todo"
                    ></button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
