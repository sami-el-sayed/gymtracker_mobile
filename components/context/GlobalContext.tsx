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
import removeExerciseFromStorage from "../helpers/removeExerciseFromStorage"


interface ContextProps{
    workouts:Workout[],
    loadWorkouts:()=>void,
    addWorkout:(workoutToAdd:Workout)=>Promise<[boolean,string?]>,
    saveEditedWorkout:(workout:Workout,originalWorkoutDate:Date) =>Promise<[boolean,string?]>,
    quarters:string[],
    currentQuarterIdx:number,
    exercises:string[],
    addExercise:(exercise:string)=>Promise<[boolean,string?]>,
    deleteExecise:(exercise:string) => void,
    deleteWorkout:(workoutToRemove:Workout)=>void
}

export const GlobalContext = createContext<Partial<ContextProps>>({})

export const GlobalProvider: React.FunctionComponent = (props) => {



    const [workouts,setWorkouts] = useState<Workout[]>([])


    const [exercises,setExercises] = useState<string[]>([])

    const [quarters,setQuarters] = useState<string[]>([])
    const [currentQuarterIdx,setcurrentQuarterIdx] = useState<number> (0)

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

    //Initial load of Workouts when component Renders
    async function initialWorkoutsLoad(){
        const workoutsTemp = workouts.slice();
        const loadedWorkouts = await LoadWorkoutsLoop(0);
        setWorkouts(workoutsTemp.concat(loadedWorkouts));
    }

    //Loop that breaks every 40 loadedWorkouts
    //Saves on what index it finished
    async function LoadWorkoutsLoop(startInt:number): Promise<Workout[]>{
        let workouts:Workout[] = [];

        for (let i:number = startInt; i < quarters.length; i++) {
            const result:[Workout[],string?] = await LoadWorkoutsFromStorage(quarters[i]);
            workouts = workouts.concat(result[0]);
            if(workouts.length > 40 ) break;                
        }

        setcurrentQuarterIdx(currentQuarterIdx+1);

        return workouts;

    }

    //Adds Workout to Storage
    //Updates Workouts State
    async function addWorkout(workoutToAdd:Workout):Promise<[boolean,string?]> {
        const result:[boolean,string?] = await AddWorkoutToStorage(workoutToAdd,false);
        const added:boolean = result[0];
        if(added === true) setWorkouts([...workouts,workoutToAdd])
        return result;
    }

    //Loads Workouts from Storage
    //Func called from other Views such as lists when top is reached
    async function loadWorkouts() {
        //Checks if atleast 40 workouts have been initially loaded
        if(workouts.length < 40) return;
        else{
            const workoutsTemp = workouts.slice();
            const loadedWorkouts = await LoadWorkoutsLoop(currentQuarterIdx);
            setWorkouts(workoutsTemp.concat(loadedWorkouts));
        }
    }

    
    //Loads Exercises from Storage
    async function loadExercises(){
        const result:[string[],string?] = await LoadExercisesFromStorage();
        const exercises = result[0];
        console.log(result)
        setExercises(exercises)
    }

    async function loadQuarters(){
        const sortedQuarters:string[] = await getAllQuartersAndYearsSorted();
        setQuarters(sortedQuarters);
    }

    
    //Saves Edited Workout
    const saveEditedWorkout = async (workout:Workout,originalWorkoutDate:Date):Promise<[boolean,string?]>  => {
        
        const result = await editWorkoutToStorage(workout,originalWorkoutDate);
        if(result[0] === true){
            setWorkouts(await LoadWorkoutsLoop(0));
            loadQuarters();
            return result;
        }
        else return result;

    }

    const deleteWorkout = async (workoutToRemove:Workout) => {
        const result:[boolean,string?] = await removeWorkoutFromStorage(new Date(workoutToRemove.workoutDate));
        if(result[0]===true){
            setWorkouts(workouts.filter((workout)=>workout.workoutDate !== workoutToRemove.workoutDate ))
        }

    }

    //Adds Exercise To Storage
    async function addExercise(exercise:string): Promise<[boolean,string?]>{
        const duplicateExists:boolean = checkIfExerciseExists(exercises,exercise)

        if(duplicateExists === true) return [false,"This exercise already exists!"]

        if(duplicateExists === false){

            const newExercises:string[] = [...exercises,exercise]
            const result:[boolean,string?] = await AddExercisesToStorage(newExercises);
            const added:boolean = result[0]
            if(added === true) setExercises(newExercises)
            return [true]
        }
        return [false]
    }


    //Deletes Exercise from Storage
    async function deleteExecise(exercise:string){
        const result:[string[],string?] = await removeExerciseFromStorage(exercise,exercises);
        setExercises(result[0])
    }


    
    return (
        <GlobalContext.Provider
        value={{
            quarters,
            currentQuarterIdx,
            workouts,
            saveEditedWorkout,
            addWorkout,
            loadWorkouts,
            exercises,
            addExercise,
            deleteExecise,
            deleteWorkout
        }}
        >
        {props.children}
        </GlobalContext.Provider>
    )
}
