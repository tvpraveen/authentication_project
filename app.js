const express = require('express')
const app = express()
const mongoose = require('mongoose');
require('dotenv').config()
const tokenVerify = require('./jwt_verify');

app.use(express.json());
mongoose.connect("mongodb://localhost:27017/sampleProject11")

app.use('/api',tokenVerify.jwtVerification, require('./route'))
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});


app.listen(3000, (err)=>{
    if(err) console.log(err);
    else console.log("Server Connected!");
})


