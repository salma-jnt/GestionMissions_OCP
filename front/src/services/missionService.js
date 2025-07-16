import axios from 'axios';

const API_URL = 'http://localhost:8080/api/missions';

export const getMissions = () => axios.get(API_URL);
export const getMissionById = (id) => axios.get(`${API_URL}/${id}`);
export const createMission = (data) => axios.post(API_URL, data);
export const updateMission = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteMission = (id) => axios.delete(`${API_URL}/${id}`);
