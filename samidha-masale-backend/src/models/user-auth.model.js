const mongoose = require("mongoose");
const validator = require('validator')
const bcrypt = require('bcrypt')
const userAuthModel = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'username is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid email')
            }
        }},
    phoneno:{
        type:String,
        required:[true,'phoneno is required'],
        validate(value){
            if(!validator.isMobilePhone(value, 'any')){
                throw new Error('invalid phoneno')
            }
        }
    },
    password:{
        type:String,
        required:[true,'password is required']
    }
    
})
userAuthModel.pre('save',async function(){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
})
//compare password 
userAuthModel.methods.comparePassword = async function(password){
    const user = this
    const isMatch = await bcrypt.compare(password,user.password)
    return isMatch
}
const userAuth = mongoose.model('userAuth',userAuthModel)
module.exports = userAuth
