export class Todo {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;

    constructor(params: { title: string, id?: string, completed?: boolean, createdAt?: Date }) {
        this.id = params.id || crypto.randomUUID();
        this.title = params.title;
        this.completed = params.completed || false;
        this.createdAt = params.createdAt || new Date();
    }
}

export interface CreateTodoDTO {
    title: string
}

export interface UpdateTodoDTO {
    title?: string
    completed?: boolean
} 