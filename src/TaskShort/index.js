import React from 'react'
import './styles.css'

import LabelsRow from '../Labels/Row'

function TaskShort(props) {
    const expandTask = () => {
        if (props.modeSwitched) props.modeSwitched('task', props.task.id)
    }

    return (
        <div className="task-label" onClick={expandTask}>
            <div className="task-title">{ props.task.name }</div>
            <LabelsRow labels={props.task.labels} className="floated" />
            
            
        </div>
    )
}

export default TaskShort
