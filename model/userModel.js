const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true, // it will convers email to lowercase before saving in db
        validate: [validator.isEmail, "please enter the valid email"]
    },
    password: {
        type: String,
        require: true,
        minlength: 8,
        select: false   

    },
    confirmPassword:{
        type: String,
        required: true,
        validate:{
            validator: function(val){
                return val == this.password
            },
            message: "password & confirm password are not same"
        }
    },
    firstName: {
        type: String
    },
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    // encrypt password before saving it
    this.password = await bcrypt.hash(this.password, 12); // 12 is cost perameter or salt
    this.confirmPassword = undefined;
    next();
});

userSchema.methods.comparePasswordInDb = async function(psw, pswDb){
    return await bcrypt.compare(psw, pswDb);
}

const userModel = mongoose.model("user", userSchema)
module.exports = userModel