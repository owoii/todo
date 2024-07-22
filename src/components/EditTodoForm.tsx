import { FormEvent, useState,useEffect } from "react"
import { TodoData } from "./Todo"
import {FiSave} from 'react-icons/fi'
interface Props {
  updateTodo: (task: string, id: string) => void,
  task: TodoData
}

export default function EditTodoForm({ task, updateTodo }: Props) {
  const [value, setValue] = useState(task.task)

  const maxLength = 100
  const [length,setLength] = useState(0)

  
  const handleUpdateTodo = (e: FormEvent) => {
    e.preventDefault()
    if (value.trim() == '') {
      return alert("打个字吧，求求你了")
    }
    updateTodo(value, task.id)
  } 
  //打开时需要获取长度

  useEffect(()=>{
    setLength(task.task.length)
  },[task])

  const handlerInput = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    setValue(e.target.value)
    setLength(e.target.value.length)
    if(e.target.value.length>maxLength){
      alert("哥们,你打太多字了")
    }
  }

  return (
    <form onSubmit={handleUpdateTodo} className="w-full flex-col flex relative rounded-xl bg-blue-800 focus-within:bg-blue-700 transition-all group shadow-lg p-4">
      <textarea
        className='bg-transparent placeholder:text-gray-300 flex-1 outline-none scrollbar-none w-full resize-none'
        rows={4}
        maxLength={maxLength}
        placeholder='随机应变'
        value={value}
        onChange={handlerInput}
      />
      <div className="w-full flex justify-between items-center">
        <div className="text-sm">
          <span className="text-blue-400">
            {length}
          </span>
          <span className="text-blue-300">
            /{maxLength}
          </span>
        </div>
        <button
          type='submit'
          className=' bg-blue-600 hover:bg-blue-500 transition-all py-2 px-4 rounded-lg flex-shrink-0 inline-flex items-center gap-2'>
            <FiSave/>
            <span className="text-sm">
              保存
            </span>
        </button>
      </div>
    </form>
  )
}
