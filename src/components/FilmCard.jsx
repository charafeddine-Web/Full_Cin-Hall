import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types'; // Add prop type validation

// Default gradient fallback
const defaultGradient = 'from-gray-500 to-gray-600';

export default function FilmCard({ film = {} }) {
    const [isHovered, setIsHovered] = useState(false);
    
    const getGradientBytitre = (titre) => {
        if (!titre) return defaultGradient;
        
        try {
            const firstChar = titre.charCodeAt(0) % 5;
            const gradients = [
                'from-purple-500 to-indigo-600',
                'from-pink-500 to-rose-600',
                'from-cyan-500 to-blue-600',
                'from-amber-500 to-orange-600',
                'from-emerald-500 to-teal-600'
            ];
            return gradients[firstChar] || defaultGradient;
        } catch {
            return defaultGradient;
        }
    };
    
    // Safely destructure with defaults
    const { 
        titre = 'Untitred Film',
        image = '/api/placeholder/400/600',
        genre = 'Drama',
        description = '',
        id = ''
    } = film;

    return (
        <motion.div 
            className="relative rounded-xl overflow-hidden shadow-lg h-96 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10"></div>
            
            {/* Film poster */}
            <div className="h-full w-full">
                <img
                    src={image}
                    alt={titre}
                    className="w-full h-full object-cover transition-all duration-500"
                    style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
                />
            </div>
            
            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform duration-300"
                style={{ transform: isHovered ? 'translateY(0)' : 'translateY(20%)' }}>
                
                {/* Badge for genre/category */}
                <div className={`inline-block px-3 py-1 mb-3 text-xs font-medium text-white rounded-full bg-gradient-to-r ${getGradientBytitre(titre)}`}>
                    {genre}
                </div>
                
                {/* titre */}
                <h3 className="text-2xl font-bold text-white mb-2">{titre}</h3>
                
                {/* Description */}
                <motion.p 
                    className="text-gray-200 text-sm mb-4 line-clamp-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {description.slice(0, 100)}...
                </motion.p>
                
                {/* Action button */}
                <Link
                    to={`/films/${id}`}
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-white text-indigo-600 font-medium transition-all hover:bg-indigo-100"
                >
                    <span>Voir les séances</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </motion.div>
    );
}

// Add prop validation
FilmCard.propTypes = {
    film: PropTypes.shape({
        id: PropTypes.string,
        titre: PropTypes.string,
        image_url: PropTypes.string,
        genre: PropTypes.string,
        description: PropTypes.string
    })
};