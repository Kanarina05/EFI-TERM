import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaFire } from 'react-icons/fa';
const API = 'http://localhost:4000';

export default function Login() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [msg,      setMsg]      = useState('');
  const [loading,  setLoading]  = useState(false);
  const navigate = useNavigate();

  async function login() {
    if (!email || !password) {
      setMsg('Plotëso të gjitha fushat.');
      return;
    }
    setLoading(true);
    setMsg('');
    try {
      const res  = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token',    data.token);
        localStorage.setItem('userId',   data.userId);
        localStorage.setItem('username', email);
        navigate('/');
      } else {
        setMsg(data.message || 'Email ose fjalëkalim i gabuar.');
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
        <h1 className="auth-left-h1">Mirë se kthyet<br />te Efi Term</h1>
        <p className="auth-left-p">Kyçuni për të menaxhuar produktet dhe shërbimet tuaja.</p>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2 className="auth-card-h2">Kyçu</h2>
          <p className="auth-card-sub">Hyr në llogarinë tënde</p>

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
              <input type="password" placeholder="Fjalëkalimi juaj" value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && login()} />
            </div>
          </div>

          {msg && <p className="auth-msg auth-msg--err">{msg}</p>}

          <button className="auth-submit" onClick={login} disabled={loading}>
            {loading ? 'Duke u kyçur...' : 'Kyçu →'}
          </button>

          <p className="auth-footer-txt">
            Nuk ke llogari? <Link to="/register">Regjistrohu falas</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
