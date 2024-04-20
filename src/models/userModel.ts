import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: [true, "Please Enter Your Name"],
        unique: true
    },
    email:{
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Please Enter Your Password"],
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgetPasswordToken: String,
    forgetPsswordExpiry: Date,
    verfiyToken: String,
    verfiyTokenExpiry: Date
},{timestamps: true});

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User