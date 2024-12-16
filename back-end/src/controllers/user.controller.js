const jwt = require('jsonwebtoken');

const UserRepository = require('../repositories/user.repository');
const BaseController = require('./base.controller');

class UserController extends BaseController {
    constructor() {
        super(UserRepository);
    }
}

module.exports = UserController;
