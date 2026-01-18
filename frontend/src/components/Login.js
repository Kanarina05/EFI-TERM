import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
const API = 'http://localhost:4000';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  async function login() {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', email);
      localStorage.setItem('userId', data.userId);
      navigate('/');
    } else {
      setMsg(data.message || 'Gabim!');
    }
  }

  return (
    <div style={{ background: '#F5F5F5', minHeight: '100vh' }}>
      <Header />
      <div className="container">
      <h3>Kyçu</h3>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={login} style={{
        background: '#70908B',
        color: 'white',
        border: 'none',
        padding: '15px 40px',
        borderRadius: '6px',
        fontSize: '16px',
        cursor: 'pointer',
        width: '100%',
        marginTop: '10px'
      }}>Kyçu</button>
      <p>{msg}</p>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Nuk ke llogari? <Link to="/register" style={{ color: '#0984e3' }}>Krijo llogari të re</Link>
      </p>
      </div>
      <Footer />
    </div>
  );
}
