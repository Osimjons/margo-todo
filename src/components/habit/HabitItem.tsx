import { useSortable } from "@dnd-kit/react/sortable";

import { useState } from "react";

import type { IHabit } from "../../models/habit";
import { deleteHabit, editHabit, toggleHabitDay } from "../../store/habit";
import { days, today } from "../../utils/utils";

interface IHabitItemProps {
  habit: IHabit;
  index: number;
}

export const HabitItem = ({ habit, index }: IHabitItemProps) => {
  const [editMode, setEditMode] = useState({ id: "", title: "" });

  const { ref } = useSortable({ index, id: habit.id });

  return (
    <div className="habit-row" ref={ref}>
      <div className="habit-name">
        {editMode.id === habit.id ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEditMode({ id: "", title: "" });
              editHabit({
                id: habit.id,
                newTitle: editMode.title.trim(),
              });
            }}
          >
            <input
              value={editMode.title || habit.title}
              name="edit"
              autoFocus
              onChange={(e) =>
                setEditMode({ ...editMode, title: e.target.value })
              }
              onBlur={() => {
                setEditMode({ id: "", title: "" });
                editHabit({
                  id: habit.id,
                  newTitle: editMode.title.trim(),
                });
              }}
            />
          </form>
        ) : (
          <>
            <span
              onDoubleClick={() =>
                setEditMode({
                  id: habit.id,
                  title: habit.title,
                })
              }
            >
              {index + 1}. {habit.title}
            </span>
            <button type="button" onClick={() => deleteHabit(habit.id)}>
              🗑️
            </button>
          </>
        )}
      </div>

      {days.map((day) => {
        const isChecked = habit.checkedDays.includes(day);

        return (
          <button
            key={day}
            type="button"
            className={`habit-circle
                      ${isChecked ? "active" : ""}
                      ${day === today ? "today-circle" : ""}
                    `}
            onClick={() => toggleHabitDay(habit.id, day)}
          />
        );
      })}
    </div>
  );
};
