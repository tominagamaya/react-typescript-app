import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { initTodos } from "./controllers/todoController";
import router from "./routes/todoRoutes";

// サーバー環境変数の読み込み
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const env = process.env.NODE_ENV;
dotenv.config({ path: path.resolve(__dirname, `.env.${env}`) });
const app = express();

// フロント環境変数の読み込み
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
app.use(
  cors({ origin: FRONTEND_URL, methods: ["GET", "POST", "PUT", "DELETE"] }),
);
app.use(express.json());
app.use("/api/todos", router);

// DB初期化
initTodos();

// サーバーの起動
app.listen(PORT, () => {
  console.log(`🚀 Node.jsサーバーを http://localhost:${PORT} で起動しました！`);
});
