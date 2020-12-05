const mongoose = require('mongoose');


const relationSchema = mongoose.Schema({
    
    studentname:{
        type:String,
        maxlength:100
    },
    TutorName:{
        type:String,
        maxlength:100
    }  
})

const Student = mongoose.model('Student',relationSchema)

module.exports = { Student }