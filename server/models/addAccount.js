const mongoose = require('mongoose')


const addAccountSchema = mongoose.Schema({
    user_id    : {
        type        : String,
        required    : true
    },
    amount     : {
        type        : Number,
        trim        : true,
        default     : 0
    },
    isActive     :{
        type        : Boolean,
        default     : false
    },
})

const account = mongoose.model("account",addAccountSchema)
module.exports = account
