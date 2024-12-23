import { Context } from 'hono'
import { TodoUseCase } from '../../application/useCases/TodoUseCase'

export class TodoController {
    constructor(private todoUseCase: TodoUseCase) { }

    async getAll(c: Context) {
        const todos = this.todoUseCase.getAllTodos()
        return c.json(todos)
    }

    async getById(c: Context) {
        const id = c.req.param('id')
        const todo = this.todoUseCase.getTodoById(id)

        if (!todo) {
            return c.json({ message: '할 일을 찾을 수 없습니다.' }, 404)
        }

        return c.json(todo)
    }

    async create(c: Context) {
        const body = await c.req.json()
        const newTodo = this.todoUseCase.createTodo(body)
        return c.json(newTodo, 201)
    }

    async update(c: Context) {
        try {
            const id = c.req.param('id')
            const body = await c.req.json()
            const updatedTodo = this.todoUseCase.updateTodo(id, body)
            return c.json(updatedTodo)
        } catch (error) {
            return c.json({ message: '할 일을 찾을 수 없습니다.' }, 404)
        }
    }

    async delete(c: Context) {
        try {
            const id = c.req.param('id')
            this.todoUseCase.deleteTodo(id)
            return c.json({ message: '삭제되었습니다.' })
        } catch (error) {
            return c.json({ message: '할 일을 찾을 수 없습니다.' }, 404)
        }
    }
} 