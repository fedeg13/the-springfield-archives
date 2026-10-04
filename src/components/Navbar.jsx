import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar({ theme, toggleTheme }) {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="Springfield Archives Logo" className="navbar-logo-img" />
      </Link>
      <div className="navbar-actions">
        <nav className="navbar-links">
          <NavLink to="/characters" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            👤 Characters
          </NavLink>
          <NavLink to="/episodes" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            📺 Episodes
          </NavLink>
          <NavLink to="/locations" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            📍 Locations
          </NavLink>
          <NavLink to="/Form" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            ✏️ Suggest
          </NavLink>
        </nav>
        <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? '☀️ Light Theme' : '🌙 Dark Theme'}
        </button>
      </div>
    </header>
  );
}

export default Navbar;