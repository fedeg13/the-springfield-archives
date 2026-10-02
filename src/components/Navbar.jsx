import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="navbar-logo-icon">🍩</span>
        <h1 className="navbar-title">The Springfield <span>Archives</span></h1>
      </Link>
      <nav className="navbar-links">
        <Link to="/" className="nav-link">Characters</Link>
        <Link to="/contacto" className="nav-link">Suggest Character</Link>
      </nav>
    </header>
  );
}

export default Navbar;