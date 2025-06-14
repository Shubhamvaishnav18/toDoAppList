export default function TodoItem({ task, onDelete, onToggle }) {
  return (
    <li
      className={`group flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
        task.completed
          ? "bg-green-50 border-green-200 hover:border-green-300"
          : "bg-white border-gray-200 hover:border-purple-300 hover:shadow-purple-100"
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
          task.completed
            ? "bg-green-500 border-green-500 text-white"
            : "border-gray-300 hover:border-purple-400 hover:bg-purple-50"
        }`}
      >
        {task.completed && (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      {/* Task Text */}
      <div
        onClick={() => onToggle(task.id)}
        className={`flex-1 cursor-pointer transition-all duration-200 ${
          task.completed ? "line-through text-gray-500" : "text-gray-800 hover:text-purple-600"
        }`}
      >
        <span className={`${task.completed ? "opacity-75" : ""}`}>{task.text}</span>
      </div>

      {/* Status */}
      <div
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          task.completed ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
        }`}
      >
        {task.completed ? "Done" : "Pending"}
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(task.id)}
        className="flex-shrink-0 w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
        title="Delete task"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </li>
  )
}
