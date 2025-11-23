import axios from '../api/axiosConfig';

const API_URL = 'http://localhost:8080/api/auth';

export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    const { token, role } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    return { token, role };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
};

export const getToken = () => localStorage.getItem('token');
export const getRole = () => localStorage.getItem('role');
export const isAuthenticated = () => !!getToken();
