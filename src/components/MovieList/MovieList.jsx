import './MovieList.modules.css';
import { useNavigate } from 'react-router-dom';

export default function MovieList({ movies }) {
  const navigate = useNavigate();

  const handleMovieClick = id => {
    navigate(`/movies/${id}`, {
      state: { from: '/movies' },
    });
  };

  return (
    <div>
      <ul className="moviesList">
        {movies.map(({ id, poster_path, title }) => (
          <li
            key={id}
            className="moviesItem"
            onClick={() => handleMovieClick(id)}
          >
            <img
              className="moviesImg"
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              width={120}
              alt={title}
            />
            <p className="moviesCaption">{title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
