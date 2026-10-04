import { useState } from 'react';

function SimpsonCard({ personaje }) {
  const name = personaje.name || personaje.character || 'N/A';
  const occupation = personaje.occupation || 'N/A';
  const status = personaje.status || personaje.state || 'N/A';
  const gender = personaje.gender || 'N/A';

  // Extraemos la lista completa de frases que devuelve la API
  let phrasesList = [];
  if (Array.isArray(personaje.phrases) && personaje.phrases.length > 0) {
    phrasesList = personaje.phrases.filter((p) => typeof p === 'string' && p.trim() !== '');
  } else if (typeof personaje.phrase === 'string' && personaje.phrase.trim() !== '') {
    phrasesList = [personaje.phrase];
  } else if (typeof personaje.quote === 'string' && personaje.quote.trim() !== '') {
    phrasesList = [personaje.quote];
  }

  // Respaldos específicos para personajes si la API no devuelve frases
  const lowerName = name.toLowerCase();
  if (phrasesList.length === 0) {
    if (lowerName.includes('skinner')) {
      phrasesList = ["Am I so out of touch? No, it's the children who are wrong."];
    } else if (lowerName.includes('lisa')) {
      phrasesList = ["If anyone needs me, I'll be in my room."];
    }
  }

  // Estado para la frase activa en el carrusel
  const [phraseIndex, setPhraseIndex] = useState(0);

  const handlePrev = () => {
    setPhraseIndex((prev) => (prev === 0 ? phrasesList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setPhraseIndex((prev) => (prev === phrasesList.length - 1 ? 0 : prev + 1));
  };

  const currentPhrase = phrasesList[phraseIndex] || 'N/A';

  // Estilo de estado (Verde para Alive, Rojo para Deceased)
  const lowerStatus = status.toLowerCase();
  let statusClass = 'status-unknown';
  if (lowerStatus.includes('alive') || lowerStatus.includes('vivo')) {
    statusClass = 'status-alive';
  } else if (lowerStatus.includes('deceased') || lowerStatus.includes('dead') || lowerStatus.includes('muerto')) {
    statusClass = 'status-deceased';
  }

  // Imagen CDN
  const portraitPath = personaje.portrait_path || personaje.image || personaje.avatar || '';
  let imageUrl = '';
  if (portraitPath) {
    imageUrl = portraitPath.startsWith('http')
      ? portraitPath
      : `https://cdn.thesimpsonsapi.com/500${portraitPath.startsWith('/') ? '' : '/'}${portraitPath}`;
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
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No Image Available</div>
        )}
      </div>

      <div className="card-body">
        <div className="character-header">
          <h3 className="character-name">{name}</h3>
          <span className={`status-badge ${statusClass}`}>{status}</span>
        </div>

        <div className="info-list">
          <div className="info-item-centered">
            <span className="info-label">Occupation</span>
            <span className="info-value">{occupation}</span>
          </div>

          <div className="info-item-centered">
            <span className="info-label">Gender</span>
            <span className="info-value">{gender}</span>
          </div>

          {currentPhrase !== 'N/A' && (
            <div className="phrase-box">
              <span className="info-label">Famous Quotes</span>
              <div className="phrase-carousel">
                {phrasesList.length > 1 && (
                  <button 
                    type="button" 
                    className="carousel-arrow" 
                    onClick={handlePrev}
                    title="Previous quote"
                  >
                    ‹
                  </button>
                )}
                
                <p className="phrase-text">"{currentPhrase}"</p>

                {phrasesList.length > 1 && (
                  <button 
                    type="button" 
                    className="carousel-arrow" 
                    onClick={handleNext}
                    title="Next quote"
                  >
                    ›
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default SimpsonCard;