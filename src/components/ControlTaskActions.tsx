import React from "react";
import type { ITodo } from "../App";

interface ControlTaskActionsProps {
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

export const ControlTaskActions = ({
  setTodos,
  todos,
}: ControlTaskActionsProps) => {
  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;

  const toggleAll = () => {
    const allCompleted = todos.every((todo) => todo.completed);
    setTodos(todos.map((todo) => ({ ...todo, completed: !allCompleted })));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <>
      <div className="controls">
        <select onChange={(e) => console.log(e.target.value)}>
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <button onClick={toggleAll}>
          {todos.length > 0 && todos.every((todo) => todo.completed)
            ? "Unmark all"
            : "Mark all as done"}
        </button>

        <button onClick={clearCompleted} disabled={completedCount === 0}>
          Clear completed
        </button>
      </div>

      <div className="stats">
        <span>{activeCount} active</span>
        <span>{completedCount} completed</span>
      </div>
    </>
  );
};
