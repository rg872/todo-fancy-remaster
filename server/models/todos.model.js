const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'todo name is required']
    },
    description: {
        type: String,
        required: [true, 'todo description is required']
    },
    status: {
        type: Boolean,
        required: [true, 'todo status is required']
    }
},{
    timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo