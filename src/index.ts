import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'

const app = new Hono()
app.use('*', prettyJSON())

// Todo 타입 정의
type Todo = {
    id: string
    title: string
    completed: boolean
    createdAt: Date
}

// 임시 데이터 저장소
let todos: Todo[] = []

// Todo 목록 조회
app.get('/todos', (c) => {
    return c.json(todos)
})

// Todo 단일 조회
app.get('/todos/:id', (c) => {
    const id = c.req.param('id')
    const todo = todos.find((todo) => todo.id === id)

    if (!todo) {
        return c.json({ message: '할 일을 찾을 수 없습니다.' }, 404)
    }

    return c.json(todo)
})

// Todo 생성
app.post('/todos', async (c) => {
    const body = await c.req.json()

    const newTodo: Todo = {
        id: crypto.randomUUID(),
        title: body.title,
        completed: false,
        createdAt: new Date()
    }

    todos.push(newTodo)
    return c.json(newTodo, 201)
})

// Todo 수정
app.put('/todos/:id', async (c) => {
    const id = c.req.param('id')
    const body = await c.req.json()

    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if (todoIndex === -1) {
        return c.json({ message: '할 일을 찾을 수 없습니다.' }, 404)
    }

    todos[todoIndex] = {
        ...todos[todoIndex],
        ...body,
        id: todos[todoIndex].id // id는 변경 불가
    }

    return c.json(todos[todoIndex])
})

// Todo 삭제
app.delete('/todos/:id', (c) => {
    const id = c.req.param('id')
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex === -1) {
        return c.json({ message: '할 일을 찾을 수 없습니다.' }, 404)
    }

    todos = todos.filter((todo) => todo.id !== id)
    return c.json({ message: '삭제되었습니다.' })
})

// 서버 시작
const port = 3000
console.log(`서버가 포트 ${port}에서 시작되었습니다`)

serve({
    fetch: app.fetch,
    port
}) 