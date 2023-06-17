import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    displayName: { type: String, required: true },
    weight: { type: Number, required: true },
    workouts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "workouts"
    }]
})

export const UserModel = mongoose.model("users", UserSchema)