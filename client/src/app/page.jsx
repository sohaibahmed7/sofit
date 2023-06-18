"use client"

import { useState } from "react"
import axios from 'axios'
import { useCookies } from "react-cookie"
import dotenv from 'dotenv'

dotenv.config()

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isValidLogin, setIsValidLogin] = useState(true)

  const [, setCookies] = useCookies(["access_token"])

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await axios.post("https://api.sofit.djerty.com/login", {
        username,
        password
      })

      if (res.data.message) {
        setIsValidLogin(false)
      } else {
        setIsValidLogin(true)
        setCookies("access_token", res.data.token)
        window.localStorage.setItem("userID", res.data.userID)
        window.location.assign("/dashboard")
      }
    } catch (err) {
      alert(err)
      console.log(err)
    }
  }

  return (
      <div className="flex items-center justify-center h-screen login-bg">
        <Form 
          title="Login"
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          onSubmit={onSubmit}
          isValidLogin={isValidLogin}
        />
      </div>
  )
}

const Form = ({title, username, setUsername, password, setPassword, onSubmit, isValidLogin}) => {
  return (
    <div className="h-1/2 w-3/4 md:w-1/2 lg:w-1/4 text-center shadow-xl rounded-lg bg-[#0F0F0F]">
      <form onSubmit={onSubmit} className="">
        <h2 className="text-4xl py-2 mt-4 font-semibold">{title}</h2>
        <div>
          <input 
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mx-auto p-2 mt-8 h-[48px] w-3/4 rounded-md text-black"
          />
          <input 
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mx-auto p-2 mt-8 h-[48px] w-3/4 rounded-md text-black"
          />
        </div>
        {!isValidLogin ? (
          <p className="mt-2 mb-[-28px] text-sm text-red-500">Incorrect username or password. Try again.</p>
        ) : []}
        <button type="submit" className="mt-8 w-1/3 h-[32px] rounded-md bg-[#6247AA]">
          {title}
        </button>
        <p className="mt-6">
          Don't have an account? <a href="/register" className="text-blue-500 hover:text-blue-600">Register here</a>
        </p>
      </form>
    </div>
  )
}

export default Login