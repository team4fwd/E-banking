const addAccount = require('express').Router()
const {userAuth,adminAuth} = require('../middleware/auth')
const addAccountController = require('../controllers/addAccount')


addAccount.post('/addaccount',userAuth,addAccountController.addAccount)
addAccount.get('/myaccounts',userAuth,addAccountController.myAccounts)
addAccount.get('/allaccounts',userAuth,adminAuth,addAccountController.allAccounts)
addAccount.put('/activate/:id',userAuth,adminAuth,addAccountController.activateAccount)
addAccount.put('/reject/:id',userAuth,adminAuth,addAccountController.rejectAccount)
addAccount.put('/withdrow/:id',userAuth,addAccountController.accountWithdraw)
addAccount.put('/recharge/:id',userAuth,addAccountController.accountRecharging)







module.exports = addAccount