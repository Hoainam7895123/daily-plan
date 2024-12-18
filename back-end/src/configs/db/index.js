const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/daily-plan');
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
};

module.exports = { connect };
