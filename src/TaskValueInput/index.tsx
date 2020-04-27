import React from 'react'
import './styles.css'

interface TaskValueInputProps {
  type: string
  valueName: string
  value: string
  key: string
  changed: (event: React.ChangeEvent) => void
}

function TaskValueInput(props: TaskValueInputProps) {
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
