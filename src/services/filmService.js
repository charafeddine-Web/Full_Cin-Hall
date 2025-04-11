import axios from 'axios';
import api from './api';


export const fetchFilms = async () => {
    try {
        const token = localStorage.getItem('token');
        // console.log('JWT Token:', token);
        
        const response = await api.get('/films', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Détails de l\'erreur:', {
            status: error.response?.status,
            data: error.response?.data,
            headers: error.response?.headers
        });
        throw error;
    }
};

export const fetchSeancesByFilm = async (filmId) => {
    try {
        const res = await api.get(`/seances?film_id=${filmId}`);
        return res.data;
    } catch (error) {
        console.error(`Erreur lors du chargement des séances du film ${filmId}`, error);
        throw error;
    }
};


export const fetchSeancesByType = async (type) => {
    try {
        const res = await api.get(`/seances/${type}`);
        return res.data;
    } catch (error) {
        console.error(`Error fetching seances for type ${type}:`, error);
        throw error;
    }
};

export const getFilmById = async (filmId) => {
    try {
        const res = await api.get(`/films/${filmId}`);
        return res.data;
    } catch (error) {
        console.error(`Error fetching film with ID ${filmId}:`, error);
        throw error;
    }
};
