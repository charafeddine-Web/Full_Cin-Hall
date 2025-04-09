import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSeatsBySeance, reserveSeats } from '../services/reservationService';
import SeatSelector from '../components/SeatSelector';

export default function SeatReservation() {
    const { seanceId } = useParams();
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getSeatsBySeance(seanceId).then(setSeats);
    }, [seanceId]);

    const handleReserve = async () => {
        const reservation = await reserveSeats(seanceId, selectedSeats);
        navigate(`/payment/${reservation.id}`);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl mb-4">Choisissez vos places</h2>
            <SeatSelector seats={seats} selected={selectedSeats} onChange={setSelectedSeats} />
            <button onClick={handleReserve} className="mt-4 bg-green-600 text-white px-4 py-2">Confirmer la réservation</button>
        </div>
    );
}