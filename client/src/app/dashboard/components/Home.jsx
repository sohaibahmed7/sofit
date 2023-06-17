import Stopwatch from "./Stopwatch";
import Timer from "./Timer";

export const Home = (props) => {
  const currentDate = new Date()

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const day = currentDate.getDate()

  const cardClass = "mt-8 md:mt-0 w-auto h-[360px] md:w-[300px] md:h-[300px] lg:w-[360px] lg:h-[360px] p-4 rounded-md shadow-md bg-[#0F0E0F] flex flex-col justify-center items-center"

  return (
    <div className="p-2 md:p-5">
      <h1 className="text-2xl md:text-5xl text-center md:text-left font-medium">Hello, {props.displayName} 👋</h1>
      <h2 className="mt-2 text-xl md:text-3xl text-center md:text-left">Today is {monthNames[month]} {day}, {year} - Have you worked out today?</h2>
      <div className="mt-8 block md:flex md:flex-wrap md:gap-8">
        <div className={cardClass}>
            <Timer/>
        </div>
        <div className={cardClass}>
            <Stopwatch/>
        </div>
        <div className={cardClass}>
          <h4 className="text-xl text-center font-medium mb-6">You currently have</h4>
          <h1 className="text-9xl text-center">{props.workouts.length}</h1>
          <h4 className="text-xl text-center font-medium mt-6">
            {props.workouts.length > 0 ? (
              props.workouts.length > 1 ? "saved workouts 😁" : "saved workout 😁"
              ) : "saved workouts ☹️"}
          </h4>
        </div>
        <div className={cardClass}>
          <h4 className="text-xl text-center font-medium mb-6">Fun fact! You weighed</h4>
          <h1 className="text-9xl text-center">{props.weight}</h1>
          <h4 className="text-xl text-center font-medium mt-6">when you registered 😯</h4>
        </div>
      </div>
    </div>
  )
}