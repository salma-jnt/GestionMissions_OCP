import axios from '../api/axiosConfig';

const API_URL = 'http://localhost:8080/api/missions';

export const getMissions = () => axios.get(API_URL);
export const getMissionById = (id) => axios.get(`${API_URL}/${id}`);
export const createMission = (data) => axios.post(API_URL, data);
export const updateMission = (id, mission) => axios.put(`${API_URL}/${id}`, mission);
export const deleteMission = (id) => axios.delete(`${API_URL}/${id}`);

// ✅ Nouvel endpoint d'affectation (à utiliser depuis la modale d’affectation)
export const affecterMission = (id, payload) =>
    axios.put(`${API_URL}/${id}/affectation`, payload);

// Optionnel si exposé côté backend
export const getRecentMissions = () => axios.get(`${API_URL}/recentes`);
