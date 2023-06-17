
const Exercise = (props) => {
  return (
    <div className="mt-3 p-4 lg:w-11/12 bg-[#6247AA] rounded-md shadow-sm">
      <h5 className="text-2xl font-extrabold">{props.name}</h5>
      <div className="flex gap-6">
        <p>{props.sets} Sets</p>
        <p>{props.reps} Reps</p>
      </div>
    </div>
  )
}

export default Exercise