const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const userController = new UserController();

router.get('/get', userController.getAll);
router.get('/get/:id', userController.getById);
router.post('/add', userController.add);
router.put('/update/:id', userController.updateById);
router.delete('/delete/:id', userController.deleteById);

module.exports = router;
