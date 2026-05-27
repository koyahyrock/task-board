import { useState } from 'react'
import './App.css'

let nextId = 1

export default function App() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')

  function addTask() {
    const text = inputValue.trim()
    if (!text) return
    setTasks([...tasks, { id: nextId++, text, completed: false }])
    setInputValue('')
  }

  function toggleTask(id) {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') addTask()
  }

  const completedCount = tasks.filter(t => t.completed).length

  return (
    <div className="app">
      <h1>タスクボード</h1>

      <div className="input-row">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="新しいタスクを入力..."
        />
        <button className="add-btn" onClick={addTask}>追加</button>
      </div>

      {tasks.length === 0 ? (
        <p className="empty">タスクがありません。上のフォームからタスクを追加してください。</p>
      ) : (
        <>
          <ul className="task-list">
            {tasks.map(task => (
              <li key={task.id} className={`task-item${task.completed ? ' completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span className="task-text">{task.text}</span>
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>削除</button>
              </li>
            ))}
          </ul>
          <p className="summary">{completedCount} / {tasks.length} 件完了</p>
        </>
      )}
    </div>
  )
}
