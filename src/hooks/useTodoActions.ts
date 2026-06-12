import { startTransition, useOptimistic, useState } from "react";
import type { TODO_STATUS_FILTER } from "../constants/selectors";
import type { Todo } from "../types/Todo";
import { apiClient } from "@/lib/apiClient";

export function useTodoActions() {
  const [inputText, setInputText] = useState<string>("");
  const [allTodoList, setAllTodoList] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TODO_STATUS_FILTER>("all");
  const [searchWords, setSearchWords] = useState<string[]>([]);
  const [optimisticTodos, setOptimisticTodos] = useOptimistic<Todo[], Todo[]>(
    allTodoList,
    (_currentTodoList, newTodoList: Todo[]) => newTodoList,
  );

  /**
   * TODOリストの取得
   */
  const fetchTodoList = async () => {
    try {
      apiClient({
        method: "GET",
        path: "/api/todos",
      }).then((res) => {
        startTransition(() => {
          setOptimisticTodos(res);
        });
        setAllTodoList(res);
      });
    } catch (error) {
      console.error("データ取得失敗:", error);
    }
  };

  /**
   * TODO追加
   */
  const handleSubmit = async () => {
    if (!inputText) {
      return;
    }
    try {
      await apiClient({
        method: "POST",
        path: "/api/todos",
        data: { text: inputText },
      }).then((res) => {
        startTransition(() => {
          setOptimisticTodos([...optimisticTodos, res]);
        });
        setAllTodoList([...allTodoList, res]);
        setInputText("");
        fetchTodoList();
      });
    } catch (error) {
      console.error("データ追加失敗:", error);
    }
  };

  /**
   * TODO更新
   */
  const updateTodo = async (id: number, updatedFields: Partial<Todo>) => {
    const updatedTodo = allTodoList.find((todo) => todo.id === id);
    if (!updatedTodo) {
      console.error("TODOが見つかりません:", id);
      return;
    }
    const newTodo = { ...updatedTodo, ...updatedFields };
    try {
      apiClient({
        method: "PUT",
        path: `/api/todos/${id}`,
        data: { data: newTodo },
      }).then(() => {
        fetchTodoList();
      });
    } catch (error) {
      console.error("データ更新失敗:", error);
    }
  };

  /**
   * TODO入力
   */
  const handleEdit = (id: number, newText: string) => {
    const updateTodoList = allTodoList.map((todo) =>
      todo.id === id ? { id: id, text: newText } : todo,
    );
    startTransition(() => {
      setOptimisticTodos(updateTodoList);
    });
    setAllTodoList(updateTodoList);
    updateTodo(id, { text: newText });
  };

  /**
   * TODOの完了・未完了の切り替え
   */
  const handleCheck = (id: number) => {
    const updateTodoList = allTodoList.map((todo) =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo,
    );
    startTransition(() => {
      setOptimisticTodos(updateTodoList);
    });
    setAllTodoList(updateTodoList);
    updateTodo(id, {
      checked: !allTodoList.find((todo) => todo.id === id)?.checked,
    });
  };

  /**
   * TODO削除
   */
  const handleDelete = (id: number) => {
    const updateTodoList = allTodoList.map((todo) =>
      todo.id === id ? { ...todo, deleted: true } : todo,
    );
    startTransition(() => {
      setOptimisticTodos(updateTodoList);
    });
    setAllTodoList(updateTodoList);
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
  const filteredInitialTodos = optimisticTodos.filter((todo) => {
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
    fetchTodoList,
  };
}
