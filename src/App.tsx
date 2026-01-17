import { useState } from "react";
import "./App.css";

type Todo = {
  text: string;
  readonly id: number;
};

function App() {
  const [inputText, setInputText] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const handleSubmit = () => {
    if (!inputText) {
      return;
    }
    setTodoList([{ text: inputText, id: Date.now() }, ...todoList]);
    setInputText("");
  };

  return (
    <div>
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
        {todoList.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" />
            <input type="text" value={todo.text} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
