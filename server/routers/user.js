const user = require('express').Router()
const {userAuth,adminAuth} = require('../middleware/auth')
const userController = require('../controllers/users')

user.get('/',userAuth,adminAuth,userController.index)
user.post('/add',userController.add)
user.put('/activate/:id',userAuth,adminAuth,userController.activateUser)
user.put('/suspend/:id',userAuth,adminAuth,userController.suspendUser)
user.post('/login',userController.login)
user.get('/logout',userAuth,userController.logout)
// user.post('/changePass',userAuth,userController.change_pass)


module.exports = user