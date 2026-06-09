import { useState } from "react";
import type { TODO_STATUS_FILTER } from "../constants/selectors";
import type { Todo } from "../types/Todo";

export function useTodoActions() {
  const [inputText, setInputText] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TODO_STATUS_FILTER>("all");
  const [searchWords, setSearchWords] = useState<string[]>([]);

  /**
   * TODO追加
   */
  const handleSubmit = () => {
    if (!inputText) {
      return;
    }
    setTodoList([
      { text: inputText, id: Date.now(), checked: false, deleted: false },
      ...todoList,
    ]);
    setInputText("");
  };

  /**
   * TODO入力
   */
  const handleEdit = (id: number, newText: string) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { id: id, text: newText } : todo,
      ),
    );
  };

  /**
   * TODOの完了・未完了の切り替え
   */
  const handleCheck = (id: number) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  };

  /**
   * TODO削除
   */
  const handleDelete = (id: number) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, deleted: true } : todo,
      ),
    );
  };

  /**
   * ステータスの絞り込み
   * @param selectedValue
   */
  const handleFilter = (selectedValue: TODO_STATUS_FILTER) => {
    setFilter(selectedValue);
  };

  const filteredInitialTodos = todoList.filter((todo) => {
    if (searchWords.length > 0) {
      return searchWords.every((word) => todo.text.includes(word));
    }
    if (filter === "all") {
      return !todo.deleted;
    } else if (filter === "incomplete") {
      return !todo.checked && !todo.deleted;
    } else if (filter === "complete") {
      return todo.checked && !todo.deleted;
    } else if (filter === "deleted") {
      return todo.deleted;
    } else {
      return todoList;
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
