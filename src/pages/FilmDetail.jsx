import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFilmById, fetchSeancesByFilm } from '../services/filmService';

export default function FilmDetail() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [seances, setSeances] = useState([]);

  useEffect(() => {
    getFilmById(id).then(setFilm);
    fetchSeancesByFilm(id).then(setSeances);
  }, [id]);

  if (!film) return <p className="text-center text-red-500 mt-20">Chargement...</p>;

  return (
    <div className="p-6 mt-12 max-w-full mx-auto text-white bg-black min-h-screen">
      {/* Titre */}
      <h1 className="text-3xl font-bold mb-2 text-red-500">{film.titre}</h1>

      {/* Description */}
      <p className="mb-4 text-gray-300">{film.description}</p>

      {film.trailer_url && (
        <iframe
          src={film.trailer_url}
          title="Bande annonce"
          className="w-full h-64 mb-6 rounded-lg border-2 border-red-500"
          allowFullScreen
        ></iframe>
      )}

      {/* Séances */}
      <h2 className="text-2xl font-semibold mb-4 text-red-400">Séances disponibles :</h2>
      <ul className="space-y-4">
        {seances.length > 0 ? (
          seances.map(seance => (
            <li
              key={seance.id}
              className="flex items-center justify-between bg-zinc-900 p-4 rounded-xl shadow hover:bg-zinc-800 transition"
            >
              <div>
                <p className="text-lg font-medium">{seance.start_time}</p>
                <p className="text-lg font-medium">{seance.langue}</p>
                <p className="text-lg font-medium">{seance.session}</p>
                <p className="text-sm text-gray-400">{seance.type_seance}</p>
              </div>
              <Link
                to={`/reserve/${seance.id}`}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold transition"
              >
                Réserver
              </Link>
            </li>
          ))
        ) : (
          <p className="text-gray-400">Aucune séance trouvée.</p>
        )}
      </ul>
    </div>
  );
}
