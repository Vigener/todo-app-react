import { MouseEvent, useEffect, useRef, useState } from 'react'
import './App.css';
import Button from '@mui/material/Button';
import { Box, TextField } from '@mui/material';

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

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange2 = () => {
    if (!inputRef.current) return;
    setInputValue(inputRef.current.value);
  }

  const handleSubmit2 = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault(); // enterを押してもリロードされないようにする。
    // 新しいTodoを作成する。inputValueが空の場合は何もしない。
    if (!inputRef.current) return;
    const newTodo: Todo = {
      inputValue: inputRef.current.value,
      id: todos.length,
      checked: false
    };
    // 新しいTodoをtodosに追加する。
    setTodos([newTodo, ...todos,]);
    // inputValueを空にする。
    setInputValue('');
    // 入力欄を空にする。
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  return (
      <div className='App'>
        {/* <h2>Todoリスト</h2> */}
        {/* <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            className='inputText'
          />
          <input type="submit" value="作成" className='submitButton' />
        </form> */}
        <hr />
        <h2>Todoリスト</h2>
        {/* <input ref={inputRef} type="text" onChange={() => handleChange2()} /> */}
        <Box sx={{display: 'flex'}}>
          <TextField id="outlined-basic" label="タスクを入力"  variant="outlined" size="small" ref={inputRef} type='text' onChange={() => handleChange2()}/>
          <Button variant="contained" color="primary" onClick={(e) => handleSubmit2(e)}>作成</Button>
        </Box>
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
              <input type="checkbox" onChange={() => handleChecked(todo.id, todo.checked)}/>
              <button onClick={() => handleDelete(todo.id)}>削除</button>
            </li>
          ))}
        </ul>
      </div>
  )
}

export default App;
