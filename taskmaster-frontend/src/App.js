import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './components/TodoItem';
import './index.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const API_URL = 'http://localhost:5000/api/todos';

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!title.trim()) return;
    console.log("▶️ Submitting Todo:", title);
    try {
      await axios.post(API_URL, { title });
      setTitle('');
      fetchTodos();
    } catch (err) {
      console.error('❌ Failed to add todo:', err.response?.data || err.message);
    }
  };

  const toggleComplete = async (id, current) => {
    await axios.put(`${API_URL}/${id}`, { completed: !current });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-[#231910] text-white font-['Plus Jakarta Sans']">
      <header className="flex justify-between items-center border-b border-[#493522] px-10 py-3">
        <div className="flex items-center gap-4">
          <div className="text-white size-4">
            <svg viewBox="0 0 48 48" fill="currentColor"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" /></svg>
          </div>
          <h2 className="text-lg font-bold">TaskMaster</h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-[#493522] h-10 px-3 rounded-lg text-sm font-bold">🔔</button>
          <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/...")' }}></div>
        </div>
      </header>

      <div className="px-40 py-5">
        <div className="max-w-[960px] mx-auto">
          <h1 className="text-[32px] font-bold mb-4">My Tasks</h1>
          <div className="flex max-w-[480px] gap-4 mb-3">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-14 rounded-lg bg-[#493522] placeholder-[#cbac90] text-white p-4"
            />
          </div>
          <div className="flex justify-end mb-6">
            <button onClick={addTodo} className="bg-[#b95e0a] px-4 py-2 rounded-lg font-bold text-sm">
              Add Todo
            </button>
          </div>

          <h3 className="text-lg font-bold mb-2">Tasks</h3>
          {todos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} toggleComplete={toggleComplete} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
