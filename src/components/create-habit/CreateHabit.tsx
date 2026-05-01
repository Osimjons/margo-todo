import { useState } from "react";
import { addHabit } from "../../store/habit";

export const CreateHabit = () => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;

    addHabit(value.trim());
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      name="habit"
    >
      <input
        type="text"
        placeholder="Add new habit"
        value={value}
        name="habit"
        onChange={(e) => setValue(e.target.value)}
      />

      <button type="submit">+</button>
    </form>
  );
};
