import { Todo } from '../../domain/entities/Todo'
import { ITodoRepository } from './ITodoRepository'

export class TodoRepository implements ITodoRepository {
    private todos: Todo[] = []

    async findAll(): Promise<Todo[]> {
        return this.todos
    }

    async findById(id: string): Promise<Todo | null> {
        return this.todos.find(todo => todo.id === id) || null
    }

    async create(todo: Todo): Promise<Todo> {
        this.todos.push(todo)
        return todo
    }

    async update(id: string, todoData: Partial<Todo>): Promise<Todo | null> {
        const index = this.todos.findIndex(todo => todo.id === id)
        if (index === -1) return null

        const updatedTodo = {
            ...this.todos[index],
            ...todoData,
            id: this.todos[index].id // id는 변경 불가
        }
        this.todos[index] = updatedTodo
        return updatedTodo
    }

    async delete(id: string): Promise<boolean> {
        const initialLength = this.todos.length
        this.todos = this.todos.filter(todo => todo.id !== id)
        return this.todos.length !== initialLength
    }
} 