import { FaFacebook, FaTwitter, FaGithub, FaInstagram, FaLinkedin, FaBasketballBall } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer>
      <div>
        <div className="logo">
          <div className="logo-bars"> 
            
          </div>
          <h3 className='efi'>efi TERM</h3>
        </div>
        <div className='teksti'> 
<p>Ujësjellës & Ngrohje Qendrore
Instalim • Mirëmbajtje • Servisim
<br></br>Efi Term ofron shërbime në ujësjellës dhe ngrohje qendrore. 
 <br></br>Qëllimi ynë është punë e pastër, e sigurt dhe e kryer me përgjegjësi.</p>
        </div>
        
      </div>
      <div className='left'>
        <h3>Rreth Nesh</h3>
        <ul>
          <li>Numri Kontaktues</li>
          <li>Email</li>
          <li>📍 Kosovë</li>
         
        </ul>
      </div>
      <div>
       
        <ul>
          <li>+383 44574631</li>
          <li>efi.term.01@gmail.com</li>
          <li>📍 Lipjan</li>
        </ul>
      </div>
      <div>
        <h3>Na Ndiqni</h3>
        <div className="social-icons">
          <div className="social-icon"><FaFacebook /></div>
          <div className="social-icon"><FaInstagram /></div>
          
        </div>
      </div>
    </footer>
  );
}

