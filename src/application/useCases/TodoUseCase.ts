import { Todo, CreateTodoDTO, UpdateTodoDTO } from '../../domain/entities/Todo'
import { ITodoRepository } from '../../infrastructure/repositories/TodoRepository'

export class TodoUseCase {
    constructor(private todoRepository: ITodoRepository) { }

    getAllTodos(): Todo[] {
        return this.todoRepository.findAll()
    }

    getTodoById(id: string): Todo | undefined {
        return this.todoRepository.findById(id)
    }

    createTodo(dto: CreateTodoDTO): Todo {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            title: dto.title,
            completed: false,
            createdAt: new Date()
        }
        return this.todoRepository.create(newTodo)
    }

    updateTodo(id: string, dto: UpdateTodoDTO): Todo {
        const todo = this.todoRepository.findById(id)
        if (!todo) {
            throw new Error('Todo not found')
        }

        const updatedTodo: Todo = {
            ...todo,
            ...dto,
            id: todo.id // id는 변경 불가
        }

        return this.todoRepository.update(updatedTodo)
    }

    deleteTodo(id: string): void {
        const todo = this.todoRepository.findById(id)
        if (!todo) {
            throw new Error('Todo not found')
        }
        this.todoRepository.delete(id)
    }
} 