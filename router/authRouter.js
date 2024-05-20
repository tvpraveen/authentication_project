const express = require('express')
const router = express.Router()
const userController = require("../controller/authController")

router.post("/signup", (req,res)=>{
    userController.signup(req).then((data)=>{
        res.status(200).send(data)
    }).catch(err => res.status(500).send({
        message: err.message
    }))
})
router.post("/login", (req,res)=>{
    userController.login(req).then((data)=>{
        res.status(200).send(data)
    }).catch(err => res.status(500).send({
        message:err.message
    }))
})


router.get('/getUser',(req,res)=>{
    console.log("router....");
     userController.getUsers(req).then((data)=>{
        res.status(200).send(data)
    }).catch(err => res.status(500).send({
        message: err.message
    }))
})

router.get('/getUsers/:id', (req,res)=>{
    userController.getUserById(req).then((data)=>{
        res.status(200).send(data)
    }).catch(err => res.status(500).send({
        message: err.message
    }))
})

router.put('/updateUser/:id', (req,res)=>{
    userController.updateUser(req).then((data)=>{
        res.status(200).send(data)
    }).catch(err=> res.status(500).send({
        message: err.message
    }))
})





module.exports = router