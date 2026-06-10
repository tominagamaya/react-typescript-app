import type { Todo } from "../../types/Todo";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/Table";

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
    <div className="mt-5" onTouchStart={() => {}}>
      <Table>
        <TableBody>
          {todoList.map((todo, index) => (
            <TableRow key={`${index}-${todo.id}`}>
              <TableCell>
                <Checkbox
                  id={`checkbox-${todo.id}`}
                  name={`checkbox-${todo.id}`}
                  checked={todo.checked}
                  onCheckedChange={() => handleCheck(todo.id)}
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  value={todo.text}
                  onChange={(e) => handleEdit(todo.id, e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 focus:outline-none"
                />
              </TableCell>
              <TableCell className="text-right">
                <input
                  type="submit"
                  value="削除"
                  onClick={() => handleDelete(todo.id)}
                  className="h-8 w-16 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-md transition-colors duration-200"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
