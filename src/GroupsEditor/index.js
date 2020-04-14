import React, {useState} from 'react'
import './styles.css'

function GroupsEditor (props) {

    const [ inputsCounter, setInputsCounter ] = useState(1)

    const [ groupName, setGroupName ] = useState('')
    const [ labelNames, setLabelNames ] = useState([])

    const addInputHandler = () => {
        setInputsCounter(inputsCounter + 1)
    }

    const changeGroupNameHandler = (event) => {
        setGroupName(event.target.value)
    }

    const changeLabelNameHandler = (index, event) => {
        let labels = [...labelNames]
        labels[index] = event.target.value
        labels = labels.filter(label => label && label.length > 0) 
        setLabelNames(labels)
    }

    const addGroupHandler = () => {
        if (!groupName) return alert('no group name')
        props.newGroupAdded({ group: groupName, names: labelNames })
    }

    const inputs = [...Array(inputsCounter)].map((x, index) => 
        <input key={index} onChange={(event) => changeLabelNameHandler(index, event)} className="modal-label"></input>
    )
    
    return (
        <div>
            <div className="overlay">
            </div>
            <div className="modal-container">
                
                <div className="modal-content">
                    <div onClick={props.closed} className="to-right">close</div>
                    <input placeholder="new group" onChange={changeGroupNameHandler}></input>
                    labels:
                    { inputs }
                    <div className="add-more" onClick={addInputHandler}>+ more labels</div>

                    <button onClick={addGroupHandler}>add</button>
                </div>
            </div>
        </div>
    )
}

export default GroupsEditor