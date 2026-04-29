import { useState, type SubmitEvent } from "react";
import type { ITodo } from "../models/task";
import { addNewTask } from "../store/task";
import { toast } from "react-toastify";

export const AddTaskForm = () => {
  const [newTask, setNewTask] = useState<ITodo["description"] | undefined>(
    undefined,
  );

  const handleAddNewTask = (
    e: SubmitEvent<HTMLFormElement>,
    description: string,
  ) => {
    e.preventDefault();

    if (description && description.trim()) {
      addNewTask(description);
      toast.success("Event has been created");
    } else {
      toast.error("Please enter a valid task description");
    }
  };

  return (
    <form onSubmit={(e) => handleAddNewTask(e, newTask ?? "")}>
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
