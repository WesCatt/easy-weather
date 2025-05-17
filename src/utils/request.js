import axios from "axios";
import {getToken} from "@/utils/token";

const api = axios.create({
    baseURL: "https://n76hewbadk.re.qweatherapi.com",
});
api.interceptors.request.use(async config => {
    const token = await getToken();
    config.headers.Authorization = `Bearer ${token}`
    return config;
}, error => {
    return Promise.reject(error);
});


api.interceptors.response.use(response => {

    return response;
}, error => {

    return Promise.reject(error);
})

export default api;