import React, { useState, useEffect } from 'react'
import './styles.css'

import PageTaskEditor from '../PageTaskEditor'
import PageTask from '../PageTask'

import Boards from '../Boards'
import Api from '../api'

import { Task, TodoListData } from '../types'

function App() {
  
  useEffect(() => {
    const fetch = async () => {
      const api = new Api()
      let response = await api.getTodoList()  
      setTodoList(response.data.todoList as Task[])
      setIsFirstLoadCompleted(response ? true : false)
    }

    fetch()

  }, [])

  const [ todoList, setTodoList ] = useState<Task[]>([])
  const [ mode, setMode ] = useState<string>('editor') // task or editor
  const [ editedTaskId, setEditedTaskId ] = useState<number | null>(null)
  const [ shownTaskId, setShownTaskId ] = useState<number | null>(null)
  const [ isFirstLoadCompleted, setIsFirstLoadCompleted ] = useState<boolean>(false)

  useEffect(() => {
    const saveTodoList = () => {
      const api = new Api()
      let data: TodoListData = { todoList: todoList as Task[]}
      api.updateTodoList(data as TodoListData)
    }

    if (isFirstLoadCompleted as boolean) saveTodoList()
  }, [todoList, isFirstLoadCompleted])

  const addTask = (task: Task): void => {
    let taskList: Task[] = [...todoList as Task[]]
    taskList.push(task as Task)
    setTodoList(taskList as Task[])
  }

  const modifyTask = (modifidedTask: Task): void => {
    let taskList: Task[] = [...todoList as Task[]]
    let taskIndex:number = taskList.findIndex(task => task.id as number === modifidedTask.id as number)
    
    taskList[taskIndex] = {...taskList[taskIndex] as Task, ...modifidedTask as Task}
    setTodoList(taskList as Task[])
    modeSwitchHandler('task', modifidedTask.id as number)
  }

  const deleteTaskHandler = (deletedTask: Task): void => {
    let taskList: Task[] = [...todoList]
    let taskIndex:number = taskList.findIndex(task => task.id === deletedTask.id)
    taskList.splice(taskIndex, 1)
    setTodoList(taskList)
    modeSwitchHandler('editor')
  }

  const modeSwitchHandler = (newMode: string, id?: number ): void => {
    setEditedTaskId(null)
    setShownTaskId(null)
    setMode(newMode as string)
    if (newMode === 'editor' && id) setEditedTaskId(id as number)
    if (newMode === 'task' && id) setShownTaskId(id as number)
  }

  const saveTaskHandler = (newTask: Task): void => {
    let taskList: Task[] = [...todoList as Task[]]
    let taskIndex = taskList.findIndex(task => task.id as number === newTask.id as number)

    if (taskIndex === -1) {
      addTask(newTask as Task)
    } else {
      modifyTask(newTask as Task)
    }
  }

  const taskToEdit: Task | undefined = todoList.find(task => task.id === editedTaskId)
  const taskToShow: Task | undefined = todoList.find(task => task.id === shownTaskId)

  const editor =    
    mode === 'editor'
      ? <PageTaskEditor
          task={taskToEdit}
          list={todoList}
          saved={saveTaskHandler}
        />
      : null

  const taskExpanded =
    mode === 'task'
      ? <PageTask
          modeSwitched={modeSwitchHandler}
          task={taskToShow}
          deleted={deleteTaskHandler}
        />
      : null

  return (
    <div className="App">
      <header className="App-header">
        <Boards
          list={todoList}
          modeSwitched={modeSwitchHandler}
        />

        { editor }
        { taskExpanded }
      </header>
    </div>
  )
}

export default App
