import { useEffect, useState, useCallback } from 'react'
import './App.css'

interface Todo {
  id: number
  title: string
  completed: boolean
  priority: string
}

// Default mock data used when API is not available (e.g. running plain `vite dev`)
const MOCK_TODOS: Todo[] = [
  { id: 1, title: 'Learn React + Vite', completed: false, priority: 'high' },
  { id: 2, title: 'Build API functions', completed: true, priority: 'medium' },
  { id: 3, title: 'Deploy to production', completed: false, priority: 'low' },
]

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [apiConnected, setApiConnected] = useState<boolean | null>(null)
  const [newTodo, setNewTodo] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [nextLocalId, setNextLocalId] = useState(100)

  // Check API connectivity and fetch todos on mount
  useEffect(() => {
    const init = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/hello')
        if (!res.ok) throw new Error('API not ok')
        await res.json()
        setApiConnected(true)
        // API is available, fetch real todos
        const todosRes = await fetch('/api/todos')
        const todosData = await todosRes.json()
        if (todosData.success) {
          setTodos(todosData.data)
        }
      } catch {
        // API not available, use local mock data
        setApiConnected(false)
        setTodos([...MOCK_TODOS])
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  // Helper: call API if connected, otherwise operate locally
  const callApi = useCallback(
    async (url: string, options?: RequestInit) => {
      if (!apiConnected) return null
      const res = await fetch(url, options)
      return res.json()
    },
    [apiConnected]
  )

  const addTodo = async () => {
    if (!newTodo.trim()) return
    setError(null)
    try {
      const data = await callApi('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTodo.trim() }),
      })
      if (data?.success) {
        setTodos((prev) => [...prev, data.data])
      } else {
        // Local mode
        const localTodo: Todo = {
          id: nextLocalId,
          title: newTodo.trim(),
          completed: false,
          priority: 'medium',
        }
        setNextLocalId((n) => n + 1)
        setTodos((prev) => [...prev, localTodo])
      }
      setNewTodo('')
    } catch {
      setError('Failed to add todo')
    }
  }

  const toggleTodo = async (todo: Todo) => {
    setError(null)
    try {
      const data = await callApi('/api/todos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: todo.id, completed: !todo.completed }),
      })
      if (data?.success) {
        setTodos((prev) =>
          prev.map((t) => (t.id === todo.id ? data.data : t))
        )
      } else {
        // Local mode
        setTodos((prev) =>
          prev.map((t) =>
            t.id === todo.id ? { ...t, completed: !t.completed } : t
          )
        )
      }
    } catch {
      setError('Failed to update todo')
    }
  }

  const deleteTodo = async (id: number) => {
    setError(null)
    try {
      const data = await callApi(`/api/todos?id=${id}`, { method: 'DELETE' })
      if (data?.success) {
        setTodos((prev) => prev.filter((t) => t.id !== id))
      } else {
        // Local mode
        setTodos((prev) => prev.filter((t) => t.id !== id))
      }
    } catch {
      setError('Failed to delete todo')
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>React Function App</h1>
        <p className="subtitle">
          A full-stack example with React frontend and serverless API functions
        </p>
      </header>

      <main className="main">
        <section className="todo-section">
          <h2>Todo List</h2>
          <p className="section-desc">
            This list is managed by <code>/api/todos</code> serverless functions
            (GET, POST, PATCH, DELETE).
          </p>

          <div className="add-todo">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Add a new todo..."
              className="todo-input"
            />
            <button onClick={addTodo} className="btn btn-primary">
              Add
            </button>
          </div>

          {error && <div className="error">{error}</div>}

          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <ul className="todo-list">
              {todos.map((todo) => (
                <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                  <label className="todo-label">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo)}
                    />
                    <span className="todo-title">{todo.title}</span>
                    {todo.priority && (
                      <span className={`badge badge-${todo.priority}`}>
                        {todo.priority}
                      </span>
                    )}
                  </label>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </li>
              ))}
              {todos.length === 0 && (
                <li className="empty-state">No todos yet. Add one above!</li>
              )}
            </ul>
          )}
        </section>

        <section className="api-section">
          <h2>API Endpoints</h2>
          <p className="section-desc">
            The following serverless functions are available in the{' '}
            <code>/api</code> directory:
          </p>
          <div className="api-list">
            <div className="api-card">
              <h3>GET /api/hello</h3>
              <p>Health check endpoint. Returns a greeting message.</p>
            </div>
            <div className="api-card">
              <h3>GET /api/todos</h3>
              <p>List all todos. Supports <code>?completed=true</code> and <code>?priority=high</code> filters.</p>
            </div>
            <div className="api-card">
              <h3>POST /api/todos</h3>
              <p>Create a new todo. Body: <code>{"{ title, priority? }"}</code></p>
            </div>
            <div className="api-card">
              <h3>PATCH /api/todos</h3>
              <p>Update a todo. Body: <code>{"{ id, title?, completed?, priority? }"}</code></p>
            </div>
            <div className="api-card">
              <h3>DELETE /api/todos?id=1</h3>
              <p>Delete a todo by ID.</p>
            </div>
            <div className="api-card">
              <h3>GET /api/users/:id</h3>
              <p>Get user by dynamic ID. Example: <code>/api/users/1</code></p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          Built with <strong>React</strong> + <strong>Vite</strong> +{' '}
          <strong>IGA Pages Functions</strong>
        </p>
      </footer>
    </div>
  )
}

export default App
