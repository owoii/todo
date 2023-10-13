import { FormEvent, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
interface Props {
  addTodo: (todo: string) => void
}

export default function TodoForm({ addTodo }: Props) {
  const [value, setValue] = useState('')
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (value.length < 1 || value == '') {
      return alert("请输入内容")
    }
    addTodo(value)
    setValue('')
  }
  return (
    <form onSubmit={handleSubmit} className='w-full flex'>
      <input
        className='bg-transparent flex-1 px-4 py-2 shadow-lg border-r-0 outline-none rounded-l-full border border-blue-600' type="text" placeholder='写下想做的事情吧'
        value={value}
        onChange={(e) => { setValue(e.target.value) }}
      />
      <button
        type='submit'
        className='bg-blue-600 hover:bg-blue-500 transition-all py-2 px-8 rounded-r-full border border-blue-600'>
        <FiPlus />
      </button>
    </form>
  )
}
