import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import { UserRouter } from './routes/users.js'
import { WorkoutRouter } from './routes/workouts.js'

const app = express()
dotenv.config()
const dbUrl = process.env.DATABASE_URL

app.use(express.json())
app.use(cors())

app.use("", UserRouter)
app.use("/dashboard", WorkoutRouter)
app.use("/dashboard", UserRouter)

mongoose.connect(dbUrl)

app.listen(process.env.PORT, () => {
    console.log(`SERVER STARTED ON PORT ${process.env.PORT}.`)
})