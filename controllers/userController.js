import asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"
import mongoose from "mongoose"
import { User } from "../models/userModel.js"
import jwt from "jsonwebtoken"

const registerUser = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body
    const HashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
        username,
        email,
        password: HashedPassword
    })
    return res.status(201).json({ _id: newUser.id, username: newUser.username, email: newUser.email })
})

const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
        return res.status(200).json({ accessToken })
    }
    res.status(401)
    throw new Error("Email or Password Invalid")
})

const currentUser = asyncHandler(async(req, res) => {
    console.log(req.user)
    return res.json({
        message: "Welcome " + req.user.username,
        email: req.user.email,
    })
})
export { registerUser, loginUser, currentUser }