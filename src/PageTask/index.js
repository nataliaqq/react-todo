import React from 'react'
import LabelsRow from '../Labels/Row'
import './styles.css'

function PageTask(props) {
    const openEditor = (event) => {
        event.stopPropagation()
        props.modeSwitched('editor', props.task.id)
    }

    const closeEditor = () => {
        props.modeSwitched('editor')
    }

    const deleteTask = () => {
        props.deleted(props.task)
    }

    const labels = <LabelsRow labels={props.task.labels} />
  
    return (
        <div className="task-content">
            <div className="to-right">
                <div onClick={openEditor} className="underline">edit</div>
                <div onClick={closeEditor} className="underline">close</div>  
            </div>
            <div>
                <div># { props.task.id }</div>
                <div className="task-title">{ props.task.name }</div>
                <div>{ props.task.body }</div>

                <div>{ labels } </div>
            </div>

            <div onClick={deleteTask} className="underline delete">delete</div>
            
        </div>
    )
}

export default PageTask
