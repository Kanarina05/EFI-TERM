import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
const API = 'http://localhost:4000';

export default function ShtoProdukt() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  async function shtoProdukt() {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('text', text);
    if (image) formData.append('image', image);

    const res = await fetch(`${API}/posts`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    const data = await res.json();
    if (res.ok) {
      setMsg('Produkti u shtua!');
      setTitle('');
      setText('');
      setImage(null);
      setTimeout(() => navigate('/'), 1000);
    } else {
      setMsg(data.message || 'Gabim!');
    }
  }

  return (
    <div style={{ background: '#F5F5F5', minHeight: '100vh' }}>
      <Header />
      <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
        <h2>Shto Produkt</h2>
      <input 
        placeholder="Titulli" 
        value={title} 
        onChange={e => setTitle(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <textarea 
        placeholder="Përshkrimi" 
        value={text} 
        onChange={e => setText(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', minHeight: '100px' }}
      />
      <input 
        type="file" 
        accept="image/*"
        onChange={e => setImage(e.target.files[0])}
        style={{ marginBottom: '10px' }}
      />
      <button onClick={shtoProdukt} style={{
        background: '#70908B',
        color: 'white',
        border: 'none',
        padding: '15px 40px',
        borderRadius: '6px',
        fontSize: '16px',
        cursor: 'pointer',
        width: '100%',
        marginTop: '10px'
      }}>Shto</button>
      <p>{msg}</p>
      </div>
      <Footer />
    </div>
  );
}


