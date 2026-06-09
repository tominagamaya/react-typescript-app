import { TodoList } from "../components/todo/TodoList";
import { SearchInput } from "../components/ui/SearchInput";
import { Selector } from "../components/ui/Selector";
import { TODO_STATUS } from "../constants/selectors";
import { InputText } from "../components/ui/InputText";
import { Button } from "../components/ui/Button";
import { useTodoActions } from "../hooks/useTodoActions";

function App() {
  const {
    handleSubmit,
    handleEdit,
    handleCheck,
    handleDelete,
    handleFilter,
    filteredInitialTodos,
    handleSearch,
    inputText,
    setInputText,
  } = useTodoActions();

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className={"flex items-center gap-3"}>
        <Selector options={TODO_STATUS} handleFilter={handleFilter} />
        <SearchInput handleSearch={handleSearch} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="mt-2 flex items-center gap-2"
      >
        <InputText
          value={inputText}
          placeholder="TODOを入力"
          onChange={setInputText}
        />
        <Button onClick={handleSubmit}>追加</Button>
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
