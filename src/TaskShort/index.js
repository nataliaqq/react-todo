import React from 'react'
import './styles.css'

import LabelsRow from '../Labels/Row'

function TaskShort(props) {
    const expandTask = () => {
        if (props.modeSwitched) props.modeSwitched('task', props.task.id)
    }

    return (
        <div className="task-label" onClick={expandTask}>
            <LabelsRow labels={props.task.labels} className="floated" />
            <span className="task-title">{ props.task.name }</span>
            
        </div>
    )
}

export default TaskShort
