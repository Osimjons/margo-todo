import { useState, type SubmitEvent } from "react";
import type { ITodo } from "../App";

interface AddTaskFormProps {
  onSubmit: (event: SubmitEvent<HTMLFormElement>, description: string) => void;
}

export const AddTaskForm = ({ onSubmit }: AddTaskFormProps) => {
  const [newTask, setNewTask] = useState<ITodo["description"] | undefined>(
    undefined,
  );

  return (
    <form onSubmit={(e) => onSubmit(e, newTask ?? "")}>
      <input
        type="text"
        placeholder="Add new todo task"
        onChange={(e) => setNewTask(e.target.value)}
        value={newTask || ""}
      />
      <button type="submit">+</button>
    </form>
  );
};
