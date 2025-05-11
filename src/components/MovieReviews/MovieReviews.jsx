import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from './../../tmdb-api';
import './MovieReviews.modules.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [fullReview, setFullReview] = useState({});

  useEffect(() => {
    async function getReviews() {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    }

    getReviews();
  }, [movieId]);

  const showFullText = id => {
    setFullReview(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (!reviews.length) {
    return <p className="message">We don't have any reviews for this movie.</p>;
  }

  return (
    <div className="reviews">
      <h2 className="title">Reviews</h2>
      <ul className="reviewList">
        {reviews.map(({ id, author, content }) => {
          const isFullReview = fullReview[id];
          const shortText = content.slice(0, 300);

          return (
            <li key={id} className="reviewItem">
              <h3 className="author">{author}</h3>
              <p className="content">
                {isFullReview ? content : `${shortText}...`}
              </p>
              {content.length > 300 && (
                <button
                  className="showMoreBtn"
                  onClick={() => showFullText(id)}
                >
                  {isFullReview ? 'Show less' : 'Show more'}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
