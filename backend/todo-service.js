import todo from './todo.js';

class TodoService {
    async create(todos) {
        const createdTodo = await todo.create(todos);
        return createdTodo;
    }
D
    async getAll() {
        const todos = await todo.find();
        return todos;
    }

    async update(newTodo) {
        if (!newTodo._id) {
            throw new Error('id не указан')
        }
        const updateTodo = await todo.findByIdAndUpdate(newTodo._id, newTodo, {new: true});
        return updateTodo;
    }

    async delete(id) {
        if (!id) {
            throw new Error('id не указан')
        }
        const deletedTodo = await todo.findByIdAndDelete(id);
        return deletedTodo;
    }
}

export default new TodoService()
