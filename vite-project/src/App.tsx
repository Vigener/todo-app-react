import { useEffect, useState } from 'react'
import './App.css';
import AddTodo from './components/AddTodo';
import DeleteTodo from './components/DeleteTodo';
import TodoList from './components/TodoList';

function App() {
  const [inputValue, setInputValue] = useState(''); // inputValueのstateを作成。はじめは空の文字列。
  // const [todos, setTodos] = useState<Todo[]>([]); // Todoの配列(つまりinputValue,id,checkedのみ）を持つstateを作成。はじめは空の配列。

  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // enterを押してもリロードされないようにする。
    // 新しいTodoを作成する。inputValueが空の場合は何もしない。
    if (!inputValue) return;
    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false
    };
    // 新しいTodoをtodosに追加する。
    setTodos([newTodo, ...todos,]);
    // inputValueを空にする。
    setInputValue('');
    // 入力欄を空にする。
    const inputText = document.querySelector('.inputText') as HTMLInputElement;
    inputText.value = '';
  }

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  }

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  return (
      <div className='App'>
        <h2>Todoリスト</h2>
        {/* <AddTodo todos={todos} setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} />
        <DeleteTodo todos={todos} setTodos={setTodos} /> */}


        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            className='inputText'
          />
          <input type="submit" value="作成" className='submitButton' />
        </form>
        <ul className='todoList'>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="text"
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                className='inputText'
                value={todo.inputValue}
                disabled={todo.checked}
              />
              <input type="checkbox" onChange={(e) => handleChecked(todo.id, todo.checked)}/>
              <button onClick={() => handleDelete(todo.id)}>削除</button>
            </li>
          ))}
        </ul>
      </div>
  )
}

export default App;
