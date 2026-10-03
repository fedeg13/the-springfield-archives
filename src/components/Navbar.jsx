import { Link } from 'react-router-dom';

function Navbar({ theme, toggleTheme }) {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="navbar-logo-icon">🍩</span>
        {/* "The" en blanco/normal, "Springfield" en amarillo, "Archives" en blanco/normal */}
        <h1 className="navbar-title">
          The <span>Springfield</span> Archives
        </h1>
      </Link>
      <div className="navbar-actions">
        <nav className="navbar-links">
          <Link to="/" className="nav-link">Characters</Link>
          <Link to="/contacto" className="nav-link">Suggest Character</Link>
        </nav>
        <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? '☀️ Light' : '🌑 Dark'}
        </button>
      </div>
    </header>
  );
}

export default Navbar;