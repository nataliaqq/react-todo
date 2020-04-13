import React from 'react'
import TaskShort from '../../TaskShort'

import './styles.css'

function Board(props) {
    const modeSwitchHandler = (newMode, id) => {
        if (props.modeSwitched) props.modeSwitched(newMode, id)
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
