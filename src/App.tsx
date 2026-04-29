import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "./App.css";
import { AddTaskForm } from "./components/AddTaskForm";
import { ControlTaskActions } from "./components/ControlTaskActions";
import { EmptyTaskList } from "./components/EmptyTaskList";
import {
  changeStatusTask,
  deleteTask,
  updateTask,
  useTodo,
} from "./store/task";

export const App = () => {
  const [editingValue, setEditingValue] = useState("");
  const [editModeId, setEditModeId] = useState<string | null>(null);

  const todos = useTodo();

  const handleToggle = (id: string) => {
    const currentTodo = todos.find((todo) => todo.id === id);

    if (editModeId === id) {
      handleDescriptionChange(id, editingValue);
      setEditModeId(null);
      return;
    }

    setEditingValue(currentTodo?.description || "");
    setEditModeId(id);
  };

  const handleDescriptionChange = (id: string, description: string) => {
    const currentTodo = todos.find((todo) => todo.id === id);

    if (!currentTodo) return;

    if (currentTodo.description.trim() === description.trim()) {
      setEditModeId(null);
      return;
    }

    updateTask({ description });

    toast("Task has been updated", {
      type: "info",
      autoClose: 2000,
    });
  };

  return (
    <div className="container">
      <section className="counter">
        <h1>
          <span style={{ color: "var(--accent)" }}>Margo</span>`s Todo List
        </h1>

        <AddTaskForm key={todos.length} />
        <ControlTaskActions />

        {todos.length === 0 ? (
          <EmptyTaskList />
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="item">
              <div className="inp">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => changeStatusTask(todo.id)}
                />
              </div>
              {editModeId === todo.id ? (
                <input
                  type="text"
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  autoFocus
                  onBlur={() => {
                    handleDescriptionChange(todo.id, editingValue);
                    setEditModeId(null);
                  }}
                />
              ) : (
                <div className="card">
                  <p className={todo.completed ? "completed" : ""}>
                    {todo.description}
                  </p>
                  <div className="card__bottom-block bottom-block">
                    <p className="bottom-block__created">
                      Created: {todo.createdAt.toLocaleString()}
                    </p>
                    <p className="bottom-block__edited">
                      Edited: {todo.edited?.toLocaleString() ?? "Not edited"}
                    </p>
                  </div>
                </div>
              )}
              <div className="button-block">
                <button type="button" onClick={() => handleToggle(todo.id)}>
                  {editModeId !== todo.id && "✏️"}
                </button>
                <button onClick={() => deleteTask(todo.id)}>🗑️</button>
              </div>
            </div>
          ))
        )}
      </section>
      <ToastContainer />
    </div>
  );
};
