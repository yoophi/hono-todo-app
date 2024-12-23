import { Todo } from '../../../domain/entities/Todo';
import { TodoRepository } from '../TodoRepository';

describe('TodoRepository', () => {
    let repository: TodoRepository;

    beforeEach(() => {
        repository = new TodoRepository();
    });

    describe('create', () => {
        it('should create a new todo', async () => {
            const todo = new Todo({ title: '테스트 할 일' });
            const created = await repository.create(todo);
            expect(created.title).toBe('테스트 할 일');
            expect(created.id).toBeDefined();
            expect(created.completed).toBe(false);
        });
    });

    describe('findAll', () => {
        it('should return all todos', async () => {
            const todo1 = new Todo({ title: '할 일 1' });
            const todo2 = new Todo({ title: '할 일 2' });

            await repository.create(todo1);
            await repository.create(todo2);

            const todos = await repository.findAll();
            expect(todos).toHaveLength(2);
        });
    });

    describe('findById', () => {
        it('should return todo by id', async () => {
            const todo = new Todo({ title: '할 일' });
            await repository.create(todo);

            const found = await repository.findById(todo.id);
            expect(found).toBeDefined();
            expect(found?.title).toBe('할 일');
        });
    });

    describe('update', () => {
        it('should update todo', async () => {
            const todo = new Todo({ title: '할 일' });
            await repository.create(todo);

            const updated = await repository.update(todo.id, { title: '수정된 할 일' });
            expect(updated?.title).toBe('수정된 할 일');
        });
    });

    describe('delete', () => {
        it('should delete todo', async () => {
            const todo = new Todo({ title: '할 일' });
            await repository.create(todo);

            const result = await repository.delete(todo.id);
            expect(result).toBe(true);

            const todos = await repository.findAll();
            expect(todos).toHaveLength(0);
        });
    });
}); 