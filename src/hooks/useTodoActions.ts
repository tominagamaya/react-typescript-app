import { startTransition, useOptimistic, useState } from "react";
import type { TODO_STATUS_FILTER } from "../constants/selectors";
import type { Todo } from "../types/Todo";

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
   * TODO追加
   */
  const handleSubmit = () => {
    if (!inputText) {
      return;
    }
    setAllTodoList([
      ...allTodoList,
      { text: inputText, id: Date.now(), checked: false, deleted: false },
    ]);
    setInputText("");
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
  };
}
