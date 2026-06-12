import { Request, Response } from "express";
import {
  createTodoTable,
  insertTodo,
  selectAllTodos,
  updateTodo,
} from "../db/todoRepo";
import { TodoRow } from "../types/todo";

/************************
 * CRUD操作を行うコントローラー
 ************************/

/**
 * Todoテーブルの作成
 */
export const initTodos = () => {
  createTodoTable();
};

/**
 * Todo一覧を取得する
 */
export const getAllTodos = (_req: Request, res: Response) => {
  try {
    const todos = selectAllTodos();
    const formattedTodos = todos.map((todo: TodoRow) => ({
      ...todo,
      checked: todo.checked === 1,
      deleted: todo.deleted === 1,
    }));
    return res.json(formattedTodos);
  } catch (error) {
    res.status(500).json({ error: "データ取得に失敗しました" });
  }
};

/**
 * Todoを追加する
 */
export const addTodo = (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({ error: "必須項目が不足しています" });
    }
    const result = insertTodo(data.text);
    const newTodo = { id: result.lastInsertRowid, ...data };
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "データ追加に失敗しました" });
  }
};

/**
 * Todoを更新/論理削除する
 */
export const changeTodo = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({ error: "必須項目が不足しています" });
    }
    updateTodo(data);
    res.json({ id: Number(id), ...data });
  } catch (error) {
    res.status(500).json({ error: "データ更新に失敗しました" });
  }
};
