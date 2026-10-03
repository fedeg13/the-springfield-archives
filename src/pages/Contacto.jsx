import { useState } from 'react';

function Contacto() {
  const [form, setForm] = useState({ name: '', email: '', suggestedCharacter: '', details: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Character proposal submitted:', form);
    setSubmitted(true);
    setForm({ name: '', email: '', suggestedCharacter: '', details: '' });
    
    // Ocultar el mensaje de éxito automáticamente después de 5 segundos
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="page-container">
      <section className="hero-header">
        <span className="hero-badge">Archives Network</span>
        <h2 className="hero-title">Suggest a Character</h2>
        <p className="hero-subtitle">
          Is an inhabitant missing from our Springfield index? Submit a proposal to add them to the database.
        </p>
      </section>

      <div className="form-card">
        {submitted && (
          <div className="alert-success">
            <span className="alert-icon">✨</span>
            <div>
              <strong>Proposal Received!</strong>
              <p>Thank you. Your character suggestion has been logged into the archives system.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              id="name"
              type="text"
              name="name"
              className="form-input"
              placeholder="e.g. Waylon Smithers"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              className="form-input"
              placeholder="smithers@burns-plant.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="suggestedCharacter">Character Name</label>
            <input
              id="suggestedCharacter"
              type="text"
              name="suggestedCharacter"
              className="form-input"
              placeholder="e.g. Disco Stu, Frank Grimes, Hank Scorpio..."
              value={form.suggestedCharacter}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="details">Occupation or Famous Quote</label>
            <textarea
              id="details"
              name="details"
              className="form-input form-textarea"
              rows="3"
              placeholder="Add occupation, status, or iconic catchphrase..."
              value={form.details}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Submit Character Proposal
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contacto;