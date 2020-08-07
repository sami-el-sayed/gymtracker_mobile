import React,{createContext, useState} from "react"
import dummyWorkouts from "../dummyData/dummyWorkouts"
import dummyExercises from "../dummyData/dummyExercises"
import Workout from "components/models/Workout"


interface ContextProps{
    workouts:Workout[],
    addWorkout:(workoutToAdd:Workout)=>void
    exercises:string[],
    addExercise:(exercise:string)=>void
}



export const GlobalContext = createContext<Partial<ContextProps>>({})

export const GlobalProvider: React.FunctionComponent = (props) => {

    const [workouts,setWorkouts] = useState<Workout[]>(dummyWorkouts)
    const [exercises,setExercises] = useState<string[]>(dummyExercises)



    function addWorkout(workoutToAdd:Workout) {
        //let added = await AddWorkoutToStorage
        setWorkouts([...workouts,workoutToAdd])
    }

    function loadWorkouts() {

    }

    function loadExercises(){

    }

    function addExercise(exercise:string){
        //let added = await AddExerciseToStorage
        setExercises([...exercises,exercise])
    }


    
    return (
        <GlobalContext.Provider
        value={{
            workouts,
            addWorkout,
            exercises,
            addExercise
        }}
        >
        {props.children}
        </GlobalContext.Provider>
    )
}
