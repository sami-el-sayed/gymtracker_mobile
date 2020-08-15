import React,{createContext, useState,useEffect} from "react"

import LoadExercisesFromStorage from "../helpers/exercises/LoadExercisesFromStorage"
import AddExercisesToStorage from "../helpers/exercises/AddExerciseToStorage"
import checkIfExerciseExists from "../helpers/exercises/checkIfExerciseExists"
import removeExerciseFromStorage from "../helpers/exercises/removeExerciseFromStorage"


interface ContextProps{
    exercises:string[],
    addExercise:(exercise:string)=>Promise<[boolean,string?]>,
    deleteExecise:(exercise:string) => void,
}

export const ExerciseContext = createContext<Partial<ContextProps>>({})

export const ExerciseProvider: React.FunctionComponent = (props) => {


    const [exercises,setExercises] = useState<string[]>([])

    //Initially loads quarters and exercises
    useEffect(()=>{
        intialLoad();
    },[])

    async function intialLoad(){
        await loadExercises();
    }
    
    //Loads Exercises from Storage
    async function loadExercises(){
        const result:[string[],string?] = await LoadExercisesFromStorage();
        const exercises = result[0];
        setExercises(exercises)
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
        <ExerciseContext.Provider
        value={{
            exercises,
            addExercise,
            deleteExecise,
        }}
        >
        {props.children}
        </ExerciseContext.Provider>
    )
}
