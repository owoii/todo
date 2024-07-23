import { useLayoutEffect, useState } from "react";
import TodoForm from "./TodoForm";
import { v4 as uuidv4 } from 'uuid'
import Todo, { type TodoData } from "./Todo";
import { BsFillClipboard2CheckFill } from 'react-icons/bs'
import { FiShare, FiDownload, FiXOctagon,FiCircle } from 'react-icons/fi'
import EditTodoForm from "./EditTodoForm";
import clipboard from 'clipboard'

/** Todo 头部 */
function TodoHearder() {
  return (
    <div className="text-center select-none cursor-pointer text-lg mb-4 hover:bg-blue-900 rounded-md p-2 text-gray-200 items-center flex justify-start gap-2 flex-shrink-0">
      <BsFillClipboard2CheckFill />
      <h1>任务清单</h1>
    </div>
  )
}

function IconButton({ children, label, onClick }: { children: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <div className="flex items-center flex-col gap-2" onClick={() => onClick && onClick()}>
      <div className="rounded-full text-blue-400 hover:text-blue-50 hover:bg-blue-800 p-4 cursor-pointer transition-all bg-blue-950">
        {children}
      </div>
      <p className="text-blue-200">{label}</p>
    </div>
  )
}

interface TodoOptionProps {
  exportData: () => void
  importData: () => void
  resetTodo: () => void
}

function TodoOption({ exportData, importData, resetTodo }: TodoOptionProps) {

  return (
    <div className="flex flex-shrink-0 py-6 w-full md:backdrop-blur-none md:w-96 items-center px-6 justify-between  md:rounded-t-2xl md:rounded-2xl md:mt-4  md:bg-blue-900  left-0">
      <IconButton label="导出" onClick={exportData}>
        <FiShare className="w-6 h-6" />
      </IconButton>
      <IconButton label="导入" onClick={importData}>
        <FiDownload className="w-6 h-6 read-btn" />
      </IconButton>
      <IconButton label="重置" onClick={resetTodo}>
        <FiXOctagon className="w-6 h-6" />
      </IconButton>
    </div>
  )
}

export default function TodoWrapper() {
  const [todos, setTodosState] = useState<TodoData[]>([]);

  const setTodos = (todos: TodoData[]) => {
    setTodosState([...todos])
    localStorage.setItem('tasks', JSON.stringify(todos))
  }
  const initTodo = () => {
    const localData = localStorage.getItem('tasks')
    if (!localData) {
      resetTodo()
    }
    else {
      try {
        const tasksData = JSON.parse(localData)
        setTodos(tasksData)
      }
      catch (error) {
        console.log(error);
      }
    }
    return ""
  }

  const resetTodo = () => {
    const baseData = [{
      id: uuidv4(),
      task: "点击删除这个任务",
      completed: false,
      isEditing: false
    },
    {
      id: uuidv4(),
      task: "点击编辑这个任务",
      completed: false,
      isEditing: false
    }]
    localStorage.setItem('tasks', JSON.stringify(todos))
    setTodos(baseData)

  }

  useLayoutEffect(() => {
    initTodo()
  }, [])

  const addTodo = (todo: string) => {
    setTodos([...todos, {
      id: uuidv4(),
      task: todo,
      completed: false,
      isEditing: false
    }])
  }

  const toggleComplete = (id: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return todo
    }))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const editTodo = (id: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: true } : todo))
  }

  const updateTodo = (task: string, id: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: false, task } : todo))
  }

  const exportData = () => {
    const exportData = JSON.stringify(todos)
    clipboard.copy(exportData)
  }

  const handlerTaskData = (clipboardData: string) => {
    try {
      const taskData = JSON.parse(clipboardData)
      setTodos(taskData)
    } catch (error) {
      console.log(error);
    }
  }

  const importData = async () => {
    try {
      const taskData = await navigator.clipboard.readText()
      handlerTaskData(taskData)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col md:flex-none w-full h-full md:w-max md:h-auto justify-between">
      <div className="transition-all w-full md:w-96 bg-blue-950 md:rounded-xl overflow-x-hidden scrollbar-none rounded-b-3xl flex flex-col">
        <nav className="sticky top-0 left-0 py-6 bg-blue-950 px-4 flex-shrink-0">
          <TodoHearder />
          <TodoForm addTodo={addTodo} />
        </nav>
        <div className="transition-all h-full md:max-h-64 overflow-y-auto scrollbar-none flex flex-col gap-4 px-4 flex-1">
          {todos.map((todo, index) => (
            todo.isEditing ?
              (<EditTodoForm key={index} updateTodo={updateTodo} task={todo} />) :
              (<Todo
                task={todo} key={index}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                editTodo={editTodo} />)
          ))}
          {
            todos.length < 1 && (
              
              <div className="flex justify-center items-center text-blue-500 py-2 flex-col gap-4">
                <FiCircle size={48}/>
                <span>空空如也</span>
              </div>
            )
          }
        </div>
        <p className="flex-shrink-0 text-blue-600 py-4 text-center text-sm ">® Create By owocc</p>
      </div>
      <TodoOption exportData={exportData} importData={importData} resetTodo={resetTodo} />
    </div>

  );
}
