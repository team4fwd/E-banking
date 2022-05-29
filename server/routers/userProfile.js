const userProfile = require('express').Router()
const {userAuth} = require('../middleware/auth')
const userProfileController = require('../controllers/userProfile')

userProfile.get('/',userAuth,userProfileController.index)
userProfile.post('/edit',userAuth,userProfileController.edit)


module.exports = userProfile