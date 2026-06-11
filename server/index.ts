import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import Database from "better-sqlite3";

// サーバー環境変数の読み込み
const env = process.env.NODE_ENV;
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });
const app = express();

// フロント環境変数の読み込み
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
app.use(
  cors({ origin: FRONTEND_URL, methods: ["GET", "POST", "PUT", "DELETE"] }),
);
// リクエストの本文(JSON)を解析
app.use(express.json());

/**
 * DB接続の初期化
 */
const db = new Database("todos.db");
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    checked INTEGER DEFAULT 0,
    deleted INTEGER DEFAULT 0
  )
`,
).run();

// TODO一覧取得
app.get("/api/todos", (_, res) => {
  try {
    const statement = db.prepare("SELECT * FROM todos ORDER BY id");
    const todos = statement.all();
    const formattedTodos = todos.map((todo: any) => ({
      ...todo,
      checked: todo.checked === 1,
      deleted: todo.deleted === 1,
    }));
    res.json(formattedTodos);
  } catch (error) {
    res.status(500).json({ error: "データ取得に失敗しました" });
  }
});

// TODO追加
app.post("/api/todos", (req, res) => {
  try {
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({ error: "必須項目が不足しています" });
    }
    const statement = db.prepare(
      "INSERT INTO todos (text, checked, deleted) VALUES (?, ?, ?)",
    );
    const result = statement.run(data.text, 0, 0);
    const newTodo = { id: result.lastInsertRowid, ...data };
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "データ追加に失敗しました" });
  }
});

// TODO更新
app.put("/api/todos/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({ error: "必須項目が不足しています" });
    }
    const statement = db.prepare(
      "UPDATE todos SET text = ?, checked = ?, deleted = ? WHERE id = ?",
    );
    statement.run(data.text, data.checked ? 1 : 0, data.deleted ? 1 : 0, id);
    res.json({ id: Number(id), ...data });
  } catch (error) {
    res.status(500).json({ error: "データ更新に失敗しました" });
  }
});

// サーバーの起動
app.listen(PORT, () => {
  console.log(`🚀 Node.jsサーバーを http://localhost:${PORT} で起動しました！`);
});
