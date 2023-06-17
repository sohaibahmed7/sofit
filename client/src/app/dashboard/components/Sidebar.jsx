"use client"

import Link from "next/link"
import axios from "axios"

import { useState, useEffect } from "react"
import { useGetUserId } from "@/hooks/useGetUserId"

const SidebarLink = (props) => {
    return (
      <Link 
        href={props.href}
        className="block py-2 px-3 rounded-xl mb-2 bg-[#6247AA] font"
      >
        {props.title}
      </Link>
    )
}

const Sidebar = (props) => {
  const userID = useGetUserId()

  const [savedWorkouts, setSavedWorkouts] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown)
  }

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/dashboard/${userID}`)
        setSavedWorkouts(response.data.workouts)
      } catch (err) {
        console.log(err)
      }
    }

    fetchWorkouts()
  }, [])

  const sidebarClass = props.isOpen ? "sidebar open" : "sidebar"

  const workoutList = savedWorkouts.map(item => {
    return (
      <SidebarLink key={item._id} href={`/dashboard/workout/${item._id}`} title={item.name}/>
    );
  });

  return (
      <div className={sidebarClass}>
      <div className="mt-2 mx-3">
        <SidebarLink href="/dashboard" title="🏠 Home"/>
        <SidebarLink href="/dashboard/create" title="💪 Create Workout"/>
        <div className="block py-2 px-3 mt-6 mb-2 rounded-xl bg-[#6247AA] cursor-pointer" onClick={handleDropdownClick}>
          🏋️ My Workouts
        </div>
        {showDropdown && workoutList}
        <div className="mt-12">
          <SidebarLink href="/" title="❌ Sign Out"/>
        </div>
      </div>
      </div>
  )
}

export default Sidebar
