import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Little Lemon</h3>
            <p className="footer-description">
              A family owned Mediterranean restaurant serving traditional recipes with a modern twist.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Navigation</h4>
            <nav aria-label="Footer navigation">
              <ul className="footer-links">
                <li><a href="#home" className="footer-link">Home</a></li>
                <li><a href="#about" className="footer-link">About</a></li>
                <li><a href="#menu" className="footer-link">Menu</a></li>
                <li><a href="#reservations" className="footer-link">Reservations</a></li>
                <li><a href="#contact" className="footer-link">Contact</a></li>
              </ul>
            </nav>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Contact</h4>
            <address className="footer-address">
              <p>123 Mediterranean Ave</p>
              <p>Chicago, IL 60601</p>
              <p>
                <a href="tel:+1234567890" className="footer-link">
                  (123) 456-7890
                </a>
              </p>
              <p>
                <a href="mailto:info@littlelemon.com" className="footer-link">
                  info@littlelemon.com
                </a>
              </p>
            </address>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Follow Us</h4>
            <div className="social-links">
              <a 
                href="https://facebook.com/littlelemon" 
                className="social-link"
                aria-label="Follow us on Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <a 
                href="https://instagram.com/littlelemon" 
                className="social-link"
                aria-label="Follow us on Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a 
                href="https://twitter.com/littlelemon" 
                className="social-link"
                aria-label="Follow us on Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Little Lemon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;