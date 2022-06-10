const mongoose = require('mongoose')
const Joi = require('joi');


const transactionsSchema = mongoose.Schema({
    user_id_to    : {
        type        : String,
    },
    user_id_from   : {
        type        : String,
    },
    user_account_to    : {
        type        : String,
    },
    user_account_from    : {
        type        : String,
    },
    amount     : {
        type        : Number,
        trim        : true,
        required    : true
    },
    transactionType : {
        type        : String,
        required    : true
    },
    createAt : {
        type : Date,
        default : new Date()
    }
    
})

const transaction = mongoose.model("transaction",transactionsSchema)

function transactionValidation(order){
    const Schema = Joi.object().keys({
        amount      : Joi.number().required()
    })
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    }
    return Schema.validate(order,options)
}

module.exports = {
    "transaction":transaction,
    "transactionValidation":transactionValidation
}
