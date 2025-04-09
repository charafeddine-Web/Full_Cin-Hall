import api from './api';

export const simulatePayment = async (paymentData) => {
    const res = await api.post('/payment', paymentData);
    return res.data;
};

export const generateTicket = async (reservationId) => {
    const res = await api.get(`/generate-ticket/${reservationId}`, {
        responseType: 'blob', // Pour téléchargement PDF
    });
    return res;
};

export const confirmPayment = async (reservationId) => {
    const res = await api.post(`/payments/${reservationId}/confirm`);
    return res.data;
};