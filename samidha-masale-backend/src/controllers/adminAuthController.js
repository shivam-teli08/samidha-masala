const adminAuthModel=require('../models/auth.adminmodel')

async function postAdminLogin(req,res){
    const {username,password}=req.body;
    if(!username || !password){
        return res.status(400).json({message:"username and password are required"})
    }
    if(username===process.env.ADMIN_USERNAME && password===process.env.ADMIN_PASSWORD){
        return res.status(200).json({message:"login successful"})
    }
    else{
        return res.status(401).json({message:"invalid credentials"})
    }
    }    
module.exports={
    postAdminLogin
}