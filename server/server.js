//for routing
const express = require('express');
// for db
const mongoose = require('mongoose');
// for parsing of data
const parser = require('body-parser');
//starting the express
const server = express();
//port on which server should run
const port = 3700;

server.listen(port,()=>{
    console.log("server running at port "+port);
})