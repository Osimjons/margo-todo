import { useSortable } from "@dnd-kit/react/sortable";

import { useState } from "react";

import type { IHabit } from "../../models/habit";
import { deleteHabit, editHabit, toggleHabitDay } from "../../store/habit";
import { days, today } from "../../utils/utils";
import { Button, Dialog, DialogTitle, Stack } from "@mui/material";

interface IHabitItemProps {
  habit: IHabit;
  index: number;
}

export const HabitItem = ({ habit, index }: IHabitItemProps) => {
  const [editMode, setEditMode] = useState({ id: "", title: "" });
  const [confirmDelete, setConfirmDelete] = useState(false);

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
            <button type="button" onClick={() => setConfirmDelete(true)}>
              🗑️
            </button>
          </>
        )}
      </div>

      {days.map((day) => {
        const isChecked = habit.checkedDays.includes(day);

        const bgc = habit.backgroundColor
          ? {
              backgroundColor: habit.backgroundColor,
              borderColor: habit.backgroundColor,
            }
          : {};

        return (
          <button
            key={day}
            type="button"
            className={`habit-circle
                      ${isChecked ? "active" : ""}
                      ${day === today ? "today-circle" : ""}
                    `}
            style={isChecked ? bgc : {}}
            onDoubleClick={() => toggleHabitDay(habit.id, day)}
          />
        );
      })}

      <Dialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "var(--border)",
            color: "var(--text-h)",
            borderRadius: 3,
            p: 5,
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" textAlign="center">
          "Do you wanna delete this habit?"
        </DialogTitle>
        <Stack
          alignItems="center"
          justifyContent="center"
          gap={2}
          direction="row"
        >
          <Button
            variant="contained"
            color="warning"
            onClick={() => deleteHabit(habit.id)}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => setConfirmDelete(false)}
          >
            No
          </Button>
        </Stack>
      </Dialog>
    </div>
  );
};
