import { useState } from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState<string>("");
  const [todoList, setTodoList] = useState<string[]>([]);

  const handleSubmit = () => {
    if (!inputText) {
      return;
    }
    setTodoList([inputText, ...todoList]);
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
        {todoList.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
