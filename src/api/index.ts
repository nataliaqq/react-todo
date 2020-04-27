import axios from 'axios'
import { LabelsData, TodoListData } from '../types'

class Api {
    private url: string = 'https://jsonstorage.net/api/items/'
    private labelsId: string = '2e48f99d-9949-4d81-b180-14a987652e16'
    private todoListId: string = '34650a93-86ea-4adc-8a08-5ecae382a811' 

    getLabels (): any {
        return axios.get(this.url + this.labelsId)
    }

    getTodoList (): any {
        return axios.get(this.url + this.todoListId)
    }

    updateLabels (data: LabelsData): any {
        return axios.put(this.url + this.labelsId, data)
    }

    updateTodoList (data: TodoListData): any {
        return axios.put(this.url + this.todoListId, data)
    }
}

export default Api