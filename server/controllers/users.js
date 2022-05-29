const {users,userValidation,loginValidation} = require('../models/users')
const jwt = require('jsonwebtoken')

const userController = {
    // Show function 
    index : async (req,res)=>{
        const allUsers = await users.find({}).select("-password")
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
        
        const adduser = new users({firstName,lastName,email})
        adduser.setPassword(password)
        try{
            await adduser.save()
            const accesstoken = createAccessToken({id: adduser._id})
            res.json({
                user:adduser,
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
            // req.session.user_id = exituser._id
            // req.session.isAdmin = exituser.isAdmin
            const exituseragg = await users.aggregate([
                {$match:{email:exituser.email}},
                {$project:{salt:0,hash:0}},
                {$lookup:{ 
                    from: 'userprofiles', 
                    localField: 'users._id', 
                    let:{id:exituser._id},
                    pipeline: [
                        {$match: {$expr: { $eq: [ "$user_id", "$$id" ] }}},
                        {$project:{_id:0,user_id:0}}
                      ],
                    foreignField: 'userprofiles.user_id', 
                    as: 'userProfile' }}
            ])
            // return res.json(exituseragg)
            const accesstoken = createAccessToken({id: exituser._id,isAdmin:exituser.isAdmin})
            res.json({user:exituseragg[0],accesstoken:accesstoken,status: true , message:"Login Success"})
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
    change_pass : async (req,res)=>{
        const exituser = await users.findById(req.userId)
        if(exituser.email=='team4fwd@gmail.com'){
            return res.status(404).json({status:false,message:"admin pass not changed"})
        }
        if (exituser.validPassword(req.body.currentPassword)) {
            exituser.setPassword(req.body.newPassword)
            try {
                await exituser.save()
                return res.json({status:true,message:"Password Changed"})
            } catch (error) {
                return res.status(404).json({status:false,message:"Password Not Changed"})
            }
        }else{
            return res.status(404).json({status:false,message:"Wrong Password"})
        }
    }

}

const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '3d'})
}

module.exports = userController