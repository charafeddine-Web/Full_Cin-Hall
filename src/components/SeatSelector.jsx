import { useState, useEffect } from 'react';

export default function SeatSelector({ seats, onSeatSelect }) {
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        onSeatSelect(selectedSeats); 
    }, [selectedSeats, onSeatSelect]);

    const handleSeatClick = (seat) => {
        if (seat.status === 'available') {
            setSelectedSeats((prev) =>
                prev.includes(seat.id) ? prev.filter((id) => id !== seat.id) : [...prev, seat.id]
            );
        }
    };

    return (
        <div className="seat-selector grid grid-cols-8 gap-2">
            {seats.map((seat) => (
                <div
                    key={seat.id}
                    className={`seat p-4 border text-center rounded-lg cursor-pointer ${
                        seat.status === 'available'
                            ? 'bg-green-200 hover:bg-green-300'
                            : seat.status === 'reserved'
                                ? 'bg-gray-300'
                                : 'bg-red-300'
                    } ${selectedSeats.includes(seat.id) ? 'border-blue-500' : ''}`}
                    onClick={() => handleSeatClick(seat)}
                >
                    {seat.label}
                </div>
            ))}
        </div>
    );
}
