import React, {useState} from 'react'
import './styles.css'

function GroupsEditor (props) {

    const [ inputsCounter, setInputsCounter ] = useState(props.group && props.group.names.length > 0 ? props.group.names.length : 1)
    const [ modifidedGroup, setModifidedGroup ] = useState(props.group ? props.group : { group: null, names: [] })

    const addInputHandler = () => {
        setInputsCounter(inputsCounter + 1)
    }

    const changeGroupNameHandler = (event) => {
        let group = {...modifidedGroup}
        group.group = event.target.value

        setModifidedGroup(group)
    }

    const changeLabelNameHandler = (index, event) => {
        let group = {...modifidedGroup}
        group.names[index] = event.target.value
        setModifidedGroup(group)
    }

    const clickSaveGroupHandler = () => {
        const idArray = props.groupList.map(group => group.id)
        const max = idArray.length > 0 ? Math.max(...idArray) : 0
        const newId = max ? max + 1 : 1
        
        let id = modifidedGroup.id ? modifidedGroup.id : newId
        let group = { id: id, group: modifidedGroup.group, names: modifidedGroup.names }
    
        if (!group.group) return alert('no group title')
        props.groupSaved(group)
    }

    const deleteGroupHandler = () => {
        props.groupDeleted(props.group)
    }

    const inputs = [...Array(inputsCounter)].map((x, index) => 
        <input
            key={index}
            value={modifidedGroup.names[index]}
            onChange={(event) => changeLabelNameHandler(index, event)}
            className="modal-label"
        />
    )
    
    return (
        <div>
            <div className="overlay">
            </div>
            <div className="modal-container">
                
                <div className="modal-content">
                    <div onClick={props.closed} className="to-right">close</div>
                    <input
                        placeholder="new group"
                        value={modifidedGroup ? modifidedGroup.group : ''}
                        onChange={changeGroupNameHandler}
                    />
                    labels:
                    { inputs }
                    <div className="add-more" onClick={addInputHandler}>+ more labels</div>

                    <button onClick={clickSaveGroupHandler}>add</button>
                    {   
                        props.group
                            ? <div className="delete" onClick={deleteGroupHandler}>delete</div>
                            : null
                    }
                </div>
            </div>
        </div>
    )
}

export default GroupsEditor