export type Todo = {
  text: string;
  readonly id: number;
  checked?: boolean;
  deleted?: boolean;
};
