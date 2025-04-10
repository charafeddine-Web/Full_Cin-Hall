import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchFilms } from '../services/filmService';
import FilmCard from '../components/FilmCard';

export default function FilmsList() {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

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

  const filteredFilms =
    activeFilter === 'all'
      ? films
      : films.filter(film => film.genre?.toLowerCase() === activeFilter);

  const filters = ['all'];

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-20 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-red-600 mb-4">
          Découvrez les films à l'affiche
        </h1>
        <p className="text-lg text-gray-300">
          Explorez notre sélection de films et réservez vos places pour une expérience cinématographique inoubliable.
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full transition-colors duration-300 text-sm font-semibold ${
              activeFilter === filter
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 hover:bg-red-500'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center items-center mt-20">
          <div className="text-red-600 animate-pulse text-xl">Chargement des films...</div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredFilms.length > 0 ? (
            filteredFilms.map(film => (
              <motion.div
                key={film.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <FilmCard film={film} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400">
              Aucun film trouvé pour cette catégorie.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
