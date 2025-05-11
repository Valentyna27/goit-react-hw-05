import MovieList from '../components/MovieList/MovieList';
import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../tmdb-api';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(data => setMovies(data));
  }, []);

  return (
    <div>
      <h1 className="homePageTitle">Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
}
