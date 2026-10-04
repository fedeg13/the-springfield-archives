import { useState, useEffect } from 'react';
import SimpsonCard from '../components/SimpsonCard';

function CharactersPage() {
  const [personajes, setPersonajes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://thesimpsonsapi.com/api/characters')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        const list = Array.isArray(data) ? data : data.results || [];
        setPersonajes(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching characters:', err);
        setLoading(false);
      });
  }, []);

  const filtered = personajes.filter((p) => {
    const name = (p.name || p.character || '').toLowerCase();
    const occupation = (p.occupation || '').toLowerCase();
    const query = search.toLowerCase();
    return name.includes(query) || occupation.includes(query);
  });

  return (
    <div className="page-container">
      <section className="hero-header">
        <span className="hero-badge">The people</span>
        <h2 className="hero-title">Springfield Characters</h2>
        <p className="hero-subtitle">
          Explore characters' profiles, occupations, and famous catchphrases.
        </p>

        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search character by name or occupation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          Loading characters database...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          No characters found matching "{search}".
        </div>
      ) : (
        <div className="cards-grid">
          {filtered.map((personaje) => (
            <SimpsonCard key={personaje.id || personaje.name} personaje={personaje} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CharactersPage;