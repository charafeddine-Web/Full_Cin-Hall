import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSeatsBySeance, reserveSeats } from '../services/reservationService';
import SeatSelector from '../components/SeatSelector';

export default function SeatReservation() {
    const { seanceId } = useParams();
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getSeatsBySeance(seanceId)
            .then(fetchedSeats => {
                console.log('Fetched seats:', fetchedSeats);
                setSeats(fetchedSeats);
            })
            .catch(err => {
                console.error(err); 
                setError('Erreur lors du chargement des sièges.');
            })
            .finally(() => setLoading(false));
    }, [seanceId]);

    const handleReserve = async () => {

        setError('');

        if (selectedSeats.length === 0) {
            setError('Veuillez sélectionner au moins une place.');
            return;
        }

        setLoading(true);
        try {
            const data = {
                seance_id: seanceId,
                seat_ids: selectedSeats,
            };
            console.log('Data envoyé pour réservation:', data);

            const reservation = await reserveSeats(data);
            console.log('Reservation created:', reservation);
            console.log('Navigation vers la page paiement...');
            navigate(`/payment/${reservation.id}`);
        } catch (err) {
            console.error(err);
            setError('Erreur lors de la réservation des places.');
        } finally {
            setLoading(false);
        }

        console.log('Réservation démarrée...');

    };

    return (
        <div className="p-4 mt-14">
            <h2 className="text-xl font-semibold mb-4">Choisissez vos places</h2>
            
            {error && <div className="text-red-600 mb-4">{error}</div>}

            {loading ? (
                <div>Chargement...</div>
            ) : (
                <SeatSelector 
                    seats={seats} 
                    selected={selectedSeats} 
                    onSeatSelect={setSelectedSeats} 
                />
            )}

            <button 
                onClick={handleReserve} 
                className={`mt-4 px-4 py-2 rounded text-white ${loading || selectedSeats.length === 0 ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
                disabled={loading || selectedSeats.length === 0}
            >
                {loading ? 'Réservation en cours...' : 'Confirmer la réservation'}
            </button>
        </div>
    );
}
