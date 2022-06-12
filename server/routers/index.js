const router = require('express').Router()
const user = require('./user')
const account = require('./addAccount')
const transformations = require('./transformations')



router.use('/users',user)
router.use('/account',account)
router.use('/transformations',transformations)





module.exports = router