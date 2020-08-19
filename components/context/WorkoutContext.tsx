import React,{createContext, useState,useEffect} from "react"
import Workout from "../models/Workout"

import AddWorkoutToStorage from "../helpers/workouts_quarters/AddWorkoutToStorage"
import LoadWorkoutsFromStorage from "../helpers/workouts_quarters/LoadWorkoutsFromStorage"
import editWorkoutToStorage from "../helpers/workouts_quarters/editWorkoutToStorage"
import getAllQuartersAndYearsSorted from "../helpers/workouts_quarters/getAllQuartersAndYearsSorted"
import removeWorkoutFromStorage from "../helpers/workouts_quarters/removeWorkoutFromStorage"
import sortWorkouts from "../helpers/workouts_quarters/sortWorkouts"
import clearWorkoutsFromStorage from "../helpers/clearWorkoutsFromStorage"


const WORKOUT_LOOP_LIMIT = 40


interface ContextProps{
    workouts:Workout[],
    loadWorkouts:()=>void,
    addWorkout:(workoutToAdd:Workout)=>Promise<[boolean,string?]>,
    saveEditedWorkout:(workout:Workout,originalWorkout:Workout,originalWorkoutDate:Date) =>Promise<[boolean,string?]>,
    quarters:string[],
    currentQuarterIdx:number,
    deleteWorkout:(workoutToRemove:Workout)=>void,
    deleteAllWorkouts:()=>void,
}

export const WorkoutContext = createContext<Partial<ContextProps>>({})

export const WorkoutProvider: React.FunctionComponent = (props) => {

    const [workouts,setWorkouts] = useState<Workout[]>([])
    const [quarters,setQuarters] = useState<string[]>([])
    const [currentQuarterIdx,setcurrentQuarterIdx] = useState<number> (0)



    
    //Initially loads quarters and exercises
    useEffect(()=>{
        loadQuarters();
    },[])

    //When quarters are loaded it loads workouts based on those quarters
    useEffect(()=>{
        if(quarters.length > 0 && workouts.length===0){
            initialWorkoutsLoad();
        }
    },[quarters])


    async function loadQuarters(){
        const sortedQuarters:string[] = await getAllQuartersAndYearsSorted();
        setQuarters(sortedQuarters);
    }

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
            if(workouts.length > WORKOUT_LOOP_LIMIT ) break;                
        }

        setcurrentQuarterIdx(currentQuarterIdx+1);

        return workouts;
    }

    //Adds Workout to Storage
    //Updates Workouts State
    async function addWorkout(workoutToAdd:Workout):Promise<[boolean,string?]> {
        const result:[boolean,string?] = await AddWorkoutToStorage(workoutToAdd,false);
        const added:boolean = result[0];
        if(added === true) {
            setWorkouts(sortWorkouts([...workouts,workoutToAdd]));
            loadQuarters();
        }
        return result;
    }

    //Loads Workouts from Storage
    //Func called from other Views such as lists when top is reached
    async function loadWorkouts() {
        //Checks if atleast 40 workouts have been initially loaded
        if(workouts.length < WORKOUT_LOOP_LIMIT) return;
        else{
            const workoutsTemp = workouts.slice();
            const loadedWorkouts = await LoadWorkoutsLoop(currentQuarterIdx);
            setWorkouts(workoutsTemp.concat(loadedWorkouts));
        }
    }

    
    
    //Saves Edited Workout
    const saveEditedWorkout = async (workout:Workout,originalWorkout:Workout,originalWorkoutDate:Date):Promise<[boolean,string?]>  => {
        
        const result = await editWorkoutToStorage(workout,originalWorkout,originalWorkoutDate);

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

    const deleteAllWorkouts = async () => {
        await clearWorkoutsFromStorage();
        setQuarters([]);
        setWorkouts([]);
    }

    
    return (
        <WorkoutContext.Provider
        value={{
            quarters,
            currentQuarterIdx,
            workouts,
            saveEditedWorkout,
            addWorkout,
            loadWorkouts,
            deleteWorkout,
            deleteAllWorkouts,
        }}
        >
        {props.children}
        </WorkoutContext.Provider>
    )
}
