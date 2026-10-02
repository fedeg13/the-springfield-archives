import { useState } from 'react';

function Contacto() {
  const [form, setForm] = useState({ name: '', email: '', suggestedCharacter: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submission logged:', form);
    setSubmitted(true);
    setForm({ name: '', email: '', suggestedCharacter: '' });
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Suggest a Character</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          Missing an inhabitant in our database? Submit a proposal to the archives team.
        </p>

        {submitted && (
          <div className="alert-success">
            ✓ Your suggestion has been successfully submitted to the console.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
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
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="name@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Suggested Character & Details</label>
            <textarea
              name="suggestedCharacter"
              className="form-input"
              rows="4"
              placeholder="Character name, occupation, or famous quote..."
              value={form.suggestedCharacter}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Submit Proposal
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contacto;