const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema(
    {
        _id: { type: ObjectId, auto: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        refreshToken: { type: String, required: false },
    },
    { timestamps: true },
);

const User = mongoose.model('User', UserSchema);
module.exports = User;
