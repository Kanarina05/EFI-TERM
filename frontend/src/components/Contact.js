import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';

export default function ContactEfiTerm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="ct-page">

      {/* Hero */}
      <div className="ct-hero">
        <Header textColor="white" />
        <div className="ct-hero-body">
          <span className="ab-badge">Kontaktoni</span>
          <h1 className="ct-hero-h1">Na Kontaktoni</h1>
          <p className="ct-hero-p">Jemi gjithmonë në dispozicion tuaj — 24/7</p>
        </div>
      </div>

      {/* Content */}
      <div className="ct-wrap">

        {/* Info */}
        <div className="ct-info">
          <span className="ab-tag">Informata</span>
          <h2 className="ct-info-h2">Si të na gjeni?</h2>
          <p className="ct-info-p">
            Për çdo pyetje rreth produkteve apo shërbimeve tona na kontaktoni
            dhe do t'ju përgjigjemi sa më shpejt të jetë e mundur.
          </p>

          <div className="ct-info-list">
            <div className="ct-info-row">
              <span className="ct-info-ico"><FaPhone /></span>
              <div>
                <p className="ct-info-label">Telefoni</p>
                <p className="ct-info-val">+383 44 574 631</p>
              </div>
            </div>
            <div className="ct-info-row">
              <span className="ct-info-ico"><FaEnvelope /></span>
              <div>
                <p className="ct-info-label">Email</p>
                <p className="ct-info-val">efi.term.01@gmail.com</p>
              </div>
            </div>
            <div className="ct-info-row">
              <span className="ct-info-ico"><FaMapMarkerAlt /></span>
              <div>
                <p className="ct-info-label">Adresa</p>
                <p className="ct-info-val">Lipjan, Kosovë</p>
              </div>
            </div>
            <div className="ct-info-row">
              <span className="ct-info-ico"><FaClock /></span>
              <div>
                <p className="ct-info-label">Orari</p>
                <p className="ct-info-val">E Hënë – E Shtunë, 08:00 – 18:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="ct-form-card">
          <h2 className="ct-form-h2">Na shkruani</h2>
          {sent ? (
            <div className="ct-success">
              <span>✓</span>
              <p>Mesazhi juaj u dërgua! Do t'ju kontaktojmë së shpejti.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="ct-form">
              <div className="ct-field">
                <label>Emri</label>
                <input type="text" placeholder="Emri juaj" required />
              </div>
              <div className="ct-field">
                <label>Email</label>
                <input type="email" placeholder="email@gmail.com" required />
              </div>
              <div className="ct-field">
                <label>Telefoni (opsional)</label>
                <input type="tel" placeholder="+383..." />
              </div>
              <div className="ct-field">
                <label>Mesazhi</label>
                <textarea rows="5" placeholder="Si mund te ju ndihmojme?" required></textarea>
              </div>
              <button type="submit" className="ct-submit">Dërgo Mesazhin →</button>
            </form>
          )}
        </div>

      </div>

      <Footer />
    </div>
  );
}
