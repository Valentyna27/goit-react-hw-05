import './MovieList.modules.css';
import { Link, useLocation } from 'react-router-dom';

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <div>
      <ul className="moviesList">
        {movies.map(({ id, poster_path, title }) => (
          <li key={id} className="moviesItem">
            <Link
              to={`/movies/${id}`}
              state={{ from: location }}
              className="moviesLink"
            >
              <img
                className="moviesImg"
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                width={120}
                alt={title}
              />
              <p className="moviesCaption">{title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
