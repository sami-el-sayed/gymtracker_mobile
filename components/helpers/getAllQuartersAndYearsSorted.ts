import AsyncStorage from "@react-native-community/async-storage"
import getAllKeys from "./getAllKeys"
import sortQuarters from "./sortQuarters";


const getAllQuartersAndYearsSorted = async ():Promise<string[]> => {
    const keys = await getAllKeys();
    const quartersNotSorted:string[] = keys.filter((key)=>key.charAt(0) === "q");
    if(quartersNotSorted.length === 0 ) {
        return []
    }
    else return sortQuarters(quartersNotSorted);

}

export default getAllQuartersAndYearsSorted

