const transformations = require('express').Router()
const {userAuth,adminAuth} = require('../middleware/auth')
const transformationController = require('../controllers/transactions')

transformations.post('/',userAuth,transformationController.makeTransaction)
transformations.get('/',userAuth,adminAuth,transformationController.allTransactions)
transformations.get('/usertransformations',userAuth,transformationController.userTransactions)



module.exports = transformations
