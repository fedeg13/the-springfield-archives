function SimpsonCard({ personaje }) {
  const name = personaje.name || personaje.character || 'N/A';
  const occupation = personaje.occupation || 'N/A';
  const status = personaje.status || personaje.state || 'N/A';
  const gender = personaje.gender || 'N/A';
  const age = personaje.age !== undefined ? personaje.age : 'N/A';

  // portrait_path viene como "/character/1.webp". Las imágenes viven en el CDN, no en thesimpsonsapi.com
  const rawImage = personaje.portrait_path || personaje.image || personaje.avatar || personaje.portrait;

  let imageUrl = '';
  if (rawImage) {
    if (rawImage.startsWith('http')) {
      imageUrl = rawImage;
    } else {
      const path = rawImage.startsWith('/') ? rawImage : `/${rawImage}`;
      imageUrl = `https://cdn.thesimpsonsapi.com/500${path}`;
    }
  }

  // Placeholder SVG nativo limpia con el nombre del personaje por si la imagen tarda o no existe
  const svgFallback = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="220" viewBox="0 0 200 220"><rect width="100%" height="100%" fill="%232f2f35"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23ffd90f" font-family="sans-serif" font-size="15" font-weight="bold">${encodeURIComponent(name)}</text></svg>`;

  return (
    <article className="character-card">
      <div className="card-media">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className="character-img" 
            loading="lazy" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = svgFallback;
            }}
          />
        ) : (
          <img src={svgFallback} alt={name} className="character-img" />
        )}
      </div>
      <div className="card-body">
        <h3 className="character-name">{name}</h3>
        <div className="info-list">
          <div className="info-item">
            <span className="info-label">Occupation</span>
            <span className="info-value" title={occupation}>{occupation}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Status</span>
            <span className="status-badge">{status}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Gender</span>
            <span className="info-value">{gender}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Age</span>
            <span className="info-value">{age}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default SimpsonCard;