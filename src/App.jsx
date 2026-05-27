import { useState, useEffect } from 'react'
import './App.css'

const STORAGE_KEY = 'task-board-tasks'

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function nextIdFrom(tasks) {
  return tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function addTask() {
    const text = inputValue.trim()
    if (!text) return
    setTasks(prev => [...prev, { id: nextIdFrom(prev), text, completed: false }])
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
