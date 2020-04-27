import React, {useState, ChangeEvent} from 'react'
import './styles.css'

import { Group } from '../types'

interface GroupEditorProps {
    groupSaved: (newGroup: Group) => void
    groupDeleted: (newGroup: Group) => void
    closed: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    group?: Group
    groupList: Group[]
}
function GroupsEditor (props: GroupEditorProps) {

    const [ inputsCounter, setInputsCounter ] = useState<number>(props.group && props.group.names.length > 0 ? props.group.names.length : 1)
    const [ modifidedGroup, setModifidedGroup ] = useState<Group>(props.group ? props.group : { id: null, group: '', names: [] })

    const addInputHandler = () => {
        setInputsCounter(inputsCounter + 1)
    }

    const changeGroupNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let group: Group = {...modifidedGroup as Group}
        group.group = event.target.value

        setModifidedGroup(group)
    }

    const changeLabelNameHandler = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        let group = {...modifidedGroup}
        group.names[index] = event.target.value
        setModifidedGroup(group)
    }

    const clickSaveGroupHandler = () => {
        const idArray: number[] = props.groupList.map(group => group.id ? group.id : 0)
        const max = idArray.length > 0 ? Math.max(...idArray) : 0
        const newId = max ? max + 1 : 1
        
        let id = modifidedGroup.id ? modifidedGroup.id : newId
        let group = { id: id, group: modifidedGroup.group, names: modifidedGroup.names }
    
        if (!group.group) return alert('no group title')
        props.groupSaved(group)
    }

    const deleteGroupHandler = () => {
        if (props.group) props.groupDeleted(props.group)
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