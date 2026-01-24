import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
const API = 'http://localhost:4000';

export default function Home() {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      loadMyPosts();
    }
  }, []);

  async function loadMyPosts() {
    try {
      const res = await fetch(`${API}/myposts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      setPosts(data || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  async function deletePost(postId) {
    if (!window.confirm('A jeni të sigurt që dëshironi të fshini këtë postim?')) {
      return;
    }

    try {
      const res = await fetch(`${API}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (res.ok) {
        // Fshi postimin nga lista
        setPosts(posts.filter(post => post._id !== postId));
        alert('Postimi u fshi me sukses!');
      } else {
        alert(data.message || 'Gabim gjatë fshirjes!');
      }
    } catch (err) {
      alert('Gabim gjatë fshirjes!');
    }
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    navigate('/login');
  }

  return (
    <div style={{ background: '#F5F5F5', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#07484A', marginBottom: '10px' }}>Miresevjen, {username}!</h2>
          <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
            <Link to="/shto" style={{
              background: '#70908B',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block'
            }}>Shto Produkt të Ri</Link>
            <button onClick={logout} style={{
              background: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer'
            }}>Dil</button>
          </div>
        </div>

        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          padding: '30px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#07484A', marginBottom: '20px' }}>Postimet e Mia</h3>
          
          {loading ? (
            <p style={{ color: '#07484A' }}>Duke ngarkuar...</p>
          ) : posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ color: '#70908B', marginBottom: '20px' }}>Nuk keni postime akoma.</p>
              <Link to="/shto" style={{
                background: '#70908B',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '6px',
                textDecoration: 'none',
                display: 'inline-block'
              }}>Shto Produkt të Parë</Link>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '25px'
            }}>
              {posts.map(post => (
                <div key={post._id} style={{ 
                  border: '1px solid #E5E5E5',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: '#fff',
                  transition: 'transform 0.2s',
                  position: 'relative'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <button
                    onClick={() => deletePost(post._id)}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(255, 0, 0, 0.8)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '35px',
                      height: '35px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10,
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 0, 0, 1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 0, 0, 0.8)'}
                    title="Fshi postimin"
                  >
                    <FaTrash size={14} />
                  </button>
                  {post.image && (
                    <img 
                      src={`${API}/uploads/${post.image}`} 
                      alt={post.title}
                      style={{ 
                        width: '100%', 
                        height: '250px',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#07484A' }}>{post.title}</h3>
                    <p style={{ margin: '0', color: '#70908B', fontSize: '14px' }}>{post.text}</p>
                    {post.createdAt && (
                      <p style={{ margin: '10px 0 0 0', color: '#999', fontSize: '12px' }}>
                        {new Date(post.createdAt).toLocaleDateString('sq-AL')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
