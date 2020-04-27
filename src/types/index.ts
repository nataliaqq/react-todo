export type Group = {
    id: number | null,
    group: string,
    names: string[] 
}

export type LabelsData = {
    labels: Group[]
}

export type Task = {
    id: number,
    name: string,
    body: string,
    labels: string[]
}

export type TodoListData = {
    todoList: Task[]
}