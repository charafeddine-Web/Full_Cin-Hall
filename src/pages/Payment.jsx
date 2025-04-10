import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { confirmPayment } from '../services/paymentService';

export default function Payment() {
    const { reservationId } = useParams();
    const navigate = useNavigate();

    const handlePayment = async () => {
        await confirmPayment(reservationId);
        navigate(`/dashboard`);
    };

    return (
        <div className="p-4 text-center">
            <h2 className="text-xl mb-4">Paiement</h2>
            <p className="mb-4">Cliquez ci-dessous pour simuler le paiement.</p>
            <button onClick={handlePayment} className="bg-blue-600 text-white px-4 py-2">Payer maintenant</button>
        </div>
    );
}
