import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getProfile, updateProfile } from '../services/auth';
import { useNavigate, Link } from 'react-router-dom';
// Mock service - replace with your actual reservation service
import { getUserReservations, cancelReservation } from '../services/reservationService';

export default function Profile() {
    const { user, setUser, token } = useContext(AuthContext);
    const [name, setName] = useState(user ? user.name : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const [reservations, setReservations] = useState([]);
    const [reservationsLoading, setReservationsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    useEffect(() => {
        if (!user && token) {
            getProfile(token)
                .then((data) => {
                    setUser(data);
                    setName(data.name);
                    setEmail(data.email);
                })
                .catch((err) => setError('Failed to fetch user data.'));
        }
    }, [user, token, setUser]);

    useEffect(() => {
        if (activeTab === 'reservations' && token) {
            setReservationsLoading(true);
            getUserReservations(token)
                .then(data => {
                    setReservations(data);
                    setReservationsLoading(false);
                })
                .catch(err => {
                    setError('Failed to load reservations');
                    setReservationsLoading(false);
                });
        }
    }, [activeTab, token]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updatedUser = await updateProfile({ name, email }, token);
            setUser(updatedUser);
            
            setLoading(false);
            // Use a more modern notification instead of alert
            setSuccessMessage('Profile updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError('Failed to update profile');
            setLoading(false);
        }
    };

    const [successMessage, setSuccessMessage] = useState('');

    const handleCancelReservation = async (reservationId) => {
        if (window.confirm('Are you sure you want to cancel this reservation?')) {
            try {
                await cancelReservation(reservationId, token);
                setReservations(reservations.filter(res => res.id !== reservationId));
                setSuccessMessage('Reservation cancelled successfully');
                setTimeout(() => setSuccessMessage(''), 3000);
            } catch (err) {
                setError('Failed to cancel reservation');
                setTimeout(() => setError(''), 3000);
            }
        }
    };

    const downloadTicket = (reservationId) => {
        console.log(`Downloading ticket for reservation ${reservationId}`);
        setSuccessMessage('Ticket downloaded successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    const getReservationStatus = (reservation) => {
        const screeningDate = new Date(reservation.screening_date);
        const now = new Date();
        
        if (screeningDate < now) {
            return { label: 'Passée', color: 'bg-gray-500' };
        } else if (reservation.cancelled) {
            return { label: 'Annulée', color: 'bg-red-500' };
        } else {
            return { label: 'À venir', color: 'bg-green-500' };
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 mt-14">
            {/* Top profile banner */}
            <div className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6">
                        <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center text-indigo-700 text-4xl font-bold shadow-lg">
                            {user?.name?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold">{user?.name || 'Loading...'}</h1>
                            <p className="text-indigo-200">{user?.email || ''}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Main content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Success message */}
                {successMessage && (
                    <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md animate-fade-in-down">
                        <p>{successMessage}</p>
                    </div>
                )}

                {/* Error message */}
                {error && (
                    <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
                        <p>{error}</p>
                    </div>
                )}

                {/* Tabs */}
                <div className="mb-6 border-b border-gray-200">
                    <nav className="-mb-px flex space-x-6 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`pb-4 px-1 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                                activeTab === 'profile'
                                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Profil
                        </button>
                        <button
                            onClick={() => setActiveTab('reservations')}
                            className={`pb-4 px-1 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                                activeTab === 'reservations'
                                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                            Mes réservations
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`pb-4 px-1 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                                activeTab === 'settings'
                                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Paramètres
                        </button>
                    </nav>
                </div>

                {/* Profile Tab Content */}
                {activeTab === 'profile' && (
                    <div className="bg-white shadow-md rounded-lg p-6 md:p-8 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Informations personnelles</h2>
                        <form onSubmit={handleUpdate} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`px-6 py-3 rounded-md font-medium transition-all ${
                                        loading
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg'
                                    }`}
                                >
                                    {loading ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Mise à jour...
                                        </span>
                                    ) : (
                                        'Mettre à jour le profil'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Reservations Tab Content */}
                {activeTab === 'reservations' && (
                    <div className="animate-fade-in">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Mes réservations</h2>
                            <Link 
                                to="/films" 
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Réserver un film
                            </Link>
                        </div>

                        {reservationsLoading ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                            </div>
                        ) : reservations.length === 0 ? (
                            <div className="bg-white shadow-md rounded-lg p-12 text-center">
                                <div className="inline-block p-6 rounded-full bg-gray-100 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-medium text-gray-700 mb-2">Aucune réservation</h3>
                                <p className="text-gray-500 mb-6">Vous n'avez pas encore de réservations.</p>
                                <Link 
                                    to="/films" 
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors inline-block"
                                >
                                    Découvrir les films
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {reservations.map((reservation) => {
                                    const status = getReservationStatus(reservation);
                                    const isPast = status.label === 'Passée';
                                    const isCancelled = reservation.cancelled;
                                    
                                    return (
                                        <div key={reservation.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                                            <div className="md:flex">
                                                {/* Movie poster */}
                                                <div className="md:flex-shrink-0">
                                                    <img 
                                                        className="h-48 w-full object-cover md:w-48" 
                                                        src={reservation.film?.image_url || "/api/placeholder/192/288"} 
                                                        alt={reservation.film?.title} 
                                                    />
                                                </div>
                                                
                                                {/* Reservation details */}
                                                <div className="p-6 flex-grow">
                                                    {/* Status badge */}
                                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-3 ${status.color}`}>
                                                        {status.label}
                                                    </span>
                                                    
                                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{reservation.film?.title}</h3>
                                                    
                                                    <div className="mb-4 space-y-2 text-sm text-gray-600">
                                                        <p className="flex items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                            {formatDate(reservation.screening_date)}
                                                        </p>
                                                        <p className="flex items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                                            </svg>
                                                            Salle {reservation.room_number || 1}
                                                        </p>
                                                        <p className="flex items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                                            </svg>
                                                            {reservation.seats} {reservation.seats > 1 ? 'places' : 'place'}
                                                        </p>
                                                    </div>
                                                    
                                                    {/* Price */}
                                                    <div className="text-lg font-bold text-indigo-600 mb-4">
                                                        {(reservation.price || 9.90) * reservation.seats}€
                                                    </div>
                                                </div>
                                                
                                                {/* Actions */}
                                                <div className="p-6 bg-gray-50 flex flex-col justify-center space-y-3 md:w-64">
                                                    <button
                                                        onClick={() => downloadTicket(reservation.id)}
                                                        className="flex items-center justify-center px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors w-full"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                        </svg>
                                                        Télécharger le billet
                                                    </button>
                                                    
                                                    {!isPast && !isCancelled && (
                                                        <>
                                                            <Link 
                                                                to={`/reservations/${reservation.id}/edit`}
                                                                className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors w-full"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>
                                                                Modifier
                                                            </Link>
                                                            
                                                            <button 
                                                                onClick={() => handleCancelReservation(reservation.id)}
                                                                className="flex items-center justify-center px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors w-full"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                                Annuler
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* Settings Tab Content */}
                {activeTab === 'settings' && (
                    <div className="bg-white shadow-md rounded-lg p-6 md:p-8 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Paramètres du compte</h2>
                        
                        <div className="space-y-6">
                            {/* Notification Preferences */}
                            <div className="pb-6 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-800 mb-4">Préférences de notification</h3>
                                
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-700">Emails promotionnels</p>
                                            <p className="text-sm text-gray-500">Recevez des offres spéciales et des réductions</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-700">Notifications de réservation</p>
                                            <p className="text-sm text-gray-500">Recevez des rappels pour vos séances</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Password Change */}
                            <div className="pb-6 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-800 mb-4">Changer le mot de passe</h3>
                                
                                <form className="space-y-4">
                                    <div>
                                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe actuel</label>
                                        <input
                                            type="password"
                                            id="current-password"
                                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                                        <input
                                            type="password"
                                            id="new-password"
                                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirmer le nouveau mot de passe</label>
                                        <input
                                            type="password"
                                            id="confirm-password"
                                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        />
                                    </div>
                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition-colors"
                                        >
                                            Mettre à jour le mot de passe
                                        </button>
                                    </div>
                                </form>
                            </div>
                            
                            {/* Danger Zone */}
                            <div>
                            <h3 className="text-lg font-medium text-red-500 mb-4">Zone dangereuse</h3>
                                
                                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                                    <h4 className="font-medium text-red-700 mb-2">Supprimer mon compte</h4>
                                    <p className="text-sm text-red-600 mb-4">
                                        Attention : cette action est irréversible et supprimera toutes vos données, y compris votre historique de réservations.
                                    </p>
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-white border border-red-500 text-red-500 rounded-md hover:bg-red-50 font-medium transition-colors"
                                        onClick={() => {
                                            if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement votre compte ?")) {
                                                // Handle account deletion
                                                alert("Cette fonctionnalité n'est pas encore implémentée");
                                            }
                                        }}
                                    >
                                        Supprimer mon compte
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}