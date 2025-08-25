import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "The username field is required"]
    },
    email: {
        type: String,
        required: [true, "The email field is required"],
        unique: [true, "Email address already taken"]
    },
    password: {
        type: String,
        required: [true, "The password field is required"]
    }

}, { timestamps: true })

export const User = mongoose.model("User", userSchema)