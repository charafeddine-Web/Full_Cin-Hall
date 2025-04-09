import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFilmById, fetchSeancesByFilm } from '../services/filmService';
import { Link } from 'react-router-dom';

export default function FilmDetail() {
    const { id } = useParams();
    const [film, setFilm] = useState(null);
    const [seances, setSeances] = useState([]);

    useEffect(() => {
        getFilmById(id).then(setFilm);
        fetchSeancesByFilm(id).then(setSeances);
    }, [id]);

    return film ? (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{film.title}</h1>
            <p className="mb-4">{film.description}</p>
            <iframe src={film.trailer_url} title="Bande annonce" className="w-full h-64 mb-4"></iframe>
            <h2 className="text-xl">Séances :</h2>
            <ul>
                {seances.map(seance => (
                    <li key={seance.id}>
                        {seance.date} - {seance.type}
                        <Link to={`/reservation/${seance.id}`} className="text-blue-600 ml-2">Réserver</Link>
                    </li>
                ))}
            </ul>
        </div>
    ) : <p>Chargement...</p>;
}
