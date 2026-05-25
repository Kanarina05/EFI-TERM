import { useEffect, useState } from 'react';
import { FaSearch, FaTrash, FaFire, FaTint, FaWind, FaTools,
         FaBullseye, FaEye, FaHandshake,
         FaCheckCircle, FaShieldAlt, FaClock, FaLeaf } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const API = 'http://localhost:4000';

const slides = [
  { bg: '/images/b.jpeg',      badge: 'Kompania Nr.1 në Kosovë',   title: 'Efi Term',          sub: 'Ngrohje Qendrore · Ujësjellës · Sisteme Vakumi', cta: 'Zbulo Shërbimet', href: '#services' },
  { bg: '/images/10.jpeg',     badge: 'Cilësi e Garantuar',        title: 'Projektet Tona',    sub: 'Çdo instalim është dëshmi e profesionalizmit tonë', cta: 'Shiko Produktet', href: '#products' },
  { bg: '/images/slider1.jpg', badge: 'Zgjidhje Rezidenciale',     title: 'Shtëpia Juaj',      sub: 'Sisteme moderne ngrohjeje për çdo lloj objekti', cta: 'Na Kontaktoni', href: '/contact' },
  { bg: '/images/slider2.jpg', badge: 'Instalime Komerciale',      title: 'Ndërtesa Moderne',  sub: 'Infrastrukturë energjetike efikase dhe e besueshme', cta: 'Merr Ofertë', href: '/contact' },
];

const stats = [
  { number: '10+',  label: 'Vjet Eksperiencë' },
  { number: '500+', label: 'Projekte të Kryera' },
  { number: '300+', label: 'Klientë të Kënaqur' },
  { number: '24/7', label: 'Mbështetje Teknike' },
];

const whyUs = [
  { icon: <FaCheckCircle />, text: 'Ekip i certifikuar dhe me eksperiencë' },
  { icon: <FaShieldAlt />,   text: 'Garanci e plotë për çdo instalim' },
  { icon: <FaClock />,       text: 'Afate të respektuara gjithmonë' },
  { icon: <FaLeaf />,        text: 'Zgjidhje efikase energjetike' },
];

const values = [
  { icon: <FaBullseye />,  title: 'Misioni', desc: 'Të ofrojmë komoditet maksimal dhe kursim energjie për çdo klient.' },
  { icon: <FaEye />,       title: 'Vizioni', desc: 'Të jemi lider në tregun e zgjidhjeve termike me teknologji të avancuar.' },
  { icon: <FaHandshake />, title: 'Vlerat',  desc: 'Besueshmëri, profesionalizëm dhe përkushtim të plotë ndaj cilësisë.' },
];

const services = [
  { icon: <FaFire />,  title: 'Ngrohje Qendrore', desc: 'Instalim profesional i sistemeve moderne të ngrohjes qendrore për çdo lloj hapësire.' },
  { icon: <FaTint />,  title: 'Ujësjellës',        desc: 'Sistem i plotë ujësjellësi me materiale cilësore dhe ekip të specializuar.' },
  { icon: <FaWind />,  title: 'Sistemi Vakumi',    desc: 'Instalim i sistemeve vakum të fshesave qendrore me teknologji bashkëkohore.' },
  { icon: <FaTools />, title: 'Mirëmbajtje & Servis', desc: 'Shërbim i shpejtë dhe cilësor pas instalimit, gjithmonë në dispozicion.' },
];

