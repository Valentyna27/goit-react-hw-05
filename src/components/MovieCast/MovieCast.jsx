import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from './../../tmdb-api';
import './MovieCast.modules.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function getCast() {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (error) {
        console.error(error);
      }
    }

    getCast();
  }, [movieId]);

  if (!cast.length) return <p className="message">No cast info.</p>;

  return (
    <ul className="castList">
      {cast.slice(0, 7).map(({ id, name, character, profile_path }) => (
        <li key={id} className="castItem">
          <img
            className="castImage"
            src={`https://image.tmdb.org/t/p/w200${profile_path}`}
            alt={name}
          />
          <div className="castInfo">
            <p className="name">{name}</p>
            <p className="character">as {character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
