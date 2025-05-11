import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="notFound">
      <h1 className="errorCode">404</h1>
      <p className="errorMessage"> Page not found!</p>
      <Link to="/" className="homePageLink">
        Go home
      </Link>
    </div>
  );
}
