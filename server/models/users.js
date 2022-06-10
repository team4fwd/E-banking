const mongoose = require('mongoose')
const crypto = require('crypto')
const Joi = require('joi');


const userSchema = mongoose.Schema({
    name    : {
        type        : String,
        maxLength   : 15,
        trim        : true,
        required    : true
    },
    phone     : {
        type        : String,
        minLength   : 10,
        maxLength   : 15,
        trim        : true,
    },
    email       : {
        type        : String,
        unique      : true,
        maxLength   : 100,
        trim        : true,
        required    : true,
        lowercase   : true
    },
    isAdmin     :{
        type        : Boolean,
        default     : false
    },
    isActive     :{
        type        : Boolean,
        default     : false
    },
    isOpen : {
        type        : Boolean,
        default     : true
    },
    hash : String,
    salt : String
})


// Method to set salt and hash the password for a user 
userSchema.methods.setPassword = function(password) {      
    // Creating a unique salt for a particular user 
       this.salt = crypto.randomBytes(16).toString('hex'); 
     
       // Hashing user's salt and password with 1000 iterations, 
        
       this.hash = crypto.pbkdf2Sync(password, this.salt,  
       1000, 64, 'sha512').toString('hex'); 
}; 
     
// Method to check the entered password is correct or not 
userSchema.methods.validPassword = function(password) { 
       var hash = crypto.pbkdf2Sync(password,  
       this.salt, 1000, 64, 'sha512').toString('hex'); 
       return this.hash === hash; 
}; 


const users = mongoose.model("users",userSchema)

function userValidation(user){
    const Schema = Joi.object().keys({
        name        : Joi.string().max(15).required(),
        phone       : Joi.string().max(15).min(10).required(),
        email       : Joi.string().max(100).email().required(),
    })
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    }
    return Schema.validate(user,options)
}

function loginValidation(user){
    const Schema = Joi.object().keys({
        email       : Joi.string().max(100).email().required(),
        password    : Joi.string().max(100).required()
    })
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    }
    return Schema.validate(user,options)
}

module.exports = {
    "users":users,
    "userValidation":userValidation,
    "loginValidation":loginValidation
}
