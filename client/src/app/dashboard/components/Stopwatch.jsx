import { useState, useEffect } from "react"

const Stopwatch = () => {
    // Initializing state for the value of the stopwatch to be displayed
    const [timer, setTimer] = useState(0)
    // Initializing state to determine whether or not the start/pause button has been pressed
    const [start, setStart] = useState(false)

    // useEffect is run whenever the value of 'start' changes to avoid side effects
    useEffect(() => {
        let interval = null /* Variable to be used as an interval with setInterval */

        // If the start button has been pressed, begin running the stopwatch 
        if(start) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1)
            }, 1000)
        } 
        // When the pause button has been pressed, or the stopwatch has been reset,
        // clear the time interval and stop counting on the stopwatch
        return () => clearInterval(interval)
    }, [start])

    // Resetting the value of the stopwatch to zero
    const resetTimer = () => {
        setTimer(0)
        setStart(false)
    }

    // Calculating minutes and seconds
    let minutes = ~~(timer / 60);
    let seconds = timer % 60;

    // Formatting the time for nicer design
    const minFormat = minutes < 10 ? `0${minutes}`: minutes
    const secFormat = seconds < 10 ? `0${seconds}`: seconds

    return (
        <div>
            <h4 className="text-3xl font-medium text-center mb-6">⏱️ Stopwatch</h4>
            {/* Displaying the formatted stopwatch */}
            <h1 className="text-8xl text-center">{minFormat}:{secFormat}</h1>
            <div className="text-xl mt-6 flex justify-between px-4">
                <button onClick={resetTimer} className="bg-red-500 px-2 py-1 rounded-md">Reset</button>
                {/* Changing the button from 'start' to 'pause' upon presses*/}
                <button onClick={() => setStart(prevStart => !prevStart)} className="bg-red-500 px-2 py-1 rounded-md">{!start ? "Start" : "Pause"}</button>
            </div>
        </div>
    )
}

export default Stopwatch