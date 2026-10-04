import { useState, useEffect } from 'react';
import EpisodeCard from '../components/EpisodeCard';

function EpisodesPage() {
  const [episodes, setEpisodes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://thesimpsonsapi.com/api/episodes')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        const list = Array.isArray(data) ? data : data.results || [];
        setEpisodes(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching episodes:', err);
        setLoading(false);
      });
  }, []);

  const filteredEpisodes = episodes.filter((ep) => {
    const title = (ep.name || ep.title || '').toLowerCase();
    const synopsis = (ep.synopsis || ep.description || '').toLowerCase();
    const query = search.toLowerCase();
    return title.includes(query) || synopsis.includes(query);
  });

  return (
    <div className="page-container">
      <section className="hero-header">
        <span className="hero-badge">The stories</span>
        <h2 className="hero-title">Springfield Episodes</h2>
        <p className="hero-subtitle">
          Explore classic episodes, air dates, and synopses from the series.
        </p>

        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search episode by title or synopsis..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          Loading episodes database...
        </div>
      ) : filteredEpisodes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          No episodes found matching "{search}".
        </div>
      ) : (
        <div className="cards-grid">
          {filteredEpisodes.map((episode) => (
            <EpisodeCard key={episode.id || episode.name} episodio={episode} />
          ))}
        </div>
      )}
    </div>
  );
}

export default EpisodesPage;