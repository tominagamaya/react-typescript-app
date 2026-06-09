export const TODO_STATUS = [
  { value: "all", label: "すべて" },
  { value: "incomplete", label: "未完了" },
  { value: "complete", label: "完了済み" },
  { value: "deleted", label: "削除済み" },
] as const;

export type TODO_STATUS_FILTER = (typeof TODO_STATUS)[number]["value"];
