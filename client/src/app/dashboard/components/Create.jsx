import axios from "axios"
import { useState } from "react"
import { useGetUserId } from "@/hooks/useGetUserId"

const ExerciseForm = (props) => {
    const workout = props.workout
    const setWorkout = props.setWorkout

    const handleExerciseChange = (idx, field, value) => {
        const exercises = workout.exercises
        exercises[idx] = {
            ...exercises[idx],
            [field]: value
        }
        setWorkout({ ...workout, exercises })
    }

    const handleAddExercise = () => {
        setWorkout({ ...workout, exercises: [...workout.exercises, {name: "", sets: "", reps: "" }] })
    }

    const handleRemoveExercise = () => {
        const exercise = workout.exercises
        exercise.pop()
        setWorkout({ ...workout, exercises: exercise })
    }

    // const handleNoteChange = (event, idx) => {
    //     const notes = workout.exercises.notes
    //     setWorkout({ ...workout, [name]: value })
    //   }

    // const handleAddNote = () => {
    //     setWorkout({ ...workout, exercises: [...workout.exercise.notes, ""] })
    //     console.log("Added a note!")
    // }

    return (
    <>
        {workout.exercises.map((exercise, idx) => (
            <div className="my-3" key={idx}>
                <h3 className="text-lg">Exercise #{idx + 1}</h3>
                <input
                    type="text"
                    value={exercise.name}
                    onChange={(event) => handleExerciseChange(idx, 'name', event.target.value)}
                    placeholder="Enter exercise name"
                    className="w-4/5 md:w-1/3 lg:w-1/4 my-1 p-2 border-2 hover:border-[#0F0E0F] rounded-md"
                />
                <input 
                    type="number"
                    value={exercise.sets}
                    onChange={(event) => handleExerciseChange(idx, 'sets', event.target.value)}
                    placeholder="Set goal (#)"
                    className="w-4/5 md:w-1/3 lg:w-1/4 my-1 md:mx-4 p-2 border-2 hover:border-[#0F0E0F] rounded-md"
                />
                <input 
                    type="number"
                    value={exercise.reps}
                    onChange={(event) => handleExerciseChange(idx, 'reps', event.target.value)}
                    placeholder="Rep goal (#)"
                    className="w-4/5 md:w-1/3 lg:w-1/4 my-1 p-2 border-2 hover:border-[#0F0E0F] rounded-md"
                />
            </div>
        ))}
        {workout.exercises.length > 0 ? (
            <div>
                <button 
                type="button" 
                onClick={handleRemoveExercise}
                className="mb-2 p-1 w-24 bg-red-500 rounded-md"
                >
                    Remove
                </button>
            </div>
        ) : (
            <></>
        )}
        <button type="button" className="w-1/2 md:w-1/4 lg:w-1/6 h-[32px] mt-1 rounded-md bg-[#6247AA]" onClick={handleAddExercise}>
            Add Exercise
        </button>
    </>
    )
}

export const Create = () => {
    const userID = useGetUserId()

    const [workout, setWorkout] = useState({
        name: "",
        description: "",
        exercises: [],
        userOwner: userID
    })
    const [errorMessage, setErrorMessage] = useState("")

    const saveWorkout = async (workoutID) => {
        try {
            await axios.put("http://localhost:3001/dashboard", {workoutID, userID})
        } catch (err) {
            alert(err)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setWorkout({ ...workout, [name]: value })
      }

    const isStringOnlySpaces = (str) => {
        return str.trim() === ""
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
          if (isStringOnlySpaces(workout.name)) {
            setErrorMessage("Name is required.")
          } else if (workout.exercises.length < 1) {
            setErrorMessage("At least one exercise is required.")
          } else if (workout.exercises.some((item) => {
            return isStringOnlySpaces(item.name) || isStringOnlySpaces(item.reps) || isStringOnlySpaces(item.sets)
            })) {
                setErrorMessage("Please fill the entire exercise.")
          } else {
            const response = await axios.post("http://localhost:3001/dashboard", workout)
            saveWorkout(response.data._id)
            setErrorMessage(null)
            window.location.assign(`/dashboard/workout/${response.data._id}`)
          }
        } catch (err) {
            alert(err)
      }
    }

    return (
        <div className="p-5">
            <h1 className="text-center md:text-left text-4xl md:text-5xl font-medium">New Workout 🏋️</h1>
            <form onSubmit={handleSubmit} className="text-center md:text-left">
            <div className="mt-4">
                <input 
                    type="text" 
                    name="name"
                    value={workout.name}
                    onChange={handleChange}
                    placeholder="Name your workout (Required)"
                    autoComplete="off"
                    className="w-4/5 md:w-1/2 lg:w-1/3 p-2 border-2 hover:border-[#0F0E0F] rounded-md"
                />
            </div>
            <div className="mt-4">
                <input 
                    type="text" 
                    name="description"
                    value={workout.description}
                    onChange={handleChange}
                    placeholder="Short description (Optional)"
                    autoComplete="off"
                    className="w-4/5 md:w-1/2 lg:w-1/3 mb-1 p-2 border-2 hover:border-[#0F0E0F] rounded-md"
                />
            </div>
            <ExerciseForm workout={workout} setWorkout={setWorkout}/>
            {errorMessage ? (
                <p className="mt-[4px] mb-[-24px] text-sm text-red-500">{errorMessage}</p>
            ) : []}
            <div>
                <button type="submit" className="w-1/2 md:w-1/4 lg:w-1/6 h-[32px] mt-6 rounded-md bg-red-500">Submit workout</button>
            </div>
            </form>
        </div>
  )
}
