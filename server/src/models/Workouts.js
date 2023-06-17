import mongoose from "mongoose"

const ExerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    // notes: [{ type: String }]
})

const WorkoutSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    exercises: [{ 
        type: ExerciseSchema, 
        required: true }],
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
})

// export const ExerciseModel = mongoose.model("exercises", ExerciseSchema)
export const WorkoutModel = mongoose.model("workouts", WorkoutSchema)
