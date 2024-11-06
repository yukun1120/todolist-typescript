import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    }

    setTodos([newTodo, ...todos]);
    setInputValue('');
  }

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = e.target.value;
      }
      return todo;
    })
    setTodos(newTodos);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    })
    setTodos(newTodos);
  }

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <div>
        <h2>Todo List With TypeScript</h2>
        <form onSubmit={(e) => {handleSubmit(e)}}>
          <input type="text" onChange={(e) => {handleChange(e)}} className="inputText" />
          <input type="submit" value="追加" className="submitButton" />
        </form>
        <ul className="todoList">
          {todos.map((todo) => (
            <li key={todo.id}>
              <input 
                type="text" 
                className="todoText"
                value={todo.inputValue} 
                onChange={(e) => {handleEdit(e, todo.id)}}
                disabled={todo.checked}
              />
              <input type="checkbox" 
                checked={todo.checked} 
                onChange={() => {handleChecked(todo.id, todo.checked)}} 
              />
              <input type="button" 
                value="削除" 
                onClick={() => {handleDelete(todo.id)}} 
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
