
import api from './api';

export const reserveSeats = async (data) => {
    const res = await api.post('/reservations', data).then(res => res.data);

};

export const confirmReservation = async (id) => {
    const res = await api.post(`/reservations/${id}/confirm`);
    return res.data;
};

export const cancelReservation = async (id) => {
    const res = await api.post(`/cancel`, { id });
    return res.data;
};

export const getUserReservations = async () => {
    const res = await api.get('/reservations');
    return res.data;
};



// Récupérer les sièges disponibles pour une séance donnée
export const getSeatsBySeance = async (seanceId) => {
    const res = await api.get(`/seances/${seanceId}/sieges`);
    return res.data;
};
