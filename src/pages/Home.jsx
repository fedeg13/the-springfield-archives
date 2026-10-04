import { useState } from 'react';
import logo from '../assets/logo.png'; // 👈 Importamos el logo

function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="page-container">
      <div className="hero-header">
        
        {/* Título con "Welcome to", salto de línea e imagen del logo */}
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

      {/* Aquí va el resto del contenido de tu Home (grids, búsquedas, etc.) */}
    </div>
  );
}

export default Home;