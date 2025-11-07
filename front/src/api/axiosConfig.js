import axios from 'axios';
import { getToken } from '../services/authService'; // Pour récupérer le token depuis localStorage

// Configuration de base
const instance = axios.create({
    baseURL: 'http://localhost:8080', // URL de votre back-end Spring Boot
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur pour ajouter le token JWT automatiquement à chaque requête
instance.interceptors.request.use(
    (config) => {
        const token = getToken(); // Récupère le token depuis localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Intercepteur pour gérer les erreurs (ex. : 403 Forbidden)
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 403) {
            console.error('Accès refusé : Vérifiez votre authentification ou rôle.');
            // Optionnel : Vous pouvez ajouter une redirection vers /login ici
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default instance;