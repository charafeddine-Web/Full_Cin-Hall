import api from './api';

export const login = async (credentials) => {
    try {
        const response = await api.post('/login', credentials);
        
        // Stockage du token JWT reçu du serveur
        if (response.data.access_token) {
            localStorage.setItem('token', response.data.token);
            // Mise à jour du header Authorization pour les requêtes suivantes
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
        }
        
        return response.data;
    } catch (error) {
        console.error('Login error:', {
            status: error.response?.status,
            data: error.response?.data,
            headers: error.response?.headers
        });
        
        if (error.response?.status === 401) {
            throw new Error('Email ou mot de passe incorrect');
        } else {
            throw new Error('Erreur de connexion au serveur');
        }
    }
};

export const register = async (data) => {
    if (!data.role) {
        data.role = 'spectateur';
    }
    
    try {
        const response = await api.post('/register', data);
        
        // Si le login automatique après inscription est souhaité
        if (response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
        }
        
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 
                           'Erreur lors de l\'inscription';
        console.error('Registration error:', errorMessage);
        throw new Error(errorMessage);
    }
};

export const getProfile = async () => {
    try {
        const response = await api.get('/profile');
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await api.post('/logout');
        // Nettoyage du token côté client
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        return response.data;
    } catch (error) {
        console.error('Logout error:', error);
        // Nettoyage quand même en cas d'erreur
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        throw error;
    }
};

export const updateProfile = async (data) => {
    try {
        const response = await api.put('/profile', data);
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        throw error;
    }
};