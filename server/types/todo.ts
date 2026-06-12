// DBの型 (SQLiteではbooleanはnumberで管理される)
export type TodoRow = {
  readonly id: number;
  text: string;
  checked: number;
  deleted: number;
};

// APIから渡される型
export type Todo = {
  readonly id: number;
  text: string;
  checked: boolean;
  deleted: boolean;
};
