import { Link } from 'react-router-dom';

function Error404() {
  return (
    <div className="page-container" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--accent-yellow)', marginBottom: '0.5rem' }}>D'oh!</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>404 - Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        The page you are looking for has been relocated or doesn't exist in Springfield.
      </p>
      <Link to="/" className="submit-btn" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto', padding: '0.8rem 2rem' }}>
        Return to Archives
      </Link>
    </div>
  );
}

export default Error404;