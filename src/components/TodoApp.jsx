import { useState, useEffect } from "react"
import TodoItem from "./TodoItem"

export default function TodoApp() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || [])
  const [input, setInput] = useState("")
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (!input.trim()) return alert("Task cannot be empty")
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }])
    setInput("")
  }

  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id))
  const toggleComplete = (id) =>
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))

  const filteredTasks = tasks.filter((task) =>
    filter === "all" ? true : filter === "completed" ? task.completed : !task.completed,
  )

  const taskCounts = {
    all: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    pending: tasks.filter((task) => !task.completed).length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-lg mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            ✨ Todo List
          </h1>
          <p className="text-gray-600 text-sm">Stay organized and productive</p>
        </div>

        {/* Add Task Input */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <input
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all duration-200 placeholder-gray-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What needs to be done?"
              onKeyPress={(e) => e.key === "Enter" && addTask()}
            />
          </div>
          <button
            onClick={addTask}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            Add
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
          {[
            { key: "all", label: "All", count: taskCounts.all },
            { key: "pending", label: "Active", count: taskCounts.pending },
            { key: "completed", label: "Completed", count: taskCounts.completed },
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === key
                  ? "bg-white text-purple-600 shadow-md"
                  : "text-gray-600 hover:text-purple-600 hover:bg-white/50"
              }`}
            >
              {label}
              <span
                className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
                  filter === key ? "bg-purple-100 text-purple-600" : "bg-gray-200 text-gray-500"
                }`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Tasks List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">{filter === "completed" ? "🎉" : filter === "pending" ? "📝" : "📋"}</div>
              <p className="text-gray-500 text-lg font-medium">
                {filter === "completed"
                  ? "No completed tasks yet"
                  : filter === "pending"
                    ? "No pending tasks"
                    : "No tasks yet"}
              </p>
              <p className="text-gray-400 text-sm mt-1">{filter === "all" && "Add a task to get started!"}</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {filteredTasks.map((task) => (
                <TodoItem key={task.id} task={task} onDelete={deleteTask} onToggle={toggleComplete} />
              ))}
            </ul>
          )}
        </div>

        {/* Footer Stats */}
        {tasks.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>
                {taskCounts.pending} of {taskCounts.all} tasks remaining
              </span>
              <div className="flex gap-4">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  {taskCounts.completed} done
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  {taskCounts.pending} pending
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
