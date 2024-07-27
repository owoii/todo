import { FiTrash, FiEdit } from 'react-icons/fi'

export type TodoData = {
  id: string,
  task: string,
  completed: boolean,
  isEditing: boolean,

}

interface Props {
  task: TodoData,
  toggleComplete: (id: string) => void
  deleteTodo: (id: string) => void
  editTodo: (id: string) => void
}

function IconWrapper({ children, onClick }: { children: React.ReactNode, onClick: () => void }) {
  return (
    <div onClick={onClick} className='rounded-full transition-all active:scale-95 items-center flex justify-center cursor-pointer hover:bg-blue-400 p-2'>
      {children}
    </div>
  )
}

export default function Todo({ task, toggleComplete, deleteTodo, editTodo }: Props) {


  return (
    <div className='select-none flex hover:bg-blue-500 justify-between shadow-lg transition-all items-center bg-blue-600 py-2 px-4 rounded-xl'>
      <div className='break-all whitespace-pre-line text-ellipsis line-clamp-3'>
        <p
          onClick={() => toggleComplete(task.id)}
          className={task.completed ? 'decoration-blue-400 line-through text-blue-400' : ''}>
          {task.task}
        </p>
      </div>
      <div className='flex items-center flex-shrink-0'>
        <IconWrapper onClick={() => editTodo(task.id)}>
          <FiEdit />
        </IconWrapper>
        <IconWrapper onClick={() => deleteTodo(task.id)}>
          <FiTrash />
        </IconWrapper>
      </div>
    </div >
  )
}
