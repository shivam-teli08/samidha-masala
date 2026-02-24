const mongoose = require('mongoose');

const adminAuthModel = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'username is required']

    },
    password:{
        type:String,
        required:[true,'password is required']
    }
})

module.exports = mongoose.model('adminAuth',adminAuthModel)