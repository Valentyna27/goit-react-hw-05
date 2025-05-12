import {
  Link,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { fetchMovieDetails } from '../tmdb-api';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const goBackBtnRef = useRef(location.state?.from || '/movies');

  useEffect(() => {
    async function getMovie() {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovieDetails(data);
      } catch (error) {
        console.error(error);
      }
    }

    getMovie();
  }, [movieId]);

  if (!movieDetails) return <p>Loading...</p>;

  return (
    <>
      <button
        type="button"
        className="goBackBtn"
        onClick={() => navigate(goBackBtnRef.current)}
      >
        Go back
      </button>

      <div className="movieDetailsContainer">
        <img
          className="moviePoster"
          src={
            movieDetails.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
              : '/placeholder.jpg'
          }
          alt={movieDetails.title}
        />

        <div className="movieInfo">
          <h1>{movieDetails.title}</h1>
          <p>
            <strong>Overview:</strong>
            {movieDetails.overview || 'No overview available.'}
          </p>
          <p>
            <strong>Release date:</strong> {movieDetails.release_date || ''}
          </p>
          <p>
            <strong>Rating:</strong> {movieDetails.vote_average} / 10
          </p>

          <ul className="detailsLinks">
            <li>
              <Link
                to={`/movies/${movieId}/cast`}
                state={{ from: goBackBtnRef.current }}
              >
                Cast
              </Link>
            </li>
            <li>
              <Link
                to={`/movies/${movieId}/reviews`}
                state={{ from: goBackBtnRef.current }}
              >
                Reviews
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
}
