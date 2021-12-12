import React, { useState } from "react";
import TodoList from "./components/TodoList";
import NewToDo from "./components/NewTodo";
import { Todo } from "./todo.models";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const todoAddHandler = (text: string) => {
    setTodos(prev => [...prev, { id: Math.random().toString(), text }]);
  };
  const todoDeleteHandler = (todoId: string) => {
    setTodos(prev => prev.filter(o => o.id !== todoId));
  };
  return (
    <div className="App">
      <NewToDo onAddTodo={todoAddHandler} />
      <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
    </div>
  );
};

export default App;
