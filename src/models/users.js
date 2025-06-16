const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    {isEmail} =require('validator');


const userSchema = new Schema({
    email:{
        type: String,
        validate: [isEmail,'invalid email'],
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    fullName:{
        type: String,
    },
    mobileNo:{
        type:Number,
    },
    gender:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    
});


module.exports = mongoose.model('User',userSchema);
exports.userSchema = userSchema;
console.info("[UserSchema] created successfully");
