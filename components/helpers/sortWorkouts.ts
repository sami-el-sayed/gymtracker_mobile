import Workout from "components/models/Workout"


const monthsIdx: { [Key: string] : number } = {
    'Jan' : 1,
    'Feb' : 2,
    'Mar' : 3,
    'Apr' : 4,
    'May' : 5,
    'Jun' : 6,
    'Jul' : 7,
    'Aug' : 8,
    'Sep' : 9,
    'Oct' : 10,
    'Nov' : 11,
    'Dec' : 12
}

//Tue Aug 11 2020 turns into int
const dateToInt = (workoutDate:string) : number => {
    const monthInt = monthsIdx[workoutDate.substr(4,3)]
    const dayId = parseInt(workoutDate.substr(8,2))
    const year = parseInt(workoutDate.substr(11,4))
    return monthInt + dayId + year;
}


const sortWorkouts = (workouts:Workout[]) : Workout[] => {
    return workouts.sort((a,b)=>dateToInt(b.workoutDate)-dateToInt(a.workoutDate))
}

export default sortWorkouts