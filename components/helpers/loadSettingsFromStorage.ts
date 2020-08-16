import AsyncStorage from "@react-native-community/async-storage"
import { Settings } from "react-native"
import GlobalSettings from "../models/GlobalSettings"


const loadSettingsFromStorage = async (): Promise<GlobalSettings | null> => {
    const settingsString:string | null = await AsyncStorage.getItem("global_settings");
    if(settingsString !== null ){

        const settingsObj = JSON.parse(settingsString)
        return settingsObj.globalSettings
    }
    else return null
}

export default loadSettingsFromStorage

