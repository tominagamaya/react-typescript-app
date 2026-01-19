export type Todo = {
  text: string;
  readonly id: number;
  checked?: boolean;
  deleted?: boolean;
};

export type Filter = "all" | "incomplete" | "complete" | "deleted";
