import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// フロントエンド（ポート5173）からの通信を許可
app.use(cors());
// リクエストの本文(JSON)を解析
app.use(express.json());

// TODO: 初期表示データ （DB実装後に削除）
let todos = [
  { text: "朝ごはん", id: 1, checked: false, deleted: false },
  { text: "お昼ごはん", id: 2, checked: false, deleted: false },
];

// TODO一覧取得
app.get("/api/todos", (_, res) => {
  res.json(todos);
});

// TODO追加
app.post("/api/todos", (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({ error: "必須項目が不足しています" });
  }
  todos.push(data);
  res.status(201).json(data);
});

// サーバーの起動
app.listen(PORT, () => {
  console.log(`🚀 Node.jsサーバーを http://localhost:${PORT} で起動しました！`);
});
