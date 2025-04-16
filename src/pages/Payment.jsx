import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { confirmPayment } from '../services/paymentService';

export default function Payment() {
    const { reservationId } = useParams();
    const navigate = useNavigate();
    
    // State to handle loading and errors
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePayment = async () => {
        setLoading(true);  // Show loading state
        setError(null);     // Reset error state
        try {
            await confirmPayment(reservationId);
            navigate(`/dashboard`);  // Redirect after payment success
        } catch (err) {
            setError('Une erreur s\'est produite lors du paiement. Veuillez réessayer.');
        } finally {
            setLoading(false);  // Hide loading state
        }
    };

    return (
        <div className="p-4 text-center">
            <h2 className="text-xl mb-4">Paiement</h2>
            <p className="mb-4">Cliquez ci-dessous pour simuler le paiement.</p>
            
            {error && <p className="text-red-600 mb-4">{error}</p>}  {/* Show error message */}
            
            <button
                onClick={handlePayment}
                className={`bg-blue-600 text-white px-4 py-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}  // Disable button while loading
            >
                {loading ? 'Traitement...' : 'Payer maintenant'}
            </button>
        </div>
    );
}
