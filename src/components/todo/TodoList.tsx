import type { Todo } from "../../types/Todo";

type Props = {
  todoList: Array<Todo>;
  handleCheck: (id: number) => void;
  handleEdit: (id: number, newText: string) => void;
  handleDelete: (id: number) => void;
};

/**
 * TODOリストのコンポーネント
 */
export function TodoList({
  todoList,
  handleCheck,
  handleEdit,
  handleDelete,
}: Props) {
  return (
    <ul className="mt-5 flex flex-col gap-2">
      {todoList.map((todo) => (
        <li key={todo.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={() => handleCheck(todo.id)}
            checked={todo.checked}
            className="w-4 h-4 appearance-none border border-gray-300 rounded checked:bg-green-100 checked:border-green-300 cursor-pointer relative checked:after:content-['✓'] checked:after:absolute checked:after:text-green-700 checked:after:text-xs checked:after:font-bold checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
          />
          <input
            type="text"
            value={todo.text}
            onChange={(e) => handleEdit(todo.id, e.target.value)}
            className="w-full"
          />
          <input
            type="submit"
            value="削除"
            onClick={() => handleDelete(todo.id)}
            className="h-8 w-16 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-md transition-colors duration-200"
          />
        </li>
      ))}
    </ul>
  );
}
