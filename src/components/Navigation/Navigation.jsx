import './Navigation.modules.css';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <>
      <nav className="navigation">
        <NavLink to="/" className="navLink">
          Home
        </NavLink>
        <NavLink to="/movies" className="navLink">
          Movies
        </NavLink>
      </nav>
    </>
  );
}
