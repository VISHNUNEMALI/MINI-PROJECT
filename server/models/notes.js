const mongoose = require('mongoose');
const notesSchema = mongoose.Schema({
    
    notesName:{
        type:String,
        maxlength:100
    },
    notes_url:{
        type:String,
        maxlength:100
    }  
})

const Note = mongoose.model('Note',notesSchema)
console.log('notes created')
module.exports = { Note }