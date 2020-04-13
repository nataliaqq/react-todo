import React, { useState, useEffect } from 'react'
import Board from './Board'
import './styles.css'
import Api from '../api/api'

function Boards(props) {    
    useEffect(() => {
        const fetch = async () => {
            const api = new Api()
            let response = await api.getLabels()
            setBoardsGroupName(response.data.labels[0].group)
            setLabels(response.data.labels)
        }

        fetch()

    }, [])

    const modeSwitchHandler = (newMode, id) => {
        if (props.modeSwitched) props.modeSwitched(newMode, id)
    }

    const [ labels, setLabels ] = useState([])
    const [ boardsGroupName, setBoardsGroupName] = useState([])
    const group = labels.find(group => group.group === boardsGroupName)
    const filterBoardTasks = (boardName) => props.list.filter(task => task.labels.find(label => label === boardName))
   
    const changeGroupHandler = (newGroupName) => {
        setBoardsGroupName(newGroupName)
    }
    const boards = group && group.names.map(name => 
        <Board
            key={name}
            name={name}
            list={filterBoardTasks(name)}
            modeSwitched={modeSwitchHandler}
        />
    )

    const isGroupActive = (groupName) => boardsGroupName === groupName
    const groupNamesArray = labels.map(group => group.group)
    const groupNames = groupNamesArray.map(groupName =>
        <div
            className={`inline board-name ${ isGroupActive(groupName) ? 'active-group' : null}`}
            onClick={() => changeGroupHandler(groupName)}
            key={groupName}
        >{ groupName }</div>
    )

    return (
        <div>

            <div className="boards-label">boards by group: { groupNames }</div>

            <div className="boards-row">
                { boards }
            </div>
            
        </div>
    )
}

export default Boards
