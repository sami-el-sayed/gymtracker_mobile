import React,{createContext, useState,useEffect} from "react"
import loadSettingsFromStorage from "../helpers/loadSettingsFromStorage"
import GlobalSettings from "../models/GlobalSettings"
import saveSettingsToStorage from "../helpers/saveSettingsToStorage"


interface ContextProps{
    showCollapsedWorkouts:boolean,
    switchShowCollapsedWorkouts:(show:boolean)=>void,
    switchUnits:(inKg:boolean) => void,

}

export const SettingsContext = createContext<Partial<ContextProps>>({})

export const SettingsProvider: React.FunctionComponent = (props) => {


    const [showCollapsedWorkouts,setShowCollapsedWorkouts] = useState<boolean>(false)


    //Initially loads quarters and exercises
    useEffect(()=>{
        intialLoad();
    },[])

    async function intialLoad(){
        const loadedSettings: GlobalSettings | null = await loadSettingsFromStorage();
        if(loadedSettings === null) return
        setShowCollapsedWorkouts(loadedSettings.showCollapsedWorkouts)
    }

    function switchShowCollapsedWorkouts(show:boolean) {
        setShowCollapsedWorkouts(show)
        const newSettings = new GlobalSettings(show);
        saveSettingsToStorage(newSettings);
    }
    
    const switchUnits = (inKg:boolean) =>{
        const newSettings = new GlobalSettings(showCollapsedWorkouts);
        saveSettingsToStorage(newSettings);
    } 

    
    return (
        <SettingsContext.Provider
        value={{
            showCollapsedWorkouts,
            switchShowCollapsedWorkouts,
            switchUnits
        }}
        >
        {props.children}
        </SettingsContext.Provider>
    )
}
