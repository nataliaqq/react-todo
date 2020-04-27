import React from 'react'
import TaskShort from '../../TaskShort'

import { Task } from '../../types'

import './styles.css'

function Board(props: { key: number, name: string, list: Task[], modeSwitched: (newMode: string, id?: number ) => void}) {
    const modeSwitchHandler = (newMode: string, id?: number) => {
        props.modeSwitched(newMode as string, id ? id as number : undefined)
    }

    const tasks = props.list.map(task => 
        <TaskShort
            key={task.id}
            task={task}
            modeSwitched={modeSwitchHandler}
        />
    )
    return (
        <div className="board">
            <div className="board-title">{ props.name }</div>
            { tasks }
        </div>
    )
}

export default Board
