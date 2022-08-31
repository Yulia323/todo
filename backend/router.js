import Router from 'express'
import TodoController from './todo-controller.js'

const router = new Router()
router.post('/', TodoController.create)
router.get('/', TodoController.getAll)
router.put('/', TodoController.update)
router.delete('/:id', TodoController.delete)

export default router;
