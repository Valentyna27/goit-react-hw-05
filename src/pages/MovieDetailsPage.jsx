import {
  Link,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../tmdb-api';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const goBackBtn = location.state?.from || '/movies';

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
        onClick={() => navigate(goBackBtn)}
      >
        Go back
      </button>

      <div className="movieDetailsContainer">
        <img
          className="moviePoster"
          src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
          alt={movieDetails.title}
        />

        <div className="movieInfo">
          <h1>{movieDetails.title}</h1>
          <p>
            <strong>Overview:</strong> {movieDetails.overview}
          </p>
          <p>
            <strong>Release date:</strong> {movieDetails.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movieDetails.vote_average} / 10
          </p>

          <ul className="detailsLinks">
            <li>
              <Link to={`/movies/${movieId}/cast`} state={{ from: goBackBtn }}>
                Cast
              </Link>
            </li>
            <li>
              <Link
                to={`/movies/${movieId}/reviews`}
                state={{ from: goBackBtn }}
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
