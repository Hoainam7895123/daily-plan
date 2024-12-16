const BaseRepository = require('./base.repository');
const User = require('../models/user.model');

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    async findByUsername(username) {
        try {
            const user = await this.collection.findOne({ username });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            console.error('Error finding user by username:', error);
            throw error; // Ném lại lỗi để lớp gọi có thể xử lý
        }
    }

    async findByRefreshToken(refreshToken) {
        try {
            const user = await this.collection.findOne({ refreshToken });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            console.error('Error finding user by refresh token:', error);
            throw error;
        }
    }
}

module.exports = UserRepository;
