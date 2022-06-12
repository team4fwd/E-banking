const mongoose = require('mongoose')
const {users,userValidation,loginValidation} = require('../models/users')
const jwt = require('jsonwebtoken')

const userController = {
    // Show function 
    index : async (req,res)=>{
        const allUsers = await users.find({}).select(["-salt","-hash"])
        res.json(allUsers)
    },
    // Add Function
    add : async (req,res)=>{
        const {error} = userValidation(req.body)
        if (error) {
            return res.status(404).json({status:false,message: error.details[0].message})
        }
        const {name,phone,email} = req.body
       
        if (!req.body.password || req.body.password =='') {
            return res.status(404).json({status:false,message:"Password empty"})
        }
        const password = req.body.password
        const exituser = await users.findOne({email:email})
        if (exituser) {
            return res.status(404).json({status:false,message:"This Email Exists"})
        }
        
        const adduser = new users({name,phone,email})
        adduser.setPassword(password)
        try{
            await adduser.save()
            const accesstoken = createAccessToken({id: adduser._id})
            res.json({
                user:{"_id":adduser._id,"name":adduser.name,"phone":adduser.phone,"email":adduser.email,"isAdmin":adduser.isAdmin,"isActive":adduser.isActive},
                accesstoken:accesstoken,
                status:true,
                message:"User added successfully."
            })
        }
        catch(err){
            res.status(404).json({status:false,message:"User not Saved."})
        }
    },
    
    // Login Function
    login : async (req,res)=>{
        const {error} = loginValidation(req.body)
        if (error) {
            return res.status(404).json({status:false,message: error.details[0].message})
        }
        
        const exituser = await users.findOne({email:req.body.email})
        if (!exituser) {
            return res.status(404).json({status:false,message:"Wrong Email or Password"})
        }
        
        if (exituser.validPassword(req.body.password)) {
            if (!exituser.isActive) {
                return res.status(404).json({status:false,message:"Account is not Active"})
            }
            if (!exituser.isOpen) {
                return res.status(404).json({status:false,message:"Account is closed"})
            }
            const accesstoken = createAccessToken({id: exituser._id,isAdmin:exituser.isAdmin})
            res.json({
                user:{"_id":exituser._id,"name":exituser.name,
                "phone":exituser.phone,
                "email":exituser.email,
                "isAdmin":exituser.isAdmin,
                "isActive":exituser.isActive,
                "isOpen": exituser.isOpen
            },
                accesstoken:accesstoken,
                status: true , 
                message:"Login Success"
            })
        }else{
            return res.status(404).json({status:false,message:"Wrong Email or Password"})
        }
        
    },
    logout : async (req,res)=>{
        req.headers["x-access-token"] = ''
        // req.session.destroy(function(err) {
        res.status(200).json({message:"logout Success"})
        // })
    },
    activateUser : async (req,res)=>{
        const user_id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(409).json({message : 'No User exist'})
        }
        try{
            const activeUser = await users.findByIdAndUpdate({_id:user_id},{isActive:true},{new:true})
            res.status(200).json({
                user:{"_id":activeUser._id,"name":activeUser.name,
                "phone":activeUser.phone,
                "email":activeUser.email,
                "isAdmin":activeUser.isAdmin,
                "isActive":activeUser.isActive,
                "isOpen": activeUser.isOpen
                }
                ,status:true,message:"User is Activated"})
        }
        catch(error){
            if(error){
              res.json({status:false,message:"User Not Activated"})
            }
        }
    },
    suspendUser : async (req,res)=>{
        const user_id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(409).json({message : 'No User exist'})
        }
        try{
            const user = await users.findByIdAndUpdate({_id:user_id},{isOpen:false},{new:true})
            res.status(200).json({
                user:{"_id":user._id,"name":user.name,
                "phone":user.phone,
                "email":user.email,
                "isAdmin":user.isAdmin,
                "isActive":user.isActive,
                "isOpen": user.isOpen
                },
                status:true,
                message:"User is Suspend"
            })
        }
        catch(error){
            if(error){
              res.json({status:false,message:"User Not Suspend"})
            }
        }
    }
    

    // change_pass : async (req,res)=>{
    //     const exituser = await users.findById(req.userId)
    //     if(exituser.email=='team4fwd@gmail.com'){
    //         return res.status(404).json({status:false,message:"admin pass not changed"})
    //     }
    //     if (exituser.validPassword(req.body.currentPassword)) {
    //         exituser.setPassword(req.body.newPassword)
    //         try {
    //             await exituser.save()
    //             return res.json({status:true,message:"Password Changed"})
    //         } catch (error) {
    //             return res.status(404).json({status:false,message:"Password Not Changed"})
    //         }
    //     }else{
    //         return res.status(404).json({status:false,message:"Wrong Password"})
    //     }
    // },

}

const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '3d'})
}

module.exports = userController