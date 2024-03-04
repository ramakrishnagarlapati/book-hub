import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <footer className="footer-container">
    <ul className="social-media-list">
      <li className="social-media-item">
        <button type="button" className="social-media-button">
          <FaGoogle size={21} className="social-media-icon" />
        </button>
      </li>
      <li className="social-media-item">
        <button type="button" className="social-media-button">
          <FaTwitter size={21} className="social-media-icon" />
        </button>
      </li>
      <li className="social-media-item">
        <button type="button" className="social-media-button">
          <FaInstagram size={21} className="social-media-icon" />
        </button>
      </li>
      <li className="social-media-item">
        <button type="button" className="social-media-button">
          <FaYoutube size={21} className="social-media-icon" />
        </button>
      </li>
    </ul>
    <p className="contact-us">Contact Us</p>
  </footer>
)

export default Footer
