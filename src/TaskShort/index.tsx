import React from 'react'
import './styles.css'
 
import { Task } from '../types'
import LabelsRow from '../Labels/Row'

function TaskShort(props: { task: Task, modeSwitched: (newMode: string, id?: number ) => void }) {
    const expandTask = () => {
        props.modeSwitched('task', props.task.id)
    }

    return (
        <div className="task-label" onClick={expandTask}>
            <div className="task-title">{ props.task.name }</div>
            <LabelsRow labelClicked={() => {}}labels={props.task.labels} className="floated" activeLabels={null} key={1} />  
        </div>
    )
}

export default TaskShort
