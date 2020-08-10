import React,{createContext, useState,useEffect} from "react"
import Workout from "../models/Workout"
import LoadExercisesFromStorage from "../helpers/LoadExercisesFromStorage"
import AddExercisesToStorage from "../helpers/AddExerciseToStorage"
import AddWorkoutToStorage from "../helpers/AddWorkoutToStorage"
import LoadWorkoutsFromStorage from "../helpers/LoadWorkoutsFromStorage"
import editWorkoutToStorage from "../helpers/editWorkoutToStorage"
import getAllQuartersAndYearsSorted from "../helpers/getAllQuartersAndYearsSorted"
import removeWorkoutFromStorage from "../helpers/removeWorkoutFromStorage"
import checkIfExerciseExists from "../helpers/checkIfExerciseExists"


interface ContextProps{
    workouts:Workout[],
    addWorkout:(workoutToAdd:Workout)=>void,
    saveEditedWorkout:(workout:Workout,originalWorkoutDate:Date) =>void
    exercises:string[],
    addExercise:(exercise:string)=>void,
    deleteWorkout:(workoutToRemove:Workout)=>void
}

export const GlobalContext = createContext<Partial<ContextProps>>({})

export const GlobalProvider: React.FunctionComponent = (props) => {



    const [workouts,setWorkouts] = useState<Workout[]>([])


    const [exercises,setExercises] = useState<string[]>([])

    const [quarters,setQuarters] = useState<string[]>([])

    //Initially loads quarters and exercises
    useEffect(()=>{
        intialLoad();
    },[])

    async function intialLoad(){
        await loadExercises();
        await loadQuarters();
    }


    //When quarters are loaded it loads workouts based on those quarters
    useEffect(()=>{
        if(quarters.length > 0 && workouts.length===0){
            initialWorkoutsLoad();
        }
    },[quarters])

    //Initial load of Workouts
    //If there is more than 20 workouts it breaks the loop

    async function initialWorkoutsLoad(){
        let workouts:Workout[] = [];

        for (let i:number = 0; i < quarters.length; i++) {
            const result:[Workout[],string?] = await LoadWorkoutsFromStorage(quarters[i]);
            workouts = workouts.concat(result[0]);
            if(workouts.length > 20 ) break;                
        }

        setWorkouts(workouts);
    }

    async function addWorkout(workoutToAdd:Workout) {
        const result:[boolean,string?] = await AddWorkoutToStorage(workoutToAdd);
        const added:boolean = result[0];
        if(added === true) setWorkouts([...workouts,workoutToAdd])    
    
    }

    
    async function loadWorkouts() {
        
    }

    

    async function loadExercises(){
        const result:[string[],string?] = await LoadExercisesFromStorage();
        const exercises = result[0];
        setExercises(exercises)
    }

    async function loadQuarters(){
        const sortedQuarters:string[] = await getAllQuartersAndYearsSorted();
        setQuarters(sortedQuarters);
    }

    

    const saveEditedWorkout = async (workout:Workout,originalWorkoutDate:Date) => {
        
        const result = await editWorkoutToStorage(workout,originalWorkoutDate);

    }

    const deleteWorkout = async (workoutToRemove:Workout) => {
        const result:[boolean,string?] = await removeWorkoutFromStorage(new Date(workoutToRemove.workoutDate));
        if(result[0]===true){
            setWorkouts(workouts.filter((workout)=>workout.workoutDate !== workoutToRemove.workoutDate ))
        }

    }

    async function addExercise(exercise:string){
        const duplicateExists:boolean = checkIfExerciseExists(exercises,exercise)

        if(duplicateExists === false){

            const newExercises:string[] = [...exercises,exercise]
            const result:[boolean,string?] = await AddExercisesToStorage(newExercises);
            const added:boolean = result[0]
            if(added === true) setExercises(newExercises)    

        }
        
    }

    async function deleteExecise(exercise:string){
        
    }


    
    return (
        <GlobalContext.Provider
        value={{
            workouts,
            saveEditedWorkout,
            addWorkout,
            exercises,
            addExercise,
            deleteWorkout

        }}
        >
        {props.children}
        </GlobalContext.Provider>
    )
}
