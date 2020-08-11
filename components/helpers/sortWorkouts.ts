import Workout from "components/models/Workout"


const sortWorkouts = (workouts:Workout[]) : Workout[] => {
    return workouts.sort((a,b)=>new Date(b.workoutDate).getTime()-new Date(a.workoutDate).getTime())
}

export default sortWorkouts