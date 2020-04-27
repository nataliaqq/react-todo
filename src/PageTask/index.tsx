import React, { MouseEvent } from 'react'
import LabelsRow from '../Labels/Row'
import './styles.css'

import { Task } from '../types'
interface PageTaskProps {
    modeSwitched: (newMode: string, id?: number) => void
    task?: Task
    deleted: (deletedTask: Task) => void
}

function PageTask(props: PageTaskProps) {
    const openEditor = (event: MouseEvent) => {
        event.stopPropagation()
        if (props.task) props.modeSwitched('editor', props.task.id)
    }

    const closeEditor = () => {
        props.modeSwitched('editor')
    }

    const deleteTask = () => {
        if (props.task) props.deleted(props.task)
    }

    const labels = <LabelsRow
                        activeLabels={null}
                        labelClicked={() => {}}
                        key={0}
                        className={''}
                        labels={props.task ? props.task.labels : []}
                    />
  
    return (
        <div className="task-content">
            <div className="to-right">
                <div onClick={openEditor} className="underline">edit</div>
                <div onClick={closeEditor} className="underline">close</div>  
            </div>
            <div>
                <div># { props.task ? props.task.id : null}</div>
                <div className="task-title">{ props.task ? props.task.name : null }</div>
                <div>{ props.task ? props.task.body : null}</div>

                <div>{ labels } </div>
            </div>

            <div onClick={deleteTask} className="underline delete">delete</div>
            
        </div>
    )
}

export default PageTask
