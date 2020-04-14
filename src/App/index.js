import React, { useState, useEffect } from 'react'
import './styles.css'

import PageTaskEditor from '../PageTaskEditor'
import PageTask from '../PageTask'

import Boards from '../Boards'
import Api from '../api/api'
function App() {
  
  useEffect(() => {
    
    const fetch = async () => {
      const api = new Api()
      let response = await api.getTodoList()  
      setTodoList(response.data.todoList)
    }

    fetch()

  }, [])

  const [ todoList, setTodoList ] = useState([])
  const [ mode, setMode ] = useState('editor') // task or editor
  const [ editedTaskId, setEditedTaskId ] = useState(null)
  const [ shownTaskId, setShownTaskId ] = useState(null)

  useEffect(() => {
    const saveTodoList = () => {
      const api = new Api()
      let data = { todoList: todoList }
      api.updateTodoList(data)
    }

    saveTodoList()
  }, [todoList])

  const addTask = (task) => {
    let taskList = [...todoList]
    taskList.push(task)
    setTodoList(taskList)
  }

  const modifyTask = (modifidedTask) => {
    let taskList = [...todoList]
    let taskIndex = taskList.findIndex(task => task.id === modifidedTask.id)
    
    taskList[taskIndex] = {...taskList[taskIndex], ...modifidedTask}
    setTodoList(taskList)
    modeSwitchHandler('task', modifidedTask.id)
  }

  const deleteTaskHandler = (deletedTask) => {
    let taskList = [...todoList]
    let taskIndex = taskList.findIndex(task => task.id === deletedTask.id)
    taskList.splice(taskIndex, 1)
    setTodoList(taskList)
    modeSwitchHandler('editor')
  }

  const modeSwitchHandler = (newMode, id) => {
    setEditedTaskId(null)
    setShownTaskId(null)
    setMode(newMode)
    if (newMode === 'editor') setEditedTaskId(id)
    if (newMode === 'task') setShownTaskId(id)
  }

  const saveTaskHandler = (newTask) => {
    let taskList = [...todoList]
    let taskIndex = taskList.findIndex(task => task.id === newTask.id)

    if (taskIndex === -1) {
      addTask(newTask)
    } else {
      modifyTask(newTask)
    }
  }

  const taskToEdit = todoList.find(task => task.id === editedTaskId)
  const taskToShow = todoList.find(task => task.id === shownTaskId)

  const editor = mode === 'editor' ? <PageTaskEditor task={taskToEdit} list={todoList} saved={saveTaskHandler} /> : null
  const taskExpanded = mode === 'task' ? <PageTask modeSwitched={modeSwitchHandler} task={taskToShow} deleted={deleteTaskHandler} /> : null

  return (
    <div className="App">
      <header className="App-header">
        <Boards list={todoList} modeSwitched={modeSwitchHandler} />
        
        { editor }
        { taskExpanded }
      </header>
    </div>
  )
}

export default App
