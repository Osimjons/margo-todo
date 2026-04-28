import { useState, type SubmitEvent } from "react";
import { ToastContainer, toast } from "react-toastify";

import "./App.css";
import { AddTaskForm } from "./components/AddTaskForm";
import { ControlTaskActions } from "./components/ControlTaskActions";
import { EmptyTaskList } from "./components/EmptyTaskList";

export interface ITodo {
  description: string;
  completed: boolean;
  id: number;
  createdAt: Date;
  edited: Date | null;
}

const initialTodos: ITodo[] = [
  {
    completed: false,
    description: "SomeThings",
    id: 1,
    createdAt: new Date(),
    edited: new Date(),
  },
  {
    completed: false,
    description: "SomeThings-3",
    id: 2,
    createdAt: new Date(),
    edited: new Date(),
  },
];

export const App = () => {
  const [editingValue, setEditingValue] = useState("");
  const [todos, setTodos] = useState<ITodo[]>(initialTodos);
  const [editModeId, setEditModeId] = useState<number | null>(null);

  const handleChange = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    toast("Event has been deleted", { type: "default", autoClose: 2000 });
  };

  const handleToggle = (id: number) => {
    const currentTodo = todos.find((todo) => todo.id === id);

    if (editModeId === id) {
      handleDescriptionChange(id, editingValue);
      setEditModeId(null);
      return;
    }

    setEditingValue(currentTodo?.description || "");
    setEditModeId(id);
  };

  const handleDescriptionChange = (id: number, description: string) => {
    const currentTodo = todos.find((todo) => todo.id === id);

    if (!currentTodo) return;

    if (currentTodo.description.trim() === description.trim()) {
      setEditModeId(null);
      return;
    }

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              description,
              completed: false,
              edited: new Date(),
            }
          : todo,
      ),
    );

    toast("Task has been updated", {
      type: "info",
      autoClose: 2000,
    });
  };

  const handleAddNewTask = (
    e: SubmitEvent<HTMLFormElement>,
    description: string,
  ) => {
    e.preventDefault();

    if (description && description.trim()) {
      setTodos((prev) => [
        ...prev,
        {
          id: todos.length + 1,
          description,
          completed: false,
          createdAt: new Date(),
          edited: null,
        },
      ]);
      toast.success("Event has been created");
    } else {
      toast.error("Please enter a valid task description");
    }
  };

  return (
    <div className="container">
      <section className="counter">
        <h1>
          <span style={{ color: "var(--accent)" }}>Margo</span>`s Todo List
        </h1>

        <AddTaskForm onSubmit={handleAddNewTask} key={todos.length} />
        <ControlTaskActions setTodos={setTodos} todos={todos} />

        {todos.length === 0 ? (
          <EmptyTaskList />
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="item">
              <div className="inp">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleChange(todo.id)}
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
                <button
                  onClick={() => handleDelete(todo.id)}
                  aria-label="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </section>
      <ToastContainer />
    </div>
  );
};
