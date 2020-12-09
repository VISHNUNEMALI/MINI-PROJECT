const express = require('express');
const router = express.Router()
//const { Student } = require('../models/student');
//const {Tutor} = require('../models/tutor')
const mongoose = require('mongoose')
const Student = mongoose.model("Student")
const Tutor = mongoose.model("Tutor")
const setContentHeader = require('../services/utils.service').setContentHeader

//student personal tutors
router.get('/myTutors/:email',async (req,res)=>{
    setContentHeader(res);
    try{
        const student = await Student.findOne({email:req.params.email})
        console.log(student)
        const tutorIds = student.tutors
        console.log(tutorIds)
        let tutors = []
        for(id of tutorIds){
            let tutor = await Tutor.findById(id)
            tutors.push(tutor);
        }
        if(tutors.length == 0){
            res.status(200).json({
                message:'no tutors found'
            })
        }
        console.log(tutors)
        res.status(200).json({
            message:'tutors found',
            tutors:tutors
        })
    }
    catch(err){
        console.log(err)
        res.status(400).json({
            message:"Error"
        })
    }
})

//view his profile 
router.get('/profile/:email',async (req,res)=>{
    setContentHeader(res);
    const student = await Student.findOne({email:req.params.email})
    console.log(student)
    if(student == null)
        return res.status(404).json({
            message:"student not found"
        })
    res.status(200).json({
        student : student
    })
})

//get tutors list based on subject
router.get('/tutor/:subject',(req,res)=>{
    setContentHeader(res);
    Tutor.find({subject:req.params.subject})
    .then(tutors=>{
        console.log(tutors)
        res.status(200).json({
            tutors:tutors,
            message:'tutors found'
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            message:'please try again'
        })
    })
})

//select the tutor
router.post('/selectTutor/:email',async (req,res)=>{
    setContentHeader(res);
    try{
    const student = await Student.findOne({email:req.params.email})
    const tutors = student.tutors
    const tutorselected = await Tutor.findOne({email:req.body.email})
    const tutorId = tutorselected._id
    if(tutors.indexOf(tutorId) != -1){
        console.log(err)
    }
    else{
        const newTutors = [...tutors,tutorId]
        student.tutors = newTutors          
            await student.save()
            //await tutor.save()
            const tutor = await Tutor.findById(tutorId)
            const students = tutor.students
            let newStudents = []
            
            if(students.length == 0){
                newStudents.push(student._id)
            }
            else{
                newStudents = [...students,studentId]
            }
            console.log(newStudents)
            tutor.students = newStudents
            await tutor.save()
            res.status(200).json({
                'message':"student and tutor is added"
            })
    }
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }
})

//update student name and email
router.post('/updateStudent/:email',async (req,res)=>{
    setContentHeader(res);
    const samp = await Student.findOne({email:req.params.email})
    console.log(req.body.contactno)
    console.log(samp._id)
    try{
        const student = await Student.findByIdAndUpdate(samp._id,{name:req.body.name,password:req.body.password,contactno:req.body.contactno})
        if(student == null) {
            console.log("not student found")
            return res.status(404).json({
                'message':'student not found with this id'
            });
        }
        //console.log("student found")
        res.status(200).json({
            student:student,
            message:"student updated"
        });
    }
    catch(err){
        console.log(err)
        res.status(400).json(err);
    }
})

router.post('/addStudent',async (req,res)=>{
    setContentHeader(res);
    try{
        const student = new Student({email:req.body.email , name : req.body.name , password : req.body.password,tutors:[]})
        await student.save();
        return res.status(200).json({
            message : "user added"
        })
    }
    catch(err){
        console.log(err)
        res.status(400).json(err);
    }
})

router.post('/signin',async (req,res)=>{
    setContentHeader(res);
    try{
        const student = await Student.findOne({email:req.body.email})
        if(student.email === req.body.email && student.password === req.body.password){
            return res.status(200).json({
                message : "Valid Student"
            })
        }
        console.log("invalid user")
        return res.status(400).json({
            message : "invalid user"
        })
    }
    catch(err){
        console.log(err)
        
        res.status(400).json(err)
    }
})

router.get('/subjects',async (req,res) => {
    setContentHeader(res);
    try{
        const subjects = await Tutor.distinct("subject")
        console.log(subjects)
        res.status(200).json({
            subjects:subjects,
            message:'subjects loaded'
        })
    }
    catch(err){
        console.log(err)
        res.status(400).json({
            message:'could not load subjects'
        })
    }

})

module.exports={
    studentRouter : router
}
