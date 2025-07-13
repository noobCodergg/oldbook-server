const userModel = require('../Models/userModel')

exports.getUser = async(req,res)=>{
    try{
        const {userId} = req.params;
        const user =await userModel.findById({_id:userId})
        res.status(200).json(user)
    }catch(error){
        res.status(500).json("Internal server error")
    }
}