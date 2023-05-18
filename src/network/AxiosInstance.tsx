import axios from 'axios'

export const AxiosInstance = axios.create({
    baseURL: 'https://645d126f250a246ae316dd11.mockapi.io',
    timeout: 2000
})