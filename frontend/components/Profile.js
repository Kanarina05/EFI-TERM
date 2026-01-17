import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Home() {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    navigate('/login');
  }

  return (
    <div style={{ background: '#F5F5F5', minHeight: '100vh' }}>
      <Header />
      <div className="container">
        <h3>Miresevjen, {username}!</h3>
        <button onClick={logout} style={{
          background: '#70908B',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: 'pointer',
          marginTop: '20px'
        }}>Dil</button>
      </div>
      <Footer />
    </div>
  );
}
