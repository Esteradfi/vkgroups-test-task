import axios, {AxiosInstance} from "axios";

const API_URL: string = 'https://vktest.free.beeceptor.com';

const $api: AxiosInstance = axios.create({
    baseURL: API_URL,
});

export default $api;
