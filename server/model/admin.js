const mongoose = require('mongoose')
var schema = mongoose.Schema

const adminSchema = new Schema({
    name:{
        firstName:String,
        lastName:String
    },
    userName:{
        type:String
    },
    email:{
        
    }

})