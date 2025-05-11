import { useState } from 'react';
import MovieList from '../components/MovieList/MovieList';
import { searchMovies } from '../tmdb-api';
import { useId } from 'react';
import { IoSearch } from 'react-icons/io5';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const id = useId();

  const handleSubmit = async evt => {
    evt.preventDefault();

    if (query.trim() === '') {
      alert('Please enter some text');
      return;
    }

    try {
      const data = await searchMovies(query);

      if (data.results.length === 0) {
        alert('No results found');
        return;
      }

      setMovies(data.results);
    } catch (error) {
      console.error(error);
      alert('Please try again later.');
    }
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
            value={query}
            id={id}
            autoComplete="off"
            autoFocus
            placeholder="Search movie"
            onChange={evt => setQuery(evt.target.value)}
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
