import { resetAllCheckedDays } from "../../store/habit";
import { currentMonthName } from "../../utils/utils";

interface IHabitActionsProps {
  disabled: boolean;
}

export const HabitActions = ({ disabled }: IHabitActionsProps) => {
  return (
    <div className="habit-actions">
      <button type="button" onClick={resetAllCheckedDays} disabled={disabled}>
        Reset month
      </button>
      <p
        style={{
          textTransform: "capitalize",
          color: "var(--text-h)",
        }}
      >
        {currentMonthName}
      </p>
    </div>
  );
};
