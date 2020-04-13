import axios from 'axios'

class Api {
    constructor () {
        this.url = 'https://jsonstorage.net/api/items/'
        this.labelsId = '2e48f99d-9949-4d81-b180-14a987652e16'
        this.todoListId = '34650a93-86ea-4adc-8a08-5ecae382a811'
    }

    getLabels () {
        return axios.get(this.url + this.labelsId)
    }

    getTodoList () {
        return axios.get(this.url + this.todoListId)
    }

    updateLabels (data) {
        return axios.put(this.url + this.labelsId, data)
    }

    updateTodoList (data) {
        return axios.put(this.url + this.todoListId, data)
    }
   
}

export default Api