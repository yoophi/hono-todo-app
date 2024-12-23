import { Todo } from '../../domain/entities/Todo'
import { ITodoRepository } from './ITodoRepository'

export class TodoRepository implements ITodoRepository {
    private todos: Todo[] = []

    findAll(): Todo[] {
        return this.todos
    }

    findById(id: string): Todo | undefined {
        return this.todos.find((todo) => todo.id === id)
    }

    create(todo: Todo): Todo {
        this.todos.push(todo)
        return todo
    }

    update(todo: Todo): Todo {
        const index = this.todos.findIndex((t) => t.id === todo.id)
        if (index !== -1) {
            this.todos[index] = todo
            return todo
        }
        throw new Error('Todo not found')
    }

    delete(id: string): void {
        this.todos = this.todos.filter((todo) => todo.id !== id)
    }
} 