import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

export default function Header({ textColor = '#07484A', onProductsClick }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };
    checkLogin();
    const interval = setInterval(checkLogin, 100);
    return () => clearInterval(interval);
  }, []);

  function scrollToProducts() {
    if (onProductsClick) {
      onProductsClick();
    } else {
      const element = document.getElementById('products');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 40px' }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 0',
        background: 'transparent'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <image />
        </div>
        <nav style={{ display: 'flex', gap: '30px', color: textColor }}>
          <Link to="/" style={{ color: textColor, textDecoration: 'none', borderBottom: textColor === 'white' ? '2px solid white' : 'none', paddingBottom: textColor === 'white' ? '5px' : '0' }}>Home</Link>
          <a href="#products" onClick={(e) => { e.preventDefault(); scrollToProducts(); }} style={{ color: textColor, textDecoration: 'none', cursor: 'pointer' }}>Products</a>
          {isLoggedIn && <Link to="/shto" style={{ color: textColor, textDecoration: 'none' }}>Shto Produkt</Link>}
          <Link to="/" style={{ color: textColor, textDecoration: 'none' }}>Categories</Link>
          <Link to="/about" style={{ color: textColor, textDecoration: 'none' }}>About</Link>
          <Link to="/contact" style={{ color: textColor, textDecoration: 'none' }}>Contact</Link>
           <Link to="/kategori" style={{ color: textColor, textDecoration: 'none' }}>Kategori</Link>
        </nav>
        <div style={{ display: 'flex', gap: '20px', color: textColor, fontSize: '20px', alignItems: 'center' }}>
          <FaShoppingCart style={{ cursor: 'pointer', color: textColor }} />
          <Link to={isLoggedIn ? "/home" : "/login"} style={{ color: textColor }}><FaUser style={{ cursor: 'pointer', color: textColor }} /></Link>
        </div>
      </header>
    </div>
  );
}

