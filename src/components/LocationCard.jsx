function LocationCard({ location }) {
  const name = location.name || 'N/A';

  const category = 
    location.use || 
    location.category || 
    location.type || 
    location.town || 
    'Landmark';

  const description = 
    location.description || 
    location.history || 
    'Iconic location in Springfield.';

  const imagePath = location.image_path || location.image || '';
  let imageUrl = '';
  if (imagePath) {
    imageUrl = imagePath.startsWith('http')
      ? imagePath
      : `https://cdn.thesimpsonsapi.com/500${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  }

  return (
    <article className="character-card">
      <div className="card-media">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className="character-img" 
            loading="lazy" 
          />
        ) : (
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>🏠 Springfield Location</div>
        )}
      </div>

      <div className="card-body">
        <div className="character-header">
          <h3 className="character-name">{name}</h3>
          <span className="status-badge status-alive">{category}</span>
        </div>

        <div className="info-list">
          <div className="phrase-box">
            <span className="info-label">About</span>
            <p className="phrase-text">{description}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default LocationCard;