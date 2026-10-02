import { useState, useEffect } from 'react';
import SimpsonCard from '../components/SimpsonCard';

function Home() {
  const [personajes, setPersonajes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Ya no llamamos a setLoading(true) ni setError(null) acá
    fetch('https://thesimpsonsapi.com/api/characters')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Error status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : data.results || data.data || data.characters || [];
        setPersonajes(list);
      })
      .catch((err) => {
        console.error('API Error:', err);
        setError('Could not fetch characters directly from The Simpsons API.');
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredCharacters = personajes.filter((p) => {
    const name = (p.name || p.character || '').toLowerCase();
    const occupation = (p.occupation || '').toLowerCase();
    const query = busqueda.toLowerCase();
    return name.includes(query) || occupation.includes(query);
  });

  return (
    <div className="page-container">
      <section className="hero-header">
        <span className="hero-badge">The Simpsons API</span>
        <h2 className="hero-title">Springfield Index</h2>
        <p className="hero-subtitle">
          Displaying character data fetched directly from https://thesimpsonsapi.com
        </p>

        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search character by name or occupation..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </section>

      {loading && (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', margin: '2rem 0' }}>
          Loading characters from https://thesimpsonsapi.com...
        </p>
      )}

      {error && (
        <div style={{ textAlign: 'center', color: '#f44336', margin: '2rem 0' }}>
          <p>⚠️ {error}</p>
        </div>
      )}

      {!loading && !error && filteredCharacters.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', margin: '2rem 0' }}>
          No characters match your search filter.
        </p>
      )}

      {!loading && !error && filteredCharacters.length > 0 && (
        <div className="cards-grid">
          {filteredCharacters.map((personaje, index) => (
            <SimpsonCard key={personaje.id || index} personaje={personaje} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;