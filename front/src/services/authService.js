// src/services/authService.js
import axios from '../api/axiosConfig';
import { jwtDecode } from 'jwt-decode';
 // <-- correct import

const API_URL = '/api/auth'; // <- utilise baseURL de axiosConfig (http://localhost:8080)

export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    const { token, role } = response.data || {};
    if (token) {
    localStorage.setItem('token', token);
    if (role) localStorage.setItem('role', role);
    }
    return { token, role };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
};

export const getToken = () => localStorage.getItem('token') || null;
export const getRole = () => localStorage.getItem('role') || null;

export const isAuthenticated = () => {
    const token = getToken();
    return token && !isTokenExpired(token);
};

export const isTokenExpired = (token) => {
    try {
    const decoded = jwtDecode(token);
    // decoded.exp is seconds
    return decoded.exp * 1000 < Date.now();
    } catch (e) {
    return true;
    }
};
 