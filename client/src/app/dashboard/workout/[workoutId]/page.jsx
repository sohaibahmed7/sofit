"use client"

import axios from "axios"

import { useEffect, useState } from "react"
import { useGetUserId } from "@/hooks/useGetUserId"

import Sidebar from "../../components/Sidebar"
import Header from "../../components/Header"
import Exercise from "../../components/Exercise"
import Stopwatch from "../../components/Stopwatch"
import Timer from "../../components/Timer"

const Workout = (props) => {
  const userID = useGetUserId()
  const workoutID = props.params.workoutId

  const [deleting, setDeleting] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [savedWorkout, setSavedWorkout] = useState({
    name: "",
    description: "",
    exercises: [],
    userOwner: userID
  })

  const handleViewSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const contentClass = sidebarOpen ? "disable-scroll content open" : "content"

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await axios.get(`https://api.sofit.djerty.com/dashboard/workout/${workoutID}`)
        setSavedWorkout(response.data.workout)
      } catch (err) {
        alert(err)
      }
    }

    fetchWorkout()
  }, [])

  const handleDeleteWorkout = async (workoutID) => {
    try {
      await axios.delete(`https://api.sofit.djerty.com/dashboard/workout/${workoutID}`)
      window.location.assign(`/dashboard`)
    } catch (err) {
      alert(err)
    }
  }

  const exerciseList = savedWorkout.exercises.map(item => {
    return (
      <Exercise key={item._id} name={item.name} sets={item.sets} reps={item.reps}/>
    )
  })

  return (
    <>
      <Header toggleSidebar={handleViewSidebar}/>
      <Sidebar isOpen={sidebarOpen}/>
      <div className={contentClass}>
        <div>
          <div className="p-5 flex flex-col lg:flex-row">
            <div className="lg:w-5/6 mb-4 md:mb-12 lg:mb-0">
              <h1 className="text-center md:text-left text-4xl md:text-5xl font-medium">{savedWorkout.name}</h1>
              <p className="lg:w-11/12 text-center md:text-left text-sm md:text-base md:2xl mt-2">{savedWorkout.description}</p>
              <h3 className="text-center md:text-left text-2xl md:text-3xl mt-6">
                Exercises
              </h3>
              {exerciseList}
            </div>
            <div className="flex flex-col md:flex-row gap-1 md:gap-12 justify-center items-center">
              <div className="mt-8 md:mt-0 w-auto h-[360px] md:w-[300px] md:h-[300px] lg:w-[360px] lg:h-[360px] p-4 rounded-md shadow-md bg-[#0F0E0F] flex flex-col justify-center items-center">
                    <Timer/>
              </div>
              <div className="mt-8 md:mt-0 w-auto h-[360px] md:w-[300px] md:h-[300px] lg:w-[360px] lg:h-[360px] p-4 rounded-md shadow-md bg-[#0F0E0F] flex flex-col justify-center items-center">
                  <Stopwatch/>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center lg:text-left lg:ml-5">
            {deleting ? (
              <>
               <button className="w-[150px] p-1 my-2 rounded-md bg-red-500 mr-2" onClick={() => handleDeleteWorkout(workoutID)}>
                Confirm
               </button>
               <button className="w-[150px] p-1 my-2 rounded-md bg-red-500 ml-2" onClick={() => setDeleting(!deleting)}>
                Cancel
               </button>
              </>
            ) : (
              <button className="w-[200px] p-1 mb-4 rounded-md bg-red-500" onClick={() => setDeleting(!deleting)}>
                🚮 Delete this workout?
              </button>
            )}
            {console.log(deleting)}
        </div>
      </div>
    </>
  )
}

export default Workout