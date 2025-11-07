import axios from '../api/axiosConfig';

export const getMissions = () => axios.get('/api/missions');
export const getMissionById = (id) => axios.get(`/api/missions/${id}`);
export const createMission = (mission) => axios.post('/api/missions', mission);
export const updateMission = (id, mission) => axios.put(`/api/missions/${id}`, mission);
export const deleteMission = (id) => axios.delete(`/api/missions/${id}`);
// 🔹 Affecter une mission à un collaborateur
export const affecterMission = (missionId, collaborateurId) => {
    return axios.put(`/api/missions/${missionId}/affecter/${collaborateurId}`);
};
