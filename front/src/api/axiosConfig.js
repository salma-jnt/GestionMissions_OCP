import axios from 'axios';
import { getToken, isTokenExpired, logout } from '../services/authService';

const instance = axios.create();

instance.interceptors.request.use(
    (config) => {
        const token = getToken();

        if (token) {
            if (isTokenExpired(token)) {
                logout();
                window.location.href = '/login';
                return Promise.reject('Token expiré');
            }

            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default instance;
