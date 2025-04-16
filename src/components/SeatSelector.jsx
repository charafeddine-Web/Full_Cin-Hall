import { useState, useEffect } from 'react';

export default function SeatSelector({ seats, onSeatSelect }) {
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        onSeatSelect(selectedSeats); 
    }, [selectedSeats, onSeatSelect]);

    const handleSeatClick = (seat) => {
        if (seat.reserve === false) {
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
                        seat.reserve === false ? 'bg-green-500 hover:bg-green-700': seat.reserve === true
                                ? 'bg-red-500'
                                : 'bg-gray-500'
                    } ${selectedSeats.includes(seat.id) ? 'border-2 border-blue-500 ' : ''}`}
                    onClick={() => handleSeatClick(seat)}
                >
                    {seat.label}
                </div>
            ))}
        </div>
    );
}
