import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Header from "./Header";
import Footer from "./Footer";
import {
  FaFire, FaTint, FaWind, FaTools,
  FaBullseye, FaEye, FaHandshake,
  FaCheckCircle, FaShieldAlt, FaClock, FaLeaf
} from "react-icons/fa";

const slides = [
  {
    bg: '/images/b.jpeg',
    badge: 'Kompania Nr.1 në Kosovë',
    title: 'Efi Term',
    sub: 'Ngrohje Qendrore · Ujësjellës · Sisteme Vakumi',
    cta: 'Zbulo Shërbimet',
  },
  {
    bg: '/images/10.jpeg',
    badge: 'Cilësi e Garantuar',
    title: 'Projektet Tona',
    sub: 'Çdo instalim është dëshmi e profesionalizmit tonë',
    cta: 'Na Kontaktoni',
  },
  {
    bg: '/images/slider1.jpg',
    badge: 'Zgjidhje Rezidenciale',
    title: 'Shtëpia Juaj',
    sub: 'Sisteme moderne ngrohjeje për çdo lloj objekti',
    cta: 'Merr Ofertë',
  },
  {
    bg: '/images/slider2.jpg',
    badge: 'Instalime Komerciale',
    title: 'Ndërtesa Moderne',
    sub: 'Infrastrukturë energjetike efikase dhe e besueshme',
    cta: 'Merr Ofertë',
  },
];

const stats = [
  { number: "10+",  label: "Vjet Eksperiencë" },
  { number: "500+", label: "Projekte të Kryera" },
  { number: "300+", label: "Klientë të Kënaqur" },
  { number: "24/7", label: "Mbështetje Teknike" },
];

const whyUs = [
  { icon: <FaCheckCircle />, text: "Ekip i certifikuar dhe me eksperiencë" },
  { icon: <FaShieldAlt />,   text: "Garanci e plotë për çdo instalim" },
  { icon: <FaClock />,       text: "Afate të respektuara gjithmonë" },
  { icon: <FaLeaf />,        text: "Zgjidhje efikase energjetike" },
];

const values = [
  { icon: <FaBullseye />, title: "Misioni", desc: "Të ofrojmë komoditet maksimal dhe kursim energjie për çdo klient." },
  { icon: <FaEye />,      title: "Vizioni", desc: "Të jemi lider në tregun e zgjidhjeve termike me teknologji të avancuar." },
  { icon: <FaHandshake />,title: "Vlerat",  desc: "Besueshmëri, profesionalizëm dhe përkushtim të plotë ndaj cilësisë." },
];

const services = [
  { icon: <FaFire />,  title: "Ngrohje Qendrore", desc: "Instalim profesional i sistemeve moderne të ngrohjes qendrore për çdo lloj hapësire." },
  { icon: <FaTint />,  title: "Ujësjellës",        desc: "Sistem i plotë ujësjellësi me materiale cilësore dhe ekip të specializuar." },
  { icon: <FaWind />,  title: "Sistemi Vakumi",    desc: "Instalim i sistemeve vakum të fshesave qendrore me teknologji bashkëkohore." },
  { icon: <FaTools />, title: "Mirëmbajtje & Servis", desc: "Shërbim i shpejtë dhe cilësor pas instalimit, gjithmonë në dispozicion." },
];

function About() {
  return (
    <div className="ab-page">

      {/* ── HERO SLIDER ── */}
      <div className="ab-slider-wrap">
        <div className="ab-header-float">
          <Header textColor="white" />
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
              <div
                className="ab-slide"
                style={{ backgroundImage: `url('${slide.bg}')` }}
              >
                <div className="ab-slide-overlay" />
                <div className="ab-slide-content">
                  <span className="ab-badge">{slide.badge}</span>
                  <h1 className="ab-hero-h1">{slide.title}</h1>
                  <p className="ab-hero-p">{slide.sub}</p>
                  <a href="/contact" className="ab-slide-btn">{slide.cta} →</a>
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

      {/* ── KUSH JEMI NE ── */}
      <section className="ab-story">
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
      <section className="ab-services">
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

      <Footer />
    </div>
  );
}

export default About;
