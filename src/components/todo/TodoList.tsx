import type { Todo } from "../../types/Todo";

type Props = {
  todoList: Array<Todo>;
  handleCheck: (id: number) => void;
  handleEdit: (id: number, newText: string) => void;
  handleDelete: (id: number) => void;
};

export function TodoList({
  todoList,
  handleCheck,
  handleEdit,
  handleDelete,
}: Props) {
  return (
    <ul>
      {todoList.map((todo) => (
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
  );
}
