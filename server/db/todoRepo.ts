import { Todo, TodoRow } from "../types/todo";
import { db } from "./index";

/**
 * Todoテーブルの作成
 */
export const createTodoTable = () => {
  return db
    .prepare(
      `
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        checked INTEGER DEFAULT 0,
        deleted INTEGER DEFAULT 0
      )
      `,
    )
    .run();
};

/**
 * Todo一覧の取得
 */
export const selectAllTodos = () => {
  return db.prepare<[], TodoRow>("SELECT * FROM todos ORDER BY id").all();
};

/**
 * Todoの追加
 */
export const insertTodo = (text: string) => {
  return db
    .prepare<
      [string, number, number]
    >("INSERT INTO todos (text, checked, deleted) VALUES (?, ?, ?)")
    .run(text, 0, 0);
};

/**
 * Todoの更新
 */
export const updateTodo = (data: Todo) => {
  return db
    .prepare<
      [string, number, number, number]
    >("UPDATE todos SET text = ?, checked = ?, deleted = ? WHERE id = ?")
    .run(data.text, data.checked ? 1 : 0, data.deleted ? 1 : 0, data.id);
};
