import { useState } from "react";
import type { TODO_STATUS_FILTER } from "../constants/selectors";
import type { Todo } from "../types/Todo";
import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

export function useTodoActions() {
  const [inputText, setInputText] = useState<string>("");
  const [filter, setFilter] = useState<TODO_STATUS_FILTER>("all");
  const [searchWords, setSearchWords] = useState<string[]>([]);

  /**
   * TODOリストの取得
   */
  const fetchTodoList = async () => {
    try {
      return await apiClient({
        method: "GET",
        path: "/api/todos",
      });
    } catch (error) {
      console.error("データ取得失敗:", error);
    }
  };

  const { data: allTodoList = [] as Todo[], refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodoList,
  });

  /**
   * TODO追加
   */
  const handleSubmit = async () => {
    if (!inputText) {
      return;
    }
    try {
      return await apiClient({
        method: "POST",
        path: "/api/todos",
        data: { text: inputText },
      }).then(() => {
        setInputText("");
        refetch();
      });
    } catch (error) {
      console.error("データ追加失敗:", error);
    }
  };

  /**
   * TODO更新
   */
  const updateTodo = async (id: number, updatedFields: Partial<Todo>) => {
    const updatedTodo = allTodoList.find((todo: Todo) => todo.id === id);
    if (!updatedTodo) {
      console.error("TODOが見つかりません:", id);
      return;
    }
    const newTodo = { ...updatedTodo, ...updatedFields };
    try {
      return await apiClient({
        method: "PUT",
        path: `/api/todos/${id}`,
        data: { data: newTodo },
      }).then(() => {
        refetch();
      });
    } catch (error) {
      console.error("データ更新失敗:", error);
    }
  };

  /**
   * TODO入力
   */
  const handleEdit = (id: number, newText: string) => {
    updateTodo(id, { text: newText });
  };

  /**
   * TODOの完了・未完了の切り替え
   */
  const handleCheck = (id: number) => {
    updateTodo(id, {
      checked: !allTodoList.find((todo: Todo) => todo.id === id)?.checked,
    });
  };

  /**
   * TODO削除
   */
  const handleDelete = (id: number) => {
    updateTodo(id, { deleted: true });
  };

  /**
   * ステータスの絞り込み
   */
  const handleFilter = (selectedValue: TODO_STATUS_FILTER) => {
    setFilter(selectedValue);
  };

  /**
   * 表示するTODOリスト
   */
  const filteredInitialTodos = allTodoList.filter((todo: Todo) => {
    const matchesSearch = searchWords.every((word) => todo.text.includes(word));
    if (!matchesSearch) {
      return false;
    }
    switch (filter) {
      case "incomplete":
        return !todo.checked && !todo.deleted;
      case "complete":
        return todo.checked && !todo.deleted;
      case "deleted":
        return todo.deleted;
      case "all":
      default:
        return !todo.deleted;
    }
  });

  /**
   * 文字列での絞り込み
   */
  const handleSearch = (searchText: string) => {
    return setSearchWords(searchText.trim().replace(/\s+/g, " ").split(" "));
  };

  return {
    handleSubmit,
    handleEdit,
    handleCheck,
    handleDelete,
    handleFilter,
    filteredInitialTodos,
    handleSearch,
    inputText,
    setInputText,
  };
}
