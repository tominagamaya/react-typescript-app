import { useState } from "react";
import type { Filter, Todo } from "../types/Todo";
import { TodoList } from "../components/todo/TodoList";
import { Search } from "lucide-react";

function App() {
  const [inputText, setInputText] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
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
  const handleFilter = (selectedValue: Filter) => {
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

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className={"flex items-center gap-5"}>
        <select
          onChange={(e) => handleFilter(e.target.value as Filter)}
          className={
            "border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
          }
        >
          <option value="all">すべて</option>
          <option value="incomplete">未完了</option>
          <option value="complete">完了済み</option>
          <option value="deleted">削除済み</option>
        </select>

        <div className="flex items-center min-w-[380px] gap-1">
          <Search color="grey" size={20} />
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
            autoComplete={"on"}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="絞り込み検索"
          />
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="mt-2 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          placeholder="TODOを入力"
          onChange={(e) => setInputText(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
        />
        <input
          type="submit"
          value="追加"
          className="h-10 w-16 px-4 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium rounded-md transition-colors duration-200"
        />
      </form>
      <TodoList
        todoList={filteredInitialTodos}
        handleCheck={handleCheck}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
