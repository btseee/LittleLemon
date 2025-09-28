import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header" role="banner">
      <div className="header-container">
        <div className="logo">
          <img 
            src="/logo192.png" 
            alt="Little Lemon restaurant logo" 
            className="logo-img"
          />
          <h1 className="restaurant-name">Little Lemon</h1>
        </div>
        <nav className="nav" role="navigation" aria-label="Main navigation">
          <ul className="nav-list">
            <li><a href="#home" className="nav-link">Home</a></li>
            <li><a href="#about" className="nav-link">About</a></li>
            <li><a href="#menu" className="nav-link">Menu</a></li>
            <li><a href="#reservations" className="nav-link">Reservations</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;