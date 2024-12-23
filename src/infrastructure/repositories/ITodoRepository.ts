import { Todo } from '../../domain/entities/Todo'

export interface ITodoRepository {
    findAll(): Todo[]
    findById(id: string): Todo | undefined
    create(todo: Todo): Todo
    update(todo: Todo): Todo
    delete(id: string): void
} 