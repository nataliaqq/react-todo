import React, { useState, useEffect, ChangeEvent } from 'react'
import TaskValueInput from '../TaskValueInput'
import { findGroupName } from '../data/labels'
import LabelsRow from '../Labels/Row'
import Api from '../api'

import { Group, Task } from '../types'

import './styles.css'

function PageTaskEditor(props: { task?: Task, list: Task[], saved: (task: Task) => void}) {
    useEffect(() => {
        const fetch = async () => {
            const api = new Api()
            let response = await api.getLabels()
            
            setLabels(response.data.labels)
        }

        fetch()

    }, [])


    const [ labels, setLabels ] = useState<Group[]>([])
    const [ selectedLabels, setSelectedLabels ] = useState<string[] | []>(props.task ? props.task.labels : [])

    let emptyTask = { id: null, name: '', body: '', labels: [] }
    const [ modifidedTask, setModifidedTask ] = useState(props.task ? {...props.task} : {...emptyTask})

    const saveClickHandler = () => {
        const idArray: number[] = props.list.map(task => task.id)
        const max = idArray.length > 0 ? Math.max(...idArray) : 0
        const newId = max ? max + 1 : 1
        
        let id = modifidedTask.id ? modifidedTask.id : newId
        let task = { id: id, name: modifidedTask['name'], body: modifidedTask['body'], labels: selectedLabels }

        if (!task.name) {
            alert('no task title')
            return
        }
        
        props.saved(task as Task)
        setModifidedTask(emptyTask)
    }

    const changeValueHandler = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
        let task: Task = {...modifidedTask as Task}
        if (key === 'name') {
            task['name'] = event.target.value
        }
        if (key === 'body') {
            task['body'] = event.target.value
        }

        setModifidedTask(task)
    }

    const addItemToList = (item: any, list: any[]) => {
        list.push(item)
    }

    const removeItemFromList = (item: any, list: any[]) => {
        let itemIndex = list.findIndex(x => x === item)
        list.splice(itemIndex, 1)
    }

    const labelClickHandler = (labelName: string) => {
        let labelIndex = selectedLabels.findIndex(name => name === labelName)
        let alreadyAdded = labelIndex > -1
        let selectedLabelsArray = [...selectedLabels]

        const alreadyHasFromSameGroup = (label: string) => {   
            let groupsArray = selectedLabelsArray.map(name => findGroupName(name, labels))
            let labelGroupName = findGroupName(label, labels)

            return !!groupsArray.find(groupName => groupName === labelGroupName)
        }
        
        const removeAllFromSameGroup = (label: string) => {
            let targetGroupName = findGroupName(label, labels)
            
            selectedLabelsArray.forEach(selectedLabel => {
                if (findGroupName(selectedLabel, labels) === targetGroupName) {
                    removeItemFromList(selectedLabel, selectedLabelsArray)
                }
            }) 
        }
        
        if (alreadyAdded) {
            removeItemFromList(labelName, selectedLabelsArray)
        } else {
            if (alreadyHasFromSameGroup(labelName)) {
                removeAllFromSameGroup(labelName)
            }
            addItemToList(labelName, selectedLabelsArray)
        }
        setSelectedLabels(selectedLabelsArray)
    }

    const allLabels =
        !labels || !labels.length
            ?  []
            : labels.map((group: Group, index: number) => 
                <LabelsRow
                    activeLabels={selectedLabels}
                    labelClicked={labelClickHandler}
                    className="inline"
                    labels={group.names}
                    key={index}
                />
            )

    return (
        <div className="editor-content">
            <TaskValueInput
                type='input'
                valueName='name'
                value={modifidedTask.name}
                key='name'
                changed={(event: ChangeEvent) => changeValueHandler('name', event as ChangeEvent<HTMLInputElement>) }
            />
            <TaskValueInput
                type='textarea'
                valueName='body'
                key='body'
                value={modifidedTask.body}
                changed={(event: ChangeEvent) => changeValueHandler('body', event as ChangeEvent<HTMLInputElement>) }
            />

            <div className="labels-block">
                { allLabels }
            </div>
           
            <button onClick={saveClickHandler}>{ props.task ? 'save' : 'add' }</button>
        </div>
    )
}

export default PageTaskEditor
