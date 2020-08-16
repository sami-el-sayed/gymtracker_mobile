import AsyncStorage from "@react-native-community/async-storage"
import GlobalSettings from "../models/GlobalSettings"


const saveSettingsToStorage = async (settingsToSave:GlobalSettings):Promise<[boolean,string?]> => {
    const settingsObj ={
        globalSettings:settingsToSave
    }
    try {
        await AsyncStorage.setItem('global_settings', JSON.stringify(settingsObj))
        return [true]
    } 
    catch (e) {
        return [false,`An Error Occured: ${e}`]
    }
 
}

export default saveSettingsToStorage

