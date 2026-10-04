function EpisodeCard({ episodio }) {
  const title = episodio.name || episodio.title || 'N/A';
  const season = episodio.season || 'N/A';
  const episodeNum = episodio.episode_number || episodio.episode || 'N/A';
  
  const airDate = 
    episodio.airdate || 
    episodio.air_date || 
    episodio.release_date || 
    episodio.aired || 
    episodio.date || 
    'N/A';

  const synopsis = episodio.synopsis || episodio.description || 'No synopsis available for this episode.';

  const imagePath = episodio.image_path || episodio.image || '';
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
            alt={title} 
            className="character-img" 
            loading="lazy" 
          />
        ) : (
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>🎬 Springfield Archives</div>
        )}
      </div>

      <div className="card-body">
        <div className="character-header">
          <h3 className="character-name">{title}</h3>
          <span className="status-badge status-alive">Season {season} • Ep. {episodeNum}</span>
        </div>

        <div className="info-list">
          <div className="info-item-centered">
            <span className="info-label">Air Date</span>
            <span className="info-value">{airDate}</span>
          </div>

          <div className="phrase-box">
            <span className="info-label">Synopsis</span>
            <p className="phrase-text">"{synopsis}"</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default EpisodeCard;