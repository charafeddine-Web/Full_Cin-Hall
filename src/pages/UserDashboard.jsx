import React, { useEffect, useState } from 'react';
import { getUserReservations, cancelReservation } from '../services/reservationService';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        getUserReservations().then(setReservations);
    }, []);

    const handleCancel = async (id) => {
        await cancelReservation(id);
        setReservations(reservations.filter(r => r.id !== id));
    };

    return (
        <div className="p-4">
            <h2 className="text-xl mb-4">Mes réservations</h2>
            {reservations.map(res => (
                <div key={res.id} className="border p-2 mb-2">
                    <p>Film: {res.filmTitle} - {res.date}</p>
                    <p>Places: {res.seats.join(', ')}</p>
                    <a href={`/api/generate-ticket/${res.id}`} className="text-green-600 mr-4">Télécharger ticket</a>
                    <button onClick={() => handleCancel(res.id)} className="text-red-600">Annuler</button>
                </div>
            ))}
        </div>
    );
}
