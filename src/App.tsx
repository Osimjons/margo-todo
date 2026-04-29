import { useState } from "react";
import { ToastContainer } from "react-toastify";

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
import { getFormattedDate } from "./helper/helper";

export const App = () => {
  const [editingValue, setEditingValue] = useState("");
  const [editModeId, setEditModeId] = useState<string | null>(null);

  const todos = useTodo();

  const handleToggle = (id: string) => {
    const currentTodo = todos.find((todo) => todo.id === id);

    setEditingValue(currentTodo?.description || "");
    setEditModeId(id);
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
          (todos ?? []).map((todo) => (
            <div key={todo.id} className="item">
              <div className="inp">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => changeStatusTask(todo.id)}
                />
              </div>
              <div className="space-between">
                {editModeId !== todo.id ? (
                  <div className="card">
                    <p className={todo.completed ? "completed" : ""}>
                      {todo.description}
                    </p>
                    <div className="card__bottom-block bottom-block">
                      <p className="bottom-block__created">
                        Created: {getFormattedDate(todo.createdAt)}
                      </p>
                      <p className="bottom-block__edited">
                        Edited: {getFormattedDate(todo.edited) ?? "Not edited"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <input
                    type="text"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    autoFocus
                    onBlur={() => {
                      updateTask({
                        description: editingValue.trim(),
                        id: todo.id,
                      });
                      setEditModeId(null);
                    }}
                  />
                )}
                <div className="button-block">
                  <button type="button" onClick={() => handleToggle(todo.id)}>
                    {editModeId !== todo.id && "✏️"}
                  </button>
                  <button onClick={() => deleteTask(todo.id)}>🗑️</button>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
      <ToastContainer />
    </div>
  );
};
