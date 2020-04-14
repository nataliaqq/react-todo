import React, { useState, useEffect } from 'react'
import Board from './Board'
import './styles.css'
import Api from '../api/api'
import GroupsEditor from '../GroupsEditor'

function Boards(props) {    
    useEffect(() => {
        const fetch = async () => {
            const api = new Api()
            
            let response = await api.getLabels()

            setBoardsGroupName(response.data.labels[0] ? response.data.labels[0].group : null)
            setLabels(response.data.labels)
            setIsFirstLoadCompleted(response ? true : false)
        }

        fetch()
    }, [])

    const [ labels, setLabels ] = useState([])
    const [ isFirstLoadCompleted, setIsFirstLoadCompleted ] = useState(false)

    useEffect(() => {
        const saveLabels = () => {
          const api = new Api()
          let data = { labels: labels }
          api.updateLabels(data)
        }

        if (isFirstLoadCompleted) saveLabels()
      }, [labels, isFirstLoadCompleted])

    const modeSwitchHandler = (newMode, id) => {
        if (props.modeSwitched) props.modeSwitched(newMode, id)
    }

    const [ boardsGroupName, setBoardsGroupName] = useState([])

    const [ showGroupsEditor, setShowGroupsEditor] = useState(false)


    const group = labels.find(group => group.group === boardsGroupName)
    const filterBoardTasks = (boardName) => props.list.filter(task => task.labels.find(label => label === boardName))
   
    const changeGroupHandler = (newGroupName) => {
        setBoardsGroupName(newGroupName)
    }
    const boards = group && group.names.map((name,index) => 
        <Board
            key={index}
            name={name}
            list={filterBoardTasks(name)}
            modeSwitched={modeSwitchHandler}
        />
    )

    const isGroupActive = (groupName) => boardsGroupName === groupName
    const groupNamesArray = labels.map(group => group.group)
    const groupNames = groupNamesArray.map((groupName, index) =>
        <div
            className={`inline board-name ${ isGroupActive(groupName) ? 'active-group' : null}`}
            onClick={() => changeGroupHandler(groupName)}
            key={index}
        >{ groupName }</div>
    )

    const addGroupHandler = () => {
        setShowGroupsEditor(!showGroupsEditor)
    }

    const addNewGroupHandler = (newGroup) => {
        let lab = [...labels]
        lab.push(newGroup)
        setLabels(lab)
        closeHandler()
    }

    const closeHandler = () => {
        setShowGroupsEditor(false)
    }

    const addNewGroupInput = showGroupsEditor ? <GroupsEditor newGroupAdded={addNewGroupHandler} closed={closeHandler}/> : null

    return (
        <div>

            <div className="boards-label">
                { groupNames } <div className="inline add" onClick={addGroupHandler}>(+add new)</div>
            </div> 

            { addNewGroupInput }

            <div className="boards-row">
                { boards }
            </div>
            
        </div>
    )
}

export default Boards
