import TodoService from './todo-service.js'

class TodoController {
    async create(req, res) {
        try {
            const todo = await TodoService.create(req.body)
            res.json(todo)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const todos = await TodoService.getAll();
            return res.json(todos);
        } catch (e) {
            console.log(e)
            res.status(500).json('Не могу получить посты')
        }
    }

    async update(req, res) {
        try {
            const updatePost = await TodoService.update(req.body);
            return res.json(updatePost);
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async delete(req, res) {
        try {
            const post = await TodoService.delete(req.params.id);
            return res.json(post);
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }
}

export default new TodoController()