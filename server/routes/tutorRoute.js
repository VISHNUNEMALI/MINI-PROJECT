const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const Student = mongoose.model("Student")
const Tutor = mongoose.model("Tutor")
const Note = mongoose.model("Note")
const setContentHeader = require('../services/utils.service').setContentHeader

router.post('/addTutor',async (req,res)=>{
    console.log(req.body)
    setContentHeader(res);
    try{
        const tutor = new Tutor({email:req.body.email , name : req.body.name , password : req.body.password,subject:req.body.subject,notes:[],students:[]})
        await tutor.save();
        res.status(200).json({
            "message" : "tutor registered",
        })
    }
    catch(err){
        console.log(err)
        res.status(400).json(err);
    }
})

router.get('/getDetails/:email',async (req,res)=>{
    setContentHeader(res);
    try{
        const tutor = await Tutor.findOne({email:req.params.email})
        console.log(tutor)
        if(tutor == null)  
            return res.status(404).json('tutor not found with this email')
        res.status(200).json({
            name:tutor.name,
            tutor:tutor,
            message:"details sent"
        });
    }
    catch(err){
        console.log(err)
        res.status(400).json(err);
    }
})

router.post('/updateTutor/:email',async (req,res)=>{
    console.log("Inside update tutor "+req.body.password);
    setContentHeader(res);
    try{
        const samp = await Tutor.findOne({email:req.params.email})
        console.log(samp._id)
        const tutor = await Tutor.findByIdAndUpdate(samp._id,{name:req.body.name,password:req.body.password})
        console.log(tutor)
        if(tutor == null)  return res.status(404).json('tutor not found with this email')
        res.status(200).json({
            tutor:tutor,
            message:"tutor updated"
        });
    }
    catch(err){
        console.log(err)
        res.status(400).json(err);
    }
})

router.get('/getStudents/:email',async (req,res)=>{
    setContentHeader(res);
    try{
        
        const tutor = await Tutor.findOne({email:req.params.email})
        if(tutor == null) 
            return res.status(404).json({
                message:'tutor not found with this id'
            });
        const students = tutor.students
        if(students.length == 0)  
            return res.status(200).json({
                message:'No students exist'
            });

        let allStudents=[]
        for(id of students){
            let stud = await Student.findById(id)
            console.log(stud)
            allStudents.push(stud)
        }
        res.json({
            message:'Students found',
            students:allStudents
        })
    }
    catch(err){
        res.status(400).json(err)
    }
})

router.post('/addNotes/:email',async (req,res)=>{
    setContentHeader(res);
    try{
        let note = new Note({notesName:req.body.name,notes_url:req.body.url})
        note = await note.save();
        console.log(note)
        const tutor = await Tutor.findOne({email:req.params.email})
        let newNotes = tutor.notes
        newNotes.push(note._id)
        // if(tutor.notes.length == 0)
        //     newNotes.push(note._id)
        // else
        //     newNotes = [...tutor.notes,note._id]
        tutor.notes = newNotes;
        await tutor.save();
        res.status(200).json({
            message:'notes added successfully'
        })
    }
    catch(err){
        res.status(400).json(err)
    }
})

router.get('/notes/:email', async (req,res)=>{
    setContentHeader(res);
    try{
        const tutor= await Tutor.findOne({email:req.params.email})
        console.log(tutor)
        if(tutor == null) 
            return res.status(404).json({
                message:'tutor not found with this id'
            });
        const notes = tutor.notes
        if(notes.length == 0)  
            return res.status(200).json({
                message:'No notes added'
            });

        let allNotes=[]
        for(id of notes){
            let note = await Note.findById(id)
            console.log(note)
            allNotes.push(note)
        }
        res.json({
            message:'Notes found',
            notes:allNotes
        })
    }
    catch(err){
        res.status(400).json(err)
    }
})

router.post('/signin',async (req,res)=>{

    setContentHeader(res);
    console.log(req.body)
    try{
        const tutor = await Tutor.findOne({email:req.body.email})
        if(tutor.email === req.body.email && tutor.password === req.body.password){
            return res.status(200).json({
                message : "Valid Tutor"
            })
        }
        console.log("Invalid User")
        return res.status(400).json("Invalid user")
    }
    catch(err){
        res.status(400).json(err)
    }
})


module.exports={
    tutorRouter : router
}
