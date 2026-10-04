import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [characters, setCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [resChars, resEps, resLocs] = await Promise.all([
          fetch('https://thesimpsonsapi.com/api/characters'),
          fetch('https://thesimpsonsapi.com/api/episodes'),
          fetch('https://thesimpsonsapi.com/api/locations')
        ]);

        const dataChars = await resChars.json();
        const dataEps = await resEps.json();
        const dataLocs = await resLocs.json();

        setCharacters(Array.isArray(dataChars) ? dataChars : (dataChars.results || []));
        setEpisodes(Array.isArray(dataEps) ? dataEps : (dataEps.results || []));
        setLocations(Array.isArray(dataLocs) ? dataLocs : (dataLocs.results || []));
      } catch (error) {
        console.error('Error fetching Simpsons data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const query = searchQuery.trim().toLowerCase();


  const filteredCharacters = query
    ? characters.filter((c) =>
        c.name?.toLowerCase().includes(query) ||
        c.occupation?.toLowerCase().includes(query)
      )
    : [];

  const filteredEpisodes = query
    ? episodes.filter((e) =>
        (e.title || e.name)?.toLowerCase().includes(query) ||
        e.synopsis?.toLowerCase().includes(query)
      )
    : [];

  const filteredLocations = query
    ? locations.filter((l) =>
        l.name?.toLowerCase().includes(query) ||
        l.use?.toLowerCase().includes(query)
      )
    : [];

  const hasResults =
    filteredCharacters.length > 0 ||
    filteredEpisodes.length > 0 ||
    filteredLocations.length > 0;

  return (
    <div className="page-container">
      
      <div className="hero-header">

        <h2 className="hero-title">
          Welcome to <br />
          <img
            src={logo}
            alt="The Springfield Archives"
            className="hero-logo-img"
          />
        </h2>

        <p className="hero-subtitle">
          Search across characters, episodes, and locations in The Simpsons universe.
        </p>

        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search characters, episodes, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      
      {query !== '' && (
        <div className="search-results-container">
          {loading ? (
            <p className="search-status-msg">Searching Springfield Archives...</p>
          ) : !hasResults ? (
            <p className="search-status-msg">
              No results found for <strong>"{searchQuery}"</strong>.
            </p>
          ) : (
            <>
              
              {filteredCharacters.length > 0 && (
                <section className="results-group">
                  <h3 className="group-title">
                    👤 Characters ({filteredCharacters.length})
                  </h3>
                  <div className="cards-grid">
                    {filteredCharacters.map((char) => (
                      <div key={`char-${char.id}`} className="character-card">
                        <div className="card-media">
                          <img
                            src={
                              char.portrait_path
                                ? `https://cdn.thesimpsonsapi.com/500${char.portrait_path}`
                                : 'https://via.placeholder.com/200?text=No+Image'
                            }
                            alt={char.name}
                            className="character-img"
                          />
                        </div>
                        <div className="card-body">
                          <h4 className="character-name">{char.name}</h4>
                          <div className="info-item-centered">
                            <span className="info-label">Occupation</span>
                            <span className="info-value">
                              {char.occupation || 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              
              {filteredEpisodes.length > 0 && (
                <section className="results-group">
                  <h3 className="group-title">
                    📺 Episodes ({filteredEpisodes.length})
                  </h3>
                  <div className="cards-grid">
                    {filteredEpisodes.map((ep) => (
                      <div key={`ep-${ep.id}`} className="character-card">
                        <div className="card-body">
                          <span className="status-badge status-alive">
                            Season {ep.season || 'N/A'} • Episode {ep.episode_number || 'N/A'}
                          </span>
                          <h4 className="character-name">{ep.title || ep.name}</h4>
                          <div className="info-item-centered">
                            <span className="info-label">Air Date</span>
                            <span className="info-value">{ep.air_date || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              
              {filteredLocations.length > 0 && (
                <section className="results-group">
                  <h3 className="group-title">
                    📍 Locations ({filteredLocations.length})
                  </h3>
                  <div className="cards-grid">
                    {filteredLocations.map((loc) => (
                      <div key={`loc-${loc.id}`} className="character-card">
                        <div className="card-media">
                          <img
                            src={
                              loc.image_path
                                ? `https://cdn.thesimpsonsapi.com/500${loc.image_path}`
                                : 'https://via.placeholder.com/200?text=No+Image'
                            }
                            alt={loc.name}
                            className="character-img"
                          />
                        </div>
                        <div className="card-body">
                          <span className="status-badge status-unknown">
                            Location
                          </span>
                          <h4 className="character-name">{loc.name}</h4>
                          <div className="info-item-centered">
                            <span className="info-label">Use / Type</span>
                            <span className="info-value">{loc.use || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;