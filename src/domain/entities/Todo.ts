export interface Todo {
    id: string
    title: string
    completed: boolean
    createdAt: Date
}

export interface CreateTodoDTO {
    title: string
}

export interface UpdateTodoDTO {
    title?: string
    completed?: boolean
} 