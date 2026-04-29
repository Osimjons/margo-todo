import type { EnumTypes } from "../models/task";
import {
  clearCompletedTask,
  setFilterType,
  toggleCompletedAllTask,
  useTodo,
} from "../store/task";

export const ControlTaskActions = () => {
  const todos = useTodo();

  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <>
      <div className="controls">
        <select onChange={(e) => setFilterType(e.target.value as EnumTypes)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <button onClick={toggleCompletedAllTask}>
          {todos.length > 0 && todos.every((todo) => todo.completed)
            ? "Unmark all"
            : "Mark all as done"}
        </button>

        <button onClick={clearCompletedTask} disabled={completedCount === 0}>
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
