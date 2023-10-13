import { FormEvent, useState } from "react"
import { TodoData } from "./Todo"

interface Props {
  updateTodo: (task: string, id: string) => void,
  task: TodoData
}

export default function EditTodoForm({ task, updateTodo }: Props) {
  const [value, setValue] = useState(task.task)
  const handleUpdateTodo = (e: FormEvent) => {
    e.preventDefault()
    updateTodo(value, task.id)
  }
  return (
    <form onSubmit={handleUpdateTodo} className="w-full flex items-center">
      <input
        type="text"
        className='bg-blue-800  placeholder:text-gray-300 flex-1 px-4 py-2 shadow-lg border-r-0 outline-none rounded-l-full border border-blue-400'
        placeholder='随机应变'
        value={value}
        onChange={(e) => { setValue(e.target.value) }}
      />
      <button
        type='submit'
        className='bg-blue-800 hover:bg-blue-600 transition-all py-2 px-8 rounded-r-full border border-l-0 border-blue-400'>保存</button>
    </form>
  )
}
