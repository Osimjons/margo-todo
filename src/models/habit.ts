export interface IHabit {
  id: string;
  title: string;
  checkedDays: number[]; // [1, 2, 5, 12]
  createdAt: Date;
}
