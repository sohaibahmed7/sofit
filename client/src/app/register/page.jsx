"use client"

import { useState } from "react"
import axios from 'axios'

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [weight, setWeight] = useState("")
    const [isRegistered, setIsRegistered] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const onSubmit = async (event) => {
      event.preventDefault()
      try {
        const res = await axios.post(`http://localhost:3001/register`, {
          username, 
          password,
          displayName,
          weight
        })

        if (res.data.message != "User registered successfully!") {
          setErrorMessage(res.data.message)
        } else {
          setIsRegistered(true)
          setErrorMessage(null)
        }
      } catch (err) {
        alert(err)
      }
    }

    return (
    <div className="flex items-center justify-center h-screen login-bg">
        <Form 
            title="Register"
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            displayName={displayName}
            setDisplayName={setDisplayName}
            weight={weight}
            setWeight={setWeight}
            isRegistered={isRegistered}
            onSubmit={onSubmit}
            errorMessage={errorMessage}
        />
    </div>
  )
}

const Form = ({title, username, setUsername, password, setPassword, displayName, setDisplayName, weight, setWeight, isRegistered, onSubmit, errorMessage}) => {

    return (
      <div className="h-2/3 md:h-3/5 w-3/4 md:w-1/2 lg:w-1/4 text-center shadow-xl rounded-lg bg-[#0F0F0F]">
        <form onSubmit={onSubmit}>
          <h2 className="text-4xl py-2 mt-4 font-semibold">{title}</h2>
          <div>
            <input 
              type="text"
              placeholder="Username"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mx-auto p-2 mt-8 h-[48px] w-3/4 rounded-md"
            />
            <input 
              type="password"
              placeholder="Password"
              minLength={5}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mx-auto p-2 mt-8 h-[48px] w-3/4 rounded-md"
            />
            <input 
              type="text"
              placeholder="Display Name"
              autoComplete="off"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mx-auto p-2 mt-8 h-[48px] w-3/4 rounded-md"
            />
            <input 
              type="number"
              placeholder="Weight (lbs/kgs)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mx-auto p-2 mt-8 h-[48px] w-3/4 rounded-md"
            />
          </div>
          {errorMessage ? (
          <p className="mt-2 mb-[-28px] text-sm text-red-500">{errorMessage}</p>
          ) : []}
          {!isRegistered ? (
            <>
            <button type="submit" className="mt-8 w-1/3 h-[32px] rounded-md bg-[#6247AA]">{title}</button>
            <p className="mt-6">
                Have an account already? <a href="/" className="text-blue-500 hover:text-blue-600">Login here</a>
            </p>
            </>
          ) :
          (
            <>
            <p className="mt-8 text-lg">🥳 Your account has been Registered!</p>
            <a href="/" className="mt-6 text-lg text-blue-500 hover:text-blue-600">Return to login here</a>
            </>
          )
          }
        </form>
      </div>
    )
  }

export default Register