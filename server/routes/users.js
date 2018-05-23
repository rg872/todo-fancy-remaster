const express = require('express')
const router = express.Router()
const { decryptToken } = require('../middlewares/auth.middleware')
const { signUp, signIn, oAuth, getUser, updateTitle } = require('../controllers/user.controller')

/* GET users listing. */
router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/oauth', oAuth)
router.get('/', decryptToken, getUser)
router.put('/title', decryptToken, updateTitle)

module.exports = router
