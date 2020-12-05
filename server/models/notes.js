const mongoose = require('mongoose');


const notesSchema = mongoose.Schema({
    
    name:{
        type:String,
        maxlength:100
    },
    notes:{
        type:String,
        maxlength:100
    }  
})

const Notes = mongoose.model('Notes',notesSchema)

module.exports = { Notes }