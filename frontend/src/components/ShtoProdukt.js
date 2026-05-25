import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaImage, FaTimes } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
const API = 'http://localhost:4000';

export default function ShtoProdukt() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [title,   setTitle]   = useState('');
  const [text,    setText]    = useState('');
  const [image,   setImage]   = useState(null);
  const [preview, setPreview] = useState(null);
  const [msg,     setMsg]     = useState('');
  const [ok,      setOk]      = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (!token) navigate('/login'); }, []);

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  function removeImage() { setImage(null); setPreview(null); }

  async function shto() {
    if (!title.trim()) { setMsg('Titulli është i detyrueshëm.'); return; }
    setLoading(true); setMsg('');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('text',  text);
    if (image) formData.append('image', image);

    const res  = await fetch(`${API}/posts`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: formData });
    const data = await res.json();
    if (res.ok) {
      setOk(true);
      setMsg('Puna u shtua me sukses!');
      setTimeout(() => navigate('/'), 1400);
    } else {
      setMsg(data.message || 'Gabim gjatë shtimit.');
    }
    setLoading(false);
  }

  return (
    <div className="shto-page">
      <div className="shto-hero">
        <Header textColor="white" />
      </div>

      <div className="shto-wrap">
        <div className="shto-card">
          <h2 className="shto-h2">Shto ndonje pune</h2>
          <p className="shto-sub">Ngarko foton dhe detajet e punes</p>

          {/* Foto */}
          <div className="shto-field">
            <label>Foto e punës</label>
            {preview ? (
              <div className="shto-preview">
                <img src={preview} alt="preview" />
                <button className="shto-remove" onClick={removeImage}><FaTimes /></button>
              </div>
            ) : (
              <label className="shto-upload">
                <FaImage />
                <span>Kliko ose ose bone drag ktu </span>
                <small>JPG, PNG, WEBP</small>
                <input type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
              </label>
            )}
          </div>

         
          <div className="shto-field">
            <label>Titulli </label>
            <input
              placeholder="p.sh. Instalim ngrohjeje qendrore — Lipjan"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

       
          <div className="shto-field">
            <label>Përshkrimi <span style={{ color:'#9ca3af', fontWeight:400 }}>(opsional)</span></label>
            <textarea
              rows="4"
              placeholder="Përshkruaj punën e kryer, materialet e përdorura..."
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </div>

          {msg && <p className={`shto-msg ${ok ? 'shto-msg--ok' : 'shto-msg--err'}`}>{msg}</p>}

          <button className="shto-submit" onClick={shto} disabled={loading}>
            {loading ? 'Duke u ngarkuar...' : 'Publiko Punën →'}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
