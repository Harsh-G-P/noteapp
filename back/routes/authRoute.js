const express= require('express')
const { register, login, getUser } = require('../controller/authController.js')
const authMiddleware = require('../middleware/authMiddleware.js')
const authRouter= express.Router()

authRouter.post('/register',register)
authRouter.post('/login',login)
authRouter.get('/user',authMiddleware,getUser)

module.exports=authRouter