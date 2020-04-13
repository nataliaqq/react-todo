import React from 'react'
import './styles.css'

function TaskValueInput(props) {
        let input = null

        if (props.type === 'input') {
            input = <input value={props.value} onChange={props.changed} placeholder="title"></input>
        }
        if (props.type === 'textarea') {
            input = <textarea value={props.value} onChange={props.changed}></textarea>
        }
    
    
    return (
        <div>
          <label>
            { input }
          </label>
        </div>
    )
}

export default TaskValueInput
