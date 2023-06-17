import express from "express"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from "../models/Users.js"

const router = express.Router()

router.get("/userData/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        res.json({ user })
    } catch (err) {
        console.error(err)
    }
})

router.post("/register", async (req, res) => {
    const { username, password, displayName, weight } = req.body

    if (!username) {
        return res.json({ message: "Username is required." })
    } else if (!password) {
        return res.json({ message: "Password is required." })
    } else if (!weight) {
        return res.json({ message: "Weight is required." })
    }

    const user = await UserModel.findOne({ username: username })

    if (user) {
        return res.json({ message: "This username already exists!" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    // const hashedDisplayName = await bcrypt.hash(displayName, 10)

    const newUser = new UserModel({ 
        username: username, 
        password: hashedPassword,
        displayName: displayName,
        weight: weight,
    })
    await newUser.save()
    
    res.json({ message: "User registered successfully!" })
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body

    const user = await UserModel.findOne({ username: username })

    if (!user) {
        return res.json({ message: "User does not exist!" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.json({ message: "Username or Password is incorrect!" })
    }

    const token = jwt.sign({ id: user._id }, "secret")
    res.json({ token, userID: user._id })
})

export {router as UserRouter}