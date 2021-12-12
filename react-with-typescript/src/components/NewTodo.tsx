import React, { useState, useRef } from "react";

type NewTodoProps = {
  onAddTodo: (todoText: string) => void;
};

const NewToDo: React.FC<NewTodoProps> = ({ onAddTodo }) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState();
  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    onAddTodo(enteredText);
  };

  return (
    <form onSubmit={todoSubmitHandler}>
      <div>
        <label htmlFor="todo=text">Todo Text</label>
        <input type="text" id="todo-text" ref={textInputRef} />
      </div>
      <button type="submit">ADD TODO</button>
    </form>
  );
};

export default NewToDo;
