import React,{createContext, useState,useEffect} from "react"
import dummyWorkouts from "../dummyData/dummyWorkouts"
import Workout from "../models/Workout"
import LoadExercisesFromStorage from "../helpers/LoadExercisesFromStorage"
import AddExercisesToStorage from "../helpers/AddExerciseToStorage"
import getMonthYear from "../helpers/getMonthYear"
import AddWorkoutToStorage from "../helpers/AddWorkoutToStorage"
import LoadWorkoutsFromStorage from "../helpers/LoadWorkoutsFromStorage"
import editWorkoutToStorage from "../helpers/editWorkoutToStorage"


interface ContextProps{
    workouts:Workout[],
    addWorkout:(workoutToAdd:Workout)=>void,
    saveEditedWorkout:(workout:Workout,originalWorkoutDate:Date) =>void
    exercises:string[],
    addExercise:(exercise:string)=>void
}

export const GlobalContext = createContext<Partial<ContextProps>>({})

export const GlobalProvider: React.FunctionComponent = (props) => {



    const [workouts,setWorkouts] = useState<Workout[]>([])


    const [exercises,setExercises] = useState<string[]>([])


    useEffect(()=>{
        intialLoad();
    },[])

    async function intialLoad(){
        await loadExercises();
        await loadWorkouts();
    }

    async function addWorkout(workoutToAdd:Workout) {
        const result:[boolean,string?] = await AddWorkoutToStorage(workoutToAdd);
        const added:boolean = result[0];
        if(added === true) setWorkouts([...workouts,workoutToAdd])    
    
    }

    async function loadWorkouts() {
        const result:[Workout[],string?] = await LoadWorkoutsFromStorage();
        const workouts:Workout[] = result[0];
        setWorkouts(workouts);
        console.log(workouts)
    }

    

    async function loadExercises(){
        const result:[string[],string?] = await LoadExercisesFromStorage();
        const exercises = result[0];
        setExercises(exercises)
    }

    async function addExercise(exercise:string){
        if(exercises.includes(exercise)) return;
        const newExercises:string[] = [...exercises,exercise]
        const result:[boolean,string?] = await AddExercisesToStorage(newExercises);
        const added:boolean = result[0]
        if(added === true) setExercises(newExercises)
        
    }

    const saveEditedWorkout = async (workout:Workout,originalWorkoutDate:Date) => {
        
        const result = await editWorkoutToStorage(workout,originalWorkoutDate);

    }


    
    return (
        <GlobalContext.Provider
        value={{
            workouts,
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
