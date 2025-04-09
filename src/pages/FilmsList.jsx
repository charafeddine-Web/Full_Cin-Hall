import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchFilms } from '../services/filmService';
import FilmCard from '../components/FilmCard';

export default function FilmsList() {
    const [films, setFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');
    
    // Mock categories - in a real app, these would come from your API
    // const categories = ['all', 'action', 'comedy', 'drama', 'sci-fi'];
    
    useEffect(() => {
        setIsLoading(true);
        fetchFilms()
            .then(data => {
                setFilms(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching films:', error);
                setIsLoading(false);
            });
    }, []);
    
    // This would be replaced with actual filtering logic
    const filteredFilms = activeFilter === 'all' 
        ? films 
        : films.filter(film => film.genre?.toLowerCase() === activeFilter);
        
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <motion.div 
                className="mb-12 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                    Découvrez les films à l'affiche
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    Explorez notre sélection de films et réservez vos places pour une expérience cinématographique inoubliable.
                </p>
            </motion.div>
            
            {/* Filter tabs */}
            {/* <div className="flex overflow-x-auto pb-2 mb-8 justify-center">
                <div className="flex space-x-2 p-1 bg-gray-100 rounded-lg">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveFilter(category)}
                            className={`px-4 py-2 rounded-md transition-all whitespace-nowrap ${
                                activeFilter === category
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>
            </div> */}
            
            {/* Loading state */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
                </div>
            ) : (
                /* Films grid */
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    initial="hidden"
                    animate="show"
                >
                    {filteredFilms.length > 0 ? (
                        filteredFilms.map(film => (
                            <motion.div
                                key={film.id}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0 }
                                }}
                            >
                                <FilmCard film={film} />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-16">
                            <p className="text-gray-500 text-lg">Aucun film trouvé pour cette catégorie.</p>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
}