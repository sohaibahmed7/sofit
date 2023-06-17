import express from "express"
import { WorkoutModel } from "../models/Workouts.js"
import { UserModel } from "../models/Users.js"

const router = express.Router()

router.post("/", async (req, res) => {
    const workout = new WorkoutModel(req.body)

    try {
        const response = await workout.save()
        res.json(response)
    } catch (err) {
        res.json(err)
    }
})

router.put("/", async (req, res) => {
    try {
        const workout = await WorkoutModel.findById(req.body.workoutID)
        const user = await UserModel.findById(req.body.userID)
        user.workouts.push(workout)
        await user.save()
        res.json( {workouts: user.workouts} )
    } catch (err) {
        res.json(err)
    }
})

router.get("/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        const workouts = await WorkoutModel.find({
            _id: {$in: user.workouts}
        })
        res.json({ workouts })
    } catch (err) {
        res.json(err)
    }
})

router.get("/workout/:workoutID", async (req, res) => {
    try {
        const workout = await WorkoutModel.findById(req.params.workoutID)
        res.json({ workout })
    } catch (err) {
        res.json(err)
    }
})

router.delete("/workout/:workoutID", async (req, res) => {
    try {
        const workoutId = req.params.workoutID
        await WorkoutModel.findByIdAndDelete(workoutId)
        await UserModel.updateOne({}, { $pull: {workouts: workoutId} })
        res.json("Success")
    } catch (err) {
        res.json(err)
    }
})

export { router as WorkoutRouter }