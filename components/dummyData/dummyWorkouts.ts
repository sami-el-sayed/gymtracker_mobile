import Workout from "../models/Workout"
import Exercise from "../models/Exercise"
import Point from "../models/Point"

const dummyWorkouts:Workout[] = [
    new Workout(new Date("2020-05-05"), [new Exercise("Deadlift",[new Point(new Date("2020-05-05"),5,5,100,"success",1)])],1),

    new Workout(new Date("2020-05-07"), [
        new Exercise("OHP",[new Point(new Date("2020-05-07"),5,5,55,"fail",2)]),
        new Exercise("Squat",[new Point(new Date("2020-05-07"),5,5,95,"success",3)]),
    ],2),

    new Workout(new Date("2020-05-09"), [
        new Exercise("Bench",[new Point(new Date("2020-05-09"),5,5,95,"fail",4)]),
        new Exercise("Deadlift",[new Point(new Date("2020-05-09"),5,5,105,"success",5)]),
    ],3)
]

export default dummyWorkouts
