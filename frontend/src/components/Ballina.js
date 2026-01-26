import { useEffect, useState } from 'react';
import { FaSearch, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
const API = 'http://localhost:4000';

export default function Ballina() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const perPage = 6;
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const res = await fetch(`${API}/allposts`);
    const data = await res.json();
    setPosts(data || []);
    setLoading(false);
  }

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const start = (page - 1) * perPage;
  const end = start + perPage;
  const currentPosts = filteredPosts.slice(start, end);
  const totalPages = Math.ceil(filteredPosts.length / perPage);

  function scrollToProducts() {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  async function deletePost(postId) {
    if (!window.confirm('A jeni te sigurt')) {
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
      } else {
        alert(data.message || 'Gabim gjatë fshirjes!');
      }
    } catch (err) {
      alert('Gabim gjatë fshirjes!');
    }
  }

  return (
    <div>
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: '90vh',
        backgroundImage: 'url(/images/b.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <Header textColor="white" onProductsClick={scrollToProducts} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{
            padding: '80px 0',
            maxWidth: '45%'
          }}>
           <header className="header-title">
  <h1>Efi Term</h1>
  <p>Ujësjellës | Ngrohje Qendrore | Sisteme Vakumi | </p>
</header>
           
          </div>
        </div>
      </div>
      
      <div id="products" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 40px', background: '#F5F5F5' }}>

        <div style={{ marginTop: '60px' }}>
          <div style={{ position: 'relative', marginBottom: '30px' }}>
            <FaSearch style={{
              position: 'absolute',
              left: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#70908B',
              fontSize: '18px'
            }} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              style={{
                width: '100%',
                padding: '12px 15px 12px 45px',
                border: '1px solid #E5E5E5',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                background: 'white'
              }}
            />
          </div>

      {loading ? (
            <p style={{ color: '#07484A' }}>Duke ngarkuar...</p>
          ) : filteredPosts.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '40px', color: '#07484A' }}>
              {search ? 'Nuk u gjet produkt me kete titull' : 'Nuk ka produkte akoma'}
        </p>
      ) : (
        <>
          <div style={{ 
            display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '25px'
          }}>
            {currentPosts.map(post => {
              const isOwner = userId && post.userId && (post.userId._id || post.userId).toString() === userId;
              return (
                <div key={post._id} style={{ 
                  border: '1px solid #E5E5E5',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: '#fff',
                  transition: 'transform 0.2s',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {isOwner && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePost(post._id);
                      }}
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
                  )}
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
                    {post.userId && post.userId.username && (
                      <p style={{ margin: '10px 0 0 0', color: '#999', fontSize: '12px' }}>
                        Nga: {post.userId.username}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '40px' }}>
                  <button
                    onClick={() => setPage(1)}
                    disabled={page === 1}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: page === 1 ? 'not-allowed' : 'pointer',
                      fontSize: '18px',
                      color: page === 1 ? '#ccc' : '#07484A',
                      padding: '5px 10px'
                    }}
                  >«</button>

                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        style={{
                          background: page === pageNum ? '#07484A' : 'transparent',
                          color: page === pageNum ? 'white' : '#70908B',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '8px 12px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          fontWeight: page === pageNum ? 'bold' : 'normal'
                        }}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setPage(totalPages)}
                    disabled={page === totalPages}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: page === totalPages ? 'not-allowed' : 'pointer',
                      fontSize: '18px',
                      color: page === totalPages ? '#ccc' : '#07484A',
                      padding: '5px 10px'
                    }}
                  >»</button>
            </div>
          )}
        </>
      )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
