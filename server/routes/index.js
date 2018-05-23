const express = require('express')
const router = express.Router()
const { decryptToken } = require('../middlewares/auth.middleware')
const { getAllEnemy } = require('../controllers/enemy.controller')
const { addTodo, updateTodoById, deleteTodoById, getTodoByEmail, changeTodoStatusById } = require('../controllers/todo.controller')

/* GET home page. */
router.get('/', decryptToken, getTodoByEmail)
router.post('/', decryptToken, addTodo)
router.put('/:id', decryptToken, updateTodoById)
router.put('/status/:id', decryptToken, changeTodoStatusById)
router.delete('/:id', decryptToken, deleteTodoById)
router.get('/enemy', decryptToken, getAllEnemy)

module.exports = router
