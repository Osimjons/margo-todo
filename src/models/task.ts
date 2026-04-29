export interface ITodo {
  description: string;
  completed: boolean;
  id: string;
  createdAt: Date;
  edited: Date | null;
}

export enum EnumTypes {
  ALL = "all",
  ACTIVE = "active",
  COMPLETED = "completed",
}
