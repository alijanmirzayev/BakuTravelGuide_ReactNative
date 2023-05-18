import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUserTheme = async (theme:any) => {
    try {
        await AsyncStorage.setItem("userTheme", JSON.stringify(theme));
        return theme;
    } catch (error) {
        console.log(error);
    }
}

export const getUserTheme = async () => {
    try {
        const userTheme = await AsyncStorage.getItem("userTheme");
        if (userTheme !== null) {
            return JSON.parse(userTheme);
        }
        else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}