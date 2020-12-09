const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const Student = mongoose.model("Student")
const Tutor = mongoose.model("Tutor")
const Admin = mongoose.model("Admin")
const setContentHeader = require('../services/utils.service').setContentHeader

router.get('/allTutors',async (req,res)=>{
    setContentHeader(res);
    const tutors = await Tutor.find()
    res.json(tutors)
})

router.get('/allStudents',async (req,res)=>{
    setContentHeader(res)
    const students = await Student.find()
    res.json(students)
})

router.post('/addAdmin',async (req,res)=>{
    console.log(req.body.name+" "+req.body.password+" "+req.body.email)
    setContentHeader(res)
    try{
        const admin = new Admin({email:req.body.email , name : req.body.name , password : req.body.password})
        await admin.save();
        res.status(200).json({
            'message':"admin added"
        })
    }
    catch(err){
        console.log(err)
        res.status(400).json(err);
    }
})

router.delete('/deleteStudent/:id',async (req,res)=>{
    setContentHeader(res)
    try{
        const student = await Student.findByIdAndDelete(req.params.id)
        res.status(200).json("Student Deleted")
    }
    catch(err){
        res.status(400).json("Student not Deleted")
    }
})

router.delete('/deleteTutor/:id',async (req,res)=>{
    console.log(req.params.id)
    setContentHeader(res)
    try{
        const tutor = await Tutor.findByIdAndDelete(req.params.id)
        res.status(200).json("Tutor Deleted")
    }
    catch(err){
        res.status(400).json("Tutor not Deleted")
    }

})

router.post('/signin',async (req,res)=>{
    setContentHeader(res)
    console.log(req.body)
    try{
        const admin = await Admin.findOne({email:req.body.email})
        // console.log(admin)
        // console.log(admin.email+" "+admin.password)
        // console.log(req.body.email+" "+req.body.password)
        if(admin.email === req.body.email && admin.password=== req.body.password){
            //console.log("I am here")
            return res.status(200).json({
                message : "Valid Admin"
            })
        }
        res.status(400).json("Invalid user")
    }
    catch(err){
        res.status(400).json(err)
    }
})

module.exports={
    adminRouter : router
}
