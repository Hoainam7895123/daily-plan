const express = require('express');
const router = express.Router();

const { authenToken, checkAndRefreshToken } = require('../middlewares/auth.middleware');

const todoRouter = require('./todo.routes');
const userRouter = require('./user.routes');
const authRouter = require('./auth.routes');

router.use('/todos', authenToken, todoRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);

module.exports = router;
