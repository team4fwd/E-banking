const router = require('express').Router()
const user = require('./user')
const userProfile = require('./userProfile')
const cateogry = require('./cateogry')
const products = require('./products')
const uploadImage = require('./upload')
const order = require('./order')
const comment = require('./comments')


router.use('/users',user)
router.use('/userprofile',userProfile)
router.use('/cateogry',cateogry)
router.use('/products',products)
router.use('/uploadImage',uploadImage)
router.use('/order',order)
router.use('/comment',comment)





module.exports = router