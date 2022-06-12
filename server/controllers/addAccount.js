const mongoose = require('mongoose')
const addAccount = require('../models/addAccount')
const {transaction} = require('../models/transactions')


const accountController = {
    addAccount : async (req,res)=>{
        const user_id = req.userId
        const amount = req.body.money
        if (amount < 0) {
            return res.status(409).json({message : 'The Money must be positive'})
        }
        const addaccount = new addAccount({user_id:user_id,amount:amount})
        
        try{
            await addaccount.save()
            res.json({
                account:addaccount,
                status:true,
                message:"Account added successfully."
            })
        }
        catch(err){
            res.status(404).json({status:false,message:"Account not Added."})
        }

    },
    myAccounts : async (req,res)=>{
        const myAccounts = await addAccount.find({user_id:req.userId})
        res.json(myAccounts)
    },
    allAccounts : async (req,res)=>{
        const allAccounts = await addAccount.find()
        res.json(allAccounts)
    },
    activateAccount : async (req,res)=>{
        const account_id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(account_id)) {
            return res.status(409).json({message : 'No Account exist'})
        }
        try{
            const activeAccount = await addAccount.findByIdAndUpdate({_id:account_id},{isActive:true,pending:false},{new:true})
            res.status(200).json({account : activeAccount,status:true,message:"Account is Activated"})
        }
        catch(error){
            if(error){
              res.json({status:false,message:"Account Not Activated"})
            }
        }
    },
    rejectAccount : async (req,res)=>{
        const account_id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(account_id)) {
            return res.status(409).json({message : 'No Account exist'})
        }
        try{
            const activeAccount = await addAccount.findByIdAndUpdate({_id:account_id},{isActive:false},{new:true})
            res.status(200).json({account : activeAccount,status:true,message:"Account is closed"})
        }
        catch(error){
            if(error){
              res.json({status:false,message:"Account Not closed"})
            }
        }
    },
    accountWithdraw : async (req,res)=>{
        const user_account_to = req.params.id
        const amount = req.body.money
        const user_id_from = req.userId
        if (!mongoose.Types.ObjectId.isValid(user_account_to)) {
            return res.status(409).json({message : 'No Account exist'})
        }
        const checkBalance = await addAccount.findOne({_id:user_account_to})
        if (!checkBalance) {
            return res.status(409).json({message : 'The Account is not found'})
        }
        if (!checkBalance.isActive) {
            return res.status(409).json({message : 'The Account is not Active'})
        }
        if (amount < 0) {
            return res.status(409).json({message : 'The Money must be positive'})
        }
        if (amount > checkBalance.amount) {
            return res.status(409).json({message : 'Balance is Insufficient'})
        }
        const saveTransfer = new transaction({user_id_from:user_id_from,amount:amount,user_account_to:user_account_to,user_account_from:"",user_id_to:"",transactionType:"Withdraw"})

        try{
            await saveTransfer.save()
            const accountAmount = await addAccount.findByIdAndUpdate({_id:user_account_to},{$inc:{amount:-amount}},{new:true})
            res.status(200).json({account : accountAmount,status:true,message:`The new Balacne is ${accountAmount.amount}`})
        }
        catch(error){
            if(error){
              res.json({status:false,message:"No Changing in your Account Balance"})
            }
        }
    },
    accountRecharging : async (req,res)=>{
        const user_account_to = req.params.id
        const amount = req.body.money
        const user_id_from = req.userId
        if (!mongoose.Types.ObjectId.isValid(user_account_to)) {
            return res.status(409).json({message : 'No Account exist'})
        }
        const checkBalance = await addAccount.findOne({_id:user_account_to})
        if (!checkBalance) {
            return res.status(409).json({message : 'The Account is not found'})
        }
        if (!checkBalance.isActive) {
            return res.status(409).json({message : 'The Account is not Active'})
        }
        if (amount < 0) {
            return res.status(409).json({message : 'The Money must be positive'})
        }
        const saveTransfer = new transaction({user_id_from:user_id_from,amount:amount,user_account_to:user_account_to,user_account_from:"",user_id_to:"",transactionType:"Recharge"})
        try{
            await saveTransfer.save()
            const accountAmount = await addAccount.findByIdAndUpdate({_id:user_account_to},{$inc:{amount:amount}},{new:true})
            res.status(200).json({account : accountAmount,status:true,message:`The new Balacne is ${accountAmount.amount}`})
        }
        catch(error){
            if(error){
              res.json({status:false,message:"No Changing in your Account Balance"})
            }
        }
    }
}




module.exports = accountController