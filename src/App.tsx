import { useState } from "react";
import "./App.css";

type Todo = {
  text: string;
  readonly id: number;
  checked?: boolean;
  deleted?: boolean;
};

type Filter = "all" | "incomplete" | "complete" | "deleted";

function App() {
  const [inputText, setInputText] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [searchWords, setSearchWords] = useState<string[]>([]);

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

  const handleEdit = (id: number, newText: string) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { id: id, text: newText } : todo
      )
    );
  };

  const handleCheck = (id: number) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, deleted: true } : todo
      )
    );
  };

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
      todoList;
    }
  });

  const handleSearch = (searchText: string) => {
    return setSearchWords(searchText.trim().replace(/\s+/g, " ").split(" "));
  };

  return (
    <div>
      <select onChange={(e) => handleFilter(e.target.value as Filter)}>
        <option value="all">すべて</option>
        <option value="incomplete">未完了</option>
        <option value="complete">完了済み</option>
        <option value="deleted">削除済み</option>
      </select>
      <input
        type="text"
        className="searchInput"
        autoComplete={"on"}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          value={inputText}
          placeholder="TODOを入力"
          onChange={(e) => setInputText(e.target.value)}
        />
        <input type="submit" value="追加" />
      </form>
      <ul>
        {filteredInitialTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              onChange={() => handleCheck(todo.id)}
              checked={todo.checked}
            />
            <input
              type="text"
              value={todo.text}
              onChange={(e) => handleEdit(todo.id, e.target.value)}
            />
            <input
              type="submit"
              value="削除"
              onClick={() => handleDelete(todo.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
