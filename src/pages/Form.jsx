import { useState } from 'react';

function Form() {
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
    
  };

  return (
    <div className="page-container">
      <section className="hero-header">
        <span className="hero-badge">Your suggestions</span>
        <h2 className="hero-title">Something missing?</h2>
        <p className="hero-subtitle">
          Submit a proposal to add a character, episode or location to our database.
        </p>
      </section>

      <div className="form-card">
        {submitted && (
          <div className="alert-success">
            <div>
              <strong>Proposal Received!</strong>
              <p>Your suggestion has been logged into the archives system. Thank you.</p>
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
            <label htmlFor="email">Your Email Address</label>
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
            <label htmlFor="suggestedCharacter">Character, Episode or Location Name</label>
            <input
              id="suggestedCharacter"
              type="text"
              name="suggestedCharacter"
              className="form-input"
              placeholder="e.g. Disco Stu, Bart Gets Hit by a Car, Flanders' House..."
              value={form.suggestedCharacter}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="details">Character, Episode or Location Information</label>
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;