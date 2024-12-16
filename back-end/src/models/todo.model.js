const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TodoSchema = new Schema(
    {
        _id: { type: ObjectId, auto: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        dueDate: { type: Date, required: true },
        status: { type: Boolean, required: true },
        userId: { type: ObjectId, ref: 'User', required: true },
    },
    { timestamps: true },
);

const todo = mongoose.model('Todo', TodoSchema);
module.exports = todo;
