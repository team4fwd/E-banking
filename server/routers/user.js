const user = require('express').Router()
const {userAuth,adminAuth} = require('../middleware/auth')
const userController = require('../controllers/users')

user.get('/',userAuth,adminAuth,userController.index)
user.post('/add',userController.add)
user.post('/changePass',userAuth,userController.change_pass)
user.post('/login',userController.login)
user.get('/logout',userController.logout)


module.exports = user