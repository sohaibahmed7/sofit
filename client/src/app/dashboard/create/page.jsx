"use client"

import { useState } from "react"
// import { useGetUserId } from "@/hooks/useGetUserId"

import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import { Create } from "../components/Create"

const Dashboard = () => {
  // const userID = useGetUserId()

  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleViewSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const contentClass = sidebarOpen ? "disable-scroll content open" : "content"

  return (
    <>
      <Header toggleSidebar={handleViewSidebar}/>
      <Sidebar isOpen={sidebarOpen}/>
      <div className={contentClass}>
        <Create/>
      </div>
    </>
  )
}

export default Dashboard