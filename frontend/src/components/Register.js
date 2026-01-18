import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
const API = 'http://localhost:4000';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  async function register() {
    const res = await fetch(`${API}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    const text = await res.text();
    setMsg(text);
    if (res.ok) {
      setTimeout(() => navigate('/login'), 1500);
    }
  }

  return (
    <div style={{ background: '#F5F5F5', minHeight: '100vh' }}>
      <Header />
      <div className="container">
      <h3>Regjistrohu</h3>
      <input placeholder="Emri" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={register} style={{
        background: '#70908B',
        color: 'white',
        border: 'none',
        padding: '15px 40px',
        borderRadius: '6px',
        fontSize: '16px',
        cursor: 'pointer',
        width: '100%',
        marginTop: '10px'
      }}>Regjistrohu</button>
      <p>{msg}</p>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Ke llogari? <Link to="/login" style={{ color: '#0984e3' }}>Kyçu ketu</Link>
      </p>
      </div>
      <Footer />
    </div>
  );
}
