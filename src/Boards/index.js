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

            setBoardsGroupId(response.data.labels[0] ? response.data.labels[0].id : null)
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

    const [ boardsGroupId, setBoardsGroupId] = useState(null)
    const [ showGroupsEditor, setShowGroupsEditor] = useState({ show: false, group: null })

    const group = labels.find(group => group.id === boardsGroupId)
    const filterBoardTasks = (boardName) => props.list.filter(task => task.labels.find(label => label === boardName))
   
    const changeGroupHandler = (group) => {
        setBoardsGroupId(group.id)
    }

    const openEditorHandler = (group) => {
        setShowGroupsEditor({ show: true, group: group })
    }

    const clickAddGroupHandler = () => {
        setShowGroupsEditor({ show: true, group: null })
    }

    const boards = group && group.names.map((name,index) => 
        <Board
            key={index}
            name={name}
            list={filterBoardTasks(name)}
            modeSwitched={modeSwitchHandler}
        />
    )

    const isGroupActive = (group) => boardsGroupId === group.id
    
    const groupNames = labels.map((group, index) =>
        <div
            className={`inline board-name ${ isGroupActive(group) ? 'active-group' : null}`}
            onClick={() => isGroupActive(group) ? openEditorHandler(group) : changeGroupHandler(group)}
            key={index}
        >{ group.group }</div>
    )

    const saveGroupHandler = (newGroup) => {
        let groupArray = [...labels]
        let groupIndex = groupArray.findIndex(group => group.id === newGroup.id)

        let filtredLabels = [...newGroup.names.filter(label => label && label.length > 0)]
        let filtredGroup = {...newGroup, labels: filtredLabels }

        if (groupIndex === -1) {
            addGroup(filtredGroup)
        } else {
            modifyGroup(filtredGroup)
        }
        setShowGroupsEditor({ show: false, group: null })
    }

    // TODO delete

    const modifyGroup = (newGroup) => {
        let groupArray = [...labels]
        let groupIndex = groupArray.findIndex(group => group.id === newGroup.id)
        
        groupArray[groupIndex] = {...groupArray[groupIndex], ...newGroup}
        setLabels(groupArray)
    }

    const addGroup = (newGroup) => {
        let groupArray = [...labels]
        groupArray.push(newGroup)
        setLabels(groupArray)
    }

    const closeHandler = () => {
        setShowGroupsEditor({ show: false, group: null })
    }

    const addNewGroupInput = showGroupsEditor.show
        ? <GroupsEditor
            groupSaved={saveGroupHandler}
            closed={closeHandler}
            group={showGroupsEditor.group}
            groupList={labels} />
        : null

    return (
        <div>
            <div className="boards-label">
                { groupNames } <div className="inline add" onClick={clickAddGroupHandler}>(+add new)</div>
            </div> 

            { addNewGroupInput }

            <div className="boards-row">
                { boards }
            </div>
        </div>
    )
}

export default Boards
