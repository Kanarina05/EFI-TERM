import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

export default function Header({ textColor = '#07484A', onScrollTo }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const check = () => setIsLoggedIn(!!localStorage.getItem('token'));
    check();
    const id = setInterval(check, 500);
    return () => clearInterval(id);
  }, []);

  function handleNav(e, sectionId) {
    e.preventDefault();
    if (location.pathname === '/') {
      if (onScrollTo) onScrollTo(sectionId);
      else document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${sectionId}`;
    }
  }

  const link = { color: textColor, textDecoration: 'none', fontSize: '15px', fontWeight: 500 };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
      <header style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '22px 0' }}>

        <Link to="/" style={{ ...link, fontSize: '20px', fontWeight: 800, letterSpacing: '-0.5px' }}>
          Efi Term
        </Link>

        <nav style={{ display: 'flex', gap: '32px', alignItems: 'center', justifyContent: 'center' }}>
          <Link to="/" style={link}>Kryefaqja</Link>
          <a href="/#about"    onClick={e => handleNav(e, 'about')}    style={link}>Rreth Nesh</a>
          <a href="/#services" onClick={e => handleNav(e, 'services')} style={link}>Shërbimet</a>
          <a href="/#products" onClick={e => handleNav(e, 'products')} style={link}>Produktet</a>
          {isLoggedIn && <Link to="/shto" style={link}>Shto Produkt</Link>}
          <Link to="/contact"  style={link}>Kontakti</Link>
        </nav>

        <div style={{ display: 'flex', gap: '18px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <FaShoppingCart style={{ cursor: 'pointer', color: textColor, fontSize: '18px' }} />
          <Link to={isLoggedIn ? '/home' : '/login'} style={{ color: textColor }}>
            <FaUser style={{ cursor: 'pointer', fontSize: '18px' }} />
          </Link>
        </div>

      </header>
    </div>
  );
}
