const Todo = require('../models/todo.model');
const BaseRepository = require('./base.repository');

class TodoRepository extends BaseRepository {
    constructor() {
        super(Todo);
    }

    async findById(id) {
        try {
            const data = await this.collection.findById(id);
            if (!data) throw new Error('Todo not found');
            return data;
        } catch (error) {
            throw new Error('Todo not found');
        }
    }
}

module.exports = TodoRepository;
