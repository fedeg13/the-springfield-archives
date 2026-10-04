import { useState, useEffect } from 'react';
import LocationCard from '../components/LocationCard';

function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://thesimpsonsapi.com/api/locations')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        const list = Array.isArray(data) ? data : data.results || [];
        setLocations(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching locations:', err);
        setLoading(false);
      });
  }, []);

  const filteredLocations = locations.filter((loc) => {
    const name = (loc.name || '').toLowerCase();
    const desc = (loc.description || loc.use || '').toLowerCase();
    const query = search.toLowerCase();
    return name.includes(query) || desc.includes(query);
  });

  return (
    <div className="page-container">
      <section className="hero-header">
        <span className="hero-badge">The map</span>
        <h2 className="hero-title">Springfield Locations</h2>
        <p className="hero-subtitle">
          Discover iconic houses, businesses, and landmarks across Springfield.
        </p>

        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search location by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          Loading locations database...
        </div>
      ) : filteredLocations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          No locations found matching "{search}".
        </div>
      ) : (
        <div className="cards-grid">
          {filteredLocations.map((loc) => (
            <LocationCard key={loc.id || loc.name} location={loc} />
          ))}
        </div>
      )}
    </div>
  );
}

export default LocationsPage;