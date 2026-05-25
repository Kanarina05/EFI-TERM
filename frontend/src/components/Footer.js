import { FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFire } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft-top">

        {/* Brand */}
        <div className="ft-col ft-brand">
          <div className="ft-logo">
            <FaFire className="ft-logo-ico" />
            <span className="ft-logo-txt">Efi Term</span>
          </div>
          <p className="ft-brand-p">
            Firma juaj e besuar për instalimin e ngrohjes qendrore,
            ujësjellësit dhe sistemeve vakumi në Kosovë.
          </p>
          <div className="ft-socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="ft-soc"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="ft-soc"><FaInstagram /></a>
          </div>
        </div>

        {/* Navigim */}
        <div className="ft-col">
          <h4 className="ft-col-h">Navigim</h4>
          <ul className="ft-nav">
            <li><Link to="/">Kryefaqja</Link></li>
            <li><Link to="/about">Rreth Nesh</Link></li>
            <li><Link to="/contact">Kontakti</Link></li>
          </ul>
        </div>

        {/* Shërbime */}
        <div className="ft-col">
          <h4 className="ft-col-h">Shërbimet</h4>
          <ul className="ft-nav">
            <li><a href="/about">Ngrohje Qendrore</a></li>
            <li><a href="/about">Ujësjellës</a></li>
            <li><a href="/about">Sistemi Vakumi</a></li>
            <li><a href="/about">Mirëmbajtje & Servis</a></li>
          </ul>
        </div>

        {/* Kontakti */}
        <div className="ft-col">
          <h4 className="ft-col-h">Kontakti</h4>
          <div className="ft-contacts">
            <div className="ft-contact-row">
              <FaPhone className="ft-contact-ico" />
              <span>+383 44 574 631</span>
            </div>
            <div className="ft-contact-row">
              <FaEnvelope className="ft-contact-ico" />
              <span>efi.term.01@gmail.com</span>
            </div>
            <div className="ft-contact-row">
              <FaMapMarkerAlt className="ft-contact-ico" />
              <span>Lipjan, Kosovë</span>
            </div>
          </div>
        </div>

      </div>

      <div className="ft-bottom">
        <span>© {new Date().getFullYear()} Efi Term. Të gjitha të drejtat e rezervuara.</span>
        <span className="ft-bottom-right">Dizajnuar nga Kanarina</span>
      </div>
    </footer>
  );
}
