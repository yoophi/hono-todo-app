import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import { TodoRepository } from './infrastructure/repositories/TodoRepository'
import { TodoUseCase } from './application/useCases/TodoUseCase'
import { TodoController } from './interfaces/controllers/TodoController'

const app = new Hono()
app.use('*', prettyJSON())

// Dependencies
const todoRepository = new TodoRepository()
const todoUseCase = new TodoUseCase(todoRepository)
const todoController = new TodoController(todoUseCase)

// Routes
app.get('/todos', (c) => todoController.getAll(c))
app.get('/todos/:id', (c) => todoController.getById(c))
app.post('/todos', (c) => todoController.create(c))
app.put('/todos/:id', (c) => todoController.update(c))
app.delete('/todos/:id', (c) => todoController.delete(c))

// 서버 시작
const port = 3000
console.log(`서버가 포트 ${port}에서 시작되었습니다`)

serve({
    fetch: app.fetch,
    port
}) 