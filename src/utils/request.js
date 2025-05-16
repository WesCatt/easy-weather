import axios from "axios";
import {getToken} from "@/utils/token";

const api = axios.create({
    baseURL: "https://n76hewbadk.re.qweatherapi.com",
});


api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${getToken()}`
    return config;
}, error => {
    return Promise.reject(error);
});


api.interceptors.response.use(response => {

}, error => {

    return Promise.reject(error);
})

export default api;