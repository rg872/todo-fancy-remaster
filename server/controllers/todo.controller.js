const Todo = require('../models/todos.model')
const User = require('../models/users.model') 

module.exports = {
    addTodo: function(req, res){
        let { email } = req.payload
                
        let new_todo = { title, description } = req.body
        new_todo.status =  false
        
        Todo.create(new_todo)
        .then((todo)=>{
            User.findOneAndUpdate({email}, {$push: {todos: todo._id}})
            .then((user)=>{
                res.status(200).json({
                    message: 'success create todo',
                    todo
                })                          
            })
        })        
        .catch((error)=>{
            res.status(500).json({
                message: 'server error'
            })
        })
          
    },

    getTodoByEmail: function(req, res){
        let { email } = req.payload
        
        User.findOne({email: email})
        .populate('todos')
        .then((user)=>{
            res.status(200).json({
                message: 'success get todos',
                todos: user.todos
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message: 'server error'
            })
        })
    },

    changeTodoStatusById: function(req, res){
        let id = req.params.id
        let { email } = req.payload
        let { status, exp, lvl, hp, atk } = req.body

        Todo.findByIdAndUpdate(id, {status})
        .then((todo)=>{
            User.findOneAndUpdate({email}, {exp, lvl, hp, atk})
            .then((user)=>{
                res.status(200).json({
                    message: 'success change todo status',
                    exp: user.exp,
                    lvl: user.lvl,
                    hp: user.hp,
                    atk: user.atk,
                    todos: user.todos,
                    title: user.title,
                    todo,

                })
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message: 'server error'
            })
        })
    },

    updateTodoById: function(req, res){
        let id = req.params.id

        Todo.findByIdAndUpdate(id, req.body)
        .then((todo)=>{
            res.status(200).json({
                message: 'success update todo',
                todo
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message: 'server error'
            })
        })
    },

    deleteTodoById: function(req, res){
        let id = req.params.id
        let { email } = req.payload

        Todo.findByIdAndRemove(id)
        .then(()=>{
            User.findOneAndUpdate({email: email}, {$pull: {todos: id}})
            .then((user)=>{
                res.status(200).json({
                    message: 'success delete todo'
                })
            })            
        })
        .catch((err)=>{
            res.status(500).json({
                message: 'server error'
            })
        })
    }
}