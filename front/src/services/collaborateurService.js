import axios from '../api/axiosConfig';


const API_URL = 'http://localhost:8080/api/collaborateurs';

export const getCollaborateurs = () => axios.get(API_URL);
export const getCollaborateurById = (id) => axios.get(`${API_URL}/${id}`);
export const createCollaborateur = (data) => axios.post(API_URL, data);
export const updateCollaborateur = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteCollaborateur = (id) => axios.delete(`${API_URL}/${id}`);
