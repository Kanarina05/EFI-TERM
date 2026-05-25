import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaFire } from 'react-icons/fa';
const API = 'http://localhost:4000';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [msg,      setMsg]      = useState('');
  const [ok,       setOk]       = useState(false);
  const [loading,  setLoading]  = useState(false);
  const navigate = useNavigate();

  async function register() {
    if (!username || !email || !password) {
      setMsg('Të gjitha fushat janë të detyrueshme.');
      return;
    }
    setLoading(true);
    setMsg('');
    try {
      const res  = await fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setOk(true);
        setMsg(data.message || 'Regjistrimi u krye me sukses!');
        setTimeout(() => navigate('/login'), 1800);
      } else {
        setMsg(data.message || 'Gabim gjatë regjistrimit.');
      }
    } catch {
      setMsg('Nuk u lidh me serverin. Provoni përsëri.');
    }
    setLoading(false);
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <FaFire className="auth-brand-ico" />
          <span className="auth-brand-txt">Efi Term</span>
        </div>
        <h1 className="auth-left-h1">Mirë se vini<br />në familjen tonë</h1>
        <p className="auth-left-p">Krijoni llogarinë tuaj dhe qasuni në të gjitha shërbimet tona profesionale.</p>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2 className="auth-card-h2">Regjistrohu</h2>
          <p className="auth-card-sub">Krijo llogari të re falas</p>

          <div className="auth-field">
            <label>Emri</label>
            <div className="auth-input-wrap">
              <FaUser className="auth-field-ico" />
              <input placeholder="Emri juaj" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
          </div>

          <div className="auth-field">
            <label>Email</label>
            <div className="auth-input-wrap">
              <FaEnvelope className="auth-field-ico" />
              <input type="email" placeholder="email@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>

          <div className="auth-field">
            <label>Fjalëkalimi</label>
            <div className="auth-input-wrap">
              <FaLock className="auth-field-ico" />
              <input type="password" placeholder="Minimum 6 karaktere" value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && register()} />
            </div>
          </div>

          {msg && <p className={`auth-msg ${ok ? 'auth-msg--ok' : 'auth-msg--err'}`}>{msg}</p>}

          <button className="auth-submit" onClick={register} disabled={loading}>
            {loading ? 'Duke u regjistruar...' : 'Regjistrohu →'}
          </button>

          <p className="auth-footer-txt">
            Ke llogari? <Link to="/login">Kyçu këtu</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
