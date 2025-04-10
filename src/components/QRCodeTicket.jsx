import { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';

export default function QRCodeTicket({ reservationId }) {
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        if (reservationId) {
            fetchTicket(reservationId);
        }
    }, [reservationId]);

    const fetchTicket = async (id) => {
        try {
            const response = await fetch(`/api/generate-ticket/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Ticket generation failed');
            }

            const blob = await response.blob();
            const ticketUrl = URL.createObjectURL(blob);
            setTicket(ticketUrl); // Crée une URL pour le fichier du ticket
        } catch (error) {
            console.error('Error generating ticket:', error);
        }
    };

    return (
        <div className="ticket-container p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto text-center">
            <h2 className="text-xl font-bold mb-4">Votre Billet</h2>
            {ticket ? (
                <>
                    <p className="mb-4">Voici votre billet pour la réservation {reservationId}.</p>
                    <div className="qr-code mb-4">
                        <QRCode value={ticket} size={256} />
                    </div>
                    <a
                        href={ticket}
                        download={`ticket-${reservationId}.pdf`}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Télécharger le billet
                    </a>
                </>
            ) : (
                <p>Chargement de votre billet...</p>
            )}
        </div>
    );
}
