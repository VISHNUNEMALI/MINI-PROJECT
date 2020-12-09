const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const note = require('./notes')
const student =require('./student')
const tutorSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    name:{
        type:String,
        maxlength:100
    },
    subject:{
        type:String,
        maxlength:100
    },
    notes:[
        {
            type:ObjectId,
            ref:note
        }
    ],
    students:[
        {
            type:ObjectId,
            ref:student
        }
    ]
})

const Tutor = mongoose.model('Tutor',tutorSchema)
console.log('tutor created')
module.exports = { Tutor }