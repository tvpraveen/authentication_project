const express = require("express")
const router = express.Router()

router.use('/user', require("./router/authRouter"))

module.exports = router