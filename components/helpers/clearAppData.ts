import AsyncStorage from "@react-native-community/async-storage";

const clearAppData = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        console.error('Error clearing app data.');
    }
}

export default clearAppData
