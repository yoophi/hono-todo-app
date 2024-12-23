import { Todo, CreateTodoDTO, UpdateTodoDTO } from '../../domain/entities/Todo'
import { ITodoRepository } from '../../infrastructure/repositories/ITodoRepository'

export class TodoUseCase {
    constructor(private repository: ITodoRepository) { }

    async getAllTodos(): Promise<Todo[]> {
        return this.repository.findAll()
    }

    async getTodoById(id: string): Promise<Todo | null> {
        return this.repository.findById(id)
    }

    async createTodo(dto: CreateTodoDTO): Promise<Todo> {
        const todo = new Todo({ title: dto.title })
        return this.repository.create(todo)
    }

    async updateTodo(id: string, dto: UpdateTodoDTO): Promise<Todo | null> {
        return this.repository.update(id, dto)
    }

    async deleteTodo(id: string): Promise<boolean> {
        return this.repository.delete(id)
    }
} 