import { AxiosInstance } from "./AxiosInstance";

export class baseNetwork {

    async getAllCategory() {

        try {
            const allData = await AxiosInstance.get('/Category')
            return allData.data

        } catch (error) {
            console.log(error)
        }
    }

    async getAllRestaurant() {

        try {
            const allData = await AxiosInstance.get('/restaurant')
            return allData.data

        } catch (error) {
            console.log(error)
        }
    }
}