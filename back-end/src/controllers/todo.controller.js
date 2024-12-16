const BaseController = require('./base.controller');
const TodoRepository = require('../repositories/todo.repository');

class TodoController extends BaseController {
    constructor() {
        super(TodoRepository);
    }

    completeTodo = async (req, res) => {
        const todoId = req.params.id;
        try {
            const todo = await this.repo.findById(todoId);

            if (!todo) {
                return res.status(404).json({ message: 'Todo not found' });
            }

            todo.status = true;
            await todo.save();

            res.status(200).json({ message: 'Todo completed', todo });
        } catch (error) {
            console.error('Error completing todo:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    uncompleteTodo = async (req, res) => {
        const todoId = req.params.id;
        try {
            const todo = await this.repo.findById(todoId);

            if (!todo) {
                return res.status(404).json({ message: 'Todo not found' });
            }

            todo.status = false;
            await todo.save();

            res.status(200).json({ message: 'Todo uncompleted', todo });
        } catch (error) {
            console.error('Error uncompleting todo:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };
}

module.exports = TodoController;
