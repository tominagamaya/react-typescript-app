import Database from "better-sqlite3";

/**
 * DB接続の初期化
 */
export const db = new Database("todos.db");
