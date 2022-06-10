const mongoose = require('mongoose')
const {transaction,transactionValidation} = require('../models/transactions')
const account = require('../models/addAccount')


const transactionController = {
    makeTransaction : async (req,res)=>{
        const session = await mongoose.startSession()
        const user_id_from = req.userId
        const amount = req.body.amount
        const user_account_to = req.body.transferTo
        const user_account_from = req.body.transferFrom

        if (!mongoose.Types.ObjectId.isValid(user_account_to)) {
            return res.status(409).json({message : 'No Account exist'})
        }

        if (!mongoose.Types.ObjectId.isValid(user_account_from)) {
            return res.status(409).json({message : 'No Account exist'})
        }

        const {error} = transactionValidation(req.body)
        if (error) {
            return res.status(404).json({status:false,message: error.details[0].message})
        }

        const user_to = await account.findOne({_id:user_account_to})
        const user_from = await account.findOne({_id:user_account_from})

        if (!user_to.isActive) {
            return res.status(409).json({message : 'Account is not Active'})
        }
        if (!user_from.isActive) {
            return res.status(409).json({message : 'Account is not Active'})
        }
        if (user_id_from != user_from.user_id) {
            return res.status(409).json({message : 'Not Allowed To Transfer'})
        }
        if (amount < 0) {
            return res.status(409).json({message : 'The Money must be positive'})
        }
        if (amount > user_from.amount) {
            return res.status(409).json({message : 'Balance is Insufficient'})
        }
        const user_id_to = user_to.user_id
        const saveTransfer = new transaction({user_id_from,amount,user_account_to,user_account_from,user_id_to,transactionType:"Transfer"})
        
        try {
            session.startTransaction()
            await account.findByIdAndUpdate({_id:user_account_to},{$inc:{amount:amount}},{ session })
            await account.findByIdAndUpdate({_id:user_account_from},{$inc:{amount:-amount}},{ session })
            await saveTransfer.save({ session })
            await session.commitTransaction()
            res.json({
                transfer:saveTransfer,
                status:true,
                message:"The transfer completed successfully."
            })
        } catch (error) {
            await session.abortTransaction()
            res.status(404).json({status:false,message:"The transfer not completed successfully."})
        }
        session.endSession()
    },
    userTransactions : async (req,res)=>{
        const user_id = req.userId
        const userTransformations_from = await transaction.find({user_id_from:user_id})
        const userTransformations_to = await transaction.find({user_id_to:user_id})
        if (!userTransformations_from) {
            return res.status(409).json({message : 'No Transformations'})
        }
        if (!userTransformations_to) {
            return res.status(409).json({message : 'No Transformations'})
        }
        res.status(200).json({userTransformations_from:userTransformations_from,userTransformations_to:userTransformations_to})

    },
    allTransactions : async (req,res)=>{
        const allTransformations = await transaction.find()
        if (allTransformations) {
            res.status(200).json({allTransformations : allTransformations}) 
        }else{
            return res.status(409).json({message : 'No Transformations'})
        }
    }
}

module.exports = transactionController
