import axios from 'axios';
import { API_ROUTES } from './routes';
// import { ASYNC_KEYS, getValueFromAsync } from '../config/async';

// Creating default axios client
export const axiosClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 10000,
    timeoutErrorMessage: `Request is timeout`,
    headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
    async function (config) {
        // Do something before request is sent
        config.headers['Accept-Language'] = 'de';

        if (
            config.url &&
            Object.values(API_ROUTES).some((route: any) =>
                config.url?.startsWith(route),
            )
        ) {
            // let token = await getValueFromAsync(ASYNC_KEYS.TOKEN);
            // config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        console.log(error);
        if (error.message === 'Network Error') {
            console.log('Please check your internet connection and try again.', 'error', 'Network error');
        }
        if (error.respons?.status === 401) {
            console.log('Session has expired. Please log in again.', 'error');
        } else if (error.response?.status === 404) {
            console.log('The resource you requested was not found.', 'error');
        } else if (error.response.data && error.response.data.message) {
            console.log(error.response.data.message, 'error');
        }

        return Promise.reject(error);
    },
);
