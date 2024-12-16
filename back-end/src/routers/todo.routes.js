const express = require('express');
const router = express.Router();

const TodoController = require('../controllers/todo.controller');
const todoController = new TodoController();

router.get('/get', todoController.getAll);
router.get('/get/:id', todoController.getById);
router.post('/add', todoController.add);
router.put('/update/:id', todoController.updateById);
router.delete('/delete/:id', todoController.deleteById);
router.get('/complete/:id', todoController.completeTodo);
router.get('/uncomplete/:id', todoController.uncompleteTodo);

module.exports = router;
