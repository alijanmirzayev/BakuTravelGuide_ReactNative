import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUserLanguage = async (language:any) => {
    try {
        await AsyncStorage.setItem("userLanguage", JSON.stringify(language));
        return language;
    } catch (error) {
        console.log(error);
    }
}

export const getUserLanguage = async () => {
    try {
        const userLanguage = await AsyncStorage.getItem("userLanguage");
        if (userLanguage !== null) {
            return JSON.parse(userLanguage);
        }
        else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}