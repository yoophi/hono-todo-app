import { Todo } from '../../../domain/entities/Todo'
import { ITodoRepository } from '../../../infrastructure/repositories/ITodoRepository'
import { TodoUseCase } from '../TodoUseCase'

class MockTodoRepository implements ITodoRepository {
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
            id: this.todos[index].id
        }
        this.todos[index] = updatedTodo as Todo
        return updatedTodo as Todo
    }

    async delete(id: string): Promise<boolean> {
        const initialLength = this.todos.length
        this.todos = this.todos.filter(todo => todo.id !== id)
        return this.todos.length !== initialLength
    }
}

describe('TodoUseCase', () => {
    let useCase: TodoUseCase
    let mockRepository: ITodoRepository

    beforeEach(() => {
        mockRepository = new MockTodoRepository()
        useCase = new TodoUseCase(mockRepository)
    })

    describe('getAllTodos', () => {
        it('should return all todos', async () => {
            const todo = new Todo({ title: '테스트 할 일' })
            await mockRepository.create(todo)

            const todos = await useCase.getAllTodos()
            expect(todos).toHaveLength(1)
            expect(todos[0].title).toBe('테스트 할 일')
        })
    })

    describe('getTodoById', () => {
        it('should return todo by id', async () => {
            const todo = new Todo({ title: '테스트 할 일' })
            await mockRepository.create(todo)

            const found = await useCase.getTodoById(todo.id)
            expect(found).toBeDefined()
            expect(found?.title).toBe('테스트 할 일')
        })
    })

    describe('createTodo', () => {
        it('should create new todo', async () => {
            const created = await useCase.createTodo({ title: '새로운 할 일' })
            expect(created.title).toBe('새로운 할 일')
            expect(created.completed).toBe(false)
        })
    })

    describe('updateTodo', () => {
        it('should update existing todo', async () => {
            const todo = new Todo({ title: '원래 할 일' })
            await mockRepository.create(todo)

            const updated = await useCase.updateTodo(todo.id, {
                title: '수정된 할 일',
                completed: true
            })

            expect(updated?.title).toBe('수정된 할 일')
            expect(updated?.completed).toBe(true)
        })
    })

    describe('deleteTodo', () => {
        it('should delete todo', async () => {
            const todo = new Todo({ title: '삭제할 할 일' })
            await mockRepository.create(todo)

            const result = await useCase.deleteTodo(todo.id)
            expect(result).toBe(true)

            const todos = await useCase.getAllTodos()
            expect(todos).toHaveLength(0)
        })
    })
}) 