export default function Ballina() {
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage]       = useState(1);
  const [search, setSearch]   = useState('');
  const navigate  = useNavigate();
  const perPage   = 6;
  const userId    = localStorage.getItem('userId');
  const token     = localStorage.getItem('token');

  useEffect(() => { loadPosts(); }, []);

  async function loadPosts() {
    const res  = await fetch(`${API}/allposts`);
    const data = await res.json();
    setPosts(data || []);
    setLoading(false);
  }

  async function deletePost(postId) {
    if (!window.confirm('A jeni të sigurt?')) return;
    const res = await fetch(`${API}/posts/${postId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) setPosts(posts.filter(p => p._id !== postId));
    else alert(data.message || 'Gabim gjatë fshirjes!');
  }

  const filtered   = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / perPage);
  const current    = filtered.slice((page - 1) * perPage, page * perPage);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="ab-page">

      {/* ── SLIDER ── */}
      <div className="ab-slider-wrap">
        <div className="ab-header-float">
          <Header textColor="white" onScrollTo={scrollTo} />
        </div>
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="ab-swiper"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="ab-slide" style={{ backgroundImage: `url('${slide.bg}')` }}>
                <div className="ab-slide-overlay" />
                <div className="ab-slide-content">
                  <span className="ab-badge">{slide.badge}</span>
                  <h1 className="ab-hero-h1">{slide.title}</h1>
                  <p className="ab-hero-p">{slide.sub}</p>
                  <a
                    href={slide.href}
                    className="ab-slide-btn"
                    onClick={e => {
                      if (slide.href.startsWith('#')) {
                        e.preventDefault();
                        scrollTo(slide.href.slice(1));
                      }
                    }}
                  >
                    {slide.cta} →
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ── STATS ── */}
      <div className="ab-stats">
        {stats.map((s, i) => (
          <div className="ab-stat" key={i}>
            <span className="ab-stat-n">{s.number}</span>
            <span className="ab-stat-l">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── RRETH NESH ── */}
      <section id="about" className="ab-story">
        <div className="ab-story-wrap">
          <div className="ab-story-text">
            <span className="ab-tag">Kompania jonë</span>
            <h2 className="ab-story-h2">Kush jemi ne?</h2>
            <p className="ab-story-p">
              <strong>Efi Term</strong> është një firmë profesionale e fokusuar
              në sisteme moderne të ngrohjes dhe ftohjes, duke kombinuar
              teknologjinë, cilësinë dhe korrektësinën.
            </p>
            <p className="ab-story-p">
              Ne punojmë me standarde të larta dhe ofrojmë zgjidhje efikase
              energjetike për shtëpi dhe biznese, gjithmonë të përshtatura
              sipas nevojave të klientit.
            </p>
            <div className="ab-why-list">
              {whyUs.map((w, i) => (
                <div className="ab-why-item" key={i}>
                  <span className="ab-why-ico">{w.icon}</span>
                  <span>{w.text}</span>
                </div>
              ))}
            </div>
            <a href="/contact" className="ab-btn">Na Kontaktoni →</a>
          </div>
          <div className="ab-story-img-wrap">
            <img src="/images/10.jpeg" alt="Projekt Efi Term" className="ab-story-img" />
            <div className="ab-story-img-badge">Punë e kryer — 2024</div>
          </div>
        </div>
      </section>

      {/* ── MISIONI · VIZIONI · VLERAT ── */}
      <section className="ab-mvv">
        <span className="ab-tag ab-tag--center">Parimet tona</span>
        <h2 className="ab-mvv-h2">Misioni · Vizioni · Vlerat</h2>
        <div className="ab-mvv-grid">
          {values.map((v, i) => (
            <div className="ab-mvv-card" key={i}>
              <span className="ab-mvv-ico">{v.icon}</span>
              <h3 className="ab-mvv-name">{v.title}</h3>
              <p className="ab-mvv-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SHËRBIMET ── */}
      <section id="services" className="ab-services">
        <div className="ab-svc-wrap">
          <span className="ab-tag ab-tag--center ab-tag--light">Çfarë ofrojmë</span>
          <h2 className="ab-svc-h2">Shërbimet Tona</h2>
          <div className="ab-svc-grid">
            {services.map((s, i) => (
              <div className="ab-svc-card" key={i}>
                <span className="ab-svc-ico">{s.icon}</span>
                <h3 className="ab-svc-name">{s.title}</h3>
                <p className="ab-svc-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PUNËT TONA ── */}
      <section id="products" className="works-section">
        <div className="works-header">
          <div>
            <span className="ab-tag ab-tag--light">Galeria jonë</span>
            <h2 className="works-h2">Punët Tona</h2>
            <p className="works-sub">Disa nga projektet e realizuara me profesionalizëm dhe cilësi</p>
          </div>
          <div className="works-search-box">
            <FaSearch className="works-search-ico" />
            <input
              type="text"
              placeholder="Kërko punë..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
        </div>

        {loading ? (
          <p className="works-empty">Duke ngarkuar...</p>
        ) : filtered.length === 0 ? (
          <p className="works-empty">{search ? 'Nuk u gjet asnjë punë.' : 'Nuk ka punë të shtuara akoma.'}</p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1.15}
            spaceBetween={20}
            grabCursor
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              600:  { slidesPerView: 2,    spaceBetween: 20 },
              1024: { slidesPerView: 3,    spaceBetween: 24 },
              1400: { slidesPerView: 3.4,  spaceBetween: 24 },
            }}
            className="works-swiper"
          >
            {filtered.map(post => {
              const isOwner = userId && (post.userId?._id || post.userId)?.toString() === userId;
              return (
                <SwiperSlide key={post._id}>
                  <div className="work-card">
                    {isOwner && (
                      <button className="work-card-del" onClick={() => deletePost(post._id)}>
                        <FaTrash size={12} />
                      </button>
                    )}
                    <div className="work-card-img">
                      {post.image
                        ? <img src={`${API}/uploads/${post.image}`} alt={post.title} />
                        : <div className="work-card-no-img"><FaFire /></div>
                      }
                    </div>
                    <div className="work-card-body">
                      <h3 className="work-card-title">{post.title}</h3>
                      {post.text && <p className="work-card-desc">{post.text}</p>}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </section>

      <Footer />
    </div>
  );
}
