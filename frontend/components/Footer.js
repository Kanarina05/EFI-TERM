import { FaFacebook, FaTwitter, FaGithub, FaInstagram, FaLinkedin, FaBasketballBall } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer>
      <div>
        <div className="logo">
          <div className="logo-bars"> 
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <h3>SiteLogo</h3>
        </div>
        <p>High level experience in web design and development knowledge, producing quality work.</p>
      </div>
      <div>
        <h3>Use Cases</h3>
        <ul>
          <li>Web-designers</li>
          <li>Marketers</li>
          <li>Small Business</li>
          <li>Website Builder</li>
        </ul>
      </div>
      <div>
        <h3>Company</h3>
        <ul>
          <li>About Us</li>
          <li>Careers</li>
          <li>FAQs</li>
          <li>Teams</li>
        </ul>
      </div>
      <div>
        <h3>Follow us</h3>
        <div className="social-icons">
          <div className="social-icon"><FaFacebook /></div>
          <div className="social-icon"><FaTwitter /></div>
          <div className="social-icon"><FaGithub /></div>
          <div className="social-icon"><FaInstagram /></div>
          <div className="social-icon"><FaLinkedin /></div>
          <div className="social-icon"><FaBasketballBall /></div>
        </div>
      </div>
    </footer>
  );
}

