import React, { useState, useEffect } from 'react'
import Board from './Board'
import './styles.css'
import Api from '../api'
import GroupsEditor from '../GroupsEditor'

import { Group, Task} from '../types'

function Boards(props: {list: Task[], modeSwitched: (newMode: string, id?: number ) => void }) {    
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

    const [ labels, setLabels ] = useState<Group[]>([])
    const [ isFirstLoadCompleted, setIsFirstLoadCompleted ] = useState<boolean>(false)
    const [ boardsGroupId, setBoardsGroupId] = useState<number | null>(null)
    const [ showGroupsEditor, setShowGroupsEditor] = useState<{ show: boolean, group?: Group }>({ show: false, group: undefined })

    useEffect(() => {
        const saveLabels = () => {
          const api = new Api()
          let data = { labels: labels }
          api.updateLabels(data)
        }

        if (isFirstLoadCompleted) saveLabels()
    }, [labels, isFirstLoadCompleted])

    const modeSwitchHandler = (newMode: string, id?: number) => {
        props.modeSwitched(newMode, id ? id : undefined)
    }

    const group = labels.find(group => group.id === boardsGroupId)
    const filterBoardTasks = (boardName: string) => {
        let list: Task[] = props.list.filter(task => task.labels.find(label => label === boardName))
        return list
    }
   
    const changeGroupHandler = (group: Group) => {
        setBoardsGroupId(group.id)
    }

    const openEditorHandler = (group: Group) => {
        setShowGroupsEditor({ show: true, group: group })
    }

    const clickAddGroupHandler = () => {
        setShowGroupsEditor({ show: true })
    }

    const boards = group && group.names.map((name,index) => 
        <Board
            key={index}
            name={name}
            list={filterBoardTasks(name)}
            modeSwitched={modeSwitchHandler}
        />
    )

    const isGroupActive = (group: Group) => boardsGroupId === group.id
    
    const groupNames = labels.map((group: Group, index: number) =>
        <div
            className={`inline board-name ${ isGroupActive(group) ? 'active-group' : null}`}
            onClick={() => isGroupActive(group) ? openEditorHandler(group) : changeGroupHandler(group)}
            key={index}
        >{ group.group }</div>
    )

    const saveGroupHandler = (newGroup: Group) => {
        let groupArray = [...labels]
        let groupIndex = groupArray.findIndex(group => group.id === newGroup.id)

        let filtredLabels = [...newGroup.names.filter(label => label && label.length > 0)]
        let filtredGroup = {...newGroup, names: filtredLabels }

        if (groupIndex === -1) {
            addGroup(filtredGroup)
        } else {
            modifyGroup(filtredGroup)
        }
        setShowGroupsEditor({ show: false })
    }

    const modifyGroup = (newGroup: Group) => {
        let groupArray = [...labels]
        let groupIndex = groupArray.findIndex(group => group.id === newGroup.id)
        
        groupArray[groupIndex] = {...groupArray[groupIndex], ...newGroup}
        setLabels(groupArray)
    }

    const addGroup = (newGroup: Group) => {
        let groupArray: Group[] = [...labels]
        groupArray.push(newGroup as Group)
        setLabels(groupArray as Group[])
    }

    const closeHandler = () => {
        setShowGroupsEditor({ show: false })
    }

    const deleteGroupHandler = (deletedGroup: Group) => {
        let groupArray = [...labels]
        let groupIndex = groupArray.findIndex(group => group.id === deletedGroup.id)

        groupArray.splice(groupIndex, 1)
        setLabels(groupArray)
        setShowGroupsEditor({ show: false })
    }

    const addNewGroupInput = showGroupsEditor.show
        ? <GroupsEditor
            groupSaved={saveGroupHandler}
            groupDeleted={deleteGroupHandler}
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
