const mongoose = require('mongoose');


const tutorSchema = mongoose.Schema({
    
    name:{
        type:String,
        maxlength:100
    },
    subject:{
        type:String,
        maxlength:100
    }  
})

const Tutor = mongoose.model('Tutor',tutorSchema)

module.exports = { Tutor }