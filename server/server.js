const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();
const config = require('./config/config').get(process.env.NODE_ENV);
const setContentHeader = require('./services/utils.service').setContentHeader;
const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false 
},()=>{
    console.log('connected to mongoose');
})

const { Admin } = require('./models/admin'); 
const { Notes } = require('./models/notes');
const { Student } = require('./models/student');
const { Tutor } = require('./models/tutor');

app.use(express.json())
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const adminRoute = require('./routes/adminRoute').adminRouter
const studentRoute = require('./routes/StudentRoute').studentRouter
const tutorRoute = require('./routes/tutorRoute').tutorRouter

app.use('/admin',adminRoute)
app.use('/student',studentRoute)
app.use('/tutor',tutorRoute)

app.get('/status',(req,res)=>{
    setContentHeader(res);
    res.status(200).json({
        message: "Server is RUNNING"
    })
});
const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`SERVER RUNNNING`+port)
})