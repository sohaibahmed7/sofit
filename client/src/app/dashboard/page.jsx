"use client"

import axios from "axios"

import { useState, useEffect } from "react"
import { useGetUserId } from "@/hooks/useGetUserId"

import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import { Home } from "./components/Home"

const Dashboard = () => {
  const userID = useGetUserId()

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [userData, setUserData] = useState({
    displayName: "",
    weight: "",
    workouts: []
  })

  const handleViewSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  useEffect(() => {
    if (!userID) window.location.assign("/")

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://api.sofit.djerty.com/dashboard/userData/${userID}`)
        setUserData({
          displayName: response.data.user.displayName,
          weight: response.data.user.weight,
          workouts: response.data.user.workouts
        })
      } catch (err) {
        alert(err)
      }
    }

    fetchUserData()
  }, [])

  const contentClass = sidebarOpen ? "content open disable-scroll" : "content"

  return (
    <>
      <Header toggleSidebar={handleViewSidebar}/>
      <Sidebar isOpen={sidebarOpen}/>
      <div className={contentClass}>
        <Home displayName={userData.displayName} weight={userData.weight} workouts={userData.workouts}/>
      </div>
    </>
  )
}

export default Dashboard