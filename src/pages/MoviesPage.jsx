import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../components/MovieList/MovieList';
import { searchMovies } from '../tmdb-api';
import { IoSearch } from 'react-icons/io5';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (query.trim() === '') return;

    async function fetchMovies() {
      try {
        const data = await searchMovies(query);
        setMovies(data.results);
      } catch (error) {
        console.error(error);
        alert('Please try again later.');
      }
    }

    fetchMovies();
  }, [query]);

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const inputValue = form.search.value.trim();

    if (inputValue === '') {
      alert('Please enter some text');
      return;
    }

    setSearchParams({ query: inputValue });
    form.reset();
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="inputWrapper">
          <IoSearch className="searchIcon" />
          <input
            className="input"
            type="text"
            name="search"
            defaultValue={query}
            autoComplete="off"
            autoFocus
            placeholder="Search movie"
          />
        </div>

        <button className="searchBtn" type="submit">
          Search
        </button>
      </form>

      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
