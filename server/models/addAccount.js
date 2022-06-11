const mongoose = require('mongoose')


const addAccountSchema = mongoose.Schema({
    user_id    : {
        type        : String,
        required    : true
    },
    amount     : {
        type        : Number,
        trim        : true
    },
    isActive     :{
        type        : Boolean,
        default     : false
    },
    pending     : {
        type        : Boolean,
        default     : true
    }
})

const account = mongoose.model("account",addAccountSchema)
module.exports = account
