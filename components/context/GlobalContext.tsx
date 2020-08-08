import React,{createContext, useState} from "react"
import dummyWorkouts from "../dummyData/dummyWorkouts"
import dummyExercises from "../dummyData/dummyExercises"
import Workout from "components/models/Workout"


interface ContextProps{
    workouts:Workout[],
    editedWorkout:Workout,
    addWorkout:(workoutToAdd:Workout)=>void,
    editWorkout:(workout:Workout) => void,
    saveEditedWorkout:(workout:Workout) =>void
    exercises:string[],
    addExercise:(exercise:string)=>void
}

export const GlobalContext = createContext<Partial<ContextProps>>({})

export const GlobalProvider: React.FunctionComponent = (props) => {

    const [workouts,setWorkouts] = useState<Workout[]>(dummyWorkouts)
    const [editedWorkout,setEditedWorkout] = useState<Workout|undefined>(undefined)

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

    const editWorkout = (workout:Workout) => {
        setEditedWorkout(workout)
    }

    const saveEditedWorkout = (workout:Workout) => {

        if(editedWorkout === undefined) return
        const workoutsCopy:Workout[] = workouts.slice();

        for (let i = 0; i < workouts.length; i++) {
            if(workoutsCopy[i].workoutDate === editedWorkout.workoutDate){
                workoutsCopy[i] = workout;
            }   
        }

        setEditedWorkout(undefined)
        setWorkouts(workoutsCopy)
    }


    
    return (
        <GlobalContext.Provider
        value={{
            workouts,
            editedWorkout,
            editWorkout,
            saveEditedWorkout,
            addWorkout,
            exercises,
            addExercise,

        }}
        >
        {props.children}
        </GlobalContext.Provider>
    )
}
